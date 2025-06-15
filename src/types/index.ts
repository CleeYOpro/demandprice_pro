export interface MarketCondition {
  maxDemand: number;
  demandSensitivity: number;
  costPerUnit: number;
  description: string;
}

export interface MarketEvent {
  id: number;
  name: string;
  description: string;
  maxDemandMultiplier: number;
  sensitivityMultiplier: number;
}