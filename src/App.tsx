import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight, 
  Award, 
  Users, 
  CheckCircle, 
  Star, 
  MessageSquare, 
  Calendar,
  Send,
  Sparkles,
  Info,
  ChevronRight,
  DraftingCompass,
  ArrowUp
} from 'lucide-react';
import Navigation from './components/Navigation';
import ProjectGallery from './components/ProjectGallery';
import CostCalculator from './components/CostCalculator';
import FAQs from './components/FAQs';
import BlueprintVisualizer from './components/BlueprintVisualizer';
import ReviewForm from './components/ReviewForm';
import { ScreenType } from './types';
import { DESIGN_SERVICES } from './data';

export default function App() {
  const [activeScreen, setScreen] = useState<ScreenType>('home');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  
  // Lead Form States
  const [clientName, setClientName] = useState<string>('');
  const [clientContact, setClientContact] = useState<string>('');
  const [projectBrief, setProjectBrief] = useState<string>('');
  const [estimateDraft, setEstimateDraft] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Monitor page scroll to show/hide "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Initialize Dark Mode based on preference
  useEffect(() => {
    let isDark = false;
    try {
      isDark = localStorage.getItem('theme') === 'dark' || 
               (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    } catch (e) {
      try {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } catch (mediaErr) {
        isDark = false;
      }
    }
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = (newDark: boolean) => {
    setDarkMode(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('theme', 'dark');
      } catch (e) {
        // Silently swallow third-party storage restrictions inside sandboxed frames
      }
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('theme', 'light');
      } catch (e) {
        // Silently swallow third-party storage restrictions inside sandboxed frames
      }
    }
  };

  // Submit Lead Form
  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setClientName('');
      setClientContact('');
      setProjectBrief('');
    }, 1200);
  };

  // Submit via WhatsApp
  const handleWhatsAppConsult = () => {
    const textMessage = `Hello VS Architect! I would like to consult for my project.\n\n*Name*: ${clientName || 'N/A'}\n*Contact*: ${clientContact || 'N/A'}\n*Brief*: ${projectBrief || 'N/A'}\n\n${estimateDraft ? `*Pricing Plan Details*:\n${estimateDraft}` : ''}`;
    const encoded = encodeURIComponent(textMessage);
    window.open(`https://wa.me/91798575518?text=${encoded}`, '_blank');
  };

  // Transition variants
  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen font-sans bg-[#F5F2EB] dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 transition-colors duration-300">
      
      {/* Header/Navigation */}
      <Navigation 
        activeScreen={activeScreen} 
        setScreen={setScreen} 
        darkMode={darkMode} 
        setDarkMode={toggleDarkMode} 
      />

      {/* Main Body */}
      <main className="pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            {/* ----------------- HOME SCREEN ----------------- */}
            {activeScreen === 'home' && (
              <div className="space-y-16">
                
                {/* Hero section */}
                <section className="relative overflow-hidden py-12 md:py-20 rounded-3xl bg-slate-900 text-white p-8 md:p-12 shadow-xl border border-slate-800">
                  {/* Backdrop Giant Letter Watermark */}
                  <div className="absolute right-[-1%] bottom-[-5%] font-serif text-[38vw] font-bold text-white/[0.02] select-none pointer-events-none leading-none tracking-tighter">
                    VS
                  </div>

                  <div className="relative z-10 max-w-3xl space-y-6">

                    <h1 className="text-4xl sm:text-6xl font-display font-medium leading-[1.1] tracking-tight">
                      <span className="font-sans font-bold">Designing Spaces of</span> <br />
                      <span className="text-amber-400 font-serif font-light italic">Quiet Luxury</span> &amp; Spatial Flow
                    </h1>
                    <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-sans max-w-2xl font-light">
                      We believe in structural integrity, organic wood panel accents, intelligent daylight distribution, and direct transparency. Guided by decades of regional layout planning, we craft customized flats, workspaces, and gardens.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                      <button 
                        onClick={() => setScreen('portfolio')}
                        className="px-6 py-3 rounded-xl bg-amber-600 text-white font-semibold text-xs font-mono uppercase tracking-widest hover:bg-amber-700 transition flex items-center gap-1 cursor-pointer"
                      >
                        Explore Catalog <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => setScreen('estimator')}
                        className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-amber-400 border border-amber-600/30 font-semibold text-xs font-mono uppercase tracking-widest transition flex items-center gap-1 cursor-pointer"
                      >
                        Pricing Estimator <Compass className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* High end image representation */}
                  <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block opacity-45">
                    <img 
                      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000" 
                      alt="Modern minimalist home facade"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
                  </div>
                </section>

                {/* Studio Philosophy Overview */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-900 p-6 md:p-10 rounded-3xl">
                  <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-bold block">
                      OUR PHILOSOPHY
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-slate-900 dark:text-zinc-100 leading-tight">
                      We plan layouts with physical <em>honesty</em> and absolute custom care.
                    </h2>
                    <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans font-light">
                      Our design studio is located at Eidgha Road, Shahjahanpur. We curate architectural layout planning and custom carpentry from initial mood boarding up to active turnkey management. No hidden bills, only highly tailored materials and premium workmanship.
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="flex gap-2.5">
                        <CheckCircle className="w-5 h-5 text-amber-600 dark:text-amber-450 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-xs text-slate-900 dark:text-zinc-100">Bespoke Joinery</h4>
                          <p className="text-[11px] text-slate-500 leading-normal">Premium wood panel, custom closets &amp; kitchen hydraulic layouts.</p>
                        </div>
                      </div>
                      <div className="flex gap-2.5">
                        <CheckCircle className="w-5 h-5 text-amber-600 dark:text-amber-450 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-xs text-slate-900 dark:text-zinc-100">Absolute Transparency</h4>
                          <p className="text-[11px] text-slate-500 leading-normal">Custom design and scope details matching our digital estimator outputs.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Core studio statistics panel */}
                  <div className="lg:col-span-5 bg-[#FDFDFD] dark:bg-zinc-950 border border-slate-100 dark:border-zinc-850 p-6 rounded-2xl grid grid-cols-2 gap-6 shadow-sm">
                    <div className="space-y-1">
                      <div className="text-3xl font-serif text-amber-600 dark:text-amber-400">10+ Years</div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Regional Experience</p>
                    </div>
                    <div className="space-y-1">
                      <div className="text-3xl font-serif text-amber-600 dark:text-amber-400">150+</div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Layouts Completed</p>
                    </div>
                    <div className="space-y-1">
                      <div className="text-3xl font-serif text-amber-600 dark:text-amber-400">99%</div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Client Approval</p>
                    </div>
                    <div className="space-y-1">
                      <div className="text-3xl font-serif text-amber-600 dark:text-amber-400">4.9★</div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Average Rating</p>
                    </div>
                  </div>
                </section>

                {/* Staggered Featured project with coordinate mapping banner */}
                <section className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">FEATURED HIGH-RESOLUTION WORKS</span>
                      <h3 className="text-2xl font-serif text-slate-900 dark:text-zinc-100">Saddar Bazar Showcase</h3>
                    </div>
                    <button 
                      onClick={() => setScreen('portfolio')}
                      className="text-xs font-mono uppercase tracking-wider text-amber-600 hover:text-amber-700 flex items-center gap-1"
                    >
                      All Projects <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="relative group rounded-3xl overflow-hidden h-[450px] shadow-lg bg-slate-900">
                    <img 
                      src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1400" 
                      alt="Modern interior atrium showcase"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-700 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    
                    {/* Visual coordinates metadata annotation */}
                    <div className="absolute bottom-6 left-6 md:left-12 max-w-lg space-y-3 text-white">
                      <span className="px-2.5 py-0.5 rounded bg-amber-600 font-mono text-[9px] uppercase tracking-widest">
                        RESIDENTIAL DEVELOPMENT
                      </span>
                      <h4 className="text-2xl font-serif font-semibold">
                        Integrated Green Atrium At Saddar Bazar
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans font-light">
                        A beautiful custom project completed in 2024. Featuring a vertical indoor micro-atrium that filters indirect skylight to all three floors of the residence, completely reducing morning HVAC loads by 25%.
                      </p>
                      <span className="text-xs text-white leading-tight font-serif italic block">
                        Designed, drafted, &amp; managed by VS Architect Studio.
                      </span>
                    </div>

                    <div className="absolute top-6 right-6 font-mono text-[10px] text-amber-400/80 bg-black/50 backdrop-blur-md p-3 rounded-lg border border-white/10 hidden md:block">
                      <span>ORIGIN AXIS: 28.61° N, 79.91° E</span>
                    </div>
                  </div>
                </section>

                {/* Milestones Steps (I, II, III, IV) */}
                <section className="space-y-8">
                  <div className="text-center max-w-xl mx-auto space-y-2">
                    <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-bold">
                      OUR COMPLETE ROADMAP
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-slate-900 dark:text-zinc-100 leading-tight">
                      The Four Design <em>Milestones</em>
                    </h2>
                    <p className="text-slate-600 dark:text-zinc-400 text-xs leading-relaxed">
                      How we systematically turn raw client concepts into structurally sound, physically completed spatial assets.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Step 1 */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-850 space-y-4 shadow-sm hover:shadow-md transition">
                      <div className="font-serif text-3xl text-amber-600 dark:text-amber-450 opacity-40">I</div>
                      <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-zinc-100 uppercase tracking-wider">
                        Discovery Consult
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        We analyze your plot, room sizes, natural light paths, and design inspirations at Eidgha Road or via digital consults.
                      </p>
                    </div>

                    {/* Step 2 */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-850 space-y-4 shadow-sm hover:shadow-md transition">
                      <div className="font-serif text-3xl text-amber-600 dark:text-amber-450 opacity-40">II</div>
                      <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-zinc-100 uppercase tracking-wider">
                        3D Visual Rendering
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        We generate detailed layout walkthroughs, wood laminate selections, and ceiling lighting drafts to review.
                      </p>
                    </div>

                    {/* Step 3 */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-850 space-y-4 shadow-sm hover:shadow-md transition">
                      <div className="font-serif text-3xl text-amber-600 dark:text-amber-450 opacity-40">III</div>
                      <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-zinc-100 uppercase tracking-wider">
                        Precise Blueprinting
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Drafting complete AutoCAD sets including columns, structural concrete points, wiring, and kitchen plumbing risers.
                      </p>
                    </div>

                    {/* Step 4 */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-850 space-y-4 shadow-sm hover:shadow-md transition">
                      <div className="font-serif text-3xl text-amber-600 dark:text-amber-450 opacity-40">IV</div>
                      <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-zinc-100 uppercase tracking-wider">
                        Turnkey Overseeing
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Active physical site audits, contracting certified local carpenters, material procurement checkouts, and ultimate keys handover.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Elegant inline FAQs section on Home */}
                <section className="pt-4">
                  <FAQs />
                </section>

              </div>
            )}

            {/* ----------------- PORTFOLIO SCREEN ----------------- */}
            {activeScreen === 'portfolio' && (
              <div className="space-y-6">
                <div className="text-left space-y-2 max-w-2xl">
                  <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-bold block">
                    COMPLETED STRUCTURES PORTFOLIO
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-slate-900 dark:text-zinc-100 leading-tight">
                    A Legacy of Spatial <em>Finesse</em>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Explore our projects across Shahjahanpur and surrounding cities. Use the navigation buttons below to sort by categories, or search for custom locations.
                  </p>
                </div>

                <ProjectGallery />
              </div>
            )}

            {/* ----------------- SERVICES SCREEN ----------------- */}
            {activeScreen === 'services' && (
              <div className="space-y-12">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-4 space-y-4">
                    <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-bold block">
                      ARCHITECTURAL CAPABILITIES
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-slate-900 dark:text-zinc-100 leading-tight">
                      Custom Curated <em>Design Solutions</em>
                    </h2>
                    <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
                      We operate a specialized design office focused on high-end interiors, custom wood carvings, acoustic conference dividers, and rooftop meadow gardens. We adapt to both small cozy flats and massive commercial corporate hubs.
                    </p>

                    <button 
                      onClick={() => setScreen('estimator')}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-mono text-xs font-semibold uppercase tracking-wider transition shadow-sm cursor-pointer"
                    >
                      Calculate Construction Estimate <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {DESIGN_SERVICES.map((svc) => (
                      <div 
                        key={svc.id}
                        className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-850 rounded-2xl overflow-hidden hover:shadow-md transition duration-300"
                      >
                        <div className="h-44 bg-slate-100 dark:bg-zinc-950 overflow-hidden relative">
                          <img 
                            src={svc.image} 
                            alt={svc.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <a 
                            href={`https://wa.me/91798575518?text=Hello%20VS%20Architect!%20I%20would%20like%20to%20ask%20about%20the%20pricing%20and%20design%20options%20for%3A%20${encodeURIComponent(svc.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-3 left-3 bg-emerald-600/90 hover:bg-emerald-700 text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded border border-white/10 hover:scale-105 transition-all shadow-md cursor-pointer"
                          >
                            Ask from WhatsApp
                          </a>
                        </div>
                        <div className="p-5 space-y-3">
                          <div>
                            <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                              {svc.tag}
                            </span>
                            <h3 className="text-base font-serif font-bold text-slate-900 dark:text-zinc-100">
                              {svc.name}
                            </h3>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {svc.description}
                          </p>
                          <div className="pt-2.5 border-t border-slate-100 dark:border-zinc-800 space-y-1">
                            {svc.details.map((det, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-[10.5px] text-slate-600 dark:text-zinc-400">
                                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
                                <span>{det}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cohesive Blueprint Playground under Services */}
                <div className="pt-8">
                  <BlueprintVisualizer />
                </div>

              </div>
            )}

            {/* ----------------- ESTIMATOR SCREEN ----------------- */}
            {activeScreen === 'estimator' && (
              <div className="space-y-6">
                <div className="text-left space-y-2 max-w-2xl">
                  <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-bold block">
                    ONLINE BUDGET CALCULATOR
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-slate-900 dark:text-zinc-100 leading-tight">
                    Budget Planning, <em>Visualized</em>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Select your project category, drag the slider to match your estimated square footage, choose laminate tiers, and click to automatically send the compiled plan parameters directly to our inquiry contact desk!
                  </p>
                </div>

                <CostCalculator 
                  onApplyEstimate={(text) => {
                    setEstimateDraft(text);
                    setScreen('contact');
                  }} 
                />
              </div>
            )}

            {/* ----------------- CONTACT SCREEN ----------------- */}
            {activeScreen === 'contact' && (
              <div className="space-y-12">
                
                <div className="text-left space-y-2 max-w-2xl">
                  <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-bold block">
                    ENQUIRY PORTAL
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-slate-900 dark:text-zinc-100 leading-tight">
                    Get in touch with <em>VS Architect</em>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-light">
                    Have a plot or flat layout you'd like us to design? Submit the consultation form below, or bypass completely by sending a direct instant layout request via WhatsApp.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column info details */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-850 rounded-2xl space-y-6 shadow-sm">
                      <h3 className="text-lg font-serif font-semibold text-slate-900 dark:text-zinc-100">
                        Studio Head Office
                      </h3>

                      <div className="space-y-4 text-xs font-sans">
                        <div className="flex gap-3">
                          <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-zinc-100">Physical Address</p>
                            <p className="text-slate-500 dark:text-zinc-400 leading-normal mt-0.5">Eidgha Road, near Civil Lines, Shahjahanpur, Uttar Pradesh - 242001, India.</p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-zinc-100">WhatsApp / Call</p>
                            <p className="text-slate-500 dark:text-zinc-400 leading-normal mt-0.5">+91 79857 55180</p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-zinc-100">E-mail Correspondence</p>
                            <p className="text-slate-500 dark:text-zinc-400 leading-normal mt-0.5">contact@vsarchitect.in</p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-zinc-100">Operating Hours</p>
                            <p className="text-slate-500 dark:text-zinc-400 leading-normal mt-0.5">Monday to Saturday: 10:00 AM — 07:00 PM</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-amber-50/70 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/30 rounded-2xl space-y-2">
                      <h4 className="text-xs font-mono font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-amber-600" /> TIMELINE &amp; DESIGN COMMITMENT
                      </h4>
                      <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed">
                        Inquiries submitted are cataloged internally on this client frame. We promise direct return correspondence within 24 hours. If an estimate template is active below, it will automatically append.
                      </p>
                    </div>

                  </div>

                  {/* Right Column Lead Form */}
                  <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-850 p-6 md:p-8 rounded-3xl relative shadow-md">
                    
                    {submitSuccess ? (
                      <div className="absolute inset-0 bg-white/95 dark:bg-zinc-900/95 rounded-3xl flex flex-col justify-center items-center text-center p-8 z-20">
                        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                          <CheckCircle className="w-8 h-8 animate-bounce" />
                        </div>
                        <h4 className="font-serif text-xl text-slate-900 dark:text-zinc-100">Inquiry Received</h4>
                        <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mt-2 leading-relaxed">
                          Your draft layout request has been cataloged. Our Lead Architect at Eidgha Road will contact you via WhatsApp shortly.
                        </p>
                        <div className="flex gap-3 mt-6">
                          <button
                            onClick={() => { setSubmitSuccess(false); setEstimateDraft(''); }}
                            className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 text-xs rounded-xl font-mono uppercase"
                          >
                            New Query
                          </button>
                          <button
                            onClick={handleWhatsAppConsult}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded-xl font-mono uppercase font-semibold flex items-center gap-1"
                          >
                            Chat via WhatsApp
                          </button>
                        </div>
                      </div>
                    ) : null}

                    <h3 className="text-lg font-serif font-semibold text-slate-900 dark:text-zinc-100 mb-6 flex items-center gap-2">
                      <DraftingCompass className="w-5 h-5 text-amber-600" /> Spatial Consultation Desk
                    </h3>

                    <form onSubmit={handleSubmitLead} className="space-y-4 font-sans text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                            Your Name *
                          </label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Adv. Saurabh Verma"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="w-full text-xs bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:border-amber-600 dark:focus:border-amber-500 transition-all text-slate-800 dark:text-zinc-100"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                            Contact / Phone Number *
                          </label>
                          <input 
                            type="tel" 
                            required
                            placeholder="e.g. +91 99887 76655"
                            value={clientContact}
                            onChange={(e) => setClientContact(e.target.value)}
                            className="w-full text-xs bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:border-amber-600 dark:focus:border-amber-500 transition-all text-slate-800 dark:text-zinc-100"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                          Project Brief &amp; Spatial Requirements *
                        </label>
                        <textarea 
                          required
                          rows={4}
                          placeholder="Please specify layout details (Bungalow flat, kitchen size, or corporate desk requirements at Shahjahanpur)..."
                          value={projectBrief}
                          onChange={(e) => setProjectBrief(e.target.value)}
                          className="w-full text-xs bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:border-amber-600 dark:focus:border-amber-500 transition-all text-slate-800 dark:text-zinc-100 resize-none"
                        />
                      </div>

                      {estimateDraft && (
                        <div className="p-3.5 bg-amber-50/50 dark:bg-amber-950/20 border border-dashed border-amber-300 dark:border-amber-900 rounded-lg space-y-2">
                          <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 block uppercase tracking-wider flex items-center gap-1">
                            <Info className="w-3.5 h-3.5" /> ATTACHED DRAFT FROM ESTIMATOR:
                          </span>
                          <pre className="text-[10.5px] font-mono text-slate-600 dark:text-zinc-400 leading-normal whitespace-pre-wrap max-h-36 overflow-y-auto pr-1">
                            {estimateDraft}
                          </pre>
                          <button
                            type="button"
                            onClick={() => setEstimateDraft('')}
                            className="text-[10px] text-red-500 font-mono hover:underline uppercase block"
                          >
                            Remove attached design layout parameters
                          </button>
                        </div>
                      )}

                      <div className="pt-4 flex flex-col sm:flex-row gap-3">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 flex items-center justify-center gap-1.5 py-3.5 px-6 bg-slate-900 hover:bg-slate-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white rounded-xl text-xs uppercase tracking-wider font-mono font-bold transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" /> {isSubmitting ? 'SENDING INQUIRY...' : 'SUBMIT INTERNAL FORM'}
                        </button>
                        <button
                          type="button"
                          onClick={handleWhatsAppConsult}
                          className="flex-1 flex items-center justify-center gap-1.5 py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs uppercase tracking-wider font-mono font-bold transition-all shadow-sm cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5" /> CONSULT DIRECT ON WHATSAPP
                        </button>
                      </div>

                    </form>

                  </div>

                </div>

                {/* Testimonial rating board at bottom of page */}
                <div className="pt-4">
                  <ReviewForm />
                </div>

              </div>
            )}

          </motion.div>
        </AnimatePresence>

      </main>

      {/* Persistent Visual Footer */}
      <footer className="mt-16 bg-slate-900 text-white border-t border-slate-800 py-12 px-6 md:px-12 text-center transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center justify-center md:justify-start gap-1 font-serif text-lg font-semibold tracking-wide text-zinc-100">
            <span className="text-amber-500 font-extrabold">VS</span> Architect Studio
          </div>
          <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest leading-normal">
            Eidgha Road, Shahjahanpur, UP, India. <br />
            © {new Date().getFullYear()} VS Architect. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-lg border border-amber-500/20 backdrop-blur-sm cursor-pointer transition-all duration-200"
            title="Scroll to Top"
            id="back-to-top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
