import React, { useRef, useState } from 'react';
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
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { useSimulation } from '../contexts/SimulationContext';

// Register Chart.js components + plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

interface MarketGraphProps {
  onClose: () => void;
  showMaximization?: boolean;
}

const MarketGraph: React.FC<MarketGraphProps> = ({ onClose, showMaximization }) => {
  const { checkProfitMaximization, price, demand } = useSimulation();
  const { maxPrice, isMaximized } = showMaximization
    ? checkProfitMaximization()
    : { maxPrice: 0, isMaximized: false };

  const chartRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);

  // Sample curves
  const demandData = Array.from({ length: 41 }, (_, i) => ({ x: i * 2, y: 100 - i * 2 }));
  const marginalRevenueData = Array.from({ length: 26 }, (_, i) => ({
    x: i * 2,
    y: 100 - 2 * i * 2,
  }));
  const marginalCostData = Array.from({ length: 41 }, (_, i) => ({
    x: i * 2,
    y: 20 + 0.5 * i * 2,
  }));

  // Yellow hover rectangle (unchanged)
  const rect = { x1: 0, y1: 36, x2: 32, y2: 68 };
  const hoverRectPlugin = {
    id: 'hoverRectPlugin',
    afterDraw: (chart: any) => {
      if (!hovered) return;
      const { ctx, scales } = chart;
      const xScale = scales.x;
      const yScale = scales.y;
      ctx.save();
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = 'yellow';
      ctx.beginPath();
      ctx.moveTo(xScale.getPixelForValue(rect.x1), yScale.getPixelForValue(rect.y1));
      ctx.lineTo(xScale.getPixelForValue(rect.x2), yScale.getPixelForValue(rect.y1));
      ctx.lineTo(xScale.getPixelForValue(rect.x2), yScale.getPixelForValue(rect.y2));
      ctx.lineTo(xScale.getPixelForValue(rect.x1), yScale.getPixelForValue(rect.y2));
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    },
  };

  const data = {
    datasets: [
      {
        label: 'Demand',
        data: demandData,
        borderColor: '#4472C4',
        borderWidth: 2,
        fill: false,
        pointRadius: 0,
        tension: 0,
      },
      {
        label: 'Marginal Revenue',
        data: marginalRevenueData,
        borderColor: '#5B9BD5',
        borderWidth: 2,
        fill: false,
        pointRadius: 0,
        tension: 0,
      },
      {
        label: 'Marginal Cost',
        data: marginalCostData,
        borderColor: '#70AD47',
        borderWidth: 2,
        fill: false,
        pointRadius: 0,
        tension: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear' as const,
        min: 0,
        max: 80,
        title: { display: true, text: 'Quantity' },
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          drawBorder: true,
        },
      },
      y: {
        min: 0,
        max: 100,
        title: { display: true, text: 'Price' },
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          drawBorder: true,
        },
      },
    },
    plugins: {
      legend: { display: true, position: 'right' },
      annotation: {
        annotations: {
          box1: {
            type: 'box',
            xMin: 0,
            xMax: 32,
            yMin: 36,
            yMax: 68,
            backgroundColor: 'rgba(255, 99, 132, 0.25)'
          },
          profitMaxPrice: {
            type: 'line',
            yMin: 68,
            yMax: 68,
            borderColor: 'black',
            borderWidth: 2,
            borderDash: [6, 6],
          },
          profitMaxQuantity: {
            type: 'line',
            xMin: 32,
            xMax: 32,
            borderColor: 'black',
            borderWidth: 2,
            borderDash: [6, 6],
          }
        }
      }
    },
    elements: { point: { radius: 0 } }
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

        <div style={{ position: 'relative', width: 700, height: 400, margin: '0 auto' }}>
          {/* Y-axis label (Price) */}
          <div style={{ position: 'absolute', left: 0, top: 108, width: 75, textAlign: 'right', 
            fontWeight: 'bold', color: '#222', fontSize: 12 }}>
            Profit-Max Price: ${price}
          </div>
          {/* X-axis label (Estimated Demand) */}
          <div style={{ position: 'absolute', left: 160, top: 330, width: 200, textAlign: 'center',
             fontWeight: 'bold', color: '#222', fontSize: 12 }}>
            Estimated Demand: {demand} units
          </div>
          <div
            style={{
              width: 700,
              height: 400,
              background: 'white',
              borderRadius: 8,
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              padding: 20
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Line
              ref={chartRef}
              data={data}
              options={options as any}
              plugins={[hoverRectPlugin]}
              height={650}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketGraph;
