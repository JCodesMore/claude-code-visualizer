# Project Structure

## Overview

| Attribute | Value |
|-----------|-------|
| **Repository Type** | Multi-part (client/server architecture) |
| **Project Name** | Claude Code Proxy |
| **Purpose** | Transparent proxy for capturing and visualizing Claude Code API requests |
| **Parts Count** | 2 |

## Project Parts

### 1. proxy (Backend)

| Property | Value |
|----------|-------|
| **Part ID** | proxy |
| **Project Type** | backend |
| **Root Path** | `proxy/` |
| **Language** | Go 1.20 |
| **Entry Point** | `cmd/proxy/main.go` |

**Technology Stack:**
- Go 1.20
- gorilla/mux (HTTP router)
- gorilla/handlers (middleware)
- go-sqlite3 (database)
- gopkg.in/yaml.v3 (configuration)
- godotenv (environment variables)

**Key Features:**
- API proxy server (port 3001)
- Request interception & logging to SQLite
- Optional agent routing to other LLM providers (OpenAI)
- Configuration via YAML + environment variables
- Health check endpoint

**Directory Structure:**
```
proxy/
├── cmd/proxy/         # Application entry point
│   └── main.go
├── internal/          # Internal packages
│   ├── config/        # Configuration handling
│   ├── handler/       # HTTP handlers
│   ├── middleware/    # Logging middleware
│   ├── model/         # Data models
│   ├── provider/      # LLM providers (Anthropic, OpenAI)
│   └── service/       # Business logic (conversation, storage, routing)
├── go.mod
└── go.sum
```

### 2. web (Web Frontend)

| Property | Value |
|----------|-------|
| **Part ID** | web |
| **Project Type** | web |
| **Root Path** | `web/` |
| **Language** | TypeScript |
| **Framework** | Remix 2.16.8 |
| **Entry Points** | `app/entry.client.tsx`, `app/entry.server.tsx` |

**Technology Stack:**
- React 18.2
- Remix 2.16.8
- TypeScript 5.1
- Tailwind CSS 3.4
- Vite 6.0
- Lucide React (icons)

**Key Features:**
- Real-time dashboard (port 5173)
- Conversation visualization
- Request explorer with filtering
- Code diff viewer
- Message flow display
- Tool use visualization

**Directory Structure:**
```
web/
├── app/
│   ├── components/    # UI components
│   │   ├── CodeDiff.tsx
│   │   ├── CodeViewer.tsx
│   │   ├── ConversationThread.tsx
│   │   ├── MessageContent.tsx
│   │   ├── MessageFlow.tsx
│   │   └── ...
│   ├── routes/        # Remix routes (pages + API)
│   │   ├── _index.tsx
│   │   ├── api.conversations.tsx
│   │   ├── api.requests.tsx
│   │   └── api.grade-prompt.tsx
│   ├── utils/         # Utility functions
│   ├── entry.client.tsx
│   ├── entry.server.tsx
│   └── root.tsx
├── public/            # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## Integration Architecture

The two parts communicate as follows:

```
┌─────────────────┐      HTTP/REST      ┌─────────────────┐
│                 │ ←─────────────────→ │                 │
│   web (React)   │    Port 3001        │  proxy (Go)     │
│   Port 5173     │                     │                 │
└─────────────────┘                     └─────────────────┘
        │                                       │
        │ Dashboard UI                          │ Intercepts
        │ Request Explorer                      │ Logs to SQLite
        │ Conversation Viewer                   │ Optional LLM routing
        ▼                                       ▼
   User Browser                          Claude Code CLI
                                         (via ANTHROPIC_BASE_URL)
```

**Data Flow:**
1. Claude Code CLI sends requests to proxy (port 3001)
2. Proxy intercepts, logs to SQLite, forwards to Anthropic API
3. Web dashboard fetches logged data via API routes
4. Dashboard displays conversations, requests, tool usage
