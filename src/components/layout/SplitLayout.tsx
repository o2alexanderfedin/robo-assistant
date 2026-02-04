import { LeftPanel } from './LeftPanel';
import { ChatContainer } from '@/features/chat';

export function SplitLayout() {
  return (
    <div className="flex h-screen bg-background">
      {/* Left Panel - Fixed width navigation */}
      <div className="w-80 border-r border-border flex-shrink-0">
        <LeftPanel />
      </div>

      {/* Right Panel - Fills remaining space */}
      <div className="flex-1 overflow-hidden">
        <ChatContainer />
      </div>
    </div>
  );
}
