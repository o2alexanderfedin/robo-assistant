import { ReactNode } from 'react';

interface RightPanelProps {
  children?: ReactNode;
}

export function RightPanel({ children }: RightPanelProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header area - for conversation title/context */}
      <div className="border-b border-border p-4">
        <h2 className="text-lg font-semibold">Conversation</h2>
      </div>

      {/* Main content area - where chat will go */}
      <div className="flex-1 flex items-center justify-center bg-muted/20">
        {children || (
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">Select a conversation</p>
            <p className="text-sm text-muted-foreground">Choose from the list to start chatting</p>
          </div>
        )}
      </div>

      {/* Footer area - where input will go */}
      <div className="border-t border-border p-4">
        <div className="h-12 bg-muted/30 rounded-lg flex items-center px-4 text-sm text-muted-foreground">
          Message input will appear here...
        </div>
      </div>
    </div>
  );
}
