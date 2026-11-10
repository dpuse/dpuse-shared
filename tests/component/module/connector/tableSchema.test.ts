// ── External Dependencies & Registrations
import { describe, expect, it } from 'vitest';

// ── DPUse Framework
import { readTableSchema } from '@/component/module/connector';

// ── Tests ────────────────────────────────────────────────────────────────────────────────────────────────────────────

describe('readTableSchema', () => {
    it('declares each field as a column, in order, with its title as the label', () => {
        const { declaredColumnConfigs } = readTableSchema({
            schema: {
                fields: [
                    { name: 'personId', type: 'string' },
                    { name: 'birthDate', title: 'Birth date', type: 'date' }
                ]
            }
        });

        expect(declaredColumnConfigs).toEqual([
            { dataSubtypeId: 'plain', dataTypeId: 'string', label: undefined, name: 'personId' },
            { dataSubtypeId: 'date', dataTypeId: 'temporal', label: 'Birth date', name: 'birthDate' }
        ]);
    });

    it.each([
        ['integer', undefined, 'numeric', 'integer'],
        ['number', undefined, 'numeric', 'decimal'],
        ['year', undefined, 'numeric', 'integer'],
        ['boolean', undefined, 'boolean', undefined],
        ['datetime', undefined, 'temporal', 'dateTime'],
        ['time', undefined, 'temporal', 'time'],
        ['string', 'email', 'string', 'email'],
        ['string', 'uri', 'string', 'url'],
        ['string', 'uuid', 'string', 'uuid'],
        ['string', 'binary', 'string', 'plain']
    ])("reads a '%s' field with format '%s' as %s %s", (type, format, dataTypeId, dataSubtypeId) => {
        const { declaredColumnConfigs } = readTableSchema({ schema: { fields: [{ format, name: 'a', type }] } });

        expect(declaredColumnConfigs[0]).toMatchObject({ dataSubtypeId, dataTypeId });
    });

    // The standard's default type is 'any', which says nothing about the values, so DPUse infers them.
    it.each([undefined, 'any', 'object', 'geopoint'])("leaves the type of a '%s' field to inference", (type) => {
        const { declaredColumnConfigs } = readTableSchema({ schema: { fields: [{ name: 'a', type }] } });

        expect(declaredColumnConfigs[0]).toMatchObject({ dataSubtypeId: undefined, dataTypeId: undefined });
    });

    it("takes the standard's defaults when there is no dialect: a header row and a comma, with the encoding detected", () => {
        const { declaredReadingConfig } = readTableSchema({ schema: { fields: [] } });

        expect(declaredReadingConfig).toEqual({ dataFormatId: 'dtv', encodingId: undefined, hasHeaders: true, valueDelimiterId: ',' });
    });

    it("reads the dialect's delimiter and header, and the resource's encoding", () => {
        const { declaredReadingConfig } = readTableSchema({ dialect: { delimiter: ';', header: false }, encoding: 'ISO-8859-1', schema: { fields: [] } });

        expect(declaredReadingConfig).toEqual({ dataFormatId: 'dtv', encodingId: 'iso-8859-1', hasHeaders: false, valueDelimiterId: ';' });
    });

    it('reads an item with no header rows as having no header', () => {
        const { declaredReadingConfig } = readTableSchema({ dialect: { headerRows: [] }, schema: { fields: [] } });

        expect(declaredReadingConfig.hasHeaders).toBe(false);
    });

    it('leaves a delimiter DPUse does not offer to detection', () => {
        const { declaredReadingConfig } = readTableSchema({ dialect: { delimiter: '~' }, schema: { fields: [] } });

        expect(declaredReadingConfig.valueDelimiterId).toBeUndefined();
    });

    it('rejects a schema without its fields, and a dialect of the wrong shape', () => {
        expect(() => readTableSchema({ schema: { primaryKey: 'id' } })).toThrow('The table schema is not valid.');
        expect(() => readTableSchema({ dialect: { header: 'yes' }, schema: { fields: [] } })).toThrow('The table dialect is not valid.');
    });
});
