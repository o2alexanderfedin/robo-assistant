import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { useChatSimulation } from '../hooks/useChatSimulation';
import { useAutoScroll } from '../hooks/useAutoScroll';

export function ChatContainer() {
  const { messages, isTyping, sendMessage } = useChatSimulation();
  const { scrollRef, anchorRef } = useAutoScroll(messages);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b px-4 py-3 bg-background">
        <h2 className="text-lg font-semibold">Chat Assistant</h2>
        <p className="text-xs text-muted-foreground">
          AI-powered business communication assistant
        </p>
      </div>

      {/* Message List */}
      <MessageList
        messages={messages}
        isTyping={isTyping}
        scrollRef={scrollRef}
        anchorRef={anchorRef}
      />

      {/* Input */}
      <ChatInput onSend={sendMessage} disabled={isTyping} />
    </div>
  );
}
