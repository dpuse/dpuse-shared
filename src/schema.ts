// External Dependencies
import { literal, union } from 'valibot';
import type { LiteralSchema, UnionSchema } from 'valibot';

// Schemas - Literal Union ─────────────────────────────────────────────────────────────────────────────────────────────

type LiteralUnionSchema<T extends readonly string[]> = UnionSchema<{ [K in keyof T]: LiteralSchema<T[K], undefined> }, undefined>;

export const literalUnion = <const T extends readonly string[]>(values: T): LiteralUnionSchema<T> => {
    return union(values.map((value) => literal(value))) as LiteralUnionSchema<T>;
};
