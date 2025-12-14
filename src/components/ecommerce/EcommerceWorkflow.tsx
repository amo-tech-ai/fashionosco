
import React from 'react';

export const EcommerceWorkflow: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-[#F7F5F3]">
       <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
             <h2 className="font-serif text-4xl md:text-5xl text-[#111111]">How we work.</h2>
             <p className="text-gray-600 text-lg font-light leading-relaxed">
                We have established processes to ensure a smooth fuss-free eCommerce service that ensures you get what you need, first time.
             </p>
             <p className="text-gray-600 text-lg font-light leading-relaxed">
                We understand the necessity to work stringently to guidelines, ensuring that there's consistency across all of your content. We never underestimate the administration and logistics of the job, which is an integral part of delivering you the perfect project.
             </p>
             <p className="text-gray-600 text-lg font-light leading-relaxed">
                We will work with you to ascertain what you require from the job including file sizes, file type, and delivery method and develop a workflow to meet with your requirements.
             </p>
             
             <div className="pt-8 space-y-4">
                {[
                   "Initial Consultation & Briefing",
                   "Sample Management & Prep",
                   "Shoot & Approval",
                   "Retouch & Delivery"
                ].map((step, i) => (
                   <div key={i} className="flex items-center space-x-4">
                      <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold font-serif">{i + 1}</div>
                      <span className="text-sm uppercase tracking-widest font-medium">{step}</span>
                   </div>
                ))}
             </div>
          </div>
          
          <div className="relative">
             <img src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=2787&auto=format&fit=crop" className="w-full h-[700px] object-cover rounded-sm shadow-xl" alt="Workflow" />
          </div>
       </div>
    </section>
  );
};
