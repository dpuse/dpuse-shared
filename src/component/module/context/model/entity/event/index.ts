// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelEntityEventConfig {
    id: string;
    labelAction: Record<string, string>;
    labelState: Record<string, string>;
}

// ??? ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────

interface Event {
    id?: number;
    entityId: string;
    effDate: number;
    typeId: string;
}
