import React from "react";

export const OrangeSlice = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="50" cy="50" r="42" strokeWidth="5" />
    <circle cx="50" cy="50" r="34" strokeDasharray="5 5" />
    <line x1="50" y1="16" x2="50" y2="84" />
    <line x1="16" y1="50" x2="84" y2="50" />
    <line x1="26" y1="26" x2="74" y2="74" />
    <line x1="26" y1="74" x2="74" y2="26" />
    <circle cx="50" cy="50" r="6" fill="currentColor" />
  </svg>
);

export const SketchStar = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export const SketchHeart = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const SketchPaw = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor">
    <path d="M50,75 C58,75 64,69 64,62 C64,58 60,55 50,55 C40,55 36,58 36,62 C36,69 42,75 50,75 Z" />
    <circle cx="28" cy="46" r="8" />
    <circle cx="40" cy="34" r="9" />
    <circle cx="60" cy="34" r="9" />
    <circle cx="72" cy="46" r="8" />
  </svg>
);

export const SketchTwig = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 22V8 M12 14q4-3 5-1 M12 17q-3-2-4-1 M12 11q-4-4-3-6" />
  </svg>
);

export const SketchLeaf = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 22c 1.25-4 5.5-8 11.5-8M11 5c4.5.5 9 4.5 11 9-4.5.5-9-1.5-11-9z" />
  </svg>
);
