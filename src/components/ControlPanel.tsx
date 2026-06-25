import React from 'react';
import { Sun, Sliders, Layers, MousePointer, Settings, Key } from 'lucide-react';
import { TimeOfDay, MaterialTheme } from '../types';

interface ControlPanelProps {
  timeOfDay: TimeOfDay;
  setTimeOfDay: (time: TimeOfDay) => void;
  theme: MaterialTheme;
  setTheme: (theme: MaterialTheme) => void;
  explodeProgress: number;
  setExplodeProgress: (progress: number) => void;
  interactionMode: 'cursor' | 'orbit';
  setInteractionMode: (mode: 'cursor' | 'orbit') => void;
  gateOpen: boolean;
  setGateOpen: (open: boolean) => void;
  activeHotspot: string | null;
  setActiveHotspot: (id: string | null) => void;
}

export default function ControlPanel({
  timeOfDay,
  setTimeOfDay,
  theme,
  setTheme,
  explodeProgress,
  setExplodeProgress,
  interactionMode,
  setInteractionMode,
  gateOpen,
  setGateOpen,
  activeHotspot,
  setActiveHotspot
}: ControlPanelProps) {
  return (
    <div
      id="control-panel-card"
      className="bg-[#0c0c0c]/80 backdrop-blur-md p-5 rounded-none border border-white/10 shadow-2xl transition-all duration-300 flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Settings className="w-3.5 h-3.5 text-white/60 animate-spin-slow" />
          <h2 className="font-medium text-xs text-white uppercase tracking-[0.2em] font-sans">
            Configuration
          </h2>
        </div>
        <span className="text-[8px] font-mono border border-white/20 text-white/50 px-2 py-0.5 rounded-none font-medium uppercase tracking-[0.2em]">
          Sandbox v1.0
        </span>
      </div>

      {/* 1. Time of Day Control */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 flex items-center gap-1.5 font-mono">
          <Sun className="w-3 h-3 text-white/40" />
          Environmental Lighting
        </label>
        <div className="grid grid-cols-3 gap-1 bg-white/[0.02] border border-white/5 p-1 rounded-none">
          <button
            id="time-day-btn"
            onClick={() => setTimeOfDay('day')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 text-[9px] uppercase tracking-[0.2em] font-medium rounded-none transition-all cursor-pointer ${
              timeOfDay === 'day'
                ? 'bg-white text-black font-semibold'
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            Day
          </button>
          <button
            id="time-sunset-btn"
            onClick={() => setTimeOfDay('sunset')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 text-[9px] uppercase tracking-[0.2em] font-medium rounded-none transition-all cursor-pointer ${
              timeOfDay === 'sunset'
                ? 'bg-white text-black font-semibold'
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            Sunset
          </button>
          <button
            id="time-night-btn"
            onClick={() => setTimeOfDay('night')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 text-[9px] uppercase tracking-[0.2em] font-medium rounded-none transition-all cursor-pointer ${
              timeOfDay === 'night'
                ? 'bg-white text-black font-semibold'
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            Night
          </button>
        </div>
      </div>

      {/* 2. Interactive Exploded View */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 flex items-center gap-1.5 font-mono">
            <Layers className="w-3 h-3 text-white/40" />
            3D Exploded View
          </label>
          <span className="text-[10px] font-mono font-medium text-white/85">
            {Math.round(explodeProgress * 100)}% Lifted
          </span>
        </div>
        <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-3 rounded-none">
          <input
            id="explode-slider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={explodeProgress}
            onChange={(e) => setExplodeProgress(parseFloat(e.target.value))}
            className="w-full accent-white cursor-pointer h-1 bg-white/15 rounded-none appearance-none"
          />
        </div>
        <p className="text-[10px] text-white/40 leading-tight">
          Drags apart building floors vertically to reveal alignment structural gaps.
        </p>
      </div>

      {/* 3. Interaction Mechanics */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 flex items-center gap-1.5 font-mono">
          <MousePointer className="w-3 h-3 text-white/40" />
          Camera Mechanics
        </label>
        <div className="grid grid-cols-2 gap-1 bg-white/[0.02] border border-white/5 p-1 rounded-none">
          <button
            id="interaction-cursor-btn"
            onClick={() => {
              setInteractionMode('cursor');
              setActiveHotspot(null);
            }}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 text-[9px] uppercase tracking-[0.2em] font-medium rounded-none transition-all cursor-pointer ${
              interactionMode === 'cursor'
                ? 'bg-white text-black font-semibold'
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            Cursor Parallax
          </button>
          <button
            id="interaction-orbit-btn"
            onClick={() => setInteractionMode('orbit')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 text-[9px] uppercase tracking-[0.2em] font-medium rounded-none transition-all cursor-pointer ${
              interactionMode === 'orbit'
                ? 'bg-white text-black font-semibold'
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            Free 360° Spin
          </button>
        </div>
        <p className="text-[10px] text-white/40 leading-tight">
          {interactionMode === 'cursor'
            ? 'Hover your mouse over the 3D model to smoothly shift camera viewpoints.'
            : 'Left-click & drag on model to spin freely. Scroll to Zoom, Right-click to Pan.'}
        </p>
      </div>

      {/* 4. Building Material Customizer */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 flex items-center gap-1.5 font-mono">
          <Sliders className="w-3 h-3 text-white/40" />
          Material Themes
        </label>
        <div className="flex flex-col gap-2">
          {[
            { id: 'modern-white', label: 'Modern White & Teak', desc: 'White stucco facade & warm wood planks.' },
            { id: 'warm-beige', label: 'Warm Sand & Mahogany', desc: 'Cream sand masonry & deep rich panelings.' },
            { id: 'industrial-slate', label: 'Industrial Slate & Ash', desc: 'Cool slate concrete & dark graphite metal trims.' }
          ].map((item) => (
            <button
              key={item.id}
              id={`theme-btn-${item.id}`}
              onClick={() => setTheme(item.id as MaterialTheme)}
              className={`flex flex-col items-start p-2.5 rounded-none text-left border text-xs transition-all cursor-pointer ${
                theme === item.id
                  ? 'border-white bg-white/5'
                  : 'border-white/10 hover:border-white/30 bg-white/[0.01]'
              }`}
            >
              <span className={`font-medium uppercase tracking-[0.1em] text-[10px] ${theme === item.id ? 'text-white' : 'text-white/60'}`}>
                {item.label}
              </span>
              <span className="text-[9px] text-white/40 mt-0.5 font-sans">{item.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 5. Gate Trigger Panel */}
      <div className="flex items-center justify-between bg-[#0e0e0e] p-3 rounded-none border border-white/10">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.1em] font-medium text-white/80 flex items-center gap-1.5">
            <Key className="w-3 h-3 text-white/40" />
            Automatic Main Gate
          </span>
          <span className="text-[9px] text-white/40 mt-0.5">
            {gateOpen ? 'Gate sliding open' : 'Gate fully closed'}
          </span>
        </div>
        <button
          id="gate-toggle-btn"
          onClick={() => setGateOpen(!gateOpen)}
          className={`px-3 py-1.5 rounded-none text-[9px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
            gateOpen
              ? 'bg-transparent border border-white/30 text-white/70 hover:border-white hover:text-white'
              : 'bg-white text-black hover:bg-white/90'
          }`}
        >
          {gateOpen ? 'Close Gate' : 'Open Gate'}
        </button>
      </div>
    </div>
  );
}
