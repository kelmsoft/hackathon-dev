import { Gamepad2, Brain, Palette, Globe, Notebook as Robot } from 'lucide-react';

export const PRIZE_METADATA = {
  totalPrizePool: '$1,000,000',
  
  mainPrize: {
    amount: '$110,000',
    prizes: [
      { position: 'First Prize', amount: '$60,000' },
      { position: 'Second Prize', amount: '$30,000' },
      { position: 'Third Prize', amount: '$20,000' },
    ],
    mainSponsors: ['Algorand', 'Supabase', 'boltdotnew'],
    supportingSponsors: [
      'Netlify',
      'GetSentry',
      'Cloudflare',
      'Loops',
      'boltdotnew',
      'Supabase',
    ],
  },

  jams: [
    {
      id: 'gaming',
      title: 'Gaming & Entertainment',
      description: 'Create the next big gaming experience! Build games, streaming platforms, or interactive entertainment using AI.',
      icon: Gamepad2,
      prizes: [
        { position: '1st Prize', amount: '$10,000' },
        { position: '2nd Prize', amount: '$5,000' },
      ],
      sponsors: ['Netlify', 'Cloudflare'],
    },
    {
      id: 'education',
      title: 'Education & Learning',
      description: 'Build AI-powered tools that make learning fun and accessible. Create educational games, interactive tutorials, or learning platforms.',
      icon: Brain,
      prizes: [
        { position: '1st Prize', amount: '$10,000' },
        { position: '2nd Prize', amount: '$5,000' },
      ],
      sponsors: ['boltdotnew', 'Supabase'],
    },
    {
      id: 'creative',
      title: 'Creative & Design',
      description: 'Unleash creativity with AI! Build tools for digital art, music creation, or design that help people express themselves.',
      icon: Palette,
      prizes: [
        { position: '1st Prize', amount: '$10,000' },
        { position: '2nd Prize', amount: '$5,000' },
      ],
      sponsors: ['Loops', 'GetSentry'],
    },
    {
      id: 'social',
      title: 'Social Impact',
      description: 'Make the world better! Create projects that address social challenges, sustainability, or community building.',
      icon: Globe,
      prizes: [
        { position: '1st Prize', amount: '$10,000' },
        { position: '2nd Prize', amount: '$5,000' },
      ],
      sponsors: ['Algorand', 'Cloudflare'],
    },
    {
      id: 'ai-assistant',
      title: 'AI Companions',
      description: 'Build friendly AI assistants that help people in their daily lives, from productivity to personal growth.',
      icon: Robot,
      prizes: [
        { position: '1st Prize', amount: '$10,000' },
        { position: '2nd Prize', amount: '$5,000' },
      ],
      sponsors: ['Supabase', 'boltdotnew'],
    },
  ],
} as const;