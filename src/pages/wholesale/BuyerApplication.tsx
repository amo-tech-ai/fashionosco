
import React, { useState } from 'react';
import { WholesaleHeader } from '../../components/wholesale/WholesaleHeader';
import { Button } from '../../components/Button';
import { BuyerApplication, VettingResult } from '../../types/wholesale';
import { vetBuyerApplication } from '../../services/ai/wholesale';
import { Loader2, CheckCircle, AlertTriangle, Building, Globe, MapPin, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BuyerApplicationPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'processing' | 'result'>('form');
  const [formData, setFormData] = useState<BuyerApplication>({
    storeName: '',
    website: '',
    instagram: '',
    location: '',
    contactName: '',
    email: ''
  });
  const [result, setResult] = useState<VettingResult | null>(null);

  const handleSubmit = async () => {
    setStep('processing');
    try {
      const data = await vetBuyerApplication(formData);
      setResult(data);
      setStep('result');
    } catch (e) {
      setStep('form');
    }
  };

  const handleContinue = () => {
    navigate('/wholesale/showroom');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-12">
      <WholesaleHeader title="Buyer Application" />

      <div className="max-w-3xl mx-auto px-6">
        
        {step === 'form' && (
           <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-200 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center mb-10">
                 <h2 className="font-serif text-3xl md:text-4xl mb-3">Apply for Access</h2>
                 <p className="text-gray-500">Join our curated network of retailers. We use AI to verify your store details instantly.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Store Name</label>
                    <div className="relative">
                       <Building className="absolute left-3 top-3 text-gray-300" size={18} />
                       <input 
                          value={formData.storeName}
                          onChange={(e) => setFormData({...formData, storeName: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                          placeholder="Boutique Name"
                       />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Location</label>
                    <div className="relative">
                       <MapPin className="absolute left-3 top-3 text-gray-300" size={18} />
                       <input 
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                          placeholder="City, Country"
                       />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Website</label>
                    <div className="relative">
                       <Globe className="absolute left-3 top-3 text-gray-300" size={18} />
                       <input 
                          value={formData.website}
                          onChange={(e) => setFormData({...formData, website: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                          placeholder="https://shop.com"
                       />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Instagram</label>
                    <div className="relative">
                       <Instagram className="absolute left-3 top-3 text-gray-300" size={18} />
                       <input 
                          value={formData.instagram}
                          onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                          placeholder="@handle"
                       />
                    </div>
                 </div>
              </div>

              <div className="border-t border-gray-100 pt-8 flex justify-center">
                 <Button onClick={handleSubmit} className="px-12 py-4">Submit Application</Button>
              </div>
           </div>
        )}

        {step === 'processing' && (
           <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
              <div className="relative">
                 <div className="w-24 h-24 rounded-full border-4 border-gray-200 border-t-black animate-spin"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Building className="w-8 h-8 text-gray-300" />
                 </div>
              </div>
              <div>
                 <h3 className="font-serif text-2xl mb-2">Analyzing Retailer Profile...</h3>
                 <p className="text-gray-500 text-sm">Verifying physical location and brand adjacencies.</p>
              </div>
           </div>
        )}

        {step === 'result' && result && (
           <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200 animate-in fade-in slide-in-from-bottom-4 relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-2 ${result.verdict === 'Reject' ? 'bg-red-500' : 'bg-green-500'}`}></div>
              
              <div className="text-center mb-10">
                 <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${result.verdict === 'Reject' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'}`}>
                    {result.verdict === 'Reject' ? <AlertTriangle size={40} /> : <CheckCircle size={40} />}
                 </div>
                 <h2 className="font-serif text-3xl mb-2">{result.verdict === 'Approve' ? 'Application Approved' : 'Under Review'}</h2>
                 <p className="text-gray-500 max-w-lg mx-auto">{result.reasoning}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                 <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Risk Score</span>
                    <span className={`text-3xl font-bold ${result.risk_score > 50 ? 'text-red-500' : 'text-green-500'}`}>{result.risk_score}</span>
                    <span className="text-gray-400 text-xs ml-1">/ 100</span>
                 </div>
                 <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Tier</span>
                    <span className="text-lg font-medium">{result.aesthetic_tier}</span>
                 </div>
                 <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Verified</span>
                    <span className="text-lg font-medium">{result.is_physical_store_verified ? 'Yes' : 'No'}</span>
                 </div>
              </div>

              <div className="bg-black/5 p-6 rounded-xl mb-10">
                 <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Detected Stock List</h4>
                 <div className="flex flex-wrap gap-2">
                    {result.brands_stocked.map((brand, i) => (
                       <span key={i} className="px-3 py-1 bg-white rounded-full text-xs font-bold border border-gray-200">{brand}</span>
                    ))}
                 </div>
              </div>

              {result.verdict !== 'Reject' && (
                 <div className="flex justify-center">
                    <Button onClick={handleContinue} className="px-12 py-4">Enter Showroom</Button>
                 </div>
              )}
           </div>
        )}

      </div>
    </div>
  );
};
