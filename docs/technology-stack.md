# Technology Stack

## Overview

| Part | Language | Framework | Runtime |
|------|----------|-----------|---------|
| **proxy** | Go 1.20 | gorilla/mux | Go runtime |
| **web** | TypeScript | Remix 2.16.8 | Node.js 20+ |

---

## Part: proxy (Backend)

### Core Technologies

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Language** | Go | 1.20+ | Primary language |
| **HTTP Router** | gorilla/mux | 1.8.1 | RESTful routing |
| **Middleware** | gorilla/handlers | 1.5.2 | CORS, logging |
| **Database** | SQLite | via go-sqlite3 1.14.28 | Request/conversation storage |
| **Config** | gopkg.in/yaml.v3 | 3.0.1 | YAML configuration parsing |
| **Environment** | godotenv | 1.5.1 | .env file loading |

### Architecture Pattern

**Service-Oriented API Backend**

```
cmd/proxy/main.go (Entry Point)
    │
    ├── config/          → Configuration management (YAML + env vars)
    ├── middleware/      → Request logging
    ├── handler/         → HTTP handlers (request/response)
    ├── service/         → Business logic
    │   ├── anthropic    → Anthropic API client
    │   ├── conversation → Conversation threading
    │   ├── storage      → SQLite persistence
    │   └── model_router → Multi-provider routing
    ├── provider/        → LLM provider abstractions
    │   ├── anthropic    → Anthropic provider
    │   └── openai       → OpenAI provider
    └── model/           → Data structures
```

### API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/v1/messages` | Anthropic API proxy |
| POST | `/v1/chat/completions` | OpenAI-compatible endpoint |
| GET | `/v1/models` | List available models |
| GET | `/health` | Health check |
| GET | `/api/requests` | Get logged requests |
| DELETE | `/api/requests` | Clear request history |
| GET | `/api/conversations` | List conversations |
| GET | `/api/conversations/{id}` | Get conversation by ID |
| GET | `/api/conversations/project` | Get by project |

### Data Models

**RequestLog** - Core request logging structure
- requestId, timestamp, method, endpoint
- headers, body, model
- userAgent, contentType
- response (nested ResponseLog)

**AnthropicRequest/Response** - Anthropic API models
- messages, system, tools
- streaming support
- token usage tracking

### Configuration

- **Primary:** `config.yaml` (YAML)
- **Override:** Environment variables
- **Fallback:** Sensible defaults

Key config sections: Server, Providers (Anthropic, OpenAI), Storage, Subagents

---

## Part: web (Frontend)

### Core Technologies

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Language** | TypeScript | 5.1+ | Type-safe JavaScript |
| **Runtime** | Node.js | 20+ | JavaScript runtime |
| **Framework** | Remix | 2.16.8 | Full-stack React framework |
| **UI Library** | React | 18.2 | Component-based UI |
| **Styling** | Tailwind CSS | 3.4 | Utility-first CSS |
| **Build Tool** | Vite | 6.0 | Fast bundling/dev server |
| **Icons** | Lucide React | 0.522 | Icon library |

### Architecture Pattern

**Component-Based Remix Application**

```
app/
├── root.tsx              → App shell, global styles
├── entry.client.tsx      → Client hydration
├── entry.server.tsx      → Server rendering
├── routes/               → File-based routing
│   ├── _index.tsx        → Main dashboard
│   ├── api.requests.tsx  → Request list API
│   ├── api.conversations.tsx → Conversation API
│   └── api.grade-prompt.tsx  → Prompt grading
├── components/           → Reusable UI components
│   ├── ConversationThread.tsx
│   ├── MessageContent.tsx
│   ├── MessageFlow.tsx
│   ├── CodeDiff.tsx
│   ├── CodeViewer.tsx
│   ├── ToolUse.tsx
│   ├── ToolResult.tsx
│   ├── ImageContent.tsx
│   └── TodoList.tsx
├── utils/                → Helper functions
│   ├── formatters.ts     → Display formatting
│   └── models.ts         → Model utilities
└── tailwind.css          → Tailwind imports
```

### UI Components

| Component | Purpose |
|-----------|---------|
| `ConversationThread` | Display full conversation with messages |
| `MessageContent` | Render message content (text, tools, images) |
| `MessageFlow` | Visual message flow diagram |
| `CodeDiff` | Side-by-side code diff viewer |
| `CodeViewer` | Syntax-highlighted code display |
| `ToolUse` | Display tool/function calls |
| `ToolResult` | Display tool execution results |
| `ImageContent` | Render images in messages |
| `TodoList` | Display Claude's todo list |

### Styling

- **Framework:** Tailwind CSS with custom config
- **Font:** Inter (Google Fonts)
- **Theme:** Custom extensions for animations

### Build & Development

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run typecheck` | TypeScript checking |
| `npm run lint` | ESLint |

---

## Integration Architecture

### Communication Pattern

```
┌─────────────────┐                    ┌─────────────────┐
│   web (React)   │◄──── REST API ────►│  proxy (Go)     │
│   Port 5173     │                    │  Port 3001      │
└─────────────────┘                    └─────────────────┘
                                               │
                                               ▼
                                       ┌───────────────┐
                                       │    SQLite     │
                                       │  requests.db  │
                                       └───────────────┘
```

### API Contract

The web frontend calls the proxy's REST API:
- `GET /api/requests` → List logged requests
- `GET /api/conversations` → List conversations
- `GET /api/conversations/:id` → Get conversation details

### Data Flow

1. **Inbound:** Claude Code CLI → Proxy → Anthropic API
2. **Logging:** Proxy stores request/response in SQLite
3. **Display:** Web dashboard fetches from Proxy API
4. **Rendering:** React components visualize data

---

## Development Environment

### Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Go | 1.20+ | Backend compilation |
| Node.js | 20+ | Frontend runtime |
| npm | (with Node) | Package management |
| Make | (optional) | Build automation |

### Quick Start

```bash
# Install dependencies
make install

# Run both services
make dev
```

### Ports

| Service | Port | URL |
|---------|------|-----|
| Proxy API | 3001 | http://localhost:3001 |
| Web Dashboard | 5173 | http://localhost:5173 |
