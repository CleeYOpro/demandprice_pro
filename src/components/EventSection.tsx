import React from 'react';
import { useSimulation } from '../contexts/SimulationContext';

const EventSection: React.FC = () => {
  const { currentEvent, triggerRandomEvent, resetMarket } = useSimulation();

  return (
    <div className="border-t border-gray-200 pt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Market Events</h2>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <button
          onClick={triggerRandomEvent}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Trigger Random Event
        </button>
        
        <button
          onClick={resetMarket}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Reset Market
        </button>
      </div>
      
      {currentEvent && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md">
          <div className="flex">
            <div>
              <h3 className="text-lg font-medium text-blue-800">
                {currentEvent.name}
              </h3>
              <p className="mt-1 text-blue-700">
                {currentEvent.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventSection;