"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { sketchyBorderStyles } from "@/utils/sketchy";
import { Mail, Globe, Heart } from "lucide-react";
import { motion } from "framer-motion";
import VisitorCounter from "./VisitorCounter";

export default function Footer() {
  return (
    <footer className="w-full px-6 py-8 md:py-12 bg-amber-50/80 border-t-2 border-dashed border-amber-200">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8"
      >
        
        {/* Left Side */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1.5">
          <span className="font-comic text-xl font-bold text-orange-950">
            🐾 {siteConfig.name}'s Den · Made with love
          </span>
          <p className="text-xs text-orange-900/60 font-sans max-w-sm">
            A cozy corner of the web for my fursona and furry friends.
          </p>
        </div>

        {/* Center Social Links */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          <a
            href={siteConfig.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-amber-100 hover:bg-orange-100 text-orange-950 border-2 border-orange-950 rounded-full shadow-[2px_2px_0px_#451a03] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#451a03] transition-all"
            title="Twitter / X"
          >
            <span className="font-bold text-sm select-none">𝕏</span>
          </a>
          <a
            href={siteConfig.socials.bluesky}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-amber-100 hover:bg-orange-100 text-orange-950 border-2 border-orange-950 rounded-full shadow-[2px_2px_0px_#451a03] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#451a03] transition-all"
            title="Bluesky"
          >
            <span className="font-bold text-xs select-none">🦋</span>
          </a>
          <a
            href={siteConfig.socials.furaffinity}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-amber-100 hover:bg-orange-100 text-orange-950 border-2 border-orange-950 rounded-full shadow-[2px_2px_0px_#451a03] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#451a03] transition-all"
            title="FurAffinity"
          >
            <span className="font-bold text-xs select-none">FA</span>
          </a>
          <a
            href={siteConfig.socials.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-amber-100 hover:bg-orange-100 text-orange-950 border-2 border-orange-950 rounded-full shadow-[2px_2px_0px_#451a03] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#451a03] transition-all"
            title="Telegram"
          >
            <span className="font-bold text-xs select-none">TG</span>
          </a>
          <a
            href={`mailto:${siteConfig.socials.email}`}
            className="p-2.5 bg-amber-100 hover:bg-orange-100 text-orange-950 border-2 border-orange-950 rounded-full shadow-[2px_2px_0px_#451a03] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#451a03] transition-all"
            title="Email"
          >
            <Mail className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>

        {/* Right Side Copyright */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-2">
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-1.5 text-xs text-orange-900/60 font-sans">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
            <span>for the furry community.</span>
          </div>
          <span className="text-[10px] text-orange-900/40 font-sans">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </span>
        </div>

      </motion.div>

      {/* Visitor Counter centered at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 pt-6 border-t border-orange-950/5 w-full flex justify-center"
      >
        <VisitorCounter />
      </motion.div>
    </footer>
  );
}
