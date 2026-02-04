import type { ScenarioData } from './types';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: Date;
  status: 'overdue' | 'due-today' | 'upcoming' | 'completed';
  source: string; // Where the task came from
  assignee: string;
  subtasks?: string[];
}

interface TaskExtractionMockData {
  tasks: Task[];
  stats: {
    total: number;
    overdue: number;
    dueToday: number;
    completed: number;
  };
}

export const taskExtractionScenario: ScenarioData<TaskExtractionMockData> = {
  id: 'task-extraction',
  name: 'Task Management',
  triggerPatterns: ['task', 'to-do', 'todo', 'action item', 'follow up', 'reminder'],
  description: 'Intelligent task extraction and organization',
  mockData: {
    tasks: [
      {
        id: 'task-001',
        title: 'Review and approve Q1 board deck',
        description:
          'Provide feedback on M&A pipeline and digital transformation sections for Robert Sterling',
        priority: 'high',
        dueDate: new Date('2026-02-04T17:00:00'),
        status: 'due-today',
        source: 'Email from Robert Sterling',
        assignee: 'Jennifer Walsh',
      },
      {
        id: 'task-002',
        title: 'Sign equity grant paperwork for new engineering hires',
        description: 'Approve equity grants for three senior engineers starting Monday',
        priority: 'high',
        dueDate: new Date('2026-02-04T23:59:00'),
        status: 'due-today',
        source: 'Email from Maria Santos',
        assignee: 'Alex Chen',
      },
      {
        id: 'task-003',
        title: 'Prepare for product roadmap review with Jordan',
        description:
          'Review ML pipeline v2 timeline and resource allocation before tomorrow meeting',
        priority: 'high',
        dueDate: new Date('2026-02-04T14:00:00'),
        status: 'overdue',
        source: 'Email from Jordan Lee',
        assignee: 'Alex Chen',
      },
      {
        id: 'task-004',
        title: 'Review Q4 earnings call script',
        description:
          'Review talking points and analyst Q&A prep for Thursday investor call',
        priority: 'medium',
        dueDate: new Date('2026-02-05T09:00:00'),
        status: 'upcoming',
        source: 'Email from Michael Chen',
        assignee: 'Jennifer Walsh',
      },
      {
        id: 'task-005',
        title: 'Respond to Series B term sheet',
        description:
          'Review $35M Series B at $180M pre-money valuation, discuss with Sarah Martinez',
        priority: 'high',
        dueDate: new Date('2026-02-06T17:00:00'),
        status: 'upcoming',
        source: 'Email from Sarah Martinez',
        assignee: 'Alex Chen',
      },
      {
        id: 'task-006',
        title: 'RSVP to TechConnect Conference speaker invitation',
        description: 'Decide on speaking slot for May 15-17 conference in San Francisco',
        priority: 'low',
        dueDate: new Date('2026-02-15T23:59:00'),
        status: 'upcoming',
        source: 'Email from TechConnect',
        assignee: 'Alex Chen',
      },
    ],
    stats: {
      total: 6,
      overdue: 1,
      dueToday: 2,
      completed: 0,
    },
  },
  steps: [
    {
      userTrigger: 'what are my tasks',
      assistantResponse:
        "Here's your task list with priorities:\n\n⚠️ **Overdue (1):**\n• Prepare for product roadmap review with Jordan\n  Due: Today at 2:00 PM (meeting already started)\n  Priority: HIGH\n\n🔴 **Due Today (2):**\n• Review and approve Q1 board deck\n  Due: Today at 5:00 PM\n  Priority: HIGH - From Robert Sterling\n\n• Sign equity grant paperwork for new engineering hires\n  Due: End of day\n  Priority: HIGH - From Maria Santos\n\n📅 **Upcoming This Week (3):**\n• Review Q4 earnings call script (Due: Tomorrow)\n• Respond to Series B term sheet (Due: Thursday)\n• RSVP to TechConnect Conference (Due: Feb 15)\n\nYou have 3 high-priority items that need attention today. Would you like me to help you prioritize or break down any of these tasks?",
      richContent: {
        type: 'task-card',
        data: {
          tasks: 'mockData.tasks',
          stats: 'mockData.stats',
        },
      },
    },
    {
      userTrigger: 'help me prioritize',
      assistantResponse:
        "Based on urgency and impact, here's my recommended order:\n\n**1. Board deck review (Next 2 hours)**\n   - Robert Sterling needs this by 5 PM today\n   - Critical for tomorrow's board meeting\n   - Est. time: 45-60 minutes\n   - Action: Review M&A and digital transformation sections\n\n**2. Equity grant approvals (Before EOD)**\n   - New hires start Monday - can't delay\n   - Est. time: 15-20 minutes\n   - Action: Review and sign paperwork from Maria\n\n**3. Product roadmap prep (Now if possible)**\n   - Meeting already in progress, but still valuable\n   - Est. time: 30 minutes\n   - Action: Quick review of ML pipeline docs, send notes to Jordan\n\n**Can defer to tomorrow:**\n- Q4 earnings script review (call isn't until Thursday)\n- Series B term sheet (meeting scheduled for 3:30 PM today anyway)\n\nWould you like me to block focus time on your calendar for the board deck review?",
    },
    {
      userTrigger: 'break down the board deck task',
      assistantResponse:
        "I'll break down the board deck review into manageable steps:\n\n**Task: Review and Approve Q1 Board Deck**\n\n**Subtasks:**\n1. **Review M&A Pipeline Section (20 min)**\n   - Check current deal status updates\n   - Verify valuation assumptions\n   - Add competitive landscape context (Robert's request)\n   - Note any risks or concerns\n\n2. **Review Digital Transformation Metrics (20 min)**\n   - Confirm cloud migration progress (currently 73%)\n   - Validate customer adoption numbers (40% QoQ increase)\n   - Review cost savings realized ($12M annually)\n   - Ensure metrics align with Q4 earnings data\n\n3. **Overall Deck Review (15 min)**\n   - Check narrative flow and key messages\n   - Verify all financial data is current\n   - Note any questions for Robert\n\n4. **Send Feedback to Robert (5 min)**\n   - Email summary of comments\n   - Confirm alignment or schedule quick call\n\n**Total estimated time:** 60 minutes\n**Recommended start:** Now (3:45 PM) to finish by 5:00 PM deadline\n\nShould I set a focus timer and block your calendar?",
      richContent: {
        type: 'action-buttons',
        data: {
          actions: ['Start focus timer', 'Open board deck', 'Schedule review time'],
        },
      },
    },
  ],
};
