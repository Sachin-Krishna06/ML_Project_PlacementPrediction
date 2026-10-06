import { Database, Binary, BarChart2 } from 'lucide-react';
import DataTableGraph from '../components/DataTableGraph';

const Methodology = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Dataset & Methodology</h1>
      
      <div className="space-y-8">
        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-4">
            <Database className="text-primary w-6 h-6" />
            <h2 className="text-xl font-bold text-white">Dataset Overview</h2>
          </div>
          <p className="text-gray-300 leading-relaxed mb-4">
            The prediction model is trained on a synthetic historical dataset representing typical student placement scenarios.
            Features include 10th and 12th marks, current CGPA, number of backlogs, internship experience, project count, LeetCode performance, aptitude scores, and soft skills.
          </p>

          {/* Table 1 Data Graph Visual */}
          <div className="my-6">
            <DataTableGraph 
              tableNumber="Table 1."
              title="Feature Statistics & Dataset Metric Distribution Matrix."
              headers={["Feature Name", "Mean Value", "Min", "Max"]}
              rows={[
                ["Current CGPA", "7.82 / 10", "5.50", "9.90"],
                ["10th Percentage", "84.5%", "55.0%", "98.5%"],
                ["12th Percentage", "82.1%", "50.0%", "97.0%"],
                ["LeetCode Solved", "240 problems", "0", "850"],
                ["Projects Completed", "3.2 projects", "0", "10"],
                ["Aptitude Test Score", "76.4 / 100", "35.0", "99.0"]
              ]}
              totalRow={[
                "Total / Average",
                "Overall Normalized Score: 81.2%",
                "Minimum Floor",
                "Maximum Ceiling"
              ]}
            />
          </div>

          <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
            <p className="text-warning text-sm font-medium">
              Disclaimer: The training dataset for this academic project uses synthetic data to simulate real-world distributions. It does not represent actual confidential company hiring records.
            </p>
          </div>
        </div>

        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-4">
            <Binary className="text-secondary w-6 h-6" />
            <h2 className="text-xl font-bold text-white">Machine Learning Pipeline</h2>
          </div>
          <ul className="space-y-3 text-gray-300 list-disc pl-5">
            <li><strong>Preprocessing:</strong> Missing values handled, categorical variables one-hot encoded, and continuous variables standardized using scikit-learn's <code className="text-primary">StandardScaler</code>.</li>
            <li><strong>Classification:</strong> The overall placement probability is predicted using an <code className="text-primary">XGBoost Classifier</code> which evaluates the likelihood of an offer.</li>
            <li><strong>Regression:</strong> The expected salary is predicted using a <code className="text-primary">Random Forest Regressor</code> trained specifically on records of placed students.</li>
          </ul>
        </div>

        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-4">
            <BarChart2 className="text-success w-6 h-6" />
            <h2 className="text-xl font-bold text-white">Company Matching</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Company-specific predictions combine the global ML probability with weighted matching scores for specific company requirements (e.g. Amazon prioritizes LeetCode scores, whereas Deloitte focuses on aptitude and soft skills).
            Eligibility rules (e.g. strict zero backlog policy) are applied on top of the statistical prediction to simulate actual hiring filters.
          </p>
        </div>
        
        <p className="text-center text-sm text-gray-500 mt-12">
          Predictions are estimates generated from historical data. Actual hiring decisions depend on company requirements, hiring cycles, interview performance, and market conditions.
        </p>
      </div>
    </div>
  );
};

export default Methodology;
