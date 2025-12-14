
import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu, Bell, LogOut } from 'lucide-react';
import { ActiveCampaignProvider } from '../contexts/ActiveCampaignContext';
import { useToast } from '../components/ToastProvider';
import { Sidebar } from '../components/dashboard/layout/Sidebar';
import { CommandSearch } from '../components/dashboard/layout/CommandSearch';

export const DashboardLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { addToast } = useToast();

  const handleNotifications = () => {
    addToast("No new notifications.", "info");
  };

  return (
    <ActiveCampaignProvider>
      <div className="min-h-screen bg-[#F7F7F5] flex font-sans text-[#1A1A1A]">
        
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
        )}

        <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen transition-all duration-200 w-full">
          {/* Mobile Header */}
          <header className="bg-white border-b border-[#E5E5E5] md:hidden sticky top-0 z-30">
            <div className="h-16 flex items-center justify-between px-6">
              <div className="flex items-center gap-4">
                 <button onClick={() => setIsMobileMenuOpen(true)} className="text-[#1A1A1A]">
                    <Menu size={24} />
                 </button>
                 <span className="font-serif text-xl font-bold text-[#1A1A1A]">FashionOS.</span>
              </div>
              <Link to="/" className="text-sm text-[#6B7280] font-medium">Exit</Link>
            </div>
          </header>

          {/* Desktop Header / Toolbar */}
          <header className="hidden md:flex h-20 items-center justify-between px-8 sticky top-0 bg-[#F7F7F5]/90 backdrop-blur-sm z-10">
              <CommandSearch />
              <div className="flex items-center space-x-6">
                  <div className="relative">
                      <Bell 
                        size={20} 
                        className="text-[#6B7280] hover:text-[#1A1A1A] cursor-pointer transition-colors" 
                        onClick={handleNotifications}
                      />
                      <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F7F7F5]"></div>
                  </div>
                  <Link to="/" className="text-sm font-medium text-[#6B7280] hover:text-[#1A1A1A] transition-colors flex items-center gap-2">
                      <LogOut size={16} />
                      <span>Return to Site</span>
                  </Link>
              </div>
          </header>
          
          <main className="flex-1 overflow-hidden h-[calc(100vh-64px)] md:h-[calc(100vh-80px)]">
            <Outlet />
          </main>
        </div>
      </div>
    </ActiveCampaignProvider>
  );
};
