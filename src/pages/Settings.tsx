
import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { User, Bell, Lock, Building, CreditCard, Save, RefreshCcw } from 'lucide-react';
import { useToast } from '../components/ToastProvider';
import { useUserProfile } from '../hooks/useUserProfile';

export const Settings: React.FC = () => {
  const { addToast } = useToast();
  const { profile, saveProfile } = useUserProfile();
  const [formData, setFormData] = useState(profile);
  const [isLoading, setIsLoading] = useState(false);

  // Sync form data when profile loads
  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      saveProfile(formData);
      setIsLoading(false);
      addToast("Profile settings updated successfully", "success");
    }, 800);
  };

  const handleResetDemo = () => {
    if (confirm("Are you sure? This will delete all booking drafts, gallery selections, and generated data.")) {
        localStorage.clear();
        window.location.reload();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      <div>
        <h1 className="font-serif text-3xl text-[#1A1A1A]">Settings</h1>
        <p className="text-sm text-[#6B7280]">Manage your profile and studio preferences.</p>
      </div>

      <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
          {/* Sidebar */}
          <div className="md:col-span-4 border-r border-[#E5E5E5] bg-[#F7F7F5]/50 p-4">
            <nav className="space-y-1">
              {[
                { icon: User, label: "My Profile", active: true },
                { icon: Building, label: "Studio Details", active: false },
                { icon: Bell, label: "Notifications", active: false },
                { icon: CreditCard, label: "Billing & Plans", active: false },
                { icon: Lock, label: "Password & Security", active: false },
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
          </div>

          {/* Content */}
          <div className="md:col-span-8 p-8 space-y-8">
            {/* Profile Section */}
            <div>
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">My Profile</h3>
              <p className="text-sm text-[#6B7280] mb-6">Manage your personal information.</p>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xl font-serif">
                  {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                </div>
                <div>
                  <Button variant="secondary" className="text-xs h-8">Change Avatar</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">First Name</label>
                    <input 
                      name="firstName"
                      type="text" 
                      value={formData.firstName} 
                      onChange={handleChange}
                      className="w-full border border-[#E5E5E5] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A1A1A]" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Last Name</label>
                    <input 
                      name="lastName"
                      type="text" 
                      value={formData.lastName} 
                      onChange={handleChange}
                      className="w-full border border-[#E5E5E5] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A1A1A]" 
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
                    className="w-full border border-[#E5E5E5] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A1A1A]" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Role</label>
                  <input type="text" value={formData.role} disabled className="w-full border border-[#E5E5E5] bg-[#F7F7F5] rounded-lg px-4 py-2.5 text-sm text-[#9CA3AF] cursor-not-allowed" />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5E5E5] flex justify-between items-center">
              <button 
                onClick={handleResetDemo}
                className="text-red-500 text-xs font-bold uppercase tracking-widest hover:text-red-700 flex items-center gap-2"
              >
                <RefreshCcw size={14} /> Reset Demo Data
              </button>
              
              <Button onClick={handleSave} isLoading={isLoading}>
                <Save size={16} className="mr-2" /> Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
