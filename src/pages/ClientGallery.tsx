
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { GalleryAsset, AssetStatus, Comment } from '../types/gallery';
import { PhotoCard } from '../components/gallery/PhotoCard';
import { Lightbox } from '../components/gallery/Lightbox';
import { Wand2, Grid as GridIcon, Camera, Upload, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';
import { useToast } from '../components/ToastProvider';
import { useActiveCampaign } from '../contexts/ActiveCampaignContext';
import { CampaignService } from '../services/data/campaigns';
import { StorageService } from '../services/storage';
import { useAuth } from '../contexts/AuthContext';

export const ClientGallery: React.FC = () => {
  const { activeCampaign, refreshCampaign } = useActiveCampaign();
  const { user } = useAuth();
  const [assets, setAssets] = useState<GalleryAsset[]>([]);
  const [filter, setFilter] = useState<'all' | AssetStatus>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();

  // Load Assets from Active Campaign
  useEffect(() => {
    if (activeCampaign) {
       if (activeCampaign.data?.galleryAssets) {
          setAssets(activeCampaign.data.galleryAssets);
       } else if (activeCampaign.data?.moodBoardImages && activeCampaign.data.moodBoardImages.length > 0) {
          // Fallback: Use moodboard images as "Proofs" for demo purposes
          const placeholders: GalleryAsset[] = activeCampaign.data.moodBoardImages.map((url: string, i: number) => ({
             id: `asset-${i}`,
             url: url,
             filename: `CAM_SHOT_${100 + i}.jpg`,
             status: 'unrated',
             rating: 0,
             comments: [],
             metadata: { fStop: 'f/2.8', shutter: '1/200', iso: '100', camera: 'Canon R5' }
          }));
          setAssets(placeholders);
       } else {
          setAssets([]);
       }
    }
  }, [activeCampaign?.id]);

  const saveGalleryState = async (updatedAssets: GalleryAsset[]) => {
     if (!activeCampaign) return;
     setAssets(updatedAssets);
     
     try {
        const updatedData = { ...activeCampaign.data, galleryAssets: updatedAssets };
        // Calculate stats for KPI updates
        const stats = {
            total: updatedAssets.length,
            selected: updatedAssets.filter(a => a.status === 'selected').length,
            retouching: updatedAssets.filter(a => a.status === 'retouching').length,
            rejected: updatedAssets.filter(a => a.status === 'rejected').length
        };
        
        const updatePayload: any = { data: { ...updatedData, galleryStats: stats } };
        
        await CampaignService.update(activeCampaign.id, updatePayload);
        // refreshCampaign(); // Optional: Might cause flicker if not careful, optimistically updated above
     } catch (e) {
        console.error("Failed to save gallery", e);
     }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !activeCampaign) return;
    
    setIsUploading(true);
    const files = Array.from(e.target.files) as File[];
    
    try {
        // Upload to Storage
        const urls = await StorageService.uploadFiles(files, 'gallery', activeCampaign.id);
        
        // Create Asset Objects
        const newAssets: GalleryAsset[] = urls.map((url, i) => ({
            id: `new-${Date.now()}-${i}`,
            url: url,
            filename: files[i].name,
            status: 'unrated',
            rating: 0,
            comments: [],
            metadata: { fStop: '-', shutter: '-', iso: '-', camera: '-' }
        }));

        // Merge and Save
        const updatedAssets = [...assets, ...newAssets];
        await saveGalleryState(updatedAssets);
        addToast(`${newAssets.length} images uploaded successfully`, "success");
    } catch (error) {
        console.error(error);
        addToast("Failed to upload images", "error");
    } finally {
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAddComment = (text: string, x?: number, y?: number) => {
    if (lightboxIndex === null) return;
    
    const assetId = assets[lightboxIndex].id;
    const newComment: Comment = {
      id: Date.now().toString(),
      user: user?.user_metadata?.full_name?.split(' ')[0] || 'Studio User',
      text: text,
      timestamp: 'Just now',
      x,
      y
    };

    const updated = assets.map(a => {
      if (a.id === assetId) {
        return { ...a, comments: [...a.comments, newComment] };
      }
      return a;
    });

    saveGalleryState(updated);
  };

  const filteredAssets = useMemo(() => {
    if (filter === 'all') return assets;
    return assets.filter(a => a.status === filter);
  }, [assets, filter]);

  const updateAssetStatus = (id: string, status: AssetStatus) => {
    const updated = assets.map(a => a.id === id ? { ...a, status } : a);
    saveGalleryState(updated);
  };

  const selectedCount = assets.filter(a => a.status === 'selected').length;

  const handleConfirmSelections = () => {
     if (selectedCount === 0) return;
     const updated = assets.map(a => a.status === 'selected' ? { ...a, status: 'retouching' as AssetStatus } : a);
     saveGalleryState(updated);
     addToast(`${selectedCount} images sent to retouching queue.`, "success");
  };

  if (!activeCampaign) {
     return <div className="p-8 text-center text-gray-500">Please select a campaign from the dashboard.</div>;
  }

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-10">
         <div className="flex items-center gap-4">
            <h1 className="font-serif text-2xl text-[#1A1A1A]">Campaign Proofs</h1>
            <span className="text-xs text-gray-400 border-l pl-4 border-gray-200 hidden md:inline">{activeCampaign.title}</span>
            <div className="flex bg-gray-100 p-1 rounded-lg overflow-x-auto max-w-[200px] md:max-w-none scrollbar-hide ml-4">
               {['all', 'selected', 'retouching', 'rejected'].map((f) => (
                  <button
                     key={f}
                     onClick={() => setFilter(f as any)}
                     className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                        filter === f 
                        ? 'bg-white text-black shadow-sm' 
                        : 'text-gray-500 hover:text-black'
                     }`}
                  >
                     {f} <span className="opacity-50 ml-1">({f === 'all' ? assets.length : assets.filter(a => a.status === f).length})</span>
                  </button>
               ))}
            </div>
         </div>

         <div className="flex items-center gap-3">
            <input 
                type="file" 
                multiple 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileUpload}
            />
            <Button 
                variant="secondary" 
                className="h-9 text-xs px-4" 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
            >
               {isUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} className="mr-2" />} 
               Upload
            </Button>
            
            <div className="h-6 w-px bg-gray-200 mx-2"></div>

            <span className="text-xs font-medium text-gray-500 hidden md:inline">
               {selectedCount} selected
            </span>
            <Button onClick={handleConfirmSelections} className="h-9 text-xs px-4 bg-black text-white" disabled={selectedCount === 0}>
               <Wand2 size={14} className="mr-2" /> Send to Retouching
            </Button>
         </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-8 bg-[#F7F7F5]">
         {filteredAssets.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
               {assets.length === 0 ? (
                  <>
                     <Camera size={48} className="mb-4 opacity-20" />
                     <p className="text-lg font-medium">No images uploaded yet.</p>
                     <p className="text-sm text-gray-500 mt-2 max-w-xs text-center">
                        Upload raw assets or proofs for client review.
                     </p>
                     <Button 
                        variant="secondary" 
                        className="mt-6"
                        onClick={() => fileInputRef.current?.click()}
                     >
                        Upload Photos
                     </Button>
                  </>
               ) : (
                  <>
                     <GridIcon size={48} className="mb-4 opacity-20" />
                     <p className="text-lg font-medium">No images found in this view.</p>
                     <button onClick={() => setFilter('all')} className="text-sm underline mt-2">View All</button>
                  </>
               )}
            </div>
         ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               {filteredAssets.map((asset) => (
                  <PhotoCard 
                     key={asset.id} 
                     asset={asset} 
                     onSelect={() => setLightboxIndex(assets.findIndex(a => a.id === asset.id))}
                     onUpdateStatus={(status) => updateAssetStatus(asset.id, status)}
                  />
               ))}
            </div>
         )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
         <Lightbox 
            asset={assets[lightboxIndex]}
            onClose={() => setLightboxIndex(null)}
            onNext={() => setLightboxIndex((prev) => (prev !== null && prev < assets.length - 1 ? prev + 1 : 0))}
            onPrev={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : assets.length - 1))}
            onUpdateStatus={(status) => updateAssetStatus(assets[lightboxIndex].id, status)}
            onAddComment={handleAddComment}
         />
      )}
    </div>
  );
};
