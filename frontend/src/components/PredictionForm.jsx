import { useState } from 'react';

export default function PredictionForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    tenth_percentage: '',
    twelfth_percentage: '',
    previous_gpa: '',
    current_cgpa: '',
    current_backlogs: '',
    history_of_arrears: '0',
    internship_count: '',
    project_count: '',
    leetcode_total: '',
    leetcode_easy: '',
    leetcode_medium: '',
    leetcode_hard: '',
    aptitude_score: '',
    soft_skill_rating: '',
    target_role: 'Software Developer'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert to numbers
    const payload = Object.fromEntries(
      Object.entries(formData).map(([k, v]) => [k, k === 'target_role' ? v : Number(v)])
    );
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-slate-800 rounded-xl shadow-xl border border-slate-700">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Profile Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300">10th Percentage</label>
          <input type="number" name="tenth_percentage" value={formData.tenth_percentage} onChange={handleChange} required className="mt-1 block w-full rounded-md bg-slate-900 border-slate-700 text-slate-100 p-2" min="0" max="100"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">12th Percentage</label>
          <input type="number" name="twelfth_percentage" value={formData.twelfth_percentage} onChange={handleChange} required className="mt-1 block w-full rounded-md bg-slate-900 border-slate-700 text-slate-100 p-2" min="0" max="100"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">Current CGPA</label>
          <input type="number" step="0.1" name="current_cgpa" value={formData.current_cgpa} onChange={handleChange} required className="mt-1 block w-full rounded-md bg-slate-900 border-slate-700 text-slate-100 p-2" min="0" max="10"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">Previous GPA</label>
          <input type="number" step="0.1" name="previous_gpa" value={formData.previous_gpa} onChange={handleChange} required className="mt-1 block w-full rounded-md bg-slate-900 border-slate-700 text-slate-100 p-2" min="0" max="10"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">Active Backlogs</label>
          <input type="number" name="current_backlogs" value={formData.current_backlogs} onChange={handleChange} required className="mt-1 block w-full rounded-md bg-slate-900 border-slate-700 text-slate-100 p-2" min="0"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">History of Arrears (0 or 1)</label>
          <input type="number" name="history_of_arrears" value={formData.history_of_arrears} onChange={handleChange} required className="mt-1 block w-full rounded-md bg-slate-900 border-slate-700 text-slate-100 p-2" min="0" max="1"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">Internships</label>
          <input type="number" name="internship_count" value={formData.internship_count} onChange={handleChange} required className="mt-1 block w-full rounded-md bg-slate-900 border-slate-700 text-slate-100 p-2" min="0"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">Projects</label>
          <input type="number" name="project_count" value={formData.project_count} onChange={handleChange} required className="mt-1 block w-full rounded-md bg-slate-900 border-slate-700 text-slate-100 p-2" min="0"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">LeetCode Total</label>
          <input type="number" name="leetcode_total" value={formData.leetcode_total} onChange={handleChange} required className="mt-1 block w-full rounded-md bg-slate-900 border-slate-700 text-slate-100 p-2" min="0"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">LeetCode Medium</label>
          <input type="number" name="leetcode_medium" value={formData.leetcode_medium} onChange={handleChange} required className="mt-1 block w-full rounded-md bg-slate-900 border-slate-700 text-slate-100 p-2" min="0"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">Aptitude Score (0-100)</label>
          <input type="number" name="aptitude_score" value={formData.aptitude_score} onChange={handleChange} required className="mt-1 block w-full rounded-md bg-slate-900 border-slate-700 text-slate-100 p-2" min="0" max="100"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">Soft Skill Rating (1-10)</label>
          <input type="number" name="soft_skill_rating" value={formData.soft_skill_rating} onChange={handleChange} required className="mt-1 block w-full rounded-md bg-slate-900 border-slate-700 text-slate-100 p-2" min="1" max="10"/>
        </div>
      </div>
      
      <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-[0_0_15px_rgba(8,145,178,0.5)]">
        Predict My Placement →
      </button>
    </form>
  );
}
