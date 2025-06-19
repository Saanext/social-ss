
export interface ImageStyle {
  id: string;
  name: string;
  description?: string;
}

export const IMAGE_STYLES: ImageStyle[] = [
  {
    id: 'neo-minimalism',
    name: 'Neo-Minimalism',
    description: 'Ultra-clean with bold typography and intentional whitespace. Reduces scroll fatigue, increases clarity.'
  },
  {
    id: 'ai-generated-surrealism',
    name: 'AI-Generated Surrealism',
    description: 'Hyper-real or dreamlike visuals with fantasy vibes. Visually disruptive, very viral.'
  },
  {
    id: 'dark-mode-first',
    name: 'Dark Mode First Design',
    description: 'High contrast, sleek visuals on dark backgrounds. Aligns with phone dark modes.'
  },
  {
    id: 'cinematic-snapshots',
    name: 'Cinematic Snapshots',
    description: 'Images look like movie stills or moody film frames. Emotional storytelling, nostalgic vibes.'
  },
  {
    id: '3d-clay-blob-ui',
    name: '3D Clay & Blob UI Style',
    description: 'Soft, playful 3D elements with pastel or matte textures. Friendly & futuristic.'
  },
  {
    id: 'cyber-y2k',
    name: 'Cyber Y2K Aesthetic',
    description: 'Metallics, holographic gradients, pixel fonts. Appeals to Gen Z nostalgia.'
  },
  {
    id: 'handwritten-overlay',
    name: 'Handwritten + Hand-Drawn Overlay',
    description: 'Organic, personal scribbles or doodles over photos. Feels raw, authentic, human.'
  },
  {
    id: 'collage-mixed-media',
    name: 'Collage & Mixed Media Revival',
    description: 'Magazine-style cutouts, layering of textures/photos/graphics. Eye-catching, creative freedom.'
  },
  {
    id: 'infographic-micro-carousels',
    name: 'Infographic Micro-Carousels',
    description: 'Multi-slide explainers with bold type, icons, and color-coded sections. Boosts engagement.'
  },
  {
    id: 'ai-enhanced-realism',
    name: 'AI-Enhanced Realism',
    description: 'Photos enhanced with AI (glow, art filters, background swaps). Unique outputs + storytelling flexibility.'
  },
];
