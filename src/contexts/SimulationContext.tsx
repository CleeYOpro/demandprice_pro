import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateDemand, calculateProfit, findMaximumProfit } from '../utils/calculationUtils';
import { getRandomEvent } from '../utils/eventUtils';
import type { MarketEvent, MarketCondition } from '../types';

interface SimulationContextType {
  price: number;
  setPrice: (price: number) => void;
  demand: number;
  profit: number;
  currentEvent: MarketEvent | null;
  triggerRandomEvent: () => void;
  resetMarket: () => void;
  marketCondition: MarketCondition;
  checkProfitMaximization: () => { isMaximized: boolean; maxPrice: number; maxProfit: number };
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

const defaultMarketCondition: MarketCondition = {
  maxDemand: 1000,
  demandSensitivity: 10,
  costPerUnit: 20,
  description: 'Normal market conditions'
};

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [price, setPrice] = useState(50);
  const [marketCondition, setMarketCondition] = useState<MarketCondition>(defaultMarketCondition);
  const [currentEvent, setCurrentEvent] = useState<MarketEvent | null>(null);
  const [demand, setDemand] = useState(0);
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    // Calculate demand and profit whenever price or market condition changes
    const newDemand = calculateDemand(price, marketCondition);
    const newProfit = calculateProfit(price, newDemand, marketCondition.costPerUnit);
    
    setDemand(newDemand);
    setProfit(newProfit);
  }, [price, marketCondition]);

  const triggerRandomEvent = () => {
    const event = getRandomEvent();
    setCurrentEvent(event);
    
    // Apply event effects to market condition
    const newMarketCondition = {
      ...marketCondition,
      maxDemand: marketCondition.maxDemand * event.maxDemandMultiplier,
      demandSensitivity: marketCondition.demandSensitivity * event.sensitivityMultiplier,
      description: event.description
    };
    
    setMarketCondition(newMarketCondition);
  };

  const resetMarket = () => {
    setMarketCondition(defaultMarketCondition);
    setCurrentEvent(null);
  };

  const checkProfitMaximization = () => {
    const { maxPrice, maxProfit } = findMaximumProfit(marketCondition);
    const isMaximized = Math.abs(price - maxPrice) < 1; // Allow for small differences
    return { isMaximized, maxPrice, maxProfit };
  };

  const value = {
    price,
    setPrice,
    demand,
    profit,
    currentEvent,
    triggerRandomEvent,
    resetMarket,
    marketCondition,
    checkProfitMaximization
  };

  return <SimulationContext.Provider value={value}>{children}</SimulationContext.Provider>;
};

export const useSimulation = (): SimulationContextType => {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};