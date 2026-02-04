import { Bot } from 'lucide-react';

export function AssistantStatus() {
  return (
    <div className="flex items-start gap-3">
      {/* Assistant Avatar */}
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Bot className="w-6 h-6 text-primary" />
      </div>

      {/* Status and Capabilities */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-sm font-medium">AI Assistant</h4>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Online
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Ready to help with emails, meetings, and tasks
        </p>
      </div>
    </div>
  );
}
