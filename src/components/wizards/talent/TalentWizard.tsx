
import React, { useState } from 'react';
import { Button } from '../../Button';
import { enrichTalentProfile } from '../../../services/ai/talent';
import { useNavigate } from 'react-router-dom';
import { X, Globe, Sparkles, Check, User, MapPin, Instagram, DollarSign, Tag } from 'lucide-react';
import { useToast } from '../../ToastProvider';
import { StakeholderService } from '../../../services/data/stakeholders';

export const TalentWizard: React.FC = () => {
  const [step, setStep] = useState<'input' | 'analyzing' | 'review' | 'success'>('input');
  const [url, setUrl] = useState('');
  const [roleHint, setRoleHint] = useState('');
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleAnalyze = async () => {
    if (!url) return;
    setStep('analyzing');
    
    try {
      const data = await enrichTalentProfile(url, roleHint);
      setProfile(data);
      setStep('review');
    } catch (e) {
      addToast("Failed to analyze profile. Please try manually.", "error");
      setStep('input');
    }
  };

  const handlePublish = async () => {
    // In a real app, this would save to DB. For now, we simulate.
    // await StakeholderService.save(profile); 
    setStep('success');
    setTimeout(() => {
        navigate('/directory');
        addToast("Profile published to directory!", "success");
    }, 2000);
  };

  const handleUpdateProfile = (field: string, value: string) => {
    setProfile((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-40 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
           <div className="font-serif text-xl font-bold">FashionOS Talent Network</div>
           <button onClick={() => navigate('/directory')} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={24} />
           </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 pt-12">
        
        {/* STEP 1: INPUT */}
        {step === 'input' && (
           <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center space-y-4">
                 <h2 className="font-serif text-4xl">Build your portfolio in seconds.</h2>
                 <p className="text-gray-500 text-lg">
                    Drop a link to your Instagram, Website, or LinkedIn. Our AI agent will scan your work, verify your credits, and build a professional profile card.
                 </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 space-y-6">
                 <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Portfolio URL</label>
                    <div className="relative">
                       <Globe className="absolute left-4 top-3.5 text-gray-400" size={20} />
                       <input 
                          type="url" 
                          value={url} 
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="https://instagram.com/yourhandle" 
                          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                       />
                    </div>
                 </div>
                 
                 <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Primary Role (Optional)</label>
                    <select 
                       value={roleHint}
                       onChange={(e) => setRoleHint(e.target.value)}
                       className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                    >
                       <option value="">Auto-detect</option>
                       <option value="Photographer">Photographer</option>
                       <option value="Stylist">Stylist</option>
                       <option value="Model">Model</option>
                       <option value="MUA">Makeup Artist</option>
                       <option value="Art Director">Art Director</option>
                    </select>
                 </div>

                 <Button onClick={handleAnalyze} disabled={!url} className="w-full justify-center py-4">
                    <Sparkles size={16} className="mr-2" /> Magic Build
                 </Button>
              </div>
           </div>
        )}

        {/* STEP 2: ANALYZING */}
        {step === 'analyzing' && (
           <div className="flex flex-col items-center justify-center py-20 space-y-8 animate-in fade-in">
              <div className="relative">
                 <div className="w-24 h-24 rounded-full border-4 border-purple-100 border-t-purple-600 animate-spin"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Globe size={32} className="text-purple-600 animate-pulse" />
                 </div>
              </div>
              <div className="text-center space-y-2">
                 <h3 className="font-serif text-2xl">Scanning digital footprint...</h3>
                 <p className="text-gray-500">Extracting aesthetic tags, location, and bio.</p>
              </div>
           </div>
        )}

        {/* STEP 3: REVIEW */}
        {step === 'review' && profile && (
           <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center">
                 <h2 className="font-serif text-3xl">Review your Profile</h2>
                 <p className="text-gray-500 mt-2">AI-generated from public data. Edit as needed.</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
                 {/* Hero Cover (Mock) */}
                 <div className="h-40 bg-gradient-to-r from-gray-900 to-gray-800 relative">
                    <div className="absolute -bottom-10 left-8">
                       <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white overflow-hidden">
                          <img src={profile.img} className="w-full h-full object-cover" />
                       </div>
                    </div>
                 </div>
                 
                 <div className="pt-12 px-8 pb-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                          <label className="text-[10px] uppercase font-bold text-gray-400">Name</label>
                          <input 
                             value={profile.name} 
                             onChange={(e) => handleUpdateProfile('name', e.target.value)}
                             className="w-full font-serif text-2xl font-bold border-b border-transparent hover:border-gray-200 focus:border-black focus:outline-none bg-transparent"
                          />
                       </div>
                       <div>
                          <label className="text-[10px] uppercase font-bold text-gray-400">Role</label>
                          <input 
                             value={profile.role} 
                             onChange={(e) => handleUpdateProfile('role', e.target.value)}
                             className="w-full text-lg border-b border-transparent hover:border-gray-200 focus:border-black focus:outline-none bg-transparent"
                          />
                       </div>
                    </div>

                    <div>
                       <label className="text-[10px] uppercase font-bold text-gray-400">Bio</label>
                       <textarea 
                          value={profile.bio || "Creative professional."} 
                          onChange={(e) => handleUpdateProfile('bio', e.target.value)}
                          className="w-full text-sm text-gray-600 leading-relaxed border border-transparent hover:border-gray-200 focus:border-black focus:outline-none bg-transparent rounded p-2 -ml-2"
                          rows={3}
                       />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin size={16} />
                          <input value={profile.location} onChange={(e) => handleUpdateProfile('location', e.target.value)} className="w-full bg-transparent focus:outline-none border-b border-transparent focus:border-black" />
                       </div>
                       <div className="flex items-center gap-2 text-sm text-gray-600">
                          <DollarSign size={16} />
                          <input value={profile.rate} onChange={(e) => handleUpdateProfile('rate', e.target.value)} className="w-full bg-transparent focus:outline-none border-b border-transparent focus:border-black" />
                       </div>
                       <div className="flex items-center gap-2 text-sm text-gray-600 col-span-2">
                          <Instagram size={16} />
                          <input value={profile.instagram} onChange={(e) => handleUpdateProfile('instagram', e.target.value)} className="w-full bg-transparent focus:outline-none border-b border-transparent focus:border-black" />
                       </div>
                    </div>

                    <div>
                       <label className="text-[10px] uppercase font-bold text-gray-400 mb-2 block">Aesthetic Tags</label>
                       <div className="flex flex-wrap gap-2">
                          {profile.tags.map((tag: string, i: number) => (
                             <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                <Tag size={10} /> {tag}
                             </span>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex gap-4">
                 <Button variant="secondary" onClick={() => setStep('input')} className="flex-1">Start Over</Button>
                 <Button onClick={handlePublish} className="flex-1">Publish Profile</Button>
              </div>
           </div>
        )}

        {/* STEP 4: SUCCESS */}
        {step === 'success' && (
           <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in-95">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                 <Check size={40} />
              </div>
              <h2 className="font-serif text-3xl mb-2">Welcome to the Network.</h2>
              <p className="text-gray-500">Redirecting to directory...</p>
           </div>
        )}

      </div>
    </div>
  );
};
