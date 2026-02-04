# Architecture Research

**Domain:** AI Business Assistant / Virtual Secretary
**Researched:** 2026-02-04
**Confidence:** MEDIUM

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE LAYER                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │WhatsApp  │ │Telegram  │ │  Email   │ │  Slack   │ │   Web    │  │
│  │ Webhook  │ │ Webhook  │ │  IMAP/   │ │ Webhook  │ │   Chat   │  │
│  │          │ │          │ │   API    │ │          │ │          │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘  │
│       │            │            │            │            │         │
├───────┴────────────┴────────────┴────────────┴────────────┴─────────┤
│                      CHANNEL GATEWAY LAYER                           │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Multi-Channel Message Router (Unified Control Plane)         │  │
│  │  - Normalizes messages from all channels                      │  │
│  │  - Preserves channel identity & context                       │  │
│  │  - Routes to orchestrator                                     │  │
│  └─────────────────────────┬─────────────────────────────────────┘  │
│                            │                                         │
├────────────────────────────┴─────────────────────────────────────────┤
│                      ORCHESTRATION LAYER                             │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                 AI Orchestrator / Agent Core                 │    │
│  │  - Request routing (simple → fast model, complex → capable) │    │
│  │  - Intent classification                                     │    │
│  │  - Dialog management & state tracking                        │    │
│  │  - Tool selection & execution coordination                   │    │
│  └──────┬─────────────────┬─────────────────┬──────────────────┘    │
│         │                 │                 │                        │
├─────────┴─────────────────┴─────────────────┴────────────────────────┤
│                      INTELLIGENCE LAYER                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │     LLM      │  │     RAG      │  │    Action Executor       │  │
│  │  (GPT-4,     │  │   Engine     │  │  (Calendar, CRM, Email)  │  │
│  │   Claude)    │  │              │  │                          │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────────────────┘  │
│         │                 │                 │                        │
├─────────┴─────────────────┴─────────────────┴────────────────────────┤
│                         DATA LAYER                                   │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐    │
│  │ Vector DB  │  │ Relational │  │   Redis    │  │  Document  │    │
│  │ (Pinecone, │  │    (SQL)   │  │  (Cache &  │  │   Store    │    │
│  │  Chroma)   │  │            │  │  Session)  │  │            │    │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component             | Responsibility                                                                                         | Typical Implementation                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| **Channel Gateway**   | Normalize messages from different platforms into unified format; preserve channel-specific context     | Multi-channel webhook receiver with adapters per platform (WhatsApp API, Telegram Bot API, IMAP/SMTP) |
| **AI Orchestrator**   | Route requests to appropriate models/tools; manage conversation state; coordinate multi-step workflows | LangChain, Semantic Kernel, or custom orchestration with state machines                               |
| **Intent Classifier** | Analyze user query complexity; determine if simple FAQ or complex multi-step task                      | Fast LLM or fine-tuned classification model                                                           |
| **Dialog Manager**    | Track conversation context; manage multi-turn interactions; maintain session state                     | State store (Redis) + conversation history tracking                                                   |
| **RAG Engine**        | Retrieve relevant context from knowledge base; chunk, embed, and search documents                      | Vector DB (Pinecone, Chroma) + embedding model + hybrid retrieval (vector + BM25)                     |
| **LLM Core**          | Generate responses grounded in retrieved context; reason about actions                                 | GPT-4, Claude 3.5, or similar frontier models via API                                                 |
| **Action Executor**   | Perform external actions (calendar, email, CRM); validate permissions; handle API calls                | Tool/function calling with API integrations                                                           |
| **State Store**       | Maintain conversation sessions; cache computed contexts; track user preferences                        | Redis for real-time, PostgreSQL for persistent state                                                  |

## Recommended Project Structure

```
src/
├── channels/              # Channel-specific adapters
│   ├── whatsapp/          # WhatsApp webhook + API client
│   ├── telegram/          # Telegram bot integration
│   ├── email/             # IMAP/SMTP handlers
│   ├── slack/             # Slack app integration
│   ├── web/               # Web chat widget
│   └── gateway.ts         # Unified message router
├── core/                  # Core business logic
│   ├── orchestrator.ts    # Main orchestration layer
│   ├── intents.ts         # Intent classification
│   ├── dialog.ts          # Dialog management
│   └── state.ts           # State management
├── intelligence/          # AI components
│   ├── llm/               # LLM client wrappers
│   │   ├── openai.ts
│   │   └── anthropic.ts
│   ├── rag/               # RAG implementation
│   │   ├── chunker.ts     # Document chunking
│   │   ├── embedder.ts    # Embedding generation
│   │   ├── retriever.ts   # Hybrid retrieval
│   │   └── reranker.ts    # Result reranking
│   └── routing.ts         # Model routing logic
├── actions/               # External action handlers
│   ├── calendar.ts        # Calendar integration
│   ├── email.ts           # Email actions
│   ├── crm.ts             # CRM integration
│   └── registry.ts        # Tool registry
├── data/                  # Data access layer
│   ├── vector/            # Vector database client
│   ├── sql/               # Relational database
│   ├── cache/             # Redis cache
│   └── documents/         # Document storage
├── utils/                 # Shared utilities
│   ├── logger.ts          # Structured logging
│   ├── metrics.ts         # Monitoring/metrics
│   └── errors.ts          # Error handling
└── config/                # Configuration
    ├── channels.ts        # Channel configs
    ├── models.ts          # Model configs
    └── integrations.ts    # API credentials
```

### Structure Rationale

- **channels/:** Isolates platform-specific code, making it easy to add/remove channels without affecting core logic. Each adapter implements a common interface.
- **core/:** Contains the "brain" of the system - orchestration, intent classification, dialog management. This is channel-agnostic and reusable.
- **intelligence/:** Separates AI components (LLM, RAG) from business logic, allowing model swapping and independent testing.
- **actions/:** Each external integration is a separate module with consistent tool interface for orchestrator to call.
- **data/:** Abstracts data storage, enabling easy database swaps and testability.

## Architectural Patterns

### Pattern 1: Multi-Channel Gateway (One Brain, Many Channels)

**What:** A gateway pattern that funnels messages from all channels into a single control plane, while preserving channel identity, context, and routing rules. The assistant behaves as one entity that speaks many "languages" across platforms.

**When to use:** When building cross-platform assistants that need consistent behavior across WhatsApp, Telegram, Email, Slack, etc.

**Trade-offs:**

- **Pros:** Single codebase for business logic; consistent user experience; easier to maintain and test; add new channels without touching core logic
- **Cons:** Gateway becomes a single point of failure; channel-specific features may be harder to implement; requires careful abstraction design

**Example:**

```typescript
// Unified message format from all channels
interface NormalizedMessage {
  id: string;
  channelType: 'whatsapp' | 'telegram' | 'email' | 'slack' | 'web';
  channelId: string; // Original channel message ID
  userId: string;
  content: string;
  timestamp: Date;
  metadata: Record<string, any>; // Channel-specific data
}

// Gateway router
class ChannelGateway {
  async processMessage(rawMessage: any, channel: string): Promise<void> {
    // Normalize message from any channel
    const normalized = this.normalizeMessage(rawMessage, channel);

    // Route to orchestrator (channel-agnostic)
    await this.orchestrator.handleMessage(normalized);
  }

  async sendResponse(response: Response, channel: string): Promise<void> {
    // Denormalize and send via appropriate channel
    const adapter = this.getAdapter(channel);
    await adapter.send(response);
  }
}
```

### Pattern 2: Hybrid Retrieval with Reranking

**What:** RAG pattern that combines vector search (semantic similarity) with BM25 (keyword matching), then applies a cross-encoder reranking model to produce final results. This is the default recommended approach for production RAG in 2026.

**When to use:** When your assistant needs to answer questions based on a knowledge base (documents, emails, CRM data, etc.). Critical for business assistants that need to reference past communications and records.

**Trade-offs:**

- **Pros:** Better accuracy than pure vector or keyword search alone; handles both semantic and exact-match queries; reranking improves top-k precision
- **Cons:** Higher latency (three-stage process); more complex infrastructure (vector DB + search index + reranking model); increased compute costs

**Example:**

```typescript
class HybridRetriever {
  async retrieve(query: string, topK: number = 10): Promise<Document[]> {
    // Stage 1: Parallel retrieval
    const [vectorResults, bm25Results] = await Promise.all([
      this.vectorDB.search(query, topK * 2), // Over-retrieve
      this.searchIndex.bm25Search(query, topK * 2),
    ]);

    // Stage 2: Reciprocal Rank Fusion (RRF)
    const fusedResults = this.reciprocalRankFusion(vectorResults, bm25Results, topK * 2);

    // Stage 3: Cross-encoder reranking
    const reranked = await this.reranker.rerank(query, fusedResults, topK);

    return reranked;
  }
}
```

### Pattern 3: Request Routing with Model Tiering

**What:** An orchestration pattern that analyzes incoming requests and routes simple queries to fast, cheap models while sending complex reasoning tasks to capable, expensive models. Can reduce costs by 60-70% without impacting user experience.

**When to use:** Production systems with cost constraints and variable query complexity (common for business assistants with both simple FAQs and complex multi-step tasks).

**Trade-offs:**

- **Pros:** Dramatically reduced LLM costs; lower latency for simple queries; better resource utilization
- **Cons:** Complexity in classification logic; risk of misrouting (simple query to expensive model or complex query to cheap model); requires careful tuning

**Example:**

```typescript
class ModelRouter {
  async route(query: string, context: Context): Promise<Response> {
    // Classify query complexity
    const complexity = await this.classifyComplexity(query);

    // Route based on complexity
    switch (complexity) {
      case 'simple':
        // Fast, cheap model for FAQs
        return this.llm.query(query, { model: 'gpt-3.5-turbo' });

      case 'moderate':
        // Balanced model for standard tasks
        return this.llm.query(query, { model: 'gpt-4o-mini' });

      case 'complex':
        // Frontier model for reasoning, planning
        return this.llm.query(query, { model: 'gpt-4', temperature: 0.2 });

      default:
        // Default to moderate
        return this.llm.query(query, { model: 'gpt-4o-mini' });
    }
  }

  private async classifyComplexity(query: string): Promise<string> {
    // Use fast classifier (fine-tuned small model or simple heuristics)
    const features = {
      length: query.length,
      hasMultipleQuestions: query.split('?').length > 2,
      requiresPlanning: /schedule|organize|coordinate|arrange/.test(query),
      requiresExternal: /send|create|update|delete/.test(query),
    };

    if (features.requiresPlanning || features.requiresExternal) {
      return 'complex';
    } else if (features.length > 200 || features.hasMultipleQuestions) {
      return 'moderate';
    } else {
      return 'simple';
    }
  }
}
```

### Pattern 4: Timeout Cascade with Graceful Degradation

**What:** A reliability pattern where each layer defines acceptable wait times, and if exceeded, falls back to faster alternatives. Critical for production systems where user experience depends on predictable latency.

**When to use:** Production systems with external dependencies (embedding models, vector DBs, LLMs) that can occasionally have high latency or failures.

**Trade-offs:**

- **Pros:** Predictable user experience; system remains responsive under load; prevents cascading failures
- **Cons:** May return lower-quality results under stress; requires defining acceptable fallback paths; more complex error handling

**Example:**

```typescript
class ReliableOrchestrator {
  async handleMessage(message: NormalizedMessage): Promise<Response> {
    try {
      // Try RAG with timeout (10s)
      const context = await this.timeoutAfter(
        this.rag.retrieve(message.content),
        10000,
        'rag_timeout'
      );

      return await this.llm.generate(message.content, context);
    } catch (error) {
      if (error.code === 'rag_timeout') {
        // Fallback: Skip RAG, use LLM only (5s timeout)
        console.warn('RAG timeout, falling back to LLM-only');
        return await this.timeoutAfter(
          this.llm.generate(message.content, null),
          5000,
          'llm_timeout'
        );
      }

      if (error.code === 'llm_timeout') {
        // Final fallback: Cached response
        console.error('LLM timeout, using cached fallback');
        return this.getCachedFallback(message);
      }

      throw error;
    }
  }

  private async timeoutAfter<T>(promise: Promise<T>, ms: number, errorCode: string): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) => setTimeout(() => reject({ code: errorCode }), ms)),
    ]);
  }
}
```

### Pattern 5: Stateful Conversation Management with Session Isolation

**What:** Dialog management pattern that maintains conversation state across multiple turns while isolating sessions per user and channel. Critical for business assistants that handle multi-step workflows (scheduling meetings, coordinating tasks).

**When to use:** Any assistant with multi-turn conversations, context-dependent responses, or workflows spanning multiple messages.

**Trade-offs:**

- **Pros:** Enables coherent multi-turn conversations; supports complex workflows; prevents context leakage between users
- **Cons:** State storage overhead; session cleanup complexity; potential for stale state

**Example:**

```typescript
interface ConversationState {
  userId: string;
  channelType: string;
  sessionId: string;
  history: Message[];
  context: Record<string, any>; // Workflow-specific state
  lastActivity: Date;
  ttl: number; // Time to live in seconds
}

class DialogManager {
  constructor(private stateStore: Redis) {}

  async getOrCreateSession(userId: string, channelType: string): Promise<ConversationState> {
    const sessionKey = `session:${userId}:${channelType}`;
    const existing = await this.stateStore.get(sessionKey);

    if (existing) {
      return JSON.parse(existing);
    }

    const newSession: ConversationState = {
      userId,
      channelType,
      sessionId: generateId(),
      history: [],
      context: {},
      lastActivity: new Date(),
      ttl: 3600, // 1 hour
    };

    await this.stateStore.setex(sessionKey, newSession.ttl, JSON.stringify(newSession));

    return newSession;
  }

  async updateSession(
    session: ConversationState,
    message: Message,
    response: Response
  ): Promise<void> {
    session.history.push(message, response);
    session.lastActivity = new Date();

    // Keep only last 10 messages to prevent context bloat
    if (session.history.length > 10) {
      session.history = session.history.slice(-10);
    }

    const sessionKey = `session:${session.userId}:${session.channelType}`;
    await this.stateStore.setex(sessionKey, session.ttl, JSON.stringify(session));
  }
}
```

## Data Flow

### Request Flow

```
[User sends message via WhatsApp]
    ↓
[WhatsApp Webhook receives POST]
    ↓
[Channel Adapter normalizes to NormalizedMessage]
    ↓
[Gateway routes to Orchestrator]
    ↓
[Dialog Manager retrieves/creates session state]
    ↓
[Intent Classifier analyzes query complexity]
    ↓
    ├─→ [Simple query] → [Fast LLM] → [Generate response]
    │
    └─→ [Complex query] → [RAG Retrieval]
                            ↓
                       [Hybrid Search: Vector + BM25]
                            ↓
                       [Rerank top results]
                            ↓
                       [Frontier LLM with context]
                            ↓
                       [Action Executor if needed]
                            ↓
                       [Generate response]
    ↓
[Dialog Manager updates session state]
    ↓
[Gateway denormalizes response for WhatsApp]
    ↓
[WhatsApp API sends message to user]
```

### State Management Flow

```
[User Message] → [Session Lookup in Redis]
                      ↓
                 [Session exists?]
                      ├─→ [Yes] → Load conversation history + context
                      └─→ [No] → Create new session
                      ↓
              [Process with context]
                      ↓
              [Update session state]
                      ↓
              [Persist to Redis with TTL]
                      ↓
              [Background: Persist important convos to PostgreSQL]
```

### RAG Data Flow

```
[Document ingestion]
    ↓
[Chunk into semantic units (512-1024 tokens)]
    ↓
[Enrich chunks with metadata (title, summary, keywords)]
    ↓
[Generate embeddings via OpenAI/Cohere]
    ↓
[Store in Vector DB (Pinecone/Chroma)]
    ↓
[Build BM25 index for keyword search]
    ↓
[At query time: Hybrid retrieval]
    ↓
[Rerank with cross-encoder]
    ↓
[Top-K results to LLM as context]
```

### Key Data Flows

1. **Synchronous user interaction:** User message → orchestrator → LLM/RAG → response (target: < 3s latency)
2. **Asynchronous action execution:** LLM decides action → queue task → background worker → external API → notify user
3. **Knowledge base update:** New document → chunking pipeline → embedding → vector DB update (can be offline)
4. **Session cleanup:** Background job periodically expires old sessions from Redis, archives to PostgreSQL

## Demo vs Production Architecture

### Demo Architecture (GitHub Pages Static)

**Goal:** Demonstrate core assistant capabilities without backend infrastructure.

```
┌────────────────────────────────────────────┐
│          Static Web Interface              │
│  (React SPA on GitHub Pages)               │
├────────────────────────────────────────────┤
│   ┌───────────────────────────────────┐   │
│   │  Simulated Channel Gateway        │   │
│   │  (In-browser mock)                │   │
│   └───────────┬───────────────────────┘   │
│               │                            │
│   ┌───────────▼───────────────────────┐   │
│   │  Client-side Orchestrator         │   │
│   │  (Pattern matching + mock state)  │   │
│   └───────────┬───────────────────────┘   │
│               │                            │
│   ┌───────────▼───────────────────────┐   │
│   │  OpenAI/Anthropic API             │   │
│   │  (Direct browser calls)           │   │
│   └───────────────────────────────────┘   │
│                                            │
│   Mock Data:                               │
│   - Simulated conversations                │
│   - Sample documents (in-memory RAG)       │
│   - Fake integrations (calendar, email)    │
└────────────────────────────────────────────┘
```

**Demo Characteristics:**

- **Frontend only:** React SPA with all logic in browser
- **Mock channels:** Simulate different channel UIs (WhatsApp-like, Slack-like, Email-like) in one interface
- **Simplified orchestration:** Pattern matching + predefined scenarios instead of real intent classification
- **In-memory RAG:** Small knowledge base embedded in app, simple vector search (no backend DB)
- **Mock actions:** Simulated calendar/email/CRM actions with fake responses
- **API key in browser:** OpenAI/Anthropic API calls directly from browser (for demo only, with rate limits)

**Demo Limitations:**

- No persistent state (refresh loses context)
- No real channel integrations
- Limited knowledge base (100-200 documents max)
- API costs passed to user or demo key with limits
- No background processing

### Production Architecture (Full SaaS)

**Goal:** Scalable, reliable multi-tenant system with real integrations.

```
┌────────────────────────────────────────────────────────────┐
│                      Channel Layer                          │
│  WhatsApp API | Telegram Bot | IMAP/SMTP | Slack App       │
└──────────────────────────┬─────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│              Application Layer (Node.js)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐               │
│  │ Gateway  │  │Orchestr. │  │  Dialog  │               │
│  └──────────┘  └──────────┘  └──────────┘               │
└──────────────────────────┬───────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│              Intelligence Layer                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐               │
│  │   LLM    │  │   RAG    │  │ Actions  │               │
│  └──────────┘  └──────────┘  └──────────┘               │
└──────────────────────────┬───────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│              Data & Infrastructure Layer                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │Vector DB │  │PostgreSQL│  │  Redis   │  │  S3     │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
└──────────────────────────────────────────────────────────┘
```

**Production Characteristics:**

- **Backend services:** Node.js/Python microservices or monolith (start simple)
- **Real channel webhooks:** Verified webhooks for each platform with proper authentication
- **Production orchestration:** LangChain/Semantic Kernel with robust error handling
- **Vector DB:** Pinecone/Chroma/Weaviate for scalable RAG
- **Persistent state:** PostgreSQL for users/sessions, Redis for real-time cache
- **Background workers:** Queue-based processing for actions (BullMQ, Celery)
- **Multi-tenancy:** Tenant isolation, per-user API quotas, billing
- **Monitoring:** Structured logging, metrics (Datadog, New Relic), error tracking (Sentry)
- **Security:** API key management (Vault), webhook verification, rate limiting

### Migration Path: Demo → Production

| Component         | Demo              | Production                | Migration Strategy                                |
| ----------------- | ----------------- | ------------------------- | ------------------------------------------------- |
| **Channels**      | Simulated UI      | Real webhook integrations | Start with 1-2 channels, add incrementally        |
| **Orchestration** | Pattern matching  | LangChain/Semantic Kernel | Extract patterns as initial routing logic         |
| **State**         | In-memory         | Redis + PostgreSQL        | Lift state management code, add persistence layer |
| **RAG**           | In-memory vectors | Vector DB (Pinecone)      | Same chunking logic, swap storage backend         |
| **LLM**           | Direct API        | API with routing/caching  | Add routing layer around existing calls           |
| **Actions**       | Mock responses    | Real API integrations     | Replace mocks with OAuth + API clients            |
| **Auth**          | None              | Multi-tenant auth         | Add auth layer, migrate demo users                |

**Key Insight:** Build demo with production architecture in mind. Use interfaces and dependency injection so components can be swapped easily (e.g., `StateStore` interface with `InMemoryStateStore` for demo, `RedisStateStore` for production).

## Scaling Considerations

| Scale              | Architecture Adjustments                                                                                                                                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **0-100 users**    | Monolith is fine. Single server Node.js app, SQLite or small PostgreSQL, no vector DB (in-memory search). Optimize for fast iteration and feature completeness.                                                                                  |
| **100-10K users**  | Add caching layer (Redis). Migrate to proper vector DB (Pinecone/Chroma). Separate long-running tasks to background workers (BullMQ). Optimize chunking and retrieval. Still monolith or simple microservices.                                   |
| **10K-100K users** | Horizontal scaling: Load balancer + multiple app instances. Separate read/write databases. CDN for static assets. Rate limiting per tenant. Consider splitting heavy components (RAG, action executor) into separate services.                   |
| **100K+ users**    | Microservices architecture. Dedicated services for channels, orchestration, RAG, actions. Message queue between services. Distributed caching. Multi-region deployment. Dedicated infrastructure for AI workloads (GPU clusters for embeddings). |

### Scaling Priorities

1. **First bottleneck (1K-10K users):** Vector search latency. **Fix:** Optimize chunk size, use hybrid retrieval with caching, add reranking, upgrade to production vector DB with proper indexing.

2. **Second bottleneck (10K-50K users):** LLM API costs and latency. **Fix:** Implement model routing (simple queries to cheap models), aggressive caching of common queries, consider fine-tuned smaller models for frequent tasks, batch processing where possible.

3. **Third bottleneck (50K-100K users):** Database write contention (conversation state updates). **Fix:** Partition by user ID, use write-through cache, eventual consistency for non-critical updates, separate hot data (active sessions) from cold data (archived conversations).

4. **Fourth bottleneck (100K+ users):** Cross-region latency. **Fix:** Multi-region deployment with regional vector DB replicas, edge caching, async replication for knowledge base.

## Anti-Patterns

### Anti-Pattern 1: Tightly Coupling Channels to Business Logic

**What people do:** Implement business logic inside channel-specific handlers (e.g., WhatsApp handler directly calls OpenAI and processes results).

**Why it's wrong:** Adding a new channel requires duplicating all business logic. Testing becomes a nightmare (need to mock every channel). Changes to core logic require touching every channel handler. Inconsistent behavior across channels.

**Do this instead:** Use the Gateway pattern. Channel handlers only normalize/denormalize messages. All business logic lives in channel-agnostic orchestrator. Example:

```typescript
// BAD: Business logic in channel handler
app.post('/webhook/whatsapp', async (req, res) => {
  const message = req.body.message;
  const response = await openai.chat({ prompt: message }); // ❌
  await whatsappAPI.send(req.body.from, response);
  res.sendStatus(200);
});

// GOOD: Channel adapter delegates to orchestrator
app.post('/webhook/whatsapp', async (req, res) => {
  const normalized = whatsappAdapter.normalize(req.body); // ✅
  const response = await orchestrator.handle(normalized);
  await whatsappAdapter.send(response);
  res.sendStatus(200);
});
```

### Anti-Pattern 2: Treating RAG as a Black Box

**What people do:** Use default chunking (512 tokens), default embedding model, single vector search without testing alternatives. Deploy to production without measuring retrieval quality.

**Why it's wrong:** RAG systems have a 73% failure rate in enterprise deployments, mostly due to poor chunking and retrieval configuration. Chunking strategy has massive impact on retrieval accuracy. Default settings rarely work well for domain-specific data.

**Do this instead:** Follow systematic RAG development process:

1. Test multiple chunking strategies on your data (sentence-based, fixed-size, semantic)
2. Visualize embeddings to verify semantic grouping
3. Evaluate retrieval quality before connecting to LLM (precision@K, recall@K)
4. Use hybrid retrieval (vector + BM25) with reranking as baseline
5. Measure end-to-end (groundedness, completeness, relevancy)

```typescript
// BAD: Default RAG without evaluation
const chunks = document.split(512); // ❌ Arbitrary chunk size
const embedded = await embed(chunks);
await vectorDB.insert(embedded);

// GOOD: Systematic RAG with evaluation
// 1. Test chunking strategies
const strategies = [
  new SentenceChunker({ maxTokens: 512 }),
  new SemanticChunker({ similarityThreshold: 0.8 }),
  new FixedSizeChunker({ size: 1024, overlap: 128 }),
];

// 2. Evaluate each on test queries
const best = await evaluateChunkingStrategies(strategies, testQueries);

// 3. Use best strategy
const chunks = best.chunk(document);
const enriched = await enrichWithMetadata(chunks); // Add summaries, keywords
const embedded = await embed(enriched);
await vectorDB.insert(embedded);
```

### Anti-Pattern 3: No Timeout or Failure Handling

**What people do:** Make synchronous calls to LLM APIs without timeouts. Assume external services (vector DB, LLM providers) are always available. No fallback paths when services are slow or down.

**Why it's wrong:** LLM APIs can occasionally take 30+ seconds or fail entirely. Vector DB searches can time out under load. Without timeouts, your entire system hangs. Without fallbacks, users see cryptic errors instead of graceful degradation.

**Do this instead:** Implement timeout cascades with graceful degradation at every layer. Define acceptable latencies and fallback paths. Always have a "safe" response even if everything fails.

```typescript
// BAD: No timeout, no fallback
async function handleMessage(message: string): Promise<Response> {
  const context = await rag.retrieve(message); // ❌ Can hang forever
  const response = await llm.generate(message, context); // ❌ Can hang forever
  return response;
}

// GOOD: Timeouts with cascading fallbacks
async function handleMessage(message: string): Promise<Response> {
  try {
    // Try RAG with 10s timeout
    const context = await timeoutAfter(rag.retrieve(message), 10000);
    return await timeoutAfter(llm.generate(message, context), 15000);
  } catch (error) {
    if (error.code === 'TIMEOUT') {
      // Fallback 1: Skip RAG, LLM only (5s timeout)
      try {
        return await timeoutAfter(llm.generate(message, null), 5000);
      } catch {
        // Fallback 2: Cached response
        return getCachedFallback(message);
      }
    }
    throw error;
  }
}
```

### Anti-Pattern 4: Stateless RAG for Multi-Turn Conversations

**What people do:** Treat each user message independently. Retrieve context only based on current message, ignoring conversation history. No session tracking.

**Why it's wrong:** Business assistants need to handle multi-turn workflows ("Schedule a meeting tomorrow at 2pm" → "Who should I invite?" → "John and Sarah"). Stateless RAG retrieves irrelevant context for follow-up questions. Users have to repeat context every message.

**Do this instead:** Maintain conversation state and incorporate history into retrieval. Resolve references ("it", "that meeting", "them") before retrieving. Track workflow state across turns.

```typescript
// BAD: Stateless, each message independent
async function handleMessage(message: string): Promise<Response> {
  const context = await rag.retrieve(message); // ❌ No history
  return await llm.generate(message, context);
}

// GOOD: Stateful with history-aware retrieval
async function handleMessage(message: string, session: ConversationState): Promise<Response> {
  // Resolve references using history
  const resolvedQuery = await resolveReferences(message, session.history);

  // Retrieve with conversation context
  const context = await rag.retrieve(resolvedQuery, {
    filters: { userId: session.userId },
    boostRecent: true, // Recent docs more relevant
    conversationContext: session.history.slice(-3), // Last 3 turns
  });

  // Generate with full context
  const response = await llm.generate(message, {
    context,
    conversationHistory: session.history,
    workflowState: session.context,
  });

  // Update session
  session.history.push({ role: 'user', content: message });
  session.history.push({ role: 'assistant', content: response });
  await saveSession(session);

  return response;
}
```

### Anti-Pattern 5: Premature Microservices

**What people do:** Start with microservices architecture from day one. Separate services for channel adapters, orchestration, RAG, actions, etc. Complex inter-service communication before understanding domain boundaries.

**Why it's wrong:** Microservices add massive operational complexity (deployment, monitoring, debugging, networking). Domain boundaries are unclear at early stages, leading to frequent refactoring across services. Development velocity tanks. Over-engineering for scale you don't have yet.

**Do this instead:** Start with a well-structured monolith. Use clear module boundaries and interfaces. Extract to microservices only when you have proven scalability needs and stable domain boundaries.

```typescript
// BAD: Day-one microservices
// service-1: channel-gateway (separate deploy)
// service-2: orchestrator (separate deploy)
// service-3: rag-engine (separate deploy)
// service-4: action-executor (separate deploy)
// Complex: Service mesh, distributed tracing, inter-service auth, ...

// GOOD: Modular monolith, ready to extract later
// src/
// ├── channels/         # Clear module boundary
// ├── core/             # Clear module boundary
// ├── intelligence/     # Clear module boundary
// └── actions/          # Clear module boundary
//
// All deployed together initially.
// When scaling needs arise (e.g., RAG becomes bottleneck):
// 1. RAG module already has clean interface
// 2. Extract to separate service
// 3. Replace in-process calls with HTTP/gRPC
// 4. Minimal changes to other modules
```

## Integration Points

### External Services

| Service                       | Integration Pattern                     | Notes                                                                                      |
| ----------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------ |
| **WhatsApp Business API**     | Webhook (inbound) + REST API (outbound) | Requires business verification; webhook must respond within 20s; supports media, templates |
| **Telegram Bot API**          | Long polling or webhook + REST API      | Simpler than WhatsApp; no verification; supports inline keyboards, rich media              |
| **Email (IMAP/SMTP)**         | IMAP for receiving, SMTP for sending    | Use oauth2 for Gmail/Outlook; handle threading (In-Reply-To, References headers)           |
| **Slack App**                 | Events API (webhook) + Web API          | OAuth2 for workspace installation; supports slash commands, interactive components         |
| **OpenAI API**                | REST API with streaming                 | Use streaming for lower perceived latency; implement exponential backoff; cache embeddings |
| **Anthropic (Claude)**        | REST API with streaming                 | Similar to OpenAI; supports larger contexts (200K tokens); good for long documents         |
| **Vector DB (Pinecone)**      | gRPC/REST API                           | Supports namespaces for multi-tenancy; upsert in batches; use metadata filtering           |
| **Calendar (Google/Outlook)** | OAuth2 + REST API                       | Requires user consent; handle timezone conversions; webhook for event updates              |
| **CRM (Salesforce, HubSpot)** | OAuth2 + REST API                       | Rate limits vary; use bulk APIs for large operations; webhook for real-time updates        |

### Internal Boundaries

| Boundary                         | Communication                                                     | Notes                                                                                                |
| -------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Channel ↔ Gateway**            | Direct function calls (monolith) or HTTP (microservices)          | Channel adapters implement `MessageAdapter` interface; gateway calls `adapter.normalize(rawMessage)` |
| **Gateway ↔ Orchestrator**       | Direct function calls (monolith) or message queue (microservices) | Gateway emits `MessageReceived` event; orchestrator subscribes; ensures at-least-once delivery       |
| **Orchestrator ↔ RAG**           | Direct function calls or gRPC                                     | Orchestrator calls `rag.retrieve(query, filters)` synchronously; returns `Document[]`                |
| **Orchestrator ↔ LLM**           | Direct API calls with abstraction                                 | Orchestrator calls `llm.generate(prompt, options)` via provider-agnostic interface                   |
| **Orchestrator ↔ Actions**       | Tool/function calling protocol                                    | Orchestrator passes `ToolCall` objects; actions return `ToolResult`; supports async execution        |
| **Dialog Manager ↔ State Store** | Redis client or database ORM                                      | Dialog manager calls `stateStore.get/set(sessionId, state)`; supports TTL and atomic updates         |

## Build Order Recommendations

### Phase 1: Single-Channel Demo (2-3 weeks)

**Goal:** Prove core assistant value without infrastructure complexity.

**Build order:**

1. Static web chat UI (React)
2. Client-side orchestrator with pattern matching
3. Direct OpenAI API integration (browser calls)
4. Mock actions (calendar, email simulation)
5. In-memory conversation state

**Why this order:** Start with visible value (working chat). Add intelligence (LLM). Add features (actions). No backend needed yet.

### Phase 2: Multi-Channel Gateway (2-3 weeks)

**Goal:** Demonstrate "one brain, many channels" concept.

**Build order:**

1. Gateway abstraction layer
2. Multiple channel UIs in demo (WhatsApp-like, Slack-like, Email-like)
3. Unified message normalization
4. Shared state across channels (still in-memory)
5. Channel-specific response formatting

**Why this order:** Proves multi-channel value before investing in real integrations. Test gateway abstraction with simulated channels before adding webhook complexity.

### Phase 3: Production Backend Foundation (3-4 weeks)

**Goal:** Migrate from client-side to server-side, add persistence.

**Build order:**

1. Node.js backend with Express/Fastify
2. Move orchestrator to backend
3. Add Redis for session state
4. PostgreSQL for users and conversation history
5. Environment-based configuration (API keys in env vars)
6. Deploy to cloud (Vercel, Railway, or AWS)

**Why this order:** Backend first, then persistence. Proves deployment before adding complex features. Users and sessions before advanced features.

### Phase 4: Production RAG (3-4 weeks)

**Goal:** Add knowledge base with proper retrieval.

**Build order:**

1. Document ingestion pipeline (chunking, enrichment)
2. Embedding generation (OpenAI embeddings)
3. Vector DB integration (Pinecone or Chroma)
4. Hybrid retrieval (vector + BM25)
5. Reranking with cross-encoder
6. Systematic evaluation (precision, recall, groundedness)

**Why this order:** Data pipeline before retrieval. Simple retrieval before hybrid. Hybrid before reranking. Evaluation throughout.

### Phase 5: Real Channel Integrations (2-3 weeks per channel)

**Goal:** Replace simulated channels with real integrations.

**Build order:**

1. Start with simplest channel (Telegram - no verification)
2. Add webhook handling and verification
3. Implement send/receive adapters
4. Add media handling (images, documents)
5. Deploy webhook endpoint
6. Test end-to-end
7. Repeat for next channel (WhatsApp, Slack, Email)

**Why this order:** Prove pattern with simplest channel first. Each subsequent channel is faster due to reusable gateway abstraction.

### Phase 6: Production Actions (2-3 weeks)

**Goal:** Replace mock actions with real integrations.

**Build order:**

1. OAuth2 flow for user consent (Google, Microsoft)
2. Calendar integration (read/write events)
3. Email integration (send, search)
4. CRM integration (create/update contacts, deals)
5. Background job queue for async actions (BullMQ)
6. Action execution monitoring and error handling

**Why this order:** Auth first (required for all integrations). Start with calendar (most valuable for assistant). Email next. CRM last (most complex). Async execution after proving synchronous works.

### Phase 7: Reliability & Scale (Ongoing)

**Goal:** Production-ready reliability, monitoring, and scaling.

**Build order:**

1. Structured logging (Winston, Pino)
2. Error tracking (Sentry)
3. Metrics and monitoring (Datadog, Prometheus)
4. Timeout cascades and fallback paths
5. Rate limiting per tenant
6. Cost tracking per user/tenant
7. Horizontal scaling (load balancer + multiple instances)
8. Database read replicas
9. CDN for static assets
10. Multi-region deployment (if needed)

**Why this order:** Observability first (logging, errors, metrics). Reliability next (timeouts, fallbacks, rate limiting). Cost control. Horizontal scaling before vertical. Multi-region last (most complex, only if needed).

## Sources

**Architecture Patterns & Design:**

- [The voice AI stack for building agents in 2026](https://www.assemblyai.com/blog/the-voice-ai-stack-for-building-agents)
- [AI System Design Patterns for 2026: Architecture That Scales](https://zenvanriel.nl/ai-engineer-blog/ai-system-design-patterns-2026/)
- [Agent system design patterns - Azure Databricks](https://docs.databricks.com/aws/en/generative-ai/guide/agent-system-design-patterns)
- [Decoding the AI Virtual Assistant Design Architecture](https://medium.com/@senol.isci/decoding-the-ai-virtual-assistant-design-architecture-an-in-depth-look-into-design-components-73fabba31de8)

**RAG Architecture:**

- [Building Production RAG Systems in 2026: Complete Architecture Guide](https://brlikhon.engineer/blog/building-production-rag-systems-in-2026-complete-architecture-guide)
- [Design and Develop a RAG Solution - Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/rag/rag-solution-design-and-evaluation-guide)
- [RAG in 2026: How Retrieval-Augmented Generation Works for Enterprise AI](https://www.techment.com/blogs/rag-in-2026-enterprise-ai/)

**Multi-Channel Architecture:**

- [How Clawdbot Enables "One Brain, Many Channels"](https://medium.com/@imranmsa93/how-clawdbot-enables-one-brain-many-channels-ai-agents-across-whatsapp-slack-telegram-and-b49242261419)
- [What are Multichannel Chatbots: A Detailed Guide 2026](https://www.proprofschat.com/blog/multichannel-chatbot/)
- [Clawdbot 2026: Complete Production Guide](https://brlikhon.engineer/blog/clawdbot-2026-complete-production-guide-architecture-deployment-cost-optimization)

**Chatbot Architecture:**

- [How to Build a Chatbot: Components & Architecture in 2026](https://research.aimultiple.com/chatbot-architecture/)
- [SmythOS - Conversational Agent Architecture](https://smythos.com/developers/agent-development/conversational-agent-architecture/)

**Agentic AI:**

- [Agentic AI for Enterprises in 2026](https://acmeminds.com/amplDev/blog/agentic-ai-for-enterprises-in-2026-a-practical-guide/)
- [4 Agentic AI Design Patterns & Real-World Examples](https://research.aimultiple.com/agentic-ai-design-patterns/)

---

_Architecture research for: AI Business Assistant / Virtual Secretary_
_Researched: 2026-02-04_
_Confidence: MEDIUM (WebSearch verified with Microsoft/Databricks official docs)_
