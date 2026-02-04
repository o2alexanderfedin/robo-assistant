import type { Persona } from '../personas/types';
import type { Message } from '../../types';
import type { Scenario, ScenarioData } from './types';
import { emailTriageScenario } from './email-triage';
import { meetingSchedulingScenario } from './meeting-scheduling';
import { taskExtractionScenario } from './task-extraction';
import { dailyBriefingScenario } from './daily-briefing';

export interface ScenarioResponse {
  message: string;
  richContent?: {
    type: 'email-preview' | 'calendar-event' | 'task-card' | 'action-buttons';
    data: unknown;
  };
  suggestedActions?: string[];
  scenarioId?: string;
  stepIndex?: number;
}

// All available scenarios
const scenarios: ScenarioData[] = [
  emailTriageScenario,
  meetingSchedulingScenario,
  taskExtractionScenario,
  dailyBriefingScenario,
];

/**
 * Match user message to a scenario based on trigger patterns
 */
export function matchScenario(message: string): Scenario | null {
  const normalized = message.toLowerCase().trim();

  for (const scenario of scenarios) {
    for (const pattern of scenario.triggerPatterns) {
      if (normalized.includes(pattern.toLowerCase())) {
        return scenario;
      }
    }
  }

  return null;
}

/**
 * Get all available scenarios
 */
export function getAvailableScenarios(): Scenario[] {
  return scenarios.map((s) => ({
    id: s.id,
    name: s.name,
    triggerPatterns: s.triggerPatterns,
    description: s.description,
  }));
}

/**
 * Get scenario progress based on conversation history
 */
export function getScenarioProgress(scenarioId: string, history: Message[]): number {
  const scenario = scenarios.find((s) => s.id === scenarioId);
  if (!scenario) return 0;

  // Count how many times user has engaged with this scenario
  let stepCount = 0;
  for (const msg of history) {
    if (msg.role === 'user') {
      const matched = matchScenario(msg.content);
      if (matched?.id === scenarioId) {
        stepCount++;
      }
    }
  }

  return Math.min(stepCount, scenario.steps.length);
}

/**
 * Generate response based on user message, persona, and conversation history
 */
export function getScenarioResponse(
  userMessage: string,
  persona: Persona,
  history: Message[] = []
): ScenarioResponse {
  const matched = matchScenario(userMessage);

  // If no scenario matched, provide gentle redirect
  if (!matched) {
    return {
      message: `I can help with that! Right now I'm best at managing your emails, scheduling meetings, organizing tasks, and providing daily briefings. Which would you like to explore?`,
      suggestedActions: [
        'Check my emails',
        'Show my calendar',
        'What are my tasks',
        'Give me a daily briefing',
      ],
    };
  }

  const scenario = scenarios.find((s) => s.id === matched.id);
  if (!scenario) {
    return {
      message: 'Something went wrong. Please try again.',
    };
  }

  // Determine which step we're on based on history
  const currentStep = getScenarioProgress(matched.id, history);
  const step = scenario.steps[currentStep] || scenario.steps[scenario.steps.length - 1];

  // Personalize response with persona name if it's the first interaction
  let response = step.assistantResponse;
  if (currentStep === 0 && history.length === 0) {
    // Add personalized greeting for first message
    const greeting = getPersonalizedGreeting(persona);
    response = `${greeting}\n\n${response}`;
  }

  return {
    message: response,
    richContent: step.richContent,
    suggestedActions: getSuggestedActions(matched.id, currentStep),
    scenarioId: matched.id,
    stepIndex: currentStep,
  };
}

/**
 * Get personalized greeting based on persona
 */
function getPersonalizedGreeting(persona: Persona): string {
  const hour = new Date().getHours();
  let timeGreeting = 'Good morning';
  if (hour >= 12 && hour < 17) {
    timeGreeting = 'Good afternoon';
  } else if (hour >= 17) {
    timeGreeting = 'Good evening';
  }

  const firstName = persona.name.split(' ')[0];
  return `${timeGreeting}, ${firstName}!`;
}

/**
 * Get suggested actions based on scenario and step
 */
function getSuggestedActions(scenarioId: string, stepIndex: number): string[] | undefined {
  // Provide contextual suggestions based on scenario
  const suggestions: Record<string, Record<number, string[]>> = {
    'email-triage': {
      0: ['Help me respond', 'Categorize emails', 'Show urgent only'],
      1: ['Send the response', 'Make changes', 'Show next email'],
      2: ['Pull up roadmap', 'Check calendar', 'What else needs attention'],
    },
    'meeting-scheduling': {
      0: ['Schedule a meeting', 'Find time for...', 'Check conflicts'],
      1: ['Send invite for today', 'Suggest other times', 'Add to calendar'],
      2: ['Prepare talking points', 'View related emails', 'Set reminder'],
    },
    'task-extraction': {
      0: ['Help me prioritize', 'Show overdue tasks', 'Break down tasks'],
      1: ['Block focus time', 'Defer to tomorrow', 'Mark as complete'],
      2: ['Start focus timer', 'Open related docs', 'Set reminders'],
    },
    'daily-briefing': {
      0: ['What should I focus on', 'Check emails', 'View full schedule'],
      1: ['Block focus time', 'Show me the deck', 'Prepare for meetings'],
      2: ['View term sheet', 'Prepare talking points', 'Check cap table'],
    },
  };

  return suggestions[scenarioId]?.[stepIndex];
}

/**
 * Get initial welcome message that orients the user
 */
export function getWelcomeMessage(persona: Persona): ScenarioResponse {
  const greeting = getPersonalizedGreeting(persona);

  let topItems: string[] = [];
  if (persona.id === 'startup-founder') {
    topItems = [
      '📧 2 urgent emails (Series B term sheet, product roadmap)',
      '📅 Meeting with investor Sarah Martinez scheduled',
      '✅ 3 high-priority tasks due today',
    ];
  } else if (persona.id === 'executive-ceo') {
    topItems = [
      '📧 Board meeting agenda review needed by 5 PM',
      '📅 Executive team sync at 10 AM, board meeting tomorrow',
      '✅ Q4 earnings call prep and deck review',
    ];
  }

  const message = `${greeting} Here's what needs your attention today:\n\n${topItems.join('\n')}\n\nHow can I help you get started?`;

  return {
    message,
    suggestedActions: [
      'Give me my daily briefing',
      'Check my emails',
      'Show my calendar',
      'What are my tasks',
    ],
  };
}

// Export scenarios for potential direct access
export {
  emailTriageScenario,
  meetingSchedulingScenario,
  taskExtractionScenario,
  dailyBriefingScenario,
};
