
import { supabase } from '../../lib/supabase';

export interface Table {
  id: string;
  name: string;
  type: 'round' | 'rect';
  seats: Array<{ id: string; guestId?: string; guestName?: string }>;
  x: number;
  y: number;
}

export const SeatingService = {
  subscribe: (eventId: string, onUpdate: (tables: Table[]) => void) => {
    const channel = supabase.channel(`seating_sync:${eventId}`)
      .on('broadcast', { event: 'tables_updated' }, ({ payload }: any) => {
        onUpdate(payload.tables);
      })
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'shoots', 
        filter: `id=eq.${eventId}` 
      }, (payload: any) => {
        if (payload.new.brief_data?.seatingChart?.tables) {
          onUpdate(payload.new.brief_data.seatingChart.tables);
        }
      })
      .subscribe();
      
    return channel;
  },

  broadcastUpdate: async (eventId: string, tables: Table[]) => {
    // Broadcaster for immediate UI feedback across clients without waiting for DB roundtrip
    await supabase.channel(`seating_sync:${eventId}`).send({
      type: 'broadcast',
      event: 'tables_updated',
      payload: { tables }
    });
  }
};
