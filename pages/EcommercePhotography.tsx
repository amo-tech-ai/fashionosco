import React, { useState } from 'react';
import { Button } from '../components/Button';
import { ButtonVariant } from '../types';
import { ArrowRight, Star, Camera, Video, ShoppingBag, Watch, Shirt, Minus, Plus, Play, Image as ImageIcon, CheckCircle, Zap, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EcommercePhotography: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const services = [
    { 
      title: "Packshot Photography.", 
      desc: "Mainly used for brochures and online catalogues, we can supply your product shots beautifully on a white (or single-coloured) background. Even if you think these are 'simple' shots, we always take the care and attention required to get the best out of your products.", 
      icon: Camera, 
      img: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2787&auto=format&fit=crop" 
    },
    { 
      title: "On-Model Fashion.", 
      desc: "Our E-Commerce fashion photography is a good choice if you want more engagement and an uplift in sales. We find that on-model photography alongside invisible mannequins or flat-styled clothing shots makes a positive difference in conversions. We can supply models from our partner model agencies.", 
      icon: Shirt, 
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2820&auto=format&fit=crop" 
    },
    { 
      title: "Creative | Still Life", 
      desc: "Our creative still life photography provides you with bespoke visuals tailored to your brand. We often work with brand art directors but also able to assist and create mood boards and direction for those brands that need a little more help. Stylists are also available for more complex sets if required.", 
      icon: Star, 
      img: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=2836&auto=format&fit=crop" 
    },
    { 
      title: "Videography.", 
      desc: "Our videographers can create beautiful moving images of your products. Adding moving images to your eCommerce site enables the customer to experience your products in more detail, and it is certainly a route that adds real value and sets you apart from your competitors.", 
      icon: Video, 
      img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2942&auto=format&fit=crop" 
    },
    { 
      title: "eCommerce Apparel.", 
      desc: "Clothing Photography — be it ghost mannequins, flat lays, or accessories—we create images that are both technically proficient and beautifully styled. We ensure that you'll always get eye-catching clothing imagery.", 
      icon: ShoppingBag, 
      img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2940&auto=format&fit=crop" 
    },
    { 
      title: "eCommerce Jewellery.", 
      desc: "Professional Jewellery photography is something we love doing and pride ourselves on. Our in-house specialist jewellery photographer has the techniques and skills to supply striking commercial images to showcase your jewellery.", 
      icon: Watch, 
      img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2940&auto=format&fit=crop" 
    },
  ];

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
    <div className="bg-[#F7F5F3] text-[#111111] font-sans selection:bg-[#E5D7A4] selection:text-black">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 min-h-[90vh] flex items-center overflow-hidden bg-white">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <div className="space-y-8 animate-in slide-in-from-left duration-1000">
             <h1 className="font-serif text-6xl md:text-7xl leading-[1.1] text-[#111111]">
                Drive Sales with our <br/>
                <span className="italic text-gray-500">Ecommerce Photography.</span>
             </h1>
             <p className="text-xl text-gray-600 font-light leading-relaxed max-w-md border-l-2 border-[#E5D7A4] pl-6">
                Achieve your marketing objectives. Creating bold, cost-effective ecommerce content.
             </p>
             <div className="pt-6">
                <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Request a Quote</Button>
             </div>
          </div>

          {/* Right: Visuals */}
          <div className="relative h-[600px] hidden lg:block animate-in fade-in duration-1000 delay-300">
             {/* Main Hero Image */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px] shadow-2xl z-10">
                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover" alt="Fashion Ecommerce" />
             </div>
             
             {/* Floating Elements */}
             <div className="absolute top-10 right-0 w-[200px] aspect-[3/4] shadow-xl z-20 animate-[bounce_6s_infinite] hover:z-30 transition-all">
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover" alt="Shoe Product" />
             </div>
             <div className="absolute bottom-20 left-0 w-[220px] aspect-square shadow-xl z-20 border-8 border-white animate-[pulse_4s_infinite]">
                <img src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=2787&auto=format&fit=crop" className="w-full h-full object-cover" alt="Accessories" />
             </div>
          </div>
        </div>
      </section>

      {/* 2. CATAPULT SALES */}
      <section className="py-24 px-6 bg-[#F7F5F3]">
         <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left: Text */}
            <div className="space-y-8 sticky top-32 self-start">
               <h2 className="font-serif text-5xl md:text-6xl text-[#111111]">Catapult your sales.</h2>
               <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light">
                  <p>
                     Professional <strong>Ecommerce photography</strong> has been at the forefront of Blend Studios' services for years.
                  </p>
                  <p>
                     Working out of our central London studio we create imagery and videography for many top brands which recently includes <strong>TK Maxx, Burberrys, ASOS, The North Face</strong> and <strong>Tescos</strong>.
                  </p>
                  <p>
                     We understand the importance of delivering high quality, cost-effective ecom photography and videography for your brand.
                  </p>
                  <p>
                     Like you, we also set our standards very high. If you require polished commercial photography that will increase engagement and conversions, add value and help you sell your products <a href="#contact" className="text-black border-b border-black font-medium hover:text-gray-600 transition-colors">contact us today</a>.
                  </p>
               </div>
            </div>

            {/* Right: Grid */}
            <div className="grid grid-cols-2 gap-4">
               {[
                  "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2784&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2836&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1550614000-4b9519e02d48?q=80&w=2788&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2864&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2787&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2960&auto=format&fit=crop"
               ].map((src, idx) => (
                  <div key={idx} className={`relative overflow-hidden rounded-sm bg-white shadow-sm hover:shadow-md transition-all duration-300 group ${idx % 3 === 0 ? 'col-span-2 aspect-[2/1]' : 'col-span-1 aspect-square'}`}>
                     <img src={src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Product Example" />
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 3. WE LOVE ECOM */}
      <section className="py-24 px-6 bg-white overflow-hidden">
         <div className="max-w-[1440px] mx-auto mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="relative group">
                  <div className="absolute -inset-4 bg-[#F6E9E4] rounded-sm -z-10 rotate-2 group-hover:rotate-1 transition-transform duration-500"></div>
                  <img src="https://images.unsplash.com/photo-1556228720-19de77ee542e?q=80&w=2787&auto=format&fit=crop" className="w-full h-[600px] object-cover rounded-sm shadow-xl" alt="Creative Ecom" />
               </div>
               <div className="space-y-8">
                  <h2 className="font-serif text-5xl md:text-6xl text-[#111111]">We ♥ ecom.</h2>
                  <p className="text-gray-600 text-lg leading-relaxed font-light">
                     Our skilled photography and production team has been specialising in delivering digital imagery for years. We know what it takes, there's nothing we haven't shot.
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed font-light">
                     We are market leaders in eCommerce Product photography, fashion photography, clothing and jewellery photography and our team reflects that.
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed font-light">
                     From account handlers to our photographers and retouchers we never compromise on quality. Our friendly team will ensure your experience with us is smooth, efficient and above all successful. Always meeting (and exceeding) your expectations.
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed font-light italic">
                     We let the quality of our images do the talking for us.
                  </p>
               </div>
            </div>
         </div>

         {/* Full Width Slider */}
         <div className="w-full overflow-x-auto hide-scrollbar flex snap-x snap-mandatory">
             {[
               "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2940&auto=format&fit=crop",
               "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2899&auto=format&fit=crop",
               "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2820&auto=format&fit=crop",
               "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=2835&auto=format&fit=crop",
               "https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=2787&auto=format&fit=crop"
             ].map((src, i) => (
                <div key={i} className="min-w-[80vw] md:min-w-[40vw] h-[500px] relative snap-center border-r border-white">
                   <img src={src} className="w-full h-full object-cover" alt="Slider Image" />
                   <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors"></div>
                </div>
             ))}
         </div>
      </section>

      {/* 4. SERVICES GRID */}
      <section className="py-32 px-6 bg-[#F7F5F3]">
         <div className="max-w-[1440px] mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-center mb-16">Our Ecommerce Services.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {services.map((service, idx) => (
                  <div key={idx} className="bg-white p-8 group hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 flex flex-col h-full">
                     <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-100 rounded-sm">
                        <img src={service.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={service.title} />
                     </div>
                     <div className="mb-4">
                        <service.icon className="w-6 h-6 text-[#111111]" strokeWidth={1.5} />
                     </div>
                     <h3 className="font-serif text-2xl mb-3 font-medium">{service.title}</h3>
                     <p className="text-sm text-gray-500 leading-relaxed font-light flex-grow">{service.desc}</p>
                     <div className="pt-6 mt-auto">
                        <span className="text-xs font-bold uppercase tracking-widest border-b border-gray-200 pb-1 group-hover:border-black transition-colors">Learn More</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. 20+ YEARS */}
      <section className="py-32 px-6 bg-white">
         <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
               <h2 className="font-serif text-5xl md:text-6xl text-[#111111] leading-tight mb-8">
                  With over 20 years of industry experience, our experienced team has shot for top brands and independents, always following your guidelines or helping you shape them.
               </h2>
               <div className="h-1 w-24 bg-[#E5D7A4]"></div>
            </div>
            <div className="order-1 lg:order-2 relative h-[700px]">
               <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Experience" />
               <div className="absolute bottom-10 left-10 bg-white p-6 shadow-xl max-w-xs hidden md:block">
                  <p className="font-serif text-xl italic">"The standard they set is simply unmatched in London."</p>
               </div>
            </div>
         </div>
      </section>

      {/* 6. LOGO STRIP */}
      <section className="py-20 px-6 bg-[#111111] text-white">
         <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 items-center opacity-50 text-center">
               <h3 className="font-serif text-2xl font-bold tracking-widest">PANDORA</h3>
               <h3 className="font-sans text-xl font-black tracking-tighter">TK•maxx</h3>
               <h3 className="font-serif text-xl italic">Tiffany & Co.</h3>
               <h3 className="font-sans text-lg font-bold tracking-widest">MARKS &<br/>SPENCER</h3>
               <h3 className="font-sans text-2xl font-bold lowercase">amazon</h3>
               <h3 className="font-sans text-xl tracking-[0.3em] font-light">FENTY</h3>
               <h3 className="font-sans text-xl font-black">THE<br/>NORTH<br/>FACE</h3>
               <h3 className="font-sans text-2xl font-bold italic">adidas</h3>
               <h3 className="font-serif text-2xl font-bold">ROLEX</h3>
               <h3 className="font-serif text-2xl font-bold tracking-widest">SONY.</h3>
               <h3 className="font-serif text-2xl italic font-light">Virgin</h3>
               <h3 className="font-sans text-xl font-bold tracking-tighter">Reebok</h3>
               <h3 className="font-sans text-xl font-bold border-2 border-white p-2 inline-block">NEW<br/>ERA</h3>
               <h3 className="font-serif text-2xl tracking-widest">REVLON</h3>
               <h3 className="font-serif text-xl font-bold">SELFRIDGES&CO</h3>
            </div>
         </div>
      </section>

      {/* 7. HOW WE WORK */}
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

      {/* 8. STUDIO PROFILE */}
      <section className="py-32 px-6 bg-black text-white text-center">
         <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="font-serif text-5xl md:text-6xl">London's <br/>premier <br/>photography <br/>studio.</h2>
            <p className="text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
               Our North London Photography Studio is fully kitted out with the latest photographic and videography equipment ready for any eCommerce project — large or small.  There is no additional requirement to hire in equipment or freelance resource. We are a full-service studio and have a team of full-time staff from production, e-commerce photographers and retouchers. We believe it's how we are able to offer consistency, every time.
            </p>
         </div>
      </section>

      {/* 9. FAQ ACCORDION */}
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

      {/* 10. CONTACT FORM */}
      <section className="py-32 px-6 bg-[#F7F5F3]" id="contact">
         <div className="max-w-xl mx-auto space-y-12">
            <div className="text-center space-y-4">
               <h2 className="font-serif text-5xl md:text-6xl text-[#111111]">Get in Touch.</h2>
               <p className="text-gray-500 font-light text-lg">Send us a message and we'll get back to you shortly.</p>
            </div>
            
            <form className="space-y-6">
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">First Name*</label>
                  <input type="text" className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors" required />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Last Name*</label>
                  <input type="text" className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors" required />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email*</label>
                  <input type="email" className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors" required />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Company name</label>
                  <input type="text" className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors" />
               </div>
               <div className="space-y-2 pt-6">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Please tell us about your proposed project.</label>
                  <p className="text-[10px] text-gray-400">Please provide us with details regarding quantities, scope, photography, and/or video.</p>
                  <textarea rows={4} className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors mt-2"></textarea>
               </div>
               
               <div className="pt-8">
                  <Button className="bg-black text-white hover:bg-gray-800 border-none px-8 py-3 w-auto">Submit</Button>
               </div>
            </form>
         </div>
      </section>

      {/* 11. BEHIND THE SCENES */}
      <section className="py-24 px-6 bg-[#F7F5F3]">
         <div className="max-w-[1440px] mx-auto">
            <h2 className="font-serif text-3xl mb-8">Behind the scenes.</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
               {[
                  "https://images.unsplash.com/photo-1605218427368-35b81a3dd716?q=80&w=800&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=800&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1472506229562-67891c3da632?q=80&w=800&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1520692867807-631586529738?q=80&w=800&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=800&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1485322551179-963c5054291b?q=80&w=800&auto=format&fit=crop"
               ].map((src, i) => (
                  <div key={i} className="aspect-square bg-gray-200 overflow-hidden group cursor-pointer relative">
                     <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                        <span className="text-white text-xs font-bold uppercase tracking-widest">View</span>
                     </div>
                     <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="BTS" />
                  </div>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
};