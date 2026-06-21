"use client";

import React from "react";
import { sketchyBorderStyles } from "@/utils/sketchy";
import { Heart, Sparkles, Star, Flame, Coffee, ExternalLink, Brush, Camera } from "lucide-react";
import { motion } from "framer-motion";

interface WishlistItem {
  id: string;
  character: string;
  poseDescription: string;
  style: string;
  priority: "Dream Piece 🌟" | "Someday ✨" | "NEED THIS 🔥";
  priorityType: "dream" | "someday" | "need";
  budget: string;
  emoji: string;
  bgColor: string;
  accentColor: string;
}

const wishlistItems: WishlistItem[] = [
  {
    id: "wish-1",
    character: "Citrini the Fennec Fox",
    poseDescription: "Reading a spellbook in a warm, rainy ramen shop with steam curling up from a hot noodle bowl 🍜✨",
    style: "Detailed Illustration",
    priority: "Dream Piece 🌟",
    priorityType: "dream",
    budget: "$80 - $150",
    emoji: "🍜",
    bgColor: "bg-rose-50/50",
    accentColor: "text-rose-500 border-rose-200"
  },
  {
    id: "wish-2",
    character: "Citrini the Fennec",
    poseDescription: "Snatching warm chocolate chip cookies from a high shelf, looking guilty but cute with crumbs on nose 🍪🦊",
    style: "Chibi Emote / Sticker",
    priority: "NEED THIS 🔥",
    priorityType: "need",
    budget: "$35 - $60",
    emoji: "🍪",
    bgColor: "bg-orange-50/50",
    accentColor: "text-orange-500 border-orange-200"
  },
  {
    id: "wish-3",
    character: "Citrini (Fursuit Version)",
    poseDescription: "Dressed up as a huge orange slice, waving happily with giant squeaky padded paws! 🐾🍊",
    style: "Flat Color Full-Body",
    priority: "NEED THIS 🔥",
    priorityType: "need",
    budget: "$70 - $100",
    emoji: "🍊",
    bgColor: "bg-amber-50/50",
    accentColor: "text-amber-500 border-amber-200"
  },
  {
    id: "wish-4",
    character: "Citrini & Friends",
    poseDescription: "A massive, soft slumber party sleeping in a pile of starry plushies, cushions, and warm blankets 🌌💤",
    style: "Scenic Illustration",
    priority: "Someday ✨",
    priorityType: "someday",
    budget: "$130 - $220",
    emoji: "💤",
    bgColor: "bg-sky-50/50",
    accentColor: "text-sky-500 border-sky-200"
  }
];

interface AdoredArtist {
  name: string;
  handle: string;
  avatar: string;
  url: string;
  badge: string;
  badgeColor: string;
}

const adoredArtists: AdoredArtist[] = [
  {
    name: "FennecIllustrates",
    handle: "@FennecIllustrates",
    avatar: "🦊",
    url: "https://twitter.com/fennecillustrates",
    badge: "Fav Style 💖",
    badgeColor: "bg-pink-100 text-pink-700 border-pink-200"
  },
  {
    name: "CelestialArts",
    handle: "@CelestialArts",
    avatar: "🐺",
    url: "https://twitter.com/celestialarts",
    badge: "Dream Artist ✨",
    badgeColor: "bg-purple-100 text-purple-700 border-purple-200"
  },
  {
    name: "NoodleDraws",
    handle: "@NoodleDraws",
    avatar: "🐼",
    url: "https://twitter.com/noodledraws",
    badge: "Cozy Master ☕",
    badgeColor: "bg-amber-100 text-amber-700 border-amber-200"
  },
  {
    name: "CitrusPaws",
    handle: "@CitrusPaws",
    avatar: "🐯",
    url: "https://twitter.com/citruspaws",
    badge: "Inspirational 🌟",
    badgeColor: "bg-orange-100 text-orange-700 border-orange-200"
  }
];

const renderSketchDoodle = (id: string) => {
  if (id === "wish-1") {
    return (
      <svg className="w-14 h-14 stroke-orange-950/25 fill-none stroke-[2.5]" viewBox="0 0 100 100">
        {/* Bowl body */}
        <path d="M 22,48 C 22,72 78,72 78,48" />
        {/* Bowl rim */}
        <path d="M 18,48 C 30,44 70,44 82,48" />
        {/* Chopsticks */}
        <line x1="45" y1="52" x2="82" y2="18" />
        <line x1="52" y1="52" x2="85" y2="23" />
        {/* Steam */}
        <path d="M 33,35 Q 30,27 33,20" />
        <path d="M 48,32 Q 51,22 48,14" />
        <path d="M 63,35 Q 60,27 63,20" />
      </svg>
    );
  }
  if (id === "wish-2") {
    return (
      <svg className="w-14 h-14 stroke-orange-950/25 fill-none stroke-[2.5]" viewBox="0 0 100 100">
        {/* Cookie outline */}
        <path d="M 50,22 C 66,22 78,34 78,50 C 78,66 66,78 50,78 C 34,78 22,66 22,50 C 22,34 34,22 50,22 Z" />
        {/* Bite mark */}
        <path d="M 72,36 C 68,37 66,41 66,45 C 66,49 70,52 74,51" className="stroke-white" />
        <path d="M 72,36 C 68,37 66,41 66,45 C 66,49 70,52 74,51" />
        {/* Chocolate chips */}
        <circle cx="36" cy="42" r="3.5" className="fill-orange-950/25 stroke-none" />
        <circle cx="54" cy="36" r="4.5" className="fill-orange-950/25 stroke-none" />
        <circle cx="44" cy="60" r="3.5" className="fill-orange-950/25 stroke-none" />
        <circle cx="62" cy="56" r="3.5" className="fill-orange-950/25 stroke-none" />
        <circle cx="32" cy="54" r="4" className="fill-orange-950/25 stroke-none" />
      </svg>
    );
  }
  if (id === "wish-3") {
    return (
      <svg className="w-14 h-14 stroke-orange-950/25 fill-none stroke-[2.5]" viewBox="0 0 100 100">
        {/* Orange Outer Circle */}
        <circle cx="50" cy="50" r="30" />
        {/* Orange Inner Circle */}
        <circle cx="50" cy="50" r="26" />
        {/* Orange slices */}
        <line x1="50" y1="20" x2="50" y2="80" />
        <line x1="20" y1="50" x2="80" y2="50" />
        <line x1="29" y1="29" x2="71" y2="71" />
        <line x1="29" y1="71" x2="71" y2="29" />
        {/* Little Leaf */}
        <path d="M 50,20 C 53,10 63,10 67,16 C 67,23 57,25 50,20 Z" />
      </svg>
    );
  }
  return (
    <svg className="w-14 h-14 stroke-orange-950/25 fill-none stroke-[2.5]" viewBox="0 0 100 100">
      {/* Crescent Moon */}
      <path d="M 58,25 C 44,25 34,36 34,50 C 34,64 45,74 59,74 C 50,74 43.5,67 43.5,54 C 43.5,41 49.5,30 58,25 Z" />
      {/* Stars */}
      <path d="M 23,34 L 25,37 L 29,37 L 26,39 L 27,43 L 23,40 L 19,43 L 20,39 L 17,37 L 21,37 Z" className="fill-orange-950/20" />
      {/* Cloud line */}
      <path d="M 22,70 C 22,65 29,62 35,65 C 38,60 48,60 51,66 C 56,63 64,66 64,71 L 22,71" />
    </svg>
  );
};

export default function Commissions() {
  return (
    <section id="commissions" className="w-full px-6 py-16 md:py-24 bg-amber-50/40 overflow-hidden relative border-t-2 border-dashed border-amber-200">
      
      {/* Background watercolor glows */}
      <div className="absolute top-10 right-[-5%] w-48 h-48 bg-orange-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-[-5%] w-60 h-60 bg-amber-100/60 rounded-full blur-3xl pointer-events-none" />

      {/* Embedded keyframe animations for wiggle effects */}
      <style>{`
        @keyframes subtle-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(1deg); }
        }
        .animate-float-slow {
          animation: subtle-float 4s ease-in-out infinite;
        }
        @keyframes card-wiggle {
          0%, 100% { transform: rotate(-1deg); }
          50% { transform: rotate(1deg); }
        }
        .animate-card-wiggle {
          animation: card-wiggle 5s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-16 relative">
        
        {/* Section Heading */}
        <div className="text-center space-y-4">
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className={`inline-flex items-center space-x-1.5 px-4 py-1.5 bg-orange-100 border-2 border-orange-500 font-comic font-black text-orange-950 text-xs sm:text-sm ${sketchyBorderStyles.badge} shadow-sm`}
          >
            <span>My Art Wishlist 🎨</span>
          </motion.div>
          
          <h2 className="font-comic text-3xl sm:text-4xl md:text-5xl font-black text-orange-950">
            My Art Wishlist 🎨
          </h2>
          <p className="text-orange-900/80 font-sans max-w-xl mx-auto text-base sm:text-lg">
            Art I dream of getting commissioned someday! Hover over each card to check out my character reference ideas.
          </p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlistItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -8, rotate: index % 2 === 0 ? 0.5 : -0.5, scale: 1.01 }}
              className={`relative bg-white border-3 border-orange-950 p-5 flex flex-col justify-between shadow-[4px_5px_0px_#451a03] hover:shadow-[7px_8px_0px_#451a03] transition-all duration-300 ${sketchyBorderStyles.card}`}
            >
              {/* Scrapbook Washi Tape */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2.5 w-16 h-5 bg-orange-200/50 backdrop-blur-[0.5px] border border-dashed border-orange-300/30 shadow-[1px_1px_1px_rgba(0,0,0,0.03)] z-10 ${
                index % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]"
              }`} />

              <div className="space-y-4">
                {/* Sketchpad Placeholder Image Slot */}
                <div className={`relative w-full aspect-[4/3] rounded-xl border-2 border-dashed border-orange-950/20 flex flex-col items-center justify-center overflow-hidden ${item.bgColor} shadow-inner group select-none`}>
                  
                  {/* Grid lines to make it look like sketch paper */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(120,53,4,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(120,53,4,0.05)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
                  
                  {/* Rough Sketch Doodle Background */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-85 group-hover:scale-105 transition-transform duration-300">
                    {renderSketchDoodle(item.id)}
                  </div>

                  {/* Floating sketch emoji icon */}
                  <span className="text-4.5xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.12)] group-hover:scale-110 transition-transform duration-300 select-none animate-float-slow z-10">
                    {item.emoji}
                  </span>
                  
                  <div className="flex items-center space-x-1 mt-2 text-orange-950/45 z-10">
                    <Brush className="w-3 h-3" />
                    <span className="font-comic text-[9px] uppercase font-black tracking-wider">Idea Sketchpad</span>
                  </div>
                </div>

                {/* Badges row */}
                <div className="flex flex-wrap gap-1.5">
                  <span className={`px-2 py-0.5 text-[9px] font-comic font-black border-2 border-orange-950 bg-amber-100 text-orange-950 ${sketchyBorderStyles.badge}`}>
                    {item.style}
                  </span>
                  <span className={`px-2 py-0.5 text-[9px] font-comic font-black border-2 border-orange-950 ${
                    item.priorityType === "dream" ? "bg-pink-400 text-white" :
                    item.priorityType === "need" ? "bg-orange-500 text-white" :
                    "bg-sky-400 text-white"
                  } ${sketchyBorderStyles.badge}`}>
                    {item.priority}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-1.5 text-left">
                  <h4 className="font-comic text-base sm:text-lg font-black text-orange-950 leading-snug">
                    {item.character}
                  </h4>
                  <p className="text-xs sm:text-sm text-orange-900/90 font-medium font-sans leading-relaxed min-h-[55px]">
                    {item.poseDescription}
                  </p>
                </div>
              </div>

              {/* Budget Estimation Row */}
              <div className="border-t border-dashed border-amber-100 pt-3 mt-4 flex items-center justify-between">
                <span className="text-[10px] font-comic font-black text-orange-950/50 uppercase tracking-wider">Target Budget</span>
                <span className="font-comic text-base font-black text-orange-600">
                  {item.budget}
                </span>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Artists I Adore bottom row */}
        <div className="space-y-8 pt-12 border-t border-dashed border-amber-200">
          <div className="text-center space-y-1">
            <h3 className="font-comic text-2xl md:text-3xl font-black text-orange-950 flex items-center justify-center space-x-1.5">
              <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
              <span>Artists I Adore 💖</span>
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            </h3>
            <p className="text-orange-900/70 font-sans text-xs sm:text-sm max-w-md mx-auto">
              Incredible creators whose style I absolutely worship. Click below to view their art pages!
            </p>
          </div>

          {/* Artist Circular Profiles */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-4xl mx-auto">
            {adoredArtists.map((artist, idx) => (
              <motion.div
                key={artist.handle}
                whileHover={{ y: -5 }}
                className="bg-white border-3 border-orange-950 p-4 rounded-2xl flex flex-col items-center space-y-3.5 shadow-[4px_4px_0px_#451a03] max-w-[170px] w-full text-center relative overflow-visible"
              >
                {/* Small customized badge stuck to the top right of card */}
                <div className={`absolute -top-3.5 -right-2 px-2 py-0.5 border border-orange-950 font-comic font-black text-[8px] rotate-[10deg] shadow-sm ${sketchyBorderStyles.badge} ${artist.badgeColor} z-10`}>
                  {artist.badge}
                </div>

                {/* Circular Avatar sketch frame */}
                <div className={`w-14 h-14 rounded-full border-2 border-orange-950 bg-amber-50/60 flex items-center justify-center text-3xl shadow-inner select-none animate-float-slow ${sketchyBorderStyles.avatar}`}
                     style={{ animationDelay: `${idx * 0.5}s` }}>
                  {artist.avatar}
                </div>

                {/* Identity info */}
                <div className="space-y-0.5">
                  <h4 className="font-comic text-xs font-black text-orange-950 truncate max-w-[130px]">
                    {artist.name}
                  </h4>
                  <span className="text-[9px] text-orange-900/50 block font-bold">
                    {artist.handle}
                  </span>
                </div>

                {/* View Art CTA button */}
                <a
                  href={artist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-comic font-black text-[10px] flex items-center justify-center space-x-1 border border-orange-950 shadow-[1.5px_2px_0px_#451a03] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_#451a03] transition-all duration-150 ${sketchyBorderStyles.button}`}
                >
                  <span>View Art</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

