
import React from 'react';
import { Heart, X, MessageSquare, Check } from 'lucide-react';
import { GalleryAsset } from '../../types/gallery';

interface PhotoCardProps {
  asset: GalleryAsset;
  onSelect: () => void;
  onUpdateStatus: (status: GalleryAsset['status']) => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ asset, onSelect, onUpdateStatus }) => {
  return (
    <div className="group relative aspect-[2/3] bg-gray-100 rounded-sm overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300">
      <img 
        src={asset.url} 
        alt={asset.filename}
        className={`w-full h-full object-cover transition-all duration-500 ${asset.status === 'rejected' ? 'grayscale opacity-50' : 'group-hover:scale-105'}`}
        onClick={onSelect}
      />
      
      {/* Overlay */}
      <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors ${asset.status === 'selected' ? 'ring-4 ring-green-500 ring-inset' : ''}`}>
        
        {/* Top Actions */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
           {asset.comments.length > 0 && (
              <div className="bg-black/50 text-white p-1.5 rounded-full backdrop-blur-sm">
                 <MessageSquare size={14} />
              </div>
           )}
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-center">
           <span className="text-white text-xs font-mono truncate max-w-[100px]">{asset.filename}</span>
           <div className="flex gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); onUpdateStatus('rejected'); }}
                className={`p-2 rounded-full hover:bg-white/20 text-white transition-colors ${asset.status === 'rejected' ? 'text-red-500' : ''}`}
                title="Reject"
              >
                 <X size={16} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onUpdateStatus('selected'); }}
                className={`p-2 rounded-full hover:bg-white/20 text-white transition-colors ${asset.status === 'selected' ? 'bg-green-500 border-transparent' : 'border border-white/30'}`}
                title="Select"
              >
                 {asset.status === 'selected' ? <Check size={16} /> : <Heart size={16} />}
              </button>
           </div>
        </div>
      </div>

      {/* Status Badges (Visible always) */}
      {asset.status === 'selected' && (
         <div className="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-bold uppercase px-2 py-1 rounded shadow-sm">
            Selected
         </div>
      )}
    </div>
  );
};
