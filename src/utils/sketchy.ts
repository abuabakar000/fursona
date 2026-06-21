/**
 * Generates a random hand-drawn styled border radius.
 * e.g. "255px 15px 225px 15px/15px 225px 15px 255px"
 */
export function getSketchyBorderRadius(): string {
  const r = () => Math.floor(Math.random() * 20) + 240; // 240-260
  const s = () => Math.floor(Math.random() * 15) + 10;  // 10-25
  const t = () => Math.floor(Math.random() * 20) + 210; // 210-230
  const u = () => Math.floor(Math.random() * 15) + 10;  // 10-25
  
  return `${r()}px ${s()}px ${t()}px ${u()}px/${s()}px ${t()}px ${u()}px ${r()}px`;
}

/**
 * Returns a static but sketchy looking border radius for consistency,
 * so page layouts do not shift on every render (which could break SSR hydration).
 */
export const sketchyBorderStyles = {
  card: "rounded-[255px_15px_225px_15px/15px_225px_15px_255px]",
  button: "rounded-[225px_15px_255px_15px/15px_255px_15px_225px]",
  avatar: "rounded-[120px_140px_110px_130px/130px_110px_140px_120px]",
  badge: "rounded-[150px_10px_140px_10px/10px_140px_10px_150px]",
};
