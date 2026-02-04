import { MessageSquarePlus, Calendar, ListTodo } from 'lucide-react';

const actions = [
  { id: 'new-message', label: 'New Message', icon: MessageSquarePlus },
  { id: 'schedule', label: 'Schedule Meeting', icon: Calendar },
  { id: 'task', label: 'Create Task', icon: ListTodo },
];

export function QuickActions() {
  return (
    <div className="space-y-2">
      {actions.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground text-foreground"
          onClick={() => {
            // Placeholder - will be functional later
          }}
        >
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
