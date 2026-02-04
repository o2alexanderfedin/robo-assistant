import { ChannelSwitcher } from './ChannelSwitcher';
import { ConversationList } from './ConversationList';
import { QuickActions } from './QuickActions';
import { AssistantStatus } from './AssistantStatus';

export function LeftPanel() {
  return (
    <div className="flex flex-col h-full">
      {/* Channel Switcher - Top */}
      <div className="p-4 border-b border-border">
        <ChannelSwitcher activeChannel="chat" onChannelChange={() => {}} />
      </div>

      {/* Conversation List - Scrollable middle section */}
      <div className="flex-1 overflow-hidden">
        <ConversationList conversations={[]} />
      </div>

      {/* Quick Actions - Above assistant status */}
      <div className="border-t border-border p-4">
        <QuickActions />
      </div>

      {/* Assistant Status - Bottom */}
      <div className="border-t border-border p-4">
        <AssistantStatus />
      </div>
    </div>
  );
}
