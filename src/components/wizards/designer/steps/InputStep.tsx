
import React from 'react';
import { Button } from '../../../Button';
import { BrandInput } from '../../../../types/brand';
import { Globe, Instagram, Type } from 'lucide-react';

interface InputStepProps {
  data: BrandInput;
  onChange: (field: keyof BrandInput, value: string) => void;
  onNext: () => void;
}

export const InputStep: React.FC<InputStepProps> = ({ data, onChange, onNext }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-4">
        <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A]">Designer Onboarding.</h2>
        <p className="text-gray-500 font-light text-lg max-w-xl mx-auto">
          Create your brand profile in seconds. Enter your website and social links, and our AI will automatically build your portfolio and strategic profile.
        </p>
      </div>

      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Brand Name</label>
          <div className="relative">
            <Type className="absolute left-3 top-3 text-gray-400" size={18} />
            <input 
              type="text" 
              value={data.brandName}
              onChange={(e) => onChange('brandName', e.target.value)}
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
              onChange={(e) => onChange('websiteUrl', e.target.value)}
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

        <Button 
          onClick={onNext} 
          disabled={!data.brandName || !data.websiteUrl}
          className="w-full justify-center py-4 text-sm mt-4"
        >
          Create Profile
        </Button>
      </div>
    </div>
  );
};
