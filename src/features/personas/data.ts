import type { Persona } from './types';

export const startupFounder: Persona = {
  id: 'startup-founder',
  name: 'Alex Chen',
  title: 'Co-Founder & CEO',
  company: 'NexGen AI',
  context:
    'Fast-paced Series A startup in AI/ML infrastructure. Recently closed $15M Series A led by Horizon Ventures. Growing team from 12 to 40 people. Focused on product-market fit and scaling revenue.',
  tone: 'casual',
  priorities: [
    'Investor relations and board communication',
    'Product roadmap and technical decisions',
    'Team scaling and hiring',
    'Strategic partnerships',
  ],
  mockContacts: [
    {
      name: 'Sarah Martinez',
      email: 'smartinez@horizonventures.com',
      role: 'Partner',
      company: 'Horizon Ventures',
      relationship: 'lead investor',
    },
    {
      name: 'David Kim',
      email: 'david@techstartadvisors.com',
      role: 'Startup Advisor',
      company: 'TechStart Advisors',
      relationship: 'advisor',
    },
    {
      name: 'Jordan Lee',
      email: 'jordan@nexgenai.com',
      role: 'Co-Founder & CTO',
      company: 'NexGen AI',
      relationship: 'co-founder',
    },
    {
      name: 'Maria Santos',
      email: 'maria@nexgenai.com',
      role: 'Head of People',
      company: 'NexGen AI',
      relationship: 'team lead',
    },
  ],
};

export const executiveCEO: Persona = {
  id: 'executive-ceo',
  name: 'Jennifer Walsh',
  title: 'Chief Executive Officer',
  company: 'GlobalTech Industries',
  context:
    'Fortune 500 technology conglomerate with $8.2B annual revenue. Public company traded on NYSE. Leading digital transformation initiative across three business units. Board meetings monthly, quarterly earnings calls, active M&A pipeline.',
  tone: 'professional',
  priorities: [
    'Board relations and corporate governance',
    'Quarterly earnings and investor relations',
    'M&A strategy and execution',
    'Executive team alignment',
  ],
  mockContacts: [
    {
      name: 'Robert Sterling',
      email: 'rsterling@sterlingpartners.com',
      role: 'Board Chair',
      company: 'Sterling Partners',
      relationship: 'board chair',
    },
    {
      name: 'Michael Chen',
      email: 'mchen@globaltechindustries.com',
      role: 'Chief Financial Officer',
      company: 'GlobalTech Industries',
      relationship: 'executive team',
    },
    {
      name: 'Amanda Foster',
      email: 'afoster@whiteoaklaw.com',
      role: 'General Counsel',
      company: 'White Oak Law',
      relationship: 'legal counsel',
    },
    {
      name: 'Patricia Moore',
      email: 'pmoore@globaltechindustries.com',
      role: 'Executive Assistant',
      company: 'GlobalTech Industries',
      relationship: 'executive assistant',
    },
  ],
};

export const PERSONAS = [startupFounder, executiveCEO];

export default PERSONAS;
