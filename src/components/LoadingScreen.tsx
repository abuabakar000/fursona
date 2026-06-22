"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Lock body scroll during preloading
    document.body.style.overflow = "hidden";

    // Fast, organic loading bar simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        // Random step sizes to feel organic
        const step = Math.floor(Math.random() * 15) + 5;
        return Math.min(100, prev + step);
      });
    }, 120);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  const [showEnterButton, setShowEnterButton] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      // Small delay before showing the enter button
      const timeout = setTimeout(() => {
        setShowEnterButton(true);
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [progress]);

  const handleEnter = () => {
    setIsVisible(false);
    document.body.style.overflow = "";
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ 
            y: "-100vh", 
            opacity: 0.9,
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 w-screen h-screen bg-[#fdfbf7] z-[99999] flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Paper Watercolor Texture Overlay */}
          <div className="absolute inset-0 opacity-10 bg-paper-texture pointer-events-none z-0" 
               style={{ backgroundImage: "url('/images/bg-paper.png')", backgroundSize: "cover" }} />

          <div className="flex flex-col items-center text-center space-y-6 max-w-sm relative z-10">
            
            {/* Pulsing Mascot Badge / Paw Logo */}
            <motion.div
              animate={{ 
                scale: [1, 1.12, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="p-4 bg-orange-100 border-[3px] border-orange-950 rounded-[120px_140px_110px_130px/130px_110px_140px_120px] shadow-[3px_4px_0px_#451a03]"
            >
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-14 h-14 text-orange-600">
                <path d="M50,80 C60,80 67,73 67,64 C67,59 62,56 50,56 C38,56 33,59 33,64 C33,73 40,80 50,80 Z" />
                <circle cx="25" cy="46" r="9" />
                <circle cx="39" cy="32" r="10" />
                <circle cx="61" cy="32" r="10" />
                <circle cx="75" cy="46" r="9" />
              </svg>
            </motion.div>

            {/* Title */}
            <div className="space-y-1">
              <h1 className="font-comic text-2xl sm:text-3xl font-black text-orange-950 tracking-tight flex items-center justify-center space-x-1.5">
                <span>Entering Den...</span>
                <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
              </h1>
              <p className="text-xs font-sans font-bold text-orange-900/60 tracking-wider uppercase">
                Welcome to {siteConfig.name}'s den
              </p>
            </div>

            {/* Custom Progress Bar / Enter Button */}
            <div className="w-56 h-20 flex flex-col items-center justify-center relative">
              <AnimatePresence mode="wait">
                {!showEnterButton ? (
                  <motion.div
                    key="progress"
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full space-y-2 flex flex-col items-center"
                  >
                    <div className="w-full h-3 bg-orange-100 border-2 border-orange-950 rounded-full overflow-hidden p-0.5 shadow-inner">
                      <motion.div 
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${progress}%` }}
                        transition={{ ease: "easeOut" }}
                      />
                    </div>
                    
                    <div className="font-comic font-black text-sm text-orange-950">
                      {progress}%
                    </div>
                  </motion.div>
                ) : (
                  <motion.button
                    key="enter-btn"
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEnter}
                    className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-comic font-black text-base border-3 border-orange-950 shadow-[3px_4px_0px_#451a03] hover:shadow-[1px_2px_0px_#451a03] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 rounded-2xl cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>Enter Den</span>
                    <span className="text-xl">🐾</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
