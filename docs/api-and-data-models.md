# API & Data Models Documentation

## Overview

This document details the API endpoints, data models, and data flow between the proxy backend and web frontend.

---

## Part: proxy (Backend API)

### REST API Endpoints

#### Core Proxy Endpoints

| Method | Endpoint | Purpose | Handler |
|--------|----------|---------|---------|
| POST | `/v1/messages` | Proxy Anthropic API requests | `Messages()` |
| POST | `/v1/chat/completions` | OpenAI-compatible endpoint | `ChatCompletions()` |
| GET | `/v1/models` | List available models | `Models()` |
| GET | `/health` | Health check | `Health()` |

#### Dashboard API Endpoints

| Method | Endpoint | Purpose | Handler |
|--------|----------|---------|---------|
| GET | `/` | Serve legacy UI | `UI()` |
| GET | `/api/requests` | List logged requests (paginated) | `GetRequests()` |
| DELETE | `/api/requests` | Clear request history | `DeleteRequests()` |
| GET | `/api/conversations` | List conversations | `GetConversations()` |
| GET | `/api/conversations/{id}` | Get conversation by ID | `GetConversationByID()` |
| GET | `/api/conversations/project` | Get conversations by project | `GetConversationsByProject()` |

### Query Parameters

#### `/api/requests`
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | int | 1 | Page number (1-indexed) |
| `limit` | int | 10 | Items per page |
| `model` | string | "all" | Filter by model name (opus, sonnet, haiku, all) |

#### `/api/conversations`
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | int | 1 | Page number |
| `limit` | int | 10 | Items per page |

#### `/api/conversations/{id}`
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Session ID (path param) |
| `project` | string | Yes | Project path (query param) |

---

## Data Models

### Core Models (Go - `proxy/internal/model/`)

#### RequestLog
Primary model for storing API requests.

```go
type RequestLog struct {
    RequestID     string              // Unique request identifier
    Timestamp     string              // RFC3339 timestamp
    Method        string              // HTTP method (POST, GET)
    Endpoint      string              // Request endpoint path
    Headers       map[string][]string // Sanitized request headers
    Body          interface{}         // Request body (parsed JSON)
    Model         string              // Model name
    OriginalModel string              // Model before routing
    RoutedModel   string              // Model after routing (if changed)
    UserAgent     string              // Client user agent
    ContentType   string              // Content-Type header
    PromptGrade   *PromptGrade        // Optional prompt grading results
    Response      *ResponseLog        // Response data (populated after)
}
```

#### ResponseLog
Response data attached to RequestLog.

```go
type ResponseLog struct {
    StatusCode      int                 // HTTP status code
    Headers         map[string][]string // Response headers
    Body            json.RawMessage     // Structured response body
    BodyText        string              // Raw text (for errors)
    ResponseTime    int64               // Time in milliseconds
    StreamingChunks []string            // SSE chunks (if streaming)
    IsStreaming     bool                // Whether response was streamed
    CompletedAt     string              // Completion timestamp
}
```

#### AnthropicRequest
Incoming API request structure.

```go
type AnthropicRequest struct {
    Model       string                   // Model identifier
    Messages    []AnthropicMessage       // Conversation messages
    MaxTokens   int                      // Maximum output tokens
    Temperature *float64                 // Temperature (optional)
    System      []AnthropicSystemMessage // System prompts
    Stream      bool                     // Enable streaming
    Tools       []Tool                   // Tool definitions
    ToolChoice  interface{}              // Tool selection config
}
```

#### AnthropicMessage
Individual message in conversation.

```go
type AnthropicMessage struct {
    Role    string      // "user" or "assistant"
    Content interface{} // Text or content blocks
}
```

#### ConversationMessage
Message from Claude Code JSONL files.

```go
type ConversationMessage struct {
    ParentUUID  *string         // Parent message UUID
    IsSidechain bool            // Is sidechain message
    UserType    string          // User type
    CWD         string          // Current working directory
    SessionID   string          // Session identifier
    Version     string          // Claude version
    Type        string          // "user" or "assistant"
    Message     json.RawMessage // Raw message content
    UUID        string          // Unique message UUID
    Timestamp   string          // RFC3339 timestamp
}
```

#### Conversation
Aggregated conversation session.

```go
type Conversation struct {
    SessionID    string                 // Unique session ID
    ProjectPath  string                 // Project directory path
    ProjectName  string                 // Display name
    Messages     []*ConversationMessage // All messages
    StartTime    time.Time              // First message time
    EndTime      time.Time              // Last message time
    MessageCount int                    // Total message count
}
```

---

## Database Schema

### SQLite Table: `requests`

```sql
CREATE TABLE IF NOT EXISTS requests (
    id TEXT PRIMARY KEY,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    method TEXT NOT NULL,
    endpoint TEXT NOT NULL,
    headers TEXT NOT NULL,      -- JSON string
    body TEXT NOT NULL,         -- JSON string
    user_agent TEXT,
    content_type TEXT,
    prompt_grade TEXT,          -- JSON string (nullable)
    response TEXT,              -- JSON string (nullable)
    model TEXT,
    original_model TEXT,
    routed_model TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_timestamp ON requests(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_endpoint ON requests(endpoint);
CREATE INDEX IF NOT EXISTS idx_model ON requests(model);
```

---

## Frontend Data Types (TypeScript)

### Request Interface

```typescript
interface Request {
  id: number;
  conversationId?: string;
  turnNumber?: number;
  isRoot?: boolean;
  timestamp: string;
  method: string;
  endpoint: string;
  headers: Record<string, string[]>;
  originalModel?: string;
  routedModel?: string;
  body?: {
    model?: string;
    messages?: Array<{
      role: string;
      content: any;
    }>;
    system?: Array<{
      text: string;
      type: string;
      cache_control?: { type: string };
    }>;
    tools?: Array<{
      name: string;
      description: string;
      input_schema?: {
        type: string;
        properties?: Record<string, any>;
        required?: string[];
      };
    }>;
    max_tokens?: number;
    temperature?: number;
    stream?: boolean;
  };
  response?: {
    statusCode: number;
    headers: Record<string, string[]>;
    body?: {
      usage?: {
        input_tokens?: number;
        output_tokens?: number;
        cache_creation_input_tokens?: number;
        cache_read_input_tokens?: number;
        service_tier?: string;
      };
      [key: string]: any;
    };
    bodyText?: string;
    responseTime: number;
    streamingChunks?: string[];
    isStreaming: boolean;
    completedAt: string;
  };
  promptGrade?: {
    score: number;
    criteria: Record<string, { score: number; feedback: string }>;
    feedback: string;
    improvedPrompt: string;
    gradingTimestamp: string;
  };
}
```

### ConversationSummary Interface

```typescript
interface ConversationSummary {
  id: string;
  requestCount: number;
  startTime: string;
  lastActivity: string;
  duration: number;
  firstMessage: string;
  lastMessage: string;
  projectName: string;
}
```

### Conversation Interface

```typescript
interface Conversation {
  sessionId: string;
  projectPath: string;
  projectName: string;
  messages: Array<{
    parentUuid: string | null;
    isSidechain: boolean;
    userType: string;
    cwd: string;
    sessionId: string;
    version: string;
    type: 'user' | 'assistant';
    message: any;
    uuid: string;
    timestamp: string;
  }>;
  startTime: string;
  endTime: string;
  messageCount: number;
}
```

---

## Data Flow

### Request Lifecycle

```
1. Claude Code CLI
   │
   ├── Sets ANTHROPIC_BASE_URL=http://localhost:3001
   │
   └── Sends POST /v1/messages
            │
            ▼
2. Proxy (Go)
   │
   ├── middleware/Logging → Captures body bytes
   │
   ├── handler/Messages()
   │   ├── Parse AnthropicRequest
   │   ├── ModelRouter.DetermineRoute() → Select provider
   │   ├── StorageService.SaveRequest() → Insert to SQLite
   │   ├── Provider.ForwardRequest() → Forward to Anthropic
   │   └── StorageService.UpdateRequestWithResponse()
   │
   └── Returns response to Claude Code
            │
            ▼
3. Web Dashboard (React)
   │
   ├── fetch('/api/requests') → Get logged requests
   │
   ├── fetch('/api/conversations') → Get conversation list
   │
   └── Render in UI components
```

### Conversation Loading

```
1. ConversationService
   │
   ├── Walks ~/.claude/projects/
   │
   ├── For each *.jsonl file:
   │   ├── parseConversationFile()
   │   ├── Extract messages (JSONL lines)
   │   └── Build Conversation struct
   │
   └── Returns map[projectPath][]*Conversation

2. Web Dashboard
   │
   ├── GET /api/conversations → Summary list
   │
   ├── Click conversation
   │   └── GET /api/conversations/{id}?project=...
   │
   └── Render ConversationThread component
```

---

## Key Business Logic

### Model Routing

The `ModelRouter` service determines which provider handles each request:

1. Parse original model from request
2. Check subagent configuration mappings
3. Select provider (Anthropic/OpenAI)
4. Update request body with routed model
5. Forward to selected provider

### Streaming Response Handling

For streamed responses (`stream: true`):

1. Set SSE headers (`text/event-stream`)
2. Scan response body line-by-line
3. Parse each `data:` event
4. Accumulate text deltas and tool calls
5. Forward chunks to client in real-time
6. Build final response body for storage
7. Update request record with complete response

### Conversation Extraction

Claude Code stores conversations in `~/.claude/projects/`:

1. Each project has a folder
2. Each session is a `.jsonl` file
3. Each line is a JSON message with:
   - `type`: "user" or "assistant"
   - `message`: Message content
   - `uuid`: Unique identifier
   - `timestamp`: RFC3339 time
   - `parentUuid`: For threading
