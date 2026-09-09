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

### Component names

A component's suffix names its contract with its host, never its shape or its content. Shape varies — the same error
body renders as a card, as a dialog body, and inside a badge — and content changes; the contract does not.

Three tiers:

| Tier   | Contract                                        | Suffixes                                                             |
| ------ | ----------------------------------------------- | -------------------------------------------------------------------- |
| Host   | Owns a region and arranges others inside it     | `Layout`, `Dialog`, `Bar`, `Menu`, `Shell`                           |
| Region | Swapped into a host by route or selection       | `Panel`                                                              |
| Leaf   | Presentational, reused anywhere, owns no region | `Button`, `List`, `Table`, `Form`, `Header`, `Card`, `Input`, `Body` |

Rules:

- `Panel` is reserved for routable or selectable content regions that fill a host. It is the largest bucket and the
  most attractive default, which is the reason to guard it: a leaf named `Panel` claims a region it does not own.
- Do not add content-shaped suffixes — `Detail`, `Summary`, `Info`. They name what a component says rather than what
  it is, and what it says is the part that changes.
- A leaf takes the primitive noun that fits it. Where none does, because the component is deliberately shape-agnostic,
  it takes `Body` — the inner content a shell wraps. `ErrorBody` is the worked example: `ErrorShell` places it in a
  card, in a detail dialog, and in a screen-owning modal.
- `Shell` is the host that owns a region and chooses how its content is presented, as against `Layout`, which arranges
  several children it does not choose between. Prefer it to `Wrapper`, which names containment — a mechanic every host
  shares — rather than a role.
- The suffix is the last word. A leaf must not lead with a host or region term either — `PanelLoadFailure` read as a
  region and is now `LoadFailureNotice`.
- Avoid verbs. `Display`, `Manager`, `Handler` say what a component does in the vaguest available terms; `ErrorDisplay`
  became `ErrorShell` for that reason.

### Locale strings

Translations live in a file-local `T` table, keyed by what the string is for, never by what it says:

```ts
const T = {
    'cancel.label': { en: 'Cancel', es: 'Cancelar' },
    'reporting.pending.text': { en: 'Logging this error…', es: 'Registrando este error…' },
    'step.label': { en: 'Step {number}', es: 'Paso {number}' }
};
```

The key is `subject.role`, in lowerCamel segments, quoted, alphabetical. Rules:

- The last segment is the **role**, drawn from a closed set: `label` for buttons, menu items, field names and short
  headings; `title` for panel and page headers; `text` for prose; `placeholder`; `aria` for screen-reader-only
  strings; `error` for validation and failure messages.
- Earlier segments are the **subject** — a noun, plus a state where one applies (`reporting.pending`,
  `reporting.failed`). `T` is file-local, so the component is already the scope: a key needs no prefix naming it.
- `label` and `aria` are alternatives, not a stack. `detail.aria`, never `detail.label.aria`.
- Plurals take `.one` / `.other` before the role: `dataView.one.text`, `dataView.other.text`.
- **The key never carries copy.** No English sentences, no `{number}` placeholders, no punctuation, and no casing
  that means something — placeholders and casing belong to the values. This is the component-name rule one level
  down: name the contract, not the content, because the content is the part that changes. A key reading
  `Select_a_connection_to_configure_the_data_view_before_continuing` outlived the sentence it was named for.

### Comments

Comment why the code is not the obvious thing, not what it does. Do not restate class lists or method names.

Template comments must not sit above a component's root element — they become sibling root nodes, which makes the
component multi-root and silently breaks attribute fallthrough. Put such notes inside the root element instead.
