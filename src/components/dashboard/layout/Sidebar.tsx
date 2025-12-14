
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ListVideo, 
  Package, 
  Settings, 
  Calendar, 
  Users, 
  Clock, 
  Ticket, 
  Grid, 
  Briefcase, 
  CreditCard,
  PlusCircle,
  Image as ImageIcon,
  X
} from 'lucide-react';
import { useUserProfile } from '../../../hooks/useUserProfile';
import { useActiveCampaign } from '../../../contexts/ActiveCampaignContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { profile } = useUserProfile();
  const { activeCampaign } = useActiveCampaign();
  const [user, setUser] = useState(profile);

  useEffect(() => {
    setUser(profile);
    const handleProfileUpdate = () => {
       const saved = localStorage.getItem('user_profile');
       if (saved) setUser(JSON.parse(saved));
    };
    window.addEventListener('profileUpdated', handleProfileUpdate);
    return () => window.removeEventListener('profileUpdated', handleProfileUpdate);
  }, [profile]);

  // Dynamic Menu Items based on Campaign Type
  const isEvent = activeCampaign?.type === 'event';

  const menuItems = isEvent ? [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
    { label: 'Run of Show', href: '/dashboard/timeline', icon: Clock },
    { label: 'Guest List', href: '/dashboard/guests', icon: Users },
    { label: 'Seating', href: '/dashboard/seating', icon: Grid },
    { label: 'Budget', href: '/dashboard/budget', icon: Ticket },
  ] : [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
    { label: 'Shot List', href: '/dashboard/shotlist', icon: ListVideo },
    { label: 'Client Gallery', href: '/dashboard/gallery', icon: ImageIcon },
    { label: 'Products', href: '/dashboard/products', icon: Package },
  ];

  const commonItems = [
    { label: 'Book a Shoot', href: '/shoot-wizard', icon: PlusCircle },
    { label: 'Plan an Event', href: '/event-wizard', icon: Calendar },
  ];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-[#E5E5E5] flex flex-col transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      md:translate-x-0 md:static
    `}>
      {/* Brand Header */}
      <div className="h-20 flex items-center justify-between px-8 border-b border-[#E5E5E5]">
        <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-[#1A1A1A]">
          FashionOS.
        </Link>
        <button onClick={onClose} className="md:hidden text-gray-500 hover:text-black">
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto">
        
        {/* Brand Command Center Link */}
        <div className="mb-6">
           <div className="px-4 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Studio</span>
           </div>
           <Link
              to="/dashboard/brand"
              onClick={onClose}
              className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out ${
                location.pathname === '/dashboard/brand'
                  ? 'bg-[#1A1A1A] text-white shadow-md'
                  : 'text-[#6B7280] hover:bg-[#F7F7F5] hover:text-[#1A1A1A]'
              }`}
           >
              <Briefcase size={18} className="mr-3" />
              Brand Center
           </Link>
        </div>

        <div className="px-4 mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
             {activeCampaign?.title || 'Active Campaign'}
          </span>
        </div>
        
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
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
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Create</span>
        </div>
        {commonItems.map((item) => (
           <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              className="group flex items-center px-4 py-3 text-sm font-medium rounded-lg text-[#6B7280] hover:bg-[#F7F7F5] hover:text-[#1A1A1A] transition-all duration-200"
           >
              <item.icon size={18} className="mr-3 text-[#9CA3AF] group-hover:text-[#1A1A1A]" />
              {item.label}
           </Link>
        ))}

        <div className="px-4 mt-8 mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Workspace</span>
        </div>
        <Link
          to="/dashboard/billing"
          onClick={onClose}
          className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${location.pathname === '/dashboard/billing' ? 'bg-[#F7F7F5] text-[#1A1A1A]' : 'text-[#6B7280] hover:bg-[#F7F7F5] hover:text-[#1A1A1A]'}`}
        >
          <CreditCard size={18} className="mr-3 text-[#9CA3AF] group-hover:text-[#1A1A1A]" />
          Billing & Invoices
        </Link>
        <Link
          to="/dashboard/settings"
          onClick={onClose}
          className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${location.pathname === '/dashboard/settings' ? 'bg-[#F7F7F5] text-[#1A1A1A]' : 'text-[#6B7280] hover:bg-[#F7F7F5] hover:text-[#1A1A1A]'}`}
        >
          <Settings size={18} className="mr-3 text-[#9CA3AF] group-hover:text-[#1A1A1A]" />
          Settings
        </Link>
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-[#E5E5E5]">
        <div className="flex items-center p-3 rounded-xl hover:bg-[#F7F7F5] cursor-pointer transition-colors">
          {user.avatarUrl ? (
             <img src={user.avatarUrl} alt="Profile" className="h-10 w-10 rounded-full object-cover border border-gray-200" />
          ) : (
             <div className="h-10 w-10 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs font-serif font-bold">
               {user.firstName.charAt(0)}{user.lastName.charAt(0)}
             </div>
          )}
          <div className="ml-3 min-w-0">
            <p className="text-sm font-medium text-[#1A1A1A] truncate">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-[#6B7280] truncate">{user.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
