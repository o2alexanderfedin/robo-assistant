# Project Research Summary

**Project:** AI Business Assistant (Virtual Secretary)
**Domain:** Multi-channel AI-powered business assistant SaaS
**Researched:** 2026-02-04
**Confidence:** MEDIUM-HIGH

## Executive Summary

AI business assistants are a proven product category in 2026, with mature technology stacks and well-documented patterns. The research reveals a clear dual-track approach: **demo-first validation followed by production infrastructure**. Modern AI assistants converge on TypeScript + React + Vercel AI SDK for frontend orchestration, with PostgreSQL (via Supabase) for backend. The critical insight is that successful products start with throwaway demos on GitHub Pages to validate value proposition, then rebuild with production architecture.

The recommended approach is to build a **static demo showcasing multi-channel context continuity**, then transition to a **multi-agent architecture** with specialized agents per channel (email, messenger, phone). This differs from the "god agent" anti-pattern (one agent handling everything) that causes 73% of enterprise AI deployments to fail. The key differentiator is seamless cross-channel context preservation—conversations that flow naturally from email to Telegram to phone without losing context.

Critical risks center on three areas: **hallucination liability** (AI providing confidently wrong information), **runaway costs** (no rate limiting = potential bankruptcy), and **GDPR compliance violations**. All three must be addressed before production deployment. The research also identifies a major strategic pitfall: treating the demo as a miniature production system leads to 2-3 month delays when transitioning to real infrastructure. Build the demo to be explicitly throwaway, then start production fresh with proper architecture.

## Key Findings

### Recommended Stack

The stack research reveals a clear divergence between demo and production requirements. **Demo stack** (Phase 1) should use Vite + React + TypeScript + Tailwind + shadcn/ui for rapid development, with simulated AI responses and no backend. **Production stack** (Phase 2+) transitions to Next.js 15 for server-side capabilities, Vercel AI SDK 6 for LLM orchestration, Supabase for PostgreSQL + auth + realtime, and specialized channel integrations.

**Core technologies:**
- **Vite 6.x** (demo): Fastest build tool for static GitHub Pages deployment — simpler than Next.js for demos
- **Next.js 15.x** (production): React framework with App Router, API routes, server-side rendering — standard for SaaS
- **Vercel AI SDK 6.x**: Unified API for 15+ LLM providers with streaming and agent abstractions — eliminates 60% of boilerplate
- **Supabase**: PostgreSQL BaaS with built-in auth, realtime subscriptions, vector embeddings — won the BaaS battle over Firebase for SaaS
- **Zustand 5.x**: Lightweight state management with 30%+ YoY growth — minimal boilerplate for both demo and production
- **Pinecone**: Production-grade vector database for RAG — migrate from pgvector when exceeding 10M embeddings

**Critical version requirements:** React 19.x compatible with all tools, TypeScript 5.x required by AI SDKs, Tailwind CSS 4.x for shadcn/ui components.

### Expected Features

The features research distinguishes table stakes (expected), differentiators (competitive advantage), and anti-features (commonly requested but problematic).

**Must have (table stakes):**
- Email Management — core administrative task automation with smart categorization and response drafting
- Calendar & Scheduling — intelligent meeting management with conflict detection and timezone handling
- Natural Language Interface — conversational interaction, not command-line syntax
- Multi-Channel Access — unified interface across email, chat, messengers (Slack, Teams, WhatsApp, Telegram)
- Task & Todo Management — tracking action items extracted from conversations
- Response Consistency — maintaining tone and context across conversations

**Should have (competitive advantage):**
- **Autonomous Multi-Step Workflows** — executes complex business processes without intervention (2026 competitive edge)
- **Cross-Channel Context Preservation** — conversations seamlessly continue across channels without "starting over" (major UX differentiator)
- Proactive Intelligence — suggests actions, identifies patterns, flags opportunities before asked
- Strategic Briefings — synthesizes information into executive summaries (goes beyond admin to strategic support)

**Defer (v2+):**
- Voice Integration — natural voice conversations require complex infrastructure (HIGH complexity, production-only)
- Deep Enterprise Integration — native CRM/project tool connectors need bidirectional data sync (HIGH complexity)
- Custom Workflow Automation — visual workflow builder or natural language workflow definition (uncertain demand)
- Learning from Feedback — ML feedback loops improving over time (requires ML infrastructure)

**Anti-features (avoid):**
- Fully Autonomous Decision-Making — accountability gap when AI makes bad decisions (use human-in-loop instead)
- Access to All Company Data — security nightmare, one breach exposes everything (use role-based access)
- One AI for All Roles — jack-of-all-trades, master of none (use multi-agent architecture)
- Custom LLM Training — expensive, prompt engineering + RAG usually sufficient (use fine-tuned prompting)

### Architecture Approach

The architecture research reveals a clear **multi-layer pattern** with channel gateway, orchestration, intelligence, and data layers. The critical insight is the "One Brain, Many Channels" pattern—a unified control plane that normalizes messages from all channels while preserving channel-specific context.

**Major components:**
1. **Channel Gateway Layer** — normalizes messages from WhatsApp, Telegram, email, Slack into unified format; routes to orchestrator; preserves channel identity
2. **Orchestration Layer (AI Orchestrator)** — routes requests based on complexity (simple → fast model, complex → capable model); manages dialog state; coordinates multi-step workflows
3. **Intelligence Layer** — LLM core (GPT-4, Claude) for generation; RAG engine with hybrid retrieval (vector + BM25 + reranking); action executor for calendar/email/CRM
4. **Data Layer** — Vector DB (Pinecone/pgvector) for embeddings; PostgreSQL for users/conversations; Redis for session cache

**Key patterns identified:**
- **Multi-Channel Gateway** — single business logic codebase, channel adapters implement common interface
- **Hybrid Retrieval with Reranking** — vector search + BM25 + cross-encoder reranking for production RAG (73% failure rate without this)
- **Request Routing with Model Tiering** — simple queries to cheap models, complex to expensive (60-70% cost reduction)
- **Timeout Cascade with Graceful Degradation** — each layer defines acceptable wait times with fallback paths
- **Stateful Conversation Management** — maintains context across multi-turn conversations with session isolation per user/channel

**Anti-patterns to avoid:**
- Tightly coupling channels to business logic (makes adding channels require duplicating all logic)
- Treating RAG as black box (default settings cause 73% failure rate)
- No timeout or failure handling (LLM API hangs cause entire system to hang)
- Stateless RAG for multi-turn conversations (forgets context, users repeat themselves)
- Premature microservices (start with modular monolith, extract when proven scalability needs)

### Critical Pitfalls

The pitfalls research identifies seven critical issues that cause project failures, with clear prevention strategies.

1. **Treating Demo as Miniature Production** — teams build demos with shortcuts that appear production-ready but need 80% rewrite. **Avoid:** Build throwaway demo with hardcoded scenarios, start production fresh with proper architecture. Label demo code "DO NOT USE IN PRODUCTION."

2. **The "God Agent" Anti-Pattern** — one AI agent handles all channels and tasks, becomes confused and hallucinates. **Avoid:** Use specialized agents per channel type (email agent, messenger agent, phone agent) with shared knowledge base but channel-specific prompts.

3. **Missing Safety Guardrails for Crisis** — AI encounters user in crisis (suicidal, medical emergency) and responds inappropriately, causing legal liability. **Avoid:** Pattern matching for crisis keywords before LLM, immediate escalation to humans, display crisis helpline numbers, block AI from generating response.

4. **No Rate Limiting = Bankruptcy Risk** — production without rate limits leads to $10K-$100K overnight bills from bugs or malicious users. **Avoid:** Multi-layer rate limiting (per-user, per-session, system-wide), real-time token counting, daily budget alerts at 50%/75%/90%, automatic shutdown at 100%.

5. **Hallucination Liability** — AI provides wrong meeting times, fabricated policies, incorrect contact details; users trust and act on wrong information. **Avoid:** Implement RAG with source citation, confidence scoring, human-in-loop for high-stakes actions (calendar changes require confirmation), never auto-execute without review.

6. **GDPR Violations** — storing all data indefinitely violates GDPR, requires architectural rewrite when discovered late. **Avoid:** Privacy-first architecture from Phase 2 (data minimization, 90-day retention, easy export/deletion, encryption), complete DPIA before launch.

7. **Fragmented Channel State** — user switches channels, AI treats each as isolated and forgets context. **Avoid:** Unified user identity linking channels, shared conversation state (Redis/Postgres), cross-channel context awareness ("You mentioned John on Telegram...").

## Implications for Roadmap

Based on combined research, the roadmap should follow a clear progression from demo validation to production foundation to multi-channel capabilities.

### Phase 1: Static Demo (GitHub Pages)
**Rationale:** Validate value proposition before infrastructure investment. Demo proves "AI business assistant with cross-channel context" concept without backend complexity.

**Delivers:**
- Interactive demo on GitHub Pages
- Simulated multi-channel interface (WhatsApp-like, email-like, chat)
- Pre-scripted intelligent responses
- Mock integrations (calendar, email, task management)
- 60-second value proposition path

**Addresses features:**
- Email Management (simulated threads + draft responses)
- Calendar Scheduling (mock UI with suggestions)
- Natural Language Chat Interface (primary interaction)
- Cross-Channel Context (2-3 channels showing continuity)
- Task Management (basic extraction from conversations)
- Proactive Suggestions (pre-programmed)

**Avoids pitfalls:**
- PITFALL #1: Build explicitly throwaway (mark "DEMO ONLY", separate from production code)
- Use Vite (not Next.js) to signal this is static, not production
- Accept no auth, no backend, API keys in browser for demo only
- Demo-specific consideration: realistic data (not lorem ipsum), pre-record video backup

**Stack:** Vite + React 19 + TypeScript + Tailwind + shadcn/ui + Zustand (in-memory state) + MSW for mocking

**Research flag:** SKIP deeper research — demo patterns are well-documented, use template-driven approach

---

### Phase 2: Production Backend Foundation
**Rationale:** Transition from client-side to server-side with persistence. Must address rate limiting, GDPR, and proper auth BEFORE adding features. This phase prevents pitfalls #4 (runaway costs) and #6 (GDPR violations).

**Delivers:**
- Node.js backend (Next.js 15 with App Router)
- User authentication (Clerk or Supabase Auth)
- PostgreSQL for users + conversation history (Supabase)
- Redis for session state
- Rate limiting (per-user, system-wide, budget caps)
- GDPR-compliant data architecture (retention policy, export/delete)
- Environment-based configuration
- Cloud deployment (Vercel)

**Addresses pitfalls:**
- PITFALL #4: Multi-layer rate limiting, token counting, budget alerts, auto-shutdown
- PITFALL #6: Privacy-first architecture, 90-day retention, easy export/deletion, encryption
- PITFALL #1: Starting production fresh (not upgrading demo)

**Stack:** Next.js 15 + Vercel AI SDK 6 + Supabase (PostgreSQL + Auth) + Redis + Clerk (if B2B) + Zustand

**Research flag:** STANDARD patterns — auth, database, deployment well-documented, skip phase-specific research

---

### Phase 3: Production MVP (Single Channel)
**Rationale:** Add real AI capabilities with one channel (simplest = Telegram, no verification). Must implement RAG, crisis detection, and hallucination prevention before multi-channel expansion.

**Delivers:**
- Real LLM integration (Vercel AI SDK with OpenAI/Anthropic)
- One channel integration (Telegram Bot API with webhooks)
- RAG implementation (hybrid retrieval: vector + BM25 + reranking)
- Crisis detection and escalation protocol
- Source citation (responses must cite sources)
- Human-in-loop for high-stakes actions
- Conversation state management (dialog manager)

**Addresses features:**
- Real Email Integration → defer to Phase 4 (start simpler with Telegram)
- Natural Language Processing (real LLM, not canned responses)
- Response Consistency (conversation memory, style guidelines)

**Addresses pitfalls:**
- PITFALL #2: Design multi-agent architecture (even if single channel now, prepare for specialization)
- PITFALL #3: Crisis detection + escalation before any production users
- PITFALL #5: RAG with source citation, confidence scoring, human-in-loop

**Stack:** Add to Phase 2 → Vercel AI SDK + Pinecone/pgvector + Telegraf 4.x (Telegram)

**Research flag:** NEEDS RESEARCH — RAG configuration is domain-specific, requires phase research for chunking strategy, embedding models, retrieval evaluation

---

### Phase 4: Multi-Channel Gateway
**Rationale:** Add email + WhatsApp to prove "one brain, many channels" differentiator. Unified state management is critical to avoid fragmented context (pitfall #7).

**Delivers:**
- Channel gateway abstraction (unified message normalization)
- Email integration (IMAP/SMTP with OAuth for Gmail/Outlook)
- WhatsApp Business API integration
- Unified user identity (link Telegram, email, WhatsApp to same user)
- Shared conversation state across channels
- Cross-channel context preservation

**Addresses features:**
- Multi-Channel Access (3 channels: Telegram, Email, WhatsApp)
- Cross-Channel Context Preservation (key differentiator)

**Addresses pitfalls:**
- PITFALL #7: Unified state, cross-channel context awareness, shared knowledge base

**Stack:** Add to Phase 3 → WhatsApp Cloud API + IMAP/SMTP libraries + unified gateway layer

**Research flag:** NEEDS RESEARCH — WhatsApp Business API requirements (verification, webhook setup), email threading patterns, identity linking strategies

---

### Phase 5: Autonomous Workflows
**Rationale:** Add competitive differentiator after foundation is solid. Multi-step workflows require robust error handling and monitoring.

**Delivers:**
- Multi-step workflow execution (plan → execute → escalate)
- Background job queue (BullMQ for async actions)
- Real integrations (Google Calendar, Outlook Calendar)
- Action monitoring and error handling
- Tool/function calling with permission validation

**Addresses features:**
- Autonomous Multi-Step Workflows (2026 competitive edge)
- Calendar & Scheduling (real integration, not mock)
- Task & Todo Management (real task execution)

**Stack:** Add to Phase 4 → BullMQ + Google Calendar API + Outlook API + OAuth2 flows

**Research flag:** STANDARD patterns — calendar APIs well-documented, workflow orchestration established, skip phase-specific research

---

### Phase 6: Strategic Intelligence
**Rationale:** Add strategic capabilities after operational features proven. Differentiates from pure admin assistants.

**Delivers:**
- Proactive intelligence (pattern recognition, opportunity flagging)
- Strategic briefings (executive summaries from communication analysis)
- Advanced RAG (multi-document synthesis)
- Analytics dashboard (time saved, tasks completed)

**Addresses features:**
- Proactive Intelligence (suggests actions before asked)
- Strategic Briefings (goes beyond admin to strategic)

**Stack:** Add to Phase 5 → Enhanced RAG, analytics infrastructure

**Research flag:** NEEDS RESEARCH — Proactive pattern detection is less standardized, requires research on ML approaches for business communication analysis

---

### Phase 7: Scale & Reliability
**Rationale:** Production-ready reliability after feature completeness. Ongoing work as usage grows.

**Delivers:**
- Horizontal scaling (load balancer + multiple instances)
- Advanced monitoring (structured logging, error tracking, metrics)
- Timeout cascades and fallback paths
- Cost tracking per user/tenant
- Database read replicas
- Multi-region deployment (if needed)

**Addresses pitfalls:**
- Graceful degradation patterns
- Comprehensive observability
- Production resilience

**Stack:** Add to Phase 6 → Sentry + Datadog/Prometheus + CDN + load balancing

**Research flag:** SKIP — scaling patterns well-documented, address when hitting limits

---

### Phase Ordering Rationale

**Why demo-first:** Validates value proposition before infrastructure investment. Research shows throwaway demos prevent architectural mistakes from premature commitment.

**Why foundation before features:** Rate limiting, GDPR, and auth are not features—they're infrastructure. Adding them later requires architectural rewrites (pitfall #1).

**Why single-channel MVP before multi-channel:** Proves AI capabilities (RAG, crisis detection, hallucination prevention) in simplest context before adding channel complexity.

**Why multi-channel before workflows:** Cross-channel context preservation is the key differentiator. Workflows are valuable but not unique to this product.

**Why strategic intelligence last:** Advanced features require solid operational foundation. Can't do proactive analysis without proven data collection and retrieval.

**Dependency insights from architecture research:**
- Email Management requires Natural Language Interface (dependency in FEATURES.md)
- Multi-Channel Access requires Cross-Channel Context Preservation (dependency in FEATURES.md)
- Autonomous Workflows require Task Management + Natural Language Interface (dependency in FEATURES.md)
- RAG must precede any production deployment to prevent hallucination liability (critical pitfall)

### Research Flags

**Phases needing deeper research during planning:**
- **Phase 3 (Production MVP):** RAG configuration is domain-specific — needs research on chunking strategies, embedding models, hybrid retrieval evaluation, reranking approaches for business communication data
- **Phase 4 (Multi-Channel Gateway):** WhatsApp Business API verification requirements, webhook setup complexity, email threading patterns, identity linking strategies across platforms
- **Phase 6 (Strategic Intelligence):** Proactive pattern detection less standardized — needs research on ML approaches for business communication analysis, what patterns indicate actionable insights

**Phases with standard patterns (skip research):**
- **Phase 1 (Demo):** Demo patterns well-documented, use template-driven approach
- **Phase 2 (Backend Foundation):** Auth, database, deployment are mature patterns with extensive documentation
- **Phase 5 (Workflows):** Calendar APIs well-documented, workflow orchestration established (LangChain, Vercel AI SDK agent abstractions)
- **Phase 7 (Scale):** Scaling patterns well-documented, address reactively when hitting specific limits

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Official docs verified for Vite, Next.js, Vercel AI SDK, Supabase. React 19 compatibility confirmed. Versions cross-referenced with multiple 2026 sources. |
| Features | MEDIUM | Based on web search of competitor analysis (Lindy.ai, Athena, Reclaim.ai) and market landscape research. Table stakes identified from multiple sources. Differentiators inferred from 2026 trends. Not verified with direct product testing. |
| Architecture | MEDIUM | Multi-channel gateway pattern verified with Azure Databricks and Microsoft official docs. RAG patterns from production guides (brlikhon.engineer). Anti-patterns documented in multiple sources. Structure recommendations based on established best practices but not project-specific testing. |
| Pitfalls | MEDIUM-HIGH | Critical pitfalls verified with 2026 incident reports (ISACA, Character.AI lawsuits, Air Canada case). God agent anti-pattern documented in enterprise deployment failures. Rate limiting and GDPR requirements from regulatory sources. Recovery strategies based on industry reports but not first-hand experience. |

**Overall confidence:** MEDIUM-HIGH

The stack recommendations are highly reliable (official documentation, verified versions). The feature categorization and architecture patterns are well-researched but would benefit from validation during implementation. The pitfalls are documented from real-world failures, providing strong guidance for risk mitigation.

### Gaps to Address

**Stack gaps:**
1. **Resend pricing verification** — Verify free tier limits before committing. SendGrid pricing confirmed at $60/month for high-volume senders. Need to determine breakeven point for email volume.
2. **Supabase scale limits** — Research concurrent connection limits and when to consider self-hosted PostgreSQL. Documentation suggests 100K MAU on free tier, but concurrent connection limits need validation for real-time features.
3. **pgvector performance thresholds** — Verify vector search performance at 1M, 5M, 10M embeddings to determine when to migrate to Pinecone. Research suggests 10M as migration point, needs validation with actual data.

**Features gaps:**
1. **Voice integration feasibility** — Deferred to v2+, but latency requirements (<500ms) and infrastructure complexity need validation if prioritized. Research shows Twilio Voice and Vapi as options but requires testing.
2. **Custom workflow builder demand** — Categorized as "defer," but validation with early users during Phase 5 will inform if this becomes competitive necessity vs nice-to-have.

**Architecture gaps:**
1. **Multi-agent communication patterns** — Architecture specifies specialized agents per channel, but inter-agent communication protocols need definition during Phase 3 planning. How do agents share context? When does orchestrator delegate vs coordinate?
2. **RAG chunking strategy** — Research emphasizes chunking is critical (73% failure rate with defaults), but optimal strategy for business communication data (emails, messages, meeting notes) requires experimentation during Phase 3.

**Pitfalls gaps:**
1. **Crisis keyword database** — Pitfall #3 specifies pattern matching for crisis situations, but comprehensive keyword list with multilingual support needs compilation. Starting point identified (suicide, medical emergency, safety threat), but full taxonomy required.
2. **WhatsApp compliance changes** — Research shows general AI chatbots banned Jan 15, 2026, but business-specific use case compliance requires ongoing monitoring. WhatsApp terms change frequently.

**How to handle during planning:**
- Stack gaps: Validate during Phase 2 planning when configuring production infrastructure
- Features gaps: Include in user research/validation during Phase 1 demo feedback
- Architecture gaps: Address in Phase 3 planning when implementing multi-agent system and RAG
- Pitfalls gaps: Prioritize in Phase 3 before production deployment (crisis detection) and Phase 4 (WhatsApp compliance)

## Sources

### Primary (HIGH confidence - Official docs, verified 2026 sources)

**Stack research:**
- [Vercel AI SDK Introduction](https://ai-sdk.dev/docs/introduction) — v6 agent abstraction, framework integration
- [LangChain.js Overview](https://docs.langchain.com/oss/javascript/langchain/overview) — agent architecture
- [Vite Static Deployment Guide](https://vite.dev/guide/static-deploy) — GitHub Pages deployment
- [shadcn/ui Documentation](https://ui.shadcn.com/) — Tailwind v4 + React 19 compatibility
- [Telegraf Documentation](https://telegraf.js.org/) — Telegram Bot API framework

**Architecture research:**
- [Building Production RAG Systems 2026](https://brlikhon.engineer/blog/building-production-rag-systems-in-2026-complete-architecture-guide) — hybrid retrieval patterns
- [Azure Databricks Agent Design Patterns](https://docs.databricks.com/aws/en/generative-ai/guide/agent-system-design-patterns) — multi-agent architecture
- [Azure Architecture Center: RAG Solution Design](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/rag/rag-solution-design-and-evaluation-guide) — production RAG evaluation

**Pitfalls research:**
- [ISACA: Avoiding AI Pitfalls 2026](https://www.isaca.org/resources/news-and-trends/isaca-now-blog/2025/avoiding-ai-pitfalls-in-2026-lessons-learned-from-top-2025-incidents) — documented wrongful death lawsuits from Character.AI
- [Complete GDPR Compliance Guide 2026](https://secureprivacy.ai/blog/gdpr-compliance-2026) — €1.2B in fines during 2024, OpenAI €15M fine
- [AI Risk & Compliance 2026](https://secureprivacy.ai/blog/ai-risk-compliance-2026) — EU AI Act deadline Aug 2, 2026

### Secondary (MEDIUM confidence - Multiple 2026 sources agree)

**Stack research:**
- [React vs Vue vs Svelte 2025-2026](https://merge.rocks/blog/comparing-front-end-frameworks-for-startups-in-2025-svelte-vs-react-vs-vue) — framework comparison
- [State Management 2025-2026](https://dev.to/hijazi313/state-management-in-2025-when-to-use-context-redux-zustand-or-jotai-2d2k) — Zustand vs Jotai vs Redux
- [Firebase vs Supabase 2026](https://makerkit.dev/blog/saas/supabase-vs-firebase) — PostgreSQL won for SaaS
- [Clerk vs Supabase Auth](https://clerk.com/articles/clerk-vs-supabase-auth) — authentication comparison

**Features research:**
- [16 Best AI Assistant Apps 2026 | Reclaim](https://reclaim.ai/blog/ai-assistant-apps) — feature landscape
- [AI Agents Lead 8 Tech Trends 2026 | Bernard Marr](https://bernardmarr.com/ai-agents-lead-the-8-tech-trends-transforming-enterprise-in-2026/) — autonomous agents as competitive edge
- [2026 Multi-Agent Systems](https://www.rtinsights.com/if-2025-was-the-year-of-ai-agents-2026-will-be-the-year-of-multi-agent-systems/) — multi-agent architecture trends

**Architecture research:**
- [Clawdbot: One Brain, Many Channels](https://medium.com/@imranmsa93/how-clawdbot-enables-one-brain-many-channels-ai-agents-across-whatsapp-slack-telegram-and-b49242261419) — multi-channel gateway pattern
- [Voice AI Stack 2026](https://www.assemblyai.com/blog/the-voice-ai-stack-for-building-agents) — voice integration architecture
- [AI System Design Patterns 2026](https://zenvanriel.nl/ai-engineer-blog/ai-system-design-patterns-2026/) — architecture patterns that scale

**Pitfalls research:**
- [Common AI Agent Development Mistakes](https://www.wildnetedge.com/blogs/common-ai-agent-development-mistakes-and-how-to-avoid-them) — god agent anti-pattern, cost management
- [AI Hallucination Report 2026](https://www.allaboutai.com/resources/ai-statistics/ai-hallucinations/) — Gemini 2.0 at 0.7% hallucination rate
- [The Biggest AI Fails 2025](https://www.ninetwothree.co/blog/ai-fails) — Air Canada chatbot case, Character.AI lawsuits
- [Multi-channel Customer Communication 2024](https://chatfuel.com/blog/multi-channel-customer-solutions) — fragmented state problems

### Tertiary (LOW confidence - WebSearch discovery, needs validation)

**Stack research:**
- Zustand 30%+ YoY growth — adoption trends (source: npm trends)
- LangChain.js version 1.2.10 latest — version verification needed
- Resend vs SendGrid comparison — Resend for developer experience (needs pricing validation)

**Features research:**
- Lindy.ai pricing $300+/month — competitive analysis (not verified with vendor)
- Athena pricing $3,000-4,000/month — competitive analysis (not verified with vendor)

**Pitfalls research:**
- WhatsApp general AI chatbot ban effective Jan 15, 2026 — needs ongoing compliance monitoring
- 73% RAG failure rate with default chunking — cited from multiple sources but original study not verified

---

*Research completed: 2026-02-04*
*Ready for roadmap: yes*
