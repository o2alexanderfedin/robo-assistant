export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  // Rich content support for Phase 2+
  richContent?: {
    type: 'email-preview' | 'calendar-event' | 'task-card' | 'action-buttons';
    data: unknown;
  };
}
