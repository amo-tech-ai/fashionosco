import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { NavItem, ButtonVariant } from '../types';
import { Button } from '../components/Button';
import { Menu, X, ChevronDown, ArrowRight, Layers } from 'lucide-react';
import { AssistantPanel } from '../components/assistant/AssistantPanel';
import { AssistantFAB } from '../components/assistant/AssistantFAB';
import { AssistantProvider } from '../contexts/AssistantContext';

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Directory', href: '/directory' }, 
  { label: 'Marketplace', href: '/marketplace' }, 
  { label: 'Wholesale', href: '/wholesale/apply' }, 
  { label: 'BTS', href: '/bts' }, 
];

export const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);

  return (
    <AssistantProvider>
      <div className="min-h-screen flex flex-col bg-white text-black selection:bg-black selection:text-white relative font-sans">
        {/* Editorial Header */}
        <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
            
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 z-50">
              <span className="font-serif text-2xl font-bold tracking-tight">FashionOS.</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
                
                if (item.label === 'Services') {
                   return (
                      <div 
                         key={item.label} 
                         className="relative group h-20 flex items-center"
                         onMouseEnter={() => setIsServicesHovered(true)}
                         onMouseLeave={() => setIsServicesHovered(false)}
                      >
                         <Link
                            to={item.href}
                            className={`flex items-center text-xs font-bold uppercase tracking-widest hover:text-gray-600 transition-colors ${
                               isActive ? 'text-black border-b-2 border-black pb-1' : 'text-gray-400'
                            }`}
                         >
                            {item.label}
                            <ChevronDown className="w-3 h-3 ml-1 opacity-50" />
                         </Link>
                         
                         <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                            <div className="py-2">
                               <Link to="/services" className="block px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-black transition-colors border-b border-gray-50">All Services</Link>
                               <Link to="/services/product-photography" className="block px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-black transition-colors">Product Photography</Link>
                               <Link to="/services/clothing-photography" className="block px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-black transition-colors">Clothing Photography</Link>
                               <Link to="/services/ecommerce" className="block px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-black transition-colors">Ecommerce Photography</Link>
                               <Link to="/services/creative-still-life" className="block px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-black transition-colors">Creative Still Life</Link>
                               <Link to="/services/video-production" className="block px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-black transition-colors">Video Production</Link>
                               <Link to="/services/instagram" className="block px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-black transition-colors">Instagram Services</Link>
                            </div>
                         </div>
                      </div>
                   );
                }

                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`text-xs font-bold uppercase tracking-widest hover:text-gray-600 transition-colors ${
                      isActive ? 'text-black border-b-2 border-black pb-1' : 'text-gray-400'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center space-x-4">
               <Link to="/login" className="hidden md:block text-xs uppercase tracking-widest font-black hover:text-gray-600">
                  Log In
               </Link>
               
               <Button
                  onClick={() => navigate("/create-profile")}
                  variant={ButtonVariant.SECONDARY}
                  className="hidden md:inline-flex px-5 py-2 text-[10px] h-auto transform hover:scale-105 active:scale-95 transition-all duration-200"
               >
                  Get Started
               </Button>

               <Link to="/shoot-wizard">
                  <Button className="hidden md:inline-flex py-2 px-4 text-[10px] hover:ring-2 hover:ring-black hover:ring-offset-1 active:scale-95 transition-all duration-200">
                    Initialize Campaign
                  </Button>
               </Link>
               
               <button 
                  className="md:hidden p-2 z-50 relative text-black"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
               >
                  {isMobileMenuOpen ? <X /> : <Menu />}
               </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 md:hidden animate-in slide-in-from-top-10 duration-200 overflow-y-auto">
               <nav className="flex flex-col space-y-6">
                  {navItems.map((item) => (
                     <div key={item.label}>
                        <Link
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-4xl font-serif font-bold border-b border-gray-100 pb-6 block hover:text-gray-600 transition-colors"
                        >
                           {item.label}
                        </Link>
                     </div>
                  ))}
                  <div className="pt-8 grid grid-cols-1 gap-4">
                     <Link to="/architecture" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-500">
                        <Layers size={18} /> OS Architecture
                     </Link>
                  </div>
               </nav>
            </div>
          )}
        </header>

        <main className="flex-grow pt-20">
          <Outlet />
        </main>

        <footer className="bg-gray-50 border-t border-gray-200 pt-32 pb-12">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="space-y-6">
                  <h3 className="font-serif text-3xl font-bold">FashionOS.</h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xs">Connecting the fashion industry through AI-powered creativity and storytelling.</p>
                </div>
                <div>
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8">System</h4>
                   <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                      <li><Link to="/" className="hover:text-black">Home</Link></li>
                      <li><Link to="/services" className="hover:text-black">Services</Link></li>
                      <li><Link to="/directory" className="hover:text-black">Directory</Link></li>
                      <li><Link to="/architecture" className="hover:text-black flex items-center gap-2">Architecture <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div></Link></li>
                   </ul>
                </div>
                <div>
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8">Platforms</h4>
                   <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                      <li><Link to="/shoot-wizard" className="hover:text-black">Shoot Wizard</Link></li>
                      <li><Link to="/event-wizard" className="hover:text-black">Event Wizard</Link></li>
                      <li><Link to="/marketplace" className="hover:text-black">Marketplace</Link></li>
                   </ul>
                </div>
                <div>
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8">Intelligence</h4>
                   <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                      <li><Link to="/create-profile" className="hover:text-black">AI Brand Audit</Link></li>
                      <li><Link to="/services/instagram" className="hover:text-black">Viral Scorer</Link></li>
                      <li><Link to="/bts" className="hover:text-black">Behind the Scenes</Link></li>
                   </ul>
                </div>
             </div>
             <div className="border-t border-gray-200 pt-8 text-[10px] font-bold uppercase tracking-widest text-gray-400 flex justify-between items-center">
                <p>&copy; 2025 FashionOS. Architecture v2.2.0</p>
                <div className="flex gap-6">
                   <a href="#" className="hover:text-black">Privacy</a>
                   <a href="#" className="hover:text-black">Terms</a>
                </div>
             </div>
          </div>
        </footer>

        {/* Global Assistant UI */}
        <AssistantFAB />
        <AssistantPanel />
      </div>
    </AssistantProvider>
  );
};