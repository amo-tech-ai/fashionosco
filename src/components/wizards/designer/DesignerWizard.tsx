import React, { useState } from 'react';
import { BrandInput } from '../../../types/brand';
import { InputStep } from './steps/InputStep';
import { AnalysisStep } from './steps/AnalysisStep';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DesignerWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [inputData, setInputData] = useState<BrandInput>({
    brandName: '',
    websiteUrl: '',
    instagramHandle: '',
    lookbookFiles: [],
  });
  const navigate = useNavigate();

  const handleInputChange = (field: keyof BrandInput, value: string) => {
    setInputData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-40 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
           <div className="font-serif text-xl font-bold">FashionOS Brand Architect</div>
           <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={24} />
           </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-12">
         {step === 1 && (
            <InputStep 
               data={inputData} 
               onChange={handleInputChange} 
               onNext={() => setStep(2)} 
            />
         )}
         {step === 2 && (
            <AnalysisStep input={inputData} />
         )}
      </div>
    </div>
  );
};