"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { Menu, X, Heart, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { sketchyBorderStyles } from "@/utils/sketchy";
import { useAudio } from "@/context/AudioContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isMuted, toggleMute, playSound } = useAudio();
  const { scrollYProgress } = useScroll();
  const pawX = useTransform(scrollYProgress, (v) => `calc(${v * 100}vw - ${v * 1.5}rem)`);
  const pawRotate = useTransform(scrollYProgress, [0, 1], [0, 720]);

  const handleLinkClick = (href: string) => {
    playSound("click");
    setIsOpen(false);
    // Transition whoosh delay
    setTimeout(() => {
      playSound("whoosh");
    }, 100);

    // Use Lenis smooth scroll for anchor links if available
    const lenis = (window as unknown as Record<string, unknown>).__lenis as {
      scrollTo: (target: string | number | HTMLElement, opts?: object) => void;
    } | undefined;

    if (lenis && href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        // Small delay so the drawer close animation starts first
        setTimeout(() => {
          lenis.scrollTo(target as HTMLElement, {
            offset: -80, // account for sticky header height
            duration: 1.6,
            easing: (t: number) => 1 - Math.pow(1 - t, 4),
          });
        }, 80);
      }
    }
  };

  const handleOpenDrawer = () => {
    setIsOpen(true);
    playSound("whoosh");
  };

  const handleCloseDrawer = () => {
    setIsOpen(false);
    playSound("whoosh");
  };

  return (
    <header className="sticky top-0 z-[9999] w-full px-4 sm:px-6 py-4 bg-amber-50/80 backdrop-blur-md border-b-2 border-dashed border-amber-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={() => playSound("click")}
          className="flex items-center space-x-2 sm:space-x-3 group"
        >
          <div className={`p-1.5 sm:p-2 bg-amber-100 border-2 border-orange-700/80 ${sketchyBorderStyles.avatar} transition-all duration-300 group-hover:rotate-6 group-hover:scale-105 shadow-[2px_3px_0px_rgba(120,53,4,0.15)]`}>
            {/* Orange Paw Logo */}
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-7 h-7 sm:w-8 sm:h-8 text-orange-600">
              <path d="M50,80 C60,80 67,73 67,64 C67,59 62,56 50,56 C38,56 33,59 33,64 C33,73 40,80 50,80 Z" />
              <circle cx="25" cy="46" r="9" />
              <circle cx="39" cy="32" r="10" />
              <circle cx="61" cy="32" r="10" />
              <circle cx="75" cy="46" r="9" />
            </svg>
          </div>
          <span className="font-comic text-xl sm:text-2xl font-bold tracking-tight text-orange-950">
            {siteConfig.name}
            <span className="text-orange-500 text-sm ml-1 select-none">🐾</span>
          </span>
        </a>

        {/* Action Controls: Sound Toggle + Hamburger menu */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Global Sound Toggler */}
          <button
            onClick={() => {
              const nextMuted = !isMuted;
              toggleMute(nextMuted);
              // Play chime feedback if unmuting
              if (!nextMuted) {
                setTimeout(() => playSound("pop"), 50);
              }
            }}
            className="p-2.5 sm:p-3 bg-amber-100 hover:bg-amber-200 border-2 border-orange-950 font-comic font-black flex items-center justify-center shadow-[3px_3px_0px_#451a03] hover:shadow-[1px_1px_0px_#451a03] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 rounded-[150px_10px_140px_10px/10px_140px_10px_150px]"
            title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-orange-900/60 stroke-[2.5]" />
            ) : (
              <Volume2 className="w-5 h-5 text-orange-700 stroke-[2.5]" />
            )}
          </button>

          {/* Hamburger menu button */}
          <motion.button
            onClick={handleOpenDrawer}
            className={`p-2.5 sm:p-3 bg-amber-100 border-2 border-orange-950 text-orange-950 shadow-[3px_3px_0px_#451a03] hover:shadow-[1px_1px_0px_#451a03] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 ${sketchyBorderStyles.avatar}`}
            whileHover={{ scale: 1.05, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6 stroke-[2.5]" />
          </motion.button>

        </div>
      </div>

      {/* Fullscreen Artsy Notebook Menu Drawer */}
      <div 
        className={`fixed inset-0 z-[9999] flex justify-end transition-all duration-350 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Click outside to close */}
        <div
          className="absolute inset-0 bg-orange-950/45 transition-opacity duration-350"
          onClick={handleCloseDrawer}
        />

        {/* Slide-out Notebook drawer */}
        <div
          style={{ willChange: "transform" }}
          className={`relative w-[calc(100%-16px)] sm:max-w-[380px] h-screen bg-white border-l-4 border-orange-950 shadow-2xl z-10 transition-transform duration-350 cubic-bezier(0.16, 1, 0.3, 1) ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Red notebook margin line */}
          <div className="absolute top-0 bottom-0 left-8 md:left-10 w-0.5 bg-red-400/40 pointer-events-none z-0" />
          
          {/* Spiral rings effect on the left edge of drawer (completely unclipped!) */}
          <div className="absolute top-0 bottom-0 left-[-13px] flex flex-col justify-around py-4 pointer-events-none z-20">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="w-[26px] h-[18px] bg-gradient-to-b from-gray-400 to-gray-250 border-2 border-orange-950 rounded-full shadow-sm" />
            ))}
          </div>

          {/* Scrollable Content Wrapper */}
          <div className="w-full h-full overflow-y-auto flex flex-col justify-between pt-8 pb-10 sm:py-12 px-6 md:px-8 relative z-10">
            {/* Close Button Inside Drawer */}
            <div className="flex justify-end pl-6">
              <motion.button
                onClick={handleCloseDrawer}
                className={`p-2.5 bg-amber-100 border-2 border-orange-950 text-orange-950 shadow-[2px_2px_0px_#451a03] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${sketchyBorderStyles.avatar}`}
                whileHover={{ scale: 1.05, rotate: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6 stroke-[2.5]" />
              </motion.button>
            </div>

            {/* Links List */}
            <nav className="flex flex-col space-y-7 pl-8 md:pl-12 mt-4 sm:mt-8 mb-auto text-left">
              {siteConfig.navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => handleLinkClick(item.href)}
                  className="font-comic text-3xl font-black text-orange-950 hover:text-orange-600 transition-colors w-fit relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-orange-500 transition-all duration-200 group-hover:w-full" />
                </a>
              ))}
              
              {/* Art Wishlist Button badge */}
              <div className="pt-4">
                <a
                  href="#commissions"
                  onClick={() => handleLinkClick("#commissions")}
                  className={`inline-flex items-center space-x-2 px-4 py-3 bg-orange-500 text-white font-comic font-black text-sm border-2 border-orange-950 shadow-[3px_4px_0px_#7c2d12] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 ${sketchyBorderStyles.button}`}
                >
                  <span>Wishlist 🎨</span>
                  <Heart className="w-4 h-4 fill-white text-orange-200 animate-pulse" />
                </a>
              </div>
            </nav>

            {/* Social icons footer in drawer */}
            <div className="pl-8 md:pl-12 text-left space-y-4">
              <div className="text-sm font-comic font-bold text-orange-900/60 uppercase tracking-wider">
                Draw with me! 🎨
              </div>
              <div className="flex gap-4">
                <a 
                  href={siteConfig.socials.twitter} 
                  onClick={() => playSound("click")}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-amber-50 hover:bg-orange-100 text-orange-950 border border-orange-950 rounded-full shadow-[1.5px_2px_0px_#451a03] text-sm hover:scale-105 transition-all"
                >
                  𝕏
                </a>
                <a 
                  href={siteConfig.socials.bluesky} 
                  onClick={() => playSound("click")}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-amber-50 hover:bg-orange-100 text-orange-950 border border-orange-950 rounded-full shadow-[1.5px_2px_0px_#451a03] text-sm hover:scale-105 transition-all"
                >
                  🦋
                </a>
                <a 
                  href={siteConfig.socials.furaffinity} 
                  onClick={() => playSound("click")}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-amber-50 hover:bg-orange-100 text-orange-950 border border-orange-950 rounded-full shadow-[1.5px_2px_0px_#451a03] text-xs font-bold hover:scale-105 transition-all"
                >
                  FA
                </a>
                <a 
                  href={siteConfig.socials.telegram} 
                  onClick={() => playSound("click")}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-amber-50 hover:bg-orange-100 text-orange-950 border border-orange-950 rounded-full shadow-[1.5px_2px_0px_#451a03] text-xs font-bold hover:scale-105 transition-all"
                >
                  TG
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Progress Bar with running paw print */}
      <div className="absolute bottom-[-3px] left-0 right-0 h-[3px] bg-amber-100/40 overflow-visible pointer-events-none z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-400 to-orange-500 origin-left"
          style={{ scaleX: scrollYProgress }}
        />
        <motion.span 
          className="absolute top-[-7px] text-sm select-none z-50 pointer-events-none"
          style={{ 
            left: 0,
            x: pawX,
            rotate: pawRotate
          }}
        >
          🐾
        </motion.span>
      </div>
    </header>
  );
}
