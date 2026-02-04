import { LeftPanel } from './LeftPanel';
import { ChatContainer } from '@/features/chat';
import type { Persona } from '@/features/personas/types';

interface SplitLayoutProps {
  activePersona: Persona;
  onPersonaChange: (persona: Persona) => void;
}

export function SplitLayout({ activePersona, onPersonaChange }: SplitLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      {/* Left Panel - Fixed width navigation */}
      <div className="w-80 border-r border-border flex-shrink-0">
        <LeftPanel activePersona={activePersona} onPersonaChange={onPersonaChange} />
      </div>

      {/* Right Panel - Fills remaining space */}
      <div className="flex-1 overflow-hidden">
        <ChatContainer persona={activePersona} />
      </div>
    </div>
  );
}
