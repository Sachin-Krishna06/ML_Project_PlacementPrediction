import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Prediction from './pages/Prediction';
import Results from './pages/Results';
import Methodology from './pages/Methodology';
import ModelMetrics from './pages/ModelMetrics';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predict" element={<Prediction />} />
            <Route path="/results" element={<Results />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="/metrics" element={<ModelMetrics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
