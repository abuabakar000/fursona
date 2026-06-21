export interface CommissionTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  badge?: string;
  status: "open" | "waitlist" | "closed";
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "canine" | "feline" | "other" | "refsheet";
  imageUrl: string;
  description: string;
  artistName?: string;
  artistUrl?: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
}

export const siteConfig = {
  name: "Citrini",
  species: "Fennec Fox",
  title: "Citrini's Den - Fursona Profile & Refsheet Portal",
  description: "Welcome to my home! Meet Citrini the fennec fox, explore commissioned art, copy reference colors, and check trade status.",
  url: "https://citruspaws.art",
  
  mascot: {
    name: "Citrini",
    species: "Fennec Fox",
    imageUrl: "/images/hero.png",
    intro: "Hewwo! Welcome to my personal den!",
    bio: "Bright characters, gentle colors, and lots of heart. I am a sweet fennec fox who loves cookies, drawing, and dressing up in cozy hoodies! Explore my profile to draw me or check if my trades are open!",
  },
  
  // Custom trade/interaction status options for the fursona
  sonaStatus: {
    artTrades: "mutuals" as "open" | "mutuals" | "closed",
    giftArt: "welcome" as "welcome" | "ask" | "no",
    roleplay: "ask" as "open" | "ask" | "closed",
    fursuit: "yes" as "yes" | "planning" | "no",
  },
  
  // Custom Color Palette for artists to easily copy colors
  colorPalette: [
    { name: "Main Fur (Yellow)", hex: "#fce8a6" },
    { name: "Hair & Markings (Orange)", hex: "#f07828" },
    { name: "Inner Ear (Peach)", hex: "#fca5a5" },
    { name: "Eyes (Dark Cocoa)", hex: "#451a03" },
    { name: "Hoodie (Sky Blue)", hex: "#60a5fa" }
  ] as ColorSwatch[],

  fursuit: {
    hasSuit: true,
    makerName: "FuzzballCreations",
    makerUrl: "https://twitter.com/fuzzballcreations",
  },
  
  commissionStatus: {
    isOpen: true,
    slotsTotal: 5,
    slotsFilled: 2,
    badgeText: "Art Trades: Mutuals Only 🐾",
  },
  
  socials: {
    twitter: "https://twitter.com/citruspaws",
    bluesky: "https://bsky.app/profile/citruspaws.bsky.social",
    furaffinity: "https://furaffinity.net/user/citruspaws",
    telegram: "https://t.me/citruspaws",
    discord: "Citrini#1234",
    email: "citruspaws@gmail.com",
  },
  
  navigation: [
    { label: "Home", href: "#home" },
    { label: "Profile", href: "#about" },
    { label: "Ref Gallery", href: "#gallery" },
    { label: "Art Wishlist", href: "#commissions" },
    { label: "Get In Touch", href: "#contact" },
  ],
  
  gallery: [
    {
      id: "gal-1",
      title: "Cocoa Character Sheet",
      category: "canine",
      imageUrl: "/images/gallery-1.png",
      description: "Reference sheet for my puppy friend Cocoa, showing front/back views and cute expressions. Art by FennecIllustrates.",
      artistName: "FennecIllustrates",
      artistUrl: "https://twitter.com/fennecillustrates",
    },
    {
      id: "gal-2",
      title: "Awoo Character Sheet",
      category: "canine",
      imageUrl: "/images/gallery-2.png",
      description: "Reference sheet for my wolf friend Awoo, showing front/back views and celestial details. Art by CelestialArts.",
      artistName: "CelestialArts",
      artistUrl: "https://twitter.com/celestialarts",
    },
    {
      id: "gal-3",
      title: "Noodle Character Sheet",
      category: "other",
      imageUrl: "/images/gallery-3.png",
      description: "Reference sheet for my red panda friend Noodle, showing front/back views and cute expressions. Art by NoodleDraws.",
      artistName: "NoodleDraws",
      artistUrl: "https://twitter.com/noodledraws",
    },
    {
      id: "gal-4",
      title: "Citrini Reference Sheet",
      category: "canine",
      imageUrl: "/images/gallery-4.png",
      description: "My official reference sheet featuring front/back profiles, color palette, and close-ups. Art by CitrusPaws.",
      artistName: "CitrusPaws",
      artistUrl: "https://twitter.com/citruspaws",
    },
  ] as GalleryItem[],
  
  commissionTiers: [
    {
      id: "tier-chibi",
      name: "Chibi / Sticker Trade",
      price: "1:1 Trade",
      description: "I am always down to trade cute chibi emotes or stickers! Hit me up if you want to swap stickers of our sonas.",
      features: [
        "1 Transparent PNG Sticker",
        "Art Trades status must be open",
        "Willing to draw any SFW species",
        "Fast turnaround (under a week)"
      ],
      badge: "Most Fun! ⭐",
      status: "open"
    },
    {
      id: "tier-bust",
      name: "Bust-Up Art Trade",
      price: "Bust Trade",
      description: "A detailed shoulder-up portrait trade. Looking for matching soft shading and expressive details.",
      features: [
        "Shoulder level character trade",
        "Soft shading and lighting",
        "Simple graphic background",
        "Completed within 2 weeks"
      ],
      status: "open"
    },
    {
      id: "tier-fullbody",
      name: "Full Body Illustration Trade",
      price: "Full Trade",
      description: "Full body character trade with rich backgrounds. Reserved for close friends or mutuals with similar art levels.",
      features: [
        "Complete head-to-toe illustration",
        "Full detailed background environment",
        "Includes source PSD files swap",
        "Completed within 1 month"
      ],
      badge: "Mutuals Only 💖",
      status: "waitlist"
    }
  ] as CommissionTier[]
};
