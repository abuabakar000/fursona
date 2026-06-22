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
    bio: "Bright characters, gentle colors, and lots of heart. I am a sweet fennec fox who loves cookies, cozy vibes, and dressing up in adorable hoodies! Feel free to explore my reference sheets, look at my art wishlist, or say hello!",
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
    { label: "Vibe Check", href: "#vibe-check" },
    { label: "Get In Touch", href: "#contact" },
  ],
  
  gallery: [
    {
      id: "gal-1",
      title: "Zephryn Dark Leopard Icon",
      category: "other",
      imageUrl: "/images/user_art_1.png",
      description: "Icon portrait of a cool dark leopard sona with a cute blep tongue and sparkling starry background. Art by Zephryn.",
      artistName: "Zephryn",
      artistUrl: "https://twitter.com/zephryn",
    },
    {
      id: "gal-2",
      title: "Green Lizard Watermelon Bite",
      category: "other",
      imageUrl: "/images/user_art_2.png",
      description: "An adorable, fluffy green lizard sona happily holding and taking a big juicy bite out of a fresh slice of watermelon. Art by WJ.",
      artistName: "WJ",
      artistUrl: "https://twitter.com/wjdraws",
    },
    {
      id: "gal-3",
      title: "Neon Lightning Kitty Sona",
      category: "other",
      imageUrl: "/images/user_art_3.png",
      description: "A bright, pastel retro neon kitty character with cute fish collar, lightning bolt head markings, and comfortable yellow jacket. Art by KittySpark.",
      artistName: "KittySpark",
      artistUrl: "https://twitter.com/kittyspark",
    },
    {
      id: "gal-4",
      title: "Minty Fox Casual Portrait",
      category: "canine",
      imageUrl: "/images/user_art_4.png",
      description: "A detailed custom digital art portrait of a cool mint-haired canine sona wearing retro glasses and a cozy grey top. Art by CitrusPaws.",
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
