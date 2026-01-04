---
stepsCompleted: [1, 2]
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
workflowType: 'epics-and-stories'
project_name: 'claude-code-visualizer'
user_name: 'Jmd50'
date: '2026-01-04'
---

# claude-code-visualizer - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for claude-code-visualizer Canvas Visualization feature, decomposing the requirements from the PRD and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

**Canvas Visualization (FR1-FR6)**
- FR1: User can view Claude Code session as a hierarchical node graph
- FR2: User can see Session node as the root of the hierarchy
- FR3: User can see Main Agent node as child of Session
- FR4: User can see Subagent nodes as children of their spawning agent
- FR5: User can see connection lines between parent and child nodes
- FR6: User can see labels on connections indicating relationship ("spawned", "returned")

**Real-Time Updates (FR7-FR10)**
- FR7: User can see new nodes appear on canvas as agents spawn during live session
- FR8: User can see node status change in real-time as agents execute
- FR9: User can see canvas update automatically without manual refresh
- FR10: System receives updates from existing proxy API endpoints

**Node Status & States (FR11-FR14)**
- FR11: User can see visual indication when a node is actively executing (in-progress state)
- FR12: User can see visual indication when a node has completed successfully
- FR13: User can see visual indication when a node has encountered an error
- FR14: User can distinguish between different node states at a glance via color coding

**Node Interaction (FR15-FR17)**
- FR15: User can click on any node to select it
- FR16: User can see visual indication of which node is currently selected
- FR17: User can deselect a node by clicking elsewhere on canvas

**Sidebar Detail Panel (FR18-FR24)**
- FR18: User can view a sidebar panel alongside the canvas
- FR19: User can resize the sidebar panel width
- FR20: User can see messages associated with the selected node in the sidebar
- FR21: User can see tool calls made by the selected agent in the sidebar
- FR22: User can see tool results returned to the selected agent in the sidebar
- FR23: User can see the task prompt for a subagent when that subagent is selected
- FR24: User can expand/collapse individual messages in the sidebar

**Canvas Navigation (FR25-FR29)**
- FR25: User can zoom in on the canvas to see more detail
- FR26: User can zoom out on the canvas to see more of the hierarchy
- FR27: User can pan the canvas to navigate to different areas
- FR28: User can use zoom controls (buttons or gestures) to adjust view
- FR29: User can fit entire graph in viewport with a single action

**Layout & Hierarchy (FR30-FR32)**
- FR30: System automatically positions nodes in a top-down tree layout
- FR31: System re-layouts graph when new nodes are added
- FR32: User can see clear visual hierarchy from Session → Agent → Subagents

**Theming & Appearance (FR33-FR35)**
- FR33: User can view the canvas page in dark mode
- FR34: User can see Anthropic-themed color palette applied to the interface
- FR35: User can see consistent styling with shadcn/ui components

**Integration (FR36-FR38)**
- FR36: User can navigate to canvas page from existing dashboard
- FR37: User can return to existing dashboard views from canvas page
- FR38: System reads session data from existing proxy API

### NonFunctional Requirements

**Performance (NFR1-NFR5)**
- NFR1: Canvas rendering at 60fps with up to 100 nodes visible
- NFR2: Streaming latency <100ms from proxy event to canvas update
- NFR3: Initial load <3 seconds to interactive canvas
- NFR4: Memory stability - no memory leaks during extended sessions
- NFR5: Layout calculation <50ms for re-layout when nodes added

**Integration (NFR6-NFR11)**
- NFR6: Data source is existing proxy REST API endpoints
- NFR7: Update mechanism uses polling (1s interval)
- NFR8: No changes to existing proxy API required
- NFR9: Canvas page coexists with existing dashboard without conflicts
- NFR10: New Remix route integrates with existing app shell
- NFR11: Reuses existing Tailwind config, layout components

**Reliability (NFR12-NFR14)**
- NFR12: Canvas displays error state if API connection fails
- NFR13: Manual page refresh recovers from connection issues
- NFR14: No data modification - read-only visualization

### Additional Requirements

**From Architecture - Technical Implementation:**
- Brownfield project - extends existing Remix 2.16 application
- New dependencies required: @xyflow/react, zustand, immer, dagre, @types/dagre, shadcn/ui components
- Node types to implement: session, agent, subagent, task, tool_use, tool_result
- Feature folder pattern: `app/features/canvas/`
- State management: Zustand with Immer middleware, sliced store pattern
- All custom nodes must be wrapped in React.memo() for performance
- Use existing API UUIDs for node IDs (never generate new ones)
- Polling at 1s interval using existing fetch patterns
- Route path: `/canvas`
- shadcn/ui components needed: resizable, card, badge, collapsible, scroll-area, toast

**From Architecture - Data Transformation:**
- API → Parser → Node/Edge Builder → Zustand Store → React Flow pipeline
- Transformer converts conversation messages to React Flow nodes/edges
- dagre.js for hierarchical tree layout calculation

**From Architecture - Error Handling:**
- Toast notifications for transient errors (network timeout, retry)
- Inline canvas state for persistent errors (API down, invalid data)
- Error boundary wrapping canvas component

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 1 | View session as hierarchical node graph |
| FR2 | Epic 1 | Session node as root |
| FR3 | Epic 1 | Main Agent as child of Session |
| FR4 | Epic 1 | Subagent nodes as children |
| FR5 | Epic 1 | Connection lines between nodes |
| FR6 | Epic 1 | Labels on connections |
| FR7 | Epic 3 | New nodes appear as agents spawn |
| FR8 | Epic 3 | Node status changes in real-time |
| FR9 | Epic 3 | Canvas updates automatically |
| FR10 | Epic 3 | System receives updates from proxy API |
| FR11 | Epic 3 | Visual indication of active execution |
| FR12 | Epic 3 | Visual indication of completion |
| FR13 | Epic 3 | Visual indication of error |
| FR14 | Epic 3 | Color-coded state distinction |
| FR15 | Epic 4 | Click to select node |
| FR16 | Epic 4 | Visual indication of selection |
| FR17 | Epic 4 | Deselect by clicking elsewhere |
| FR18 | Epic 4 | Sidebar panel alongside canvas |
| FR19 | Epic 4 | Resizable sidebar width |
| FR20 | Epic 4 | Messages for selected node |
| FR21 | Epic 4 | Tool calls in sidebar |
| FR22 | Epic 4 | Tool results in sidebar |
| FR23 | Epic 4 | Task prompt for subagents |
| FR24 | Epic 4 | Expand/collapse messages |
| FR25 | Epic 4 | Zoom in |
| FR26 | Epic 4 | Zoom out |
| FR27 | Epic 4 | Pan canvas |
| FR28 | Epic 4 | Zoom controls |
| FR29 | Epic 4 | Fit graph in viewport |
| FR30 | Epic 2 | Automatic top-down tree layout |
| FR31 | Epic 2 | Re-layout on new nodes |
| FR32 | Epic 2 | Clear visual hierarchy |
| FR33 | Epic 2 | Dark mode support |
| FR34 | Epic 2 | Anthropic-themed colors |
| FR35 | Epic 2 | shadcn/ui styling |
| FR36 | Epic 1 | Navigate to canvas from dashboard |
| FR37 | Epic 1 | Return to dashboard from canvas |
| FR38 | Epic 1 | Read session data from proxy API |

## Epic List

### Epic 1: Canvas Foundation & Basic Visualization
User can access the canvas page and see Claude Code sessions as a basic hierarchical node graph.

**What this enables:**
- New route `/canvas` accessible from dashboard
- React Flow canvas with Session → Agent → Subagent hierarchy
- Connection lines between nodes with relationship labels
- Basic integration with existing proxy API

**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR36, FR37, FR38

---

### Epic 2: Custom Nodes, Layout & Theming
User sees polished, properly positioned nodes with Anthropic branding and clear visual hierarchy.

**What this enables:**
- All 6 custom node types (session, agent, subagent, task, tool_use, tool_result)
- Automatic top-down tree layout via dagre
- Re-layout when nodes are added
- Dark mode with Anthropic colors
- Consistent shadcn/ui styling

**FRs covered:** FR30, FR31, FR32, FR33, FR34, FR35

---

### Epic 3: Real-Time Updates & Node Status
User watches agents work live, seeing nodes appear and status change in real-time.

**What this enables:**
- Polling updates from proxy API (1s interval)
- New nodes animate in as agents spawn
- Color-coded status (orange=active, green=complete, red=error)
- Canvas updates automatically without refresh

**FRs covered:** FR7, FR8, FR9, FR10, FR11, FR12, FR13, FR14

---

### Epic 4: Node Interaction, Detail Panel & Navigation
User can click nodes to inspect details, resize the sidebar, and navigate large agent trees.

**What this enables:**
- Click-to-select nodes with visual feedback
- Resizable sidebar showing messages, tool calls, task prompts
- Expand/collapse messages in sidebar
- Zoom, pan, and fit-to-view controls

**FRs covered:** FR15, FR16, FR17, FR18, FR19, FR20, FR21, FR22, FR23, FR24, FR25, FR26, FR27, FR28, FR29
