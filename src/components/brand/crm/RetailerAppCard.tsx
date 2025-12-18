import React, { useCallback } from 'react';
import { MapPin, Globe, Check, X, Sparkles } from 'lucide-react';
import { RetailerApp } from '../../../services/data/retailers';

interface RetailerAppCardProps {
  app: RetailerApp;
  onUpdateStatus: (id: string, status: RetailerApp['status']) => void;
}

export const RetailerAppCard: React.FC<RetailerAppCardProps> = ({ app, onUpdateStatus }) => {
  const handleApprove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateStatus(app.id, 'Approved');
  }, [app.id, onUpdateStatus]);

  const handleReject = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateStatus(app.id, 'Rejected');
  }, [app.id, onUpdateStatus]);

  return (
    <div className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all bg-white group">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-bold text-xl">{app.storeName}</h4>
            <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded ${
              app.status === 'Approved' ? 'bg-green-100 text-green-700' :
              app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
              'bg-yellow-50 text-yellow-700 border border-yellow-100'
            }`}>{app.status}</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400 font-light">
            <span className="flex items-center gap-1.5"><MapPin size={14}/> {app.location}</span>
            <span className="flex items-center gap-1.5"><Globe size={14}/> {app.website}</span>
          </div>
        </div>

        <div className="flex items-center gap-8 bg-[#FDFCFB] px-6 py-4 rounded-2xl border border-gray-100 shadow-inner">
          <div className="text-center">
            <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Risk Score</span>
            <span className={`text-2xl font-bold ${app.risk_score > 50 ? 'text-red-500' : 'text-green-600'}`}>{app.risk_score}</span>
          </div>
          <div className="h-10 w-px bg-gray-200"></div>
          <div className="text-center">
            <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Tier Match</span>
            <span className="text-sm font-bold text-gray-800">{app.aesthetic_tier}</span>
          </div>
        </div>

        {app.status === 'Pending' && (
          <div className="flex gap-2">
            <button 
              onClick={handleReject}
              className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all"
              aria-label="Reject application"
            >
              <X size={20} />
            </button>
            <button 
              onClick={handleApprove}
              className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-xl hover:bg-gray-800 transition-all shadow-xl shadow-black/10"
              aria-label="Approve application"
            >
              <Check size={20} />
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-50 flex items-start gap-3">
        <Sparkles className="text-purple-600 shrink-0 mt-0.5" size={14} />
        <p className="text-xs text-gray-500 leading-relaxed italic">
           AI Assessment: {app.risk_score < 30 
             ? "Aesthetic profile matches luxury tier benchmarks. High affinity with core brand DNA detected." 
             : "Caution: Limited visual presence in high-fashion media. Manual review of current brand list recommended."}
        </p>
      </div>
    </div>
  );
};