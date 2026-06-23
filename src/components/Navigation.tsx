import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Menu, X, Sun, Moon, DraftingCompass, MessageSquare } from 'lucide-react';
import { ScreenType } from '../types';

interface NavigationProps {
  activeScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export default function Navigation({ activeScreen, setScreen, darkMode, setDarkMode }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const menuItems: { id: ScreenType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'portfolio', label: 'Portfolio Catalog' },
    { id: 'services', label: 'Services' },
    { id: 'estimator', label: 'Pricing Estimator' },
    { id: 'contact', label: 'Consult' }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-[#F0EDE8]/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-amber-600/20 py-4 px-6 md:px-12 flex justify-between items-center transition-colors duration-300">
      
      {/* Brand logo */}
      <a 
        href="#" 
        onClick={(e) => { e.preventDefault(); setScreen('home'); }}
        className="flex items-center gap-2 text-slate-900 dark:text-zinc-100 hover:opacity-90 transition-opacity"
      >
        <div className="p-1.5 bg-amber-600 dark:bg-amber-950/40 rounded text-white dark:text-amber-400">
          <DraftingCompass className="w-5 h-5" />
        </div>
        <span className="font-serif text-xl font-semibold tracking-wide">
          <span className="text-amber-600 font-extrabold dark:text-amber-500">VS</span> Architect
        </span>
      </a>

      {/* Desktop Navigation Links */}
      <div className="hidden lg:flex items-center gap-8">
        <ul className="flex gap-6 list-none font-mono text-[11px] uppercase tracking-widest">
          {menuItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <li key={item.id} className="relative py-1">
                <button
                  onClick={() => setScreen(item.id)}
                  className={`transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-amber-600 dark:text-amber-400 font-semibold'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-300'
                  }`}
                >
                  {item.label}
                </button>
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-600 dark:bg-amber-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* WhatsApp Booking Btn */}
        <a
          href="https://wa.me/91798575518?text=Hello%20VS%20Architect!%20I%20would%20like%20to%20book%20a%20design%20consultation."
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[10px] font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5" /> Book on WhatsApp
        </a>

        {/* Separator */}
        <div className="w-[1px] h-4 bg-amber-600/25 block" />

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full cursor-pointer bg-[#E8E2D9] dark:bg-zinc-900 border border-white dark:border-zinc-800 hover:bg-neutral-200 dark:hover:bg-zinc-800 transition"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? (
            <Sun className="w-4 h-4 text-amber-500" />
          ) : (
            <Moon className="w-4 h-4 text-slate-800" />
          )}
        </button>
      </div>

      {/* Mobile Actions (Menu button and Theme toggle) */}
      <div className="flex lg:hidden items-center gap-3">
        {/* Theme Toggle - directly responsive */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-full bg-[#E8E2D9] dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 border border-white dark:border-zinc-850 scale-95"
          title="Toggle Theme"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Hamburger Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2.5 rounded-xl bg-slate-900 dark:bg-zinc-800 text-white hover:scale-105 active:scale-95 transition"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[68px] left-0 w-full bg-[#F0EDE8]/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-amber-600/30 py-6 px-8 flex flex-col gap-6 z-30 shadow-xl lg:hidden"
          >
            <ul className="flex flex-col gap-4 list-none text-sm font-mono uppercase tracking-widest text-center">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setScreen(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full py-2.5 rounded-xl transition ${
                      activeScreen === item.id
                        ? 'bg-amber-600/10 text-amber-600 dark:text-amber-400 font-bold'
                        : 'text-slate-800 dark:text-zinc-300 hover:bg-slate-350 hover:bg-slate-100 dark:hover:bg-zinc-900'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              {/* WhatsApp Booking for Mobile Menu */}
              <li className="pt-2">
                <a
                  href="https://wa.me/91798575518?text=Hello%20VS%20Architect!%20I%20would%20like%20to%20book%20a%20design%20consultation."
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition shadow-md"
                >
                  <MessageSquare className="w-4 h-4" /> Book WhatsApp
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
}
