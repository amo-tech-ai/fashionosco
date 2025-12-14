
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Command } from 'lucide-react';
import { useCampaigns } from '../../../hooks/useCampaigns';
import { useActiveCampaign } from '../../../contexts/ActiveCampaignContext';

export const CommandSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { campaigns } = useCampaigns();
  const { setActiveCampaignId } = useActiveCampaign();
  const containerRef = useRef<HTMLDivElement>(null);

  // Static Navigation Options
  const staticResults = [
    { type: 'Page', title: 'Dashboard Overview', path: '/dashboard' },
    { type: 'Page', title: 'Settings', path: '/dashboard/settings' },
    { type: 'Page', title: 'Inventory / Products', path: '/dashboard/products' },
    { type: 'Action', title: 'Book New Shoot', path: '/shoot-wizard' },
    { type: 'Action', title: 'Plan New Event', path: '/event-wizard' },
  ];

  // Filter Logic
  const filteredResults = [
    ...staticResults.filter(r => r.title.toLowerCase().includes(query.toLowerCase())),
    ...campaigns.filter(c => c.title.toLowerCase().includes(query.toLowerCase())).map(c => ({
      type: 'Project',
      title: c.title,
      path: '/dashboard',
      action: () => setActiveCampaignId(c.id)
    }))
  ].slice(0, 8); // Limit results

  // Click Outside Handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: any) => {
    if (item.action) item.action();
    navigate(item.path);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md" ref={containerRef}>
      <div className="flex items-center bg-white border border-[#E5E5E5] rounded-lg px-4 py-2 shadow-sm focus-within:ring-1 focus-within:ring-[#1A1A1A] transition-all group">
        <Search size={16} className="text-[#9CA3AF] group-focus-within:text-[#1A1A1A] transition-colors" />
        <input 
          type="text" 
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search campaigns, pages, or actions..." 
          className="ml-3 w-full bg-transparent border-none text-sm placeholder-[#9CA3AF] focus:outline-none text-[#1A1A1A]" 
        />
        <div className="hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded border border-gray-200 bg-gray-50 text-[10px] text-gray-400 font-medium">
           <Command size={10} /> K
        </div>
      </div>

      {isOpen && query.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-80 overflow-y-auto z-50 animate-in fade-in slide-in-from-top-2">
          {filteredResults.length === 0 ? (
            <div className="p-4 text-center text-xs text-gray-400">No results found.</div>
          ) : (
            <div className="py-2">
              {filteredResults.map((result, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(result)}
                  className="w-full text-left px-4 py-3 hover:bg-[#F7F7F5] flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${result.type === 'Project' ? 'bg-purple-500' : 'bg-gray-300'}`}></div>
                    <div>
                      <div className="text-sm font-medium text-[#1A1A1A]">{result.title}</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider">{result.type}</div>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-black opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
