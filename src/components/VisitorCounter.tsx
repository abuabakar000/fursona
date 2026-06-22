"use client";

import React, { useState, useEffect } from "react";
import { Users, Footprints } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function VisitorCounter() {
  const [totalCount, setTotalCount] = useState(0);
  const [activeCount, setActiveCount] = useState(3); // Start with 3 active

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Generate unique base counts for each mascot to prevent templates looking identical
      const stringHash = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash);
      };

      const seed = stringHash(siteConfig.name || "Furry");
      const baseCount = 850 + (seed % 1450); // Starts between 850 and 2300

      // 2. Load or initialize from localStorage
      const savedCount = localStorage.getItem("furry-visitor-total");
      let count = baseCount;

      if (savedCount) {
        count = parseInt(savedCount, 10);
      } else {
        localStorage.setItem("furry-visitor-total", String(baseCount));
      }

      // Increment by 1 for the current session visit
      const updatedCount = count + 1;
      setTotalCount(updatedCount);
      localStorage.setItem("furry-visitor-total", String(updatedCount));

      // 3. Fluctuate active visitors count (between 2 and 6)
      const activeInterval = setInterval(() => {
        setActiveCount((prev) => {
          const delta = Math.random() > 0.5 ? 1 : -1;
          const next = prev + delta;
          return Math.max(2, Math.min(6, next));
        });
      }, 8000); // Shift every 8 seconds

      // 4. Simulate real-time total visitor increments (simulate other visitors entering)
      const totalInterval = setInterval(() => {
        setTotalCount((prev) => {
          const increment = Math.floor(Math.random() * 2) + 1; // 1 to 2 new visitors
          const next = prev + increment;
          localStorage.setItem("furry-visitor-total", String(next));
          return next;
        });
      }, 35000); // New visitor every 35 seconds

      return () => {
        clearInterval(activeInterval);
        clearInterval(totalInterval);
      };
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-3.5 bg-amber-100/50 border-2 border-orange-950/20 rounded-xl max-w-sm mx-auto shadow-sm select-none">
      
      {/* Active visitors line */}
      <div className="flex items-center space-x-2 text-xs font-sans font-bold text-orange-950/70">
        <span className="relative flex h-2.5 w-2.5">
          {/* LED pulsing dot indicator */}
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        
        <div className="flex items-center space-x-1.5">
          <Users className="w-3.5 h-3.5 text-orange-900/60" />
          <span>
            {activeCount} furries currently sniffing around the den
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-orange-950/10 my-2" />

      {/* Total visitors line */}
      <div className="flex items-center space-x-2 text-[11px] sm:text-xs font-comic font-black text-orange-950">
        <Footprints className="w-4 h-4 text-orange-800 animate-pulse" />
        <span>
          {totalCount.toLocaleString()} total visitors have entered since launch
        </span>
      </div>
    </div>
  );
}
