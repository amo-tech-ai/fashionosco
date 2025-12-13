
import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_GALLERY_ASSETS } from '../data/mockGallery';
import { GalleryAsset, AssetStatus } from '../types/gallery';
import { PhotoCard } from '../components/gallery/PhotoCard';
import { Lightbox } from '../components/gallery/Lightbox';
import { Filter, Download, CheckSquare, Grid as GridIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { useToast } from '../components/ToastProvider';

export const ClientGallery: React.FC = () => {
  const [assets, setAssets] = useState<GalleryAsset[]>([]);
  const [filter, setFilter] = useState<'all' | AssetStatus>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { addToast } = useToast();

  // Load from local storage or fall back to mock
  useEffect(() => {
    const saved = localStorage.getItem('gallery_assets');
    if (saved) {
      try {
        setAssets(JSON.parse(saved));
      } catch (e) {
        setAssets(MOCK_GALLERY_ASSETS);
      }
    } else {
      setAssets(MOCK_GALLERY_ASSETS);
    }
  }, []);

  // Save to local storage whenever assets change
  useEffect(() => {
    if (assets.length > 0) {
      localStorage.setItem('gallery_assets', JSON.stringify(assets));
    }
  }, [assets]);

  const filteredAssets = useMemo(() => {
    if (filter === 'all') return assets;
    return assets.filter(a => a.status === filter);
  }, [assets, filter]);

  const updateAssetStatus = (id: string, status: AssetStatus) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const selectedCount = assets.filter(a => a.status === 'selected').length;

  const handleConfirmSelections = () => {
     addToast(`${selectedCount} images confirmed for retouching.`, "success");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-20 z-10">
         <div className="flex items-center gap-4">
            <h1 className="font-serif text-2xl text-[#1A1A1A]">Campaign Proofs</h1>
            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            <div className="flex bg-gray-100 p-1 rounded-lg">
               {['all', 'selected', 'unrated', 'rejected'].map((f) => (
                  <button
                     key={f}
                     onClick={() => setFilter(f as any)}
                     className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
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
            <span className="text-xs font-medium text-gray-500">
               {selectedCount} selections
            </span>
            <Button onClick={handleConfirmSelections} className="h-9 text-xs px-4 bg-black text-white" disabled={selectedCount === 0}>
               <CheckSquare size={14} className="mr-2" /> Confirm Selections
            </Button>
            <button className="p-2 border border-gray-200 rounded hover:bg-gray-50 text-gray-600">
               <Download size={18} />
            </button>
         </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-8 bg-[#F7F7F5]">
         {filteredAssets.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
               <GridIcon size={48} className="mb-4 opacity-20" />
               <p className="text-lg font-medium">No images found in this view.</p>
               <button onClick={() => setFilter('all')} className="text-sm underline mt-2">View All</button>
            </div>
         ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               {filteredAssets.map((asset, idx) => (
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
         />
      )}
    </div>
  );
};
