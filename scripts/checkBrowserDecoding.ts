// Checks that real browsers accept every browser name the table decodes with, under that same name. Run by hand on a Mac with 'npm run check:browsers', after the build. It is not part of CI, because browsers
// almost never change how they decode, so it only needs re-running now and then, or after an encoding is added.

// ── External Dependencies & Registrations
import type { AddressInfo } from 'node:net';
import { ENCODING_TYPE_CONFIG_MAP } from '@dpuse/dpuse-shared';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { type ChildProcess, execFileSync, spawn } from 'node:child_process';
import { createServer, type IncomingMessage } from 'node:http';
import { mkdtemp, rm } from 'node:fs/promises';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

interface Browser {
    appPath: string;
    launch: (url: string, profilePath: string) => ChildProcess;
    name: string;
}

interface BrowserReport {
    results: Record<string, string | null>; // The name each encoding decodes as, or null when the browser refuses it.
}

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

const REPORT_TIMEOUT_MS = 60_000;

// Each browser gets a fresh profile, so a first-run screen or an existing session cannot get in the way. Safari has no
// background mode, so it opens a tab in the Safari window, which is left for you to close.
const BROWSERS: Browser[] = [
    {
        appPath: '/Applications/Google Chrome.app',
        launch: (url, profilePath) =>
            spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', '--no-first-run', `--user-data-dir=${profilePath}`, url]),
        name: 'Chrome'
    },
    {
        appPath: '/Applications/Microsoft Edge.app',
        launch: (url, profilePath) =>
            spawn('/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge', ['--headless=new', '--no-first-run', `--user-data-dir=${profilePath}`, url]),
        name: 'Edge'
    },
    {
        appPath: '/Applications/Firefox.app',
        launch: (url, profilePath) => spawn('/Applications/Firefox.app/Contents/MacOS/firefox', ['--headless', '--no-remote', '--profile', profilePath, url]),
        name: 'Firefox'
    },
    { appPath: '/Applications/Safari.app', launch: (url) => spawn('open', ['-a', 'Safari', url]), name: 'Safari' }
];

const DECODER_IDS = [...new Set(Object.values(ENCODING_TYPE_CONFIG_MAP).flatMap(({ decoderId }) => (decoderId == null ? [] : [decoderId])))];

// The page tries every browser name in the browser and posts back what happened.
const PAGE_HTML = `<!doctype html><meta charset="utf-8"><script>
const results = {};
for (const id of ${JSON.stringify(DECODER_IDS)}) {
    try { results[id] = new TextDecoder(id).encoding; } catch { results[id] = null; }
}
fetch('/report' + location.search, { method: 'POST', body: JSON.stringify({ results }) });
</script>`;

// ── Main ─────────────────────────────────────────────────────────────────────────────────────────────────────────────

const reportResolvers = new Map<string, (report: BrowserReport) => void>();

const server = createServer((request, response) => {
    const url = new URL(request.url ?? '/', 'http://localhost');
    if (request.method !== 'POST') {
        response.setHeader('content-type', 'text/html');
        response.end(PAGE_HTML);
        return;
    }
    void readBody(request).then((body) => {
        reportResolvers.get(url.searchParams.get('browser') ?? '')?.(JSON.parse(body) as BrowserReport);
        response.end();
    });
});
await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address() as AddressInfo;

let failedBrowserCount = 0;
for (const browser of BROWSERS) {
    if (!existsSync(browser.appPath)) {
        console.log(`⏭️  ${browser.name} is not installed, skipped`);
        continue;
    }

    const version = execFileSync('plutil', ['-extract', 'CFBundleShortVersionString', 'raw', join(browser.appPath, 'Contents/Info.plist')], { encoding: 'utf-8' }).trim();
    const profilePath = await mkdtemp(join(tmpdir(), 'dpuse-check-browsers-'));
    const abortController = new AbortController();
    const reportPromise = new Promise<BrowserReport>((resolve, reject) => {
        reportResolvers.set(browser.name, resolve);
        const timeout = setTimeout(() => reject(new Error(`no report within ${String(REPORT_TIMEOUT_MS / 1000)}s`)), REPORT_TIMEOUT_MS);
        abortController.signal.addEventListener('abort', () => clearTimeout(timeout));
    });
    const browserProcess = browser.launch(`http://127.0.0.1:${String(port)}/?browser=${encodeURIComponent(browser.name)}`, profilePath);

    try {
        const mismatches = findMismatches(await reportPromise);
        if (mismatches.length === 0) console.log(`✅ ${browser.name} ${version}: all ${String(DECODER_IDS.length)} browser names match`);
        else {
            failedBrowserCount++;
            console.log(`❌ ${browser.name} ${version}: ${String(mismatches.length)} differ from the table`);
            for (const mismatch of mismatches) console.log(`   ${mismatch}`);
        }
    } catch (error) {
        failedBrowserCount++;
        console.log(`❌ ${browser.name} ${version}: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
        abortController.abort();
        browserProcess.kill();
        await rm(profilePath, { force: true, maxRetries: 10, recursive: true }); // Retries while the closing browser still writes to its profile.
    }
}

server.close();
if (failedBrowserCount > 0) process.exitCode = 1;

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

function findMismatches({ results }: BrowserReport): string[] {
    return DECODER_IDS.filter((decoderId) => results[decoderId] !== decoderId).map((decoderId) => `${decoderId}: browser gives ${results[decoderId] ?? 'not decodable'}`);
}

async function readBody(request: IncomingMessage): Promise<string> {
    let body = '';
    for await (const chunk of request) body += String(chunk);
    return body;
}
