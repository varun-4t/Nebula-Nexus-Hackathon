import logo from './logo.svg';
import './index.css';
import './App.css';
import GlassCard from './components/GlassCard';
import Spline from './components/SplineViewer';

function App() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Spline />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">
        <GlassCard />
      </div>
    </div>
  );
}

export default App;