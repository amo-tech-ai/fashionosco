import React, { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { ButtonVariant } from '../types';
import { ArrowRight, Play, CheckCircle, Camera, Video, Monitor, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CreativeStillLife: React.FC = () => {
  const navigate = useNavigate();
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#FAF8F5] text-[#111111] font-sans selection:bg-black selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 min-h-[90vh] flex items-center overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Text */}
          <div className="lg:col-span-5 space-y-10 animate-in slide-in-from-bottom-10 duration-1000">
            <h1 className="font-serif text-6xl md:text-8xl leading-[0.9] tracking-tight text-[#111111]">
              Creative <br/>
              <span className="italic font-light text-gray-400">Still-Life.</span>
            </h1>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-600 max-w-md border-l-2 border-black pl-6">
              Pushing your brand to new limits, we offer full-scale, end-to-end creative productions that deliver beautiful, eye-catching, bold, creative content.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Recent Work
              </Button>
              <Button variant={ButtonVariant.SECONDARY} className="bg-transparent border-black text-black hover:bg-black hover:text-white" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Request a Quote
              </Button>
            </div>
          </div>

          {/* Right: Asymmetrical Image Blocks */}
          <div className="lg:col-span-7 relative h-[600px] hidden lg:block">
            {/* Main Image */}
            <div 
              className="absolute top-0 right-0 w-[400px] aspect-[4/5] shadow-2xl z-10 transition-transform duration-700 hover:-translate-y-2"
              style={{ transform: `translateY(${offsetY * 0.05}px)` }}
            >
              <img src="https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover" alt="Luxury Perfume" />
            </div>
            
            {/* Floating Image 1 */}
            <div 
              className="absolute top-20 left-10 w-[250px] aspect-square shadow-xl z-20 border-8 border-[#FAF8F5] transition-transform duration-1000 delay-100 hover:-translate-y-2"
              style={{ transform: `translateY(${offsetY * -0.05}px)` }}
            >
              <img src="https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2787&auto=format&fit=crop" className="w-full h-full object-cover" alt="Cosmetic Texture" />
            </div>

            {/* Floating Image 2 */}
            <div 
              className="absolute bottom-0 right-[350px] w-[200px] aspect-[3/4] shadow-lg z-30 transition-transform duration-1000 delay-200 hover:-translate-y-2"
              style={{ transform: `translateY(${offsetY * 0.08}px)` }}
            >
               <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2727&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Drink" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. UNLOCK POTENTIAL (Grid Content) */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left: Copy */}
          <div className="space-y-10 sticky top-32 self-start animate-in slide-in-from-left duration-1000">
            <h2 className="font-serif text-5xl md:text-6xl text-[#111111] leading-tight">
              Unlock your brand's full potential.
            </h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light">
              <p>
                With decades of experience, our still-life photographers are able to produce eye-catching, captivating still life imagery for your next campaign.
              </p>
              <p>
                Our reputation of producing high-quality work for our clients never waivers and we continue to produce commercial imagery for many clients in the following industries:
              </p>
              <ul className="space-y-2 font-medium text-black pt-4">
                {['Beauty, Fragrances & Cosmetic', 'Beverage', 'High-end Fashion Labels', 'Homeware'].map((item) => (
                  <li key={item} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-black rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                We understand that our photography plays an integral part in your marketing goals. We can deliver a standard of imagery that gets your brand noticed.
              </p>
              <p>
                You may only have one chance to capture your audience’s attention and we work closely with our clients to achieve that.
              </p>
              <p>
                So if you are looking for something that wows your customers and has a real impact, then why not get in touch to discuss our creative services.
              </p>
            </div>
            <div className="pt-6">
              <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Request a Quote</Button>
            </div>
          </div>

          {/* Right: Masonry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             {[
                "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2804&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=2787&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=2940&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1555664424-778a69fdb3b8?q=80&w=2864&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=2836&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2784&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1616486029423-aaa478965c96?q=80&w=2940&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1594234568858-a5c9f50f3b9e?q=80&w=2835&auto=format&fit=crop"
             ].map((src, idx) => (
                <div key={idx} className={`relative overflow-hidden rounded-sm bg-gray-100 group cursor-pointer hover:shadow-xl transition-all duration-300 ${idx === 1 ? 'row-span-2' : 'aspect-square'}`}>
                   <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                   <img src={src} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" alt="Portfolio" />
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* 3. BEYOND PACKSHOTS */}
      <section className="py-32 px-6 bg-[#111111] text-white">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           
           {/* Visuals */}
           <div className="grid grid-cols-2 gap-8 relative">
              <div 
                 className="aspect-[3/4] overflow-hidden rounded-sm"
                 style={{ transform: `translateY(${offsetY * 0.04}px)` }}
              >
                 <img src="https://images.unsplash.com/photo-1522338242992-e1a54906a8e6?q=80&w=2788&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" alt="Creative Shot 1" />
              </div>
              <div 
                 className="aspect-[3/4] overflow-hidden rounded-sm mt-24"
                 style={{ transform: `translateY(${offsetY * -0.04}px)` }}
              >
                 <img src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=2787&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" alt="Creative Shot 2" />
              </div>
              
              {/* Decorative Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/20 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                 <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
           </div>

           {/* Copy */}
           <div className="space-y-8">
              <h2 className="font-serif text-5xl md:text-6xl leading-tight">Beyond packshots.</h2>
              <p className="text-gray-400 text-lg leading-relaxed font-light">
                 Our professional photography team’s combined expertise and experience goes well beyond simple packshots. Our team of creative professional still life photographers can add value to your shots with creative innovation, suitable lighting and experienced art direction.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed font-light">
                 Based in North London studio, we're experts at producing creative photography for premier brands. We have an extensive knowledge of adding value to products through photography, and a passion for shooting creatively on above and below the line campaigns.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed font-light">
                 Our creative team ensure we have solutions to make your still life photography really stand out. Within our fully equipped London studio, our photographers regularly work with premium brands and have earned a reputation for delivering exceptional images that make our clients proud.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed font-light">
                 We don't just deliver stills, we can produce video and moving image for your campaign. If you are looking for something a little different, visit our <strong>GIF & Animated Stills</strong> page or if you need video services to engage your audiences, visit our <strong>Video</strong> page.
              </p>
           </div>
        </div>
      </section>

      {/* 4. OUR STUDIOS */}
      <section className="py-32 px-6 bg-[#FAF8F5]">
         <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Text */}
            <div className="order-2 lg:order-1 space-y-8">
               <h2 className="font-serif text-5xl md:text-6xl text-[#111111]">Our Studios.</h2>
               <p className="text-gray-600 text-lg leading-relaxed font-light">
                  Located in North London, our fully-equipped studios are bright, spacious, and specifically designed for large-scale creative photography productions. We have client areas for who wish to be present, providing high-speed Wi-Fi and a comfortable breakout area for their convenience. Our studios facilitate your team's involvement throughout the process or offer a place to unwind while we handle the work.
               </p>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2 relative group overflow-hidden">
               <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
               <img src="https://images.unsplash.com/photo-1595514020173-66b6ab3a0422?q=80&w=2940&auto=format&fit=crop" className="w-full h-[500px] object-cover rounded-sm shadow-xl grayscale group-hover:grayscale-0 transition-all duration-700" alt="Studio Space" />
            </div>
         </div>
      </section>

      {/* 5. LOGO WALL */}
      <section className="py-24 px-6 bg-black text-white">
         <div className="max-w-[1440px] mx-auto text-center">
            <h3 className="text-2xl font-serif mb-16">We've worked with...</h3>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 lg:gap-24 opacity-70">
               {/* Using SVG paths for brand logos for sharpness */}
               {[
                  // The Body Shop
                  <svg viewBox="0 0 100 50" className="h-12 w-auto fill-current"><path d="M50,25 m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0 M50,15 L50,35 M40,25 L60,25" /></svg>,
                  // Adidas
                  <svg viewBox="0 0 100 50" className="h-10 w-auto fill-current"><path d="M30,40 L40,25 L50,40 M55,40 L65,20 L75,40 M80,40 L90,15 L100,40" /></svg>,
                  // Callaway
                  <svg viewBox="0 0 100 30" className="h-8 w-auto fill-current"><text x="0" y="20" fontFamily="serif" fontWeight="bold" fontSize="20">Callaway</text></svg>,
                  // Reebok
                  <svg viewBox="0 0 100 30" className="h-8 w-auto fill-current"><text x="0" y="20" fontFamily="sans-serif" fontWeight="bold" fontSize="20">Reebok</text></svg>,
                  // Rolex
                  <svg viewBox="0 0 100 50" className="h-12 w-auto fill-current"><path d="M50,10 L40,20 L45,20 L45,30 L55,30 L55,20 L60,20 Z" /><text x="30" y="45" fontFamily="serif" fontWeight="bold" fontSize="12">ROLEX</text></svg>,
                  // ASOS
                  <svg viewBox="0 0 100 30" className="h-8 w-auto fill-current"><text x="0" y="20" fontFamily="sans-serif" fontWeight="900" fontSize="24">asos</text></svg>,
                  // Dunlop
                  <svg viewBox="0 0 100 30" className="h-8 w-auto fill-current"><text x="0" y="20" fontFamily="sans-serif" fontWeight="bold" fontStyle="italic" fontSize="20">DUNLOP</text></svg>,
                  // Braun
                  <svg viewBox="0 0 100 30" className="h-8 w-auto fill-current"><text x="0" y="20" fontFamily="sans-serif" fontWeight="bold" fontSize="22" letterSpacing="2">BRAun</text></svg>,
                  // Ted Baker
                  <svg viewBox="0 0 100 30" className="h-8 w-auto fill-current"><text x="0" y="15" fontFamily="sans-serif" fontSize="12">TED BAKER</text><text x="30" y="25" fontFamily="sans-serif" fontSize="8">LONDON</text></svg>,
                  // North Face
                  <svg viewBox="0 0 100 40" className="h-10 w-auto fill-current"><path d="M80,10 A15,15 0 0,1 80,40 M70,15 A10,10 0 0,1 70,35 M60,20 A5,5 0 0,1 60,30" /><text x="0" y="20" fontFamily="sans-serif" fontWeight="900" fontSize="10">THE</text><text x="0" y="30" fontFamily="sans-serif" fontWeight="900" fontSize="10">NORTH</text><text x="0" y="40" fontFamily="sans-serif" fontWeight="900" fontSize="10">FACE</text></svg>,
                  // Tesco
                  <svg viewBox="0 0 100 30" className="h-6 w-auto fill-current"><text x="0" y="20" fontFamily="serif" fontWeight="bold" fontSize="20">TESCO</text></svg>,
                  // Revlon
                  <svg viewBox="0 0 100 30" className="h-6 w-auto fill-current"><text x="0" y="20" fontFamily="sans-serif" fontWeight="bold" fontSize="20" letterSpacing="2">REVLON</text></svg>,
                  // Hotel Chocolat
                  <svg viewBox="0 0 100 30" className="h-8 w-auto fill-current"><text x="0" y="15" fontFamily="serif" fontSize="10">HOTEL</text><text x="0" y="25" fontFamily="serif" fontSize="14">Chocolat.</text></svg>,
                  // Marks & Spencer
                  <svg viewBox="0 0 100 30" className="h-8 w-auto fill-current"><text x="0" y="15" fontFamily="sans-serif" fontSize="12">MARKS &</text><text x="0" y="25" fontFamily="sans-serif" fontSize="12">SPENCER</text></svg>,
                  // New Era
                  <svg viewBox="0 0 50 50" className="h-10 w-auto fill-current"><rect x="0" y="0" width="40" height="40" stroke="currentColor" strokeWidth="2" fill="none" /><text x="5" y="25" fontFamily="sans-serif" fontWeight="bold" fontSize="20">n</text></svg>

               ].map((logo, i) => (
                  <div key={i} className="hover:opacity-100 transition-opacity duration-300">
                     {logo}
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. MEGA PORTFOLIO GRID */}
      <section className="py-32 px-4 bg-white">
         <div className="max-w-[1600px] mx-auto">
            <h2 className="font-serif text-5xl md:text-6xl text-center mb-24">Recent Work.</h2>
            <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
               {[
                  // Column 1
                  "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2787&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=2787&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2940&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2787&auto=format&fit=crop",
                  
                  // Column 2
                  "https://images.unsplash.com/photo-1571781348782-95c4a1e50666?q=80&w=2938&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1555664424-778a69fdb3b8?q=80&w=2864&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1594234568858-a5c9f50f3b9e?q=80&w=2835&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2864&auto=format&fit=crop",

                  // Column 3
                  "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2804&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=2836&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2899&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=2940&auto=format&fit=crop",

                  // Column 4
                  "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2880&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2940&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2784&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?q=80&w=2940&auto=format&fit=crop"
               ].map((src, i) => (
                  <div key={i} className="relative group overflow-hidden break-inside-avoid cursor-pointer bg-gray-100">
                     <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                        <ArrowRight className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 transform -rotate-45 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100" />
                     </div>
                     <img src={src} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" alt="Work" />
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 7. VIDEO CTA */}
      <section className="py-32 px-6 bg-gradient-to-r from-gray-900 to-black text-white overflow-hidden">
         <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 z-10">
               <h2 className="font-serif text-5xl md:text-6xl leading-tight">
                  Add Video for <br/>
                  Maximum Impact.
               </h2>
               <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md">
                  We don't just shoot stills. We create high-impact video content for ecommerce, social media reels, and campaign films.
               </p>
               <Button className="bg-white text-black hover:bg-gray-200 border-none">Explore Video</Button>
            </div>
            
            <div className="relative aspect-video bg-gray-800 rounded-sm overflow-hidden group cursor-pointer shadow-2xl border border-gray-700">
               <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2942&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" alt="Video Preview" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/20">
                     <Play className="text-white fill-white ml-1 w-8 h-8" />
                  </div>
               </div>
               <div className="absolute top-4 left-4 font-mono text-xs text-white/70">REC ● 00:04:12</div>
            </div>
         </div>
      </section>

      {/* 8. CONTACT */}
      <section className="py-32 px-6 bg-white" id="contact">
         <div className="max-w-xl mx-auto space-y-12">
            <div className="text-center space-y-4">
               <h2 className="font-serif text-5xl md:text-6xl text-[#111111]">Get in Touch.</h2>
               <p className="text-gray-500 font-light text-lg">Send us a message and we'll get back to you shortly.</p>
            </div>
            
            <form className="space-y-6">
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors placeholder-gray-300" placeholder="John Doe" />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email</label>
                  <input type="email" className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors placeholder-gray-300" placeholder="john@company.com" />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Message</label>
                  <textarea rows={4} className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors placeholder-gray-300" placeholder="Tell us about your project..."></textarea>
               </div>
               
               <div className="pt-8 flex items-center justify-between">
                  <Button className="bg-black text-white hover:bg-gray-800 border-none px-10 py-4 w-auto">Send Message</Button>
                  <span className="text-xs text-gray-400">We respond within 24 hours.</span>
               </div>
            </form>
         </div>
      </section>

      {/* 9. BEHIND THE SCENES */}
      <section className="py-24 px-6 bg-[#FAF8F5]">
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