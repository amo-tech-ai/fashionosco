
import { useState, useCallback } from 'react';
import { useToast } from '../components/ToastProvider';
import { processSystemIntent } from '../services/ai/orchestrator';

export const useCopilotStream = (brandContext: any) => {
  const [messages, setMessages] = useState<any[]>([
    { id: '1', role: 'assistant', content: "Strategist online. Your pipeline is active. How shall we optimize your production today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { addToast } = useToast();

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMessageId = Date.now().toString();
    setMessages(prev => [...prev, { id: userMessageId, role: 'user', content: text }]);
    setIsTyping(true);

    try {
      const result = await processSystemIntent(text, {
        campaignTitle: brandContext?.brandName || "Active Campaign",
        brandDNA: brandContext?.auditResult?.brand_profile
      });

      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: result.text || "Insight processed. Updating production logic." 
      }]);

      if (result.calls) {
        result.calls.forEach((call: any) => {
          addToast(`AI Executing: ${call.name}`, "info");
        });
      }
    } catch (error) {
      addToast("Connection to reasoning engine lost.", "error");
    } finally {
      setIsTyping(false);
    }
  }, [brandContext, isTyping, addToast]);

  return {
    messages,
    isTyping,
    sendMessage
  };
};
