import type { ScenarioData } from './types';

interface BriefingSection {
  title: string;
  items: Array<{
    type: 'meeting' | 'email' | 'task' | 'insight';
    content: string;
    priority: 'high' | 'medium' | 'low';
    time?: string;
  }>;
}

interface DailyBriefingMockData {
  date: Date;
  greeting: string;
  sections: BriefingSection[];
  summary: string;
}

export const dailyBriefingScenario: ScenarioData<DailyBriefingMockData> = {
  id: 'daily-briefing',
  name: 'Daily Briefing',
  triggerPatterns: ['brief', 'briefing', 'update', 'status', 'morning', 'today', 'summary'],
  description: 'Personalized daily executive summary',
  mockData: {
    date: new Date('2026-02-04T08:00:00'),
    greeting: 'Good morning',
    sections: [
      {
        title: "Today's Schedule",
        items: [
          {
            type: 'meeting',
            content: 'Executive Team Weekly Sync',
            priority: 'medium',
            time: '10:00 AM - 11:00 AM',
          },
          {
            type: 'meeting',
            content: '1:1 with Jordan Lee - Product Roadmap Review',
            priority: 'high',
            time: '2:00 PM - 3:00 PM',
          },
          {
            type: 'meeting',
            content: 'Series B Discussion with Sarah Martinez',
            priority: 'high',
            time: '3:30 PM - 4:30 PM',
          },
        ],
      },
      {
        title: 'Urgent Items',
        items: [
          {
            type: 'email',
            content: 'Board meeting agenda review needed by EOD (Robert Sterling)',
            priority: 'high',
          },
          {
            type: 'email',
            content: 'Series B term sheet review - $35M at $180M pre-money (Sarah Martinez)',
            priority: 'high',
          },
          {
            type: 'task',
            content: 'Approve equity grants for 3 new engineering hires starting Monday',
            priority: 'high',
          },
        ],
      },
      {
        title: 'Priority Tasks',
        items: [
          {
            type: 'task',
            content: 'Review Q1 board deck - M&A and digital transformation sections',
            priority: 'high',
          },
          {
            type: 'task',
            content: 'Prepare talking points for Series B discussion',
            priority: 'high',
          },
          {
            type: 'task',
            content: 'Review product roadmap before Jordan meeting',
            priority: 'medium',
          },
        ],
      },
      {
        title: 'Key Insights',
        items: [
          {
            type: 'insight',
            content: 'Board meeting tomorrow (9 AM - 12 PM) - ensure deck review complete today',
            priority: 'high',
          },
          {
            type: 'insight',
            content: 'Q4 Earnings Call Thursday - script review needed by tomorrow',
            priority: 'medium',
          },
          {
            type: 'insight',
            content: '5 unread emails, 2 marked urgent',
            priority: 'medium',
          },
        ],
      },
    ],
    summary:
      'Focused on Series B fundraising and board preparation. Three high-priority meetings today, with critical board deck review due by EOD.',
  },
  steps: [
    {
      userTrigger: 'give me my daily briefing',
      assistantResponse:
        "Good morning! Here's your briefing for Tuesday, February 4, 2026:\n\n**📅 Today's Schedule (3 meetings)**\n• 10:00 AM - Executive Team Weekly Sync\n• 2:00 PM - 1:1 with Jordan Lee (Product Roadmap)\n• 3:30 PM - Series B Discussion with Sarah Martinez ⚠️\n\n**🔴 Urgent Items (3)**\n1. Board meeting agenda review due by 5 PM today\n2. Series B term sheet - $35M at $180M pre-money\n3. Equity grant approvals for new hires\n\n**✅ Priority Tasks**\n• Review Q1 board deck (M&A and digital transformation)\n• Prepare Series B talking points\n• Review product roadmap docs\n\n**💡 Key Insight:**\nBig board meeting tomorrow 9 AM-12 PM. Today's focus: complete deck review and finalize Series B strategy for investor discussion.\n\nYou have 5 unread emails with 2 urgent flags. Would you like to tackle emails first or jump into the board deck review?",
      richContent: {
        type: 'task-card',
        data: {
          sections: 'mockData.sections',
        },
      },
    },
    {
      userTrigger: 'what should I focus on first',
      assistantResponse:
        "Based on your priorities and deadlines, here's my recommendation for today:\n\n**Morning (Now - 10 AM):**\n1. Quick email triage (15 min)\n   - Address Robert Sterling's urgent board deck email\n   - Acknowledge Sarah's Series B term sheet\n2. Start board deck review (45 min)\n   - Focus on M&A pipeline section first\n\n**Mid-Day (11 AM - 2 PM):**\n3. Complete board deck review and send feedback (1 hour)\n4. Lunch + prepare for Jordan's meeting (30 min)\n\n**Afternoon (2 PM - 5 PM):**\n5. Jordan meeting - Product roadmap (1 hour)\n6. Series B meeting with Sarah (1 hour)\n7. Approve equity grants (15 min)\n\n**Critical path:** Board deck review must be done before your 2 PM meeting to meet Robert's 5 PM deadline with buffer.\n\nThis schedule leaves you focused time for deep work while keeping meetings on track. Should I block focus time on your calendar?",
    },
    {
      userTrigger: 'tell me more about the series b',
      assistantResponse:
        "Here's the Series B situation breakdown:\n\n**The Opportunity:**\n• Amount: $35M Series B funding\n• Valuation: $180M pre-money\n• Lead Investor: Sarah Martinez @ Horizon Ventures\n• Status: Term sheet ready for review\n\n**Context:**\nHorizon Ventures led your Series A and clearly sees strong progress. The valuation represents solid growth from Series A and validates your traction.\n\n**Meeting Today (3:30 PM):**\nYou're scheduled to discuss:\n1. Term sheet key terms\n2. Timeline and next steps\n3. Board communication strategy (relevant for tomorrow's meeting)\n\n**Prep Needed:**\n- Review term sheet details (I can pull this up)\n- Consider dilution impact and board seat implications\n- Align on messaging for board meeting tomorrow\n- Discuss syndicate - are other VCs joining?\n\n**Strategic Note:**\nWith board meeting tomorrow, you could preview this opportunity with Robert Sterling and other board members. Good timing for strategic alignment.\n\nWould you like me to prepare a term sheet summary or draft talking points for your discussion with Sarah?",
      richContent: {
        type: 'action-buttons',
        data: {
          actions: [
            'View term sheet',
            'Prepare talking points',
            'Review Series A terms',
            'Check cap table',
          ],
        },
      },
    },
  ],
};
