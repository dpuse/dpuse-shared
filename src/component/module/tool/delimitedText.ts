// ── DPUse Framework
import type { ParseTextOptions, ParseTextResult } from '@/component/module/tool';
import type { ParsingRecord, PreviewIssue, RecordDelimiterId, ValueDelimiterId } from '@/component/dataView';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

// What a parser tool supplies: the text read with one delimiter. A record it cannot read is left out and becomes an
// issue, so every parser reports the same way and the choice of delimiter below is the same whichever parser reads.
export type ParseTextWithDelimiter = (text: string, delimiter: ValueDelimiterId, isComplete: boolean) => Promise<{ issues: PreviewIssue[]; records: ParsingRecord[] }>;

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

/**
 * Reads delimited text for a preview: detects its record delimiter, and which of the candidate value delimiters splits
 * it best. The value delimiter is undefined when the text is not delimited: the best one found does not split most
 * records into the same number of values, more than one, as a table's rows would be. The records parsed with it are
 * still returned, so the text can be shown as a table if the user chooses. A delimiter whose parse has issues is only
 * used when every delimiter's does, because a wrong delimiter can itself cause a quote error. Then the one with the
 * fewest issues is used, the first on a tie, and its issues are returned, so the user learns why the text cannot be read.
 */
export async function parseDelimitedText(text: string, options: ParseTextOptions, parseTextWithDelimiter: ParseTextWithDelimiter): Promise<ParseTextResult> {
    const recordDelimiterId = determineRecordDelimiter(text);
    const { issues, parsedRecords, valueDelimiterId } = await determineValueDelimiter(text, options.valueDelimiterIds, options.isComplete, parseTextWithDelimiter);
    return { issues, parsedRecords, recordDelimiterId, valueDelimiterId };
}

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

function determineRecordDelimiter(text: string): RecordDelimiterId {
    const countCRLF = (text.match(/\r\n/g) ?? []).length; // Count all '\r\n'character sequences.
    const countLF = (text.match(/(?<!\r)\n/g) ?? []).length; // Count all '\n' characters not preceded by '\r' character.
    const countCR = (text.match(/\r(?!\n)/g) ?? []).length; // Count all '\r' characters not followed by '\n' character.
    if (countCRLF >= countLF && countCRLF >= countCR) return '\r\n';
    if (countLF >= countCRLF && countLF >= countCR) return '\n';
    return countCR >= countCRLF && countCR >= countLF ? '\r' : '\n'; // Ties, including text with no line break, go to '\r\n' above, so the '\n' here is never reached.
}

async function determineValueDelimiter(
    text: string,
    delimiters: ValueDelimiterId[],
    isComplete: boolean,
    parseTextWithDelimiter: ParseTextWithDelimiter
): Promise<{ issues: PreviewIssue[]; parsedRecords: ParsingRecord[]; valueDelimiterId: ValueDelimiterId | undefined }> {
    let valueDelimiterId: ValueDelimiterId | undefined;
    let priorAverageCount: number | undefined;
    let priorSumCountDiffs: number | undefined;
    let parsedRecords: ParsingRecord[] = [];
    let fewestIssuesParse: { delimiter: ValueDelimiterId; issues: PreviewIssue[]; records: ParsingRecord[] } | undefined;
    let hasParsedWithoutIssues = false;

    for (const delimiter of delimiters) {
        const { issues, records } = await parseTextWithDelimiter(text, delimiter, isComplete);
        if (issues.length > 0) {
            fewestIssuesParse = chooseFewerIssues(fewestIssuesParse, { delimiter, issues, records });
            continue;
        }
        hasParsedWithoutIssues = true;
        if (records.length === 0) continue; // Nothing to compare, and the average below would be 0 / 0.
        const { averageValueCount, sumOfValueCountDiffs } = measureValueCounts(records);
        const isBetterFit = (!priorSumCountDiffs || sumOfValueCountDiffs <= priorSumCountDiffs) && (!priorAverageCount || averageValueCount > priorAverageCount);
        if (!isBetterFit) continue;
        valueDelimiterId = delimiter;
        priorAverageCount = averageValueCount;
        priorSumCountDiffs = sumOfValueCountDiffs;
        parsedRecords = records;
    }

    if (!hasParsedWithoutIssues && fewestIssuesParse != null) {
        const { delimiter, issues, records } = fewestIssuesParse;
        return { issues, parsedRecords: records, valueDelimiterId: isTabular(records) ? delimiter : undefined };
    }
    return { issues: [], parsedRecords, valueDelimiterId: valueDelimiterId != null && isTabular(parsedRecords) ? valueDelimiterId : undefined };
}

// The earlier parse wins a tie, so delimiters keep their order of preference.
function chooseFewerIssues<T extends { issues: PreviewIssue[] }>(priorParse: T | undefined, parse: T): T {
    return priorParse == null || parse.issues.length < priorParse.issues.length ? parse : priorParse;
}

// The average number of values per record, and how much that number changes from one record to the next.
function measureValueCounts(records: ParsingRecord[]): { averageValueCount: number; sumOfValueCountDiffs: number } {
    let totalValueCount = 0;
    let sumOfValueCountDiffs = 0;
    let priorValueCount: number | undefined;
    for (const record of records) {
        if (priorValueCount != null) sumOfValueCountDiffs += Math.abs(record.length - priorValueCount);
        priorValueCount = record.length;
        totalValueCount += record.length;
    }
    return { averageValueCount: totalValueCount / records.length, sumOfValueCountDiffs };
}

// Most records have the same number of values, more than one. Ragged rows are allowed, as the parsers allow them.
function isTabular(parsedRecords: ParsingRecord[]): boolean {
    const recordCountByValueCount = new Map<number, number>();
    for (const record of parsedRecords) recordCountByValueCount.set(record.length, (recordCountByValueCount.get(record.length) ?? 0) + 1);
    const [commonValueCount = 0, commonRecordCount = 0] = [...recordCountByValueCount].toSorted((left, right) => right[1] - left[1])[0] ?? [];
    return commonValueCount > 1 && commonRecordCount * 2 > parsedRecords.length;
}
