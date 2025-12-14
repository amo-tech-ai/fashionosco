
import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle, XCircle, MessageSquare, Info, Download, MapPin } from 'lucide-react';
import { GalleryAsset } from '../../types/gallery';

interface LightboxProps {
  asset: GalleryAsset;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onUpdateStatus: (status: GalleryAsset['status']) => void;
  onAddComment: (text: string, x?: number, y?: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ asset, onClose, onNext, onPrev, onUpdateStatus, onAddComment }) => {
  const [commentText, setCommentText] = useState('');
  const [pendingPin, setPendingPin] = useState<{ x: number; y: number } | null>(null);
  const [hoveredCommentId, setHoveredCommentId] = useState<string | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setPendingPin({ x, y });
    // Focus comment input
    document.getElementById('comment-input')?.focus();
  };

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      onAddComment(commentText, pendingPin?.x, pendingPin?.y);
      setCommentText('');
      setPendingPin(null);
    }
  };

  // Handle keydown for navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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

  // Clear pending pin when changing assets
  useEffect(() => {
    setPendingPin(null);
    setCommentText('');
  }, [asset.id]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex animate-in fade-in duration-200">
      
      {/* Main Image Area */}
      <div className="flex-1 relative flex items-center justify-center p-8 group/main">
         <div 
            ref={imageContainerRef}
            className="relative inline-block max-h-full max-w-full shadow-2xl cursor-crosshair"
            onClick={handleImageClick}
         >
            <img 
               src={asset.url} 
               alt={asset.filename} 
               className="max-h-[calc(100vh-64px)] max-w-full object-contain pointer-events-none select-none" 
            />
            
            {/* Existing Comment Pins */}
            {asset.comments.map((comment) => (
               comment.x && comment.y && (
                  <div
                     key={comment.id}
                     className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 shadow-sm flex items-center justify-center text-[10px] font-bold transition-transform duration-200 ${
                        hoveredCommentId === comment.id 
                        ? 'bg-purple-600 border-white text-white scale-125 z-20' 
                        : 'bg-white/90 border-purple-600 text-purple-700 hover:scale-110 z-10'
                     }`}
                     style={{ left: `${comment.x}%`, top: `${comment.y}%` }}
                  >
                     <span className="sr-only">{comment.user}</span>
                  </div>
               )
            ))}

            {/* Pending Pin */}
            {pendingPin && (
               <div
                  className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full bg-purple-600 border-2 border-white shadow-lg animate-bounce z-30"
                  style={{ left: `${pendingPin.x}%`, top: `${pendingPin.y}%` }}
               >
               </div>
            )}
         </div>
         
         {/* Navigation Overlays */}
         <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors hover:bg-black/20 rounded-full">
            <ChevronLeft size={48} />
         </button>
         <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors hover:bg-black/20 rounded-full">
            <ChevronRight size={48} />
         </button>

         {/* Top Bar */}
         <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent opacity-0 group-hover/main:opacity-100 transition-opacity pointer-events-none">
            <div className="text-white/80 font-mono text-sm pointer-events-auto">{asset.filename}</div>
            <button onClick={onClose} className="text-white hover:text-gray-300 pointer-events-auto">
               <X size={24} />
            </button>
         </div>
      </div>

      {/* Sidebar - Details & Actions */}
      <div className="w-96 bg-[#111111] border-l border-white/10 flex flex-col shrink-0">
         <div className="p-6 border-b border-white/10">
            <h3 className="text-white font-serif text-xl mb-1">Review</h3>
            <p className="text-gray-500 text-xs">Click image to drop a retouching pin.</p>
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
               <div className="space-y-3">
                  {asset.comments.length === 0 ? (
                     <p className="text-sm text-gray-600 italic">No comments yet. Click image to add one.</p>
                  ) : (
                     asset.comments.map(comment => (
                        <div 
                           key={comment.id} 
                           className={`p-3 rounded text-sm transition-colors cursor-default ${hoveredCommentId === comment.id ? 'bg-white/10 border-l-2 border-purple-500' : 'bg-white/5 border-l-2 border-transparent'}`}
                           onMouseEnter={() => setHoveredCommentId(comment.id)}
                           onMouseLeave={() => setHoveredCommentId(null)}
                        >
                           <div className="flex justify-between text-xs mb-1">
                              <span className="font-bold text-white flex items-center gap-2">
                                 {comment.x && <MapPin size={10} className="text-purple-400" />}
                                 {comment.user}
                              </span>
                              <span className="text-gray-500">{comment.timestamp}</span>
                           </div>
                           <p className="text-gray-300">{comment.text}</p>
                        </div>
                     ))
                  )}
               </div>
               
               <div className="pt-4 sticky bottom-0 bg-[#111111]">
                  {pendingPin && (
                     <div className="flex items-center gap-2 mb-2 text-xs text-purple-400 animate-in fade-in slide-in-from-bottom-2">
                        <MapPin size={12} />
                        Pin placed at {Math.round(pendingPin.x)}%, {Math.round(pendingPin.y)}%
                        <button onClick={() => setPendingPin(null)} className="text-gray-500 hover:text-white ml-auto">Cancel</button>
                     </div>
                  )}
                  <textarea 
                     id="comment-input"
                     value={commentText}
                     onChange={(e) => setCommentText(e.target.value)}
                     placeholder={pendingPin ? "Describe the edit needed here..." : "Add a general note..."} 
                     className="w-full bg-black border border-white/20 rounded-lg p-3 text-sm text-white focus:border-purple-500 focus:outline-none resize-none h-20 transition-colors"
                     onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSubmitComment())}
                  ></textarea>
                  <button 
                     onClick={handleSubmitComment}
                     disabled={!commentText.trim()}
                     className="w-full bg-white text-black py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
