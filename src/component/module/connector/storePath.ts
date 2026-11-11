// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

// A database name becomes part of a file name, so it is kept to letters, digits, '_' and '-'.
const DATABASE_NAME_PATTERN = /^[\w-]+$/u;

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// A store keeps its tables in one or more databases. A path '/database/table' names both. A path that is only a table's
// name uses the store's default database, as every path did before a store could hold several.
export function resolveStorePath(path: string): { databaseName: string | undefined; tableName: string } {
    if (!path.startsWith('/')) return { databaseName: undefined, tableName: path };
    const [, databaseName, tableName, ...extraSegments] = path.split('/');
    if (databaseName == null || tableName == null || tableName === '' || extraSegments.length > 0 || !DATABASE_NAME_PATTERN.test(databaseName)) {
        throw new Error(`Encountered invalid store path '${path}'.`);
    }
    return { databaseName, tableName };
}
