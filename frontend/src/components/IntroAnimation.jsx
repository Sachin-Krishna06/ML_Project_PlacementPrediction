import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BrainCircuit } from 'lucide-react';

const IntroAnimation = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      // Scene 1
      await new Promise(r => setTimeout(r, 1000));
      setStep(1); // YOUR CAREER.
      await new Promise(r => setTimeout(r, 800));
      setStep(2); // YOUR DATA.
      await new Promise(r => setTimeout(r, 800));
      setStep(3); // YOUR FUTURE.
      
      // Scene 2
      await new Promise(r => setTimeout(r, 1200));
      setStep(4); // Powered by Machine Learning
      
      // Scene 3
      await new Promise(r => setTimeout(r, 1500));
      setStep(5); // Stats
      
      // Scene 4
      await new Promise(r => setTimeout(r, 2000));
      setStep(6); // Logo
    };
    
    sequence();
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center overflow-hidden">
      {/* Particles background simulation */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 h-64 flex items-center justify-center text-center">
        {step === 1 && (
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="text-4xl md:text-6xl font-bold tracking-widest text-white"
          >
            YOUR CAREER.
          </motion.h1>
        )}
        
        {step === 2 && (
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="text-4xl md:text-6xl font-bold tracking-widest text-primary"
          >
            YOUR DATA.
          </motion.h1>
        )}
        
        {step === 3 && (
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="text-4xl md:text-6xl font-bold tracking-widest text-secondary"
          >
            YOUR FUTURE.
          </motion.h1>
        )}

        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4"
          >
            <BrainCircuit className="h-16 w-16 text-primary animate-pulse" />
            <h2 className="text-2xl font-light text-gray-300 tracking-wide">Powered by Machine Learning</h2>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-12 text-center"
          >
            <div>
              <div className="text-5xl font-bold text-primary mb-2">10+</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest">Companies</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-secondary mb-2">1000s</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest">Student Profiles</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-success mb-2">ML</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest">Prediction Engine</div>
            </div>
          </motion.div>
        )}

        {step === 6 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-4">
              <BrainCircuit className="h-12 w-12 text-primary" />
              <h1 className="text-5xl md:text-7xl font-bold tracking-wider text-white">
                PLACEMENT<span className="text-primary">IQ</span>
              </h1>
            </div>
            <p className="text-xl text-gray-400 tracking-widest mb-12">Predict. Prepare. Get Placed.</p>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={onComplete}
              className="primary-btn text-lg flex items-center gap-2"
            >
              START PREDICTION →
            </motion.button>
          </motion.div>
        )}
      </div>
      
      {step < 6 && (
        <button 
          onClick={onComplete}
          className="absolute bottom-10 text-gray-500 hover:text-white text-sm tracking-widest transition-colors"
        >
          SKIP INTRO
        </button>
      )}
    </div>
  );
};

export default IntroAnimation;
