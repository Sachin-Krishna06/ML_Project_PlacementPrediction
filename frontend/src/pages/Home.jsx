import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Target, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import IntroAnimation from '../components/IntroAnimation';

const Home = () => {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-secondary/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
              Know Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Placement Potential.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
              AI-powered placement and salary prediction based on your academic performance, coding skills, internships, projects and employability profile.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/predict" className="primary-btn flex items-center justify-center gap-2 text-lg">
                Predict My Placement
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/methodology" className="secondary-btn flex items-center justify-center text-lg">
                How It Works
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="glass-card p-8">
            <div className="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Company Matching</h3>
            <p className="text-gray-400">Get specific placement probabilities for 10 top tech companies based on their historical hiring patterns.</p>
          </div>
          
          <div className="glass-card p-8">
            <div className="h-12 w-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-6">
              <BarChart3 className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Salary Prediction</h3>
            <p className="text-gray-400">Discover your expected salary package with data-driven LPA ranges tailored to your profile.</p>
          </div>
          
          <div className="glass-card p-8">
            <div className="h-12 w-12 bg-success/20 rounded-lg flex items-center justify-center mb-6">
              <Award className="h-6 w-6 text-success" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Skill Analysis</h3>
            <p className="text-gray-400">Identify your weaknesses and get actionable recommendations to improve your placement chances.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
