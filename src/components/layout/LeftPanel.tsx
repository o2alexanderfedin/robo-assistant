import { ChannelSwitcher } from './ChannelSwitcher';
import { ConversationList } from './ConversationList';
import { QuickActions } from './QuickActions';
import { AssistantStatus } from './AssistantStatus';
import { PersonaSwitcher } from './PersonaSwitcher';
import type { Persona } from '@/features/personas/types';

interface LeftPanelProps {
  activePersona: Persona;
  onPersonaChange: (persona: Persona) => void;
}

export function LeftPanel({ activePersona, onPersonaChange }: LeftPanelProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Channel Switcher - Top */}
      <div className="p-4 border-b border-border">
        <ChannelSwitcher activeChannel="chat" onChannelChange={() => {}} />
      </div>

      {/* Persona Switcher - Demo context */}
      <div className="p-4 border-b border-border bg-muted/30">
        <PersonaSwitcher activePersona={activePersona} onPersonaChange={onPersonaChange} />
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
