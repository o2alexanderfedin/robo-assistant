# Phase 1: Demo Foundation - Research

**Researched:** 2026-02-04
**Domain:** React + TypeScript + Vite, Chat UI, Static Site Deployment
**Confidence:** HIGH

## Summary

Phase 1 establishes a production-quality demo application using modern React development practices. The standard stack (Vite + React 18 + TypeScript strict mode + shadcn/ui + Tailwind CSS) provides fast development iteration, type safety, and professional UI components. Deployment via GitHub Pages with GitHub Actions CI/CD enables automated testing, linting, and deployment on every push.

Key technical decisions align with 2026 best practices: Vite for blazing-fast HMR, shadcn/ui for customizable components (not a library but code you own), TypeScript strict mode for maximum type safety, and MSW for realistic API simulation that works across development and demos. The chat interface follows established patterns from production messaging applications including auto-scrolling, typing indicators, and message bubbles.

For realistic demo data, use libraries like Falso or MiniFaker (tree-shakable, TypeScript-first alternatives to Faker.js). For guided tutorials, React Joyride or Reactour provide production-ready tour experiences. State management can use React Context for simple scenarios or Zustand for better performance with minimal setup.

**Primary recommendation:** Follow the official Vite + React-TS template, add shadcn/ui via CLI, enable TypeScript strict mode, use MSW for simulated responses, and deploy via GitHub Actions with the peaceiris/actions-gh-pages@v4 action. Structure the project feature-first (not component-first) to support growth.

## Standard Stack

The established libraries/tools for this domain:

### Core

| Library      | Version | Purpose                 | Why Standard                                                                                                        |
| ------------ | ------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Vite         | 5.x+    | Build tool & dev server | Industry standard for React in 2026, near-instant HMR, optimized production builds, official React template support |
| React        | 18.x    | UI framework            | Current stable version with Concurrent Features, hooks, strict mode                                                 |
| TypeScript   | 5.x+    | Type system             | 80%+ of frontend jobs require TS, self-documenting code, catch errors at compile time                               |
| shadcn/ui    | Latest  | UI component system     | Components you own (not npm library), built on Radix UI primitives, highly customizable, Tailwind-native            |
| Tailwind CSS | 3.x/4.x | Utility-first CSS       | Official shadcn/ui styling system, rapid UI development, v4 supports CSS-only config                                |
| React Router | 6.x     | Client-side routing     | Standard React routing solution, TypeScript support, Vite plugin available                                          |

**Installation:**

```bash
# Create Vite project with React-TS template
npm create vite@latest robo-assistant-demo -- --template react-ts

# Install shadcn/ui (interactive CLI setup)
npx shadcn@latest init

# Add specific components
npx shadcn@latest add button input card avatar scroll-area

# Install React Router
npm install react-router-dom
```

### Supporting

| Library                   | Version | Purpose                | When to Use                                                                 |
| ------------------------- | ------- | ---------------------- | --------------------------------------------------------------------------- |
| MSW (Mock Service Worker) | 2.x     | API mocking/simulation | Demos, development, testing - intercepts network requests at platform level |
| Falso (@ngneat/falso)     | Latest  | Demo data generation   | Tree-shakable, TypeScript-native, 169+ generators for realistic data        |
| React Joyride             | 2.x     | Guided tours           | Tutorial mode - production-ready tour/walkthrough component                 |
| Zustand                   | 4.x     | State management       | Optional if Context becomes complex - minimal boilerplate, good performance |
| Lucide React              | Latest  | Icon library           | Default for shadcn/ui, tree-shakable, consistent design system              |
| class-variance-authority  | Latest  | Component variants     | Required by shadcn/ui for managing component states                         |
| tailwind-merge + clsx     | Latest  | Conditional classes    | Required by shadcn/ui cn() utility for merging Tailwind classes             |

**Installation:**

```bash
# MSW for API simulation
npm install --save-dev msw@latest

# Demo data generation
npm install --save-dev @ngneat/falso

# Guided tours (optional)
npm install react-joyride

# State management (optional, if Context not sufficient)
npm install zustand

# Already included with shadcn/ui setup:
# - lucide-react
# - class-variance-authority
# - tailwind-merge
# - clsx
```

### Alternatives Considered

| Instead of   | Could Use               | Tradeoff                                                                        |
| ------------ | ----------------------- | ------------------------------------------------------------------------------- |
| Vite         | Create React App        | CRA is deprecated, slower, no longer maintained                                 |
| shadcn/ui    | Material-UI, Ant Design | Traditional libraries = larger bundles, less customization, update dependencies |
| Falso        | @faker-js/faker         | Faker is larger, not optimally tree-shakable, Falso is modern TypeScript-first  |
| MSW          | Hardcoded mock data     | MSW provides realistic network layer, reusable across dev/test/Storybook/demos  |
| React Router | TanStack Router         | React Router is more mature, larger ecosystem, simpler for standard use cases   |
| Zustand      | Redux Toolkit, Recoil   | Redux is overkill for demos, Zustand has minimal boilerplate and great DX       |

## Architecture Patterns

### Recommended Project Structure

Feature-first organization (not component-first) enables growth and clear boundaries:

```
src/
├── main.tsx                 # App entry point
├── App.tsx                  # Root component with routing
├── vite-env.d.ts           # Vite types
├── index.css               # Global styles, Tailwind imports
│
├── features/               # Feature-based modules (domain logic)
│   ├── chat/
│   │   ├── components/     # Chat-specific components
│   │   │   ├── ChatBubble.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── TypingIndicator.tsx
│   │   │   └── MessageList.tsx
│   │   ├── hooks/          # Chat-specific hooks
│   │   │   ├── useAutoScroll.ts
│   │   │   └── useChatSimulation.ts
│   │   ├── types.ts        # Chat domain types
│   │   └── data.ts         # Mock chat data/scenarios
│   │
│   ├── personas/           # Persona switching logic
│   │   ├── types.ts
│   │   └── data.ts
│   │
│   └── demo-scenarios/     # Business scenario definitions
│       ├── email-triage.ts
│       ├── meeting-scheduling.ts
│       ├── task-extraction.ts
│       └── daily-briefing.ts
│
├── components/             # Reusable UI components (not feature-specific)
│   ├── ui/                 # shadcn/ui components (auto-generated)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── SplitLayout.tsx
│   │   ├── LeftPanel.tsx
│   │   └── RightPanel.tsx
│   └── common/
│       └── LoadingSkeleton.tsx
│
├── lib/                    # Utilities and helpers
│   ├── utils.ts           # shadcn/ui cn() utility
│   └── msw/               # MSW setup
│       ├── handlers.ts    # Request handlers
│       └── browser.ts     # Browser worker setup
│
├── hooks/                  # Shared custom hooks
│   └── useLocalStorage.ts
│
├── types/                  # Shared TypeScript types
│   └── index.ts
│
└── data/                   # Shared mock data
    └── constants.ts
```

**Key principles:**

- Feature folders contain ALL related code (components, hooks, types, data)
- `/components/ui/` is shadcn/ui territory (don't edit directly, regenerate if needed)
- Reusable components go in `/components/`, feature-specific ones stay in `/features/`
- Avoid nesting more than 2 levels deep
- Co-locate tests with their components (`ChatBubble.test.tsx` next to `ChatBubble.tsx`)

### Pattern 1: Chat Message Rendering

**What:** Render chat bubbles with proper styling, auto-scroll to bottom on new messages

**When to use:** Message list in chat interface

**Example:**

```typescript
// Source: Multiple production chat implementations
import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatBubble } from './ChatBubble';
import type { Message } from '../types';

export function MessageList({ messages }: { messages: Message[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (anchorRef.current) {
      anchorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-4" ref={scrollRef}>
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
            isUser={message.role === 'user'}
          />
        ))}
        {/* Invisible anchor for auto-scroll */}
        <div ref={anchorRef} />
      </div>
    </ScrollArea>
  );
}
```

### Pattern 2: Typing Indicator Simulation

**What:** Show "Assistant is typing..." with animated dots for simulated AI responses

**When to use:** Before displaying AI message, only for longer responses

**Example:**

```typescript
// Source: Stream Chat SDK patterns + custom implementation
import { useState, useEffect } from 'react';

export function TypingIndicator() {
  return (
    <div className="flex items-center space-x-2 px-4 py-2">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
      </div>
      <span className="text-sm text-gray-500">Assistant is typing...</span>
    </div>
  );
}

// Usage in chat simulation
export function useChatSimulation() {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (userMessage: string) => {
    // Add user message immediately
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: userMessage }]);

    // Show typing indicator for "longer" responses (> 20 chars)
    const responseLength = getSimulatedResponseLength(userMessage);
    if (responseLength > 20) {
      setIsTyping(true);
      await delay(1500); // Simulate thinking time
      setIsTyping(false);
    }

    // Add AI response
    setMessages(prev => [...prev, {
      id: Date.now(),
      role: 'assistant',
      content: getSimulatedResponse(userMessage)
    }]);
  };

  return { messages, isTyping, sendMessage };
}
```

### Pattern 3: MSW Request Handlers

**What:** Intercept API requests and return simulated responses at network level

**When to use:** Demo environments, development without backend, Storybook

**Example:**

```typescript
// Source: https://mswjs.io/docs/
// src/lib/msw/handlers.ts
import { http, HttpResponse } from 'msw';
import { generateMockEmail } from '@/data/mockGenerators';

export const handlers = [
  // Email triage endpoint
  http.get('/api/emails', () => {
    return HttpResponse.json({
      emails: [
        generateMockEmail({ priority: 'high', from: 'investor@acme.vc' }),
        generateMockEmail({ priority: 'low', from: 'newsletter@tech.com' }),
      ],
    });
  }),

  // Meeting scheduling
  http.post('/api/meetings', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      success: true,
      meeting: {
        id: crypto.randomUUID(),
        title: body.title,
        time: body.time,
      },
    });
  }),
];

// src/lib/msw/browser.ts
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// src/main.tsx - Start MSW before React
import { worker } from './lib/msw/browser';

if (import.meta.env.DEV) {
  await worker.start({
    onUnhandledRequest: 'bypass', // Don't warn for real requests
  });
}

// Then render React app...
```

### Pattern 4: Demo Data Generation

**What:** Generate realistic business data for demos using Falso

**When to use:** Creating mock emails, meetings, tasks, contacts

**Example:**

```typescript
// Source: @ngneat/falso documentation
import {
  randEmail,
  randFullName,
  randCompanyName,
  randPastDate,
  randParagraph,
} from '@ngneat/falso';

export function generateMockEmail(options?: {
  priority?: 'high' | 'medium' | 'low';
  from?: string;
}) {
  return {
    id: crypto.randomUUID(),
    from: options?.from || randEmail(),
    sender: randFullName(),
    company: randCompanyName(),
    subject: generateEmailSubject(options?.priority),
    preview: randParagraph({ length: 1 }).slice(0, 100),
    timestamp: randPastDate({ years: 0.01 }), // Last few days
    priority: options?.priority || 'medium',
    read: false,
  };
}

function generateEmailSubject(priority?: string): string {
  if (priority === 'high') {
    return randFromArray([
      'Urgent: Q4 Board Meeting Agenda Review',
      'ASAP: Investor call scheduled for tomorrow',
      'Action Required: Contract renewal by EOD',
    ]);
  }
  return randFromArray([
    'Weekly Team Sync Notes',
    'Project Update: Development Sprint 12',
    'Conference Invitation: TechSummit 2026',
  ]);
}
```

### Pattern 5: Vite GitHub Pages Deployment

**What:** Configure Vite for correct base path and GitHub Pages deployment

**When to use:** Deploying to `username.github.io/repo-name`

**Example:**

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // CRITICAL: Set base path for GitHub Pages subdirectory deployment
  base: '/robo-assistant/', // Replace with your repo name
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v4
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Pattern 6: Component Variants with CVA

**What:** Type-safe component variants using class-variance-authority (shadcn/ui pattern)

**When to use:** Components with multiple visual states (message bubbles, buttons, cards)

**Example:**

```typescript
// Source: shadcn/ui button component pattern
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const chatBubbleVariants = cva(
  // Base styles
  'rounded-2xl px-4 py-2 max-w-[70%] break-words',
  {
    variants: {
      role: {
        user: 'bg-primary text-primary-foreground ml-auto',
        assistant: 'bg-muted text-foreground mr-auto',
      },
      status: {
        default: 'opacity-100',
        sending: 'opacity-60',
        error: 'border-2 border-destructive',
      },
    },
    defaultVariants: {
      role: 'user',
      status: 'default',
    },
  }
);

interface ChatBubbleProps extends VariantProps<typeof chatBubbleVariants> {
  message: Message;
}

export function ChatBubble({ message, role, status }: ChatBubbleProps) {
  return (
    <div className={cn(chatBubbleVariants({ role, status }))}>
      <p>{message.content}</p>
    </div>
  );
}
```

### Anti-Patterns to Avoid

- **Don't import from `@/components/ui` and modify** - shadcn/ui components are meant to be regenerated. Copy to feature folder if you need customization.
- **Don't use `process.env`** - Vite uses `import.meta.env`, prefixed variables only (`VITE_*`)
- **Don't deeply nest features** - Max 2 levels: `features/chat/components/` not `features/chat/components/bubbles/variants/`
- **Don't use `setTimeout` for streaming** - Use proper async/await with delays or MSW streaming responses
- **Don't forget base path** - Vite needs `base: '/repo-name/'` for GitHub Pages subdirectories
- **Don't mix state management** - Pick Context OR Zustand, not both for same domain
- **Don't skip TypeScript strict mode** - Catches bugs early, enables better refactoring

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem              | Don't Build                                 | Use Instead                         | Why                                                                                          |
| -------------------- | ------------------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------- |
| API mocking          | Hardcoded mock data in components           | MSW (Mock Service Worker)           | Intercepts at network level, reusable across dev/test/demo, realistic request/response cycle |
| Demo data generation | Manual arrays of fake data                  | Falso or MiniFaker                  | Maintains consistency, tree-shakable, TypeScript types, 169+ generators                      |
| UI components        | Custom buttons, inputs, modals from scratch | shadcn/ui + Radix UI primitives     | Accessible, keyboard navigation, focus management, tested across browsers                    |
| Class name merging   | String concatenation or template literals   | tailwind-merge + clsx (cn utility)  | Properly merges conflicting Tailwind classes, handles conditionals                           |
| Icon library         | SVG files or icon fonts                     | Lucide React                        | Tree-shakable, consistent design system, 1000+ icons, TypeScript support                     |
| Guided tours         | Custom tooltip/modal system                 | React Joyride or Reactour           | Handles positioning, z-index, keyboard navigation, mobile, step management                   |
| Auto-scrolling chat  | Manual scrollIntoView logic                 | Intersection Observer + ref pattern | Handles edge cases (user scrolled up, rapid messages, resize)                                |
| Date/time formatting | Custom formatters                           | date-fns or dayjs                   | Handles timezones, i18n, relative time ("2 hours ago")                                       |
| Form validation      | Manual validation logic                     | React Hook Form + Zod               | Type-safe schemas, error messages, async validation, touched/dirty state                     |
| Color theming        | Manual CSS variables                        | shadcn/ui theming system            | Supports light/dark mode, semantic tokens, oklch color space                                 |

**Key insight:** The demo needs to feel polished and professional. Using battle-tested libraries for UI components, mocking, and data generation ensures consistency and quality that would take weeks to build from scratch. Focus effort on the demo's unique value proposition (business scenarios, AI simulation quality), not reinventing solved problems.

## Common Pitfalls

### Pitfall 1: GitHub Pages 404 on Routes

**What goes wrong:** Client-side routing works in development but shows 404 on GitHub Pages when directly accessing routes like `/chat` or on page refresh.

**Why it happens:** GitHub Pages serves static files. When a user visits `/chat`, GitHub looks for `chat.html` (doesn't exist) instead of serving `index.html` and letting React Router handle routing.

**How to avoid:**

1. Use hash routing (`createHashRouter` instead of `createBrowserRouter`) for GitHub Pages
2. OR add a 404.html redirect trick (copy index.html to 404.html in build)
3. OR use GitHub Actions deployment with proper SPA redirect handling

**Warning signs:** Routes work in `npm run dev` but fail in GitHub Pages deployment

**Recommended solution:**

```typescript
// src/main.tsx - Use hash routing for GitHub Pages
import { createHashRouter } from 'react-router-dom';

const router = createHashRouter([
  { path: '/', element: <HomePage /> },
  { path: '/chat', element: <ChatPage /> },
]);
```

### Pitfall 2: Missing Base Path in Assets

**What goes wrong:** App loads but all assets (JS, CSS, images) return 404. Console shows errors like "Failed to load resource: the server responded with a status of 404" for `/assets/index-[hash].js`.

**Why it happens:** Vite defaults to absolute paths (`/assets/...`). On GitHub Pages subdirectory (`username.github.io/repo/`), assets need to be at `/repo/assets/...`.

**How to avoid:** Set `base: '/repo-name/'` in `vite.config.ts` BEFORE building for GitHub Pages.

**Warning signs:** Blank page in production, 404s in Network tab for all assets, works fine on `localhost`

**Example fix:**

```typescript
// vite.config.ts
export default defineConfig({
  base: '/robo-assistant/', // Must match GitHub repo name
  // ... rest of config
});
```

### Pitfall 3: shadcn/ui Components Breaking on Updates

**What goes wrong:** After updating dependencies or regenerating a component, the component styles break or TypeScript errors appear.

**Why it happens:** shadcn/ui components are YOUR code, not an npm package. When you regenerate a component, it overwrites your modifications. When dependencies (Radix UI) have breaking changes, YOUR components break.

**How to avoid:**

1. Don't directly modify components in `/components/ui/`
2. Copy components to feature folders if you need customization
3. Use composition and className props to extend instead of editing
4. Pin Radix UI versions if stability is critical

**Warning signs:** "This component is broken" messages, TypeScript errors after `npx shadcn add`, styles not applying

### Pitfall 4: Environment Variables Not Exposed

**What goes wrong:** Environment variables work in development but are `undefined` in production, or variables aren't accessible at all.

**Why it happens:**

1. Vite only exposes variables prefixed with `VITE_*`
2. Must restart dev server after adding new `.env` variables
3. Variables are embedded at build time, not runtime

**How to avoid:**

1. Prefix all variables with `VITE_`: `VITE_API_URL` not `API_URL`
2. Access via `import.meta.env.VITE_API_URL` not `process.env`
3. Never put secrets in `VITE_*` variables (they're in the client bundle)
4. Restart dev server after changing `.env`

**Warning signs:** `undefined` when accessing env vars, "process is not defined" errors

**Example:**

```bash
# .env - Only VITE_* prefix is exposed
VITE_APP_TITLE="Robo Assistant Demo"
VITE_ENABLE_TUTORIAL=true
SECRET_KEY=xxx  # NOT accessible (good for security)
```

```typescript
// Access in code
console.log(import.meta.env.VITE_APP_TITLE); // Works
console.log(import.meta.env.SECRET_KEY); // undefined
console.log(process.env.VITE_APP_TITLE); // Error: process is not defined
```

### Pitfall 5: Hot Module Replacement Not Working

**What goes wrong:** Making changes requires full page refresh, losing app state. HMR is slow or breaks completely.

**Why it happens:**

1. Multiple component exports from one file break React Fast Refresh
2. Anonymous default exports don't preserve component identity
3. Side effects in module scope prevent HMR

**How to avoid:**

1. One component export per file (use eslint-plugin-react-refresh)
2. Named exports over default exports
3. No side effects in module scope (no component.onclick = ... at top level)

**Warning signs:** Page refreshes instead of hot updating, state resets on every change, "Could not Fast Refresh" warnings

**Example:**

```typescript
// BAD - Breaks HMR
export default function() { return <div>Hi</div> }
export const Other = () => <div>Other</div>; // Multiple exports

// GOOD - HMR works
export function ChatBubble() { return <div>Message</div> }
// Put Other in a separate file
```

### Pitfall 6: TypeScript Strict Mode Errors After Setup

**What goes wrong:** Enabling `"strict": true` causes hundreds of TypeScript errors in existing code.

**Why it happens:** Strict mode enables checks like `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes` which catch real bugs but require fixing existing code.

**How to avoid:**

1. Enable strict mode from project start (recommended)
2. OR migrate gradually: enable one strict flag at a time
3. Use `// @ts-expect-error` temporarily for planned fixes, never `// @ts-ignore`

**Warning signs:** Thousands of type errors after enabling strict mode, team resistance to TypeScript

**Gradual migration:**

```json
// tsconfig.json - Enable one at a time
{
  "compilerOptions": {
    "strict": false,
    "noImplicitAny": true, // Week 1
    "strictNullChecks": true, // Week 2
    "strictFunctionTypes": true // Week 3
    // ... continue until all strict flags are true, then flip strict: true
  }
}
```

### Pitfall 7: Chat Not Scrolling to Bottom

**What goes wrong:** New messages appear but user must manually scroll down to see them. Or it scrolls when user is reading old messages (annoying).

**Why it happens:**

1. `scrollIntoView` called before DOM updates (React render not committed)
2. No check if user has scrolled up (should not auto-scroll if reading history)
3. ScrollArea component doesn't expose scroll container ref properly

**How to avoid:**

1. Use `useEffect` with messages dependency to scroll after render
2. Use Intersection Observer to detect if user is at bottom before auto-scrolling
3. Get proper ref to scroll container (not wrapper div)

**Warning signs:** Manual scrolling required for new messages, scrolling interrupts reading, works inconsistently

**Better pattern:**

```typescript
function useAutoScroll(messages: Message[]) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(true);

  useEffect(() => {
    // Only auto-scroll if user was already at bottom
    if (isAtBottomRef.current && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    // Within 50px of bottom = "at bottom"
    isAtBottomRef.current = scrollHeight - scrollTop - clientHeight < 50;
  };

  return { scrollRef, handleScroll };
}
```

## Code Examples

Verified patterns from official sources:

### ESLint + Prettier Configuration (Flat Config - Modern)

```typescript
// eslint.config.js - Modern flat config format
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettier, // Must be last to override formatting rules
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': 'error',
    },
  }
);
```

```json
// .prettierrc - Prettier configuration
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "endOfLine": "lf"
}
```

### TypeScript Strict Configuration

```json
// tsconfig.json - Strict mode for new projects
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting - STRICT MODE ENABLED */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path aliases for imports */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### shadcn/ui Theme Configuration (Light & Airy)

```css
/* src/index.css - Light color scheme for "light & airy" design */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Light & airy background colors */
    --background: oklch(1 0 0); /* Pure white */
    --foreground: oklch(0.145 0 0); /* Dark text for contrast */

    /* Card and panel colors - soft grays */
    --card: oklch(0.99 0 0);
    --card-foreground: oklch(0.145 0 0);

    --popover: oklch(1 0 0);
    --popover-foreground: oklch(0.145 0 0);

    /* Primary action color - soft blue for friendly feel */
    --primary: oklch(0.5 0.15 230); /* Soft blue */
    --primary-foreground: oklch(0.98 0 0);

    /* Secondary and muted - light grays */
    --secondary: oklch(0.95 0.005 230);
    --secondary-foreground: oklch(0.3 0 0);

    --muted: oklch(0.96 0.003 230);
    --muted-foreground: oklch(0.45 0.01 230);

    /* Accent - slightly bolder for highlights */
    --accent: oklch(0.92 0.01 230);
    --accent-foreground: oklch(0.2 0 0);

    /* Borders - subtle, light gray */
    --border: oklch(0.92 0.002 230);
    --input: oklch(0.9 0.003 230);
    --ring: oklch(0.5 0.15 230);

    /* Semantic colors */
    --destructive: oklch(0.55 0.22 25);
    --destructive-foreground: oklch(0.98 0 0);

    /* Border radius for rounded, friendly feel */
    --radius: 0.75rem; /* More rounded than default */
  }

  .dark {
    /* Dark mode optional - not primary focus for "light & airy" */
    --background: oklch(0.15 0 0);
    --foreground: oklch(0.95 0 0);
    /* ... other dark mode colors */
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings:
      'rlig' 1,
      'calt' 1;
  }
}
```

### Complete Vite Configuration

```typescript
// vite.config.ts - Production-ready configuration
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  // CRITICAL for GitHub Pages subdirectory deployment
  base: process.env.VITE_BASE_PATH || '/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: false, // Disable for smaller production builds
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', 'class-variance-authority'],
        },
      },
    },
  },

  server: {
    port: 3000,
    open: true,
  },
});
```

## State of the Art

| Old Approach                   | Current Approach                  | When Changed | Impact                                                          |
| ------------------------------ | --------------------------------- | ------------ | --------------------------------------------------------------- |
| Create React App               | Vite                              | 2023-2024    | CRA deprecated, Vite 10-100x faster HMR, smaller bundles        |
| Component libraries (MUI, Ant) | shadcn/ui (copy-paste components) | 2023-2024    | No npm dependencies for UI, full customization, smaller bundles |
| Faker.js                       | Falso, MiniFaker                  | 2022         | Tree-shakable, TypeScript-first, better performance             |
| Redux for all state            | Context + Zustand/Jotai           | 2021-2023    | Less boilerplate, hooks-first, right-size state management      |
| Tailwind v3 JS config          | Tailwind v4 CSS config            | 2024-2025    | Simpler setup, CSS-based config, better performance             |
| ESLint legacy config           | ESLint flat config                | 2024         | Simpler, more maintainable, TypeScript-native                   |
| Default exports                | Named exports                     | 2023-2024    | Better HMR, tree-shaking, refactoring in IDEs                   |
| Axios for requests             | Native fetch                      | 2022-2023    | Built-in, no dependencies, MSW works with both                  |

**Deprecated/outdated:**

- **Create React App**: Officially unmaintained, use Vite or Next.js
- **tailwindcss-animate**: Replaced by tw-animate-css for shadcn/ui
- **react-scripts**: Part of CRA, deprecated
- **PropTypes**: Use TypeScript interfaces instead
- **process.env in Vite**: Use import.meta.env with VITE\_ prefix

## Open Questions

Things that couldn't be fully resolved:

1. **Optimal typing indicator delay**
   - What we know: Stream Chat SDK and production apps use 1-2 second delays
   - What's unclear: Exact threshold for "show typing indicator" vs immediate response
   - Recommendation: Start with 1.5s delay for responses > 20 characters, iterate based on feedback

2. **State management choice: Context vs Zustand**
   - What we know: Context is built-in but can cause re-render issues, Zustand adds 1KB but better performance
   - What's unclear: At what complexity does Context become insufficient for this demo?
   - Recommendation: Start with Context for chat state, switch to Zustand if performance degrades or state logic becomes complex

3. **MSW in production build**
   - What we know: MSW works in demos and Storybook, designed for dev/test environments
   - What's unclear: Best practice for conditionally loading MSW only in demo mode?
   - Recommendation: Use environment variable (VITE_DEMO_MODE) to conditionally start MSW worker, exclude from production bundle via tree-shaking

4. **Tutorial mode persistence**
   - What we know: React Joyride handles step management, localStorage can track completion
   - What's unclear: Should tutorial auto-start every time or only first visit? Reset mechanism?
   - Recommendation: Auto-start on first visit (localStorage check), add "Restart Tutorial" button in menu

5. **Realistic demo data volume**
   - What we know: Need realistic business scenarios, not generic data
   - What's unclear: How many mock emails, meetings, tasks to generate for immersive demo?
   - Recommendation: Start with 15-20 emails, 5-7 upcoming meetings, 10-12 active tasks - enough to feel real without overwhelming

## Sources

### Primary (HIGH confidence)

- **Vite Official Docs**: https://vite.dev/guide/static-deploy - GitHub Pages deployment configuration
- **shadcn/ui Manual Installation**: https://ui.shadcn.com/docs/installation/manual - Complete setup steps
- **shadcn/ui Theming**: https://ui.shadcn.com/docs/theming - CSS variables, color configuration
- **MSW Documentation**: https://mswjs.io/docs/ - How MSW works, use cases beyond testing
- **GitHub Actions - peaceiris/actions-gh-pages**: https://github.com/peaceiris/actions-gh-pages - Official deployment action setup
- **TypeScript TSConfig Reference**: https://www.typescriptlang.org/tsconfig/strict - Strict mode configuration
- **Vite Env Variables**: https://vite.dev/guide/env-and-mode - import.meta.env usage

### Secondary (MEDIUM confidence)

- [Deploying Vite React TypeScript to GitHub Pages](https://levelup.gitconnected.com/deploying-a-vite-react-typescript-app-to-github-pages-using-github-actions-jest-and-pnpm-as-a-a3461ef9c4ad) - GitHub Actions workflow patterns
- [React State Management 2025](https://dev.to/cristiansifuentes/react-state-management-in-2025-context-api-vs-zustand-385m) - Context vs Zustand comparison
- [shadcn/ui Best Practices](https://cursorrules.org/article/shadcn-cursor-mdc-file) - Common mistakes, best practices
- [React Folder Structure 2025](https://www.robinwieruch.de/react-folder-structure/) - Feature-first organization
- [Vite HMR Best Practices](https://jeremyrichardson.dev/blog/optimizing-hot-module-replacement-hmr-in-react-with-vite-the-importance-of-one-component-export-per-file) - One component per file
- [Chat UI Auto-scroll](https://davelage.com/posts/chat-scroll-react/) - Intersection Observer pattern
- [React Guided Tours](https://userguiding.com/blog/react-onboarding-tour) - React Joyride, Reactour comparison
- [Falso Mock Data](https://medium.com/netanelbasal/generate-fake-data-in-the-browser-and-node-js-using-falso-3998d2bcbaaf) - Faker.js alternative
- [TypeScript Strict Mode Guide](https://oneuptime.com/blog/post/2026-01-15-strict-typescript-configuration-react/view) - Strict mode benefits, setup

### Tertiary (LOW confidence - requires validation)

- WebSearch results for ecosystem trends (Zustand adoption %, TypeScript job postings) - No primary source verification
- Community discussions on GitHub/Reddit about "best practices" - Anecdotal, not authoritative
- Medium articles without official documentation links - Unverified implementation details

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - All recommendations from official documentation or widely-adopted industry standards
- Architecture: HIGH - Patterns from official docs (Vite, shadcn/ui) and production chat applications (Stream, Sendbird)
- Pitfalls: MEDIUM-HIGH - Mix of official documentation (Vite base path) and community-reported issues (GitHub discussions)

**Research date:** 2026-02-04
**Valid until:** 2026-03-04 (30 days - React/Vite ecosystem is stable, but check for Tailwind v4 stable release and shadcn/ui updates)

**Key findings requiring validation during implementation:**

1. Tailwind v4 adoption status - check if shadcn/ui has fully migrated
2. Exact shadcn/ui CLI version and component list - verify during setup
3. GitHub Pages deployment permissions - may require repository settings check
4. MSW v2 API stability - verify no breaking changes in latest version
