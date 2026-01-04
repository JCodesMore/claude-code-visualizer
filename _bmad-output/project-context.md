---
project_name: 'claude-code-visualizer'
user_name: 'Jmd50'
date: '2026-01-04'
sections_completed:
  - technology_stack
  - language_rules
  - framework_rules
  - state_management_rules
  - project_structure_rules
  - error_handling_rules
  - anti_patterns
status: 'complete'
rule_count: 35
optimized_for_llm: true
---

# Project Context: claude-code-visualizer

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

## Technology Stack & Versions

### Core Technologies
| Technology | Version | Notes |
|------------|---------|-------|
| **Go** | 1.20 | Proxy backend (NO CHANGES for canvas feature) |
| **TypeScript** | 5.1.6 | Strict mode enabled |
| **React** | 18.2 | Functional components only |
| **Remix** | 2.16.8 | File-based routing in `app/routes/` |
| **Vite** | 6.0 | Build tool |
| **Tailwind CSS** | 3.4.4 | Utility-first styling |

### New Canvas Feature Dependencies
| Package | Purpose |
|---------|---------|
| `@xyflow/react` | React Flow canvas visualization |
| `zustand` + `immer` | State management with immutable updates |
| `dagre` + `@types/dagre` | Hierarchical tree layout |
| `shadcn/ui` | UI components (resizable, card, badge, etc.) |

---

## Critical Implementation Rules

### TypeScript Rules

- **Strict mode is ON** - No `any` types without explicit justification
- **Path alias**: Use `~/*` for imports from `./app/*`
- **Type inference**: Let TypeScript infer where obvious (loop variables, simple returns)
- **Explicit types required**: Function parameters, public APIs, complex objects
- **Node data interfaces**: Extend `BaseNodeData` for all custom node types

### React/Remix Rules

- **Functional components ONLY** - No class components
- **Components**: PascalCase (`SessionNode.tsx`, `AgentNode.tsx`)
- **Hooks**: camelCase with `use` prefix (`useCanvasStore.ts`, `usePolling.ts`)
- **Routes**: File-based in `app/routes/` - canvas page at `canvas.tsx`
- **Shared layout**: Canvas page uses existing root layout

### React Flow Rules (CRITICAL)

- **ALWAYS wrap custom nodes in `React.memo()`** - Prevents full re-renders
- **Define `nodeTypes` object OUTSIDE component** - Prevents recreation on render
- **Enable `onlyRenderVisibleElements`** - Virtualization for 100+ nodes
- **Use `useCallback` for all callbacks passed to ReactFlow**
- **Never filter full node/edge arrays in render path**

### Zustand State Management Rules

- **Use Immer middleware** for all state updates - Enables mutative syntax
- **Use selectors** when accessing state - Minimizes re-renders
- **Sliced store pattern** - Separate slices for nodes, edges, selection, stream, UI
- **Batch related updates** in single `set()` call
- **Never mutate state outside of `set()`**

```typescript
// CORRECT - Immer style
set((state) => { state.nodes.push(node); });

// WRONG - Direct mutation
nodes.push(node);
```

### Node ID Strategy

- **Use existing API UUIDs** - NEVER generate new IDs
- Session nodes: Use `sessionId` from API
- Message nodes: Use `uuid` from conversation messages
- Tool nodes: Use `tool_use_id` from content blocks
- Edge IDs: `${sourceId}->${targetId}`

### Styling Rules

- **Extend existing Tailwind config** - Don't replace
- **Anthropic colors**: Primary `#C15F3C`, Dark BG `#2b2a27`
- **shadcn/ui components**: Installed to `app/components/ui/`
- **Custom classes**: Use kebab-case (`canvas-node`, `node-active`)

---

## Project Structure Rules

### Feature Folder Pattern

All canvas code lives in `app/features/canvas/`:

```
app/features/canvas/
├── components/     # React components (Canvas, Sidebar, nodes/)
├── hooks/          # Custom hooks (useCanvasStore, usePolling, etc.)
├── lib/            # Utilities (transformer, layout, nodeStyles)
├── types/          # TypeScript interfaces
└── index.ts        # Feature exports
```

### Integration Boundaries

- **Canvas is READ-ONLY** - No API modifications to proxy
- **Uses existing endpoints**: `/api/conversations`, `/api/conversations/{id}`
- **Polling** for real-time updates - 1s interval using standard fetch
- **Shares root layout** with existing dashboard
- **Route path**: `/canvas`

---

## Error Handling Pattern

- **Toast notifications**: Transient errors (network timeout, retry succeeded)
- **Inline canvas state**: Persistent errors (API down, invalid data)
- **Error boundary**: Wrap canvas in `CanvasErrorBoundary`

```typescript
try {
  const data = await fetchConversation(id);
} catch (error) {
  if (isNetworkError(error)) {
    showToast('Connection lost. Retrying...');
  } else {
    setCanvasError(error);
  }
}
```

---

## Node Types & Visual States

### Node Hierarchy
```
Session → Agent → Subagent → Task → Tool Use/Result
```

### Node Type Constants
```typescript
export const NODE_TYPES = {
  SESSION: 'session',
  AGENT: 'agent',
  SUBAGENT: 'subagent',
  TASK: 'task',
  TOOL_USE: 'tool_use',
  TOOL_RESULT: 'tool_result',
} as const;
```

### Visual Status States
| State | Color | Meaning |
|-------|-------|---------|
| `pending` | Gray | Not started |
| `active` | Orange (pulsing) | Currently executing |
| `complete` | Green | Finished successfully |
| `error` | Red | Failed |

---

## Anti-Patterns to AVOID

1. **Never create new node IDs** - Always use UUIDs from the API
2. **Never prop drill** - Use Zustand selectors instead
3. **Never mutate state directly** - Always use Immer inside `set()`
4. **Never define nodeTypes inside component** - Causes re-renders
5. **Never skip React.memo()** on custom nodes - Kills performance
6. **Never modify the proxy backend** - Canvas is frontend-only

---

## Data Flow Pipeline

```
Proxy API → usePolling → transformer → Zustand Store → React Flow → Custom Nodes
```

1. `usePolling.ts` fetches `/api/conversations/{id}` every 1s
2. `transformer.ts` converts API response to nodes/edges
3. Zustand store updates via Immer
4. React Flow re-renders only changed nodes (via memo)

---

## Performance Checklist

Before submitting canvas code, verify:

- [ ] All custom nodes wrapped in `React.memo()`
- [ ] `nodeTypes` defined outside component
- [ ] `onlyRenderVisibleElements` enabled on ReactFlow
- [ ] Callbacks use `useCallback`
- [ ] Zustand accessed via selectors
- [ ] No full array filtering in render path
- [ ] Polling updates throttled/batched

---

## Usage Guidelines

**For AI Agents:**
- Read this file before implementing any canvas code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Never modify the proxy backend - canvas is frontend-only

**For Humans:**
- Keep this file lean and focused on agent needs
- Update when technology stack changes
- Review quarterly for outdated rules
- Remove rules that become obvious over time

---

**Last Updated:** 2026-01-04
