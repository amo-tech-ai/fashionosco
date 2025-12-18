
import { useState, useEffect, useMemo, useCallback } from 'react';
import { ProductSample, CallSheetBlock } from '../types/production';

export const useProductionState = (initialSamples: ProductSample[], initialCallSheet: CallSheetBlock[]) => {
  const [samples, setSamples] = useState(initialSamples);
  const [callSheet, setCallSheet] = useState(initialCallSheet);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Operational Intelligence: Velocity & Buffer Math
  const stats = useMemo(() => {
    const shootingBlocks = callSheet.filter(i => i.category === 'runway' || i.category === 'media');
    const totalShootingBlocks = shootingBlocks.length;
    const completedBlocks = callSheet.filter(i => i.status === 'confirmed' && (i.category === 'runway' || i.category === 'media')).length;
    const progress = totalShootingBlocks > 0 ? (completedBlocks / totalShootingBlocks) * 100 : 0;
    
    // Temporal Drift Logic
    const startTime = new Date();
    startTime.setHours(9, 0, 0); // Standard 09:00 Call
    
    const elapsedMinutes = Math.floor((currentTime.getTime() - startTime.getTime()) / 60000);
    const expectedMinutesAtThisStage = completedBlocks * 45; // 45m benchmark per look
    const latency = Math.max(0, elapsedMinutes - expectedMinutesAtThisStage);

    // Sunlight Expiry (Golden Hour) Logic
    const wrapTime = new Date();
    wrapTime.setHours(18, 0, 0); // 18:00 Wrap
    const minutesToGoldenHour = Math.max(0, Math.floor((wrapTime.getTime() - currentTime.getTime()) / 60000));
    
    const remainingLooks = totalShootingBlocks - completedBlocks;
    const requiredMinutesPerLook = remainingLooks > 0 ? minutesToGoldenHour / remainingLooks : 45;
    
    // Recovery Trajectory Score - Explicit Casting for Type Safety
    let driftRisk: 'optimal' | 'warning' | 'critical' = 'optimal';
    if (latency > 30) driftRisk = 'critical';
    else if (latency > 15) driftRisk = 'warning';
    
    const recoveryPossible = requiredMinutesPerLook >= 25; 

    return { 
      progress, 
      latency, 
      isBehind: latency > 15,
      minutesToGoldenHour,
      requiredMinutesPerLook,
      health: driftRisk,
      recoveryPossible
    };
  }, [callSheet, currentTime]);

  const updateSampleStatus = useCallback((id: string, status: ProductSample['status']) => {
    setSamples(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  }, []);

  const confirmTimelineItem = useCallback((id: string) => {
    setCallSheet(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'confirmed' } : item
    ));
  }, []);

  return {
    samples,
    callSheet,
    currentTime,
    stats,
    updateSampleStatus,
    confirmTimelineItem,
    setCallSheet
  };
};
