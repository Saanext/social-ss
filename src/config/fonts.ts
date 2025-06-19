
export interface FontStyleOption {
  id: string;
  name: string; // For display in dropdown
  cssClass: string; // For Tailwind preview
  aiDescription: string; // For prompting the AI
  details?: string; // Brief description for UI if needed
}

export const FONT_STYLE_OPTIONS: FontStyleOption[] = [
  {
    id: 'magazine-editorial',
    name: 'Magazine Editorial',
    cssClass: 'font-serif',
    aiDescription: "an elegant, bold, sophisticated magazine editorial font style, evoking fonts like Didot, Playfair Display, Butler, Cormorant Garamond, Canela, Editorial New, Noe Display, or Tan Pearl. Aim for bold headlines, possibly with small caps subtext, in a clean grid layout. Consider pairing a serif header with a sans-serif body.",
    details: "Elegant, Bold, Sophisticated. For luxury, fashion, statements.",
  },
  {
    id: 'minimalist-sans',
    name: 'Minimalist Sans-Serif',
    cssClass: 'font-sans', // 'font-body' could also be Inter
    aiDescription: "a neutral, professional, clean minimalist sans-serif font style, similar to Helvetica Neue, Inter, Satoshi, Poppins, Neue Haas Grotesk, General Sans, or Aeonik. Suitable for clean UI posts, carousels, and startup branding.",
    details: "Neutral, Professional, Clean. For UI, carousels, startups.",
  },
  {
    id: 'retro-y2k',
    name: 'Retro/Y2K/Vaporwave',
    cssClass: 'font-headline', // Space Grotesk fits well here
    aiDescription: "a nostalgic, funky, eye-catching retro, Y2K, or vaporwave font style, reminiscent of GT Pressura, Space Grotesk, Monoton (for an 80s neon feel), Rubik Mono One, Stretch Pro, Bitcrusher, or Commodore 64 Pixel fonts. Good for vintage branding, youth-targeted posts, and memes.",
    details: "Nostalgic, Funky, Eye-catching. For vintage, youth, memes.",
  },
  {
    id: 'ghibli-fantasy',
    name: 'Ghibli/Soft Fantasy',
    cssClass: 'font-serif', // Lora and Spectral are serifs
    aiDescription: "a whimsical, storybook, artistic soft fantasy-inspired font style, evoking Ghibli Fan Font, Lora, Quicksand, Recia Serif, Spectral, or Cardo. Ideal for story-driven posts, aesthetic journaling, and fantasy brands.",
    details: "Whimsical, Storybook, Artistic. For stories, journaling, fantasy.",
  },
  {
    id: 'handwritten-organic',
    name: 'Handwritten/Organic',
    cssClass: 'font-sans', // Generic preview, AI description is key
    aiDescription: "an authentic, playful, human handwritten or organic script font style, like Amatic SC, Shadows Into Light, Fredericka the Great, Kalam, or Pacifico, or an Architect's Daughter style. Use for quotes, captions, casual branding, and journaling.",
    details: "Authentic, Playful, Human. For quotes, casual branding.",
  },
  {
    id: 'futuristic-tech',
    name: 'Futuristic/Tech',
    cssClass: 'font-mono', // Orbitron, Kode Mono, JetBrains Mono have this feel
    aiDescription: "a modern, digital, sharp futuristic or tech font style, similar to Orbitron, Syncopate, Eurostile, Kode Mono, JetBrains Mono, or Rajdhani. Suited for tech startups, SaaS, crypto, and AI content.",
    details: "Modern, Digital, Sharp. For tech, SaaS, crypto, AI.",
  },
];

export const DEFAULT_FONT_STYLE_ID = 'minimalist-sans';
