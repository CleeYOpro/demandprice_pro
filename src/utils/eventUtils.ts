import type { MarketEvent } from '../types';

// Define market events
const marketEvents: MarketEvent[] = [
  {
    id: 1,
    name: 'Market Crash',
    description: 'Economic downturn has reduced overall demand in the market.',
    maxDemandMultiplier: 0.6,
    sensitivityMultiplier: 1.2
  },
  {
    id: 2,
    name: 'New Competitor',
    description: 'A new competitor has entered the market, making customers more price sensitive.',
    maxDemandMultiplier: 0.9,
    sensitivityMultiplier: 1.5
  },
  {
    id: 3,
    name: 'Viral Trend',
    description: 'Your product is trending on social media, increasing overall demand.',
    maxDemandMultiplier: 1.4,
    sensitivityMultiplier: 0.8
  },
  {
    id: 4,
    name: 'Seasonal Demand',
    description: 'Seasonal factors have temporarily changed demand patterns.',
    maxDemandMultiplier: 1.2,
    sensitivityMultiplier: 1.0
  },
  {
    id: 5,
    name: 'Supply Chain Issues',
    description: 'Supply chain problems have affected market dynamics.',
    maxDemandMultiplier: 0.8,
    sensitivityMultiplier: 0.9
  }
];

/**
 * Get a random market event
 */
export const getRandomEvent = (): MarketEvent => {
  const randomIndex = Math.floor(Math.random() * marketEvents.length);
  return marketEvents[randomIndex];
};