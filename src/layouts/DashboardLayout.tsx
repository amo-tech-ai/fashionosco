
import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Menu, Bell, LogOut, X, Check, Trash2 } from 'lucide-react';
import { ActiveCampaignProvider } from '../contexts/ActiveCampaignContext';
import { NotificationProvider, useNotifications } from '../contexts/NotificationContext';
import { Sidebar } from '../components/dashboard/layout/Sidebar';
import { CommandSearch } from '../components/dashboard/layout/CommandSearch';

// Inner Component to access Context
const DashboardHeader = ({ onMenuClick }: { onMenuClick: () => void }) => {
    const { unreadCount, notifications, markAsRead, markAllAsRead, clearAll } = useNotifications();
    const [showNotifications, setShowNotifications] = useState(false);
    const notifRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNotificationClick = (notification: any) => {
        markAsRead(notification.id);
        if (notification.link) {
            setShowNotifications(false);
            navigate(notification.link);
        }
    };

    return (
        <>
        {/* Mobile Header */}
          <header className="bg-white border-b border-[#E5E5E5] md:hidden sticky top-0 z-30 flex-shrink-0">
            <div className="h-16 flex items-center justify-between px-6">
              <div className="flex items-center gap-4">
                 <button onClick={onMenuClick} className="text-[#1A1A1A]">
                    <Menu size={24} />
                 </button>
                 <span className="font-serif text-xl font-bold text-[#1A1A1A]">FashionOS.</span>
              </div>
              <Link to="/" className="text-sm text-[#6B7280] font-medium">Exit</Link>
            </div>
          </header>

          {/* Desktop Header / Toolbar */}
          <header className="hidden md:flex h-20 items-center justify-between px-8 sticky top-0 bg-[#F7F7F5]/90 backdrop-blur-sm z-20 flex-shrink-0">
              <CommandSearch />
              <div className="flex items-center space-x-6">
                  {/* Notifications */}
                  <div className="relative" ref={notifRef}>
                      <div 
                        className="relative cursor-pointer group"
                        onClick={() => setShowNotifications(!showNotifications)}
                      >
                          <Bell 
                            size={20} 
                            className={`transition-colors ${showNotifications ? 'text-black' : 'text-[#6B7280] group-hover:text-[#1A1A1A]'}`} 
                          />
                          {unreadCount > 0 && (
                            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F7F7F5]"></div>
                          )}
                      </div>

                      {/* Dropdown */}
                      {showNotifications && (
                          <div className="absolute right-0 top-full mt-4 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                  <h3 className="font-bold text-sm">Notifications</h3>
                                  <div className="flex gap-2">
                                     <button onClick={markAllAsRead} className="text-xs text-blue-600 hover:underline" title="Mark all read"><Check size={14}/></button>
                                     <button onClick={clearAll} className="text-xs text-gray-400 hover:text-red-500" title="Clear all"><Trash2 size={14}/></button>
                                  </div>
                              </div>
                              <div className="max-h-80 overflow-y-auto">
                                  {notifications.length === 0 ? (
                                      <div className="p-8 text-center text-gray-400 text-xs">No notifications</div>
                                  ) : (
                                      notifications.map(n => (
                                          <div 
                                            key={n.id} 
                                            onClick={() => handleNotificationClick(n)}
                                            className={`p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors ${n.read ? 'opacity-60' : 'bg-blue-50/10'}`}
                                          >
                                              <div className="flex justify-between items-start mb-1">
                                                  <h4 className={`text-sm ${n.read ? 'font-medium' : 'font-bold text-blue-900'}`}>{n.title}</h4>
                                                  <span className="text-[10px] text-gray-400">{new Date(n.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                              </div>
                                              <p className="text-xs text-gray-500 line-clamp-2">{n.message}</p>
                                          </div>
                                      ))
                                  )}
                              </div>
                          </div>
                      )}
                  </div>

                  <Link to="/" className="text-sm font-medium text-[#6B7280] hover:text-[#1A1A1A] transition-colors flex items-center gap-2 group">
                      <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
                      <span>Return to Site</span>
                  </Link>
              </div>
          </header>
        </>
    );
};

export const DashboardLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <ActiveCampaignProvider>
      <NotificationProvider>
        <div className="min-h-screen bg-[#F7F7F5] flex font-sans text-[#1A1A1A] overflow-hidden">
          
          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
          )}

          {/* Modular Sidebar */}
          <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-h-screen transition-all duration-200 w-full relative h-screen overflow-hidden">
            
            <DashboardHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
            
            {/* Scrollable Main Content */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
              <Outlet />
            </main>
          </div>
        </div>
      </NotificationProvider>
    </ActiveCampaignProvider>
  );
};
