import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Maximize2, MapPin, Calendar, Layout, Compass } from 'lucide-react';
import { COMPLETED_PROJECTS } from '../data';
import { ProjectType } from '../types';

export default function ProjectGallery() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

  // Category list filter
  const categories = [
    { label: 'All Projects', id: 'all' },
    { label: 'Residential Development', id: 'residential' },
    { label: 'Corporate Office', id: 'commercial' },
    { label: 'Luxe Interior', id: 'interior' },
    { label: 'Landscape & Greenery', id: 'landscape' }
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
        <div className="flex flex-wrap gap-1 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all font-medium ${
                activeCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
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
                transition={{ duration: 0.3 }}
                className="group relative bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 rounded-3xl overflow-hidden hover:shadow-xl dark:shadow-none hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
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
                      onClick={() => setSelectedProject(proj)}
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
                    <h3 className="text-lg font-serif font-semibold text-slate-905 dark:text-zinc-100 hover:text-amber-650 transition cursor-pointer" onClick={() => setSelectedProject(proj)}>
                      {proj.title}
                    </h3>
                    <p className="text-slate-500 dark:text-zinc-400 text-xs flex items-center gap-1 mt-1 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-zinc-455" /> {proj.location}
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

      {/* Elegant Details Overlay Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="bg-white dark:bg-zinc-905 bg-slate-50 dark:bg-zinc-950 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative border border-slate-100 dark:border-zinc-800"
            >
              {/* Close Button top corner */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-25 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full backdrop-blur-md border border-white/20 hover:scale-105 transition"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Cover Modal header background image */}
              <div className="h-64 sm:h-80 relative overflow-hidden bg-slate-100 dark:bg-zinc-900">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-4 left-4 bg-amber-600 text-white font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow border border-white/20">
                  {selectedProject.category}
                </span>
              </div>

              {/* Data panel content */}
              <div className="p-6 md:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                  <div>
                    <span className="text-xs font-mono text-amber-600 dark:text-amber-400 tracking-wider block">
                      {selectedProject.architect} — {selectedProject.year}
                    </span>
                    <h3 className="text-2xl font-serif text-slate-900 dark:text-zinc-150 font-normal">
                      {selectedProject.title}
                    </h3>
                    <p className="text-slate-500 dark:text-zinc-400 text-xs flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-450" /> {selectedProject.location}
                    </p>
                  </div>

                  <div className="text-left sm:text-right font-mono text-[11px] text-slate-800 dark:text-zinc-300 space-y-1">
                    <div className="bg-slate-100 dark:bg-zinc-900 px-3 py-1.5 rounded-lg border border-slate-200/50 dark:border-zinc-800">
                      <span className="text-zinc-500 block uppercase text-[8px] tracking-wider">PROJECT COVERING</span>
                      <span className="font-semibold block">{selectedProject.size}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-3 border-t border-slate-200/65 dark:border-zinc-800 font-sans">
                  <div>
                    <h4 className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-1.5">
                      DESCRIPTION &amp; CONCEPT
                    </h4>
                    <p className="text-slate-700 dark:text-zinc-300 text-xs leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-2">
                      SPECIFICATION DETAILS
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedProject.highlights.map((hil, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-650 dark:text-zinc-400 font-mono">
                          <Layout className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span>{hil}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
