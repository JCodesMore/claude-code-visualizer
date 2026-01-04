# Claude Code Visualizer - Project Documentation

> Generated: 2026-01-03 | Scan Level: Deep | Status: Complete

## Project Overview

**Claude Code Visualizer** is a transparent proxy and web dashboard for capturing and visualizing Claude Code API requests. It intercepts API traffic between Claude Code CLI and Anthropic's API, logging requests/responses to SQLite and providing a real-time web dashboard for exploration.

| Attribute | Value |
|-----------|-------|
| **Type** | Multi-part (client/server) |
| **Parts** | 2 (proxy, web) |
| **Primary Languages** | Go, TypeScript |
| **License** | MIT |

---

## Quick Links

| Document | Description |
|----------|-------------|
| [Project Structure](./project-structure.md) | Architecture overview, directory structure, integration patterns |
| [Technology Stack](./technology-stack.md) | Languages, frameworks, dependencies per part |
| [API & Data Models](./api-and-data-models.md) | REST endpoints, data types, database schema |
| [Existing Documentation](./existing-documentation.md) | Inventory of original project docs |

---

## Architecture Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                     Claude Code Visualizer                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐         REST API        ┌──────────────────┐  │
│  │              │◄───────────────────────►│                  │  │
│  │  web (React) │        :3001            │   proxy (Go)     │  │
│  │    :5173     │                         │                  │  │
│  └──────────────┘                         └────────┬─────────┘  │
│        │                                           │            │
│        │ Dashboard UI                              │ Intercepts │
│        │ Conversations                             │ Logs       │
│        │ Request Explorer                          │ Routes     │
│        ▼                                           ▼            │
│   User Browser                              ┌─────────────┐     │
│                                             │   SQLite    │     │
│                                             │ requests.db │     │
│                                             └─────────────┘     │
│                                                    │            │
│                                                    ▼            │
│                                          Anthropic/OpenAI API   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Parts Overview

### 1. proxy (Backend)

| Property | Value |
|----------|-------|
| **Path** | `proxy/` |
| **Language** | Go 1.20 |
| **Framework** | gorilla/mux |
| **Database** | SQLite |
| **Port** | 3001 |

**Key Capabilities:**
- API proxy for Anthropic `/v1/messages` endpoint
- Request/response logging to SQLite
- Multi-provider routing (Anthropic, OpenAI)
- Conversation extraction from Claude Code JSONL files
- Streaming response support

**Entry Point:** `cmd/proxy/main.go`

### 2. web (Frontend)

| Property | Value |
|----------|-------|
| **Path** | `web/` |
| **Language** | TypeScript |
| **Framework** | Remix 2.16.8 |
| **UI** | React 18 + Tailwind CSS |
| **Port** | 5173 |

**Key Capabilities:**
- Real-time request dashboard
- Conversation thread viewer
- Code diff visualization
- Tool use/result display
- Model filtering (Opus/Sonnet/Haiku)

**Entry Point:** `app/root.tsx`

---

## Key Features

### Request Monitoring
- Intercepts all Claude Code → Anthropic API traffic
- Logs headers, body, response, timing
- Supports streaming responses
- Token usage tracking

### Conversation Visualization
- Reads Claude Code's `.jsonl` session files
- Displays message threads with user/assistant roles
- Shows tool calls and results
- Code blocks with syntax highlighting

### Model Routing
- Optional subagent model routing
- Can redirect specific models to different providers
- Supports Anthropic and OpenAI providers

---

## Development Quick Start

```bash
# Prerequisites: Go 1.20+, Node.js 20+

# Install dependencies
make install

# Run both services
make dev

# Access
# - Dashboard: http://localhost:5173
# - Proxy API: http://localhost:3001
```

### Configure Claude Code

```bash
export ANTHROPIC_BASE_URL=http://localhost:3001
```

---

## File Index

| File | Purpose |
|------|---------|
| `docs/index.md` | This file - master documentation index |
| `docs/project-structure.md` | Project architecture and structure |
| `docs/technology-stack.md` | Technology inventory per part |
| `docs/api-and-data-models.md` | API endpoints and data models |
| `docs/existing-documentation.md` | Original documentation inventory |
| `docs/project-scan-report.json` | Scan metadata and resume state |

---

## For AI Agents

This documentation was generated to provide context for AI-assisted development. Key files for understanding the codebase:

### Must-Read Files
1. `proxy/cmd/proxy/main.go` - Backend entry, route setup
2. `proxy/internal/handler/handlers.go` - API handlers
3. `proxy/internal/model/models.go` - Data structures
4. `proxy/internal/service/conversation.go` - JSONL parsing
5. `web/app/routes/_index.tsx` - Main dashboard page
6. `web/app/components/ConversationThread.tsx` - Conversation UI

### Understanding the Data Flow
1. Claude Code CLI sends requests to proxy (:3001)
2. Proxy logs to SQLite, forwards to Anthropic
3. Web dashboard fetches from proxy API
4. React components render conversations/requests

### Extension Points
- Add new API endpoints in `proxy/internal/handler/`
- Add new UI components in `web/app/components/`
- Add new routes in `web/app/routes/`
