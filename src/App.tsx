import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle, 
  Workflow, 
  LayoutGrid, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  DraftingCompass,
  MessageSquare
} from 'lucide-react';

import { ScreenType } from './types';
import { DESIGN_SERVICES, COMPLETED_PROJECTS } from './data';

import Navigation from './components/Navigation';
import BlueprintVisualizer from './components/BlueprintVisualizer';
import CostCalculator from './components/CostCalculator';
import ProjectGallery from './components/ProjectGallery';
import ReviewForm from './components/ReviewForm';
import FAQs from './components/FAQs';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('home');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [estimateDraft, setEstimateDraft] = useState<string>('');
  
  // Lead submission form state
  const [clientName, setClientName] = useState<string>('');
  const [clientContact, setClientContact] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('Flat & Home Interiors');
  const [projectBrief, setProjectBrief] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Initialize Dark Mode based on preference
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' || 
                   (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Sync Dark Mode toggles
  const handleThemeToggle = (newDark: boolean) => {
    setDarkMode(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Coupling the Estimator output to the Contact form
  const handleApplyEstimate = (estimateText: string) => {
    setEstimateDraft(estimateText);
    setProjectBrief(estimateText);
    setSelectedService('Complete Architectural Consultation');
    setActiveScreen('contact');
    
    // Smooth scroll back to top to ensure visibility of contact form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit Lead Form
  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientContact.trim()) return;

    handleWhatsAppBook();
    setSubmitSuccess(true);
  };

  // Submit via WhatsApp
  const handleWhatsAppBook = () => {
    const defaultNumber = '91798575518';
    let message = `Hello VS Architect! I would like to book a design consultation.`;
    
    const details: string[] = [];
    if (clientName.trim()) details.push(`Name: ${clientName.trim()}`);
    if (clientContact.trim()) details.push(`Contact: ${clientContact.trim()}`);
    if (selectedService) details.push(`Service: ${selectedService}`);
    if (projectBrief.trim()) details.push(`Brief: ${projectBrief.trim()}`);

    if (details.length > 0) {
      message += `\n\n*My Enquiry Details*:\n` + details.join('\n');
    }
    
    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${defaultNumber}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#F0EDE8] dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 transition-colors duration-300 flex flex-col font-sans">
      
      {/* Top Header menu */}
      <Navigation 
        activeScreen={activeScreen} 
        setScreen={setActiveScreen} 
        darkMode={darkMode} 
        setDarkMode={handleThemeToggle} 
      />

      {/* Main Screen Container with smooth sliding transitions */}
      <main className="flex-1 pt-24 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="px-6 md:px-12 max-w-7xl mx-auto w-full"
          >
            {/* SCREEN 1: HOME */}
            {activeScreen === 'home' && (
              <div className="space-y-16">
                
                {/* HERO SECTION DECK */}
                <div className="relative min-h-[80vh] flex items-center justify-start rounded-3xl overflow-hidden bg-slate-950 text-white p-8 md:p-16 border border-slate-900 shadow-2xl">
                  
                  {/* Grid layout wallpaper */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <div className="w-full h-full" style={{
                      backgroundImage: `
                        linear-gradient(rgba(200,169,110,0.25) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(200,169,110,0.25) 1px, transparent 1px)
                      `,
                      backgroundSize: '60px 60px'
                    }} />
                  </div>

                  {/* Faint watermark graphic */}
                  <div className="absolute right-[-1%] bottom-[-5%] font-serif text-[38vw] font-bold text-white/[0.02] select-none pointer-events-none leading-none tracking-tighter">
                    VS
                  </div>

                  {/* Telemetry labels of Eidgha Road, UP */}
                  <span className="absolute top-6 left-8 font-mono text-[9px] text-[#C8A96E]/50 tracking-wider hidden sm:block">
                    COORDS: 28.6100°N · 79.9099°E
                  </span>
                  <span className="absolute top-6 right-8 font-mono text-[9px] text-[#C8A96E]/50 tracking-wider hidden sm:block">
                    SHAHJAHANPUR · UTTAR PRADESH
                  </span>
                  <span className="absolute bottom-6 right-8 font-mono text-[9px] text-[#C8A96E]/40 tracking-wider hidden sm:block">
                    ARCHITECTURAL &amp; INTERIOR SERVICES
                  </span>

                  {/* Hero Copy */}
                  <div className="relative z-10 max-w-2xl space-y-6 pt-8">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-[1.5px] bg-[#C8A96E]" />
                      <span className="text-[10px] font-mono tracking-widest text-[#C8A96E] uppercase font-bold">
                        Est. Shahjahanpur, UP
                      </span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-serif font-light leading-tight tracking-tight">
                      Every space <br />
                      <em className="text-[#C8A96E] font-normal not-italic">tells a story.</em> <br />
                      We help you tell yours.
                    </h1>

                    <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed max-w-md">
                      Architecture and bespoke interior rendering that is thoughtful, sustainable, and built to endure — customized entirely around your life.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                      <button
                        onClick={() => setActiveScreen('portfolio')}
                        className="py-3 px-6 bg-[#C8A96E] hover:bg-[#b5955b] text-white rounded-lg text-xs uppercase tracking-wider font-mono font-bold transition-all shadow-md hover:scale-103 active:scale-97 cursor-pointer"
                      >
                        Explore Gallery
                      </button>
                      <button
                        onClick={() => setActiveScreen('estimator')}
                        className="py-3 px-6 bg-slate-900 border border-white/20 hover:border-[#C8A96E] text-white hover:text-[#C8A96E] rounded-lg text-xs uppercase tracking-wider font-mono font-semibold transition-all cursor-pointer"
                      >
                        Estimate Budget
                      </button>
                    </div>
                  </div>
                </div>

                {/* THE BLUEPRINT INTERACTIVE GRID BANNER */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#E8E2D9] dark:bg-zinc-900/60 p-8 md:p-12 rounded-3xl border border-white/40 dark:border-zinc-800 transition-colors duration-300">
                  <div className="lg:col-span-5 space-y-4">
                    <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block">
                      OUR MANDATE
                    </span>
                    <h2 className="text-3.5xl font-serif font-light text-slate-900 dark:text-zinc-100 leading-tight">
                      Design that is <em className="text-amber-600 dark:text-amber-400">purposeful</em> in every details
                    </h2>
                    <p className="text-slate-650 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans font-light">
                      We are dedicated to enhancing quality of life through design that is thoughtful, sustainable, elegant, and inspirational. Excellence isn't just a promise — it's the minimum standard we hold ourselves to for Shahjahanpur.
                    </p>

                    <div className="bg-white/80 dark:bg-zinc-950/80 p-5 rounded-2xl border border-white/50 dark:border-zinc-900 shadow-sm space-y-1">
                      <div className="text-3xl font-serif text-amber-600 dark:text-amber-400">10+ Years</div>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-snug">
                        Of combined architectural and structural drafting experience across Residential &amp; Corporate sectors.
                      </p>
                    </div>
                  </div>

                  {/* Interactive teaser element - blueprint visually representation */}
                  <div className="lg:col-span-7 bg-slate-950 text-sky-400 rounded-2xl p-6 h-80 relative overflow-hidden flex flex-col justify-between border border-slate-900 shadow-inner">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                      <div className="w-full h-full" style={{
                        backgroundImage: `
                          linear-gradient(rgba(245, 158, 11, 0.2) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(245, 158, 11, 0.2) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                      }} />
                    </div>

                    <div className="flex justify-between font-mono text-[10px] text-zinc-400">
                      <span>BLUEPRINT PREVIEW //</span>
                      <span className="text-emerald-400 animate-pulse">● ENGINE LIVE</span>
                    </div>

                    {/* Simple artistic graphic schematic representing clean layouts */}
                    <div className="w-full h-32 relative flex items-center justify-center">
                      <svg className="w-full h-full text-[#C8A96E]/30" viewBox="0 0 400 120" stroke="currentColor" strokeWidth="0.75" fill="none">
                        <rect x="20" y="10" width="360" height="100" rx="4" />
                        <line x1="120" y1="10" x2="120" y2="110" strokeDasharray="4" />
                        <line x1="280" y1="10" x2="280" y2="110" strokeDasharray="4" />
                        <circle cx="120" cy="60" r="15" />
                        <circle cx="280" cy="60" r="15" />
                        {/* Text labels */}
                        <text x="50" y="40" fill="gray" fontSize="8" fontFamily="monospace">BEDROOM A</text>
                        <text x="160" y="40" fill="gray" fontSize="8" fontFamily="monospace">LIVING SPACE</text>
                        <text x="310" y="40" fill="gray" fontSize="8" fontFamily="monospace">DECK</text>
                        {/* Dimension labels */}
                        <text x="175" y="90" fill="gold" fontSize="8" fontFamily="monospace">4500 SQFT</text>
                      </svg>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <span className="text-[10px] block font-mono text-zinc-500 uppercase">Featured layout draft</span>
                        <span className="text-xs text-white leading-tight font-serif italic block">Integrated Green Atrium At Saddar Bazar</span>
                      </div>
                      <button 
                        onClick={() => setActiveScreen('services')}
                        className="text-xs font-mono text-amber-500 hover:text-amber-400 flex items-center gap-1.5 font-semibold py-1.5 px-3 rounded bg-zinc-900 border border-zinc-800"
                      >
                        Launch board <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* THE 3 CORE BRAND PILLARS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Pillar 1 */}
                  <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-850 hover:shadow-md transition">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 border border-amber-600/10">
                      <Workflow className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-serif font-semibold text-slate-800 dark:text-zinc-100">
                      Innovative Solutions
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 mt-2 leading-relaxed">
                      Leveraging state-of-the-art interactive 3D visualizations and computer-aided drafting to let you walk through your home before work begins.
                    </p>
                  </div>

                  {/* Pillar 2 */}
                  <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-850 hover:shadow-md transition">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 border border-amber-600/10">
                      <LayoutGrid className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-serif font-semibold text-slate-800 dark:text-zinc-100">
                      Enduring Quality
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 mt-2 leading-relaxed">
                      From waterproof modular bases to robust hardware locks, every single material selection is optimized to remain pristine for years.
                    </p>
                  </div>

                  {/* Pillar 3 */}
                  <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-850 hover:shadow-md transition">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 border border-amber-600/10">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-serif font-semibold text-slate-800 dark:text-zinc-100">
                      Client-Centred Approach
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 mt-2 leading-relaxed">
                      Adapting layout plans around your customized routine, family structures, or working shifts to build spaces reflecting who you are.
                    </p>
                  </div>
                </div>

                {/* WHY VS ARCHITECT GRID (Aesthetic commitment) */}
                <div className="border-t border-slate-300 dark:border-zinc-850 pt-16">
                  <div className="mb-10 text-center">
                    <span className="text-xs tracking-widest font-mono text-amber-600 dark:text-amber-400 uppercase font-bold block mb-2">
                      Philosophy &amp; Values
                    </span>
                    <h2 className="text-3.5xl font-serif text-slate-900 dark:text-zinc-100">
                      A commitment to <em>excellence</em>, by every measure
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
                    <div className="flex gap-4">
                      <div className="font-serif text-3xl text-amber-600 dark:text-amber-450 opacity-40">I</div>
                      <div>
                        <h4 className="text-base font-semibold text-slate-805 dark:text-zinc-150">Customized to You</h4>
                        <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mt-1">
                          No duplicates. We reject assembly-line templating. Every layout begins as a clean paper sheet tailored around your specific visual desires.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="font-serif text-3xl text-amber-600 dark:text-amber-450 opacity-40">II</div>
                      <div>
                        <h4 className="text-base font-semibold text-slate-805 dark:text-zinc-150">Aesthetic + Function</h4>
                        <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mt-1">
                          We never sacrifice storage efficiency for pure style, nor elegance for plain utility. We balance both variables seamlessly.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="font-serif text-3xl text-amber-600 dark:text-amber-450 opacity-40">III</div>
                      <div>
                        <h4 className="text-base font-semibold text-slate-805 dark:text-zinc-150">Uncompromising Materials</h4>
                        <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mt-1">
                          We only specify reliable, certified vendors. Quality is integrated at every tier, safeguarding your financial investment.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="font-serif text-3xl text-amber-600 dark:text-amber-450 opacity-40">IV</div>
                      <div>
                        <h4 className="text-base font-semibold text-slate-805 dark:text-zinc-150">Local Root, Global Vision</h4>
                        <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mt-1">
                          Operating directly from Shahjahanpur, we understand local seasonal weather changes, brick masonry sources, combined with standard global designs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* HIGHLIGHTED PROJECTS SLIDER TEASER */}
                <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-850 p-6 md:p-8 rounded-3xl">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        Visual Portfolio Teaser
                      </span>
                      <h3 className="text-2xl font-serif text-slate-900 dark:text-zinc-100 leading-tight">
                        Featured Structures
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveScreen('portfolio')}
                      className="text-xs font-mono font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400 flex items-center gap-1 cursor-pointer"
                    >
                      Browse All Catalog <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {COMPLETED_PROJECTS.slice(0, 2).map((p) => (
                      <div 
                        key={p.id} 
                        onClick={() => setActiveScreen('portfolio')}
                        className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer border border-slate-100 dark:border-zinc-850 shadow-sm"
                      >
                        <img 
                          src={p.image} 
                          alt={p.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-103 transitionduration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4">
                          <span className="text-[9px] font-mono text-amber-500 uppercase tracking-widest">{p.category}</span>
                          <h4 className="text-sm font-sans text-white font-semibold leading-tight">{p.title}</h4>
                          <p className="text-[10px] text-zinc-300 font-mono mt-0.5">{p.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TESTIMONIALS MODULE */}
                <div className="pt-8">
                  <div className="mb-8 text-center">
                    <span className="text-xs font-mono tracking-widest uppercase font-bold text-amber-600 dark:text-amber-400 block">
                      Client Feedback
                    </span>
                    <h2 className="text-3xl font-serif text-slate-900 dark:text-zinc-100">
                      Verified Client Raves
                    </h2>
                  </div>
                  <ReviewForm />
                </div>

                {/* FAQ SECTION */}
                <div className="pt-12 border-t border-slate-100 dark:border-zinc-900">
                  <FAQs />
                </div>

              </div>
            )}

            {/* SCREEN 2: PORTFOLIO GALLERY */}
            {activeScreen === 'portfolio' && (
              <div className="space-y-8">
                <div>
                  <span className="text-amber-600 dark:text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">
                    Completed Works Catalog
                  </span>
                  <h1 className="text-4xl font-serif text-slate-900 dark:text-zinc-100 leading-tight">
                    Where Aesthetics Meet <em>Function</em>
                  </h1>
                  <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm max-w-2xl mt-1">
                    Carefully curated galleries representing flats, private bedrooms, luxury kitchen, garden terrace layouts, and offices in Uttar Pradesh. Click any visual to inspect blueprints and highlights.
                  </p>
                </div>

                <ProjectGallery />
              </div>
            )}

            {/* SCREEN 3: SERVICES */}
            {activeScreen === 'services' && (
              <div className="space-y-12">
                <div>
                  <span className="text-amber-600 dark:text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">
                    Professional Scope
                  </span>
                  <h1 className="text-4xl font-serif text-slate-900 dark:text-zinc-100 leading-tight">
                    Spatial Architecture <em>Tailored for Scale</em>
                  </h1>
                  <p className="text-slate-650 dark:text-zinc-400 text-xs sm:text-sm max-w-xl mt-1">
                    Whether decorating an architectural bedroom haven or launching an office floor layout, discover starting estimates and custom details below.
                  </p>
                </div>

                {/* Services Catalog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {DESIGN_SERVICES.map((svc) => (
                    <div
                      key={svc.id}
                      className="bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 rounded-3xl p-6 hover:shadow-lg dark:hover:shadow-none transition duration-300 flex flex-col justify-between space-y-6"
                    >
                      <div className="space-y-3">
                        <div className="relative h-44 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-zinc-900">
                          <img
                            src={svc.image}
                            alt={svc.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <span className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md text-white border border-white/10 font-mono text-[9px] uppercase tracking-widest py-0.5 px-2 rounded-full">
                            {svc.type}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold tracking-wider block">
                            {svc.tag}
                          </span>
                          <h3 className="text-lg font-serif font-semibold text-slate-900 dark:text-zinc-100">
                            {svc.name}
                          </h3>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-sans">
                          {svc.description}
                        </p>

                        <div className="pt-2 border-t border-slate-100 dark:border-zinc-900 space-y-1.5">
                          {svc.details.map((detail, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-zinc-400">
                              <span className="w-1 h-3 rounded-full bg-amber-600 dark:bg-amber-400 shrink-0" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 dark:border-zinc-900 flex justify-between items-center bg-slate-50 dark:bg-zinc-900/40 p-3 rounded-xl">
                        <div className="font-mono text-[10px] text-zinc-500">
                          <span>INDICATIVE RATE:</span>
                          <span className="block font-semibold text-slate-900 dark:text-zinc-100 text-xs">
                            ₹{svc.estimateBaseRateRef}/sq. ft.
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedService(svc.name);
                            setActiveScreen('estimator');
                          }}
                          className="py-1.5 px-3 bg-slate-150 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-700 dark:hover:text-white transition rounded-md font-mono text-[10px] uppercase font-bold"
                        >
                          Estimate Budget
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* INTERACTIVE COMPASS / COORDINATE TELEMETRY PLAYGROUND */}
                <div className="pt-8">
                  <div className="mb-6">
                    <span className="text-xs font-mono tracking-widest uppercase font-bold text-amber-600 dark:text-amber-400 block mb-1">
                      Visual Playground Tool
                    </span>
                    <h3 className="text-2xl font-serif text-slate-900 dark:text-zinc-100">
                      The Drafting Compass Board
                    </h3>
                    <p className="text-slate-500 dark:text-zinc-400 text-xs">
                      Play around with structural column placements, grid sizing factors, and telemetry landmarks of Shahjahanpur.
                    </p>
                  </div>
                  <BlueprintVisualizer />
                </div>
              </div>
            )}

            {/* SCREEN 4: COST ESTIMATOR */}
            {activeScreen === 'estimator' && (
              <div className="space-y-8 animate-fade-in font-sans">
                <div>
                  <span className="text-amber-600 dark:text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">
                    Pricing Transparency Calculator
                  </span>
                  <h1 className="text-4xl font-serif text-slate-900 dark:text-zinc-100 leading-tight block">
                    Interactive Budget <em>Calculation Sheet</em>
                  </h1>
                  <p className="text-slate-650 dark:text-zinc-400 text-xs sm:text-sm max-w-xl mt-1 leading-relaxed">
                    Instantly assess standard layout modeling, material tiers, and site director fees matching your area square footage. Apply outputs directly to the consult queue.
                  </p>
                </div>

                <CostCalculator onApplyEstimate={handleApplyEstimate} />
              </div>
            )}

            {/* SCREEN 5: CONTACT & CONSULT */}
            {activeScreen === 'contact' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left side details card */}
                <div className="lg:col-span-5 space-y-6 bg-amber-50/20 dark:bg-zinc-900 p-6 md:p-8 rounded-3xl border border-amber-600/10 dark:border-zinc-800">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block">
                      Connect Direct
                    </span>
                    <h1 className="text-3.5xl font-serif text-slate-900 dark:text-zinc-100 leading-tight">
                      Let's begin your <em>story</em>
                    </h1>
                    <p className="text-slate-500 dark:text-zinc-450 text-xs leading-normal mt-1 block">
                      Ready to structurally optimize your home, office, modular kitchen, or landscape? Drop an enquiry.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Address Detail */}
                    <div className="flex items-start gap-3 text-xs">
                      <div className="p-2 bg-white dark:bg-zinc-950 border border-slate-200/50 dark:border-zinc-850 rounded-lg text-amber-600 dark:text-amber-400 text-center">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block font-mono font-bold text-slate-400 dark:text-zinc-500 uppercase text-[9px] tracking-wider mb-0.5">
                          Studio Location
                        </span>
                        <span className="block text-slate-800 dark:text-zinc-200">
                          Eidgha Road, Shahjahanpur,<br />
                          Uttar Pradesh, Pin 242001, India
                        </span>
                      </div>
                    </div>

                    {/* Phone Detail */}
                    <div className="flex items-start gap-3 text-xs">
                      <div className="p-2 bg-white dark:bg-zinc-950 border border-slate-200/50 dark:border-zinc-850 rounded-lg text-amber-600 dark:text-amber-400 text-center">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block font-mono font-bold text-slate-400 dark:text-zinc-500 uppercase text-[9px] tracking-wider mb-0.5">
                          Enquire Hotline
                        </span>
                        <a href="tel:+91798575518" className="block text-slate-800 dark:text-zinc-200 hover:text-amber-600 font-mono">
                          +91 79857 5518
                        </a>
                      </div>
                    </div>

                    {/* WhatsApp Connection */}
                    <div className="flex items-start gap-3 text-xs">
                      <div className="p-2 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400 text-center">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase text-[9px] tracking-wider mb-0.5">
                          WhatsApp Booking Desk
                        </span>
                        <button
                          onClick={handleWhatsAppBook}
                          className="block text-slate-800 dark:text-zinc-200 hover:text-emerald-600 font-mono font-bold cursor-pointer transition-colors text-left"
                        >
                          +91 79857 5518 (Chat Now)
                        </button>
                      </div>
                    </div>

                    {/* Email Detail */}
                    <div className="flex items-start gap-3 text-xs">
                      <div className="p-2 bg-white dark:bg-zinc-950 border border-slate-200/50 dark:border-zinc-850 rounded-lg text-amber-600 dark:text-amber-400 text-center">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block font-mono font-bold text-slate-400 dark:text-zinc-500 uppercase text-[9px] tracking-wider mb-0.5">
                          Proposal Delivery
                        </span>
                        <a href="mailto:hello@vsarchitect.in" className="block text-slate-800 dark:text-zinc-200 hover:text-amber-600 font-mono">
                          hello@vsarchitect.in
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Warning label constraint inside Iframe */}
                  <div className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-relaxed border-t border-slate-200 dark:border-zinc-800 pt-4 flex gap-1.5 items-start">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>Inquiries submitted are cataloged internally on this client frame. We promise direct return correspondence within 24 hours.</span>
                  </div>
                </div>

                {/* Right side Consult Form portal */}
                <div className="lg:col-span-7 bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 rounded-3xl p-6 md:p-8 relative shadow-sm">
                  
                  {submitSuccess && (
                     <div className="absolute inset-0 bg-white/95 dark:bg-zinc-950/95 rounded-3xl flex flex-col justify-center items-center text-center p-6 z-10 transition-all font-sans">
                        <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                        <h4 className="font-serif text-xl text-slate-905 dark:text-zinc-100">Inquiry Received</h4>
                        <p className="text-xs text-slate-500 dark:text-zinc-400 font-light max-w-sm mt-2">
                           Thank you, <strong>{clientName}</strong>! Your structural brief was ingested successfully. Our representative will contact you shortly on <strong>{clientContact}</strong>.
                        </p>
                        <button 
                          onClick={() => { setSubmitSuccess(false); setEstimateDraft(''); }}
                          className="mt-6 py-2 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono hover:bg-slate-50 text-zinc-600 dark:text-zinc-300 transition-all"
                        >
                          Clear &amp; Start fresh enquiry
                        </button>
                     </div>
                  )}

                  <h3 className="text-xs font-mono font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-6 block">
                    CONSULT ENQUIRY SHEET
                  </h3>

                  <form onSubmit={handleSubmitLead} className="space-y-4 font-sans text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Full Name"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full text-xs bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:border-amber-600 transition-all text-slate-800 dark:text-zinc-100"
                        />
                      </div>

                      {/* Contact */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                          Phone Number or Email Address
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="How structurally can we reach you"
                          value={clientContact}
                          onChange={(e) => setClientContact(e.target.value)}
                          className="w-full text-xs bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:border-amber-600 transition-all text-slate-800 dark:text-zinc-100"
                        />
                      </div>
                    </div>

                    {/* Services Choice dropdown */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                        Selected Service Category
                      </label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full text-xs bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:border-amber-500 text-slate-800 dark:text-zinc-100 transition-all"
                      >
                        <option>Flat &amp; Home Interiors</option>
                        <option>Bespoke Bedroom Architecture</option>
                        <option>Smart Kitchen Interior</option>
                        <option>Lush Garden Design</option>
                        <option>Small Office Interiors</option>
                        <option>Complete Architectural Consultation</option>
                        <option>Other Structural Project</option>
                      </select>
                    </div>

                    {/* Brief Inquiry Textarea */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 block justify-between flex items-center">
                        <span>Project Brief &amp; Dimensions</span>
                        {estimateDraft && (
                          <span className="text-[9px] text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/20 px-1.5 py-0.5 rounded font-bold uppercase animate-pulse">
                            Estimate Active
                          </span>
                        )}
                      </label>
                      <textarea
                        rows={6}
                        required
                        placeholder="Describe the structural goals, square footage, timeline expectations, or site measurements..."
                        value={projectBrief}
                        onChange={(e) => setProjectBrief(e.target.value)}
                        className="w-full text-xs bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:border-amber-600 transition-all font-mono text-slate-800 dark:text-zinc-100"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg p-3.5 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20 cursor-pointer hover:scale-[1.01]"
                      >
                        <MessageSquare className="w-4 h-4" /> Book &amp; Submit via WhatsApp
                      </button>
                    </div>
                  </form>
                </div>

              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Elegant Footer */}
      <footer className="bg-slate-950 dark:border-t dark:border-zinc-900 text-white py-12 px-6 md:px-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-1 font-serif text-lg font-semibold tracking-wide text-zinc-100">
              <span className="text-[#C8A96E] font-extrabold">VS</span> Architect
            </div>
            <p className="text-[10px] font-mono text-zinc-450 tracking-wide uppercase text-zinc-500">
              Eidgha Road, Shahjahanpur, UP, India
            </p>
          </div>

          <div className="text-center text-[11px] text-zinc-500 tracking-wider">
            &copy; {new Date().getFullYear()} VS Architect. All rights reserved.
          </div>

          <div className="flex gap-4 font-mono text-[10px] text-zinc-450 text-zinc-400">
            <button onClick={() => { setActiveScreen('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#C8A96E] transition">Home</button>
            <span className="text-zinc-700">|</span>
            <button onClick={() => { setActiveScreen('portfolio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#C8A96E] transition">Portfolio</button>
            <span className="text-zinc-700">|</span>
            <button onClick={() => { setActiveScreen('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#C8A96E] transition">Services</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
