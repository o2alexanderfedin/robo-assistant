import type { ScenarioData } from './types';

interface EmailData {
  id: string;
  from: string;
  fromEmail: string;
  subject: string;
  preview: string;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
  category: 'urgent' | 'action-needed' | 'fyi';
  unread: boolean;
}

interface EmailTriageMockData {
  emails: EmailData[];
  stats: {
    total: number;
    unread: number;
    urgent: number;
  };
}

export const emailTriageScenario: ScenarioData<EmailTriageMockData> = {
  id: 'email-triage',
  name: 'Email Triage',
  triggerPatterns: ['email', 'inbox', 'messages', 'unread', 'mail'],
  description: 'Intelligent email management and prioritization',
  mockData: {
    emails: [
      {
        id: 'email-001',
        from: 'Robert Sterling',
        fromEmail: 'rsterling@sterlingpartners.com',
        subject: 'Urgent: Board meeting agenda review needed',
        preview:
          'Jennifer - Need your feedback on Q1 board deck by EOD. Specifically sections on M&A pipeline and digital transformation metrics. Can we align on...',
        timestamp: new Date('2026-02-04T08:30:00'),
        priority: 'high',
        category: 'urgent',
        unread: true,
      },
      {
        id: 'email-002',
        from: 'Sarah Martinez',
        fromEmail: 'smartinez@horizonventures.com',
        subject: 'Re: Series B Term Sheet - Confidential',
        preview:
          "Alex - Circling back on our conversation. We're ready to move forward with the $35M Series B at a $180M pre-money valuation. Draft term sheet attached. Key terms...",
        timestamp: new Date('2026-02-04T07:15:00'),
        priority: 'high',
        category: 'urgent',
        unread: true,
      },
      {
        id: 'email-003',
        from: 'Jordan Lee',
        fromEmail: 'jordan@nexgenai.com',
        subject: 'Project milestone update required',
        preview:
          'Hey - The Q1 product roadmap review is tomorrow. Need your sign-off on the ML pipeline v2 timeline and resource allocation for the...',
        timestamp: new Date('2026-02-04T09:45:00'),
        priority: 'medium',
        category: 'action-needed',
        unread: true,
      },
      {
        id: 'email-004',
        from: 'Michael Chen',
        fromEmail: 'mchen@globaltechindustries.com',
        subject: 'Q4 Earnings Call Script - Draft',
        preview:
          'Draft talking points for Thursday investor call. Revenue guidance at $2.1B (+12% YoY), EBITDA margins holding at 23%. Please review analyst...',
        timestamp: new Date('2026-02-03T16:20:00'),
        priority: 'medium',
        category: 'action-needed',
        unread: false,
      },
      {
        id: 'email-005',
        from: 'Tech Industry Insights',
        fromEmail: 'newsletter@techindustryinsights.com',
        subject: 'Weekly newsletter: Tech Industry Roundup',
        preview:
          'Top stories this week: AI regulation updates, venture funding trends, emerging technologies in enterprise software...',
        timestamp: new Date('2026-02-03T06:00:00'),
        priority: 'low',
        category: 'fyi',
        unread: true,
      },
      {
        id: 'email-006',
        from: 'Maria Santos',
        fromEmail: 'maria@nexgenai.com',
        subject: 'New hire paperwork - Engineering leads',
        preview:
          'Three senior engineers starting Monday. Offer letters signed, background checks cleared. Need approval on equity grants...',
        timestamp: new Date('2026-02-03T14:30:00'),
        priority: 'medium',
        category: 'action-needed',
        unread: false,
      },
      {
        id: 'email-007',
        from: 'TechConnect Conference',
        fromEmail: 'events@techconnect.com',
        subject: 'Invitation: TechConnect Conference 2026',
        preview:
          'You are invited to speak at TechConnect 2026 in San Francisco, May 15-17. Featured session: "AI Infrastructure at Scale". RSVP by...',
        timestamp: new Date('2026-02-02T11:00:00'),
        priority: 'low',
        category: 'fyi',
        unread: true,
      },
    ],
    stats: {
      total: 7,
      unread: 5,
      urgent: 2,
    },
  },
  steps: [
    {
      userTrigger: 'check my emails',
      assistantResponse:
        'Good morning! You have 7 emails in your inbox, 5 unread. I\'ve found 2 marked urgent that need your attention:\n\n**High Priority:**\n1. Robert Sterling - "Urgent: Board meeting agenda review needed" (8:30 AM)\n2. Sarah Martinez - "Re: Series B Term Sheet - Confidential" (7:15 AM)\n\n**Action Needed:**\n3. Jordan Lee - "Project milestone update required"\n4. Michael Chen - "Q4 Earnings Call Script - Draft"\n5. Maria Santos - "New hire paperwork - Engineering leads"\n\nWould you like me to help you draft a response to either of the urgent emails?',
      richContent: {
        type: 'email-preview',
        data: {
          emails: 'mockData.emails',
          summary: 'mockData.stats',
        },
      },
    },
    {
      userTrigger: 'help me respond to the board meeting email',
      assistantResponse:
        "I can draft a response to Robert Sterling about the board meeting agenda. Based on the email, he needs:\n\n1. Feedback on Q1 board deck (specifically M&A pipeline and digital transformation sections)\n2. Response by end of day\n\nHere's a suggested reply:\n\n---\n\n**Subject:** Re: Urgent: Board meeting agenda review needed\n\n\"Robert,\n\nI've reviewed the Q1 board deck. The M&A pipeline section looks solid - recommend adding competitive landscape context for the proposed acquisitions.\n\nFor digital transformation metrics, let's emphasize:\n- Cloud migration progress (now at 73%)\n- Customer adoption of new platform (40% increase QoQ)\n- Cost savings realized ($12M annually)\n\nCan we schedule 30 minutes this afternoon to align on any additional points?\n\nBest,\nJennifer\"\n\n---\n\nWould you like me to send this, or would you prefer to make changes first?",
    },
    {
      userTrigger: 'categorize the rest',
      assistantResponse:
        "I've organized your remaining emails by priority:\n\n**Urgent (requires immediate action):**\n✓ Already addressed: Board agenda, Series B term sheet\n\n**Action Needed (this week):**\n• Jordan Lee - Product roadmap review (tomorrow's meeting)\n• Michael Chen - Q4 earnings script review (call on Thursday)\n• Maria Santos - Equity grant approvals for new hires\n\n**FYI (informational):**\n• Tech Industry Insights - Weekly newsletter\n• TechConnect Conference - Speaker invitation for May\n\nI recommend prioritizing Jordan's roadmap review next since the meeting is tomorrow. Would you like me to pull up the existing roadmap documents to prepare?",
    },
  ],
};
