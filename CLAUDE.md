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

- Groups are separated by a blank line. A group starts with either `// <GroupName>` on its own line, or a plain
  comment that explains the group, e.g. `// An item's edits go into its entry for the current language.`
- Where a group has a name, explanation for the whole group continues on the same comment block, after an em dash.
- Notes about a single definition go as a trailing comment, not an extra line above it.
- Definitions are alphabetical within a group.

See [PaneSplitter.vue](src/components/ui/PaneSplitter.vue) for a worked example.

### Component names

Name a component for what it **is**, not for an architectural role. Plain nouns by default — `Button`, `Card`,
`Dialog`, `Menu`, `Panel` — and no suffix taxonomy to enforce.

- **Disambiguate only on collision.** Add a suffix or prefix when two things would otherwise share a name, or to
  name a shared primitive several variants build on — `ButtonBase`, `ProductCard` vs. `UserCard`.
- **Compound components for complex interactive widgets** — dialogs, menus, dropdowns, tabs. Split by role within
  the family rather than inventing a global suffix: `Dialog.Root`, `Dialog.Trigger`, `Dialog.Content`; `Menu.Root`,
  `Menu.Item`.
- **`Wrapper` is a normal, acceptable name** for a component whose job is to wrap children with cross-cutting
  behaviour (error boundaries, providers, polymorphic root elements). Do not avoid it.
- **`Shell` is reserved for the single top-level app frame** (`AppShell`) — not applied generically to dialogs,
  error displays, or plugin panels.
- Avoid vague verb-suffixes (`Display`, `Manager`, `Handler`) only when a more specific noun is obviously
  available; don't force a rename otherwise.

### Props

Type props inline in `defineProps`, destructured directly — no separate `interface Properties`:

```ts
const { pluginLocalisedConfig, setupOptionLocalisedConfig } = defineProps<{
    pluginLocalisedConfig: LocalisedConfig<PluginConfig>;
    setupOptionLocalisedConfig: LocalisedConfig<SetupOptionConfig>;
}>();
```

A prop passed through several layers unchanged (a dynamic tab's config, threaded from a list down through a
wrapper into the component that renders it) keeps the same name at every layer, so the binding at each `<Component
:prop="...">` call site never has to translate one name into another.

### Locale strings

Translations live in a `TEXT` table, keyed by what the string is for, never by what it says. It is not called `T`,
because `T` is the generic type parameter throughout the app. `TEXT` is defined in a sibling JSON file named after the
component with a trailing underscore — `PluginPanel.vue` reads from `PluginPanel_.json` — and imported as a named
export:

```ts
import { TEXT } from './PluginPanel_.json';
```

```json
{
    "TEXT": {
        "cancel.label": { "en": "Cancel", "es": "Cancelar" },
        "reporting.pending.text": { "en": "Logging this error…", "es": "Registrando este error…" },
        "step.label": { "en": "Step {number}", "es": "Paso {number}" }
    }
}
```

Import the named export directly (`import { TEXT } from './X_.json'`) — never a default import followed by a `.TEXT`
lookup. Named JSON imports work throughout this codebase without extra config.

The key is `subject.role`, in lowerCamel segments, quoted, alphabetical. Rules:

- The last segment is the **role**, drawn from a closed set: `label` for buttons, menu items, field names and short
  headings; `title` for panel and page headers; `text` for prose; `placeholder`; `aria` for screen-reader-only
  strings; `error` for validation and failure messages.
- Earlier segments are the **subject** — a noun, plus a state where one applies (`reporting.pending`,
  `reporting.failed`). `TEXT` is scoped one-to-one to its component, so the component is already the scope: a key
  needs no prefix naming it.
- `label` and `aria` are alternatives, not a stack. `detail.aria`, never `detail.label.aria`.
- Plurals take `.one` / `.other` before the role: `dataView.one.text`, `dataView.other.text`.
- **The key never carries copy.** No English sentences, no `{number}` placeholders, no punctuation, and no casing
  that means something — placeholders and casing belong to the values. This is the component-name rule one level
  down: name the contract, not the content, because the content is the part that changes. A key reading
  `Select_a_connection_to_configure_the_data_view_before_continuing` outlived the sentence it was named for.

### Comments

Comment why the code is not the obvious thing, not what it does. Do not restate class lists or method names.

A template comment may sit above a component's root element. It does not make the component multi-root: in
development Vue skips comments when it looks for the single root to pass attributes to, and production builds strip
comments altogether, so attribute fallthrough still works (verified on Vue 3.5). What does break fallthrough is a
second element or text node at the root.
