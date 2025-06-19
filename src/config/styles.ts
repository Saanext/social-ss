
export interface ImageStyle {
  id: string;
  name: string;
  description?: string;
}

export const IMAGE_STYLES: ImageStyle[] = [
  { id: 'photorealistic', name: 'Photorealistic', description: 'Aim for a realistic, photo-like quality.' },
  { id: 'cartoon', name: 'Cartoon', description: 'A stylized, animated, or comic-book appearance.' },
  { id: 'impressionistic', name: 'Impressionistic', description: 'Artistic style focusing on light and color over detail.' },
  { id: 'abstract', name: 'Abstract', description: 'Non-representational, focusing on shapes, colors, and textures.' },
  { id: 'minimalist', name: 'Minimalist', description: 'Simple, clean, and uncluttered design.' },
  { id: 'surreal', name: 'Surreal', description: 'Dreamlike, bizarre, and fantastical imagery.' },
  { id: 'vintage', name: 'Vintage', description: 'Retro or old-fashioned aesthetic.' },
  { id: 'collage-cutout', name: 'Collage / Cut-out Style', description: 'Image appears assembled from various pieces or cut out.' },
  { id: 'futuristic-cyberpunk', name: 'Futuristic / Cyberpunk', description: 'High-tech, dystopian, neon-lit aesthetic.' },
  { id: 'organic-earthy', name: 'Organic / Earthy Style', description: 'Natural textures, colors, and flowing forms.' },
];

