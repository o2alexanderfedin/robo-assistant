import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { ChatMessage } from '../types';

const bubbleVariants = cva(
  'max-w-[70%] rounded-2xl px-4 py-3 shadow-sm break-words',
  {
    variants: {
      role: {
        user: 'bg-primary text-primary-foreground ml-auto',
        assistant: 'bg-muted text-muted-foreground mr-auto',
      },
    },
    defaultVariants: {
      role: 'assistant',
    },
  }
);

interface ChatBubbleProps extends VariantProps<typeof bubbleVariants> {
  message: ChatMessage;
  className?: string;
}

export function ChatBubble({ message, className }: ChatBubbleProps) {
  return (
    <div className={cn('flex flex-col gap-1', message.role === 'user' ? 'items-end' : 'items-start')}>
      <div className={cn(bubbleVariants({ role: message.role }), className)}>
        <p className="text-sm leading-relaxed">{message.content}</p>
      </div>
      <time className="text-xs text-muted-foreground px-1">
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </time>
    </div>
  );
}
