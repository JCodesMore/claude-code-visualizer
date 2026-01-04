---
stepsCompleted: [1, 2, 3, 4]
status: 'complete'
completedAt: '2026-01-04'
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
workflowType: 'epics-and-stories'
project_name: 'claude-code-visualizer'
user_name: 'Jmd50'
date: '2026-01-04'
epicCount: 4
storyCount: 17
frCoverage: 38
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

---

## Epic 1: Canvas Foundation & Basic Visualization

User can access the canvas page and see Claude Code sessions as a basic hierarchical node graph.

### Story 1.1: Project Setup & Canvas Route Integration

As a **developer using Claude Code**,
I want **to navigate to a canvas visualization page from the existing dashboard**,
So that **I can access the visual representation of my Claude Code sessions**.

**Acceptance Criteria:**

**Given** the web dashboard is running
**When** I click the "Canvas" navigation link in the header
**Then** I am navigated to the `/canvas` route
**And** the page loads within the existing app layout

**Given** I am on the canvas page
**When** I click the dashboard navigation link
**Then** I am returned to the main dashboard view

**Given** a fresh project setup
**When** the canvas feature is initialized
**Then** React Flow, Zustand, and dagre dependencies are installed
**And** the `app/features/canvas/` folder structure exists
**And** shadcn/ui resizable component is available

---

### Story 1.2: Basic Canvas with API Integration

As a **developer using Claude Code**,
I want **to see a React Flow canvas that loads session data from the proxy API**,
So that **I can view my Claude Code session as a visual graph**.

**Acceptance Criteria:**

**Given** I am on the canvas page
**When** the page loads
**Then** a React Flow canvas is displayed in the main content area
**And** the canvas fetches data from `/api/conversations`

**Given** the proxy API returns session data
**When** the data is received
**Then** the Zustand store is populated with nodes and edges
**And** the canvas renders the session as a node graph

**Given** the proxy API is unavailable
**When** the fetch fails
**Then** an error state is displayed on the canvas
**And** the user can manually refresh to retry

---

### Story 1.3: Session & Agent Node Hierarchy

As a **developer using Claude Code**,
I want **to see the Session node as the root with Agent nodes as children**,
So that **I understand the hierarchical structure of my Claude Code session**.

**Acceptance Criteria:**

**Given** session data is loaded from the API
**When** the canvas renders
**Then** a Session node appears as the root of the hierarchy
**And** the Main Agent node appears as a child of the Session node
**And** connection lines are drawn between parent and child nodes

**Given** multiple agents exist in the session
**When** the canvas renders
**Then** each agent node is positioned below its parent
**And** the hierarchy is visually clear from top to bottom

---

### Story 1.4: Subagent Nodes & Connection Labels

As a **developer using Claude Code**,
I want **to see Subagent nodes as children of their spawning agent with labeled connections**,
So that **I understand which agent spawned which subagent and their relationships**.

**Acceptance Criteria:**

**Given** an agent has spawned subagents
**When** the canvas renders
**Then** Subagent nodes appear as children of the spawning agent
**And** the connection line displays "spawned" label

**Given** a subagent has returned results to its parent
**When** the result is captured
**Then** the connection indicates the "returned" relationship

**Given** nested subagents exist (subagent spawns another subagent)
**When** the canvas renders
**Then** the full hierarchy is displayed correctly with proper parent-child relationships

---

## Epic 2: Custom Nodes, Layout & Theming

User sees polished, properly positioned nodes with Anthropic branding and clear visual hierarchy.

### Story 2.1: Custom Node Components

As a **developer using Claude Code**,
I want **to see distinct visual representations for each node type**,
So that **I can immediately identify sessions, agents, subagents, tasks, and tool calls**.

**Acceptance Criteria:**

**Given** the canvas displays a session
**When** different node types are rendered
**Then** Session nodes have a distinct root-level appearance
**And** Agent nodes are visually distinct from Session nodes
**And** Subagent nodes are visually distinct from Agent nodes
**And** Task nodes represent background/foreground tasks
**And** ToolUse nodes show tool invocations
**And** ToolResult nodes show tool responses

**Given** custom node components are implemented
**When** they are rendered
**Then** each node type uses `React.memo()` for performance
**And** the `nodeTypes` object is defined outside the component

---

### Story 2.2: Dagre Layout Engine

As a **developer using Claude Code**,
I want **nodes to be automatically positioned in a top-down tree layout**,
So that **the hierarchical structure is immediately clear without manual arrangement**.

**Acceptance Criteria:**

**Given** session data is loaded with multiple nodes
**When** the canvas renders
**Then** nodes are automatically positioned using dagre.js
**And** the layout follows a top-down hierarchical structure
**And** parent nodes appear above their children

**Given** new nodes are added to the session
**When** the graph structure changes
**Then** the layout is recalculated within 50ms
**And** nodes smoothly transition to their new positions

**Given** the session has deep nesting (3+ levels)
**When** the canvas renders
**Then** the visual hierarchy remains clear at all levels

---

### Story 2.3: Dark Mode & Anthropic Theming

As a **developer using Claude Code**,
I want **the canvas to display in dark mode with Anthropic's color palette**,
So that **the interface is comfortable for extended use and visually consistent with Claude branding**.

**Acceptance Criteria:**

**Given** the user has dark mode enabled
**When** the canvas page loads
**Then** the background uses Anthropic dark color (#2b2a27)
**And** node colors complement the dark theme
**And** text remains readable with proper contrast

**Given** the Anthropic color palette
**When** nodes display status indicators
**Then** the primary accent color (#C15F3C) is used appropriately
**And** the color scheme feels warm and professional

**Given** the existing Tailwind configuration
**When** Anthropic colors are added
**Then** they extend (not replace) the existing config
**And** colors are available as Tailwind utilities

---

### Story 2.4: shadcn/ui Component Styling

As a **developer using Claude Code**,
I want **nodes and UI elements to use consistent shadcn/ui styling**,
So that **the canvas feels polished and integrates seamlessly with the existing dashboard**.

**Acceptance Criteria:**

**Given** shadcn/ui is configured in the project
**When** node components render
**Then** they use shadcn Card components for structure
**And** Badge components display node types or status
**And** styling is consistent with the existing dashboard

**Given** the canvas page layout
**When** UI elements are displayed
**Then** they follow shadcn/ui design patterns
**And** the visual language matches the rest of the application

---

## Epic 3: Real-Time Updates & Node Status

User watches agents work live, seeing nodes appear and status change in real-time.

### Story 3.1: Polling Mechanism & Auto-Refresh

As a **developer using Claude Code**,
I want **the canvas to automatically fetch updates from the proxy API**,
So that **I see the latest session state without manually refreshing the page**.

**Acceptance Criteria:**

**Given** I am viewing a session on the canvas
**When** the polling interval elapses (1 second)
**Then** the system fetches updated data from `/api/conversations/{id}`
**And** the Zustand store is updated with new data

**Given** the canvas is receiving updates
**When** new data arrives
**Then** the canvas updates automatically without page refresh
**And** updates are throttled to prevent render thrashing

**Given** polling is active
**When** the user navigates away from the canvas page
**Then** polling stops to conserve resources
**And** polling resumes when the user returns

---

### Story 3.2: Real-Time Node Appearance

As a **developer using Claude Code**,
I want **to see new nodes appear on the canvas as agents spawn during a live session**,
So that **I can watch the orchestration unfold in real-time**.

**Acceptance Criteria:**

**Given** a Claude Code session is actively running
**When** a new agent or subagent spawns
**Then** a new node appears on the canvas
**And** the node animates into view smoothly

**Given** new nodes are added during polling
**When** the layout updates
**Then** existing nodes shift to accommodate new nodes
**And** the transition is smooth (not jarring)

**Given** multiple nodes spawn in quick succession
**When** updates are received
**Then** all new nodes appear correctly
**And** the hierarchy remains accurate

---

### Story 3.3: Node Status Indicators

As a **developer using Claude Code**,
I want **to see visual status indicators on each node showing active, complete, or error states**,
So that **I can immediately understand what each agent is doing at a glance**.

**Acceptance Criteria:**

**Given** a node is actively executing
**When** the canvas renders
**Then** the node displays an orange/pulsing indicator
**And** the visual clearly communicates "in progress"

**Given** a node has completed successfully
**When** the canvas renders
**Then** the node displays a green indicator
**And** the visual clearly communicates "complete"

**Given** a node has encountered an error
**When** the canvas renders
**Then** the node displays a red indicator
**And** the visual clearly communicates "error"

**Given** nodes have different statuses
**When** viewing the canvas
**Then** I can distinguish between states at a glance via color coding
**And** the status is obvious without reading text

**Given** a node's status changes (e.g., active → complete)
**When** the update is received
**Then** the node's visual indicator updates smoothly
**And** the transition is noticeable but not disruptive

---

## Epic 4: Node Interaction, Detail Panel & Navigation

User can click nodes to inspect details, resize the sidebar, and navigate large agent trees.

### Story 4.1: Node Selection

As a **developer using Claude Code**,
I want **to click on any node to select it and see visual feedback**,
So that **I can focus on a specific agent or tool call for inspection**.

**Acceptance Criteria:**

**Given** the canvas displays nodes
**When** I click on a node
**Then** the node becomes selected
**And** the Zustand selection state is updated

**Given** a node is selected
**When** I view the canvas
**Then** the selected node has a distinct visual highlight (border, glow, or color change)
**And** it's immediately obvious which node is selected

**Given** a node is selected
**When** I click elsewhere on the canvas (not on a node)
**Then** the node is deselected
**And** the visual highlight is removed

---

### Story 4.2: Resizable Sidebar Panel

As a **developer using Claude Code**,
I want **to view a sidebar panel alongside the canvas that I can resize**,
So that **I can adjust how much space is devoted to details vs. the graph**.

**Acceptance Criteria:**

**Given** I am on the canvas page
**When** the page loads
**Then** a sidebar panel is visible alongside the canvas
**And** the layout uses shadcn/ui ResizablePanelGroup

**Given** the sidebar is displayed
**When** I drag the resize handle
**Then** the sidebar width adjusts accordingly
**And** the canvas resizes to fill remaining space

**Given** the sidebar has been resized
**When** I resize to a minimum width
**Then** the sidebar respects a minimum size constraint
**And** content remains usable

---

### Story 4.3: Sidebar Content Display

As a **developer using Claude Code**,
I want **to see messages, tool calls, and task prompts for the selected node in the sidebar**,
So that **I can understand exactly what that agent did or is doing**.

**Acceptance Criteria:**

**Given** an agent or subagent node is selected
**When** I view the sidebar
**Then** messages associated with that node are displayed
**And** messages are shown in chronological order

**Given** the selected node has tool calls
**When** I view the sidebar
**Then** tool_use blocks are displayed with tool name and input
**And** the tool call is visually distinct

**Given** the selected node has tool results
**When** I view the sidebar
**Then** tool_result blocks are displayed with output content
**And** results are associated with their corresponding tool calls

**Given** a subagent node is selected
**When** I view the sidebar
**Then** the task prompt that spawned the subagent is displayed
**And** the prompt is prominently shown at the top

---

### Story 4.4: Message Expand/Collapse

As a **developer using Claude Code**,
I want **to expand and collapse individual messages in the sidebar**,
So that **I can focus on specific messages without visual clutter**.

**Acceptance Criteria:**

**Given** messages are displayed in the sidebar
**When** I click a message's collapse control
**Then** the message content collapses to a summary view
**And** I can see more messages at once

**Given** a message is collapsed
**When** I click the expand control
**Then** the full message content is displayed
**And** I can read all details

**Given** long messages or tool results
**When** they are collapsed
**Then** a preview or summary is visible
**And** I can tell what type of content it is

---

### Story 4.5: Canvas Zoom & Pan

As a **developer using Claude Code**,
I want **to zoom and pan the canvas to navigate large agent trees**,
So that **I can see both the big picture and fine details**.

**Acceptance Criteria:**

**Given** I am viewing the canvas
**When** I use scroll wheel or pinch gesture
**Then** the canvas zooms in or out
**And** the zoom is centered on the cursor/gesture location

**Given** the canvas is zoomed
**When** I click and drag on empty canvas space
**Then** the viewport pans in the drag direction
**And** I can navigate to different areas of the graph

**Given** a large session with many nodes
**When** I zoom out
**Then** I can see the entire hierarchy structure
**And** nodes remain identifiable (not just dots)

---

### Story 4.6: Zoom Controls & Fit-to-View

As a **developer using Claude Code**,
I want **visible zoom controls and a fit-to-view button**,
So that **I can quickly adjust the viewport without gestures**.

**Acceptance Criteria:**

**Given** the canvas is displayed
**When** I view the controls area
**Then** zoom in (+) and zoom out (-) buttons are visible
**And** a fit-to-view button is available

**Given** I click the zoom in button
**When** the canvas updates
**Then** the viewport zooms in by a fixed increment
**And** the center of the view is preserved

**Given** I click the zoom out button
**When** the canvas updates
**Then** the viewport zooms out by a fixed increment
**And** the center of the view is preserved

**Given** I click the fit-to-view button
**When** the canvas updates
**Then** the viewport adjusts to show the entire graph
**And** all nodes are visible within the viewport
**And** appropriate padding is maintained
