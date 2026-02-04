# Phase 1: Demo Foundation - Context

**Gathered:** 2026-02-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish project infrastructure and core chat interface for natural language interaction. This includes the foundational split-view layout with navigation panel and chat interface, pre-scripted AI response system, development environment setup, and GitHub Pages deployment with CI/CD. Future phases will add multi-channel views, business intelligence features, and demo polish.

</domain>

<decisions>
## Implementation Decisions

### Layout Architecture
- **Split view layout** with navigation/info panel on LEFT, chat/messages area on RIGHT
- Left panel contains four sections:
  - Channel switcher (toggle between Chat, WhatsApp, Email, Voice)
  - Conversation list (ongoing conversations/threads)
  - Quick actions (new message, schedule meeting, create task shortcuts)
  - Assistant status (avatar, status, capabilities overview)
- Right panel displays the active conversation

### Chat Interface Design
- **Chat bubbles** for message display (WhatsApp/iMessage style - rounded, modern messaging feel)
- **Light & airy visual style**: white/light gray background, soft colors, spacious layout - friendly and approachable
- Message bubbles use modern chat conventions

### AI Response Behavior
- **Hybrid approach**: Guided scenarios with variation - balance between pre-scripted reliability and dynamic flexibility
- **Typing indicators for longer responses only** - shows "Assistant is typing..." for responses that would take time, skip for quick replies
- **Gentle redirect** for off-script inputs: "Let me help with [available scenarios]" - guide users back to demo paths without breaking immersion
- **Rich response elements**:
  - Action buttons (quick reply buttons, suggested actions)
  - Inline previews (email previews, calendar events, task cards embedded in chat)
  - Status updates ("Checking calendar...", "Drafting email..." progress messages)

### Demo Scenarios & Content
- **Two switchable personas** to show different clients:
  1. Startup founder (fast-paced, investor emails, growth focus)
  2. Executive/CEO (strategic decisions, board meetings, high-level communications)
- **Four key business scenarios**:
  1. Email triage (AI categorizes inbox, drafts responses, flags urgent items)
  2. Meeting scheduling (AI coordinates calendar, finds slots, sends invites)
  3. Task extraction (AI pulls action items from conversations, creates tasks)
  4. Daily briefing (AI summarizes key info, upcoming meetings, priorities)
- **Highly realistic demo data**: Real company names, detailed emails, authentic business scenarios - immersive, not generic "Acme Corp"
- **Both tutorial and free exploration**: Tutorial walkthrough on first visit, then free exploration mode - best of both approaches

### Tech Stack & Deployment
- **Framework**: Vite (faster builds, simpler for GitHub Pages static deployment)
- **UI Components**: shadcn/ui + Tailwind CSS (modern, customizable, research-validated)
- **TypeScript**: Strict mode enabled for quality
- **CI/CD Pipeline** (GitHub Actions):
  - Auto-deploy to GitHub Pages on push to main
  - Run tests and linting before deployment
  - Preview deployments for pull requests
- **Development Environment**:
  - Hot reload for instant updates
  - ESLint + Prettier for code quality
  - TypeScript strict mode
  - Full development workflow setup

### Claude's Discretion
- Exact spacing, typography, and micro-interactions
- Loading skeleton design specifics
- Error state handling details
- Specific animation timing and transitions
- Mock data generation approach (MSW vs hardcoded)
- Exact color palette within "light & airy" style
- Icon selection and styling

</decisions>

<specifics>
## Specific Ideas

- **Persona switching**: Demo should allow switching between Startup Founder and Executive/CEO personas to show relevant scenarios to different potential clients
- **No lorem ipsum**: All demo content must be realistic - real company names, authentic email content, believable business scenarios
- **Immersive experience**: The demo should feel like a real product, not obviously fake - users should be able to imagine themselves using it

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope. Multi-channel views (WhatsApp, Email specific UIs) are explicitly Phase 2. Business intelligence features (email management details, calendar integration, task management) are Phase 3. Voice simulation and onboarding flow are Phase 4.

</deferred>

---

*Phase: 01-demo-foundation*
*Context gathered: 2026-02-04*
