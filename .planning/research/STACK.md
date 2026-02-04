# Technology Stack Research

**Project:** AI Business Assistant (Virtual Secretary)
**Domain:** Multi-channel AI-powered business assistant SaaS
**Researched:** 2026-02-04
**Overall Confidence:** HIGH

## Executive Summary

The AI business assistant domain has matured significantly in 2025-2026, with clear stack patterns emerging. This research distinguishes between **Demo Stack** (GitHub Pages compatible) and **Production SaaS Stack** (full backend infrastructure).

**Key Finding:** Modern AI assistant stacks converge on TypeScript + React + Vercel AI SDK for frontend, with LangChain.js or Vercel AI SDK for LLM orchestration. For production, PostgreSQL (via Supabase) has won the BaaS battle over Firebase for SaaS applications.

---

## Demo Stack (Phase 1: GitHub Pages)

For the initial demo deployment to GitHub Pages, use a fully static, client-side stack with simulated interactions.

### Core Technologies

| Technology       | Version | Purpose                 | Why Recommended                                                                                                             |
| ---------------- | ------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Vite**         | 6.x     | Build tool & dev server | Fastest build times, simpler configuration than Next.js for static sites, official static deployment guide for GitHub Pages |
| **React**        | 19.x    | UI framework            | Dominant in AI ecosystem (AI code generators default to React), massive component ecosystem, best TypeScript support        |
| **TypeScript**   | 5.x     | Type safety             | Industry standard for production apps, catches bugs at compile time, required by modern AI SDKs                             |
| **Tailwind CSS** | 4.x     | Styling                 | Zero runtime, utility-first, pairs perfectly with shadcn/ui components                                                      |
| **shadcn/ui**    | Latest  | Component library       | Copy-paste components (no dependency bloat), full code ownership, updated for Tailwind v4 and React 19                      |

**Confidence:** HIGH - All verified from official documentation and 2026 sources.

### State Management

| Library     | Version | Purpose      | Why Recommended                                                                     |
| ----------- | ------- | ------------ | ----------------------------------------------------------------------------------- |
| **Zustand** | 5.x     | Client state | 30%+ YoY growth, minimal boilerplate, perfect for demos, no Provider wrapper needed |

**Alternative:** Jotai (if you need atomic state with fine-grained reactivity)

**Confidence:** HIGH - Zustand has become the de facto standard for new projects in 2026.

### Demo-Specific Libraries

| Library                       | Version | Purpose              | When to Use                           |
| ----------------------------- | ------- | -------------------- | ------------------------------------- |
| **Mock Service Worker (MSW)** | 2.x     | API mocking          | Simulate AI responses without backend |
| **Faker.js**                  | 9.x     | Fake data generation | Generate realistic demo conversations |
| **LocalStorage API**          | Native  | Client persistence   | Save demo state across page reloads   |

**Confidence:** MEDIUM - Standard demo patterns, but versions need verification before use.

### Deployment Configuration

```bash
# vite.config.ts key settings
base: '/robo-assistant/'  # Match GitHub repo name
build: {
  outDir: 'dist'
}

# Required files:
# - .nojekyll (GitHub Pages ignores _ folders by default)
# - CNAME (if using custom domain)
```

**Confidence:** HIGH - Verified from multiple GitHub Pages deployment guides.

---

## Production SaaS Stack (Future Phases)

When transitioning from demo to production SaaS, this is the recommended stack.

### Frontend Framework

| Technology       | Version | Purpose         | Why Recommended                                                                       |
| ---------------- | ------- | --------------- | ------------------------------------------------------------------------------------- |
| **Next.js**      | 15.x    | React framework | App Router for RSC, API routes, automatic code splitting, Vercel deployment optimized |
| **React**        | 19.x    | UI library      | (same as demo)                                                                        |
| **TypeScript**   | 5.x     | Type safety     | (same as demo)                                                                        |
| **Tailwind CSS** | 4.x     | Styling         | (same as demo)                                                                        |
| **shadcn/ui**    | Latest  | Components      | (same as demo)                                                                        |

**Why Next.js for production:** Server-side rendering, API routes, middleware for auth, built-in optimization, native Vercel AI SDK integration.

**Confidence:** HIGH - Next.js is the standard for production React SaaS in 2026.

### AI/LLM Layer

| Technology        | Version | Purpose           | Why Recommended                                                                                                                  |
| ----------------- | ------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Vercel AI SDK** | 6.x     | LLM orchestration | Unified API for 15+ providers (OpenAI, Anthropic, Google), framework-native hooks eliminate 60% boilerplate, sub-100ms streaming |
| **LangChain.js**  | 0.3.x+  | Agent framework   | If you need multi-step reasoning, tool calling, memory management (more complex than Vercel AI SDK)                              |

**Recommendation:** Start with Vercel AI SDK. Add LangChain.js only if you need advanced agent workflows.

**Provider Support:**

- OpenAI GPT-4 Turbo / GPT-4.5
- Anthropic Claude Sonnet 4.5 (recommended for coding agents)
- Google Gemini Pro
- Local models via Ollama

**Confidence:** HIGH - AI SDK 6 released with agent abstraction. Verified from official Vercel documentation.

### Backend & Database

| Technology     | Version | Purpose              | Why Recommended                                                                                                                      |
| -------------- | ------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Supabase**   | Latest  | Backend-as-a-Service | PostgreSQL for relational data, built-in auth, realtime subscriptions, vector embeddings, generous free tier (100K MAU), open-source |
| **PostgreSQL** | 16.x    | Relational database  | Industry standard, perfect for SaaS (user data, conversations, settings), pgvector extension for embeddings                          |

**Why Supabase over Firebase:** PostgreSQL won the BaaS battle for web SaaS in 2026. Better for relational data modeling (users, organizations, conversations, channels). Open-source with self-hosting option. More cost-effective for startups.

**Confidence:** HIGH - Multiple 2026 sources confirm Supabase dominance for SaaS applications.

### Vector Database (For RAG)

| Technology              | Version | Purpose          | Why Recommended                                                                |
| ----------------------- | ------- | ---------------- | ------------------------------------------------------------------------------ |
| **Pinecone**            | Latest  | Vector storage   | Fully managed, sub-100ms query latency, production-ready, handles 50M+ vectors |
| **pgvector (Supabase)** | Latest  | Vector extension | For simple RAG use cases, keeps everything in Postgres, no additional service  |

**Recommendation:** Start with pgvector (included in Supabase). Migrate to Pinecone if you exceed 10M vectors or need specialized vector operations.

**Confidence:** HIGH - Pinecone is production-grade. pgvector is sufficient for most SaaS use cases.

### Authentication

| Technology        | Version | Purpose       | Why Recommended                                                                                     |
| ----------------- | ------- | ------------- | --------------------------------------------------------------------------------------------------- |
| **Clerk**         | Latest  | Auth platform | Best DX for React/Next.js, pre-built UI components, org management for B2B SaaS, session management |
| **Supabase Auth** | Latest  | Auth service  | If using Supabase, built-in auth is generous (100K MAU free), simpler integration                   |

**Recommendation:** Clerk for B2B SaaS with complex org management. Supabase Auth for simpler use cases or if already using Supabase.

**Note:** Clerk + Supabase integration (deprecated April 2025) - use separate services.

**Confidence:** HIGH - Clerk is the 2026 standard for React-based SaaS auth.

### Real-Time Communication

| Technology            | Version | Purpose            | Why Recommended                                                                  |
| --------------------- | ------- | ------------------ | -------------------------------------------------------------------------------- |
| **Supabase Realtime** | Latest  | WebSocket channels | Built into Supabase, broadcast, presence, Postgres CDC, works for most use cases |
| **Socket.IO**         | 4.x     | WebSocket library  | If you need custom real-time logic beyond Supabase capabilities                  |

**Recommendation:** Use Supabase Realtime unless you have specific requirements Socket.IO addresses.

**Confidence:** MEDIUM - Supabase Realtime is proven, but scale limits need validation per use case.

### Multi-Channel Integrations

| Channel      | Technology         | Purpose             | Notes                                                               |
| ------------ | ------------------ | ------------------- | ------------------------------------------------------------------- |
| **WhatsApp** | WhatsApp Cloud API | WhatsApp messaging  | Meta-hosted, fast setup, 2.7B users, requires business verification |
| **Telegram** | Telegraf.js 4.x    | Telegram bots       | Modern, TypeScript support, supports polling & webhooks             |
| **Email**    | Resend             | Transactional email | Best DX for developers, great deliverability, modern API            |
| **SMS**      | Twilio             | SMS messaging       | Industry standard, reliable, global coverage                        |
| **Voice**    | Twilio Voice       | Phone calls         | Voice API for phone channel                                         |

**Email Alternative:** SendGrid (high volume senders, $60/month for automation features)

**Confidence:** MEDIUM-HIGH - WhatsApp Cloud API and Telegraf verified. Resend is 2026 developer favorite per multiple sources.

### Serverless Functions

| Technology           | Version | Purpose           | Why Recommended                                                            |
| -------------------- | ------- | ----------------- | -------------------------------------------------------------------------- |
| **Vercel Functions** | Latest  | API endpoints     | Zero config with Next.js, Edge runtime for low latency, generous free tier |
| **AWS Lambda**       | Latest  | Complex workflows | If you need long-running jobs (>10s), Step Functions orchestration         |

**Recommendation:** Vercel Functions for most use cases. AWS Lambda for specialized workflows.

**Confidence:** HIGH - Vercel Functions is the path of least resistance for Next.js apps.

### Monitoring & Observability

| Technology           | Version | Purpose        | Why Recommended                                                                        |
| -------------------- | ------- | -------------- | -------------------------------------------------------------------------------------- |
| **LangSmith**        | Latest  | LLM debugging  | Built by LangChain team, visualizes LLM execution, tracks token usage, prompt versions |
| **Sentry**           | Latest  | Error tracking | Industry standard, React integration, performance monitoring                           |
| **Vercel Analytics** | Latest  | Web analytics  | Built into Vercel, privacy-friendly, web vitals                                        |

**Confidence:** MEDIUM - LangSmith verified for LLM debugging. Sentry is industry standard.

---

## Development Tools

| Tool               | Purpose         | Notes                                  |
| ------------------ | --------------- | -------------------------------------- |
| **ESLint**         | Linting         | TypeScript + React rules               |
| **Prettier**       | Code formatting | Consistent style                       |
| **Vitest**         | Unit testing    | Fast, Vite-native                      |
| **Playwright**     | E2E testing     | Cross-browser, debugging tools         |
| **GitHub Actions** | CI/CD           | Free for public repos, automate deploy |

**Confidence:** HIGH - Industry standard tools.

---

## Installation

### Demo Stack (Static GitHub Pages)

```bash
# Create Vite + React + TypeScript project
npm create vite@latest robo-assistant -- --template react-ts

# Core dependencies
npm install zustand
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# shadcn/ui (copy-paste components as needed)
npx shadcn@latest init

# Demo-specific
npm install -D msw @faker-js/faker

# GitHub Pages deployment
npm install -D gh-pages
```

**vite.config.ts:**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/robo-assistant/', // Match repo name
  build: {
    outDir: 'dist',
  },
});
```

### Production Stack (Next.js + Supabase + Clerk)

```bash
# Create Next.js project
npx create-next-app@latest robo-assistant --typescript --tailwind --app

# AI SDK
npm install ai @ai-sdk/openai @ai-sdk/anthropic

# Supabase
npm install @supabase/supabase-js

# Auth
npm install @clerk/nextjs

# State management
npm install zustand

# shadcn/ui
npx shadcn@latest init

# Channel integrations
npm install telegraf           # Telegram
npm install twilio             # SMS, Voice, WhatsApp
npm install resend             # Email

# Development
npm install -D vitest @playwright/test
```

---

## Alternatives Considered

| Category               | Recommended                  | Alternative           | When to Use Alternative                                                         |
| ---------------------- | ---------------------------- | --------------------- | ------------------------------------------------------------------------------- |
| **Frontend Framework** | React                        | Vue 3 / Svelte 5      | Smaller bundle size needs, but AI tooling heavily favors React                  |
| **Build Tool**         | Vite (demo) / Next.js (prod) | Remix / Astro         | Astro for content-heavy sites, Remix for complex data mutations                 |
| **LLM SDK**            | Vercel AI SDK                | LangChain.js          | Complex agent workflows with multi-step reasoning and memory                    |
| **State Management**   | Zustand                      | Jotai / Redux Toolkit | Jotai for atomic state, Redux for large enterprise apps                         |
| **Database**           | Supabase + PostgreSQL        | Firebase              | Firebase only if you're building mobile-first with existing Firebase investment |
| **Auth**               | Clerk                        | Supabase Auth / Auth0 | Supabase Auth for simpler needs, Auth0 for enterprise compliance                |
| **Vector DB**          | Pinecone                     | ChromaDB / Qdrant     | ChromaDB for local dev only (doesn't scale), Qdrant for self-hosted             |
| **Email**              | Resend                       | SendGrid              | SendGrid for high-volume senders (>1M emails/month)                             |
| **Telegram SDK**       | Telegraf                     | node-telegram-bot-api | node-telegram-bot-api if you prefer lower-level API control                     |

---

## What NOT to Use

| Avoid                          | Why                                                                                 | Use Instead                                        |
| ------------------------------ | ----------------------------------------------------------------------------------- | -------------------------------------------------- |
| **Create React App (CRA)**     | Deprecated, no longer maintained, slow builds                                       | Vite for static sites, Next.js for SSR             |
| **Firebase for SaaS web apps** | NoSQL doesn't fit relational SaaS data models, higher cost, unclear Google strategy | Supabase + PostgreSQL                              |
| **Redux (hand-written)**       | Excessive boilerplate, <10% adoption in new projects                                | Zustand or Redux Toolkit if you need Redux         |
| **Socket.IO for everything**   | Overkill if using Supabase (has built-in realtime), adds dependency                 | Supabase Realtime first, Socket.IO only if needed  |
| **ChromaDB in production**     | Not designed for scale (50M+ vectors), dev tool only                                | Pinecone or pgvector                               |
| **Webpack**                    | Slower than Vite, complex configuration                                             | Vite or Next.js (which handles webpack internally) |
| **Class components**           | React 19 is hook-first, AI code generators output functional components             | Functional components with hooks                   |

---

## Stack Patterns by Phase

### Phase 1: Demo (GitHub Pages)

- **Core:** Vite + React + TypeScript + Tailwind + shadcn/ui
- **State:** Zustand + LocalStorage
- **AI:** Simulated responses (MSW mocking)
- **Deploy:** GitHub Pages via GitHub Actions

### Phase 2: MVP SaaS

- **Core:** Next.js + React + TypeScript + Tailwind + shadcn/ui
- **Backend:** Supabase (PostgreSQL + Auth + Realtime)
- **AI:** Vercel AI SDK + OpenAI/Anthropic
- **Auth:** Clerk or Supabase Auth
- **Deploy:** Vercel

### Phase 3: Multi-Channel

- Add channel integrations:
  - WhatsApp Cloud API
  - Telegraf (Telegram)
  - Resend (Email)
  - Twilio (SMS/Voice)
- Vector DB: pgvector (Supabase) for RAG

### Phase 4: Scale

- **Vector DB:** Migrate to Pinecone if >10M vectors
- **Functions:** AWS Lambda for long-running jobs
- **Monitoring:** LangSmith + Sentry + custom analytics
- **Infrastructure:** Consider managed Kubernetes if Vercel limits hit

---

## Version Compatibility

| Package           | Compatible With                     | Notes                                  |
| ----------------- | ----------------------------------- | -------------------------------------- |
| React 19.x        | Next.js 15.x, Vite 6.x              | React 19 is stable as of 2026          |
| Vercel AI SDK 6.x | Next.js 14.x+, React 18.x+          | Agent abstraction requires v6+         |
| Tailwind CSS 4.x  | PostCSS 8.x, Vite 6.x, Next.js 15.x | Tailwind v4 uses new @theme directive  |
| TypeScript 5.x    | All modern frameworks               | Required by AI SDKs                    |
| Supabase JS v2.x  | Next.js 13.x+, Node 18.x+           | PostgreSQL 15+ recommended             |
| shadcn/ui         | React 19.x, Tailwind 4.x            | Components updated for latest versions |
| Zustand 5.x       | React 18.x+                         | Works with React 19                    |
| Telegraf 4.x      | Node.js 18.x+                       | TypeScript support built-in            |

---

## Sources

### High Confidence (Official Docs, Context7)

- [Vercel AI SDK Introduction](https://ai-sdk.dev/docs/introduction) — Features, capabilities, v6 agent abstraction
- [LangChain.js Overview](https://docs.langchain.com/oss/javascript/langchain/overview) — Framework features, agent architecture
- [Vite Static Deployment Guide](https://vite.dev/guide/static-deploy) — Official GitHub Pages deployment
- [shadcn/ui Documentation](https://ui.shadcn.com/) — Tailwind v4 compatibility, React 19 updates
- [Telegraf Documentation](https://telegraf.js.org/) — Telegram Bot API framework

### Medium Confidence (Multiple 2026 Sources Agree)

- [React vs Vue vs Svelte in 2025-2026](https://merge.rocks/blog/comparing-front-end-frameworks-for-startups-in-2025-svelte-vs-react-vs-vue) — Framework comparison
- [State Management in 2025-2026](https://dev.to/hijazi313/state-management-in-2025-when-to-use-context-redux-zustand-or-jotai-2d2k) — Zustand vs Jotai vs Redux
- [Firebase vs Supabase 2026](https://makerkit.dev/blog/saas/supabase-vs-firebase) — Why Postgres won for SaaS
- [Clerk vs Supabase Auth](https://clerk.com/articles/clerk-vs-supabase-auth) — Authentication comparison
- [Vector Database Comparison 2026](https://www.datacamp.com/blog/the-top-5-vector-databases) — Pinecone vs ChromaDB
- [WhatsApp Business API Guide 2026](https://www.unipile.com/whatsapp-api-a-complete-guide-to-integration/) — Integration patterns
- [AI Chatbot Stack Guide](https://www.lindy.ai/blog/best-ai-chatbots-for-businesses) — Business chatbot technologies
- [Next.js GitHub Pages Deployment](https://dev.to/lico/nextjs-deploy-as-static-site-using-github-pages-3bhm) — Static export patterns
- [TypeScript React Best Practices 2026](https://react-blueprint.dev/) — Modern patterns

### WebSearch Discovery (Verified with Multiple Sources)

- LangChain.js version 1.2.10 (npm) — Latest as of 2026-02-04
- Resend vs SendGrid comparison — Resend for developer experience
- Zustand 30%+ YoY growth — Adoption trends
- React dominance in AI tooling — v0.app, Bolt.new default to React

---

## Confidence Assessment

| Stack Component                           | Confidence  | Reason                                                                           |
| ----------------------------------------- | ----------- | -------------------------------------------------------------------------------- |
| **Demo Stack (Vite + React)**             | HIGH        | Official docs verified, proven GitHub Pages deployment pattern                   |
| **Production Stack (Next.js + Supabase)** | HIGH        | Industry standard 2026 SaaS stack, multiple authoritative sources                |
| **AI SDK (Vercel AI SDK)**                | HIGH        | Official documentation, v6 confirmed, Anthropic partnership announced            |
| **Auth (Clerk)**                          | MEDIUM-HIGH | Leader for React SaaS, but integration with Supabase deprecated (use separately) |
| **Vector DB (Pinecone)**                  | HIGH        | Production-grade, clear scale advantages over ChromaDB                           |
| **Channel Integrations**                  | MEDIUM      | WhatsApp and Telegram verified, Resend growing adoption, Twilio proven           |
| **State Management (Zustand)**            | HIGH        | Clear 2026 adoption trends, minimal boilerplate, production-proven               |

---

## Gaps to Address

1. **Channel Integration Versions:** Telegraf 4.x verified, but WhatsApp Cloud API version needs official Meta docs review
2. **Resend Pricing:** Verify free tier limits before committing (SendGrid pricing confirmed at $60/month)
3. **Supabase Scale Limits:** Research concurrent connection limits and when to consider self-hosted PostgreSQL
4. **LangSmith vs Helicone:** LangSmith verified, but Helicone emerging as lighter alternative — needs comparison
5. **pgvector Performance:** Verify vector search performance at 1M, 5M, 10M embeddings to determine Pinecone migration point

---

_Stack research for: AI Business Assistant (Virtual Secretary)_
_Researched: 2026-02-04_
_Confidence: HIGH (Demo), MEDIUM-HIGH (Production)_
