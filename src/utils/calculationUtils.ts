import { MarketCondition } from '../types';

/**
 * Calculate demand based on price and market conditions
 */
export const calculateDemand = (price: number, marketCondition: MarketCondition): number => {
  const { maxDemand, demandSensitivity } = marketCondition;
  
  // Basic formula: Demand = maxDemand - (price × demandSensitivity)
  let demand = maxDemand - (price * demandSensitivity);
  
  // Ensure demand doesn't go below zero
  return Math.max(0, demand);
};

/**
 * Calculate profit based on price, demand, and cost per unit
 */
export const calculateProfit = (price: number, demand: number, costPerUnit: number): number => {
  // Profit = (Price - Cost per unit) × Demand
  return (price - costPerUnit) * demand;
};

/**
 * Find the price that maximizes profit
 */
export const findMaximumProfit = (marketCondition: MarketCondition) => {
  let maxProfit = 0;
  let maxPrice = marketCondition.costPerUnit;
  
  // Test prices from cost to maximum possible price
  for (let price = marketCondition.costPerUnit; price <= 100; price += 0.1) {
    const demand = calculateDemand(price, marketCondition);
    const profit = calculateProfit(price, demand, marketCondition.costPerUnit);
    
    if (profit > maxProfit) {
      maxProfit = profit;
      maxPrice = price;
    }
  }
  
  return { maxPrice, maxProfit };
};