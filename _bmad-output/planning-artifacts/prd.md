---
stepsCompleted: [1, 2, 3, 4]
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
