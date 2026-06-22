"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface AudioContextType {
  isMuted: boolean;
  toggleMute: (overrideMuted?: boolean) => void;
  isMusicPlaying: boolean;
  toggleMusic: () => void;
  playSound: (type: "pop" | "like" | "success" | "chime" | "melt" | "boop" | "poke" | "whoosh" | "click" | "fill") => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const musicRef = React.useRef<HTMLAudioElement | null>(null);

  // Sync mute state and initialize music with localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMute = localStorage.getItem("citrini-mute-preference");
      if (savedMute !== null) {
        setIsMuted(savedMute === "true");
      }

      // Initialize background music
      const audio = new Audio("/music.mp3");
      audio.loop = true;
      audio.volume = 0.12; // cozy soft background volume level
      musicRef.current = audio;

      const savedMusic = localStorage.getItem("citrini-music-preference");
      const shouldPlay = savedMusic !== "paused";

      if (shouldPlay) {
        setIsMusicPlaying(true);
      }

      const startMusicOnInteraction = () => {
        if (shouldPlay && musicRef.current) {
          musicRef.current.play().then(() => {
            setIsMusicPlaying(true);
          }).catch((e) => {
            console.log("Autoplay blocked background music until user explicit click:", e);
          });
        }
        window.removeEventListener("pointerdown", startMusicOnInteraction);
        window.removeEventListener("keydown", startMusicOnInteraction);
      };

      window.addEventListener("pointerdown", startMusicOnInteraction);
      window.addEventListener("keydown", startMusicOnInteraction);

      return () => {
        audio.pause();
        audio.src = "";
        window.removeEventListener("pointerdown", startMusicOnInteraction);
        window.removeEventListener("keydown", startMusicOnInteraction);
      };
    }
  }, []);

  const toggleMusic = () => {
    const audio = musicRef.current;
    if (!audio) return;

    if (isMusicPlaying) {
      audio.pause();
      setIsMusicPlaying(false);
      localStorage.setItem("citrini-music-preference", "paused");
    } else {
      audio.play().then(() => {
        setIsMusicPlaying(true);
        localStorage.setItem("citrini-music-preference", "playing");
      }).catch((e) => {
        console.warn("Failed to start music (file may not be uploaded yet):", e);
      });
    }
  };

  const toggleMute = (overrideMuted?: boolean) => {
    setIsMuted((prev) => {
      const nextVal = overrideMuted !== undefined ? overrideMuted : !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("citrini-mute-preference", String(nextVal));
      }
      return nextVal;
    });
  };

  const playSound = (type: "pop" | "like" | "success" | "chime" | "melt" | "boop" | "poke" | "whoosh" | "click" | "fill") => {
    return; // sound effects are disabled, only music is active
    /*
    if (isMuted || typeof window === "undefined") return;
    try {
      let ctx = audioCtxRef.current;
      if (!ctx) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        ctx = new AudioCtx();
        audioCtxRef.current = ctx;
      }
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const now = ctx.currentTime;

      if (type === "pop") {
        // Soft bubble-like pop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1000, now);
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.12);
        
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.05, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        
        osc.connect(gain);
        gain.connect(filter);
        filter.connect(ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === "like") {
        // Soft, majestic dual chime (A5 -> E6)
        const freqs = [880.00, 1318.51];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();
          
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(1500, now);
          
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.04);
          
          gain.gain.setValueAtTime(0.001, now + idx * 0.04);
          gain.gain.linearRampToValueAtTime(0.03, now + idx * 0.04 + 0.015);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.28);
          
          osc.connect(gain);
          gain.connect(filter);
          filter.connect(ctx.destination);
          
          osc.start(now + idx * 0.04);
          osc.stop(now + idx * 0.04 + 0.3);
        });
      } else if (type === "chime") {
        // Soft crystal bell chime (C6 & G6)
        const freqs = [1046.50, 1567.98];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();
          
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(1600, now);
          
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now);
          
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.02, now + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          
          osc.connect(gain);
          gain.connect(filter);
          filter.connect(ctx.destination);
          
          osc.start(now);
          osc.stop(now + 0.35);
        });
      } else if (type === "success" || type === "melt") {
        // Majestic cascading Major 9th chord (F5 -> A5 -> C6 -> E6 -> G6)
        const notes = [698.46, 880.00, 1046.50, 1318.51, 1567.98];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();
          
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(1800, now);
          
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          
          gain.gain.setValueAtTime(0.001, now + idx * 0.05);
          gain.gain.linearRampToValueAtTime(0.025, now + idx * 0.05 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.45);
          
          osc.connect(gain);
          gain.connect(filter);
          filter.connect(ctx.destination);
          
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.5);
        });
      } else if (type === "boop") {
        // Soft cozy warm pillow sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(380, now);
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(196.00, now);
        osc.frequency.exponentialRampToValueAtTime(110.00, now + 0.18);
        
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.07, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        
        osc.connect(gain);
        gain.connect(filter);
        filter.connect(ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === "poke") {
        // Soft springy/elastic poke (cute double pulse)
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(900, now);
        
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(320, now);
        osc1.frequency.exponentialRampToValueAtTime(480, now + 0.06);
        
        gain1.gain.setValueAtTime(0.001, now);
        gain1.gain.linearRampToValueAtTime(0.04, now + 0.01);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        
        osc1.connect(gain1);
        gain1.connect(filter);
        filter.connect(ctx.destination);
        
        osc1.start(now);
        osc1.stop(now + 0.08);

        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(400, now + 0.04);
        osc2.frequency.exponentialRampToValueAtTime(280, now + 0.14);
        
        gain2.gain.setValueAtTime(0.001, now + 0.04);
        gain2.gain.linearRampToValueAtTime(0.03, now + 0.05);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        
        osc2.connect(gain2);
        gain2.connect(filter);
        
        osc2.start(now + 0.04);
        osc2.stop(now + 0.14);
      } else if (type === "whoosh") {
        // Soft low-frequency wind breeze
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, now);
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.35);
        
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.025, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        
        osc.connect(gain);
        gain.connect(filter);
        filter.connect(ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === "click") {
        // Soft woodblock click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(800, now);
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(580, now);
        
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.02, now + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        
        osc.connect(gain);
        gain.connect(filter);
        filter.connect(ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === "fill") {
        // Soft rising bubble sweep
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1000, now);
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(550, now + 0.28);
        
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.03, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        
        osc.connect(gain);
        gain.connect(filter);
        filter.connect(ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.28);
      }
    } catch (e) {
      console.warn("Web Audio blocked or failed to play sound:", e);
    }
    */
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, isMusicPlaying, toggleMusic, playSound }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
