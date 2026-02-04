export interface Persona {
  id: string;
  name: string;
  title: string;
  company: string;
  context: string;
  tone: 'professional' | 'casual' | 'urgent';
  priorities: string[];
  mockContacts: Contact[];
}

export interface Contact {
  name: string;
  email: string;
  role: string;
  company: string;
  relationship: string; // e.g., "investor", "board member", "team lead"
}
