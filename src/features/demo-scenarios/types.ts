export interface Scenario {
  id: string;
  name: string;
  triggerPatterns: string[]; // Keywords/phrases that trigger this scenario
  description: string;
}

export interface ScenarioStep {
  userTrigger: string; // What user might say
  assistantResponse: string; // Pre-scripted response
  richContent?: {
    type: 'email-preview' | 'calendar-event' | 'task-card' | 'action-buttons';
    data: unknown;
  };
}

export interface ScenarioData<T = unknown> extends Scenario {
  mockData: T;
  steps: ScenarioStep[];
}
