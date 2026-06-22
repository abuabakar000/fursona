"use client";

import React, { useState, useEffect, useRef } from "react";

export type OutfitType = "none" | "bandana" | "sweater" | "pajamas" | "raincoat";

interface ReactiveMascotProps {
  outfit?: OutfitType;
}

export default function ReactiveMascot({ outfit = "none" }: ReactiveMascotProps) {
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [leftEarTwitch, setLeftEarTwitch] = useState(false);
  const [rightEarTwitch, setRightEarTwitch] = useState(false);
  const faceRef = useRef<SVGGElement | null>(null);

  // Periodic random ear twitches
  useEffect(() => {
    const interval = setInterval(() => {
      const rand = Math.random();
      if (rand < 0.4) {
        setLeftEarTwitch(true);
        setTimeout(() => setLeftEarTwitch(false), 400);
      } else if (rand < 0.8) {
        setRightEarTwitch(true);
        setTimeout(() => setRightEarTwitch(false), 400);
      } else {
        setLeftEarTwitch(true);
        setRightEarTwitch(true);
        setTimeout(() => {
          setLeftEarTwitch(false);
          setRightEarTwitch(false);
        }, 400);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Track cursor position to look at it
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!faceRef.current) return;
      const rect = faceRef.current.getBoundingClientRect();
      const faceCenterX = rect.left + rect.width / 2;
      const faceCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - faceCenterX;
      const dy = e.clientY - faceCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Clamp pupil translation to look cozy and not cross-eyed
      const maxOffset = 6.5;
      let offsetX = 0;
      let offsetY = 0;

      if (distance > 0) {
        // Subtle tracking response curve
        const factor = Math.min(distance / 200, 1) * maxOffset;
        offsetX = (dx / distance) * factor;
        offsetY = (dy / distance) * factor;
      }

      setPupilOffset({ x: offsetX, y: offsetY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const triggerLeftTwitch = () => {
    setLeftEarTwitch(true);
    setTimeout(() => setLeftEarTwitch(false), 400);
  };

  const triggerRightTwitch = () => {
    setRightEarTwitch(true);
    setTimeout(() => setRightEarTwitch(false), 400);
  };

  // Render the wardrobe items on the body
  const renderBodyAndOutfit = () => {
    switch (outfit) {
      case "bandana":
        return (
          <>
            {/* Orange body */}
            <path d="M 140 370 C 145 270, 255 270, 260 370 Z" fill="#f07828" stroke="#451a03" strokeWidth="4" />
            <path d="M 170 370 C 170 300, 230 300, 230 370 Z" fill="#fce8a6" />
            {/* Red Bandana */}
            <path d="M 148 274 Q 200 300 252 274 Q 220 330 200 335 Q 180 330 148 274 Z" fill="#ef4444" stroke="#451a03" strokeWidth="4" strokeLinejoin="round" />
            {/* Bandana knot */}
            <circle cx="152" cy="275" r="7" fill="#dc2626" stroke="#451a03" strokeWidth="3" />
            <path d="M 146 273 L 135 282 L 140 270 Z" fill="#dc2626" stroke="#451a03" strokeWidth="3" />
          </>
        );
      case "sweater":
        return (
          <>
            {/* Forest green sweater with orange stripes */}
            <path d="M 140 370 C 145 270, 255 270, 260 370 Z" fill="#065f46" stroke="#451a03" strokeWidth="4" />
            {/* Stripes */}
            <path d="M 142 335 Q 200 345 258 335 L 259 350 Q 200 360 141 350 Z" fill="#f07828" />
            <path d="M 143 300 Q 200 310 257 300 L 255 315 Q 200 325 145 315 Z" fill="#f07828" />
            {/* Collar */}
            <ellipse cx="200" cy="275" rx="35" ry="12" fill="#047857" stroke="#451a03" strokeWidth="4" />
          </>
        );
      case "pajamas":
        return (
          <>
            {/* Lavender pajama top with white stars */}
            <path d="M 140 370 C 145 270, 255 270, 260 370 Z" fill="#c084fc" stroke="#451a03" strokeWidth="4" />
            {/* Pajama dots */}
            <circle cx="170" cy="305" r="4.5" fill="#ffffff" />
            <circle cx="230" cy="315" r="3.5" fill="#ffffff" />
            <circle cx="195" cy="335" r="4" fill="#ffffff" />
            <circle cx="215" cy="295" r="3" fill="#ffffff" />
            <circle cx="165" cy="345" r="3" fill="#ffffff" />
            <circle cx="235" cy="345" r="4.5" fill="#ffffff" />
            {/* Cozy buttons */}
            <circle cx="200" cy="305" r="5" fill="#fce8a6" stroke="#451a03" strokeWidth="2.5" />
            <circle cx="200" cy="325" r="5" fill="#fce8a6" stroke="#451a03" strokeWidth="2.5" />
          </>
        );
      case "raincoat":
        return (
          <>
            {/* Slicker yellow raincoat */}
            <path d="M 140 370 C 145 270, 255 270, 260 370 Z" fill="#facc15" stroke="#451a03" strokeWidth="4" />
            {/* Raincoat center seam and buttons */}
            <path d="M 200 285 L 200 370" stroke="#451a03" strokeWidth="3" />
            <circle cx="200" cy="310" r="6" fill="#1e293b" stroke="#451a03" strokeWidth="2.5" />
            <circle cx="200" cy="340" r="6" fill="#1e293b" stroke="#451a03" strokeWidth="2.5" />
            {/* Raincoat pocket flaps */}
            <path d="M 152 335 L 175 332 L 175 348 L 152 345 Z" fill="#eab308" stroke="#451a03" strokeWidth="3.5" />
            <path d="M 248 335 L 225 332 L 225 348 L 248 345 Z" fill="#eab308" stroke="#451a03" strokeWidth="3.5" />
          </>
        );
      default:
        // Default (Naked / Normal Citrini body with orange fur and cream belly patch)
        return (
          <>
            {/* Orange body */}
            <path d="M 140 370 C 145 270, 255 270, 260 370 Z" fill="#f07828" stroke="#451a03" strokeWidth="4" />
            {/* Cream chest/belly fluff */}
            <path d="M 165 370 C 165 295, 235 295, 235 370 Z" fill="#fce8a6" />
            {/* Fluffy white chest tuft detail */}
            <path d="M 200 272 L 208 288 L 200 282 L 192 288 Z" fill="#ffffff" />
          </>
        );
    }
  };

  return (
    <div className="relative w-full max-w-[430px] aspect-square flex items-center justify-center">
      {/* Scope component styles locally */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes tailSway {
          0% { transform: rotate(-6deg); }
          50% { transform: rotate(10deg); }
          100% { transform: rotate(-6deg); }
        }
        .animate-tail-sway {
          animation: tailSway 3.2s ease-in-out infinite;
          transform-origin: 235px 300px;
        }
        @keyframes earTwitchL {
          0%, 100% { transform: rotate(0deg); }
          15% { transform: rotate(-12deg) scaleY(0.92); }
          30% { transform: rotate(7deg) scaleY(1.04); }
          45% { transform: rotate(-4deg); }
          60% { transform: rotate(2deg); }
        }
        .animate-ear-twitch-left {
          animation: earTwitchL 0.45s ease-in-out;
          transform-origin: 155px 145px;
        }
        @keyframes earTwitchR {
          0%, 100% { transform: rotate(0deg); }
          15% { transform: rotate(12deg) scaleY(0.92); }
          30% { transform: rotate(-7deg) scaleY(1.04); }
          45% { transform: rotate(4deg); }
          60% { transform: rotate(-2deg); }
        }
        .animate-ear-twitch-right {
          animation: earTwitchR 0.45s ease-in-out;
          transform-origin: 245px 145px;
        }
        @keyframes breathingEffect {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        .animate-breathing-fox {
          animation: breathingEffect 3.8s ease-in-out infinite;
        }
      `}} />

      <svg
        viewBox="0 0 400 400"
        className="w-full h-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Cozy Background glow */}
        <circle cx="200" cy="230" r="140" fill="url(#bgGlow)" opacity="0.65" />

        {/* Fluffy tail (sways continuously) */}
        <g className="animate-tail-sway">
          {/* Orange base of the tail */}
          <path
            d="M 235 300 C 285 305, 345 255, 335 180 C 325 125, 275 165, 245 220 C 225 255, 225 285, 235 300 Z"
            fill="#f07828"
            stroke="#451a03"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Cream tip of the tail */}
          <path
            d="M 335 180 C 325 125, 290 148, 274 174 C 292 195, 308 190, 335 180 Z"
            fill="#fce8a6"
            stroke="#451a03"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </g>

        {/* Outer Cozy Hoodie Hood (only visible when wearing a hoodie/raincoat) */}
        {(outfit === "raincoat" || outfit === "sweater") && (
          <circle
            cx="200"
            cy="192"
            r="82"
            fill={outfit === "raincoat" ? "#facc15" : "#065f46"}
            stroke="#451a03"
            strokeWidth="4"
          />
        )}

        {/* Fennec Large Ears (React on Hover & Random Interval) */}
        {/* Left Ear */}
        <g
          className={leftEarTwitch ? "animate-ear-twitch-left" : "cursor-pointer"}
          onClick={triggerLeftTwitch}
          onMouseEnter={triggerLeftTwitch}
        >
          {/* Outer Ear (Orange) */}
          <path
            d="M 142 150 L 80 50 C 72 38, 95 28, 115 50 L 175 142 Z"
            fill="#f07828"
            stroke="#451a03"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Inner Ear (Peach/Pink) */}
          <path
            d="M 145 144 L 90 56 C 86 50, 102 44, 115 58 L 165 136 Z"
            fill="#fca5a5"
            stroke="#451a03"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Left inner ear white fluff */}
          <path d="M 125 110 Q 120 90 135 95 Q 128 115 140 120" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
        </g>

        {/* Right Ear */}
        <g
          className={rightEarTwitch ? "animate-ear-twitch-right" : "cursor-pointer"}
          onClick={triggerRightTwitch}
          onMouseEnter={triggerRightTwitch}
        >
          {/* Outer Ear (Orange) */}
          <path
            d="M 258 150 L 320 50 C 328 38, 305 28, 285 50 L 225 142 Z"
            fill="#f07828"
            stroke="#451a03"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Inner Ear (Peach/Pink) */}
          <path
            d="M 255 144 L 310 56 C 314 50, 298 44, 285 58 L 235 136 Z"
            fill="#fca5a5"
            stroke="#451a03"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Right inner ear white fluff */}
          <path d="M 275 110 Q 280 90 265 95 Q 272 115 260 120" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
        </g>

        {/* Body & Clothes/Outfits */}
        <g className="animate-breathing-fox">
          {renderBodyAndOutfit()}
        </g>

        {/* Head/Face (Breaths gently) */}
        <g ref={faceRef} id="reactive-mascot-face" className="animate-breathing-fox">
          {/* Fennec Face Base (Yellow/Cream) */}
          <path
            d="M 125 195 C 125 140, 275 140, 275 195 C 275 238, 125 238, 125 195 Z"
            fill="#fce8a6"
            stroke="#451a03"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Left Cheek marking (Orange) */}
          <path
            d="M 125 195 C 125 158, 160 178, 160 208 C 160 225, 128 230, 125 195 Z"
            fill="#f07828"
            stroke="#451a03"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Right Cheek marking (Orange) */}
          <path
            d="M 275 195 C 275 158, 240 178, 240 208 C 240 225, 272 230, 275 195 Z"
            fill="#f07828"
            stroke="#451a03"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Cute small Hair Tuft on head top */}
          <path
            d="M 188 143 C 188 128, 202 124, 202 143 L 198 132 C 198 125, 192 125, 192 135 Z"
            fill="#f07828"
          />

          {/* Cheek Blush */}
          <ellipse cx="148" cy="214" rx="9" ry="4" fill="#fca5a5" opacity="0.65" />
          <ellipse cx="252" cy="214" rx="9" ry="4" fill="#fca5a5" opacity="0.65" />

          {/* Eye Whiteness (Sclera) */}
          <circle cx="168" cy="192" r="16.5" fill="#ffffff" stroke="#451a03" strokeWidth="4" />
          <circle cx="232" cy="192" r="16.5" fill="#ffffff" stroke="#451a03" strokeWidth="4" />

          {/* Pupils & Sparkles Group (Tilted & Offset towards user cursor) */}
          <g style={{ transform: `translate3d(${pupilOffset.x}px, ${pupilOffset.y}px, 0)`, transition: "transform 0.08s ease-out" }}>
            {/* Left Pupil */}
            <circle cx="168" cy="192" r="11" fill="#451a03" />
            <circle cx="165" cy="189" r="3.5" fill="#ffffff" />
            <circle cx="171.5" cy="195.5" r="1.5" fill="#ffffff" />

            {/* Right Pupil */}
            <circle cx="232" cy="192" r="11" fill="#451a03" />
            <circle cx="229" cy="189" r="3.5" fill="#ffffff" />
            <circle cx="235.5" cy="195.5" r="1.5" fill="#ffffff" />
          </g>

          {/* Small nose */}
          <polygon points="196,202 204,202 200,207" fill="#451a03" />

          {/* Cute ":3" mouth */}
          <path
            d="M 191 211 Q 196 216 200 212 Q 204 216 209 211"
            fill="none"
            stroke="#451a03"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* Cozy drawstrings on hoodie (breaths with the body) */}
        {(outfit === "raincoat" || outfit === "sweater") && (
          <g className="animate-breathing-fox">
            <path d="M 188 280 Q 183 310 188 322" fill="none" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
            <path d="M 212 280 Q 217 310 212 322" fill="none" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {/* Adorable little hands/paws resting at the front */}
        <g className="animate-breathing-fox">
          <circle cx="174" cy="358" r="10.5" fill="#fce8a6" stroke="#451a03" strokeWidth="3.5" />
          <circle cx="226" cy="358" r="10.5" fill="#fce8a6" stroke="#451a03" strokeWidth="3.5" />
        </g>

        {/* Definitions for Background Gradient */}
        <defs>
          <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fdba74" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffedd5" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
