
export interface ImageStyle {
  id: string;
  name: string;
  description?: string; // For UI display
  look?: string;        // For AI prompt if different from name
  colorScheme?: string; // For AI prompt
  bestFor?: string;     // For UI display
}

export const IMAGE_STYLES: ImageStyle[] = [
  {
    id: 'neo-minimalism',
    name: 'Neo-Minimalism',
    description: 'Ultra-clean with bold typography and intentional whitespace.',
    look: 'Ultra-clean design with bold typography and significant intentional whitespace',
    colorScheme: 'Often monochromatic or uses a very limited color palette',
    bestFor: 'Quotes, announcements, app UIs.',
  },
  {
    id: 'ai-surrealism',
    name: 'AI-Generated Surrealism',
    description: 'Hyper-real or dreamlike visuals with fantasy vibes.',
    look: 'Hyper-realistic or dreamlike visuals, often with fantasy, abstract, or bizarre elements',
    colorScheme: 'Varies widely, can be vibrant or muted depending on the surreal concept',
    bestFor: 'Concept art, promo visuals, brand storytelling.',
  },
  {
    id: 'dark-mode-first',
    name: 'Dark Mode First Design',
    description: 'High contrast, sleek visuals on dark backgrounds.',
    look: 'Sleek visuals primarily on dark or black backgrounds, high contrast text and elements',
    colorScheme: 'Dark backgrounds (charcoal, deep navy, black) with vibrant or neon accent colors for text/graphics',
    bestFor: 'Tech, SaaS, finance brands.',
  },
  {
    id: 'cinematic-snapshots',
    name: 'Cinematic Snapshots',
    description: 'Images look like movie stills or moody film frames.',
    look: 'Images styled like stills from a movie, often with dramatic lighting, specific color grading, and a sense of narrative',
    colorScheme: 'Often desaturated, with specific color grading (e.g., teal and orange, moody blues, warm sepia)',
    bestFor: 'Fashion, personal brands, lifestyle.',
  },
  {
    id: '3d-clay-blob',
    name: '3D Clay & Blob UI Style',
    description: 'Soft, playful 3D elements with pastel or matte textures.',
    look: 'Soft, rounded, playful 3D elements appearing as if made from clay or smooth plastic, often with a matte finish',
    colorScheme: 'Pastel palettes, or matte vibrant colors; sometimes monochromatic with texture',
    bestFor: 'Startups, product launches, SaaS visuals.',
  },
  {
    id: 'cyber-y2k',
    name: 'Cyber Y2K Aesthetic',
    description: 'Metallics, holographic gradients, pixel fonts.',
    look: 'Retro-futuristic Y2K style with metallics, holographic gradients, pixelated fonts, and early digital era graphics',
    colorScheme: 'Bright blues, pinks, purples, silvers, often with iridescent or holographic effects',
    bestFor: 'Music, fashion, tech.',
  },
  {
    id: 'handwritten-overlay',
    name: 'Handwritten + Hand-Drawn Overlay',
    description: 'Organic, personal scribbles or doodles over photos.',
    look: 'Photographs or clean backgrounds overlaid with organic, hand-written text or hand-drawn doodles and accents',
    colorScheme: 'Typically high contrast (e.g., white or black ink on photo), but can be colorful',
    bestFor: 'Creators, journaling, announcements.',
  },
  {
    id: 'collage-mixed-media',
    name: 'Collage & Mixed Media Revival',
    description: 'Magazine-style cutouts, layering of textures/photos/graphics.',
    look: 'A mix of photographic elements, textures, typography, and graphic shapes, layered to create a scrapbook or zine feel',
    colorScheme: 'Highly variable, depends on the source materials; can be vibrant or muted',
    bestFor: 'Gen Z brands, fashion, memes.',
  },
  {
    id: 'infographic-micro-carousels',
    name: 'Infographic Micro-Carousels',
    description: 'Multi-slide explainers with bold type, icons, and color-coded sections.',
    look: 'Clean, organized layouts designed for multi-slide Instagram carousels, using bold typography, icons, and clear visual hierarchy to present information',
    colorScheme: 'Often uses a consistent, color-coded palette to differentiate sections or data points; bright and engaging',
    bestFor: 'Educators, agencies, marketers.',
  },
  {
    id: 'ai-enhanced-realism',
    name: 'AI-Enhanced Realism',
    description: 'Photos enhanced with AI (glow, art filters, background swaps).',
    look: 'Realistic photographs that have been subtly or overtly enhanced by AI, such as adding artistic filters, impossible lighting, glow effects, or changing backgrounds seamlessly',
    colorScheme: 'Varies based on the original photo and desired enhancement; can be natural or stylized',
    bestFor: 'Unique outputs + storytelling flexibility.',
  },
  {
    id: 'collage-cutout',
    name: 'Collage / Cut-out Style',
    description: 'Digital or physical paper cut-out effects, layered visuals.',
    look: 'Uses elements that appear to be cut out from paper or other materials, layered to create depth and a handcrafted feel, often with drop shadows',
    colorScheme: 'Varied, often colorful and contrasting to emphasize layers',
    bestFor: 'Creative portfolios, event posters, social media graphics.',
  },
  {
    id: 'futuristic-cyberpunk',
    name: 'Futuristic / Cyberpunk',
    description: 'Neon lights, dystopian cityscapes, high-tech interfaces.',
    look: 'Dark, gritty, neon-lit environments, often dystopian cityscapes, with high-tech interfaces, cybernetic enhancements, and a sense of advanced but decaying technology',
    colorScheme: 'Dominated by dark blues, purples, and blacks, with vibrant neon accents (pinks, electric blues, greens, yellows)',
    bestFor: 'Gaming, tech, music, concept art.',
  },
  {
    id: 'organic-earthy',
    name: 'Organic / Earthy Style',
    description: 'Natural textures, muted colors, flowing lines, nature-inspired.',
    look: 'Features natural textures like wood grain, stone, leaves, with flowing, irregular lines and forms inspired by nature',
    colorScheme: 'Muted earth tones: browns, greens, terracotta, beige, off-white; often monochromatic or analogous color schemes',
    bestFor: 'Wellness brands, sustainable products, lifestyle content.',
  },
  {
    id: 'minimalist-modern',
    name: 'Minimalist Modern',
    description: 'Clean, whitespace, sharp grids, big fonts, subtle icons.',
    look: 'Extremely clean layouts with abundant whitespace, sharp typographic hierarchies (often large, bold sans-serif fonts), grid-based alignment, and subtle, functional icons.',
    colorScheme: 'Monochromatic (shades of grey, black, white) with a single, carefully chosen accent color.',
    bestFor: 'Quotes, brand identity, product callouts, high-end tech or design services.',
  },
  {
    id: 'brutalist-design',
    name: 'Brutalist Design',
    description: 'Stark typography, monochrome, ugly-on-purpose.',
    look: 'Brutalist design featuring stark typography, monochrome color palette, raw unstyled elements, heavy fonts, and an "ugly-on-purpose" aesthetic.',
    colorScheme: 'Black, white, and grey with harsh blocks of color.',
    bestFor: 'Edgy branding, underground creators.',
  }
];

