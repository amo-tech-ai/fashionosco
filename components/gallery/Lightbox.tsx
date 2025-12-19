
import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle, XCircle, MessageSquare, MapPin, MousePointer2, Zap } from 'lucide-react';
import { GalleryAsset } from '../../types/gallery';
import { useToast } from '../ToastProvider';

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
  const { addToast } = useToast();

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setPendingPin({ x, y });
    const input = document.getElementById('comment-input');
    if (input) input.focus();
  };

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      onAddComment(commentText, pendingPin?.x, pendingPin?.y);
      if (pendingPin) {
         addToast("Correction Ticket created. Syncing with Production Desk.", "success");
         onUpdateStatus('retouching');
      }
      setCommentText('');
      setPendingPin(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-[#0a0a0a] flex animate-in fade-in duration-200">
      <div className="flex-1 relative flex items-center justify-center p-8 overflow-hidden">
        <div 
          ref={imageContainerRef}
          className="relative max-h-full max-w-full shadow-2xl cursor-crosshair group/canvas select-none"
          onClick={handleImageClick}
        >
          <img src={asset.url} alt={asset.filename} className="max-h-[calc(100vh-100px)] object-contain pointer-events-none" />
          
          {asset.comments.map((comment) => comment.x !== undefined && (
            <div
              key={comment.id}
              className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 shadow-xl flex items-center justify-center transition-all z-20 ${
                hoveredCommentId === comment.id ? 'bg-purple-600 border-white scale-125' : 'bg-white/90 border-purple-600 text-purple-700'
              }`}
              style={{ left: `${comment.x}%`, top: `${comment.y}%` }}
              onMouseEnter={() => setHoveredCommentId(comment.id)}
              onMouseLeave={() => setHoveredCommentId(null)}
            >
               <Zap size={10} fill="currentColor" />
            </div>
          ))}

          {pendingPin && (
            <div className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full bg-purple-600 border-2 border-white shadow-2xl animate-bounce z-30 flex items-center justify-center"
                 style={{ left: `${pendingPin.x}%`, top: `${pendingPin.y}%` }}>
               <Zap size={10} fill="white" className="text-white" />
            </div>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover/canvas:opacity-100 transition-opacity bg-black/40 backdrop-blur px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-white/60 pointer-events-none">
            Click to drop a correction pin
          </div>
        </div>

        <button onClick={onPrev} className="absolute left-6 top-1/2 -translate-y-1/2 p-4 text-white/30 hover:text-white hover:bg-white/5 rounded-full transition-all">
          <ChevronLeft size={48} />
        </button>
        <button onClick={onNext} className="absolute right-6 top-1/2 -translate-y-1/2 p-4 text-white/30 hover:text-white hover:bg-white/5 rounded-full transition-all">
          <ChevronRight size={48} />
        </button>
      </div>

      <div className="w-96 bg-[#111] border-l border-white/10 flex flex-col shadow-2xl">
        <div className="p-8 border-b border-white/10 bg-black/20">
          <div className="flex justify-between items-center mb-1">
             <h3 className="font-serif text-2xl">Asset Review</h3>
             <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors"><X size={24}/></button>
          </div>
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">{asset.filename}</p>
        </div>

        <div className="p-8 grid grid-cols-3 gap-3 border-b border-white/10">
          <button onClick={() => onUpdateStatus('rejected')} className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${asset.status === 'rejected' ? 'bg-red-900/20 border-red-500 text-red-500' : 'border-white/5 text-gray-500 hover:bg-white/5'}`}>
            <XCircle size={20} /> <span className="text-[10px] font-black uppercase">Kill</span>
          </button>
          <button onClick={() => onUpdateStatus('unrated')} className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${asset.status === 'unrated' ? 'bg-white/10 border-white text-white' : 'border-white/5 text-gray-500 hover:bg-white/5'}`}>
            <MousePointer2 size={20} /> <span className="text-[10px] font-black uppercase">Hold</span>
          </button>
          <button onClick={() => onUpdateStatus('selected')} className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${asset.status === 'selected' ? 'bg-green-900/20 border-green-500 text-green-500' : 'border-white/5 text-gray-500 hover:bg-white/5'}`}>
            <CheckCircle size={20} /> <span className="text-[10px] font-black uppercase">Select</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6 hide-scrollbar">
           <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Spatial Corrections</h4>
           <div className="space-y-4">
              {asset.comments.map(c => (
                <div key={c.id} className={`p-4 rounded-2xl transition-all border-l-2 ${c.x !== undefined ? 'bg-purple-900/10 border-purple-500' : 'bg-white/5 border-transparent'}`}>
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                       {c.x !== undefined && <MapPin size={10} className="text-purple-400" />} {c.user}
                     </span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed font-light">{c.text}</p>
                </div>
              ))}
           </div>
        </div>

        <div className="p-8 bg-[#0a0a0a] border-t border-white/10">
           {pendingPin && (
             <div className="flex items-center gap-2 mb-3 text-xs text-purple-400 animate-in fade-in slide-in-from-bottom-2">
                <Zap size={14} /> Coordinate Locked: {Math.round(pendingPin.x)}%, {Math.round(pendingPin.y)}%
             </div>
           )}
           <textarea 
             id="comment-input"
             value={commentText}
             onChange={(e) => setCommentText(e.target.value)}
             className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none h-24 resize-none transition-all"
             placeholder={pendingPin ? "Describe correction required at this pin..." : "Drop a pin or leave a note..."}
           />
           <button 
             onClick={handleSubmitComment}
             disabled={!commentText.trim()}
             className="w-full mt-4 py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all disabled:opacity-20"
           >
             {pendingPin ? 'Create Correction Ticket' : 'Post Note'}
           </button>
        </div>
      </div>
    </div>
  );
};
