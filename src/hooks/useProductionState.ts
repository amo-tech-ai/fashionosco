
import { useState, useEffect, useMemo } from 'react';
import { ProductSample, CallSheetBlock, ProductionState } from '../types/production';

export const useProductionState = (initialSamples: ProductSample[], initialCallSheet: CallSheetBlock[]) => {
  const [samples, setSamples] = useState(initialSamples);
  const [callSheet, setCallSheet] = useState(initialCallSheet);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate Velocity: Progress vs. Time
  const stats = useMemo(() => {
    const totalItems = callSheet.filter(i => i.category === 'runway').length;
    const completedItems = callSheet.filter(i => i.status === 'confirmed' && i.category === 'runway').length;
    const progress = (completedItems / totalItems) * 100;
    
    // Simple latency calculation: assuming 19:00 start (mock)
    const elapsedMinutes = 45; // Simulated
    const expectedMinutes = 30; // Simulated
    const latency = elapsedMinutes - expectedMinutes;

    return { progress, latency, isBehind: latency > 10 };
  }, [callSheet]);

  const updateSampleStatus = (id: string, status: ProductSample['status']) => {
    setSamples(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const confirmTimelineItem = (id: string) => {
    setCallSheet(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'confirmed' } : item
    ));
  };

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
