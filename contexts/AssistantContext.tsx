import React, { createContext, useContext, useState, useCallback } from 'react';
import { talkToConcierge, ConciergeAction } from '../services/ai/concierge';
import { useToast } from '../components/ToastProvider';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  actions?: ConciergeAction[];
}

interface AssistantContextType {
  isOpen: boolean;
  messages: Message[];
  isTyping: boolean;
  openAssistant: () => void;
  closeAssistant: () => void;
  sendMessage: (text: string) => Promise<void>;
}

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

export const AssistantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { addToast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'welcome', 
      role: 'assistant', 
      text: "Good afternoon. I'm your FashionOS Concierge. Your production suite is active. How can I facilitate your creative workflow today?",
      actions: [
        { type: 'navigate', label: "Initiate Shoot", payload: '/shoot-wizard' },
        { type: 'navigate', label: "Strategic Brand Audit", payload: '/create-profile' },
        { type: 'navigate', label: "Event Planning", payload: '/event-wizard' }
      ]
    }
  ]);

  const openAssistant = useCallback(() => setIsOpen(true), []);
  const closeAssistant = useCallback(() => setIsOpen(false), []);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await talkToConcierge(text, { 
        path: window.location.pathname 
      });
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: response.reply,
        actions: response.actions
      };
      
      setMessages(prev => [...prev, assistantMsg]);
    } catch (e) {
      addToast("The Concierge is currently unavailable.", "error");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AssistantContext.Provider value={{ 
      isOpen, 
      messages, 
      isTyping, 
      openAssistant, 
      closeAssistant, 
      sendMessage 
    }}>
      {children}
    </AssistantContext.Provider>
  );
};

export const useAssistant = () => {
  const context = useContext(AssistantContext);
  if (!context) throw new Error("useAssistant must be used within AssistantProvider");
  return context;
};