---
stepsCompleted: [1, 2, 3, 4, 7, 8, 9, 10, 11]
inputDocuments:
  - '_bmad-output/planning-artifacts/research/technical-claude-code-visualizer-research-2026-01-04.md'
  - '_bmad-output/analysis/brainstorming-session-2026-01-03.md'
  - 'docs/index.md'
  - 'docs/project-structure.md'
  - 'docs/technology-stack.md'
  - 'docs/api-and-data-models.md'
  - 'docs/existing-documentation.md'
workflowType: 'prd'
lastStep: 2
projectType: 'brownfield'
documentCounts:
  research: 1
  brainstorming: 1
  projectDocs: 5
  briefs: 0
---

# Product Requirements Document - claude-code-visualizer

**Author:** Jmd50
**Date:** 2026-01-04

## Executive Summary

Claude Code Visualizer currently provides a proxy dashboard for capturing and viewing Claude Code API traffic. This PRD defines a new **Canvas Visualization Page** - a dedicated view that transforms the linear CLI/message experience into an interactive, hierarchical graph showing agent orchestration in real-time.

The core value proposition: **Watch Claude Code agents work visually.** Instead of parsing terminal output or scrolling through message logs, developers see a live canvas where the Session spawns the Main Agent, subagents appear and spin up dynamically, tool calls execute, and results flow back - all animated and color-coded by status.

This feature complements (not replaces) the existing conversation thread view, offering a new mental model for understanding complex multi-agent workflows.

### What Makes This Special

The "aha moment" is **seeing orchestration unfold in real-time**:
- Subagent nodes appear and animate as they're spawned
- Status colors pulse (orange=active, green=complete, red=error)
- The hierarchy is immediately clear: Session → Main Agent → Subagents
- Click any node to see its messages in the sidebar - instant context switching
- No more "which agent called which tool?" confusion

**Key differentiators vs. existing tools:**
- **Web-based** - LangGraph Studio is macOS-only; this runs anywhere
- **Claude-native** - Purpose-built for Claude Code's agent/subagent model
- **Real-time first** - Streaming visualization, not just post-hoc trace viewing
- **Integrated** - Lives alongside the existing proxy dashboard

## Project Classification

| Attribute | Value |
|-----------|-------|
| **Technical Type** | web_app |
| **Domain** | Developer Tooling |
| **Complexity** | Low-Medium |
| **Project Context** | Brownfield - extending existing proxy dashboard |

**Existing Stack:** Go 1.20 (proxy), TypeScript/React 18/Remix 2.16 (web), SQLite

**New Feature Stack:** React Flow (canvas), shadcn/ui (components), Zustand (state), dagre.js (layout), Anthropic-themed design system

## Success Criteria

### User Success

**Core Metric:** Confidence and clarity in understanding Claude Code agent behavior

**Success Indicators:**
- User can explain the agent hierarchy (Session → Main Agent → Subagents) after viewing the canvas
- User identifies which agent/subagent performed a specific action without confusion
- User stops switching back to CLI to "double-check" what happened
- User experiences the "aha moment": "I finally understand what Claude Code is doing under the hood"

**Emotional Outcome:** Empowered, not overwhelmed. Clear mental model of multi-agent orchestration.

### Business Success

**Project Context:** Personal tooling + open source + portfolio showcase

| Timeframe | Success Metric |
|-----------|----------------|
| **1 month** | You use it daily when working with Claude Code |
| **3 months** | Public on GitHub, clean README, working demo |
| **12 months** | Community adoption: stars, forks, maybe external contributions |

**Portfolio Value:** Demonstrates proficiency with React Flow, real-time streaming, shadcn/ui, and complex state management.

### Technical Success

| Metric | Target |
|--------|--------|
| **Performance** | Smooth interaction with 100+ nodes on canvas |
| **Reliability** | Zero dropped events during real-time streaming |
| **Code Quality** | TypeScript strict mode, clean architecture, portfolio-worthy |
| **Compatibility** | Works with existing proxy dashboard without conflicts |

### Measurable Outcomes

- [ ] Canvas renders agent hierarchy correctly from JSONL data
- [ ] Real-time streaming updates canvas within 100ms of event
- [ ] Node states animate smoothly (active → complete → error)
- [ ] Sidebar correctly shows messages for selected node
- [ ] Works in dark mode with Anthropic theming

## Product Scope

### MVP - Minimum Viable Product

**Core Features:**
- React Flow canvas with Session → Agent → Subagent hierarchy
- Real-time streaming visualization from Claude Code output
- Resizable left sidebar showing messages for selected node
- Node states with animations (orange=active, green=complete, red=error)
- Connection lines with labels ("spawned" / "returned")
- Zoom/pan controls + breadcrumb navigation
- Anthropic-themed design with shadcn/ui
- Dark mode support

**Data:**
- Parse Claude Code NDJSON stream
- Detect subagent spawns via Task tool_use
- Map message types to visual nodes

### Growth Features (Post-MVP)

- Search/filter nodes and messages
- Minimap for large agent trees
- Multi-session management
- Session recording and replay

### Vision (Future)

- Timeline/scrubber for time-travel debugging
- Desktop app via Tauri
- Collaborative viewing (multiple users watching same session)
- Live Claude Code integration (auto-attach without manual stream)

## User Journeys

### Journey 1: Understanding the Agent Orchestra

**Persona:** Developer actively using Claude Code for complex tasks

**Trigger:** Running a Claude Code session with multiple subagents - terminal output is overwhelming, structure is unclear

**The Story:**

You're deep in a Claude Code session - you've asked it to refactor a module and it's spawning subagents left and right. The terminal is a waterfall of text: tool calls, responses, more tool calls. You know *something* is happening, but you can't see the shape of it.

You open the Canvas Visualization page. Instantly, the chaos becomes clarity. There's the Session node at the top. Below it, the Main Agent. And branching off - three subagents you didn't even realize had spawned. One is actively pulsing orange (still working on `src/utils`). Another is green (finished with tests). The third just appeared, animating into view as Claude spins up another helper.

You click the active orange node. The sidebar shows exactly what that subagent is doing - its task prompt, the tools it's calling, the files it's touching. No more scrolling through terminal history. No more "wait, which agent did that?"

You finally *see* Claude Code's brain at work. The hierarchy. The parallelism. The orchestration. It's not a wall of text anymore - it's a living diagram.

**Key Moments:**

| Stage | User Action | System Response | Emotional State |
|-------|-------------|-----------------|-----------------|
| **Opening** | Opens visualizer while Claude Code runs | Canvas displays current session hierarchy | Curious, hopeful |
| **Discovery** | Sees subagents they didn't know existed | Nodes animate in as they spawn | Surprised, enlightened |
| **Focus** | Clicks an active (orange) node | Sidebar shows that agent's messages/tools | Engaged, in control |
| **Clarity** | Understands which agent is doing what | Clear visual hierarchy with status colors | Confident, satisfied |

**Resolution:** Developer gains mental model of Claude Code's orchestration. No longer feels lost in terminal output. Uses visualizer as default companion when running complex sessions.

### Journey Requirements Summary

This journey reveals capabilities needed for:

| Capability Area | Requirements |
|-----------------|--------------|
| **Canvas Core** | React Flow canvas with Session → Agent → Subagent hierarchy |
| **Real-time Updates** | Nodes appear/animate as subagents spawn |
| **Status Indication** | Color-coded states (orange=active, green=complete, red=error) |
| **Node Selection** | Click node to view its details in sidebar |
| **Sidebar Display** | Show selected node's messages, tool calls, task prompt |
| **Visual Clarity** | Clean hierarchy that's instantly understandable |
| **Live Streaming** | Updates reflect current Claude Code activity |

## Web Application Requirements

### Project-Type Overview

This is a **brownfield web application** - a new Canvas Visualization page added to an existing Remix-based dashboard. The page provides real-time streaming visualization of Claude Code agent execution.

**Architecture Context:**
- Extends existing Remix 2.16 application
- Adds new route for canvas visualization
- Integrates with existing proxy backend (Go/SQLite)
- Shares existing Tailwind CSS configuration

### Browser Support

| Browser | Version | Priority |
|---------|---------|----------|
| Chrome | Latest 2 versions | Primary |
| Firefox | Latest 2 versions | Secondary |
| Safari | Latest 2 versions | Secondary |
| Edge | Latest 2 versions | Secondary |

**Note:** No IE11 support. Modern ES6+ features assumed.

### Responsive Design

**Desktop-first approach** - this is a developer tool used alongside terminal/IDE.

| Viewport | Support Level |
|----------|---------------|
| Desktop (1280px+) | Full feature set |
| Laptop (1024px+) | Full feature set |
| Tablet (768px+) | Functional but not optimized |
| Mobile (<768px) | Not supported for MVP |

### Performance Targets

| Metric | Target |
|--------|--------|
| **Canvas Performance** | Smooth 60fps with 100+ nodes |
| **Streaming Latency** | <100ms from event to render |
| **Initial Load** | <3s to interactive canvas |
| **Memory** | Stable under extended sessions |

**Optimization Strategy:**
- React.memo() for all custom nodes
- Virtualization via `onlyRenderVisibleElements`
- Throttled streaming updates
- Zustand for minimal re-renders

### Real-Time Requirements

| Requirement | Implementation |
|-------------|----------------|
| **Data Source** | Claude Code NDJSON stream |
| **Connection** | Fetch + ReadableStream (SSE-like) |
| **Update Frequency** | Per-event, throttled to 100ms batches |
| **Reconnection** | Manual refresh for MVP |

### SEO & Accessibility

| Aspect | Level |
|--------|-------|
| **SEO** | Not applicable - internal tool |
| **Accessibility** | Minimal - semantic HTML only |
| **Keyboard Nav** | Basic tab order |
| **Screen Readers** | Not prioritized for MVP |

### Implementation Considerations

**Integration Points:**
- New Remix route: `/canvas` or `/visualizer`
- Shared layout with existing dashboard
- Reuse existing Tailwind theme tokens
- Add React Flow and shadcn/ui dependencies

**Build Configuration:**
- Vite (existing)
- TypeScript strict mode
- Existing ESLint/Prettier config

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Experience MVP - deliver the core visual experience of watching agents work

**Scope Classification:** Simple MVP (solo developer, personal tooling, lean scope)

**Key Simplification:** Leverages existing proxy infrastructure - no new data ingestion needed. The proxy already captures all Claude Code traffic to SQLite. This page is a new visualization of existing data.

### Data Architecture (Existing)

```
Claude Code CLI → Proxy (:3001) → SQLite → REST API → Canvas Page
                                              ↑
                                    (existing endpoints)
```

**No new backend work required for MVP** - uses existing:
- `/api/requests` - logged API traffic
- `/api/conversations` - parsed JSONL sessions
- Existing WebSocket or polling for real-time updates (if available)

### MVP Feature Set (Phase 1)

**Core User Journey Supported:** "Understanding the Agent Orchestra"

**Must-Have Capabilities:**

| Feature | Description | Justification |
|---------|-------------|---------------|
| React Flow Canvas | Session → Agent → Subagent hierarchy | Core visual experience |
| Real-time Updates | Canvas updates as proxy receives traffic | "Watch agents work" value prop |
| Node Status States | Orange (active), green (complete), red (error) | Visual clarity |
| Node Selection | Click node to see details in sidebar | Context switching |
| Resizable Sidebar | Show messages for selected node | Detail inspection |
| Anthropic Theming | shadcn/ui + Anthropic color palette | Professional, branded look |
| Zoom/Pan Controls | Navigate large agent trees | Usability essential |

**Explicitly Out of MVP:**
- Breadcrumb navigation (can use canvas zoom instead)
- Search/filter
- Minimap
- Session management (use existing dashboard for that)

### Post-MVP Features

**Phase 2 (Growth):**
- Breadcrumb trail for deep hierarchies
- Search/filter nodes and messages
- Minimap for large sessions
- Session picker/switcher on canvas page

**Phase 3 (Expansion):**
- Timeline/scrubber for time-travel
- Session recording and replay controls
- Multi-session comparison view

### Vision (Future)

- Tauri desktop app
- Collaborative viewing (multiple users)
- Direct Claude Code integration (bypass proxy)

### Risk Mitigation Strategy

| Risk Type | Risk | Mitigation |
|-----------|------|------------|
| **Technical** | React Flow performance with 100+ nodes | Memoization, virtualization, throttled updates |
| **Technical** | Real-time sync with proxy data | Use existing polling/WebSocket patterns from dashboard |
| **Scope** | Feature creep | Strict MVP boundary - defer everything to Phase 2 |
| **Integration** | Breaking existing dashboard | New route, shared layout, no modifications to existing pages |

### Resource Requirements

**Team:** Solo developer
**Timeline:** MVP achievable in focused sprint
**Dependencies:** Existing proxy API must support real-time or near-real-time data access

## Functional Requirements

### Canvas Visualization

- FR1: User can view Claude Code session as a hierarchical node graph
- FR2: User can see Session node as the root of the hierarchy
- FR3: User can see Main Agent node as child of Session
- FR4: User can see Subagent nodes as children of their spawning agent
- FR5: User can see connection lines between parent and child nodes
- FR6: User can see labels on connections indicating relationship ("spawned", "returned")

### Real-Time Updates

- FR7: User can see new nodes appear on canvas as agents spawn during live session
- FR8: User can see node status change in real-time as agents execute
- FR9: User can see canvas update automatically without manual refresh
- FR10: System receives updates from existing proxy API endpoints

### Node Status & States

- FR11: User can see visual indication when a node is actively executing (in-progress state)
- FR12: User can see visual indication when a node has completed successfully
- FR13: User can see visual indication when a node has encountered an error
- FR14: User can distinguish between different node states at a glance via color coding

### Node Interaction

- FR15: User can click on any node to select it
- FR16: User can see visual indication of which node is currently selected
- FR17: User can deselect a node by clicking elsewhere on canvas

### Sidebar Detail Panel

- FR18: User can view a sidebar panel alongside the canvas
- FR19: User can resize the sidebar panel width
- FR20: User can see messages associated with the selected node in the sidebar
- FR21: User can see tool calls made by the selected agent in the sidebar
- FR22: User can see tool results returned to the selected agent in the sidebar
- FR23: User can see the task prompt for a subagent when that subagent is selected
- FR24: User can expand/collapse individual messages in the sidebar

### Canvas Navigation

- FR25: User can zoom in on the canvas to see more detail
- FR26: User can zoom out on the canvas to see more of the hierarchy
- FR27: User can pan the canvas to navigate to different areas
- FR28: User can use zoom controls (buttons or gestures) to adjust view
- FR29: User can fit entire graph in viewport with a single action

### Layout & Hierarchy

- FR30: System automatically positions nodes in a top-down tree layout
- FR31: System re-layouts graph when new nodes are added
- FR32: User can see clear visual hierarchy from Session → Agent → Subagents

### Theming & Appearance

- FR33: User can view the canvas page in dark mode
- FR34: User can see Anthropic-themed color palette applied to the interface
- FR35: User can see consistent styling with shadcn/ui components

### Integration

- FR36: User can navigate to canvas page from existing dashboard
- FR37: User can return to existing dashboard views from canvas page
- FR38: System reads session data from existing proxy API

## Non-Functional Requirements

### Performance

| Metric | Requirement | Rationale |
|--------|-------------|-----------|
| **Canvas Rendering** | 60fps with up to 100 nodes visible | Smooth animations for node status changes |
| **Streaming Latency** | <100ms from proxy event to canvas update | Real-time feel for "watching agents work" |
| **Initial Load** | <3 seconds to interactive canvas | Quick access when switching from terminal |
| **Memory Stability** | No memory leaks during extended sessions | Sessions can run for hours |
| **Layout Calculation** | <50ms for re-layout when nodes added | Seamless node appearance animations |

**Optimization Requirements:**
- React Flow virtualization enabled (`onlyRenderVisibleElements`)
- Custom nodes wrapped in `React.memo()`
- Streaming updates throttled/batched to prevent render thrashing
- Zustand selectors for minimal re-renders

### Integration

| Requirement | Specification |
|-------------|---------------|
| **Data Source** | Existing proxy REST API endpoints |
| **Update Mechanism** | Polling or WebSocket (use existing pattern from dashboard) |
| **API Compatibility** | No changes to existing proxy API required |
| **Coexistence** | Canvas page runs alongside existing dashboard without conflicts |
| **Routing** | New Remix route integrates with existing app shell |
| **Shared Resources** | Reuses existing Tailwind config, layout components |

### Reliability

| Requirement | Specification |
|-------------|---------------|
| **Error Handling** | Canvas displays error state if API connection fails |
| **Recovery** | Manual page refresh recovers from connection issues |
| **Data Integrity** | No data modification - read-only visualization |

**Explicitly Not Required (MVP):**
- Authentication/authorization
- HTTPS (local development tool)
- Audit logging
- Backup/recovery
- High availability
