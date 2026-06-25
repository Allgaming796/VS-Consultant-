import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, HelpCircle, Clock, DraftingCompass } from 'lucide-react';

interface FAQData {
  question: string;
  answer: string;
  category: 'timeline' | 'process' | 'billing' | 'sourcing';
}

const FAQ_ITEMS: FAQData[] = [
  {
    category: 'process',
    question: "What is VS Architect's complete design process?",
    answer: "Our architectural service is divided into four distinct milestones: 1) Initial Spatial Design & Conceptual Consultation, 2) Multi-angle 3D Visualization models, 3) Detailed Blueprint Drafting (including structural, electrical, and modular kitchen specifications), and 4) Turnkey Procurement of furniture, fixtures, and on-site directing."
  },
  {
    category: 'timeline',
    question: "How long does a typical interior and customized carpentry execution take?",
    answer: "The layout design, drafting, and 3D rendering phase typically takes 3 to 5 weeks. Physical site implementation (double-brick masonry work, custom carpentry, premium polish, and final finishings) takes between 95 to 150 days depending on the structural scope and square footage."
  },
  {
    category: 'process',
    question: "Can I hire VS Architect for individual private rooms, bathrooms, or kitchen designs?",
    answer: "Absolutely. We routinely draft customized layouts for single bedrooms, modular spice kitchens, vertical terrace gardens, or private office floor plans. You can use our Pricing Estimator tool on the site to calculate pricing models for individual rooms."
  },
  {
    category: 'sourcing',
    question: "How do you handle premium materials, laminates, and vendor selection?",
    answer: "We partner directly with trusted, certified Indian and imported modular component brands. We provide digital material catalogues, soft-close hardware specifications, and transparent material bills. The final choice of veneer, quartz, and stone remains entirely with the client."
  },
  {
    category: 'timeline',
    question: "How does the site monitoring process work during active construction?",
    answer: "For our complete turnkey executions, our experts conduct periodic, bi-weekly physical site audit visits to guarantee structural integrity, check alignments against AutoCAD blueprints, and manage local labor teams to avoid construction delays."
  },
  {
    category: 'billing',
    question: "Do you visit site locations outside of Shahjahanpur?",
    answer: "While our core design studio is situated on Eidgha Road, Shahjahanpur, UP, we accept select corporate office and premium residential consulting proposals throughout neighboring regions, including Moradabad and Bareilly."
  }
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { label: 'All Queries', id: 'all' },
    { label: 'Process & Design', id: 'process' },
    { label: 'Timelines & Oversight', id: 'timeline' },
    { label: 'Materials & Sourcing', id: 'sourcing' }
  ];

  const filteredFAQs = FAQ_ITEMS.filter(
    item => activeCategory === 'all' || item.category === activeCategory
  );

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faqs" className="bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 rounded-3xl p-6 md:p-8 shadow-sm transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <span className="text-amber-600 dark:text-amber-400 font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" /> Support Hub
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 dark:text-zinc-100 font-light mt-1">
            Commonly Asked <em>Questions</em>
          </h3>
          <p className="text-slate-500 dark:text-zinc-400 text-xs mt-1">
            Understand how we draft structures, manage carpentry timelines, and audit active sites.
          </p>
        </div>

        {/* Category switcher */}
        <div className="flex flex-wrap gap-1.5 self-start md:self-center">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIndex(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all font-medium border ${
                activeCategory === cat.id
                  ? 'bg-amber-600 border-amber-600 text-white shadow-sm'
                  : 'bg-transparent border-slate-100 dark:border-zinc-900 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-zinc-900 max-w-4xl mx-auto">
        {filteredFAQs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="py-4 font-sans">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left py-2 hover:text-amber-600 dark:hover:text-amber-400 transition-colors focus:outline-none group"
              >
                <div className="flex items-start gap-3">
                  <span className={`p-1 rounded-md mt-0.5 transition-colors ${
                    isOpen 
                      ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400' 
                      : 'bg-slate-50 dark:bg-zinc-900/40 text-slate-400'
                  }`}>
                    <DraftingCompass className="w-3.5 h-3.5 animate-pulse" />
                  </span>
                  <span className="font-serif text-sm md:text-base font-medium text-slate-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {faq.question}
                  </span>
                </div>
                <span className="text-slate-400 dark:text-zinc-650 ml-4 shrink-0">
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pl-8 pr-4 pt-2 pb-4 text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-light space-y-2">
                      <p>{faq.answer}</p>
                      <div className="flex items-center gap-1.5 text-[10px] text-amber-700 dark:text-amber-450 font-mono">
                        <Clock className="w-3 h-3" />
                        <span className="uppercase tracking-wider">
                          {faq.category === 'timeline' && 'Timeline Guarantee Match'}
                          {faq.category === 'process' && 'Structural Drafting Phase'}
                          {faq.category === 'billing' && 'Local Consult Scope'}
                          {faq.category === 'sourcing' && 'Authentic Material Curation'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
