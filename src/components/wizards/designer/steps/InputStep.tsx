
import React, { useRef, useState } from 'react';
import { Button } from '../../../Button';
import { BrandInput } from '../../../../types/brand';
import { Globe, Instagram, Type, Upload, Image as ImageIcon, X, AlertCircle } from 'lucide-react';

interface InputStepProps {
  data: BrandInput;
  onChange: (field: keyof BrandInput, value: any) => void;
  onNext: () => void;
}

export const InputStep: React.FC<InputStepProps> = ({ data, onChange, onNext }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      onChange('lookbookFiles', [...(data.lookbookFiles || []), ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const updated = [...(data.lookbookFiles || [])];
    updated.splice(index, 1);
    onChange('lookbookFiles', updated);
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string.startsWith('http') ? string : `https://${string}`);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = () => {
    if (!data.brandName) {
        setError("Brand name is required");
        return;
    }
    if (data.websiteUrl && !isValidUrl(data.websiteUrl)) {
        setError("Please enter a valid website URL");
        return;
    }
    setError(null);
    onNext();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-4">
        <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A]">Designer Onboarding.</h2>
        <p className="text-gray-500 font-light text-lg max-w-xl mx-auto">
          Create your brand profile. Connect your digital presence and upload your lookbook for a deep AI strategic audit.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-8">
        
        {/* Error Banner */}
        {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm animate-in fade-in">
                <AlertCircle size={16} /> {error}
            </div>
        )}

        {/* Text Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Brand Name *</label>
              <div className="relative">
                <Type className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={data.brandName}
                  onChange={(e) => { setError(null); onChange('brandName', e.target.value); }}
                  placeholder="e.g. Atelier Noir"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                />
              </div>
           </div>

           <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Website URL</label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                  type="url" 
                  value={data.websiteUrl}
                  onChange={(e) => { setError(null); onChange('websiteUrl', e.target.value); }}
                  placeholder="e.g. www.atelier-noir.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                />
              </div>
           </div>

           <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Instagram Handle</label>
              <div className="relative">
                <Instagram className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={data.instagramHandle}
                  onChange={(e) => onChange('instagramHandle', e.target.value)}
                  placeholder="@ateliernoir"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                />
              </div>
           </div>
        </div>

        {/* Visual Input */}
        <div>
           <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
              Lookbook / Visual Context (Optional)
           </label>
           
           <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-black hover:bg-gray-50 transition-all group"
           >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                 <Upload size={20} className="text-gray-400 group-hover:text-black" />
              </div>
              <p className="text-sm font-medium text-gray-900">Click to upload Lookbook images</p>
              <p className="text-xs text-gray-500 mt-1">Allows AI to analyze your visual aesthetic.</p>
              <input 
                 type="file" 
                 ref={fileInputRef} 
                 className="hidden" 
                 multiple 
                 accept="image/*" 
                 onChange={handleFileChange}
              />
           </div>

           {/* Preview Strip */}
           {data.lookbookFiles && data.lookbookFiles.length > 0 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                 {data.lookbookFiles.map((file, i) => (
                    <div key={i} className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-gray-200 group">
                       <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="preview" />
                       <button 
                          onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                          className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                       >
                          <X size={12} />
                       </button>
                    </div>
                 ))}
              </div>
           )}
        </div>

        <Button 
          onClick={handleSubmit} 
          disabled={!data.brandName}
          className="w-full justify-center py-4 text-sm"
        >
          Begin Deep Analysis
        </Button>
      </div>
    </div>
  );
};
