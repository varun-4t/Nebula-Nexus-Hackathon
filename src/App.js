import logo from './logo.svg';
import './index.css';
import './App.css';
import GlassCard from './components/mars';

function App() {
  return (
    <div className="min-h-screen w-full bg-black">

      <div className="relative z-20">
        <GlassCard />
      </div>

    </div>
  );
}

export default App;