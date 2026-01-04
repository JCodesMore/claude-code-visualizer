---
stepsCompleted: [1, 2, 3, 4, 7]
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
