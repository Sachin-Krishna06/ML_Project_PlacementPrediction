import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { AlertTriangle, TrendingUp, Target, Download, CheckCircle2, XCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import DataTableGraph from '../components/DataTableGraph';
import GroupedBarChartGraph from '../components/GroupedBarChartGraph';


const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results;
  const profile = location.state?.profile;

  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <AlertTriangle className="h-16 w-16 text-warning mb-4" />
        <h2 className="text-xl text-white">No results found. Please complete the prediction form first.</h2>
        <button onClick={() => navigate('/predict')} className="primary-btn mt-6">Go to Predictor</button>
      </div>
    );
  }

  const { placement_probability, predicted_salary, salary_range, placement_readiness, companies, recommendations } = results;

  const downloadReport = () => {
    const doc = new jsPDF();
    doc.text("PLACEMENTIQ - Prediction Report", 20, 20);
    doc.text(`Placement Probability: ${placement_probability}%`, 20, 40);
    doc.text(`Expected Salary: ${predicted_salary} LPA`, 20, 50);
    doc.text(`Placement Readiness: ${placement_readiness}/100`, 20, 60);
    doc.save("placementiq-report.pdf");
  };

  const readinessCategory = 
    placement_readiness > 85 ? "Highly Competitive" :
    placement_readiness > 70 ? "Placement Ready" :
    placement_readiness > 50 ? "Developing" :
    placement_readiness > 30 ? "Beginner" : "Needs Major Improvement";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 text-center mb-12 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-success" />
        <h1 className="text-3xl font-bold text-white mb-2">Your Placement Prediction</h1>
        <p className="text-gray-400 mb-8">Based on ML analysis of your profile</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Probability</h3>
            <div className="text-5xl font-bold text-primary">{placement_probability}%</div>
          </div>
          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Expected Package</h3>
            <div className="text-5xl font-bold text-success mb-2">₹{predicted_salary} <span className="text-lg">LPA</span></div>
            <div className="text-sm text-gray-500">Range: ₹{salary_range.min} - ₹{salary_range.max} LPA</div>
          </div>
          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Readiness Score</h3>
            <div className="text-5xl font-bold text-secondary mb-2">{placement_readiness}</div>
            <div className="text-sm text-gray-500">{readinessCategory}</div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Company Ranking */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Target className="text-primary" /> Company Match Ranking</h2>
          <div className="space-y-4">
            {companies.slice(0, 5).map((comp, idx) => (
              <div key={comp.company} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-gray-600 w-8">{idx + 1}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{comp.company}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${comp.eligibility === 'Likely Eligible' ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'}`}>
                      {comp.eligibility}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{comp.match_score}/100</div>
                  <div className="text-sm text-gray-400">{comp.salary_prediction} LPA</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actionable Recommendations */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><TrendingUp className="text-secondary" /> AI Recommendations</h2>
          <ul className="space-y-4">
            {recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 bg-secondary rounded-full flex-shrink-0" />
                <p className="text-sm text-gray-300 leading-relaxed">{rec}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Salary Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6 mb-12">
        <h2 className="text-xl font-bold text-white mb-6">Salary Predictions by Company</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={companies.slice(0, 10)}>
              <XAxis dataKey="company" stroke="#888" tick={{ fill: '#888' }} />
              <YAxis stroke="#888" tick={{ fill: '#888' }} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                contentStyle={{ backgroundColor: '#0A1322', borderColor: 'rgba(255,255,255,0.15)', borderRadius: '8px', color: '#ffffff' }}
                itemStyle={{ color: '#ffffff' }}
                labelStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                formatter={(value) => [`${value} LPA`, 'Predicted Salary']}
              />
              <ReferenceLine y={predicted_salary} stroke="#10B981" strokeDasharray="3 3" label={{ position: 'top', value: 'Avg Expected', fill: '#10B981' }} />
              <Bar dataKey="salary_prediction" radius={[4, 4, 0, 0]}>
                {companies.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.match_score > 75 ? '#00E5FF' : '#4B5563'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Figure 3 Grouped Bar Chart Visual */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mb-12">
        <GroupedBarChartGraph 
          figureNumber="Figure 3."
          caption="Company Requirement Match & Salary Distribution Clustered Visual."
          chartTitle="Top Company Match Score & Package Benchmarks"
          data={companies.slice(0, 4).map(c => ({
            category: c.company,
            series1: +(c.match_score / 20).toFixed(1), // Scaled 0-6 axis
            series2: +(placement_probability / 20).toFixed(1),
            series3: +c.salary_prediction.toFixed(1)
          }))}
          seriesLabels={{
            series1: "Series 1 (Match Score / 20)",
            series2: "Series 2 (Placement Prob / 20)",
            series3: "Series 3 (Salary LPA)"
          }}
          yDomain={[0, 6]}
        />
      </motion.div>

      {/* Table 1 Data Graph Matrix Visual */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-12">
        <DataTableGraph 
          tableNumber="Table 1."
          title="Company Placement Analysis & Match Score Breakdown Matrix."
          headers={["Company Name", "Match Score (%)", "Predicted Salary (LPA)", "Eligibility Status"]}
          rows={companies.slice(0, 6).map(c => [
            c.company,
            `${c.match_score}%`,
            `${c.salary_prediction} LPA`,
            c.eligibility
          ])}
          totalRow={[
            "Total / Average",
            `${Math.round(companies.slice(0, 6).reduce((acc, c) => acc + c.match_score, 0) / Math.min(companies.length, 6))}%`,
            `${(companies.slice(0, 6).reduce((acc, c) => acc + c.salary_prediction, 0) / Math.min(companies.length, 6)).toFixed(2)} LPA`,
            `${companies.slice(0, 6).filter(c => c.eligibility === 'Likely Eligible').length} / ${Math.min(companies.length, 6)} Eligible`
          ]}
        />
      </motion.div>

      {/* Footer / Actions */}
      <div className="flex justify-center mt-12">
        <button onClick={downloadReport} className="primary-btn flex items-center gap-2">
          <Download className="w-5 h-5" /> Download PDF Report
        </button>
      </div>
    </div>
  );
};

export default Results;
