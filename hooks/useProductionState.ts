import { useState, useEffect, useMemo, useCallback } from 'react';
import { ProductSample } from '../types/production';
import { TimelineItem } from '../types/event-tools';

export const useProductionState = <T extends TimelineItem>(initialSamples: ProductSample[], initialBlocks: T[]) => {
  const [samples, setSamples] = useState(initialSamples);
  const [callSheet, setCallSheet] = useState(initialBlocks);
  const [activeBlockIndex, setActiveBlockIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const updateSampleStatus = useCallback((id: string, status: ProductSample['status']) => {
    setSamples(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  }, []);

  const advanceBlock = useCallback(() => {
    if (activeBlockIndex < callSheet.length - 1) {
      setActiveBlockIndex(prev => prev + 1);
      return true;
    }
    return false;
  }, [activeBlockIndex, callSheet.length]);

  const stats = useMemo(() => {
    const totalBlocks = callSheet.length;
    const completedBlocks = activeBlockIndex;
    const progress = totalBlocks > 0 ? (completedBlocks / totalBlocks) * 100 : 0;
    
    // TEMPORAL DELTA LOGIC
    // Calculate how far we have drifted from the ideal "45m per look" benchmark
    const startTime = new Date();
    startTime.setHours(9, 0, 0); // Standard 09:00 Crew Call
    
    const elapsedMinutes = Math.floor((currentTime.getTime() - startTime.getTime()) / 60000);
    const expectedMinutes = completedBlocks * 45; 
    const latency = Math.max(0, elapsedMinutes - expectedMinutes);

    // Calculate required speed to hit sunset wrap (18:00)
    const wrapTime = new Date();
    wrapTime.setHours(18, 0, 0); 
    const minutesToWrap = Math.max(0, Math.floor((wrapTime.getTime() - currentTime.getTime()) / 60000));
    const remainingBlocks = totalBlocks - completedBlocks;
    const requiredMinutesPerLook = remainingBlocks > 0 ? minutesToWrap / remainingBlocks : 45;
    
    let health: 'optimal' | 'warning' | 'critical' = 'optimal';
    if (latency > 45 || requiredMinutesPerLook < 20) health = 'critical';
    else if (latency > 15) health = 'warning';
    
    return { 
      progress, 
      latency, 
      isBehind: latency > 10,
      health,
      requiredMinutesPerLook,
      activeBlockIndex
    };
  }, [callSheet, activeBlockIndex, currentTime]);

  return {
    samples,
    callSheet,
    activeBlockIndex,
    setActiveBlockIndex,
    currentTime,
    stats,
    updateSampleStatus,
    advanceBlock,
    setCallSheet
  };
};