import { useState, useCallback } from 'react';
import type { ChatMessage } from '../types';

interface UseChatSimulationReturn {
  messages: ChatMessage[];
  isTyping: boolean;
  sendMessage: (content: string) => void;
}

// Simple keyword-based response mapping (will enhance in Plan 04)
function generateResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('email')) {
    return "I can help you manage your emails! I'll monitor your inbox, prioritize important messages, and draft responses. Would you like me to show you your unread emails?";
  }

  if (lowerMessage.includes('meeting') || lowerMessage.includes('schedule')) {
    return "I can assist with scheduling! I'll check your calendar availability, suggest meeting times, and send invitations. What meeting would you like to schedule?";
  }

  if (lowerMessage.includes('task') || lowerMessage.includes('todo')) {
    return "I can help manage your tasks! I'll track your to-do list, set reminders, and prioritize what needs attention. What task would you like to add?";
  }

  if (lowerMessage.includes('whatsapp') || lowerMessage.includes('chat')) {
    return "I can monitor your WhatsApp messages and handle routine conversations. I'll notify you about important messages and can respond to common inquiries.";
  }

  // Default response
  return `I understand you said: "${userMessage}". I'm ready to help with your emails, meetings, and tasks. What would you like assistance with?`;
}

export function useChatSimulation(): UseChatSimulationReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback((content: string) => {
    // Add user message immediately
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate assistant thinking and typing
    setIsTyping(true);

    // Random delay between 1-2 seconds for realistic typing
    const delay = 1000 + Math.random() * 1000;

    setTimeout(() => {
      setIsTyping(false);

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: generateResponse(content),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    }, delay);
  }, []);

  return { messages, isTyping, sendMessage };
}
