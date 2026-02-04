import { cn } from '@/lib/utils';

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 mr-auto">
      <div className="bg-muted rounded-2xl px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground mr-2">Assistant is typing</span>
          <div className="flex gap-1">
            <div
              className={cn(
                'w-2 h-2 bg-muted-foreground/60 rounded-full',
                'animate-bounce [animation-delay:-0.3s]'
              )}
            />
            <div
              className={cn(
                'w-2 h-2 bg-muted-foreground/60 rounded-full',
                'animate-bounce [animation-delay:-0.15s]'
              )}
            />
            <div className={cn('w-2 h-2 bg-muted-foreground/60 rounded-full', 'animate-bounce')} />
          </div>
        </div>
      </div>
    </div>
  );
}
