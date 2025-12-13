
import React from 'react';
import { FileText, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastProvider';
import { generateCallSheetPDF } from '../../services/pdf/callSheet';

interface DeliverablesListProps {
  campaign: any;
  totalShots: number;
}

export const DeliverablesList: React.FC<DeliverablesListProps> = ({ campaign, totalShots }) => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleDownloadCallSheet = () => {
    if (campaign) {
      // We pass the entire campaign object. 
      // The generateCallSheetPDF function now normalizes this by looking for campaign.data
      generateCallSheetPDF(campaign);
      addToast("Downloading Call Sheet...", "success");
    } else {
      addToast("No active campaign data found. Book a shoot first.", "error");
    }
  };

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-[#E5E5E5] flex justify-between items-center">
        <h3 className="font-serif text-xl text-[#1A1A1A]">Deliverables</h3>
        <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">View All</span>
      </div>
      <div className="divide-y divide-[#E5E5E5]">
        <div 
          onClick={handleDownloadCallSheet}
          className="px-6 py-4 flex items-center justify-between hover:bg-[#F7F7F5] transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#F7F7F5] rounded-lg flex items-center justify-center text-[#6B7280] group-hover:bg-white group-hover:shadow-sm transition-all">
              <FileText size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1A1A1A]">Production Call Sheet.pdf</p>
              <p className="text-xs text-[#9CA3AF]">PDF • ~1.2 MB</p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border bg-[#DCFCE7] text-[#166534] border-[#DCFCE7]">
            Ready
          </span>
        </div>
        
        <div 
          className="px-6 py-4 flex items-center justify-between hover:bg-[#F7F7F5] transition-colors cursor-pointer group"
          onClick={() => navigate('/dashboard/gallery')}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#F7F7F5] rounded-lg flex items-center justify-center text-[#6B7280] group-hover:bg-white group-hover:shadow-sm transition-all">
              <ImageIcon size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1A1A1A]">Client_Proofs_Gallery</p>
              <p className="text-xs text-[#9CA3AF]">Link • {totalShots} items</p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border bg-[#FEF3C7] text-[#92400E] border-[#FEF3C7]">
            Pending
          </span>
        </div>
      </div>
    </div>
  );
};
