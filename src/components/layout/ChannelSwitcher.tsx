import { MessageSquare, Phone, Mail, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Channel } from '@/types';

interface ChannelSwitcherProps {
  activeChannel: Channel;
  onChannelChange: (channel: Channel) => void;
}

const channels = [
  { id: 'chat' as const, label: 'Chat', icon: MessageSquare },
  { id: 'whatsapp' as const, label: 'WhatsApp', icon: Phone },
  { id: 'email' as const, label: 'Email', icon: Mail },
  { id: 'voice' as const, label: 'Voice', icon: Mic },
];

export function ChannelSwitcher({
  activeChannel,
  onChannelChange,
}: ChannelSwitcherProps) {
  return (
    <div className="flex gap-2">
      {channels.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChannelChange(id)}
          className={cn(
            'flex-1 flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            activeChannel === id
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground'
          )}
          aria-label={label}
        >
          <Icon className="w-5 h-5" />
          <span className="text-xs">{label}</span>
        </button>
      ))}
    </div>
  );
}
