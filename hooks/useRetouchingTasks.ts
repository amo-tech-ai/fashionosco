import { useState, useMemo } from 'react';
import { useActiveCampaign } from '../contexts/ActiveCampaignContext';
import { GalleryAsset } from '../types/gallery';
import { ShotItem } from '../types/shotlist';

export const useRetouchingTasks = () => {
  const { activeCampaign } = useActiveCampaign();

  const tickets = useMemo<ShotItem[]>(() => {
    if (!activeCampaign?.data?.galleryAssets) return [];
    
    const assets = activeCampaign.data.galleryAssets as GalleryAsset[];
    const extractedTickets: ShotItem[] = [];

    assets.forEach(asset => {
      asset.comments.forEach(comment => {
        // Spatial markers (with X/Y) are automatically converted to production tickets
        if (comment.x !== undefined) {
           extractedTickets.push({
             id: `ticket-${comment.id}`,
             name: `Retouch: ${asset.filename}`,
             description: comment.text,
             angle: `X:${Math.round(comment.x)}% Y:${Math.round(comment.y || 0)}%`,
             lighting: asset.metadata?.lighting || 'Ambient',
             priority: 'High',
             status: 'Draft',
             model: 'Auto-Retouch Bot',
             outfit: asset.filename
           });
        }
      });
    });

    return extractedTickets;
  }, [activeCampaign?.data?.galleryAssets]);

  const stats = useMemo(() => ({
    total: tickets.length,
    highPriority: tickets.filter(t => t.priority === 'High').length
  }), [tickets]);

  return { tickets, stats };
};