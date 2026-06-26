import { LiteralSchema, UnionSchema } from 'valibot';
type LiteralUnionSchema<T extends readonly string[]> = UnionSchema<{
    [K in keyof T]: LiteralSchema<T[K], undefined>;
}, undefined>;
export declare const literalUnion: <const T extends readonly string[]>(values: T) => LiteralUnionSchema<T>;
export {};
