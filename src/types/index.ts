export type Channel = 'chat' | 'whatsapp' | 'email' | 'voice';

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
  channel: Channel;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
