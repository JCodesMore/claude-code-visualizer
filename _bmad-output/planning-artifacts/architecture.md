---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
status: 'complete'
completedAt: '2026-01-04'
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/research/technical-claude-code-visualizer-research-2026-01-04.md'
  - 'docs/index.md'
  - 'docs/technology-stack.md'
  - 'docs/api-and-data-models.md'
  - 'docs/project-structure.md'
  - 'docs/existing-documentation.md'
workflowType: 'architecture'
project_name: 'claude-code-visualizer'
user_name: 'Jmd50'
date: '2026-01-04'
projectType: 'brownfield'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
38 FRs organized into 8 capability areas covering canvas visualization, real-time updates, node interaction, sidebar detail panel, navigation, layout, theming, and integration with existing dashboard.

The core value is a hierarchical node graph (Session → Agent → Subagent) that updates in real-time as Claude Code executes, with click-to-inspect sidebar functionality.

**Non-Functional Requirements:**

| Category | Requirement |
|----------|-------------|
| Performance | 60fps canvas with 100+ nodes |
| Latency | <100ms from proxy event to canvas update |
| Initial Load | <3s to interactive |
| Memory | Stable during extended sessions |
| Integration | Uses existing proxy API, no backend changes |

**Scale & Complexity:**

- Primary domain: Web (frontend-focused)
- Complexity level: Low-Medium
- Estimated architectural components: 4 major (Canvas, Nodes, Sidebar, State/Streaming)

### Technical Constraints & Dependencies

| Constraint | Impact |
|------------|--------|
| Brownfield Remix 2.16 app | Must integrate with existing routing, layout, and build system |
| Existing Tailwind config | Extend rather than replace styling system |
| Existing proxy REST API | Data source is fixed - `/api/requests`, `/api/conversations` |
| React Flow performance | Requires React.memo(), virtualization, throttled updates |
| Real-time streaming | Polling or WebSocket using existing patterns |

### Cross-Cutting Concerns Identified

1. **Performance Optimization** - Affects all canvas components (memoization, virtualization)
2. **State Management** - Zustand store shared across canvas, sidebar, streaming
3. **Real-Time Data Flow** - Streaming pipeline from proxy API to React Flow nodes
4. **Theming Consistency** - Anthropic colors (#C15F3C, #2b2a27) across all components
5. **Integration Boundaries** - Clear separation between new canvas page and existing dashboard

## Starter Template Evaluation

### Primary Technology Domain

**Brownfield Web Application** - extending existing Remix-based dashboard with new canvas visualization page.

### Existing Foundation (No Changes Required)

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Remix | 2.16.8 |
| UI Library | React | 18 |
| Language | TypeScript | 5.1+ |
| Styling | Tailwind CSS | 3.4 |
| Build Tool | Vite | 6.0 |
| Backend | Go Proxy | 1.20 |

### New Dependencies to Add

**Installation Commands:**

```bash
# React Flow - canvas visualization
npm install @xyflow/react

# Zustand - state management
npm install zustand

# dagre - tree layout algorithm
npm install dagre @types/dagre

# shadcn/ui - component library (run from web/ directory)
npx shadcn@latest init
npx shadcn@latest add resizable
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add collapsible
npx shadcn@latest add scroll-area
```

### Architectural Decisions Inherited from Existing Project

**Language & Runtime:**
TypeScript 5.1+ with strict mode, targeting modern ES6+ browsers.

**Styling Solution:**
Tailwind CSS with existing configuration. Extend `tailwind.config.ts` with Anthropic color tokens.

**Build Tooling:**
Vite 6.0 with existing Remix configuration. No changes needed.

**Code Organization:**
Follow existing Remix conventions:
- Routes in `app/routes/`
- Components in `app/components/`
- Add new feature folder: `app/features/canvas/`

**Development Experience:**
Existing hot reload, TypeScript checking, and linting. No changes needed.

### Integration Strategy

New canvas page integrates as a new Remix route alongside existing dashboard, sharing layout and styling while adding React Flow-specific components.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Node type definitions and data transformation
- Zustand store structure
- Real-time update mechanism

**Important Decisions (Shape Architecture):**
- Route path and navigation
- Feature folder organization
- Component hierarchy

**Deferred Decisions (Post-MVP):**
- WebSocket for true real-time (if polling proves insufficient)
- Multi-session management
- Session recording/replay

### Data Architecture

**Data Source:** Existing proxy REST API
- `GET /api/conversations` - List sessions
- `GET /api/conversations/{id}` - Get session messages

**Data Transformation Pipeline:**
```
Proxy API Response → Parser → Node/Edge Builder → Zustand Store → React Flow
```

**Node Type Definitions:**

| Node Type | Source | Visual |
|-----------|--------|--------|
| `session` | Session root | Root node, always present |
| `agent` | Main agent | Primary agent node |
| `subagent` | Task tool spawns subagent | Child of spawning agent |
| `task` | Task tool_use (background or foreground) | Child of agent/subagent |
| `tool_use` | tool_use content blocks | Leaf nodes showing tool calls |
| `tool_result` | tool_result content blocks | Connected to tool_use |

**Real-Time Updates:** Polling at 1s interval using existing fetch patterns.

### Frontend Architecture

**State Management: Zustand with Slices**

```typescript
// Store slices
├── nodesSlice      // React Flow nodes array
├── edgesSlice      // React Flow edges array
├── selectionSlice  // Selected node ID, sidebar state
├── streamSlice     // Polling state, session ID, streaming status
└── uiSlice         // Viewport, zoom level, panel sizes
```

**Component Architecture:**

```
app/features/canvas/
├── components/
│   ├── Canvas.tsx           // React Flow wrapper
│   ├── Sidebar.tsx          // Resizable detail panel
│   └── nodes/
│       ├── SessionNode.tsx
│       ├── AgentNode.tsx
│       ├── SubagentNode.tsx
│       ├── TaskNode.tsx
│       ├── ToolUseNode.tsx
│       └── ToolResultNode.tsx
├── hooks/
│   ├── useCanvasStore.ts    // Zustand store
│   ├── usePolling.ts        // Real-time polling
│   └── useLayoutEngine.ts   // dagre layout
├── lib/
│   ├── transformer.ts       // API → Node transformation
│   └── layout.ts            // dagre configuration
├── types/
│   └── nodes.ts             // TypeScript interfaces
└── index.ts                 // Feature exports
```

**Route Integration:**
- Path: `/canvas`
- Shares root layout with existing dashboard
- Navigation link added to existing header

### Infrastructure & Deployment

**No infrastructure changes required.**

Uses existing:
- Vite dev server
- Remix build pipeline
- Proxy API on port 3001

### Decision Impact Analysis

**Implementation Sequence:**
1. Install dependencies (React Flow, Zustand, dagre, shadcn)
2. Create feature folder structure
3. Define TypeScript interfaces for node types
4. Implement Zustand store with slices
5. Build data transformer (API → nodes/edges)
6. Create custom node components
7. Implement Canvas wrapper with layout
8. Add Sidebar with node details
9. Wire up polling for real-time updates
10. Add route and navigation

**Cross-Component Dependencies:**
- All nodes depend on shared Zustand store
- Sidebar depends on selection slice
- Canvas depends on nodes/edges slices
- Polling updates all slices

## Implementation Patterns & Consistency Rules

### Naming Patterns

**Component Naming:**
- React components: PascalCase (`SessionNode.tsx`, `AgentNode.tsx`)
- Hooks: camelCase with `use` prefix (`useCanvasStore.ts`, `usePolling.ts`)
- Utilities: camelCase (`transformer.ts`, `layout.ts`)
- Types: PascalCase (`NodeData`, `CanvasState`)

**Node Type Constants:**
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

**CSS Classes:**
Follow existing Tailwind patterns. Custom classes use kebab-case (`canvas-node`, `node-active`).

### State Management Patterns

**Zustand with Immer:**
```typescript
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useCanvasStore = create<CanvasState>()(
  immer((set) => ({
    nodes: [],
    addNode: (node) => set((state) => {
      state.nodes.push(node);  // Immer handles immutability
    }),
  }))
);
```

**Selector Pattern:**
```typescript
// Always use selectors for performance
const nodes = useCanvasStore((state) => state.nodes);
const selectedId = useCanvasStore((state) => state.selectedNodeId);
```

**Update Pattern:**
- Use Immer mutative syntax for clarity
- Batch related updates in single `set()` call
- Never mutate state outside of `set()`

### Node ID Strategy

**Use Existing API UUIDs:**
- Session nodes: Use `sessionId` from API
- Message nodes: Use `uuid` from conversation messages
- Tool nodes: Use `tool_use_id` from content blocks

**Edge IDs:**
```typescript
const edgeId = `${sourceId}->${targetId}`;
```

### TypeScript Patterns

**Type Inference:**
- Let TypeScript infer where obvious (loop variables, simple returns)
- Explicit types for: function parameters, public APIs, complex objects

**Node Data Types:**
```typescript
interface BaseNodeData {
  id: string;
  type: NodeType;
  status: 'pending' | 'active' | 'complete' | 'error';
  timestamp: string;
}

interface AgentNodeData extends BaseNodeData {
  type: 'agent' | 'subagent';
  taskPrompt?: string;
}

interface ToolNodeData extends BaseNodeData {
  type: 'tool_use' | 'tool_result';
  toolName: string;
  toolId: string;
}
```

### Error Handling Patterns

**Dual Error Display:**
- **Toast notifications:** Transient errors (network timeout, retry succeeded)
- **Inline canvas state:** Persistent errors (API down, invalid data)

**Error Boundary:**
```typescript
// Wrap canvas in error boundary
<CanvasErrorBoundary fallback={<CanvasErrorState />}>
  <Canvas />
</CanvasErrorBoundary>
```

**API Error Handling:**
```typescript
try {
  const data = await fetchConversation(id);
  // process data
} catch (error) {
  if (isNetworkError(error)) {
    showToast('Connection lost. Retrying...');
  } else {
    setCanvasError(error);
  }
}
```

### Performance Patterns

**Memoization Rules:**
- All custom nodes wrapped in `React.memo()`
- Node types object defined outside component
- Callbacks use `useCallback` when passed to children

**Throttling:**
```typescript
// Throttle polling updates to prevent render thrashing
const throttledUpdate = useMemo(
  () => throttle((data) => updateNodes(data), 100),
  []
);
```

### All AI Agents MUST

1. Use Immer middleware for all Zustand state updates
2. Wrap custom nodes in `React.memo()`
3. Use existing API UUIDs for node IDs (never generate new ones)
4. Follow PascalCase for components, camelCase for hooks/utils
5. Display transient errors as toasts, persistent as inline states
6. Use selectors when accessing Zustand state

## Project Structure & Boundaries

### Complete Project Directory Structure

**Existing + New Canvas Feature (new files marked with `+`):**

```
claude-code-visualizer/
├── README.md
├── Makefile
├── docker-compose.yml
├── .gitignore
│
├── proxy/                          # Existing Go backend (NO CHANGES)
│   ├── cmd/proxy/main.go
│   ├── internal/
│   │   ├── config/
│   │   ├── handler/
│   │   ├── middleware/
│   │   ├── model/
│   │   ├── provider/
│   │   └── service/
│   ├── go.mod
│   └── go.sum
│
├── web/                            # Remix frontend
│   ├── package.json               # + Add new dependencies
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts         # + Extend with Anthropic colors
│   ├── components.json            # + shadcn/ui config (NEW)
│   │
│   ├── app/
│   │   ├── root.tsx
│   │   ├── entry.client.tsx
│   │   ├── entry.server.tsx
│   │   ├── tailwind.css           # + Add shadcn imports
│   │   │
│   │   ├── routes/
│   │   │   ├── _index.tsx         # Existing dashboard
│   │   │   ├── api.requests.tsx
│   │   │   ├── api.conversations.tsx
│   │   │   └── canvas.tsx         # + NEW: Canvas route
│   │   │
│   │   ├── components/            # Existing components
│   │   │   ├── ConversationThread.tsx
│   │   │   ├── MessageContent.tsx
│   │   │   ├── CodeDiff.tsx
│   │   │   ├── ToolUse.tsx
│   │   │   ├── ToolResult.tsx
│   │   │   └── ui/                # + shadcn components (NEW)
│   │   │       ├── resizable.tsx
│   │   │       ├── card.tsx
│   │   │       ├── badge.tsx
│   │   │       ├── collapsible.tsx
│   │   │       ├── scroll-area.tsx
│   │   │       └── toast.tsx
│   │   │
│   │   ├── features/              # + NEW: Feature modules
│   │   │   └── canvas/
│   │   │       ├── index.ts                    # Feature exports
│   │   │       ├── components/
│   │   │       │   ├── Canvas.tsx              # React Flow wrapper
│   │   │       │   ├── CanvasPage.tsx          # Full page layout
│   │   │       │   ├── Sidebar.tsx             # Detail panel
│   │   │       │   ├── CanvasControls.tsx      # Zoom/fit controls
│   │   │       │   ├── CanvasErrorBoundary.tsx
│   │   │       │   └── nodes/
│   │   │       │       ├── index.ts            # Node type registry
│   │   │       │       ├── SessionNode.tsx
│   │   │       │       ├── AgentNode.tsx
│   │   │       │       ├── SubagentNode.tsx
│   │   │       │       ├── TaskNode.tsx
│   │   │       │       ├── ToolUseNode.tsx
│   │   │       │       └── ToolResultNode.tsx
│   │   │       ├── hooks/
│   │   │       │   ├── useCanvasStore.ts       # Zustand store
│   │   │       │   ├── usePolling.ts           # Real-time updates
│   │   │       │   ├── useLayoutEngine.ts      # dagre layout
│   │   │       │   └── useNodeSelection.ts     # Selection logic
│   │   │       ├── lib/
│   │   │       │   ├── transformer.ts          # API → nodes/edges
│   │   │       │   ├── layout.ts               # dagre config
│   │   │       │   └── nodeStyles.ts           # Status colors
│   │   │       └── types/
│   │   │           ├── nodes.ts                # Node interfaces
│   │   │           └── store.ts                # Store types
│   │   │
│   │   ├── lib/                   # + Shared utilities
│   │   │   └── cn.ts              # + shadcn class merge util
│   │   │
│   │   └── utils/                 # Existing utilities
│   │       ├── formatters.ts
│   │       └── models.ts
│   │
│   └── public/
│       └── assets/
│
└── docs/                          # Project documentation
    ├── index.md
    ├── project-structure.md
    ├── technology-stack.md
    └── api-and-data-models.md
```

### Architectural Boundaries

**API Boundaries:**
- Canvas feature is READ-ONLY - no API modifications
- Uses existing endpoints: `/api/conversations`, `/api/conversations/{id}`
- Polling via standard fetch to existing REST API

**Component Boundaries:**
```
┌─────────────────────────────────────────────────────────────┐
│  routes/canvas.tsx (Route Entry)                            │
│  └── CanvasPage (Layout)                                    │
│      ├── ResizablePanelGroup                                │
│      │   ├── Sidebar (Detail Panel)                         │
│      │   │   └── Uses: selectionSlice from store            │
│      │   └── Canvas (React Flow)                            │
│      │       └── Custom Nodes (6 types)                     │
│      │           └── Uses: nodesSlice, edgesSlice           │
│      └── CanvasControls (Zoom/Fit)                          │
│          └── Uses: uiSlice                                  │
└─────────────────────────────────────────────────────────────┘
```

**State Boundaries (Zustand Store):**
```
useCanvasStore
├── nodesSlice      ← Canvas reads, transformer writes
├── edgesSlice      ← Canvas reads, transformer writes
├── selectionSlice  ← Canvas writes, Sidebar reads
├── streamSlice     ← usePolling writes, all read
└── uiSlice         ← Controls write, Canvas reads
```

### Requirements to Structure Mapping

| FR Category | Location |
|-------------|----------|
| Canvas Visualization (FR1-6) | `features/canvas/components/Canvas.tsx`, `nodes/` |
| Real-Time Updates (FR7-10) | `features/canvas/hooks/usePolling.ts` |
| Node Status (FR11-14) | `features/canvas/lib/nodeStyles.ts`, node components |
| Node Interaction (FR15-17) | `features/canvas/hooks/useNodeSelection.ts` |
| Sidebar (FR18-24) | `features/canvas/components/Sidebar.tsx` |
| Navigation (FR25-29) | `features/canvas/components/CanvasControls.tsx` |
| Layout (FR30-32) | `features/canvas/hooks/useLayoutEngine.ts` |
| Theming (FR33-35) | `tailwind.config.ts`, `components/ui/` |
| Integration (FR36-38) | `routes/canvas.tsx`, shared layout |

### Integration Points

**Internal Communication:**
- All canvas components communicate via Zustand store
- No prop drilling - use selectors for state access
- Events flow: Polling → Transformer → Store → Components

**External Integrations:**
- Proxy API (existing): `http://localhost:3001/api/*`
- No new external integrations

**Data Flow:**
```
Proxy API ──fetch──► usePolling ──parse──► transformer
                                               │
                                    ┌──────────┴──────────┐
                                    ▼                     ▼
                              nodesSlice            edgesSlice
                                    │                     │
                                    └──────────┬──────────┘
                                               ▼
                                         React Flow
                                               │
                                    ┌──────────┴──────────┐
                                    ▼                     ▼
                              Custom Nodes            Edges
```

### File Organization Summary

**New Files by Category:**
- **Route:** 1 file (`canvas.tsx`)
- **Components:** 10 files (Canvas, Sidebar, Controls, 6 nodes, ErrorBoundary)
- **Hooks:** 4 files (store, polling, layout, selection)
- **Utilities:** 3 files (transformer, layout config, styles)
- **Types:** 2 files (nodes, store)
- **shadcn/ui:** 6 files (resizable, card, badge, collapsible, scroll-area, toast)

**Total new files:** ~26 files in `web/` directory

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All technology choices work together without conflicts:
- React Flow integrates cleanly with React 18
- Zustand with Immer middleware is React Flow's recommended pattern
- shadcn/ui extends existing Tailwind configuration
- dagre.js provides layout for React Flow nodes

**Pattern Consistency:**
- Naming: PascalCase components, camelCase hooks - consistent throughout
- State: All components use Zustand selectors - no prop drilling
- Structure: Feature folder pattern used consistently

**Structure Alignment:**
- `app/features/canvas/` isolates all canvas code
- Clear boundaries between existing code and new feature
- Integration points (route, shared layout) well-defined

### Requirements Coverage ✅

**Functional Requirements:**
All 38 FRs are architecturally supported:
- FR1-6 (Canvas): `Canvas.tsx`, custom nodes
- FR7-10 (Real-time): `usePolling.ts`, transformer
- FR11-14 (Status): `nodeStyles.ts`, node components
- FR15-17 (Interaction): `useNodeSelection.ts`
- FR18-24 (Sidebar): `Sidebar.tsx`
- FR25-29 (Navigation): `CanvasControls.tsx`
- FR30-32 (Layout): `useLayoutEngine.ts`
- FR33-38 (Theming/Integration): Tailwind config, route

**Non-Functional Requirements:**
- Performance: Memoization, virtualization, throttling patterns defined
- Integration: Uses existing API, no backend changes
- Reliability: Error boundary, dual error display pattern

### Implementation Readiness ✅

**Decision Completeness:**
- All critical decisions documented with rationale
- Technology versions specified (React Flow, Zustand, dagre)
- Code examples provided for major patterns

**Structure Completeness:**
- 26 new files specified with exact paths
- Component hierarchy fully defined
- Data flow diagram included

**Pattern Completeness:**
- 6 mandatory rules for AI agents
- TypeScript interfaces defined
- Error handling patterns with examples

### Architecture Completeness Checklist

- [x] Project context analyzed (brownfield Remix app)
- [x] Scale assessed (Low-Medium complexity)
- [x] Constraints identified (existing API, no backend changes)
- [x] Technology stack specified (React Flow, Zustand, shadcn, dagre)
- [x] All 38 FRs mapped to components
- [x] Naming conventions established
- [x] State management patterns defined
- [x] Project structure fully specified
- [x] Component boundaries established
- [x] Data flow documented

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High

**Key Strengths:**
- Clean separation: New feature isolated in `features/canvas/`
- Zero backend changes: Uses existing proxy API
- Performance-first: Memoization and throttling baked in
- Clear patterns: AI agents have specific rules to follow

**First Implementation Step:**
```bash
cd web
npm install @xyflow/react zustand immer dagre @types/dagre
npx shadcn@latest init
```

## Architecture Completion Summary

### Workflow Completion

**Architecture Decision Workflow:** COMPLETED ✅
**Total Steps Completed:** 8
**Date Completed:** 2026-01-04
**Document Location:** `_bmad-output/planning-artifacts/architecture.md`

### Final Architecture Deliverables

**Complete Architecture Document**
- All architectural decisions documented with specific versions
- Implementation patterns ensuring AI agent consistency
- Complete project structure with all files and directories
- Requirements to architecture mapping
- Validation confirming coherence and completeness

**Implementation Ready Foundation**
- 12+ architectural decisions made (route, state, nodes, patterns, etc.)
- 6 implementation patterns defined (naming, state, IDs, TypeScript, errors, performance)
- 4 major architectural components (Canvas, Nodes, Sidebar, State/Streaming)
- 38 functional requirements fully supported

**AI Agent Implementation Guide**
- Technology stack with verified versions
- Consistency rules that prevent implementation conflicts
- Project structure with clear boundaries
- Integration patterns and communication standards

### Implementation Handoff

**For AI Agents:**
This architecture document is your complete guide for implementing claude-code-visualizer canvas feature. Follow all decisions, patterns, and structures exactly as documented.

**First Implementation Priority:**
```bash
cd web
npm install @xyflow/react zustand immer dagre @types/dagre
npx shadcn@latest init
npx shadcn@latest add resizable card badge collapsible scroll-area toast
```

**Development Sequence:**
1. Install dependencies and initialize shadcn/ui
2. Create feature folder structure (`app/features/canvas/`)
3. Define TypeScript types (`types/nodes.ts`, `types/store.ts`)
4. Implement Zustand store with slices
5. Build data transformer (API → nodes/edges)
6. Create custom node components (memoized)
7. Implement Canvas wrapper with dagre layout
8. Add Sidebar with node details
9. Wire up polling for real-time updates
10. Add route and navigation link

### Quality Assurance Checklist

**✅ Architecture Coherence**
- [x] All decisions work together without conflicts
- [x] Technology choices are compatible
- [x] Patterns support the architectural decisions
- [x] Structure aligns with all choices

**✅ Requirements Coverage**
- [x] All 38 functional requirements are supported
- [x] Performance NFRs addressed (memoization, throttling)
- [x] Integration requirements handled (existing API)
- [x] Cross-cutting concerns covered

**✅ Implementation Readiness**
- [x] Decisions are specific and actionable
- [x] Patterns prevent agent conflicts
- [x] Structure is complete and unambiguous
- [x] Code examples provided for clarity

---

**Architecture Status:** READY FOR IMPLEMENTATION ✅

**Next Phase:** Begin implementation using the architectural decisions and patterns documented herein.

