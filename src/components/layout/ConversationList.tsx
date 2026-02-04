import type { Conversation } from '@/types';
import { cn } from '@/lib/utils';

interface ConversationListProps {
  conversations: Conversation[];
}

// Mock data for initial display
const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Email Triage Discussion',
    lastMessage: 'I can help prioritize those investor emails...',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    unread: true,
    channel: 'chat',
  },
  {
    id: '2',
    title: 'Meeting Scheduling',
    lastMessage: 'Board meeting scheduled for Thursday 2 PM',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    unread: false,
    channel: 'chat',
  },
  {
    id: '3',
    title: 'Daily Briefing',
    lastMessage: "Here's your summary for today...",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    unread: false,
    channel: 'chat',
  },
];

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 1000 / 60);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
  return date.toLocaleDateString();
}

export function ConversationList({ conversations }: ConversationListProps) {
  // Use mock data if no conversations provided
  const displayConversations = conversations.length > 0 ? conversations : mockConversations;

  return (
    <div className="overflow-y-auto h-full">
      {displayConversations.length === 0 ? (
        <div className="flex items-center justify-center h-full p-4">
          <p className="text-sm text-muted-foreground text-center">No conversations yet</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {displayConversations.map((conv) => (
            <button
              key={conv.id}
              className="w-full p-4 text-left hover:bg-accent transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className={cn('text-sm font-medium truncate', conv.unread && 'font-semibold')}>
                  {conv.title}
                </h3>
                <time className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatTimestamp(conv.timestamp)}
                </time>
              </div>
              <div className="flex items-center gap-2">
                {conv.unread && <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
