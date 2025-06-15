import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { useSimulation } from '../contexts/SimulationContext';
import { calculateDemand, calculateProfit } from '../utils/calculationUtils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MarketGraphProps {
  onClose: () => void;
  showMaximization?: boolean;
}

const MarketGraph: React.FC<MarketGraphProps> = ({ onClose, showMaximization }) => {
  const { marketCondition, price, checkProfitMaximization } = useSimulation();
  const { maxPrice, maxProfit, isMaximized } = showMaximization ? checkProfitMaximization() : { maxPrice: 0, maxProfit: 0, isMaximized: false };

  // Generate quantity points for the graph (reduced range for better visibility)
  const quantities = Array.from({ length: 50 }, (_, i) => i * (marketCondition.maxDemand / 50));
  
  // Calculate price points for each quantity (inverse demand function)
  const demandPrices = quantities.map(q => (marketCondition.maxDemand - q) / marketCondition.demandSensitivity);
  
  // Calculate marginal revenue
  const marginalRevenue = quantities.map((q, i) => {
    const price = demandPrices[i];
    return price * (1 - 1/marketCondition.demandSensitivity);
  });

  // Find intersection point for profit maximization
  const intersectionIndex = marginalRevenue.findIndex((mr, i) => Math.abs(mr - marketCondition.costPerUnit) < 0.1);
  const profitMaxQuantity = quantities[intersectionIndex];
  const profitMaxPrice = demandPrices[intersectionIndex];

  // Calculate marginal cost line that intersects price axis at profit-maximizing price
  const marginalCost = quantities.map(q => {
    const slope = (marketCondition.costPerUnit - profitMaxPrice) / profitMaxQuantity;
    return profitMaxPrice + (slope * q);
  });

  // Create profit region dataset
  const profitRegion = {
    label: 'Profit Region',
    data: quantities.map((q, i) => {
      if (q <= profitMaxQuantity) {
        return profitMaxPrice;
      }
      return null;
    }),
    backgroundColor: 'rgba(255, 255, 0, 0.2)',
    borderColor: 'transparent',
    fill: {
      target: {
        value: marketCondition.costPerUnit
      }
    },
    pointRadius: 0
  };

  const data = {
    labels: quantities.map(q => q.toFixed(0)),
    datasets: [
      {
        label: 'Demand',
        data: demandPrices,
        borderColor: 'rgb(0, 99, 232)',
        backgroundColor: 'transparent',
        tension: 0,
        pointRadius: 0,
        borderWidth: 2
      },
      {
        label: 'Marginal Revenue',
        data: marginalRevenue,
        borderColor: 'rgb(135, 206, 250)',
        backgroundColor: 'transparent',
        tension: 0,
        pointRadius: 0,
        borderWidth: 2
      },
      {
        label: 'Marginal Cost',
        data: marginalCost,
        borderColor: 'rgb(255, 206, 86)',
        backgroundColor: 'transparent',
        tension: 0,
        pointRadius: 0,
        borderWidth: 2
      },
      profitRegion
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Market Analysis - Supply and Demand',
      },
      tooltip: {
        enabled: false
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Quantity',
        },
        grid: {
          display: true,
          drawBorder: true,
        }
      },
      y: {
        title: {
          display: true,
          text: 'Price ($)',
        },
        min: 0,
        max: Math.max(...demandPrices) * 1.2,
        grid: {
          display: true,
          drawBorder: true,
        }
      }
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Market Analysis</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        {showMaximization && (
          <div className={`mb-4 p-3 rounded-md ${isMaximized ? 'bg-green-100' : 'bg-yellow-100'}`}>
            <p className={isMaximized ? 'text-green-700' : 'text-yellow-700'}>
              {isMaximized 
                ? '🎯 Congratulations! Your price maximizes profit!'
                : `📈 Maximum profit can be achieved at $${maxPrice.toFixed(2)}`
              }
            </p>
            <p className="text-sm mt-1 text-gray-600">
              The profit-maximizing price occurs where Marginal Revenue equals Marginal Cost
            </p>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <Line options={options} data={data} />
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          <p>
            • The blue line shows the demand curve - how quantity demanded changes with price
          </p>
          <p>
            • The light blue line shows marginal revenue - additional revenue from selling one more unit
          </p>
          <p>
            • The yellow line shows marginal cost - cost of producing one additional unit
          </p>
          <p>
            • The yellow shaded area represents the total profit at the profit-maximizing price and quantity
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketGraph;