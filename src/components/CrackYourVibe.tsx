"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Share2, RefreshCw, Check } from "lucide-react";
import { useAudio } from "@/context/AudioContext";
import confetti from "canvas-confetti";

interface Vibe {
  id: string;
  title: string;
  emoji: string;
  description: string;
  colors: string[]; // Gradient swatches matching the vibe
  textColor: string;
  borderColor: string;
}

const vibesList: Vibe[] = [
  {
    id: "citrus-gremlin",
    title: "chaotic citrus gremlin 🍊",
    emoji: "🍊",
    description: "Powered by pure citric acid and questionable life decisions. Proceed with chaos.",
    colors: ["#f97316", "#fbbf24", "#fef08a"],
    textColor: "text-orange-950",
    borderColor: "border-orange-500",
  },
  {
    id: "sleepy-feral",
    title: "sleepy but make it feral 😴🐾",
    emoji: "🐾",
    description: "A soft, cozy, sleepy bundle... until someone touches the last cookie in the jar.",
    colors: ["#a78bfa", "#fca5a5", "#ffedd5"],
    textColor: "text-purple-950",
    borderColor: "border-purple-500",
  },
  {
    id: "soft-bite",
    title: "aggressively soft with bite 🌸🦷",
    emoji: "🌸",
    description: "Looks like a sweet pastel marshmallow, but will fight you behind a Denny's at 2 AM.",
    colors: ["#f472b6", "#fda4af", "#fff1f2"],
    textColor: "text-rose-950",
    borderColor: "border-rose-400",
  },
  {
    id: "cottagecore-feral",
    title: "feral on main, cottagecore at heart 🍄",
    emoji: "🍄",
    description: "Roars at passing cars, but quietly whispers secrets to wild frogs in the forest.",
    colors: ["#4ade80", "#22c55e", "#bbf7d0"],
    textColor: "text-emerald-950",
    borderColor: "border-emerald-500",
  },
  {
    id: "unhinged",
    title: "professionally unhinged 🎪",
    emoji: "🎪",
    description: "Keeps it 100% together during professional meetings, but screams in low-frequency internally.",
    colors: ["#c084fc", "#e879f9", "#fae8ff"],
    textColor: "text-fuchsia-950",
    borderColor: "border-fuchsia-500",
  },
  {
    id: "forbidden-nap",
    title: "forbidden nap creature 💤",
    emoji: "💤",
    description: "If you dare to wake them up from their slumber, the sun will set on your empire.",
    colors: ["#1e1b4b", "#312e81", "#c084fc"],
    textColor: "text-amber-50",
    borderColor: "border-indigo-400",
  },
  {
    id: "hyperfixation",
    title: "hyperfixation mode activated 🌀",
    emoji: "🌀",
    description: "Currently studying the migration patterns and diet of 14th-century domesticated ferrets.",
    colors: ["#0f766e", "#14b8a6", "#ccfbf1"],
    textColor: "text-teal-950",
    borderColor: "border-teal-500",
  },
  {
    id: "gremlin-hours",
    title: "gremlin hours only 🌙",
    emoji: "🌙",
    description: "Lurks in dark rooms, silently consuming shredded cheese directly from the bag at 3 AM.",
    colors: ["#1e1b4b", "#4338ca", "#c7d2fe"],
    textColor: "text-amber-50",
    borderColor: "border-indigo-400",
  },
  {
    id: "caffeinated-cryptid",
    title: "dangerously caffeinated cryptid ☕",
    emoji: "☕",
    description: "Vibrating at a high frequency that causes nearby digital clocks to run backwards.",
    colors: ["#b45309", "#d97706", "#fef3c7"],
    textColor: "text-amber-950",
    borderColor: "border-amber-700",
  },
  {
    id: "soft-chaos",
    title: "soft chaos agent 🍋",
    emoji: "🍋",
    description: "Spills fruit juice on the counter on purpose just to see the physics of the splash.",
    colors: ["#fbbf24", "#f97316", "#fef9c3"],
    textColor: "text-orange-950",
    borderColor: "border-orange-500",
  }
];

export default function CrackYourVibe() {
  const { isMuted, playSound } = useAudio();
  
  // Game states: 'landing' | 'cracking' | 'reveal'
  const [gameState, setGameState] = useState<"landing" | "cracking" | "reveal">("landing");
  const [currentVibe, setCurrentVibe] = useState<Vibe | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyColorToClipboard = (hex: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hex.toUpperCase());
    setCopiedColor(hex);
    playSound("pop");
    setTimeout(() => {
      setCopiedColor((curr) => curr === hex ? null : curr);
    }, 1500);
  };

  // Play synthesized egg-cracking sound
  const playCrackSound = () => {
    if (isMuted || typeof window === "undefined") return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // 1. Sharp crunchy shell fracture (white noise burst)
      const bufferSize = ctx.sampleRate * 0.18; // 180ms
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = buffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(1200, now);
      noiseFilter.Q.setValueAtTime(4, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.linearRampToValueAtTime(0.18, now + 0.01);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      // 2. Hollow shell pop (low frequency sweep)
      const popOsc = ctx.createOscillator();
      const popGain = ctx.createGain();
      popOsc.type = "triangle";
      popOsc.frequency.setValueAtTime(260, now);
      popOsc.frequency.exponentialRampToValueAtTime(70, now + 0.14);

      popGain.gain.setValueAtTime(0.001, now);
      popGain.gain.linearRampToValueAtTime(0.2, now + 0.015);
      popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      popOsc.connect(popGain);
      popGain.connect(ctx.destination);

      // 3. Cute chime on reveal (delays slightly)
      const chimeNotes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      chimeNotes.forEach((freq, idx) => {
        const chimeOsc = ctx.createOscillator();
        const chimeGain = ctx.createGain();
        chimeOsc.type = "sine";
        chimeOsc.frequency.setValueAtTime(freq, now + 0.1 + idx * 0.06);

        chimeGain.gain.setValueAtTime(0.001, now + 0.1 + idx * 0.06);
        chimeGain.gain.linearRampToValueAtTime(0.035, now + 0.1 + idx * 0.06 + 0.01);
        chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1 + idx * 0.06 + 0.3);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(ctx.destination);

        chimeOsc.start(now + 0.1 + idx * 0.06);
        chimeOsc.stop(now + 0.1 + idx * 0.06 + 0.45);
      });

      // Start nodes
      noiseNode.start(now);
      noiseNode.stop(now + 0.2);
      popOsc.start(now);
      popOsc.stop(now + 0.2);
      
    } catch (e) {
      console.warn("Failed to play synthesized sound effect:", e);
    }
  };

  const handleEggClick = () => {
    if (gameState !== "landing") return;
    setGameState("cracking");

    // Play crack sound
    playCrackSound();

    // Select a random vibe
    const randVibe = vibesList[Math.floor(Math.random() * vibesList.length)];
    setCurrentVibe(randVibe);

    // Confetti blast on crack completion
    setTimeout(() => {
      setGameState("reveal");
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const handleReset = () => {
    setGameState("landing");
    setCurrentVibe(null);
    setCopied(false);
  };

  const handleShare = () => {
    if (!currentVibe) return;
    const shareText = `🐾 My fursona vibe today is: ${currentVibe.title.toUpperCase()}!\n"${currentVibe.description}"\n\nFind yours at ${window.location.origin} ✨🦊`;
    
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="vibe-check" className="relative w-full px-6 py-16 md:py-24 bg-amber-50/20 border-t-2 border-dashed border-amber-200 overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-[20%] right-[-5%] w-[320px] h-[320px] bg-gradient-to-tr from-amber-300/10 to-orange-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[320px] h-[320px] bg-gradient-to-tr from-orange-300/10 to-amber-250/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-left space-y-4 animate-heading"
        >
          <div className="flex flex-col sm:flex-row items-start justify-start gap-4">
            <h2 className="font-comic text-3xl sm:text-4xl md:text-5xl font-black text-orange-950">
              What's your fursona vibe today? 🥚🍊
            </h2>
          </div>
          
          <p className="text-orange-900/80 font-sans max-w-xl text-base sm:text-lg">
            Tap the glowing egg to crack it open dramatically and reveal your daily furry vibe, matching color palette, and description!
          </p>
        </motion.div>

        {/* Game Stage Area */}
        <div className="flex flex-col items-center justify-center w-full min-h-[380px]">
          {/* LANDING & CRACKING STATE */}
          {gameState !== "reveal" && (
            <div className="w-full flex flex-col items-center text-center space-y-6 md:space-y-8 select-none">
              
              {/* Glowing Egg Chamber */}
              <div className="relative w-72 h-80 flex items-center justify-center">
                {/* Glowing halo behind egg */}
                <motion.div 
                  animate={{
                    scale: gameState === "cracking" ? [1, 1.4, 0.9, 1.3] : [1, 1.15, 1],
                    opacity: gameState === "cracking" ? [0.4, 0.9, 0.3, 0.8] : [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: gameState === "cracking" ? 0.3 : 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute w-44 h-56 bg-orange-300/50 rounded-full blur-2xl z-0"
                />

                {/* Layered Interactive Egg SVG */}
                <motion.div
                  animate={gameState === "cracking" ? {
                    x: [0, -10, 10, -8, 8, -4, 4, 0],
                    y: [0, -2, 2, -1, 1, -2, 2, 0],
                    scale: [1, 1.08, 0.95, 1.05, 0.98, 1.02, 1]
                  } : {
                    y: [0, -6, 0],
                  }}
                  transition={gameState === "cracking" ? {
                    duration: 1.1,
                    ease: "easeInOut"
                  } : {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  onClick={handleEggClick}
                  className="relative w-40 h-52 z-10 cursor-pointer filter drop-shadow-[4px_6px_0px_#451a03]"
                >
                  <svg viewBox="0 0 100 130" fill="none" className="w-full h-full">
                    <defs>
                      <linearGradient id="egg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fff7ed" />
                        <stop offset="60%" stopColor="#ffedd5" />
                        <stop offset="100%" stopColor="#fed7aa" />
                      </linearGradient>
                      <linearGradient id="speckle-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#ea580c" stopOpacity="0.25" />
                      </linearGradient>
                    </defs>

                    <path 
                      d="M50,5 C78,5 95,45 95,85 C95,112 75,125 50,125 C25,125 5,112 5,85 C5,45 22,5 50,5 Z" 
                      fill="url(#egg-grad)" 
                      stroke="#451a03" 
                      strokeWidth="3.5"
                    />

                    <path d="M50,5 C78,5 95,45 95,85 C95,112 75,125 50,125 C25,125 5,112 5,85 C5,45 22,5 50,5 Z" fill="url(#speckle-grad)" />
                    <circle cx="35" cy="30" r="2.5" fill="#ea580c" opacity="0.3" />
                    <circle cx="68" cy="45" r="3.5" fill="#ea580c" opacity="0.4" />
                    <circle cx="28" cy="75" r="4" fill="#ea580c" opacity="0.3" />
                    <circle cx="62" cy="85" r="2" fill="#ea580c" opacity="0.35" />
                    <circle cx="48" cy="110" r="3" fill="#ea580c" opacity="0.3" />
                    <circle cx="75" cy="100" r="2.5" fill="#ea580c" opacity="0.4" />
                    <circle cx="20" cy="50" r="3" fill="#ea580c" opacity="0.25" />

                    {gameState === "cracking" && (
                      <motion.path 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        d="M5,75 L28,70 L48,82 L65,72 L82,85 L95,80" 
                        stroke="#451a03" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {gameState === "landing" && (
                      <motion.div
                        animate={{ scale: [0.9, 1.05, 0.9] }}
                        transition={{ duration: 2.2, repeat: Infinity }}
                        className="bg-orange-950/80 text-white font-comic text-[10px] font-black px-2.5 py-1 rounded-full border border-orange-950 flex items-center space-x-1 shadow-md"
                      >
                        <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
                        <span>TAP ME</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {/* REVEAL STATE */}
          <AnimatePresence>
            {gameState === "reveal" && currentVibe && (
              <motion.div 
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full flex flex-col items-center select-none"
              >
                {/* Outer Card Frame */}
                <div 
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${currentVibe.colors[0]} 0%, ${currentVibe.colors[1]} 50%, ${currentVibe.colors[2]} 100%)`
                  }}
                  className={`w-full max-w-lg border-4 border-orange-950 rounded-2xl shadow-[6px_8px_0px_#451a03] p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/20 opacity-60 z-0 pointer-events-none" />

                  <div className="relative w-36 h-36 flex items-center justify-center mb-4 z-10">
                    <div className="absolute w-28 h-28 bg-white/50 border border-white/60 rounded-full blur-md animate-pulse z-0" />
                    
                    <motion.div
                      initial={{ scale: 0, rotate: -720 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 120, damping: 10, delay: 0.1 }}
                      className="text-6xl filter drop-shadow-[2px_3px_0px_rgba(69,26,3,0.35)] z-10 select-none animate-wiggle"
                    >
                      {currentVibe.emoji}
                    </motion.div>

                    {/* Theme-specific tiny doodle/emoji illustrations */}
                    <div className="absolute inset-0 pointer-events-none z-15">
                      <span className="absolute top-2 right-2 text-xl animate-pulse">✨</span>
                      <span className="absolute bottom-2 left-2 text-xl rotate-[-15deg] opacity-80">🐾</span>
                      {currentVibe.id === "citrus-gremlin" && <span className="absolute top-3 left-1 text-lg rotate-[20deg] animate-wiggle">🍋</span>}
                      {currentVibe.id === "sleepy-feral" && <span className="absolute top-3 left-1 text-lg animate-pulse">💤</span>}
                      {currentVibe.id === "soft-bite" && <span className="absolute top-3 left-1 text-lg rotate-[-20deg]">🎀</span>}
                      {currentVibe.id === "cottagecore-feral" && <span className="absolute top-3 left-1 text-lg animate-wiggle">🌿</span>}
                      {currentVibe.id === "unhinged" && <span className="absolute top-3 left-1 text-lg animate-spin" style={{ animationDuration: "3s" }}>🌀</span>}
                      {currentVibe.id === "forbidden-nap" && <span className="absolute top-3 left-1 text-lg rotate-[-10deg] animate-pulse">⭐</span>}
                      {currentVibe.id === "hyperfixation" && <span className="absolute top-3 left-1 text-lg animate-bounce">🧪</span>}
                      {currentVibe.id === "gremlin-hours" && <span className="absolute top-3 left-1 text-lg rotate-[15deg]">✨</span>}
                      {currentVibe.id === "caffeinated-cryptid" && <span className="absolute top-3 left-1 text-lg animate-wiggle">⚡</span>}
                      {currentVibe.id === "soft-chaos" && <span className="absolute top-3 left-1 text-lg rotate-[10deg]">🍊</span>}
                    </div>

                    <div className="absolute inset-0 pointer-events-none z-0">
                      {[
                        { x: -50, y: -40, rotate: -35, d: "M 0 0 L 15 -10 L 20 5 Z" },
                        { x: 60, y: -30, rotate: 45, d: "M 0 5 L 12 -12 L 18 8 Z" },
                        { x: -45, y: 50, rotate: -75, d: "M 5 0 L 18 10 L 8 15 Z" },
                        { x: 55, y: 40, rotate: 60, d: "M 2 2 L 15 -5 L 10 12 Z" }
                      ].map((shard, i) => (
                        <motion.svg
                          key={i}
                          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                          animate={{ x: shard.x, y: shard.y, rotate: shard.rotate, opacity: 0, scale: 0.6 }}
                          transition={{ duration: 0.9, ease: "easeOut" }}
                          viewBox="0 0 30 30"
                          className="absolute w-6 h-6 text-orange-100 fill-current stroke-orange-950 stroke-[2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                          <path d={shard.d} />
                        </motion.svg>
                      ))}
                    </div>
                  </div>

                  <div className={`space-y-4 w-full z-10 ${currentVibe.textColor}`}>
                    <motion.h3 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.25, type: "spring" }}
                      className="font-comic text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide filter drop-shadow-[1px_1px_0px_rgba(255,255,255,0.7)]"
                    >
                      {currentVibe.title}
                    </motion.h3>
                  </div>

                  <motion.div 
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    className="w-full mt-5 bg-white/60 border-2 border-orange-950/20 p-3 rounded-xl flex flex-col items-center space-y-2 z-10"
                  >
                    <span className="font-comic font-black text-[9px] sm:text-[10px] text-orange-950/60 uppercase tracking-widest block leading-none mb-1">
                      Your Vibe Color Palette (Click to Copy!)
                    </span>
                    <div className="flex gap-2.5 justify-center w-full">
                      {currentVibe.colors.map((hex, i) => (
                        <motion.button 
                          key={i}
                          onClick={(e) => copyColorToClipboard(hex, e)}
                          whileHover={{ scale: 1.08, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex flex-col items-center space-y-1 cursor-pointer group"
                        >
                          <div 
                            style={{ backgroundColor: hex }}
                            className="w-10 sm:w-12 aspect-square rounded-lg border-2 border-orange-950 shadow-[1.5px_2px_0px_#451a03] group-hover:shadow-[2px_3.5px_0px_#451a03] transition-all relative flex items-center justify-center"
                          >
                            <AnimatePresence>
                              {copiedColor === hex && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  className="absolute inset-0 bg-white/90 rounded-md flex items-center justify-center text-[10px] font-black text-orange-950"
                                >
                                  ✓
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          <span className="font-sans text-[8px] sm:text-[9px] font-black text-orange-950/80 uppercase group-hover:text-orange-600 transition-colors">
                            {copiedColor === hex ? "copied!" : hex}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mt-6 relative z-10"
                >
                  <button
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 border-2 border-orange-950 font-comic font-black text-sm sm:text-base text-white shadow-[3px_4px_0px_#451a03] active:translate-x-[1.5px] active:translate-y-[2px] active:shadow-[1.5px_2px_0px_#451a03] transition-all rounded-xl cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 sm:w-5 h-5 text-white" />
                        <span>Vibe Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 sm:w-5 h-5 text-white" />
                        <span>Share Vibe 🐾</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleReset}
                    className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-amber-100 hover:bg-amber-255 border-2 border-orange-950 font-comic font-black text-sm sm:text-base text-orange-950 shadow-[3px_4px_0px_#451a03] active:translate-x-[1.5px] active:translate-y-[2px] active:shadow-[1.5px_2px_0px_#451a03] transition-all rounded-xl cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4 sm:w-5 h-5 text-orange-950" />
                    <span>Crack Another Egg 🥚</span>
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
