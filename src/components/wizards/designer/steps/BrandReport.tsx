
import React, { useState, useEffect } from 'react';
import { BrandAuditResult, BrandInput } from '../../../../types/brand';
import { Save, Edit2, ShoppingBag, Clock, Download, ArrowRight } from 'lucide-react';
import { Button } from '../../../Button';
import { CompetitorGraph } from '../CompetitorGraph';
import { BrandHealthTimeline } from '../BrandHealthTimeline';
import { BrandService } from '../../../../services/data/brands';
import { useToast } from '../../../ToastProvider';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

// Sub-components
import { IdentityCard } from './report/IdentityCard';
import { MarketCoordinates } from './report/MarketCoordinates';
import { StrategicOpportunities } from './report/StrategicOpportunities';

interface BrandReportProps {
  initialResult: BrandAuditResult;
  input: BrandInput;
}

export const BrandReport: React.FC<BrandReportProps> = ({ initialResult, input }) => {
  const [result, setResult] = useState(initialResult);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const persistData = async () => {
    try {
      // Destructure to remove lookbookFiles as it is not in BrandProfile schema
      const { lookbookFiles, ...profileData } = input;
      
      await BrandService.save({
        ...profileData,
        auditResult: result,
        lastAuditedAt: new Date().toISOString()
      });
      return true;
    } catch (e) {
      console.error("Save failed", e);
      addToast("Failed to save changes.", "error");
      return false;
    }
  };

  const handleManualSave = async () => {
    setIsSaving(true);
    const success = await persistData();
    setIsSaving(false);
    if (success) {
      setIsEditing(false);
      addToast("Brand profile updated.", "success");
    }
  };

  const handleExit = async (path: string) => {
    setIsSaving(true);
    const success = await persistData();
    setIsSaving(false);
    if (success) {
        addToast("Profile saved successfully.", "success");
        navigate(path);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFont("times", "bold");
    doc.setFontSize(24);
    doc.text(`Brand Audit: ${input.brandName}`, 20, 30);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Score: ${result.audit_score}/100`, 20, 45);
    // Wrap text for vibe description
    const splitVibe = doc.splitTextToSize(`Vibe: ${result.brand_profile.vibe_description}`, 170);
    doc.text(splitVibe, 20, 55);
    
    doc.text("Strategic Opportunities:", 20, 80);
    result.strategic_advice.forEach((item, i) => {
        doc.text(`- ${item.title} (${item.impact} Impact)`, 25, 90 + (i*10));
    });

    doc.save(`${input.brandName}_Audit.pdf`);
    addToast("Report downloaded successfully", "success");
  };

  const handleEditChange = (field: string, value: any) => {
    setResult(prev => ({
      ...prev,
      brand_profile: {
        ...prev.brand_profile,
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700 pb-12">
      
      {/* Header Summary */}
      <div className="text-center relative max-w-3xl mx-auto">
         <div className="absolute top-0 right-0 flex gap-2">
            <button 
                onClick={handleExportPDF}
                className="text-gray-400 hover:text-black transition-colors p-2" 
                title="Export PDF"
            >
                <Download size={16} />
            </button>
            {isEditing ? (
               <Button onClick={handleManualSave} isLoading={isSaving} className="h-8 text-xs px-4 bg-green-600 border-green-600 hover:bg-green-700 text-white">
                  <Save size={12} className="mr-2" /> Save Changes
               </Button>
            ) : (
               <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-black transition-colors p-2" title="Edit Profile">
                  <Edit2 size={16} />
               </button>
            )}
         </div>

         <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 border border-green-100">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            Audit Complete
         </div>
         
         <h2 className="font-serif text-4xl md:text-6xl text-[#1A1A1A] mb-6 leading-tight">
            {input.brandName}
         </h2>
         
         {isEditing ? (
            <textarea 
               value={result.brand_profile.vibe_description}
               onChange={(e) => handleEditChange('vibe_description', e.target.value)}
               className="w-full p-4 border border-gray-300 rounded-lg font-light text-lg text-center focus:outline-none focus:border-black bg-white shadow-inner"
               rows={3}
            />
         ) : (
            <p className="text-xl text-gray-500 font-light leading-relaxed">
                "{result.brand_profile.vibe_description}"
            </p>
         )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
         
         {/* Left Column: Core Identity & Health */}
         <div className="lg:col-span-5 space-y-6">
            <IdentityCard 
               result={result} 
               input={input} 
               isEditing={isEditing} 
               onEditChange={handleEditChange} 
            />

            <MarketCoordinates result={result} />

            {/* Brand Health Timeline */}
            <div className="bg-white border border-gray-200 p-8 rounded-2xl">
               <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                  <Clock size={14} /> Brand Trajectory
               </h4>
               <BrandHealthTimeline currentScore={result.audit_score} />
            </div>
         </div>

         {/* Right Column: Strategic Advice */}
         <div className="lg:col-span-7 space-y-8">
            
            <CompetitorGraph competitors={result.competitors} myBrandName={input.brandName} />

            <StrategicOpportunities result={result} />

            <div className="flex gap-4 pt-4">
               <Button onClick={() => handleExit('/dashboard')} isLoading={isSaving} className="flex-1 justify-center py-4 bg-black text-white hover:bg-gray-800">
                  Save & Go to Dashboard
               </Button>
               <Button variant="secondary" onClick={() => handleExit('/shoot-wizard')} isLoading={isSaving} className="flex-1 justify-center py-4 border-gray-200 text-gray-600 hover:text-black hover:border-black">
                  <ShoppingBag size={16} className="mr-2" /> Book Matching Shoot
               </Button>
            </div>
         </div>
      </div>
    </div>
  );
};
