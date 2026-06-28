import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  X, 
  Maximize2, 
  MapPin, 
  Calendar, 
  Layout, 
  Compass,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Boxes,
  Sparkles
} from 'lucide-react';
import { COMPLETED_PROJECTS } from '../data';
import { ProjectType } from '../types';
import ProjectProgressTracker from './ProjectProgressTracker';

export default function ProjectGallery() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const handleSelectProject = (proj: ProjectType) => {
    setSelectedProject(proj);
    setActiveImageIndex(0);
  };

  // Category list filter
  const categories = [
    { label: 'All', id: 'all' },
    { label: 'Residential', id: 'residential' },
    { label: 'Commercial', id: 'commercial' },
    { label: 'Interior', id: 'interior' },
    { label: 'Landscape', id: 'landscape' }
  ];

  // Live filter pipeline
  const filteredProjects = useMemo(() => {
    return COMPLETED_PROJECTS.filter((p) => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div id="project-gallery" className="space-y-6">
      
      {/* Filtering Hub header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/45 dark:bg-zinc-900/50 p-4 rounded-2xl border border-slate-100 dark:border-zinc-850 backdrop-blur-md">
        
        {/* Category Pill Navigation */}
        <div className="flex flex-wrap gap-1 w-full md:w-auto bg-slate-100/60 dark:bg-zinc-950/60 p-1 rounded-full border border-slate-200/50 dark:border-zinc-850/80">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all font-medium ${
                activeCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-900/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Search bar */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search projects, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-lg pl-9 pr-4 py-2.5 outline-none focus:border-amber-600 dark:focus:border-amber-500 text-slate-800 dark:text-zinc-100 transition-all font-sans"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-amber-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid container with standard animate layout stagger */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-center py-16 bg-white dark:bg-zinc-950 rounded-2xl border border-slate-100 dark:border-zinc-900"
            >
              <p className="text-slate-500 dark:text-zinc-400 text-sm italic">
                No architectural structures matched your current filtration criteria.
              </p>
            </motion.div>
          ) : (
            filteredProjects.map((proj) => (
              <motion.div
                layout
                key={proj.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ 
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                  duration: 0.3 
                }}
                className="group relative bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 rounded-3xl overflow-hidden hover:shadow-xl dark:hover:shadow-zinc-900/40 transition-shadow duration-300 flex flex-col justify-between cursor-pointer"
                onClick={() => handleSelectProject(proj)}
              >
                {/* Visual Cover */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-100 dark:bg-zinc-900">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy animate-pulse"
                  />
                  {/* Category overlay label */}
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-white/10">
                    {proj.category}
                  </span>

                  {/* Corner Coordinate Detail */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleSelectProject(proj)}
                      className="p-2 bg-amber-600 rounded-full text-white shadow hover:bg-amber-700 transition"
                      title="Inspect Details"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Info Deck */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
                      {proj.architect}
                    </span>
                    <h3 className="text-lg font-serif font-semibold text-slate-900 dark:text-zinc-100 hover:text-amber-600 transition cursor-pointer" onClick={() => handleSelectProject(proj)}>
                      {proj.title}
                    </h3>
                    <p className="text-slate-500 dark:text-zinc-400 text-xs flex items-center gap-1 mt-1 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" /> {proj.location}
                    </p>
                  </div>

                  {/* Desc excerpt */}
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                    {proj.description}
                  </p>

                  <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-zinc-900 font-mono text-[10px] text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> {proj.size}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-zinc-450" /> Completed: {proj.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* Immersive Cinematic Full-Screen Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: "spring", damping: 32, stiffness: 220 }}
            className="fixed inset-0 bg-white dark:bg-zinc-950 z-50 overflow-y-auto flex flex-col font-sans"
          >
            {/* Minimalist Agency Top Header (Sticky) */}
            <div className="sticky top-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md z-45 border-b border-slate-100 dark:border-zinc-900 px-6 py-4 md:px-12 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex items-center gap-2 text-xs font-mono font-medium text-slate-500 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>RETURN TO GALLERY</span>
                </button>
                <span className="h-4 w-px bg-slate-200 dark:bg-zinc-800 hidden sm:inline" />
                <span className="text-xs font-mono text-slate-400 dark:text-zinc-500 hidden sm:inline">
                  STUDIO ARCHIVE / {selectedProject.id.toUpperCase()}
                </span>
              </div>

              {/* Project title shortcut context */}
              <div className="hidden lg:block">
                <h2 className="text-sm font-serif font-medium text-slate-900 dark:text-zinc-100 italic">
                  {selectedProject.title}
                </h2>
              </div>

              <div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-500 dark:hover:text-black font-mono text-xs font-medium transition-all duration-200"
                >
                  <span>CLOSE</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Immersive Inner Page Layout */}
            <div className="flex-grow w-full max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                
                {/* Left Visual Gallery Panel (lg:col-span-7) */}
                <div className="lg:col-span-7 space-y-6">
                  
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="bg-amber-600/10 text-amber-700 dark:text-amber-400 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md font-semibold">
                        {selectedProject.category}
                      </span>
                      <span className="text-zinc-300 dark:text-zinc-800">•</span>
                      <span className="text-xs font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
                        {selectedProject.architect}
                      </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-zinc-50 leading-tight">
                      {selectedProject.title}
                    </h1>
                    
                    <p className="text-slate-500 dark:text-zinc-400 text-sm flex items-center gap-1.5 font-sans pt-1">
                      <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400" /> 
                      <span className="font-medium text-slate-700 dark:text-zinc-300">{selectedProject.location}</span>
                    </p>
                  </div>

                  {/* High-Resolution Interactive Sliders Viewport */}
                  <div className="relative h-72 sm:h-[500px] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-zinc-900 group/gallery shadow-lg border border-slate-200/30 dark:border-zinc-850">
                    {(() => {
                      const images = selectedProject.galleryImages && selectedProject.galleryImages.length > 0 
                        ? selectedProject.galleryImages 
                        : [selectedProject.image];
                      const currentImage = images[activeImageIndex] || selectedProject.image;

                      const nextImage = () => {
                        setActiveImageIndex((prev) => (prev + 1) % images.length);
                      };

                      const prevImage = () => {
                        setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
                      };

                      return (
                        <>
                          <img
                            src={currentImage}
                            alt={`${selectedProject.title} architectural snapshot`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-all duration-300"
                          />

                          {/* Navigation Overlays */}
                          {images.length > 1 && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  prevImage();
                                }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white backdrop-blur-md transition-all opacity-0 group-hover/gallery:opacity-100 shadow-md border border-white/10"
                              >
                                <ArrowLeft className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  nextImage();
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white backdrop-blur-md transition-all opacity-0 group-hover/gallery:opacity-100 shadow-md border border-white/10"
                              >
                                <ArrowRight className="w-4 h-4" />
                              </button>

                              {/* Cinematic Position Dot Array */}
                              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10">
                                {images.map((_, i) => (
                                  <button
                                    key={i}
                                    onClick={() => setActiveImageIndex(i)}
                                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                                      activeImageIndex === i ? 'bg-amber-400 w-3' : 'bg-white/40 hover:bg-white/75'
                                    }`}
                                  />
                                ))}
                              </div>

                              {/* Floating Status Count Label */}
                              <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md text-white font-mono text-[9px] font-semibold px-2.5 py-1.5 rounded-md border border-white/10 tracking-widest uppercase">
                                IMAGE {activeImageIndex + 1} / {images.length}
                              </div>
                            </>
                          )}
                        </>
                      );
                    })()}
                  </div>

                  {/* Elegant Thumbnails Selector Panel */}
                  {selectedProject.galleryImages && selectedProject.galleryImages.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto py-2 scrollbar-none border-b border-slate-100 dark:border-zinc-900 pb-4">
                      {selectedProject.galleryImages.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative h-16 w-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                            activeImageIndex === idx 
                              ? 'border-amber-600 ring-4 ring-amber-600/20 dark:ring-amber-500/10' 
                              : 'border-transparent hover:border-slate-350 dark:hover:border-zinc-700'
                          }`}
                        >
                          <img
                            src={imgUrl}
                            alt="Gallery slide index trigger"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          {activeImageIndex !== idx && (
                            <div className="absolute inset-0 bg-slate-950/20 hover:bg-transparent transition-all duration-200" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* MATERIAL SPECIFICATIONS USED block inside the Left column */}
                  <div className="bg-slate-50 dark:bg-zinc-900/30 p-6 rounded-2xl border border-slate-100 dark:border-zinc-900 space-y-4">
                    <h4 className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                      <Boxes className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      SPECIFIC MATERIAL LISTS &amp; BLUEPRINTS USED
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedProject.materialsUsed.map((mat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-zinc-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-500 mt-2 flex-shrink-0" />
                          <span className="font-sans leading-relaxed">{mat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right Structural Details & Progress Column (lg:col-span-5) */}
                <div className="lg:col-span-5 space-y-8">
                  
                  {/* Narrative Section */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
                      CONCEPT DESIGN NARRATIVE
                    </h4>
                    <p className="text-slate-700 dark:text-zinc-300 text-sm leading-relaxed font-sans font-light">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Dimensional Metrics */}
                  <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                    <div className="bg-slate-50 dark:bg-zinc-900/40 p-4 rounded-xl border border-slate-100 dark:border-zinc-900 shadow-sm">
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-zinc-500 block mb-1">TOTAL SPACE COVERING</span>
                      <span className="font-semibold text-slate-900 dark:text-zinc-200 text-sm flex items-center gap-1.5">
                        <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        {selectedProject.size}
                      </span>
                    </div>
                    <div className="bg-slate-50 dark:bg-zinc-900/40 p-4 rounded-xl border border-slate-100 dark:border-zinc-900 shadow-sm">
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-zinc-500 block mb-1">COMPLETION STAMP</span>
                      <span className="font-semibold text-slate-900 dark:text-zinc-200 text-sm flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        {selectedProject.year}
                      </span>
                    </div>
                  </div>

                  {/* THE ARCHITECTURAL CHALLENGE SOLVED */}
                  <div className="pt-2">
                    <h4 className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-3.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      ARCHITECTURAL CHALLENGE SOLVED
                    </h4>
                    
                    <div className="border border-amber-600/15 dark:border-amber-500/15 bg-amber-600/[0.02] p-5 rounded-2xl space-y-2">
                      <span className="text-[9px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-mono font-bold flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        SPATIAL CONSTRAINT &amp; CHALLENGE
                      </span>
                      <p className="text-slate-600 dark:text-zinc-400 text-xs leading-relaxed font-sans">
                        {selectedProject.challengeSolved}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Construction Progress Timeline Tracker */}
                  <div className="pt-2">
                    <h4 className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-4">
                      CONSTRUCTION TIMELINE &amp; MILESTONES
                    </h4>
                    <div className="bg-slate-50 dark:bg-zinc-900/30 p-5 rounded-2xl border border-slate-100 dark:border-zinc-900">
                      <ProjectProgressTracker project={selectedProject} />
                    </div>
                  </div>

                  {/* Key Highlights Grid */}
                  <div className="pt-2">
                    <h4 className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-3.5">
                      HIGHLIGHT SPECIFICATIONS
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedProject.highlights.map((hil, i) => (
                        <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-900/20 border border-slate-100 dark:border-zinc-900 text-[11px] text-slate-600 dark:text-zinc-400 font-mono">
                          <Layout className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                          <span className="truncate">{hil}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
