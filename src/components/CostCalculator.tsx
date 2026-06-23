import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calculator, Coins, FileText, Check, ArrowRight, Info } from 'lucide-react';
import { DESIGN_SERVICES } from '../data';
import { ServiceType } from '../types';

interface CostCalculatorProps {
  onApplyEstimate: (estimateText: string) => void;
}

export default function CostCalculator({ onApplyEstimate }: CostCalculatorProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(DESIGN_SERVICES[0].id);
  const [squareFootage, setSquareFootage] = useState<number>(1200);
  const [qualityTier, setQualityTier] = useState<'essential' | 'premium' | 'luxe'>('premium');
  const [executionScope, setExecutionScope] = useState<'design' | 'partial' | 'turnkey'>('turnkey');
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);

  // Material Factor Multipliers
  const tierMultipliers = {
    essential: { name: 'Essential Modern', factor: 1.0, desc: 'Clean, reliable materials, standard wood veneer, durable fittings.' },
    premium: { name: 'Signature Premium', factor: 1.4, desc: 'Imported hardware, premium tiles, bespoke veneers, tailored lighting.' },
    luxe: { name: 'Imperial Luxe', factor: 2.1, desc: 'Italian marble, acoustic ceiling partitions, custom glass fixtures.' }
  };

  // Scope Factor Multipliers
  const scopeMultipliers = {
    design: { name: 'Blueprints & 3D Only', factor: 0.35, desc: 'Draft layout blueprint drafting, 3D renderings, & core electrical/plumbing specifications.' },
    partial: { name: 'Design & Procurement Oversight', factor: 0.65, desc: 'Blueprint drafts, select material sourcing assistance, periodic structural auditing.' },
    turnkey: { name: 'Turnkey Handover & Procurement', factor: 1.0, desc: 'Complete vendor contracting, custom craftsmanship carpentry, execution, and handover.' }
  };

  // Currently Selected Service
  const activeService = useMemo(() => {
    return DESIGN_SERVICES.find(s => s.id === selectedServiceId) || DESIGN_SERVICES[0];
  }, [selectedServiceId]);

  // Budget calculations
  const estimates = useMemo(() => {
    const baseRate = activeService.estimateBaseRateRef;
    const tierFactor = tierMultipliers[qualityTier].factor;
    const scopeFactor = scopeMultipliers[executionScope].factor;

    const totalEstimate = squareFootage * baseRate * tierFactor * scopeFactor;

    // Sub-segment breakdown calculations
    const materials = totalEstimate * 0.45;
    const structuralDrafts = totalEstimate * 0.15;
    const customFittings = totalEstimate * 0.30;
    const siteManagement = totalEstimate * 0.10;

    // Timeline estimate (days)
    let baseTime = 45; // default days
    if (squareFootage > 1500) baseTime += 30;
    if (squareFootage > 3000) baseTime += 45;
    if (executionScope === 'turnkey') baseTime += 40;
    if (qualityTier === 'luxe') baseTime += 15;

    return {
      total: totalEstimate,
      materials,
      structuralDrafts,
      customFittings,
      siteManagement,
      timelineDays: baseTime
    };
  }, [activeService, squareFootage, qualityTier, executionScope]);

  // Convert to INR formatted lakhs or thousands
  const formatCurrency = (val: number) => {
    if (val >= 100000) {
      const lakhs = val / 100000;
      return `₹${lakhs.toFixed(2)} Lakhs`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  // Build inquiry description for contact form integration
  const estimateDescriptionText = useMemo(() => {
    return `Inquiry via Estimator:
- Space Space Type: ${activeService.name}
- Total Covered Area: ${squareFootage} sqft
- Material Quality Level: ${tierMultipliers[qualityTier].name}
- Working Scope: ${scopeMultipliers[executionScope].name}
- Rough Budget Estimate: ${formatCurrency(estimates.total)}
- Calculated Handover Timeline: ~${estimates.timelineDays} days`;
  }, [activeService, squareFootage, qualityTier, executionScope, estimates]);

  const handleApplyToForm = () => {
    onApplyEstimate(estimateDescriptionText);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  return (
    <div id="cost-calculator" className="bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 rounded-3xl p-6 md:p-8 shadow-md transition-colors duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-amber-50 dark:bg-amber-950/30 rounded-xl text-amber-600 dark:text-amber-400">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-amber-600 dark:text-amber-400">
            Realtime Cost Planner
          </span>
          <h2 className="text-3xl font-serif font-light text-slate-900 dark:text-zinc-100 leading-tight">
            Design &amp; Execution <em>Estimator</em>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Input Section */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Service Selector */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider block">
              1. WORK SPACE TYPE
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {DESIGN_SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedServiceId(s.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedServiceId === s.id
                      ? 'border-amber-600 bg-amber-50/40 dark:bg-amber-950/20 text-slate-900 dark:text-amber-300 shadow-sm'
                      : 'border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 text-slate-700 dark:text-zinc-400'
                  }`}
                >
                  <span className="block font-semibold text-xs leading-snug truncate">{s.name}</span>
                  <span className="block font-mono text-[9px] text-zinc-500 mt-1">
                    Base: ₹{s.estimateBaseRateRef}/sqft
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Area Slider */}
          <div className="space-y-2 bg-slate-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-slate-100 dark:border-zinc-900">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-zinc-300">2. TOTAL COVERED AREA</span>
              <span className="font-mono text-amber-600 dark:text-amber-400 font-bold bg-white dark:bg-zinc-800 px-2 py-0.5 rounded shadow-sm">
                {squareFootage.toLocaleString('en-IN')} SQ. FT.
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-sans">
              Adjust range matching your flat, room or plot measurements.
            </p>
            <input
              type="range"
              min="100"
              max="6000"
              step="50"
              value={squareFootage}
              onChange={(e) => setSquareFootage(Number(e.target.value))}
              className="w-full accent-amber-600 h-1 bg-slate-200 dark:bg-zinc-700 rounded-lg cursor-pointer mt-2"
            />
            <div className="flex justify-between text-[9px] font-mono text-zinc-400 mt-1">
              <span>100 sqft</span>
              <span>1,500 sqft</span>
              <span>3,000 sqft</span>
              <span>4,500 sqft</span>
              <span>6,000 sqft+</span>
            </div>
          </div>

          {/* Material Quality Grid */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider block">
              3. MATERIAL &amp; QUALITY SPECIFICATION TIER
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(Object.keys(tierMultipliers) as Array<keyof typeof tierMultipliers>).map((tierKey) => {
                const tier = tierMultipliers[tierKey];
                return (
                  <button
                    key={tierKey}
                    onClick={() => setQualityTier(tierKey)}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all h-full ${
                      qualityTier === tierKey
                        ? 'border-amber-600 bg-amber-50/20 dark:bg-amber-950/10 text-slate-900 dark:text-amber-300 shadow-sm'
                        : 'border-slate-100 dark:border-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-900 text-slate-700 dark:text-zinc-400'
                    }`}
                  >
                    <div>
                      <span className="block text-xs font-mono font-semibold uppercase tracking-wider mb-1">
                        {tier.name}
                      </span>
                      <p className="text-[10px] text-slate-600 dark:text-zinc-400 leading-snug font-sans">
                        {tier.desc}
                      </p>
                    </div>
                    <span className="block text-[10px] font-mono text-amber-600 dark:text-amber-400 mt-3 font-semibold">
                      Multiplier: {tier.factor.toFixed(1)}x
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Working Scope Grid */}
          <div className="space-y-2 font-sans">
            <label className="text-xs font-mono font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider block">
              4. IMPLEMENTATION WORKING SCOPE
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(Object.keys(scopeMultipliers) as Array<keyof typeof scopeMultipliers>).map((scopeKey) => {
                const scope = scopeMultipliers[scopeKey];
                return (
                  <button
                    key={scopeKey}
                    onClick={() => setExecutionScope(scopeKey)}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all h-full ${
                      executionScope === scopeKey
                        ? 'border-amber-600 bg-amber-50/20 dark:bg-amber-950/10 text-slate-900 dark:text-amber-300 shadow-sm'
                        : 'border-slate-100 dark:border-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-900 text-slate-700 dark:text-zinc-400'
                    }`}
                  >
                    <div>
                      <span className="block text-xs font-mono font-semibold uppercase tracking-wider mb-1">
                        {scope.name}
                      </span>
                      <p className="text-[10px] text-slate-600 dark:text-zinc-400 leading-snug">
                        {scope.desc}
                      </p>
                    </div>
                    <span className="block text-[10px] font-mono text-amber-600 dark:text-amber-400 mt-3 font-semibold">
                      Share: {(scope.factor * 100).toFixed(0)}% budget
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Cost Summary Sheet */}
        <div className="lg:col-span-5 bg-stone/70 dark:bg-zinc-900/50 border border-slate-200/60 dark:border-zinc-800 rounded-2xl p-6 space-y-6">
          <div className="text-center pb-4 border-b border-slate-200 dark:border-zinc-800">
            <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-widest block mb-1">
              Estimated Budget Range
            </span>
            <div className="text-4xl font-serif font-light text-slate-900 dark:text-amber-450 mt-1 dark:text-amber-400">
              {formatCurrency(estimates.total)}
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-2 inline-flex items-center gap-1">
              Estimated Duration: ~{estimates.timelineDays} Days
            </span>
          </div>

          <div className="space-y-4 font-sans">
            <h4 className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
              INDICATIVE COST SPLIT
            </h4>

            {/* Split 1: Materials */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 dark:text-zinc-400">Premium Materials (45%)</span>
                <span className="font-mono text-slate-800 dark:text-zinc-200 font-medium">{formatCurrency(estimates.materials)}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-600 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>

            {/* Split 2: Carpentry/Handwork */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 dark:text-zinc-400">Bespoke Custom Joinery (30%)</span>
                <span className="font-mono text-slate-800 dark:text-zinc-200 font-medium">{formatCurrency(estimates.customFittings)}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '30%' }} />
              </div>
            </div>

            {/* Split 3: Blueprints */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 dark:text-zinc-400">Layout Drafts &amp; Architecture (15%)</span>
                <span className="font-mono text-slate-800 dark:text-zinc-200 font-medium">{formatCurrency(estimates.structuralDrafts)}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-slate-650 dark:bg-zinc-500 rounded-full" style={{ width: '15%' }} />
              </div>
            </div>

            {/* Split 4: Site Management */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 dark:text-zinc-400">Site Directing &amp; Management (10%)</span>
                <span className="font-mono text-slate-800 dark:text-zinc-200 font-medium">{formatCurrency(estimates.siteManagement)}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-slate-400 dark:bg-zinc-700 rounded-full" style={{ width: '10%' }} />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-zinc-800 space-y-3">
            <button
              onClick={handleApplyToForm}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-600 text-white rounded-xl text-xs uppercase tracking-wider font-mono font-bold hover:bg-amber-700 transition-all shadow-sm"
            >
              {copiedSuccess ? (
                <>
                  <Check className="w-4 h-4" /> ESTIMATE DRAFTED!
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" /> SEND TO CONTACT FORM <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-slate-400 dark:text-zinc-500 leading-normal italic flex items-center justify-center gap-1 font-sans">
              <Info className="w-3 h-3 text-amber-500" /> Auto-copys custom specifications into the enquiry desk block.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
