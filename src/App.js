import logo from './logo.svg';
import './index.css';
import './App.css';
import GlassCard from './components/mars';

function App() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <div className="relative z-20">
        <GlassCard />
      </div>

    </div>
  );
}

export default App;