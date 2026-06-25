import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  ListTodo, 
  Calendar, 
  TrendingUp, 
  Sparkles, 
  Hammer, 
  Compass, 
  PackageOpen, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { ProjectType } from '../types';

interface ProjectProgressTrackerProps {
  project: ProjectType;
}

interface TimelinePhase {
  name: string;
  key: string;
  description: string;
  icon: React.ComponentType<any>;
  duration: string;
  defaultTasks: string[];
}

const PHASES: TimelinePhase[] = [
  {
    name: 'Planning & Concept',
    key: 'planning',
    description: 'Developing initial floor drafting layouts, structural analysis, client alignment briefs, and digital twin models.',
    icon: Compass,
    duration: '4 Weeks',
    defaultTasks: [
      'Site investigation and layout measurement',
      '2D floor layout drafting & zoning verification',
      '3D volume massing & solar exposure analysis',
      'Client design review & layout sign-off'
    ]
  },
  {
    name: 'Procurement & Sourcing',
    key: 'procurement',
    description: 'Securing structural materials, raw timber selections, specialized masonry masonry materials, and hardware contracts.',
    icon: PackageOpen,
    duration: '3 Weeks',
    defaultTasks: [
      'Teak timber / sandstone grade selections',
      'Double-glazed glass windows & insulation fittings',
      'Specialist artisan contractor agreements',
      'Structural steel & site delivery schedule'
    ]
  },
  {
    name: 'Execution & Masonry',
    key: 'execution',
    description: 'Core physical execution including civil framework, electrical conduit routing, plumbing lines, and custom joinery assembly.',
    icon: Hammer,
    duration: '12 Weeks',
    defaultTasks: [
      'Foundation layout and concrete frame pouring',
      'Brick-laying, wall plastering & custom lintels',
      'Concealed M&E conduits & wiring setup',
      'Rooftop water-proofing & modular insulation'
    ]
  },
  {
    name: 'Finishing & Handover',
    key: 'finishing',
    description: 'Final structural polishing, bespoke facade coatings, smart home testing, and key delivery ceremony.',
    icon: Sparkles,
    duration: '2 Weeks',
    defaultTasks: [
      'Wood panel polishing & micro-cement facade sprays',
      'Automation calibration (gate motors, ambient LEDs)',
      'Acoustic sealing and visual light audits',
      'Post-occupancy briefing and digital twin key release'
    ]
  }
];

export default function ProjectProgressTracker({ project }: ProjectProgressTrackerProps) {
  // Key state for the actively clicked/viewed phase details
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);

  // Store completed sub-tasks as a Record of projectId -> Record of phaseIndex_taskIndex -> boolean
  const [completedTasks, setCompletedTasks] = useState<Record<string, Record<string, boolean>>>({});

  // Helper to construct local task keys
  const getTaskKey = (phaseIdx: number, taskIdx: number) => `${phaseIdx}_${taskIdx}`;

  // Initialize some default checked tasks so the timeline doesn't start at 0%
  // Since these are COMPLETED projects, they should defaults to mostly completed, 
  // but allow full interactivity to toggle state.
  useEffect(() => {
    if (!completedTasks[project.id]) {
      // By default, let's complete Planning & Procurement (Phases 0 and 1) and most of Phase 2
      const defaults: Record<string, boolean> = {};
      
      // Phase 0: Planning (All completed)
      PHASES[0].defaultTasks.forEach((_, i) => { defaults[getTaskKey(0, i)] = true; });
      // Phase 1: Procurement (All completed)
      PHASES[1].defaultTasks.forEach((_, i) => { defaults[getTaskKey(1, i)] = true; });
      // Phase 2: Execution (3 out of 4 completed)
      defaults[getTaskKey(2, 0)] = true;
      defaults[getTaskKey(2, 1)] = true;
      defaults[getTaskKey(2, 2)] = true;
      // Phase 3: Finishing (1 out of 4 completed)
      defaults[getTaskKey(3, 0)] = true;

      setCompletedTasks(prev => ({
        ...prev,
        [project.id]: defaults
      }));
    }
  }, [project.id]);

  const projectState = completedTasks[project.id] || {};

  const toggleTask = (phaseIdx: number, taskIdx: number) => {
    const tKey = getTaskKey(phaseIdx, taskIdx);
    setCompletedTasks(prev => {
      const currentProjState = prev[project.id] || {};
      return {
        ...prev,
        [project.id]: {
          ...currentProjState,
          [tKey]: !currentProjState[tKey]
        }
      };
    });
  };

  // Calculate phase progress percentage
  const getPhaseProgress = (phaseIdx: number): number => {
    const tasks = PHASES[phaseIdx].defaultTasks;
    let completedCount = 0;
    tasks.forEach((_, i) => {
      if (projectState[getTaskKey(phaseIdx, i)]) completedCount++;
    });
    return Math.round((completedCount / tasks.length) * 100);
  };

  // Calculate overall project completion percentage
  const totalTasks = PHASES.reduce((acc, phase) => acc + phase.defaultTasks.length, 0);
  const completedTasksCount = PHASES.reduce((acc, phase, phaseIdx) => {
    let phaseCompleted = 0;
    phase.defaultTasks.forEach((_, taskIdx) => {
      if (projectState[getTaskKey(phaseIdx, taskIdx)]) phaseCompleted++;
    });
    return acc + phaseCompleted;
  }, 0);

  const overallProgress = totalTasks > 0 ? Math.round((completedTasksCount / totalTasks) * 100) : 0;

  // Complete entire phase helper
  const completeEntirePhase = (phaseIdx: number) => {
    const updated = { ...projectState };
    PHASES[phaseIdx].defaultTasks.forEach((_, i) => {
      updated[getTaskKey(phaseIdx, i)] = true;
    });
    setCompletedTasks(prev => ({
      ...prev,
      [project.id]: updated
    }));
  };

  // Reset all phases for this project
  const resetProjectTimeline = () => {
    setCompletedTasks(prev => ({
      ...prev,
      [project.id]: {}
    }));
  };

  return (
    <div className="bg-slate-50 dark:bg-zinc-900/60 p-5 rounded-2xl border border-slate-200/50 dark:border-zinc-800 space-y-5">
      {/* Tracker Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-200/80 dark:border-zinc-800">
        <div>
          <span className="text-[9px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest flex items-center gap-1">
            <TrendingUp className="w-3 h-3 animate-pulse" /> Live Construction Tracker
          </span>
          <h4 className="text-sm font-sans font-semibold text-slate-900 dark:text-zinc-100 uppercase tracking-wider mt-0.5">
            Phase Status &amp; Deliverables
          </h4>
        </div>

        {/* Global Progress Dial */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-wider">Project Handover State</span>
            <span className="text-xs font-mono font-bold text-slate-900 dark:text-zinc-100">{overallProgress}% Complete</span>
          </div>
          <div className="relative w-9 h-9 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="15"
                className="stroke-slate-200 dark:stroke-zinc-800 fill-none"
                strokeWidth="3.5"
              />
              <motion.circle
                cx="18"
                cy="18"
                r="15"
                className="stroke-amber-600 dark:stroke-amber-500 fill-none"
                strokeWidth="3.5"
                strokeDasharray={`${2 * Math.PI * 15}`}
                animate={{ strokeDashoffset: `${2 * Math.PI * 15 * (1 - overallProgress / 100)}` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </svg>
            <span className="absolute text-[8px] font-mono font-bold text-amber-600 dark:text-amber-400">
              {overallProgress}%
            </span>
          </div>
        </div>
      </div>

      {/* Modern Multi-Step Segmented Navigation Progress Bar */}
      <div className="grid grid-cols-4 gap-2">
        {PHASES.map((phase, idx) => {
          const Icon = phase.icon;
          const isSelected = idx === activePhaseIndex;
          const phaseProgress = getPhaseProgress(idx);
          const isFullyDone = phaseProgress === 100;

          return (
            <button
              key={phase.key}
              onClick={() => setActivePhaseIndex(idx)}
              className={`flex flex-col items-stretch text-left p-2.5 border transition-all relative group rounded-xl ${
                isSelected
                  ? 'bg-white dark:bg-zinc-950 border-amber-600/80 dark:border-amber-500/80 shadow-md ring-1 ring-amber-500/20'
                  : 'bg-white/40 dark:bg-zinc-900/40 border-slate-200/50 dark:border-zinc-800/80 hover:border-slate-300 dark:hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className={`p-1 rounded-md shrink-0 ${
                    isSelected 
                      ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400' 
                      : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[8px] font-mono font-semibold uppercase tracking-widest text-slate-400 dark:text-zinc-500 hidden sm:inline">
                    P0{idx + 1}
                  </span>
                </div>

                {/* Micro completion bubble */}
                {isFullyDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500 shrink-0" />
                ) : (
                  <span className="text-[8px] font-mono font-semibold text-slate-500 dark:text-zinc-400 shrink-0">
                    {phaseProgress}%
                  </span>
                )}
              </div>

              {/* Title label */}
              <span className="text-[10px] font-sans font-semibold text-slate-800 dark:text-zinc-200 tracking-wide mt-2 truncate">
                {phase.name.split(' ')[0]}
              </span>

              {/* Linear mini process line */}
              <div className="h-1 w-full bg-slate-100 dark:bg-zinc-800 rounded-full mt-2 overflow-hidden">
                <motion.div 
                  className={`h-full ${isFullyDone ? 'bg-emerald-600 dark:bg-emerald-500' : 'bg-amber-600 dark:bg-amber-500'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${phaseProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Phase Details Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePhaseIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-zinc-950 p-4 border border-slate-200/60 dark:border-zinc-800 rounded-xl space-y-4"
        >
          {/* Phase Meta details */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <span className="text-[9px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-zinc-900 text-slate-500 dark:text-zinc-400 rounded-md border border-slate-200/50 dark:border-zinc-800 uppercase tracking-widest">
                Phase 0{activePhaseIndex + 1} • {PHASES[activePhaseIndex].duration}
              </span>
              <h5 className="font-serif text-sm font-semibold text-slate-900 dark:text-zinc-100 mt-1">
                {PHASES[activePhaseIndex].name}
              </h5>
            </div>
            
            <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono flex items-center gap-1 shrink-0">
              <Clock className="w-3.5 h-3.5 text-amber-500" /> Planned Duration: {PHASES[activePhaseIndex].duration}
            </p>
          </div>

          <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-sans font-light">
            {PHASES[activePhaseIndex].description}
          </p>

          {/* Interactive Checklist list */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                <ListTodo className="w-3 h-3" /> Phase Deliverables Checklist
              </span>
              
              {getPhaseProgress(activePhaseIndex) < 100 && (
                <button
                  onClick={() => completeEntirePhase(activePhaseIndex)}
                  className="text-[9px] font-mono text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Complete All <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PHASES[activePhaseIndex].defaultTasks.map((task, idx) => {
                const isChecked = !!projectState[getTaskKey(activePhaseIndex, idx)];
                return (
                  <button
                    key={idx}
                    onClick={() => toggleTask(activePhaseIndex, idx)}
                    className={`flex items-start text-left p-2.5 border transition-all rounded-lg cursor-pointer group ${
                      isChecked
                        ? 'bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-500/20 dark:border-emerald-500/10'
                        : 'bg-slate-50/50 dark:bg-zinc-900/30 border-slate-100 dark:border-zinc-900 hover:border-slate-200 dark:hover:border-zinc-800'
                    }`}
                  >
                    <div className="mr-2.5 mt-0.5 shrink-0">
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-300 dark:text-zinc-700 group-hover:text-amber-500 transition-colors" />
                      )}
                    </div>
                    <span className={`text-xs leading-snug transition-colors ${
                      isChecked 
                        ? 'text-slate-500 dark:text-zinc-400 line-through' 
                        : 'text-slate-800 dark:text-zinc-200'
                    }`}>
                      {task}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Tracker footer controls */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-zinc-500 font-mono pt-1">
        <p>
          Click checklist items to dynamically adjust real-time blueprint completion rates.
        </p>
        <button
          onClick={resetProjectTimeline}
          className="text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
          title="Reset Deliverables to Empty"
        >
          <RotateCcw className="w-3 h-3" /> Reset Tracker
        </button>
      </div>
    </div>
  );
}
