import { useState, useCallback, useEffect, useRef } from 'react';
import type { ChatMessage } from '../types';
import type { Persona } from '@/features/personas/types';
import { getScenarioResponse, getWelcomeMessage } from '@/features/demo-scenarios';

interface UseChatSimulationReturn {
  messages: ChatMessage[];
  isTyping: boolean;
  sendMessage: (content: string) => void;
}

/**
 * Calculate typing delay based on response length for realistic simulation
 */
function calculateTypingDelay(responseLength: number): number {
  if (responseLength < 50) {
    return 800;
  } else if (responseLength < 200) {
    return 1500;
  } else {
    return 2200;
  }
}

export function useChatSimulation(persona: Persona): UseChatSimulationReturn {
  const previousPersonaIdRef = useRef<string>(persona.id);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Show welcome message on mount or when persona changes
  useEffect(() => {
    // Only reset if persona actually changed
    if (previousPersonaIdRef.current === persona.id && messages.length > 0) {
      return;
    }

    previousPersonaIdRef.current = persona.id;

    // Brief delay before welcome message
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional reset on persona change
    setMessages([]);

    setIsTyping(true);

    const timer = setTimeout(() => {
      const welcomeResponse = getWelcomeMessage(persona);
      const welcomeMessage: ChatMessage = {
        id: `assistant-welcome-${Date.now()}`,
        role: 'assistant',
        content: welcomeResponse.message,
        timestamp: new Date(),
      };

      setMessages([welcomeMessage]);
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [persona, messages.length]);

  const sendMessage = useCallback(
    (content: string) => {
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

      // Get response from scenario system
      const scenarioResponse = getScenarioResponse(
        content,
        persona,
        messages.map((m) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          timestamp: m.timestamp,
        }))
      );

      // Calculate realistic typing delay based on response length
      const delay = calculateTypingDelay(scenarioResponse.message.length);

      setTimeout(() => {
        setIsTyping(false);

        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: scenarioResponse.message,
          timestamp: new Date(),
          richContent: scenarioResponse.richContent,
        };

        setMessages((prev) => [...prev, assistantMessage]);
      }, delay);
    },
    [messages, persona]
  );

  return { messages, isTyping, sendMessage };
}
