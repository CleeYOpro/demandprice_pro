import { SimulationProvider } from './contexts/SimulationContext';
import Simulator from './components/Simulator';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SimulationProvider>
        <Simulator />
      </SimulationProvider>
    </div>
  );
}

export default App;