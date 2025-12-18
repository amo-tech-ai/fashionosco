
import { useEffect, useRef } from 'react';
import { useAssistant } from '../contexts/AssistantContext';
import { useActiveCampaign } from '../contexts/ActiveCampaignContext';

export const useAutonomousAssistant = (stats: any, remainingShots: number) => {
  const { sendMessage } = useAssistant();
  const { activeCampaign } = useActiveCampaign();
  const lastAlertRef = useRef<string | null>(null);

  useEffect(() => {
    if (!stats || !activeCampaign) return;

    // Logic: Proactive Alerting based on deterministic production telemetry
    if (stats.health === 'critical' && lastAlertRef.current !== 'critical') {
      lastAlertRef.current = 'critical';
      sendMessage(`CRITICAL: Production velocity has hit a terminal lag (+${stats.latency}m). I have prepared a mitigation strategy to protect the Hero looks before golden hour. Should we re-order the remaining ${remainingShots} shots to focus on primary campaign assets?`);
    } else if (stats.health === 'warning' && lastAlertRef.current !== 'warning') {
      lastAlertRef.current = 'warning';
      sendMessage(`ADVISORY: We are experiencing schedule drift (+${stats.latency}m). I suggest shortening talent turnover or consolidating the next two lighting setups to recover buffer.`);
    } else if (stats.health === 'optimal' && lastAlertRef.current !== 'optimal' && lastAlertRef.current !== null) {
      lastAlertRef.current = 'optimal';
      sendMessage(`STATUS: Production velocity is back to peak flow. We are currently on schedule for an on-time wrap.`);
    }

  }, [stats.health, stats.latency, activeCampaign?.id, remainingShots, sendMessage]);

  return null;
};
