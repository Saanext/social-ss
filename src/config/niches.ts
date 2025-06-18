
import { CodeXmlIcon, TargetIcon, BrainCircuitIcon, FlameIcon, type LucideIcon } from 'lucide-react';

export interface Niche {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  promptHint: string;
}

export const NICHES: Niche[] = [
  {
    id: 'web-dev',
    name: 'Web Development',
    icon: CodeXmlIcon,
    description: 'Craft visuals for modern websites and cutting-edge applications.',
    promptHint: 'e.g., "minimalist dashboard UI", "abstract code background"',
  },
  {
    id: 'lead-gen',
    name: 'Lead Generation',
    icon: TargetIcon,
    description: 'Design compelling imagery to attract and convert potential customers.',
    promptHint: 'e.g., "dynamic sales funnel graphic", "user persona collage"',
  },
  {
    id: 'ai-solutions',
    name: 'AI Solutions',
    icon: BrainCircuitIcon,
    description: 'Illustrate complex AI concepts and futuristic technology.',
    promptHint: 'e.g., "neural network visualization", "AI robot assistant"',
  },
  {
    id: 'motivation',
    name: 'Motivation & Inspiration',
    icon: FlameIcon,
    description: "Fuel ambition with powerful visuals for drive, success, and an 'alpha' mindset.",
    promptHint: 'e.g., "alpha male silhouette sunrise", "inspirational quote on epic background", "person overcoming adversity"',
  },
];
