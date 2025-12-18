
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { SalesActivityEvent } from '../types/sales';
import { useToast } from '../components/ToastProvider';

export const useSalesRealtime = () => {
  const [events, setEvents] = useState<SalesActivityEvent[]>([]);
  const { addToast } = useToast();

  const handleNewEvent = useCallback((payload: any) => {
    const newEvent: SalesActivityEvent = {
      id: payload.new.id,
      dealId: payload.new.id,
      clientName: payload.new.store_name || 'Retailer',
      type: payload.new.status === 'Approved' ? 'contract_signed' : 'proposal_viewed',
      title: 'New Wholesale Signal',
      description: `${payload.new.store_name} from ${payload.new.location} submitted an application. AI Risk Score: ${payload.new.risk_score}`,
      timestamp: 'Just now',
      isHighPriority: payload.new.risk_score < 30
    };

    setEvents(prev => [newEvent, ...prev].slice(0, 10)); // Keep last 10
    
    if (newEvent.isHighPriority) {
        addToast(`Priority Sales Alert: ${newEvent.clientName}`, "success");
    }
  }, [addToast]);

  useEffect(() => {
    // 1. Initial Load of recent activity
    const fetchRecent = async () => {
       const { data } = await supabase
        .from('wholesale_applications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
        
       if (data) {
          const mapped = data.map(d => ({
            id: d.id,
            dealId: d.id,
            clientName: d.store_name,
            type: 'proposal_viewed' as any,
            title: 'Retailer Activity',
            description: `${d.store_name} verified as ${d.aesthetic_tier}.`,
            timestamp: new Date(d.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isHighPriority: d.risk_score < 30
          }));
          setEvents(mapped);
       }
    };
    
    fetchRecent();

    // 2. Real-time Subscription
    const channel = supabase
      .channel('sales-momentum')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'wholesale_applications' },
        handleNewEvent
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'wholesale_applications' },
        (payload) => {
            if (payload.new.status === 'Approved') {
                addToast(`Order Confirmed: ${payload.new.store_name}`, "success");
            }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [handleNewEvent, addToast]);

  return { events };
};
