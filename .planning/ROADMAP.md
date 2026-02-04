# Roadmap: Robo Assistant

## Overview

Build an interactive GitHub Pages demo showcasing an AI-powered business assistant across multiple communication channels. The demo uses pre-scripted scenarios and simulated interactions to validate the product concept before investing in production infrastructure. Four phases deliver the complete demo experience: foundation UI, multi-channel communication, business intelligence features, and final polish.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Demo Foundation** - Core interface and project infrastructure
- [ ] **Phase 2: Multi-Channel Communication** - Simulated messengers, email, and context preservation
- [ ] **Phase 3: Business Intelligence** - Email management, calendar, tasks, and strategic features
- [ ] **Phase 4: Demo Experience** - Voice simulation, onboarding, and demo polish

## Phase Details

### Phase 1: Demo Foundation

**Goal**: Establish project infrastructure and core chat interface for natural language interaction
**Depends on**: Nothing (first phase)
**Requirements**: UI-01, DEMO-03
**Success Criteria** (what must be TRUE):

1. User can type messages in a chat interface and see AI responses
2. User sees realistic business scenarios (not lorem ipsum placeholder content)
3. Demo loads on GitHub Pages with functional CI/CD deployment
4. Project has development environment with hot-reload and build scripts
   **Plans**: 6 plans

Plans:

- [x] 01-01-PLAN.md - Project setup (Vite + React + TypeScript + shadcn/ui + dev tooling)
- [x] 01-02-PLAN.md - Layout foundation (split-view layout, navigation panel structure)
- [x] 01-03-PLAN.md - Chat interface (message list, input, typing indicator, auto-scroll)
- [x] 01-04-PLAN.md - Demo data & scenarios (personas, pre-scripted responses, realistic content)
- [x] 01-05-PLAN.md - Scenario integration (connect chat with scenarios, persona switching)
- [x] 01-06-PLAN.md - CI/CD & deployment (GitHub Actions, GitHub Pages)

### Phase 2: Multi-Channel Communication

**Goal**: Demonstrate cross-channel context preservation with multiple communication interfaces
**Depends on**: Phase 1
**Requirements**: UI-02, UI-03, UI-04, COMM-01, COMM-02, COMM-03, COMM-04
**Success Criteria** (what must be TRUE):

1. User can see WhatsApp-style messenger interface with threaded conversations
2. User can see email interface showing inbox and message threads
3. User can switch between chat, messenger, and email without losing conversation context
4. User sees AI maintaining context across multi-turn conversations within each channel
5. User sees conversation history persist during demo session
   **Plans**: TBD

Plans:

- [ ] 02-01: TBD
- [ ] 02-02: TBD

### Phase 3: Business Intelligence

**Goal**: Showcase administrative automation and strategic intelligence capabilities
**Depends on**: Phase 2
**Requirements**: EMAIL-01, EMAIL-02, EMAIL-03, EMAIL-04, CAL-01, CAL-02, CAL-03, CAL-04, TASK-01, TASK-02, TASK-03, TASK-04, STRAT-01, STRAT-02, STRAT-03, STRAT-04
**Success Criteria** (what must be TRUE):

1. User sees email inbox with AI-categorized messages (priority, action needed, FYI)
2. User sees AI-drafted email responses and thread summaries
3. User sees calendar with meetings, scheduling suggestions, and conflict detection
4. User sees meeting preparation briefs with agenda and participant context
5. User sees tasks automatically extracted from conversations with prioritization
6. User sees recursive task breakdown for complex tasks
7. User sees executive briefing summarizing key communications
8. User sees proactive suggestions and opportunity flagging
   **Plans**: TBD

Plans:

- [ ] 03-01: TBD
- [ ] 03-02: TBD
- [ ] 03-03: TBD

### Phase 4: Demo Experience

**Goal**: Complete demo with voice simulation, onboarding flow, and interactive scenarios
**Depends on**: Phase 3
**Requirements**: UI-05, VOICE-01, VOICE-02, VOICE-03, DEMO-01, DEMO-02, DEMO-04
**Success Criteria** (what must be TRUE):

1. User completes onboarding flow introducing assistant capabilities within 60 seconds
2. User sees simulated voice call interface with transcription
3. User sees voice call summaries with extracted action items
4. User can explore different interactive scenarios (email management, meeting scheduling, task coordination)
5. User can reset demo to try different scenarios without page reload
   **Plans**: TBD

Plans:

- [ ] 04-01: TBD
- [ ] 04-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase                          | Plans Complete | Status      | Completed |
| ------------------------------ | -------------- | ----------- | --------- |
| 1. Demo Foundation             | 6/6            | Complete    | 2026-02-04 |
| 2. Multi-Channel Communication | 0/TBD          | Not started | -         |
| 3. Business Intelligence       | 0/TBD          | Not started | -         |
| 4. Demo Experience             | 0/TBD          | Not started | -         |

---

_Roadmap created: 2026-02-04_
_Last updated: 2026-02-04 after Phase 1 planning complete_
