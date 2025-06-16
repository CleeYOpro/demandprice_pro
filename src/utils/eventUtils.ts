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
    maxDemandMultiplier: 1.2,
    sensitivityMultiplier: 0.8
  },
  {
    id: 4,
    name: 'Seasonal Demand',
    description: 'Seasonal factors have temporarily changed demand patterns.',
    maxDemandMultiplier: 1.1,
    sensitivityMultiplier: 1.0
  },
  {
    id: 5,
    name: 'Supply Chain Issues',
    description: 'Supply chain problems have affected market dynamics.',
    maxDemandMultiplier: 0.8,
    sensitivityMultiplier: 0.9
  },
  {
    id: 6,
    name: 'Celebrity Endorsement',
    description: 'A famous celebrity has endorsed your product, boosting demand and reducing price sensitivity.',
    maxDemandMultiplier: 1.214,
    sensitivityMultiplier: 0.7
  },
  {
    id: 7,
    name: 'Economic Boom',
    description: 'The economy is booming, increasing consumer spending power.',
    maxDemandMultiplier: 1.111,
    sensitivityMultiplier: 0.9
  },
  {
    id: 8,
    name: 'Competitor Product Recall',
    description: 'A competitor has issued a product recall, increasing demand for your product.',
    maxDemandMultiplier: 1.163,
    sensitivityMultiplier: 0.8
  },
  {
    id: 9,
    name: 'Regulatory Changes',
    description: 'New regulations have increased production costs across the industry.',
    maxDemandMultiplier: 0.9,
    sensitivityMultiplier: 1.1
  },
  {
    id: 10,
    name: 'Technology Breakthrough',
    description: 'A technological breakthrough has made your product more efficient to produce.',
    maxDemandMultiplier: 1.1,
    sensitivityMultiplier: 0.9
  },
  {
    id: 11,
    name: 'Environmental Protest',
    description: 'Environmental activists have targeted your product, decreasing public perception and demand.',
    maxDemandMultiplier: 0.7,
    sensitivityMultiplier: 1.3
  },
  {
    id: 12,
    name: 'Government Subsidy',
    description: 'The government introduced a subsidy for your product category, increasing demand.',
    maxDemandMultiplier: 1.0298,
    sensitivityMultiplier: 0.85
  },
  {
    id: 13,
    name: 'Data Breach',
    description: 'A data leak from your company has hurt customer trust.',
    maxDemandMultiplier: 0.75,
    sensitivityMultiplier: 1.4
  },
  {
    id: 14,
    name: 'Celebrity Scandal',
    description: 'The celebrity endorsing your product is involved in a scandal, hurting your brand.',
    maxDemandMultiplier: 0.6,
    sensitivityMultiplier: 1.2
  },
  {
    id: 15,
    name: 'Major Sports Event',
    description: 'A major international sports event has drawn attention to your brand.',
    maxDemandMultiplier: 1.176,
    sensitivityMultiplier: 0.95
  },
  {
    id: 16,
    name: 'Local Tax Increase',
    description: 'A regional tax increase has reduced consumer purchasing power.',
    maxDemandMultiplier: 0.85,
    sensitivityMultiplier: 1.1
  },
  {
    id: 17,
    name: 'Influencer Backlash',
    description: 'An influencer criticized your product in a viral video.',
    maxDemandMultiplier: 0.7,
    sensitivityMultiplier: 1.25
  },
  {
    id: 18,
    name: 'Charity Partnership',
    description: 'Your brand announced a major charity collaboration, boosting reputation and sales.',
    maxDemandMultiplier: 1.2,
    sensitivityMultiplier: 0.8
  },
  {
    id: 19,
    name: 'Limited Edition Drop',
    description: 'You released a limited edition version of your product, spiking short-term demand.',
    maxDemandMultiplier: 1.3,
    sensitivityMultiplier: 0.75
  },
  {
    id: 20,
    name: 'Tech Scare',
    description: 'Widespread fear over new technology has made customers cautious.',
    maxDemandMultiplier: 0.8,
    sensitivityMultiplier: 1.3
  }
];

/**
 * Get a random market event
 */
export const getRandomEvent = (): MarketEvent => {
  const randomIndex = Math.floor(Math.random() * marketEvents.length);
  return marketEvents[randomIndex];
};