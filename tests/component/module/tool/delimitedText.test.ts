// ── External Dependencies & Registrations
import { describe, expect, it } from 'vitest';

// ── DPUse Framework
import { parseDelimitedText } from '@/component/module/tool';
import type { ParseTextWithDelimiter } from '@/component/module/tool';
import type { ParsingRecord, PreviewIssue, ValueDelimiterId } from '@/component/dataView';

// ── Tests ────────────────────────────────────────────────────────────────────────────────────────────────────────────

const CANDIDATES: ValueDelimiterId[] = [',', ';', '\t'];

// A parser that splits on the delimiter it is given and reports a quote issue for any text with a quote in it. The real
// parsers do much more; this is only enough to choose between delimiters.
const splitParser: ParseTextWithDelimiter = (text, delimiter, _isComplete) => {
    const issues: PreviewIssue[] = text.includes('"') ? [{ id: 'QUOTE', lineNumber: 1, message: 'Quote.', severityId: 'error' }] : [];
    const records: ParsingRecord[] = text
        .split('\n')
        .filter((line) => line !== '')
        .map((line) => line.split(delimiter).map((value) => ({ value, valueWasQuoted: false })));
    return Promise.resolve({ issues, records });
};

function parse(text: string, valueDelimiterIds = CANDIDATES, parseTextWithDelimiter = splitParser): ReturnType<typeof parseDelimitedText> {
    return parseDelimitedText(text, { dataFormatId: 'dtv', isComplete: true, valueDelimiterIds }, parseTextWithDelimiter);
}

function readValues(records: ParsingRecord[]): (string | null)[][] {
    return records.map((record) => record.map((field) => field.value));
}

const QUOTE_ISSUE: PreviewIssue = { id: 'QUOTE', lineNumber: 1, message: 'Quote.', severityId: 'error' };

// Meets a quote issue with the comma only.
const commaIssueParser: ParseTextWithDelimiter = async (text, delimiter, isComplete) => {
    const parsed = await splitParser(text, delimiter, isComplete);
    return delimiter === ',' ? { ...parsed, issues: [QUOTE_ISSUE] } : parsed;
};

// Meets two quote issues with the comma, and one with any other delimiter.
const alwaysIssueParser: ParseTextWithDelimiter = (text, delimiter, _isComplete) => {
    const issues = delimiter === ',' ? [QUOTE_ISSUE, QUOTE_ISSUE] : [QUOTE_ISSUE];
    return Promise.resolve({ issues, records: text.split('\n').map((line) => line.split(delimiter).map((value) => ({ value, valueWasQuoted: false }))) });
};

describe('parseDelimitedText', () => {
    it('detects the value delimiter that splits every record evenly', async () => {
        const result = await parse('name;age\nAda;36\nGrace;85\n');

        expect(result.valueDelimiterId).toBe(';');
        expect(readValues(result.parsedRecords)).toEqual([
            ['name', 'age'],
            ['Ada', '36'],
            ['Grace', '85']
        ]);
        expect(result.issues).toEqual([]);
    });

    it('allows a few ragged rows', async () => {
        const result = await parse('name,age,city\nAda,36,London\nGrace,85\nKatherine,101,Hampton\n');

        expect(result.valueDelimiterId).toBe(',');
    });

    it.each([
        ['a single column of values', 'Ada\nGrace\nKatherine\n'],
        ['empty text', '']
    ])('reports %s as not delimited', async (_description, text) => {
        const result = await parse(text);

        expect(result.valueDelimiterId).toBeUndefined();
    });

    it('keeps the records of text that is not delimited, so it can still be shown as a table', async () => {
        const result = await parse('Ada\nGrace\n');

        expect(result.valueDelimiterId).toBeUndefined();
        expect(readValues(result.parsedRecords)).toEqual([['Ada'], ['Grace']]);
    });

    it('only uses a delimiter whose parse has issues when every delimiter has, taking the one with the fewest', async () => {
        const result = await parse('a;b\n1;2\n', CANDIDATES, alwaysIssueParser);

        expect(result.valueDelimiterId).toBe(';');
        expect(result.issues).toEqual([QUOTE_ISSUE]);
    });

    it('rules out a delimiter whose parse has issues while another parses cleanly', async () => {
        const result = await parse('a,b;c\n1,2;3\n', CANDIDATES, commaIssueParser);

        expect(result.valueDelimiterId).toBe(';');
    });

    it('passes on whether the text is the whole item', async () => {
        const seen: boolean[] = [];
        await parseDelimitedText('a,b\n', { dataFormatId: 'dtv', isComplete: false, valueDelimiterIds: [','] }, (text, delimiter, isComplete) => {
            seen.push(isComplete);
            return splitParser(text, delimiter, isComplete);
        });

        expect(seen).toEqual([false]);
    });

    it.each([
        ['\r\n', 'a\r\nb\r\nc'],
        ['\n', 'a\nb\nc'],
        ['\r', 'a\rb\rc']
    ])('detects %j as the record delimiter', async (recordDelimiterId, text) => {
        const result = await parse(text, [',']);

        expect(result.recordDelimiterId).toBe(recordDelimiterId);
    });
});
