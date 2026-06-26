// ── External Dependencies & Registrations
import { literal, type LiteralSchema, union, type UnionSchema } from 'valibot';

// ── Schemas ──────────────────────────────────────────────────────────────────────────────────────────────────────────

type LiteralUnionSchema<T extends readonly string[]> = UnionSchema<{ [K in keyof T]: LiteralSchema<T[K], undefined> }, undefined>;

export const literalUnion = <const T extends readonly string[]>(values: T): LiteralUnionSchema<T> => {
    return union(values.map((value) => literal(value))) as LiteralUnionSchema<T>;
};
