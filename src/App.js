import logo from './logo.svg';
import './index.css';
import './App.css';
import GlassCard from './components/GlassCard';
import Spline from './components/SplineViewer';

function App() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Spline bg*/}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="scale-125 w-full h-full">
          <Spline />
        </div>
      </div>


      {/* Foreground Content */}
      <div className="relative z-20">
        <GlassCard />
      </div>

    </div>
  );
}

export default App;