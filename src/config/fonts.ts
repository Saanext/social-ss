
export interface FontStyleOption {
  id: string;
  name: string; // For display in dropdown
  cssClass: string; // For Tailwind preview
  aiDescription: string; // For prompting the AI
}

export const FONT_STYLE_OPTIONS: FontStyleOption[] = [
  { id: 'sans', name: 'Sans Serif', cssClass: 'font-sans', aiDescription: 'a clean, modern sans-serif font style' },
  { id: 'serif', name: 'Serif', cssClass: 'font-serif', aiDescription: 'a classic, elegant serif font style' },
  { id: 'mono', name: 'Monospace', cssClass: 'font-mono', aiDescription: 'a digital, blocky monospace font style' },
  { id: 'headline', name: 'Impact/Headline', cssClass: 'font-headline', aiDescription: 'a bold, impactful headline font style' },
];

export const DEFAULT_FONT_STYLE_ID = 'sans';
