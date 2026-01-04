---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments: []
workflowType: 'research'
lastStep: 1
research_type: 'technical'
research_topic: 'Claude Code Visualizer - Comprehensive Technical Foundation'
research_goals: 'Inform brainstorming refinement and PRD creation with patterns for React Flow, shadcn/ui integration, agent visualization precedents, and Anthropic branding'
user_name: 'Jmd50'
date: '2026-01-04'
web_research_enabled: true
source_verification: true
---

# Research Report: Technical

**Date:** 2026-01-04
**Author:** Jmd50
**Research Type:** Technical

---

## Research Overview

Comprehensive technical research to inform Claude Code Visualizer PRD and planning phase, covering:
- React Flow patterns for hierarchical agent trees
- shadcn/ui component integration with canvas
- Agent visualization patterns from existing tools (LangSmith, LangGraph, etc.)
- Anthropic design system and branding guidelines

---

## Technical Research Scope Confirmation

**Research Topic:** Claude Code Visualizer - Comprehensive Technical Foundation
**Research Goals:** Inform brainstorming refinement and PRD creation with patterns for React Flow, shadcn/ui integration, agent visualization precedents, and Anthropic branding

**Technical Research Scope:**

- Architecture Analysis - design patterns, frameworks, system architecture
- Implementation Approaches - development methodologies, coding patterns
- Technology Stack - languages, frameworks, tools, platforms
- Integration Patterns - APIs, protocols, interoperability
- Performance Considerations - scalability, optimization, patterns

**Research Methodology:**

- Current web data with rigorous source verification
- Multi-source validation for critical technical claims
- Confidence level framework for uncertain information
- Comprehensive technical coverage with architecture-specific insights

**Scope Confirmed:** 2026-01-04

---

## Technology Stack Analysis

### 1. React Flow - Core Visualization Library

#### Overview
React Flow (by xyflow) is the leading open-source library for building node-based UIs, interactive graphs, and flow charts in React. It's MIT licensed with optional Pro subscription for attribution removal and premium support.

**Source:** [React Flow Official](https://reactflow.dev/)

#### Hierarchical Layout Options

| Library | Best For | Limitations |
|---------|----------|-------------|
| **d3-hierarchy** | Single-root trees, treemaps, enclosure diagrams | Same width/height for all nodes |
| **dagre.js** | Simple tree layouts, DAGs | Basic layout options |
| **elkjs** | Advanced layouts, complex hierarchies | More configuration needed |
| **d3-flextree / entitree-flex** | Variable-sized nodes in trees | Newer, less battle-tested |
| **yFiles** | Enterprise-grade hierarchical layouts | Commercial licensing |

**Source:** [React Flow Layouting Overview](https://reactflow.dev/learn/layouting/layouting)

#### Performance Optimization - Critical Patterns

1. **Memoization is Essential**
   - Custom nodes/edges MUST use `React.memo()` or be declared outside parent components
   - Props must use `useCallback` and `useMemo` to prevent reference changes
   - Anonymous functions in props (e.g., `onNodeClick`) force re-renders of ALL nodes

2. **Avoid Direct Node/Edge Array Access**
   - Nodes/edges change frequently during drag/pan/zoom
   - Store selections in separate state (Zustand/Redux recommended)
   - Never filter full arrays in render path

3. **Built-in Virtualization**
   - Enable `onlyRenderVisibleElements` prop for large graphs
   - Only renders nodes currently in viewport
   - Significant performance boost for 100+ nodes

4. **Additional Optimizations**
   - Throttle/debounce drag/zoom handlers
   - Batch graph structure updates
   - Simplify CSS (avoid animations, shadows, gradients on nodes)
   - Implement node pooling for memory efficiency

**Benchmark:** 100 nodes with complex content (DataGrid) achieved 60 FPS with proper optimization.

**Source:** [React Flow Performance Guide](https://reactflow.dev/learn/advanced-use/performance), [Synergy Codes Optimization Guide](https://www.synergycodes.com/blog/guide-to-optimize-react-flow-project-performance)

#### Expand/Collapse Trees
React Flow supports expandable/collapsible nodes via custom `useExpandCollapse` hook. Maintains complete graph structure while rendering only visible portions.

**Source:** [React Flow Expand/Collapse Example](https://reactflow.dev/examples/layout/expand-collapse)

#### Pro Subscription
- Attribution removal for commercial use
- Internal Discord support channel
- Scheduled support calls
- Access to Pro Examples platform

**Source:** [React Flow Pro](https://reactflow.dev/pro)

---

### 2. shadcn/ui - Component Library Integration

#### Overview
shadcn/ui is a collection of re-usable React components built with Radix UI primitives and Tailwind CSS. Not a traditional npm package - components are copied into your project for full customization.

#### Resizable Panels
Built on `react-resizable-panels` by bvaughn.

**Key Features:**
- Keyboard accessibility (tab navigation, arrow key resizing)
- Tailwind CSS styling with smooth animations
- Constraint system (min/max sizes)
- Persistence support for saving user layouts
- Touch optimization

**Usage Pattern:**
```jsx
import { ResizableHandle, ResizablePanel, ResizablePanelGroup }
  from "@/components/ui/resizable"

<ResizablePanelGroup direction="horizontal">
  <ResizablePanel>Sidebar</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Canvas</ResizablePanel>
</ResizablePanelGroup>
```

**⚠️ Recent Breaking Change (December 2025):**
`react-resizable-panels` v4 changed API exports. v4 uses `{ Group, Panel, Separator }` and `aria` attributes instead of `data` attributes. Ensure version compatibility.

**Source:** [shadcn/ui Resizable](https://ui.shadcn.com/docs/components/resizable)

#### Canvas Integration Patterns
No direct canvas component in shadcn/ui. Integration approach:
- Use ResizablePanelGroup for layout structure
- Embed React Flow canvas in a ResizablePanel
- Combine with Collapsible for sidebar toggle
- Layer Sheet/Dialog for detail panels over canvas

---

### 3. Agent Visualization Precedents

#### LangGraph Studio - The Agent IDE

**Platform:** Desktop app (currently macOS Apple Silicon only)

**Core UI Patterns:**

| Feature | Description |
|---------|-------------|
| **Graph Mode** | Full-featured view with execution paths, node traversals, intermediate states |
| **Chat Mode** | Simplified conversational interface for testing |
| **Visual Graph Editor** | Drag-and-drop workflow design, live code sync with VS Code |
| **Real-time Updates** | Code changes instantly reflected in visualization |

**Debugging Features:**
- Interrupt functionality to edit AgentState before/after node execution
- Time-travel debugging through execution history
- Integration with LangSmith for observability

**Visual Layout:**
- Left panel: Flowchart-style graph with nodes (start, agent, action, end) connected by arrows
- Right panel: JSON-like data inspection pane with query results
- Real-time execution stream showing steps as they happen

**Source:** [LangGraph Studio Blog](https://blog.langchain.com/langgraph-studio-the-first-agent-ide/), [DataCamp Tutorial](https://www.datacamp.com/tutorial/langgraph-studio)

#### LangSmith Tracing Data Model

**Hierarchy:**
- **Threads** → Collections of Traces (full conversations)
- **Traces** → Single executions (tree of Runs)
- **Runs** → Individual steps (LLM calls, tool calls) in nested tree structure

**Deep Agent Challenges:**
- Agents run dozens/hundreds of steps over minutes
- Human-in-the-loop workflows with multiple interactions
- Large traces require specialized parsing/navigation

**Source:** [LangSmith Debugging Blog](https://blog.langchain.com/debugging-deep-agents-with-langsmith/)

#### Alternative Observability Tools

| Tool | Strengths | Best For |
|------|-----------|----------|
| **LangSmith** | Zero-config for LangChain, lowest overhead | LangChain ecosystem |
| **Arize Phoenix** | Fully open-source, framework-agnostic, hallucination detection | Multi-framework, self-hosted |
| **Langfuse** | Largest OSS adoption, battle-tested, MIT license | Production OSS deployments |
| **Comet Opik** | Unified ML experiment tracking | ML teams with broader workflows |
| **Helicone** | Cost tracking, semantic caching | Lightweight, budget-focused |
| **Braintrust** | Evaluation-first, side-by-side comparison | Prompt engineering focus |

**Key Standard:** OpenInference (by Arize) - open schema for LLM events built on OpenTelemetry. Adopted by multiple tools including LangSmith.

**Source:** [Arize AI LLM Tracing Tools](https://arize.com/blog/top-llm-tracing-tools/), [Softcery Platform Comparison](https://softcery.com/lab/top-8-observability-platforms-for-ai-agents-in-2025)

---

### 4. Anthropic Design System & Branding

#### Typography
- **Headings:** Styrene family (Commercial Type) - technically refined
- **Body:** Tiempos family (Klim) - charmingly quirky
- **Fallback Stack:** `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`

**Source:** [Geist/Anthropic Design](https://geist.co/work/anthropic)

#### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Crail (Primary)** | `#C15F3C` | Primary accent, warmth |
| **Terra Cotta** | `#da7756` | Alternative primary |
| **Orange Accent** | `#ae5630` | Interface accents |
| **Cloudy** | `#B1ADA1` | Neutral gray |
| **Pampas** | `#F4F3EE` | Light background |
| **Dark BG** | `#2b2a27` | Dark mode background |
| **White** | `#FFFFFF` | Light mode base |

**Design Philosophy:**
- Warm colors signal "helpful" rather than "demanding attention"
- Clean backgrounds reduce cognitive load for processing AI responses
- Dark mode maintains friendly feeling while being comfortable for long sessions
- Named after Claude Shannon (information theory) - data/computation heritage

**Source:** [Mobbin Claude Colors](https://mobbin.com/colors/brand/claude), [CLAILA Claude Logo Analysis](https://www.claila.com/blog/claude-logo)

#### Logo & Visual Identity
- Pure typographic design with slash detail (code reference)
- Standalone icon: Abstract starburst/pinwheel (ideas radiating)
- Rounded, humanistic typeface suggesting helpful assistant
- Not a literal "C" in the icon

**Source:** [yW!an Claude Branding Guide](https://www.ywian.com/blog/claude-branding-the-complete-guide)

#### Existing Claude Theme for shadcn/ui
Community-created Claude theme available that matches the brand aesthetic.

**Source:** [shadcn Claude Theme](https://www.shadcn.io/theme/claude)

---

### 5. Developer Tools UI Patterns (2025)

#### Dark Mode Best Practices

**Color Recommendations:**
- Avoid pure black (`#000000`) - causes eye strain
- Use soft dark grays: `#242424`, `#1b1b1b`, `#222222`
- Maintain contrast ratios for accessibility
- Softer tones at night, brighter during day (adaptive)

**Statistics:** 82% of mobile users prefer dark mode (2025)

**Source:** [UI Deploy Dark Mode Guide](https://ui-deploy.com/blog/complete-dark-mode-design-guide-ui-patterns-and-implementation-best-practices-2025)

#### IDE Panel Patterns (JetBrains 2025)
- "One Island" vs "Many Islands" UI styles
- Better separation between editor and tool windows
- More prominent navigation
- Improved tab visibility

**Source:** [JetBrains UI Blog](https://blog.jetbrains.com/platform/2025/06/testing-a-fresh-look-for-jetbrains-ides/)

---

### 6. Claude Code Integration Context

#### Current Architecture
- CLI-based agentic tool in terminal
- Subagent orchestration via `--agents` flag
- Tool calls: Bash, WebSearch, file operations
- Streaming responses with ToolUseBlock, ToolResultBlock, TextBlock

#### Visualization Opportunities
- Agent/subagent tree structure
- Tool call hierarchy
- Real-time execution streaming
- State inspection at each step

**Source:** [Claude Code GitHub](https://github.com/anthropics/claude-code), [Anthropic Agent Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)

---

## Integration Patterns Analysis

### 1. Claude Code Data Integration

#### Stream-JSON Output Format
Claude Code supports `--output-format stream-json` which emits **NDJSON (Newline-Delimited JSON)** with every token, turn, and tool interaction.

**Event Types:**
```
{"type":"system","subtype":"init","session_id":"...","tools":[...]}
{"type":"assistant","message":{"content":[{"type":"text","text":"..."}]}}
{"type":"assistant","message":{"content":[{"type":"tool_use","id":"...","name":"TodoWrite",...}]}}
{"type":"user","message":{"content":[{"type":"tool_result","tool_use_id":"...","content":"..."}]}}
{"type":"system","subtype":"result","stats":{...}}
```

**Content Block Types:**
- `text` - Assistant responses
- `tool_use` - Tool invocations with id, name, input
- `tool_result` - Tool execution results
- `thinking` - Extended thinking blocks (if enabled)

**Source:** [Claude Code Headless Mode](https://code.claude.com/docs/en/headless), [Anthropic Streaming Docs](https://docs.anthropic.com/en/api/messages-streaming)

#### CLI Integration Command
```bash
claude -p "your prompt" --output-format=stream-json --verbose
```
Also supports `--input-format stream-json` for bidirectional streaming.

**Source:** [Claude Code CLI Reference](https://code.claude.com/docs/en/cli-reference)

---

### 2. State Management Patterns

#### React Flow + Zustand (Recommended)

React Flow uses Zustand internally and recommends it for state management.

**Store Pattern:**
```typescript
import { create } from 'zustand'
import { Node, Edge, OnNodesChange, OnEdgesChange } from '@xyflow/react'

interface FlowStore {
  nodes: Node[]
  edges: Edge[]
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  setNodes: (nodes: Node[]) => void
  setEdges: (edges: Edge[]) => void
}

const useFlowStore = create<FlowStore>((set, get) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes) => { /* apply changes */ },
  onEdgesChange: (changes) => { /* apply changes */ },
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
}))
```

**Key Benefits:**
- Zero boilerplate, minimal setup
- Composable via "slices" of state
- Middleware and persistence support
- Works great for medium apps

**2025 Recommendation:** Use Zustand for UI state + React Query for server state (if needed).

**Source:** [React Flow State Management](https://reactflow.dev/learn/advanced-use/state-management), [Zustand vs Redux 2025](https://isitdev.com/zustand-vs-redux-toolkit-2025/)

#### Performance-Critical Patterns

| Pattern | Description |
|---------|-------------|
| **Separate Selection State** | Store selectedNodes separately to avoid full re-renders |
| **useNodesData Hook** | Subscribe to specific node data changes |
| **updateNodeData Callback** | Update node data without replacing entire node |
| **Memoized Selectors** | Access only needed state slices |

**Source:** [React Flow Performance](https://reactflow.dev/learn/advanced-use/performance)

---

### 3. Real-Time Streaming Patterns

#### SSE vs WebSocket for Claude Code Visualizer

| Criteria | SSE | WebSocket |
|----------|-----|-----------|
| **Direction** | Server → Client only | Bidirectional |
| **Auto-reconnect** | Built-in | Manual implementation |
| **Complexity** | Simpler, HTTP-based | Requires handshake |
| **Claude Code Fit** | ✅ Ideal (read-only stream) | Overkill for visualization |

**Recommendation:** Use **SSE or Fetch streaming** for reading Claude Code output since we're only consuming (not sending) data in real-time.

**Source:** [WebSocket vs SSE Guide](https://medium.com/@sulmanahmed135/websockets-vs-server-sent-events-sse-a-practical-guide-for-real-time-data-streaming-in-modern-c57037a5a589)

#### React Streaming Performance Optimization

| Technique | Purpose |
|-----------|---------|
| **Batch/Throttle Updates** | Prevent re-render on every token |
| **useRef for High-Frequency** | Store rapidly changing values without render |
| **Virtualized Lists** | Only render visible nodes in large trees |
| **Web Workers** | Offload JSON parsing to separate thread |
| **Memoization** | Prevent child re-renders |

**Source:** [Real-Time React Patterns](https://dev.to/serifcolakel/real-time-data-streaming-with-server-sent-events-sse-1gb2)

---

### 4. NDJSON Parsing Integration

#### What is NDJSON?
- Each line is a valid, complete JSON object
- No need to parse entire file before accessing data
- Perfect for streaming scenarios

#### JavaScript Parsing Options

**1. Native Fetch + ReadableStream:**
```typescript
const response = await fetch('/stream')
const reader = response.body.getReader()
const decoder = new TextDecoder()

let buffer = ''
while (true) {
  const { done, value } = await reader.read()
  if (done) break

  buffer += decoder.decode(value, { stream: true })
  const lines = buffer.split('\n')
  buffer = lines.pop() // Keep incomplete line

  for (const line of lines) {
    if (line.trim()) {
      const event = JSON.parse(line)
      processEvent(event)
    }
  }
}
```

**2. Libraries:**
- `ndjson` - Node.js transform streams
- `can-ndjson-stream` - Frontend NDJSON streams
- `json-stream-es` - TypeScript frontend/backend

**Source:** [ndjson npm](https://www.npmjs.com/package/ndjson), [NDJSON Spec](https://jsonltools.com/ndjson-format-specification)

---

### 5. Tree Data Structure Patterns

#### Claude Code → React Flow Node Transformation

**Input (Claude Code Stream):**
```json
{"type":"assistant","message":{"content":[{"type":"tool_use","id":"tool_1","name":"Read"}]}}
{"type":"user","message":{"content":[{"type":"tool_result","tool_use_id":"tool_1"}]}}
```

**Output (React Flow Nodes):**
```typescript
interface AgentNode extends Node {
  id: string
  type: 'agent' | 'tool_use' | 'tool_result' | 'text'
  data: {
    toolName?: string
    content?: string
    status: 'pending' | 'running' | 'completed' | 'error'
    parentId?: string
    timestamp: number
  }
  position: { x: number, y: number }
}
```

#### Tree Layout Data Patterns

| Approach | Library | Best For |
|----------|---------|----------|
| **Nested Children** | d3-hierarchy | Static trees with single root |
| **parentId Reference** | dagre.js | Dynamic trees, easy updates |
| **Adjacency List** | elkjs | Complex graphs, multiple roots |

**React Flow expects flat array** - convert nested structures:
```typescript
function flattenTree(node: TreeNode, parentId?: string): Node[] {
  const flatNode = { id: node.id, data: node, parentId }
  const children = node.children?.flatMap(c => flattenTree(c, node.id)) || []
  return [flatNode, ...children]
}
```

**Source:** [React Flow Layouting](https://reactflow.dev/learn/layouting/layouting)

---

### 6. Data Flow Architecture

#### Recommended Pipeline

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Claude Code    │────▶│  Stream Parser   │────▶│  Zustand Store  │
│  (NDJSON out)   │     │  (NDJSON → JSON) │     │  (nodes/edges)  │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  React Flow     │◀────│  Layout Engine   │◀────│  Tree Builder   │
│  (Visualization)│     │  (dagre/elk)     │     │  (flat nodes)   │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

#### Event Processing Strategy

1. **Buffer incoming NDJSON** - Parse line by line
2. **Map to internal model** - Convert content blocks to node types
3. **Update Zustand store** - Add/update nodes incrementally
4. **Trigger layout** - Recalculate positions on structure change
5. **React Flow renders** - Optimized via memoization

---

### 7. Multi-User Real-Time (Future Consideration)

For collaborative visualization (multiple users viewing same session):
- SuperViz provides React Flow integration
- Changes published to all participants
- Local state synced via events

**Source:** [SuperViz React Flow Tutorial](https://www.superviz.com/tutorials/add-real-time-sync-to-a-react-flow-application)

---

## Architectural Patterns & Recommendations

### 1. Application Architecture Options

#### Option A: Web Application (Recommended for V1)
**Stack:** Vite + React + React Flow + shadcn/ui

| Pros | Cons |
|------|------|
| Fastest development | Requires running alongside Claude Code |
| Easy deployment | No native system integration |
| Hot reload during dev | Browser context limitations |
| Shareable via URL | |

**Recommended for:** MVP, quick iteration, validation

#### Option B: Tauri Desktop App (Future)
**Stack:** Tauri 2.0 + React + Rust backend

| Pros | Cons |
|------|------|
| Lightweight (~10MB vs ~100MB Electron) | Rust learning curve |
| Low memory (~30-50MB) | Smaller ecosystem than Electron |
| Native system access | WebView differences across OS |
| iOS/Android path in 2.x | |

**Recommended for:** Production release, native integration with Claude Code CLI

#### Option C: Electron (Not Recommended)
Heavy resource usage, larger bundle size. Only consider if team has deep Electron experience.

**Source:** [Electron vs Tauri 2025](https://www.dolthub.com/blog/2025-11-13-electron-vs-tauri/), [Tauri 2.0](https://v2.tauri.app/)

---

### 2. React Component Architecture

#### Feature-Based Organization (Recommended)

```
src/
├── app/                    # App shell, providers, routing
│   ├── App.tsx
│   ├── providers/
│   └── routes/
├── features/               # Feature modules
│   ├── canvas/             # React Flow canvas feature
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── nodes/          # Custom node types
│   │   ├── edges/          # Custom edge types
│   │   └── store.ts        # Feature-specific Zustand slice
│   ├── stream/             # Claude Code stream handling
│   │   ├── parser/
│   │   ├── hooks/
│   │   └── types.ts
│   ├── inspector/          # Node detail panel
│   └── sidebar/            # Navigation/tree view
├── components/             # Shared UI components
│   └── ui/                 # shadcn/ui components
├── hooks/                  # Shared hooks
├── lib/                    # Utilities, helpers
├── stores/                 # Global Zustand stores
└── types/                  # Shared TypeScript types
```

**Key Principle:** Each feature folder is self-contained with its own components, hooks, and store slice.

**Source:** [Bulletproof React](https://github.com/alan2207/bulletproof-react), [React Folder Structure 2025](https://www.robinwieruch.de/react-folder-structure/)

---

### 3. Custom Node Architecture

#### Node Type System

```typescript
// nodes/types.ts
type NodeType =
  | 'session'      // Root: Claude Code session
  | 'turn'         // Conversation turn
  | 'text'         // Text content block
  | 'tool_use'     // Tool invocation
  | 'tool_result'  // Tool result
  | 'thinking'     // Extended thinking
  | 'error'        // Error state

interface BaseNodeData {
  id: string
  type: NodeType
  timestamp: number
  status: 'pending' | 'streaming' | 'complete' | 'error'
}

interface ToolUseNodeData extends BaseNodeData {
  type: 'tool_use'
  toolName: string
  toolId: string
  input: Record<string, unknown>
}
```

#### Custom Node Components

```typescript
// nodes/ToolUseNode.tsx
const ToolUseNode = memo(({ data }: NodeProps<ToolUseNodeData>) => {
  return (
    <Card className={cn(
      "min-w-[200px]",
      data.status === 'streaming' && "border-orange-500"
    )}>
      <Handle type="target" position={Position.Top} />
      <CardHeader>
        <Badge>{data.toolName}</Badge>
      </CardHeader>
      <CardContent>
        {/* Tool input preview */}
      </CardContent>
      <Handle type="source" position={Position.Bottom} />
    </Card>
  )
})
```

**Best Practice:** Treat each node as standalone, modular component.

**Source:** [React Flow Custom Nodes](https://reactflow.dev/learn/customization/custom-nodes)

---

### 4. State Architecture

#### Zustand Store Design

```typescript
// stores/flowStore.ts
interface FlowState {
  // Graph state
  nodes: Node[]
  edges: Edge[]

  // Session state
  sessionId: string | null
  isStreaming: boolean

  // UI state
  selectedNodeId: string | null
  viewport: Viewport

  // Actions
  addNode: (node: Node) => void
  updateNodeData: (id: string, data: Partial<NodeData>) => void
  setSelectedNode: (id: string | null) => void

  // Stream actions
  startSession: (sessionId: string) => void
  processEvent: (event: ClaudeCodeEvent) => void
}

const useFlowStore = create<FlowState>()(
  devtools(
    immer((set, get) => ({
      // ... implementation
    }))
  )
)
```

#### Store Slices Pattern
Split large stores into slices for maintainability:

```typescript
// stores/slices/nodesSlice.ts
// stores/slices/sessionSlice.ts
// stores/slices/uiSlice.ts
```

**Source:** [React Flow State Management](https://reactflow.dev/learn/advanced-use/state-management)

---

### 5. Layout Architecture

#### Recommended: Three-Panel Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Header: Session controls, status                           │
├────────────┬─────────────────────────────┬──────────────────┤
│            │                             │                  │
│  Sidebar   │      Canvas (React Flow)    │    Inspector     │
│  (Tree)    │                             │    (Details)     │
│            │                             │                  │
│            │                             │                  │
├────────────┴─────────────────────────────┴──────────────────┤
│  Footer: Status bar, minimap toggle                         │
└─────────────────────────────────────────────────────────────┘
```

#### Implementation with shadcn/ui

```tsx
<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={20} minSize={15}>
    <Sidebar />
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={55}>
    <ReactFlowProvider>
      <Canvas />
    </ReactFlowProvider>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={25} minSize={20}>
    <Inspector />
  </ResizablePanel>
</ResizablePanelGroup>
```

**Source:** [shadcn/ui Resizable](https://ui.shadcn.com/docs/components/resizable)

---

### 6. Monorepo Consideration (Future)

For future extensibility (plugins, multiple apps):

```
packages/
├── ui/               # Shared shadcn components
├── parser/           # Claude Code NDJSON parser
├── flow-nodes/       # Custom React Flow nodes
└── types/            # Shared TypeScript types

apps/
├── web/              # Web visualizer
└── desktop/          # Tauri app (future)
```

**Tool:** Turborepo for build orchestration

**Source:** [Turborepo Architecture](https://turborepo.com/docs/crafting-your-repository/creating-an-internal-package)

---

### 7. Design System Integration

#### Claude-Themed shadcn/ui Configuration

```typescript
// tailwind.config.ts
{
  theme: {
    extend: {
      colors: {
        claude: {
          primary: '#C15F3C',      // Crail
          accent: '#ae5630',       // Orange accent
          background: {
            light: '#F4F3EE',      // Pampas
            dark: '#2b2a27',       // Dark mode
          },
          neutral: '#B1ADA1',      // Cloudy
        }
      },
      fontFamily: {
        serif: ['ui-serif', 'Georgia', 'Cambria', 'serif'],
      }
    }
  }
}
```

#### Node Visual States

| State | Border | Background | Icon |
|-------|--------|------------|------|
| Pending | Gray | Neutral | Clock |
| Streaming | Orange (animated) | Light orange | Spinner |
| Complete | Green | Light green | Check |
| Error | Red | Light red | X |

**Source:** [shadcn Claude Theme](https://www.shadcn.io/theme/claude)

---

### 8. Performance Architecture

#### Rendering Optimization Strategy

```typescript
// 1. Memoized custom nodes
const ToolUseNode = memo(({ data }) => { ... })

// 2. Node types declared outside render
const nodeTypes = {
  tool_use: ToolUseNode,
  text: TextNode,
  // ...
}

// 3. Selective updates
const selectedNodeId = useFlowStore(
  (state) => state.selectedNodeId,
  shallow  // Prevents unnecessary re-renders
)

// 4. Virtualization for large trees
<ReactFlow
  onlyRenderVisibleElements={true}
  nodesDraggable={false}  // Reduce event handlers if not needed
/>
```

#### Event Batching for Streaming

```typescript
// Batch rapid updates
const batchedUpdate = useMemo(
  () => throttle((events: ClaudeCodeEvent[]) => {
    useFlowStore.getState().processEvents(events)
  }, 100),
  []
)
```

---

### 9. Technology Stack Summary

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Framework** | Vite + React 19 | Fast dev, modern React features |
| **Visualization** | React Flow | Best-in-class node-based UI |
| **UI Components** | shadcn/ui | Customizable, Tailwind-based |
| **Styling** | Tailwind CSS | Utility-first, dark mode support |
| **State** | Zustand | Lightweight, React Flow compatible |
| **Layout** | dagre.js | Dynamic hierarchical trees |
| **Streaming** | Fetch + ReadableStream | Native NDJSON parsing |
| **Types** | TypeScript | Full type safety |
| **Testing** | Vitest + Testing Library | Fast, React-focused |
| **Desktop (Future)** | Tauri 2.0 | Lightweight, cross-platform |

---

## Executive Summary & Key Recommendations

### Project Overview
The Claude Code Visualizer is a tool to visualize Claude Code agent execution as an interactive hierarchical tree, enabling developers to understand agent workflows, debug tool calls, and analyze conversation flows.

### Core Technical Decisions

#### ✅ Recommended Stack (V1)
```
Vite + React 19 + TypeScript
React Flow (visualization)
shadcn/ui + Tailwind CSS (UI)
Zustand (state management)
dagre.js (tree layout)
```

#### 🎯 Data Source
- Claude Code CLI with `--output-format stream-json`
- NDJSON streaming via Fetch API + ReadableStream
- Event types: `system`, `assistant`, `user` with content blocks

### Key Research Findings

| Area | Finding | Confidence |
|------|---------|------------|
| **React Flow** | Best library for node-based UIs, good perf with memoization | High |
| **shadcn/ui** | Excellent fit, Claude theme exists, resizable panels work well | High |
| **Zustand** | React Flow uses it internally, recommended for this use case | High |
| **LangGraph Studio** | Good UI reference (graph + inspector panels) | High |
| **Anthropic Branding** | Warm colors (#C15F3C), serif typography, soft dark mode | High |
| **Streaming** | SSE/Fetch preferred over WebSocket (unidirectional) | High |
| **Tauri** | Best desktop option for future, 10MB vs 100MB Electron | Medium |

### Differentiation Opportunities

1. **Cross-Platform** - LangGraph Studio is macOS-only (Apple Silicon)
2. **Claude-Native** - Purpose-built for Claude Code vs generic LLM tools
3. **Web-First** - No desktop app required for V1
4. **Open Source** - Community contribution potential

### Risk Mitigations

| Risk | Mitigation |
|------|------------|
| Large trace performance | Virtualization, memoization, throttled updates |
| Complex nested agents | Expand/collapse, focus mode, filtering |
| Streaming parsing | Buffer handling, error recovery |
| Dark mode consistency | Pre-defined color tokens, tested palettes |

### Recommended V1 Scope

**In Scope:**
- Read Claude Code NDJSON output
- Visualize as hierarchical tree
- Custom nodes for tool_use, text, tool_result
- Three-panel layout (sidebar, canvas, inspector)
- Dark mode with Claude branding
- Expand/collapse subtrees
- Node status indicators (pending/streaming/complete/error)

**Out of Scope (V2+):**
- Live Claude Code integration (auto-attach)
- Tauri desktop app
- Multi-session management
- Collaborative viewing
- Session recording/replay
- Time-travel debugging

### Next Steps for PRD

1. Define user personas and primary use cases
2. Specify MVP feature set with acceptance criteria
3. Create wireframes for three-panel layout
4. Define node type visual specifications
5. Plan integration approach (file upload vs live stream)

---

## Sources & References

### React Flow
- [React Flow Official](https://reactflow.dev/)
- [React Flow Layouting](https://reactflow.dev/learn/layouting/layouting)
- [React Flow Performance](https://reactflow.dev/learn/advanced-use/performance)
- [React Flow State Management](https://reactflow.dev/learn/advanced-use/state-management)
- [React Flow Custom Nodes](https://reactflow.dev/learn/customization/custom-nodes)

### shadcn/ui
- [shadcn/ui Resizable](https://ui.shadcn.com/docs/components/resizable)
- [shadcn Claude Theme](https://www.shadcn.io/theme/claude)

### Agent Visualization
- [LangGraph Studio Blog](https://blog.langchain.com/langgraph-studio-the-first-agent-ide/)
- [LangSmith Debugging](https://blog.langchain.com/debugging-deep-agents-with-langsmith/)
- [Arize AI LLM Tracing Tools](https://arize.com/blog/top-llm-tracing-tools/)

### Claude/Anthropic
- [Claude Code CLI Reference](https://code.claude.com/docs/en/cli-reference)
- [Claude Code Headless Mode](https://code.claude.com/docs/en/headless)
- [Anthropic Streaming Docs](https://docs.anthropic.com/en/api/messages-streaming)
- [Anthropic Engineering Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Mobbin Claude Colors](https://mobbin.com/colors/brand/claude)

### Architecture
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [React Folder Structure 2025](https://www.robinwieruch.de/react-folder-structure/)
- [Electron vs Tauri 2025](https://www.dolthub.com/blog/2025-11-13-electron-vs-tauri/)
- [Turborepo Architecture](https://turborepo.com/docs/crafting-your-repository/creating-an-internal-package)

### Streaming & Performance
- [ndjson npm](https://www.npmjs.com/package/ndjson)
- [WebSocket vs SSE Guide](https://medium.com/@sulmanahmed135/websockets-vs-server-sent-events-sse-a-practical-guide-for-real-time-data-streaming-in-modern-c57037a5a589)
- [Synergy Codes React Flow Performance](https://www.synergycodes.com/blog/guide-to-optimize-react-flow-project-performance)

---

**Research Completed:** 2026-01-04
**Document Version:** 1.0
**Status:** Ready for PRD Creation
