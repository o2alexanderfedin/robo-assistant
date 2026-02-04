import { forwardRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatBubble } from './ChatBubble';
import { TypingIndicator } from './TypingIndicator';
import type { ChatMessage } from '../types';

interface MessageListProps {
  messages: ChatMessage[];
  isTyping?: boolean;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
  anchorRef?: React.RefObject<HTMLDivElement | null>;
}

export const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
  ({ messages, isTyping = false, scrollRef, anchorRef }, ref) => {
    return (
      <ScrollArea className="flex-1 px-4" ref={scrollRef}>
        <div className="flex flex-col gap-4 py-4" ref={ref}>
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              Start a conversation by typing a message
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}
              {isTyping && <TypingIndicator />}
            </>
          )}
          {/* Invisible anchor for auto-scroll */}
          <div ref={anchorRef} />
        </div>
      </ScrollArea>
    );
  }
);

MessageList.displayName = 'MessageList';
