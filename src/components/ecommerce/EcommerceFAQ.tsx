
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export const EcommerceFAQ: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: "What are our ecommerce photography rates?", a: "Our rates are competitive and scalable based on volume. We offer per-product or day-rate pricing depending on the complexity of the shoot. Contact us for a bespoke quote." },
    { q: "What's included in the price?", a: "Standard packages include studio time, professional lighting, basic styling, photography, and standard retouching (color correction, cropping, background removal)." },
    { q: "Do you offer videography?", a: "Yes, we specialize in e-commerce videography, including 360-degree spins, on-model catwalks, and detailed product feature videos." },
    { q: "Can you handle high-volume work?", a: "Absolutely. Our studio is designed for scale. We process hundreds of SKUs weekly for major retailers without compromising on quality." },
    { q: "How do I book a shoot?", a: "You can book by contacting us directly through the form below or calling our studio. We'll discuss your requirements and schedule a slot." },
    { q: "Do I get to review the images before delivery?", a: "Yes, we provide an online proofing gallery where you can select your preferred shots and request any specific edits before final delivery." },
    { q: "Do you offer styling services?", a: "Yes, we have experienced in-house stylists who can prepare and style your products to ensure they look their absolute best." },
  ];

  return (
    <section className="py-32 px-6 bg-white">
       <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
             <div className="sticky top-32">
                <div className="aspect-[4/3] bg-gray-100 mb-8 rounded-sm overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1556228720-19de77ee542e?q=80&w=2787&auto=format&fit=crop" className="w-full h-full object-cover" alt="FAQ Visual" />
                </div>
             </div>
          </div>
          <div className="space-y-4">
             <h2 className="font-serif text-4xl mb-12">What are our ecommerce photography rates?</h2>
             <div className="prose prose-lg text-gray-500 mb-12 font-light">
                <p>You'll find our prices extremely competitive. We recognise the need to keep costs down and profit margins up. Our eCommerce photography is charged to emphasise just that. We make our prices as clear and simple as possible with no hidden costs.</p>
                <p>We will try to accommodate all budgets and even provide discounts for big orders or contracted work where applicable. Rest assured, whatever you pay, we never compromise on our standards or the quality we deliver.</p>
                <p>If you require a quote for any upcoming project, please get in touch.</p>
             </div>

             <div className="space-y-4">
                {faqs.map((faq, index) => (
                   <div key={index} className="border-b border-gray-100">
                      <button 
                         onClick={() => toggleFaq(index)}
                         className="w-full flex items-center justify-between py-6 text-left hover:text-gray-600 transition-colors"
                      >
                         <span className="font-bold text-sm md:text-base uppercase tracking-widest">{faq.q}</span>
                         {openFaq === index ? <Minus className="w-4 h-4 text-gray-400" /> : <Plus className="w-4 h-4 text-gray-400" />}
                      </button>
                      <div 
                         className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-48 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
                      >
                         <div className="text-sm text-gray-500 leading-relaxed font-light">
                            {faq.a}
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </section>
  );
};
