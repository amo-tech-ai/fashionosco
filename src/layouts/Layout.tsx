
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { NavItem } from '../types';
import { Button } from '../components/Button';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Directory', href: '/directory' }, 
  { label: 'Marketplace', href: '/marketplace' }, 
  { label: 'Wholesale', href: '/wholesale/apply' }, // New Link
  { label: 'BTS', href: '/bts' }, 
];

export const Layout: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black selection:bg-black selection:text-white">
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
                          className={`flex items-center text-xs font-medium uppercase tracking-widest hover:text-gray-600 transition-colors ${
                             isActive ? 'text-black border-b border-black pb-1' : 'text-gray-500'
                          }`}
                       >
                          {item.label}
                          <ChevronDown className="w-3 h-3 ml-1 opacity-50" />
                       </Link>
                       
                       {/* Dropdown Menu */}
                       <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <div className="py-2">
                             <Link to="/services" className="block px-6 py-3 text-xs uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-black transition-colors border-b border-gray-50">All Services</Link>
                             <Link to="/services/product-photography" className="block px-6 py-3 text-xs uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-black transition-colors">Product Photography</Link>
                             <Link to="/services/clothing-photography" className="block px-6 py-3 text-xs uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-black transition-colors">Clothing Photography</Link>
                             <Link to="/services/ecommerce" className="block px-6 py-3 text-xs uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-black transition-colors">Ecommerce Photography</Link>
                             <Link to="/services/creative-still-life" className="block px-6 py-3 text-xs uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-black transition-colors">Creative Still Life</Link>
                             <Link to="/services/video-production" className="block px-6 py-3 text-xs uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-black transition-colors">Video Production</Link>
                             <Link to="/services/instagram" className="block px-6 py-3 text-xs uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-black transition-colors">Instagram Services</Link>
                          </div>
                       </div>
                    </div>
                 );
              }

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`text-xs font-medium uppercase tracking-widest hover:text-gray-600 transition-colors ${
                    isActive ? 'text-black border-b border-black pb-1' : 'text-gray-500'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
             <Link to="/login" className="hidden md:block text-xs uppercase tracking-widest font-semibold hover:text-gray-600">
                Log In
             </Link>
             <Link to="/shoot-wizard">
                <Button className="hidden md:inline-flex py-2 px-4 text-[10px]">Book a Shoot</Button>
             </Link>
             
             {/* Mobile Menu Toggle */}
             <button 
                className="md:hidden p-2 z-50 relative text-black"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             >
                {isMobileMenuOpen ? <X /> : <Menu />}
             </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 md:hidden animate-in slide-in-from-top-10 duration-200 overflow-y-auto">
             <nav className="flex flex-col space-y-6">
                {navItems.map((item) => (
                   <div key={item.label}>
                      <Link
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-3xl font-serif font-medium border-b border-gray-100 pb-4 block hover:text-gray-600 transition-colors"
                      >
                         {item.label}
                      </Link>
                      {item.label === 'Services' && (
                         <div className="pl-4 pt-4 space-y-4 flex flex-col border-l border-gray-100 ml-2">
                            <Link to="/services/product-photography" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black flex items-center">Product Photography <ArrowRight className="w-3 h-3 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></Link>
                            <Link to="/services/clothing-photography" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black">Clothing Photography</Link>
                            <Link to="/services/ecommerce" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black">Ecommerce Photography</Link>
                            <Link to="/services/creative-still-life" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black">Creative Still Life</Link>
                            <Link to="/services/video-production" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black">Video Production</Link>
                            <Link to="/services/instagram" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black">Instagram Services</Link>
                         </div>
                      )}
                   </div>
                ))}
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif font-medium border-b border-gray-100 pb-4 block">
                   Log In
                </Link>
                <div className="pt-8 pb-12">
                   <Link to="/shoot-wizard" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full justify-center py-4 text-sm">Book a Shoot</Button>
                   </Link>
                </div>
             </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      {/* Editorial Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 pt-20 pb-12">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold">FashionOS.</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                Connecting the fashion industry through AI-powered creativity and storytelling.
              </p>
              <div className="flex space-x-4">
                 {/* Social Placeholders */}
                 {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer text-xs rounded-full">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                 ))}
              </div>
            </div>
            
            <div>
               <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Explore</h4>
               <ul className="space-y-4 text-sm text-gray-500">
                  <li><Link to="/" className="hover:text-black transition-colors">Home</Link></li>
                  <li><Link to="/services" className="hover:text-black transition-colors">Services</Link></li>
                  <li><Link to="/directory" className="hover:text-black transition-colors">Directory</Link></li>
                  <li><Link to="/marketplace" className="hover:text-black transition-colors">Marketplace</Link></li>
                  <li><Link to="/wholesale/apply" className="hover:text-black transition-colors">Wholesale</Link></li>
               </ul>
            </div>

            <div>
               <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Services</h4>
               <ul className="space-y-4 text-sm text-gray-500">
                  <li><Link to="/services/product-photography" className="hover:text-black transition-colors">Product Photography</Link></li>
                  <li><Link to="/services/clothing-photography" className="hover:text-black transition-colors">Clothing Photography</Link></li>
                  <li><Link to="/services/ecommerce" className="hover:text-black transition-colors">Ecommerce Photography</Link></li>
                  <li><Link to="/services/creative-still-life" className="hover:text-black transition-colors">Creative Still Life</Link></li>
                  <li><Link to="/services/video-production" className="hover:text-black transition-colors">Video Production</Link></li>
                  <li><Link to="/services/instagram" className="hover:text-black transition-colors">Instagram Services</Link></li>
               </ul>
            </div>

            <div>
               <h4 className="text-xs font-bold uppercase tracking-widest mb-6">For Creators</h4>
               <ul className="space-y-4 text-sm text-gray-500">
                  <li><Link to="/shoot-wizard" className="hover:text-black transition-colors font-bold text-black">Start Booking</Link></li>
                  <li><Link to="/login" className="hover:text-black transition-colors">Studio Login</Link></li>
                  <li><Link to="/directory" className="hover:text-black transition-colors">Join Directory</Link></li>
               </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
            <p>&copy; 2025 FashionOS. All rights reserved.</p>
            <div className="space-x-6 mt-4 md:mt-0">
               <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
