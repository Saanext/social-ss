import { CodeXmlIcon, TargetIcon, BrainCircuitIcon, LucideIcon } from 'lucide-react';

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
];
