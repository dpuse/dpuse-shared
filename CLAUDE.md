# dpuse-app

## Conventions

### Section banners

Script blocks are divided by full-width banners padded to column 120:

```ts
// ── State ────────────────────────────────────────────────────────────────────────────────────────────────────────────
```

Common banners, in order: `External Dependencies & Registrations`, `Constants`, `State`, `Derived State`, `Side Effects`,
`Event Handlers`, `Helpers`. A banner may be qualified when a section is large, e.g.
`// ── Event Handlers - Assistant Pane/Panels ──`.

### Sub-groups within a section

Where a section holds distinct groups of definitions, do not add a second banner. Use light sub-labels instead:

```ts
// ── State ────────────────────────────────────────────────────────────────────────────────────────────────────────────

// Model
const splitterLeftPanePercent = defineModel<number>({ default: BALANCED_PERCENT });

// Drag — only meaningful while a drag is in progress. Refs rather than plain variables because the lint rules forbid
// reassigning a top-level variable from inside a function.
const previousBodyUserSelect = ref(''); // Text selection is switched off page-wide while dragging; this restores it.
const splitterContainerRect = shallowRef<DOMRect>(); // The row holding both panes, measured once as the drag starts.
const splitterIsDragging = ref(false);
```

Rules:

- Groups are separated by a blank line, each starting with `// <GroupName>` on its own line.
- Explanation for the whole group continues on the same comment block, after an em dash.
- Notes about a single definition go as a trailing comment, not an extra line above it.
- Definitions are alphabetical within a group.

See [PaneSplitter.vue](src/components/ui/PaneSplitter.vue) for a worked example.

### Comments

Comment why the code is not the obvious thing, not what it does. Do not restate class lists or method names.

Template comments must not sit above a component's root element — they become sibling root nodes, which makes the
component multi-root and silently breaks attribute fallthrough. Put such notes inside the root element instead.
