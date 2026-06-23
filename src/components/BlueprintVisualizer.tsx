import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Grid3X3, Maximize2, Layers, MapPin, RefreshCw } from 'lucide-react';
import { BLUEPRINT_COORDINATES } from '../data';
import { BlueprintCoordinate } from '../types';

export default function BlueprintVisualizer() {
  const [gridDensity, setGridDensity] = useState<number>(40);
  const [columnsCount, setColumnsCount] = useState<number>(6);
  const [showCoordinates, setShowCoordinates] = useState<boolean>(true);
  const [selectedCoord, setSelectedCoord] = useState<BlueprintCoordinate>(BLUEPRINT_COORDINATES[0]);
  const [layoutMode, setLayoutMode] = useState<'wireframe' | '3d-elevation'>('wireframe');
  const [isCrosshairActive, setIsCrosshairActive] = useState<boolean>(true);

  // Simple state reset
  const handleReset = () => {
    setGridDensity(40);
    setColumnsCount(6);
    setLayoutMode('wireframe');
    setSelectedCoord(BLUEPRINT_COORDINATES[0]);
  };

  return (
    <div id="blueprint-visualizer" className="bg-stone shadow-sm rounded-2xl p-6 md:p-8 border border-white/50 dark:bg-zinc-900 dark:border-zinc-800 transition-colors duration-300">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <span className="text-amber-600 dark:text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 animate-spin-slow text-amber-500" /> Interactive drafting board
          </span>
          <h3 className="text-2xl font-serif text-slate-900 dark:text-zinc-100 font-normal">
            Blueprint <em>Interactive Play</em>
          </h3>
          <p className="text-slate-600 dark:text-zinc-400 text-xs mt-1">
            Toggle grids, coordinate systems, and draft spans to visualize structural flows.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setLayoutMode('wireframe')}
            className={`px-3 py-1.5 rounded-md font-mono transition-all ${
              layoutMode === 'wireframe'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white/70 dark:bg-zinc-800 text-slate-800 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-700'
            }`}
          >
            2D Wireframe
          </button>
          <button
            onClick={() => setLayoutMode('3d-elevation')}
            className={`px-3 py-1.5 rounded-md font-mono transition-all ${
              layoutMode === '3d-elevation'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white/70 dark:bg-zinc-800 text-slate-800 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-700'
            }`}
          >
            Elevation Render
          </button>
          <button
            onClick={handleReset}
            title="Reset Board"
            className="p-1.5 rounded-md bg-white/70 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-700 transition-all border border-transparent hover:border-slate-300 dark:hover:border-zinc-600"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Playboard Canvas */}
        <div className="lg:col-span-7 bg-slate-950 text-emerald-400 dark:text-sky-400 rounded-xl overflow-hidden relative min-h-[340px] border border-slate-800 shadow-inner flex flex-col justify-between p-4">
          
          {/* Coordinates Legend */}
          <div className="absolute top-3 left-3 z-10 font-mono text-[10px] text-zinc-400 bg-slate-900/80 backdrop-blur-md p-2 rounded border border-slate-800 space-y-0.5">
            <span className="block text-amber-400 font-semibold uppercase tracking-wider">Site telemetry:</span>
            <span className="block">W_SPANS: {columnsCount} Axis</span>
            <span className="block">GRID_SZ: {gridDensity}px</span>
            <span className="block">MODE: {layoutMode.toUpperCase()}</span>
          </div>

          <div className="absolute top-3 right-3 z-10 font-mono text-[10px] text-zinc-400 bg-slate-900/80 backdrop-blur-md p-2 rounded border border-slate-800">
            <span className="text-emerald-400 font-bold animate-pulse">● FEED REEL ACTIVE</span>
          </div>

          {/* Blueprint Canvas Grid */}
          <div className="absolute inset-0 pt-16 p-4 flex items-center justify-center pointer-events-none overflow-hidden">
            <div 
              className="w-full h-full relative transition-all duration-300"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(245, 158, 11, 0.15) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(245, 158, 11, 0.15) 1px, transparent 1px)
                `,
                backgroundSize: `${gridDensity}px ${gridDensity}px`,
                opacity: 0.85
              }}
            >
              {/* Dynamic Columns Render based on slider */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-around px-8">
                {Array.from({ length: columnsCount }).map((_, i) => (
                  <div 
                    key={i} 
                    className="h-44 w-[2px] bg-amber-500/30 dark:bg-sky-500/30 relative flex flex-col justify-between"
                  >
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-amber-500 dark:text-sky-400">
                      C{i + 1}
                    </span>
                    <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-amber-500 dark:text-sky-400">
                      R_{i}
                    </span>
                  </div>
                ))}
              </div>

              {/* Crosshair Mock */}
              {isCrosshairActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-dashed border-rose-500/60 animate-spin-slow flex items-center justify-center">
                    <span className="block w-2.5 h-[1px] bg-rose-500"></span>
                    <span className="absolute block h-2.5 w-[1px] bg-rose-500"></span>
                  </div>
                  <div className="absolute top-0 bottom-0 left-1/2 w-[1px] border-l border-dashed border-zinc-700/80" />
                  <div className="absolute left-0 right-0 top-1/2 h-[1px] border-t border-dashed border-zinc-700/80" />
                </div>
              )}

              {/* Layout Mode visual enhancements */}
              {layoutMode === '3d-elevation' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-gradient-to-t from-amber-950/20 to-transparent flex items-bottom justify-end p-8"
                >
                  <svg className="w-48 h-36 text-amber-400/80 self-end opacity-60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.75">
                    {/* Isometric Mockup Drawing of Modern Architecture */}
                    <path d="M10,80 L50,60 L90,80 L50,95 Z" />
                    <path d="M10,80 L10,40 L50,20 L50,60 Z" fill="rgba(245, 158, 11, 0.05)" />
                    <path d="M90,80 L90,40 L50,20 L50,60 Z" />
                    <path d="M50,20 L70,10 L100,25 L80,35 Z" />
                    {/* Windows detail */}
                    <line x1="20" y1="50" x2="20" y2="70" />
                    <line x1="30" y1="45" x2="30" y2="65" />
                    <line x1="40" y1="40" x2="40" y2="60" />
                  </svg>
                </motion.div>
              )}
            </div>
          </div>

          <div className="mt-auto pt-24 z-10 w-full flex justify-between items-end font-mono text-[10px] text-zinc-500">
            <span>28° 36' N | 79° 54' E</span>
            <div className="flex gap-2">
              <span className="text-zinc-600">SCALE: 1:150</span>
              <span className="text-amber-500 font-semibold">{layoutMode.toUpperCase()} VIEW</span>
            </div>
          </div>
        </div>

        {/* Controller Sidebar dashboard */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
              DRAFT PARAMETERS
            </h4>

            {/* Slider 1: Grid density */}
            <div className="space-y-1 bg-white/40 dark:bg-zinc-800/40 p-3 rounded-lg border border-white/20 dark:border-zinc-800">
              <div className="flex justify-between text-xs">
                <span className="text-slate-700 dark:text-zinc-300 flex items-center gap-1">
                  <Grid3X3 className="w-3.5 h-3.5 text-slate-500" /> Grid Size
                </span>
                <span className="font-mono text-slate-900 dark:text-zinc-100">{gridDensity}px</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                value={gridDensity}
                onChange={(e) => setGridDensity(Number(e.target.value))}
                className="w-full accent-amber-600 h-1 bg-slate-300 dark:bg-zinc-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 2: Columns count */}
            <div className="space-y-1 bg-white/40 dark:bg-zinc-800/40 p-3 rounded-lg border border-white/20 dark:border-zinc-800 font-sans">
              <div className="flex justify-between text-xs">
                <span className="text-slate-700 dark:text-zinc-300 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-slate-500" /> Structural Spans
                </span>
                <span className="font-mono text-slate-900 dark:text-zinc-100">{columnsCount} Columns</span>
              </div>
              <input
                type="range"
                min="3"
                max="12"
                value={columnsCount}
                onChange={(e) => setColumnsCount(Number(e.target.value))}
                className="w-full accent-amber-600 h-1 bg-slate-300 dark:bg-zinc-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Selector: Telemetry Markers */}
            <div className="bg-white/40 dark:bg-zinc-800/40 p-3 rounded-lg border border-white/20 dark:border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" /> Site Landmarks
                </span>
                <label className="relative inline-flex items-center cursor-pointer scale-90">
                  <input 
                    type="checkbox" 
                    checked={showCoordinates} 
                    onChange={(e) => setShowCoordinates(e.target.checked)} 
                    className="sr-only peer" 
                  />
                  <div className="w-9 h-5 bg-zinc-300 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600"></div>
                </label>
              </div>

              {showCoordinates && (
                <div className="grid grid-cols-2 gap-1.5 pt-1.5">
                  {BLUEPRINT_COORDINATES.map((coord) => (
                    <button
                      key={coord.label}
                      onClick={() => setSelectedCoord(coord)}
                      className={`text-[10px] p-2 leading-tight rounded border text-left transition-all ${
                        selectedCoord.label === coord.label
                          ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/20 text-slate-900 dark:text-amber-300 font-semibold'
                          : 'border-slate-200 dark:border-zinc-700 hover:bg-white/60 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400'
                      }`}
                    >
                      <span className="block font-sans truncate">{coord.label}</span>
                      <span className="block font-mono text-[9px] text-zinc-500 dark:text-zinc-500 truncate">
                        {coord.x}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Checkbox settings */}
            <div className="flex items-center justify-between text-xs px-2 pt-1 text-slate-600 dark:text-zinc-400">
              <span>Enable centering crosshair</span>
              <input
                type="checkbox"
                checked={isCrosshairActive}
                onChange={(e) => setIsCrosshairActive(e.target.checked)}
                className="rounded accent-amber-600 bg-zinc-100 dark:bg-zinc-800 border-zinc-300 text-amber-600 focus:ring-amber-500 h-4 w-4"
              />
            </div>
          </div>

          {/* Active coordinate stats output */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/30 rounded-xl space-y-2">
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 font-sans uppercase">
                {selectedCoord.label} Scope
              </span>
            </div>
            <div className="font-mono text-[11px] grid grid-cols-2 gap-y-1 text-slate-700 dark:text-zinc-300 border-b border-amber-200/50 pb-2">
              <span className="text-zinc-500">LATITUDE:</span>
              <span>{selectedCoord.x}</span>
              <span className="text-zinc-500">LONGITUDE:</span>
              <span>{selectedCoord.y}</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed font-sans italic">
              "{selectedCoord.notes}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
