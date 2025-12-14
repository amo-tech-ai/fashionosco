
import React from 'react';
import { Button } from '../components/Button';
import { ButtonVariant } from '../types';
import { ShoppingBag, Camera, Video, Instagram, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PACKAGES = [
  {
    id: 'starter-lookbook',
    title: 'Lookbook Starter',
    category: 'Photography',
    price: '$2,500',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2874&auto=format&fit=crop',
    description: 'Perfect for emerging brands launching a new collection.',
    includes: ['Half-day Studio Shoot', '1 Model included', '10 Retouched Images', 'Online Gallery'],
    icon: Camera,
    config: {
        shootType: 'lookbook',
        numberOfItems: 10,
        modelNeeded: true,
        finalImagesCount: 10
    }
  },
  {
    id: 'campaign-launch',
    title: 'Campaign Launch',
    category: 'Campaign',
    price: '$5,800',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2940&auto=format&fit=crop',
    description: 'Full-scale editorial production for seasonal launches.',
    includes: ['Full-day Location Shoot', 'Model & Stylist included', '20 Campaign Images', '3 Social Teasers (Video)'],
    icon: Camera,
    config: {
        shootType: 'campaign',
        numberOfItems: 25,
        modelNeeded: true,
        stylingNeeded: 'stylist',
        videoAddOn: true,
        finalImagesCount: 20
    }
  },
  {
    id: 'ecom-scale',
    title: 'Ecommerce Scale',
    category: 'E-Commerce',
    price: '$1,500/day',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=2942&auto=format&fit=crop',
    description: 'High-volume product photography optimized for sales.',
    includes: ['Up to 40 Products/Day', 'Ghost Mannequin or Flatlay', 'Standard Retouching', 'Shopify-Ready Exports'],
    icon: ShoppingBag,
    config: {
        shootType: 'product',
        numberOfItems: 40,
        location: 'studio',
        retouchingLevel: 'basic'
    }
  },
  {
    id: 'social-growth',
    title: 'Social Growth',
    category: 'Social',
    price: '$3,200/mo',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2874&auto=format&fit=crop',
    description: 'Monthly content creation to keep your feed alive.',
    includes: ['2 Shooting Days/Month', '15 Reels/TikToks', '30 Stills', 'Caption Strategy'],
    icon: Instagram,
    config: {
        shootType: 'video',
        videoAddOn: true,
        finalImagesCount: 30
    }
  },
  {
    id: 'video-feature',
    title: 'Brand Film',
    category: 'Video',
    price: '$4,500',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2942&auto=format&fit=crop',
    description: 'Cinematic storytelling to define your brand identity.',
    includes: ['Script & Storyboard', '4K Cinema Production', 'Color Grading', '30s, 15s, 6s Cuts'],
    icon: Video,
    config: {
        shootType: 'video',
        location: 'on-location',
        videoAddOn: true
    }
  },
  {
    id: 'runway-coverage',
    title: 'Runway Report',
    category: 'Event',
    price: '$2,800',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2788&auto=format&fit=crop',
    description: 'Comprehensive coverage of your show or presentation.',
    includes: ['Runway Photography', 'Backstage BTS', 'Same-Day Delivery', 'Press Selects'],
    icon: Camera,
    config: {
        shootType: 'runway',
        turnaround: 'rush',
        finalImagesCount: 50
    }
  }
];

export const Marketplace: React.FC = () => {
  const navigate = useNavigate();

  const handleBook = (pkg: any) => {
      // Clear existing wizard state if needed (handled by Context useEffect)
      navigate('/shoot-wizard', { state: { prefill: pkg.config } });
  };

  return (
    <div className="bg-[#F7F7F5] min-h-screen pt-24 pb-20 font-sans text-[#1A1A1A]">
      
      {/* Header */}
      <section className="px-6 mb-16 text-center max-w-4xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 block">The Shop</span>
        <h1 className="font-serif text-5xl md:text-6xl mb-6">Production Packages.</h1>
        <p className="text-gray-500 text-lg font-light leading-relaxed">
          Streamlined service bundles designed for speed and impact. <br/>Select a package to fast-track your booking.
        </p>
      </section>

      {/* Grid */}
      <section className="px-6 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PACKAGES.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
              
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-sm z-20 flex items-center gap-2">
                  <pkg.icon size={12} /> {pkg.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-2xl">{pkg.title}</h3>
                  <span className="text-lg font-bold">{pkg.price}</span>
                </div>
                
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                  {pkg.description}
                </p>

                <div className="space-y-3 mb-8 flex-1">
                  {pkg.includes.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                        <Check size={10} className="text-black" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={() => handleBook(pkg)} 
                  className="w-full justify-center group-hover:bg-purple-600 group-hover:border-purple-600 group-hover:text-white transition-colors"
                >
                  Book Package
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom CTA */}
      <section className="px-6 mt-24">
        <div className="bg-black text-white rounded-2xl p-12 md:p-20 text-center max-w-[1440px] mx-auto relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-purple-900/30 rounded-full blur-[100px]"></div>
           <div className="relative z-10">
              <h2 className="font-serif text-4xl md:text-5xl mb-6">Need something bespoke?</h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                 Our producers can build a custom package tailored to your specific campaign requirements and budget.
              </p>
              <Button 
                variant={ButtonVariant.SECONDARY} 
                onClick={() => navigate('/shoot-wizard')}
                className="bg-white text-black hover:bg-gray-200"
              >
                 Start Custom Brief <ArrowRight size={16} className="ml-2" />
              </Button>
           </div>
        </div>
      </section>

    </div>
  );
};
