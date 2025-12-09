import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export const ClothingFAQ: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How does ghost mannequin photography work?",
      a: "We photograph your garment on a mannequin and then remove it in post-production. The result is a clean, 3D look that shows the fit and structure, perfect for ecommerce."
    },
    {
      q: "What's your turnaround time?",
      a: "Standard delivery is 3-5 working days from the shoot date. We also offer an express 24-hour service for urgent campaigns."
    },
    {
      q: "What's included in the price?",
      a: "Our rates include steaming/prep, professional styling, photography, basic retouching (color correction, dust removal), and file delivery."
    },
    {
      q: "Can you handle high-volume ecommerce jobs?",
      a: "Yes, our studio is equipped for high-volume workflows, processing hundreds of SKUs per day without compromising quality."
    },
    {
      q: "What if I need more retouching?",
      a: "We offer tiered retouching packages. 'High-end' retouching (creative edits, compositing) can be added as a custom requirement."
    },
    {
      q: "Can I send fewer than 24 garments?",
      a: "Yes, we have a minimum booking fee rather than a minimum item count. Contact us for a custom quote for smaller batches."
    },
    {
      q: "Do I get to review the images before final delivery?",
      a: "Absolutely. We provide a contact sheet or online gallery for approval before final high-res files are processed."
    },
    {
      q: "Do you offer styling services?",
      a: "Yes, our in-house stylists are experts in pinning, tucking, and styling garments to ensuring they look their absolute best."
    },
    {
      q: "Do I have to be on-site?",
      a: "No. You can ship your products to us. We'll handle the intake, shoot, and return shipping. Many clients work remotely with us."
    },
    {
      q: "How do I book a shoot?",
      a: "Simply use the 'Get a Quote' button above or contact our team directly to schedule a consultation."
    }
  ];

  return (
    <section className="py-32 px-6 bg-white max-w-[1000px] mx-auto reveal-on-scroll">
       <h2 className="font-serif text-4xl mb-12 text-center">Our Clothing Ghost Mannequin & Flats FAQs</h2>
       <div className="space-y-4">
          {faqs.map((faq, index) => (
             <div key={index} className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-gray-400">
                <button 
                   onClick={() => toggleFaq(index)}
                   className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors text-left"
                >
                   <span className="font-bold text-sm md:text-base">{faq.q}</span>
                   {openFaq === index ? <Minus className="w-4 h-4 text-gray-400" /> : <Plus className="w-4 h-4 text-gray-400" />}
                </button>
                <div 
                   className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-50 ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                   <div className="p-6 pt-0 text-sm text-gray-600 leading-relaxed">
                      {faq.a}
                   </div>
                </div>
             </div>
          ))}
       </div>
    </section>
  );
};