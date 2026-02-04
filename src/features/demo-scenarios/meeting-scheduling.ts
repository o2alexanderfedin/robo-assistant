import type { ScenarioData } from './types';

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  attendees: string[];
  location: string;
  type: string;
  status: 'confirmed' | 'tentative' | 'cancelled';
}

interface TimeSlot {
  start: Date;
  end: Date;
  available: boolean;
  reason?: string;
}

interface MeetingSchedulingMockData {
  upcomingMeetings: CalendarEvent[];
  suggestedSlots: TimeSlot[];
  conflicts: Array<{
    requestedTime: Date;
    conflictingEvent: string;
  }>;
}

export const meetingSchedulingScenario: ScenarioData<MeetingSchedulingMockData> = {
  id: 'meeting-scheduling',
  name: 'Meeting Scheduling',
  triggerPatterns: ['meeting', 'schedule', 'calendar', 'book', 'appointment'],
  description: 'Smart calendar management and meeting coordination',
  mockData: {
    upcomingMeetings: [
      {
        id: 'mtg-001',
        title: 'Executive Team Weekly Sync',
        start: new Date('2026-02-04T10:00:00'),
        end: new Date('2026-02-04T11:00:00'),
        attendees: ['Michael Chen', 'Amanda Foster', 'Patricia Moore', 'James Wilson'],
        location: 'Boardroom A / Zoom',
        type: 'Team Sync',
        status: 'confirmed',
      },
      {
        id: 'mtg-002',
        title: '1:1 with Jordan Lee - Product Roadmap',
        start: new Date('2026-02-04T14:00:00'),
        end: new Date('2026-02-04T15:00:00'),
        attendees: ['Jordan Lee'],
        location: 'Virtual - Google Meet',
        type: '1:1 Meeting',
        status: 'confirmed',
      },
      {
        id: 'mtg-003',
        title: 'Board Meeting - Q1 Review',
        start: new Date('2026-02-05T09:00:00'),
        end: new Date('2026-02-05T12:00:00'),
        attendees: ['Robert Sterling', 'Sarah Martinez', 'David Kim', 'Board Members'],
        location: 'Headquarters - Executive Boardroom',
        type: 'Board Meeting',
        status: 'confirmed',
      },
      {
        id: 'mtg-004',
        title: 'Q4 Earnings Call Prep',
        start: new Date('2026-02-06T13:00:00'),
        end: new Date('2026-02-06T14:30:00'),
        attendees: ['Michael Chen', 'IR Team', 'Legal'],
        location: 'Conference Room 3',
        type: 'Strategy Session',
        status: 'confirmed',
      },
    ],
    suggestedSlots: [
      {
        start: new Date('2026-02-04T15:30:00'),
        end: new Date('2026-02-04T16:30:00'),
        available: true,
      },
      {
        start: new Date('2026-02-05T14:00:00'),
        end: new Date('2026-02-05T15:00:00'),
        available: true,
      },
      {
        start: new Date('2026-02-06T10:00:00'),
        end: new Date('2026-02-06T11:00:00'),
        available: true,
      },
    ],
    conflicts: [
      {
        requestedTime: new Date('2026-02-04T14:00:00'),
        conflictingEvent: '1:1 with Jordan Lee - Product Roadmap',
      },
    ],
  },
  steps: [
    {
      userTrigger: 'show my calendar',
      assistantResponse:
        "Here's your calendar for the next few days:\n\n**Today (Tuesday, Feb 4):**\n• 10:00 AM - 11:00 AM: Executive Team Weekly Sync (Boardroom A)\n• 2:00 PM - 3:00 PM: 1:1 with Jordan Lee - Product Roadmap (Virtual)\n\n**Tomorrow (Wednesday, Feb 5):**\n• 9:00 AM - 12:00 PM: Board Meeting - Q1 Review (HQ Executive Boardroom)\n  ⚠️ This is your most important meeting this week\n\n**Thursday (Feb 6):**\n• 1:00 PM - 2:30 PM: Q4 Earnings Call Prep (Conference Room 3)\n\nYou have some availability this afternoon after 3:30 PM and Thursday morning. Would you like me to help schedule a new meeting?",
      richContent: {
        type: 'calendar-event',
        data: {
          events: 'mockData.upcomingMeetings',
        },
      },
    },
    {
      userTrigger: 'schedule a meeting with Sarah Martinez',
      assistantResponse:
        "I'll help you schedule a meeting with Sarah Martinez. Let me check for conflicts and optimal times.\n\nBased on your calendar, I have a few concerns:\n\n**Conflict detected:** If you wanted to meet this week before the Board Meeting, your schedule is quite tight.\n\n**Suggested time slots:**\n1. **Today (Feb 4) at 3:30 PM** - 1 hour available\n   - After your 1:1 with Jordan\n   - Gives you prep time before tomorrow's board meeting\n   \n2. **Thursday (Feb 6) at 10:00 AM** - 1 hour available\n   - Morning slot, good for strategic discussions\n   - Before earnings call prep\n\n3. **Friday (Feb 7) at 2:00 PM** - Flexible\n   - End of week follow-up\n   - More relaxed timing\n\nGiven Sarah's email about the Series B term sheet, I'd recommend **today at 3:30 PM** to discuss before the board meeting. Should I send her a calendar invite?",
    },
    {
      userTrigger: 'yes, send the invite for today',
      assistantResponse:
        "Perfect! I'll send a calendar invite to Sarah Martinez for:\n\n**Meeting Details:**\n• Date: Tuesday, February 4, 2026\n• Time: 3:30 PM - 4:30 PM (1 hour)\n• Title: \"Series B Term Sheet Discussion\"\n• Location: Virtual - Zoom link included\n• Attendees: Sarah Martinez (smartinez@horizonventures.com)\n\n**Proposed agenda:**\n1. Review Series B term sheet ($35M at $180M pre-money)\n2. Key terms discussion\n3. Timeline and next steps\n4. Board communication strategy\n\nI've also added a note that you've reviewed her email and are ready to discuss specifics. The invite has been sent!\n\nWould you like me to prepare a brief with key talking points for this meeting?",
      richContent: {
        type: 'action-buttons',
        data: {
          actions: ['Prepare talking points', 'View term sheet', 'Check investor updates'],
        },
      },
    },
  ],
};
