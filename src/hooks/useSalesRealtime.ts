import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { SalesActivityEvent } from '../types/sales';
import { useToast } from '../components/ToastProvider';

export const useSalesRealtime = () => {
  const [events, setEvents] = useState<SalesActivityEvent[]>([]);
  const { addToast } = useToast();

  useEffect(() => {
    // 1. Initial Load of recent activity
    const fetchRecent = async () => {
      // Logic would normally fetch from specific sales tables
      // For this implementation, we simulate the stream
    };
    fetchRecent();

    // 2. Real-time Subscription to Wholesale Apps & Orders
    const channel = supabase
      .channel('sales-intelligence')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'wholesale_applications' },
        (payload: any) => {
          const newEvent: SalesActivityEvent = {
            id: payload.new.id,
            dealId: payload.new.id,
            clientName: payload.new.store_name,
            type: 'proposal_viewed', // Initial status
            title: 'New Wholesale Inquiry',
            description: `Retailer from ${payload.new.location} just submitted a vetting request.`,
            timestamp: 'Just now',
            isHighPriority: payload.new.risk_score < 20
          };
          setEvents(prev => [newEvent, ...prev]);
          addToast(`Intelligence: New application from ${payload.new.store_name}`, "info");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [addToast]);

  return { events };
};