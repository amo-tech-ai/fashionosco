
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle, XCircle, MessageSquare, Info, Download } from 'lucide-react';
import { GalleryAsset } from '../../types/gallery';

interface LightboxProps {
  asset: GalleryAsset;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onUpdateStatus: (status: GalleryAsset['status']) => void;
  onAddComment: (text: string) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ asset, onClose, onNext, onPrev, onUpdateStatus, onAddComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      onAddComment(commentText);
      setCommentText('');
    }
  };

  // Handle keydown for navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if typing in textarea
      if (document.activeElement?.tagName === 'TEXTAREA') return;

      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === '1') onUpdateStatus('rejected');
      if (e.key === '2') onUpdateStatus('unrated');
      if (e.key === '3') onUpdateStatus('selected');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, onUpdateStatus]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex animate-in fade-in duration-200">
      
      {/* Main Image Area */}
      <div className="flex-1 relative flex items-center justify-center p-8 group">
         <img src={asset.url} alt={asset.filename} className="max-h-full max-w-full object-contain shadow-2xl" />
         
         {/* Navigation Overlays */}
         <button onClick={onPrev} className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors">
            <ChevronLeft size={48} />
         </button>
         <button onClick={onNext} className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors">
            <ChevronRight size={48} />
         </button>

         {/* Top Bar */}
         <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="text-white/80 font-mono text-sm">{asset.filename}</div>
            <button onClick={onClose} className="text-white hover:text-gray-300">
               <X size={24} />
            </button>
         </div>
      </div>

      {/* Sidebar - Details & Actions */}
      <div className="w-80 bg-[#111111] border-l border-white/10 flex flex-col">
         <div className="p-6 border-b border-white/10">
            <h3 className="text-white font-serif text-xl mb-1">Review</h3>
            <p className="text-gray-500 text-xs">Use keyboard shortcuts (1-3) to rate.</p>
         </div>

         {/* Action Buttons */}
         <div className="p-6 grid grid-cols-3 gap-2 border-b border-white/10">
            <button 
               onClick={() => onUpdateStatus('rejected')}
               className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors ${asset.status === 'rejected' ? 'bg-red-900/30 border-red-500 text-red-400' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}
            >
               <XCircle size={20} />
               <span className="text-[10px] uppercase font-bold tracking-wider">Reject</span>
            </button>
            <button 
               onClick={() => onUpdateStatus('unrated')}
               className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors ${asset.status === 'unrated' ? 'bg-white/10 border-white text-white' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}
            >
               <div className="w-5 h-5 rounded-full border border-current"></div>
               <span className="text-[10px] uppercase font-bold tracking-wider">Unrated</span>
            </button>
            <button 
               onClick={() => onUpdateStatus('selected')}
               className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors ${asset.status === 'selected' ? 'bg-green-900/30 border-green-500 text-green-400' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}
            >
               <CheckCircle size={20} />
               <span className="text-[10px] uppercase font-bold tracking-wider">Select</span>
            </button>
         </div>

         {/* Metadata */}
         <div className="p-6 space-y-4 flex-1 overflow-y-auto">
            <div className="space-y-2">
               <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                  <Info size={12} /> Metadata
               </h4>
               <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-300">
                  <span className="text-gray-500">Camera</span> <span>{asset.metadata.camera}</span>
                  <span className="text-gray-500">Lens</span> <span>85mm</span>
                  <span className="text-gray-500">Aperture</span> <span>{asset.metadata.fStop}</span>
                  <span className="text-gray-500">ISO</span> <span>{asset.metadata.iso}</span>
                  <span className="text-gray-500">Shutter</span> <span>{asset.metadata.shutter}</span>
               </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
               <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                  <MessageSquare size={12} /> Comments
               </h4>
               <div className="space-y-3 max-h-40 overflow-y-auto pr-1">
                  {asset.comments.length === 0 ? (
                     <p className="text-sm text-gray-600 italic">No comments yet.</p>
                  ) : (
                     asset.comments.map(comment => (
                        <div key={comment.id} className="bg-white/5 p-3 rounded text-sm">
                           <div className="flex justify-between text-xs mb-1">
                              <span className="font-bold text-white">{comment.user}</span>
                              <span className="text-gray-500">{comment.timestamp}</span>
                           </div>
                           <p className="text-gray-300">{comment.text}</p>
                        </div>
                     ))
                  )}
               </div>
               
               <div className="pt-2">
                  <textarea 
                     value={commentText}
                     onChange={(e) => setCommentText(e.target.value)}
                     placeholder="Add a retouching note..." 
                     className="w-full bg-black border border-white/20 rounded p-3 text-sm text-white focus:border-white/50 focus:outline-none resize-none h-20"
                  ></textarea>
                  <button 
                     onClick={handleSubmitComment}
                     className="w-full bg-white text-black py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-gray-200 mt-2"
                  >
                     Post Comment
                  </button>
               </div>
            </div>
         </div>

         <div className="p-6 border-t border-white/10">
            <button className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
               <Download size={14} /> Download Preview
            </button>
         </div>
      </div>
    </div>
  );
};
