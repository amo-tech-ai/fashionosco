
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/Button';
import { User, Bell, Lock, Building, CreditCard, Save, RefreshCcw, Upload, X, Server, Database, Cpu } from 'lucide-react';
import { useToast } from '../components/ToastProvider';
import { useUserProfile } from '../hooks/useUserProfile';
import { StorageService } from '../services/storage';
import { checkSystemStatus, SystemStatus } from '../utils/systemStatus';

export const Settings: React.FC = () => {
  const { addToast } = useToast();
  const { profile, saveProfile } = useUserProfile();
  const [formData, setFormData] = useState(profile);
  const [isLoading, setIsLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync form data when profile loads
  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  // Check System Status
  useEffect(() => {
    checkSystemStatus().then(setSystemStatus);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await saveProfile(formData);
      addToast("Profile settings updated successfully", "success");
    } catch (e) {
      addToast("Failed to save settings", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const publicUrl = await StorageService.uploadFile(file, 'avatars');
        if (publicUrl) {
            setFormData(prev => ({ ...prev, avatarUrl: publicUrl }));
            addToast("Avatar uploaded. Click Save to confirm.", "info");
        } else {
            throw new Error("Upload returned no URL");
        }
      } catch (err) {
        console.error(err);
        addToast("Failed to upload image. Ensure you are logged in.", "error");
      }
    }
  };

  const handleRemoveAvatar = () => {
    setFormData(prev => ({ ...prev, avatarUrl: undefined }));
  };

  const handleResetDemo = () => {
    if (confirm("Are you sure? This will delete all local data.")) {
        localStorage.clear();
        window.location.reload();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl p-6 md:p-0">
      <div>
        <h1 className="font-serif text-3xl text-[#1A1A1A]">Settings</h1>
        <p className="text-sm text-[#6B7280]">Manage your profile and studio preferences.</p>
      </div>

      <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
          {/* Sidebar */}
          <div className="md:col-span-4 border-r border-[#E5E5E5] bg-[#F7F7F5]/50 p-4">
            <nav className="space-y-1">
              {[
                { icon: User, label: "My Profile", active: true },
                { icon: Building, label: "Studio Details", active: false },
                { icon: Server, label: "System Health", active: false },
                { icon: Bell, label: "Notifications", active: false },
                { icon: CreditCard, label: "Billing & Plans", active: false },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    item.active 
                      ? 'bg-white text-[#1A1A1A] shadow-sm border border-[#E5E5E5]' 
                      : 'text-[#6B7280] hover:bg-[#F7F7F5] hover:text-[#1A1A1A]'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </nav>
            
            {/* System Status Mini Widget */}
            <div className="mt-8 px-4">
               <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">System Status</div>
               <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${systemStatus?.mode === 'live' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                  <span className="text-xs font-medium text-gray-600 capitalize">{systemStatus?.mode || 'Checking...'} Mode</span>
               </div>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-8 p-8 space-y-8 overflow-y-auto">
            
            {/* System Health Section (Visual only for now, integrated into main flow) */}
            <div className="grid grid-cols-3 gap-4 mb-8">
               <div className="p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                  <div className="flex items-center gap-2 mb-2 text-gray-500">
                     <Database size={14} />
                     <span className="text-[10px] font-bold uppercase tracking-widest">Database</span>
                  </div>
                  <div className={`text-sm font-bold ${systemStatus?.supabaseConnected ? 'text-green-600' : 'text-orange-500'}`}>
                     {systemStatus?.supabaseConnected ? 'Connected' : 'Local Storage'}
                  </div>
               </div>
               <div className="p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                  <div className="flex items-center gap-2 mb-2 text-gray-500">
                     <Cpu size={14} />
                     <span className="text-[10px] font-bold uppercase tracking-widest">AI Engine</span>
                  </div>
                  <div className={`text-sm font-bold ${systemStatus?.aiConfigured ? 'text-green-600' : 'text-orange-500'}`}>
                     {systemStatus?.aiConfigured ? 'Active' : 'Demo Mode'}
                  </div>
               </div>
               <div className="p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                  <div className="flex items-center gap-2 mb-2 text-gray-500">
                     <Server size={14} />
                     <span className="text-[10px] font-bold uppercase tracking-widest">Latency</span>
                  </div>
                  <div className="text-sm font-bold text-gray-800">
                     24ms
                  </div>
               </div>
            </div>

            {/* Profile Section */}
            <div>
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">My Profile</h3>
              <p className="text-sm text-[#6B7280] mb-6">Manage your personal information.</p>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="relative group">
                   {formData.avatarUrl ? (
                      <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200">
                         <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                         <button 
                           onClick={handleRemoveAvatar}
                           className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                         >
                            <X size={20} />
                         </button>
                      </div>
                   ) : (
                      <div className="w-20 h-20 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xl font-serif">
                        {formData.firstName?.charAt(0) || 'U'}{formData.lastName?.charAt(0) || 'N'}
                      </div>
                   )}
                </div>
                
                <div className="flex gap-3">
                  <input 
                     type="file" 
                     ref={fileInputRef} 
                     onChange={handleAvatarUpload} 
                     accept="image/*" 
                     className="hidden" 
                  />
                  <Button variant="secondary" className="text-xs h-9 px-4" onClick={() => fileInputRef.current?.click()}>
                     <Upload size={14} className="mr-2" /> Upload New
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">First Name</label>
                    <input 
                      name="firstName"
                      type="text" 
                      value={formData.firstName} 
                      onChange={handleChange}
                      className="w-full border border-[#E5E5E5] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Last Name</label>
                    <input 
                      name="lastName"
                      type="text" 
                      value={formData.lastName} 
                      onChange={handleChange}
                      className="w-full border border-[#E5E5E5] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Email Address</label>
                  <input 
                    name="email"
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange}
                    className="w-full border border-[#E5E5E5] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Role</label>
                  <input 
                    type="text" 
                    value={formData.role} 
                    disabled 
                    className="w-full border border-[#E5E5E5] bg-[#F7F7F5] rounded-lg px-4 py-2.5 text-sm text-[#9CA3AF] cursor-not-allowed" 
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5E5E5] flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
              <button 
                onClick={handleResetDemo}
                className="text-red-500 text-xs font-bold uppercase tracking-widest hover:text-red-700 flex items-center gap-2"
              >
                <RefreshCcw size={14} /> Clear Local Cache
              </button>
              
              <Button onClick={handleSave} isLoading={isLoading} className="w-full sm:w-auto">
                <Save size={16} className="mr-2" /> Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
