import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import ThreeCanvas from './ThreeCanvas';
import ControlPanel from './ControlPanel';
import { TimeOfDay, MaterialTheme } from '../types';

export default function BlueprintVisualizer() {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('day');
  const [theme, setTheme] = useState<MaterialTheme>('modern-white');
  const [explodeProgress, setExplodeProgress] = useState<number>(0);
  const [interactionMode, setInteractionMode] = useState<'cursor' | 'orbit'>('orbit');
  const [gateOpen, setGateOpen] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  return (
    <div id="blueprint-visualizer" className="bg-[#0a0a0a] shadow-2xl rounded-3xl p-6 md:p-8 border border-white/10 transition-colors duration-300">
      <div className="mb-6">
        <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 animate-spin-slow text-amber-500" /> Interactive 3D drafting board
        </span>
        <h3 className="text-2xl font-serif text-zinc-100 font-normal mt-1">
          Architectural 3D <em>Sandbox Playground</em>
        </h3>
        <p className="text-zinc-400 text-xs mt-1 max-w-2xl font-sans">
          Interact with a fully-rendered, highly-detailed 3D digital twin of our architectural prototype. Adjust building materials, lift floor slabs to inspect interior spaces, control automatic gate elements, and toggle night/sunset lighting environments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Playboard Canvas */}
        <div className="lg:col-span-8 min-h-[480px] lg:h-[580px] rounded-2xl overflow-hidden relative shadow-inner">
          <ThreeCanvas 
            timeOfDay={timeOfDay}
            theme={theme}
            explodeProgress={explodeProgress}
            interactionMode={interactionMode}
            activeHotspot={activeHotspot}
            setActiveHotspot={setActiveHotspot}
            gateOpen={gateOpen}
          />
        </div>

        {/* Controller Sidebar dashboard */}
        <div className="lg:col-span-4 flex flex-col justify-start">
          <ControlPanel 
            timeOfDay={timeOfDay}
            setTimeOfDay={setTimeOfDay}
            theme={theme}
            setTheme={setTheme}
            explodeProgress={explodeProgress}
            setExplodeProgress={setExplodeProgress}
            interactionMode={interactionMode}
            setInteractionMode={setInteractionMode}
            gateOpen={gateOpen}
            setGateOpen={setGateOpen}
            activeHotspot={activeHotspot}
            setActiveHotspot={setActiveHotspot}
          />
        </div>
      </div>
    </div>
  );
}
