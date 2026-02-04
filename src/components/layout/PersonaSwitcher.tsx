import { User, Building2, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { PERSONAS } from '@/features/personas/data';
import type { Persona } from '@/features/personas/types';

interface PersonaSwitcherProps {
  activePersona: Persona;
  onPersonaChange: (persona: Persona) => void;
}

export function PersonaSwitcher({ activePersona, onPersonaChange }: PersonaSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Current Persona Display */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors text-left"
      >
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <User className="w-6 h-6 text-primary" />
        </div>

        {/* Persona Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-medium truncate">{activePersona.name}</h4>
            <ChevronDown
              className={cn(
                'w-4 h-4 text-muted-foreground transition-transform flex-shrink-0',
                isOpen && 'rotate-180'
              )}
            />
          </div>
          <p className="text-xs text-muted-foreground truncate">{activePersona.title}</p>
          <div className="flex items-center gap-1 mt-1">
            <Building2 className="w-3 h-3 text-muted-foreground" />
            <p className="text-xs text-muted-foreground truncate">{activePersona.company}</p>
          </div>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-50 overflow-hidden">
          {PERSONAS.map((persona) => (
            <button
              key={persona.id}
              onClick={() => {
                onPersonaChange(persona);
                setIsOpen(false);
              }}
              className={cn(
                'w-full flex items-start gap-3 p-3 hover:bg-accent transition-colors text-left',
                persona.id === activePersona.id && 'bg-accent/50'
              )}
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-primary" />
              </div>

              {/* Persona Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate">{persona.name}</h4>
                <p className="text-xs text-muted-foreground truncate">{persona.title}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Building2 className="w-3 h-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground truncate">{persona.company}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Optional: Persona Context Panel (collapsed by default) */}
      <div className="mt-2 p-2 rounded-md bg-muted/50">
        <p className="text-xs text-muted-foreground leading-relaxed">{activePersona.context}</p>
      </div>
    </div>
  );
}
