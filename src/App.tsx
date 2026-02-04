import { useState } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { PERSONAS } from '@/features/personas/data';
import type { Persona } from '@/features/personas/types';

function App() {
  const [activePersona, setActivePersona] = useState<Persona>(PERSONAS[0]);

  return <SplitLayout activePersona={activePersona} onPersonaChange={setActivePersona} />;
}

export default App;
