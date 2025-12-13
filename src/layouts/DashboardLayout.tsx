
import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ListVideo, 
  Package, 
  Settings, 
  LogOut, 
  Bell,
  Search,
  PlusCircle,
  Image as ImageIcon
} from 'lucide-react';
import { useUserProfile } from '../hooks/useUserProfile';

const sidebarItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Book a Shoot', href: '/shoot-wizard', icon: PlusCircle },
  { label: 'Shot List', href: '/dashboard/shotlist', icon: ListVideo },
  { label: 'Client Gallery', href: '/dashboard/gallery', icon: ImageIcon },
  { label: 'Products', href: '/dashboard/products', icon: Package },
];

export const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const { profile } = useUserProfile();
  const [user, setUser] = useState(profile);

  // Listen for profile updates from other tabs/components
  useEffect(() => {
    setUser(profile);
    const handleProfileUpdate = () => {
       const saved = localStorage.getItem('user_profile');
       if (saved) setUser(JSON.parse(saved));
    };
    window.addEventListener('profileUpdated', handleProfileUpdate);
    return () => window.removeEventListener('profileUpdated', handleProfileUpdate);
  }, [profile]);

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex font-sans text-[#1A1A1A]">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-[#E5E5E5] hidden md:flex flex-col fixed h-full z-20">
        {/* Brand Header */}
        <div className="h-20 flex items-center px-8 border-b border-[#E5E5E5]">
          <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-[#1A1A1A]">
            FashionOS.
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto">
          <div className="px-4 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Campaigns</span>
          </div>
          
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out ${
                  isActive
                    ? 'bg-[#F7F7F5] text-[#1A1A1A]'
                    : 'text-[#6B7280] hover:bg-[#F7F7F5] hover:text-[#1A1A1A]'
                }`}
              >
                <item.icon 
                  size={18} 
                  className={`mr-3 transition-colors ${isActive ? 'text-[#1A1A1A]' : 'text-[#9CA3AF] group-hover:text-[#1A1A1A]'}`} 
                />
                {item.label}
              </Link>
            );
          })}

          <div className="px-4 mt-8 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Workspace</span>
          </div>
          <Link
            to="/dashboard/settings"
            className="group flex items-center px-4 py-3 text-sm font-medium rounded-lg text-[#6B7280] hover:bg-[#F7F7F5] hover:text-[#1A1A1A] transition-all duration-200"
          >
            <Settings size={18} className="mr-3 text-[#9CA3AF] group-hover:text-[#1A1A1A]" />
            Settings
          </Link>
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-[#E5E5E5]">
          <div className="flex items-center p-3 rounded-xl hover:bg-[#F7F7F5] cursor-pointer transition-colors">
            <div className="h-10 w-10 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs font-serif font-bold">
              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-sm font-medium text-[#1A1A1A] truncate">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-[#6B7280] truncate">{user.role}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-72 flex flex-col min-h-screen transition-all duration-200">
        {/* Mobile Header */}
        <header className="bg-white border-b border-[#E5E5E5] md:hidden sticky top-0 z-30">
          <div className="h-16 flex items-center justify-between px-6">
            <span className="font-serif text-xl font-bold text-[#1A1A1A]">FashionOS.</span>
            <Link to="/" className="text-sm text-[#6B7280] font-medium">Exit</Link>
          </div>
        </header>

        {/* Desktop Header / Toolbar */}
        <header className="hidden md:flex h-20 items-center justify-between px-8 sticky top-0 bg-[#F7F7F5]/90 backdrop-blur-sm z-10">
            <div className="flex items-center w-full max-w-md bg-white border border-[#E5E5E5] rounded-lg px-4 py-2 shadow-sm focus-within:ring-1 focus-within:ring-[#1A1A1A] transition-all">
                <Search size={16} className="text-[#9CA3AF]" />
                <input 
                    type="text" 
                    placeholder="Search campaigns, shots, or products..." 
                    className="ml-3 w-full bg-transparent border-none text-sm placeholder-[#9CA3AF] focus:outline-none text-[#1A1A1A]" 
                />
            </div>
            <div className="flex items-center space-x-6">
                <div className="relative">
                    <Bell size={20} className="text-[#6B7280] hover:text-[#1A1A1A] cursor-pointer transition-colors" />
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F7F7F5]"></div>
                </div>
                <Link to="/" className="text-sm font-medium text-[#6B7280] hover:text-[#1A1A1A] transition-colors flex items-center gap-2">
                    <LogOut size={16} />
                    <span>Return to Site</span>
                </Link>
            </div>
        </header>
        
        <main className="flex-1 overflow-hidden h-[calc(100vh-80px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
