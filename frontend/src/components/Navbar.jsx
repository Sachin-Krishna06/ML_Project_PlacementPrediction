import { Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <BrainCircuit className="h-8 w-8 text-primary group-hover:animate-pulse" />
              <span className="font-bold text-xl tracking-wider text-white">
                PLACEMENT<span className="text-primary">IQ</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
              <Link to="/predict" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Predict</Link>
              <Link to="/methodology" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Methodology</Link>
              <Link to="/metrics" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Model Metrics</Link>
              
              <Link to="/predict" className="primary-btn text-sm">
                Start Prediction
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
