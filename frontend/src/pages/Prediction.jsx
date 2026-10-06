import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { predictPlacement } from '../services/api';
import { Brain, Code, Briefcase, Target, User, ChevronRight, ChevronLeft } from 'lucide-react';

const steps = [
  { id: 1, title: 'Academics', icon: <Brain className="w-5 h-5" /> },
  { id: 2, title: 'Coding Skills', icon: <Code className="w-5 h-5" /> },
  { id: 3, title: 'Experience', icon: <Briefcase className="w-5 h-5" /> },
  { id: 4, title: 'Aptitude & Soft Skills', icon: <User className="w-5 h-5" /> },
  { id: 5, title: 'Target Role', icon: <Target className="w-5 h-5" /> },
];

const Prediction = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  
  const [formData, setFormData] = useState({
    tenth_percentage: 85,
    twelfth_percentage: 88,
    previous_gpa: 8.1,
    current_cgpa: 8.4,
    current_backlogs: 0,
    history_of_arrears: 0,
    internship_count: 1,
    project_count: 2,
    leetcode_total: 100,
    leetcode_easy: 50,
    leetcode_medium: 40,
    leetcode_hard: 10,
    aptitude_score: 75,
    soft_skill_rating: 8,
    target_role: "Software Developer"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'target_role' ? value : Number(value)
    }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setIsLoading(true);
    const loadingTexts = [
      "Analyzing academic profile...",
      "Evaluating coding strength...",
      "Analyzing internships...",
      "Comparing company requirements...",
      "Running prediction models...",
      "Generating placement insights..."
    ];
    
    // Simulate loading animation
    for (let i = 0; i < loadingTexts.length; i++) {
      setLoadingText(loadingTexts[i]);
      await new Promise(r => setTimeout(r, 600));
    }
    setLoadingText("Prediction Complete.");
    
    try {
      const results = await predictPlacement(formData);
      navigate('/results', { state: { results, profile: formData } });
    } catch (error) {
      console.error(error);
      alert("Error generating prediction. Is the backend running?");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <Brain className="h-16 w-16 text-primary animate-pulse mb-8" />
        <h2 className="text-2xl text-white font-light tracking-wider animate-pulse">{loadingText}</h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Progress Stepper */}
      <div className="mb-12">
        <div className="flex justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 -z-10" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary transition-all duration-500 -z-10" 
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }} 
          />
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center gap-2 bg-background p-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                currentStep >= step.id ? 'border-primary bg-primary/20 text-primary' : 'border-white/20 bg-background text-gray-500'
              }`}>
                {step.icon}
              </div>
              <span className={`text-xs font-medium ${currentStep >= step.id ? 'text-primary' : 'text-gray-500'}`}>{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="glass-card p-8 min-h-[400px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Academic Profile</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="input-label">10th Percentage</label>
                    <input type="number" name="tenth_percentage" value={formData.tenth_percentage} onChange={handleChange} className="input-field" min="0" max="100" />
                  </div>
                  <div>
                    <label className="input-label">12th Percentage</label>
                    <input type="number" name="twelfth_percentage" value={formData.twelfth_percentage} onChange={handleChange} className="input-field" min="0" max="100" />
                  </div>
                  <div>
                    <label className="input-label">Current CGPA</label>
                    <input type="number" name="current_cgpa" value={formData.current_cgpa} onChange={handleChange} className="input-field" min="0" max="10" step="0.1" />
                  </div>
                  <div>
                    <label className="input-label">Previous GPA</label>
                    <input type="number" name="previous_gpa" value={formData.previous_gpa} onChange={handleChange} className="input-field" min="0" max="10" step="0.1" />
                  </div>
                  <div>
                    <label className="input-label">Active Backlogs</label>
                    <input type="number" name="current_backlogs" value={formData.current_backlogs} onChange={handleChange} className="input-field" min="0" />
                  </div>
                  <div>
                    <label className="input-label">History of Arrears (Count)</label>
                    <input type="number" name="history_of_arrears" value={formData.history_of_arrears} onChange={handleChange} className="input-field" min="0" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Coding Skills</h2>
                <div>
                  <label className="input-label">Total LeetCode Problems Solved</label>
                  <input type="number" name="leetcode_total" value={formData.leetcode_total} onChange={handleChange} className="input-field" min="0" />
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="input-label text-success">Easy</label>
                    <input type="number" name="leetcode_easy" value={formData.leetcode_easy} onChange={handleChange} className="input-field" min="0" />
                  </div>
                  <div>
                    <label className="input-label text-warning">Medium</label>
                    <input type="number" name="leetcode_medium" value={formData.leetcode_medium} onChange={handleChange} className="input-field" min="0" />
                  </div>
                  <div>
                    <label className="input-label text-danger">Hard</label>
                    <input type="number" name="leetcode_hard" value={formData.leetcode_hard} onChange={handleChange} className="input-field" min="0" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Experience & Projects</h2>
                <div>
                  <label className="input-label">Number of Internships</label>
                  <input type="number" name="internship_count" value={formData.internship_count} onChange={handleChange} className="input-field" min="0" />
                </div>
                <div className="mt-6">
                  <label className="input-label">Number of Projects</label>
                  <input type="number" name="project_count" value={formData.project_count} onChange={handleChange} className="input-field" min="0" />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Aptitude & Soft Skills</h2>
                <div>
                  <label className="input-label flex justify-between">
                    <span>Aptitude Score (0-100)</span>
                    <span className="text-primary">{formData.aptitude_score}</span>
                  </label>
                  <input type="range" name="aptitude_score" value={formData.aptitude_score} onChange={handleChange} className="w-full accent-primary" min="0" max="100" />
                </div>
                <div className="mt-8">
                  <label className="input-label flex justify-between">
                    <span>Soft Skill Rating (1-10)</span>
                    <span className="text-secondary">{formData.soft_skill_rating}</span>
                  </label>
                  <input type="range" name="soft_skill_rating" value={formData.soft_skill_rating} onChange={handleChange} className="w-full accent-secondary" min="1" max="10" />
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Target Role</h2>
                <div>
                  <label className="input-label">Select your preferred role</label>
                  <select name="target_role" value={formData.target_role} onChange={handleChange} className="input-field [&>option]:text-black">
                    <option value="Software Developer">Software Developer</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                    <option value="Cloud Engineer">Cloud Engineer</option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                    <option value="AI/ML Engineer">AI/ML Engineer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                  </select>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-12">
          <button 
            onClick={prevStep} 
            disabled={currentStep === 1}
            className={`secondary-btn flex items-center gap-2 ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          
          {currentStep < 5 ? (
            <button onClick={nextStep} className="primary-btn flex items-center gap-2">
              Next <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button onClick={handleSubmit} className="primary-btn flex items-center gap-2">
              Predict Placement <Target className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prediction;
