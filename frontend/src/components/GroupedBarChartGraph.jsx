import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const CustomTooltip = ({ active, payload, label, seriesLabels }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0A1322] border border-white/20 p-3 rounded-lg shadow-xl text-white text-xs space-y-1">
        <p className="font-bold border-b border-white/10 pb-1 mb-1 text-slate-200">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <span style={{ color: entry.fill }} className="font-semibold">
              {seriesLabels[entry.dataKey] || entry.name}:
            </span>
            <span className="font-bold text-white">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const GroupedBarChartGraph = ({
  figureNumber = "Figure 3.",
  caption = "Model Metrics & Clustered Performance Comparison.",
  chartTitle = "Chart Title",
  data = [
    { category: "Category 1", series1: 4.3, series2: 2.4, series3: 2.0 },
    { category: "Category 2", series1: 2.5, series2: 4.4, series3: 2.0 },
    { category: "Category 3", series1: 3.5, series2: 1.8, series3: 3.0 },
    { category: "Category 4", series1: 4.5, series2: 2.8, series3: 5.0 }
  ],
  seriesLabels = {
    series1: "Series 1",
    series2: "Series 2",
    series3: "Series 3"
  },
  colors = {
    series1: "#2B549A", // Dark Royal Blue
    series2: "#E67E22", // Warm Orange
    series3: "#5B9BD5"  // Sky Blue
  },
  yDomain = [0, 6]
}) => {
  return (
    <div className="w-full my-6 bg-white/95 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-white/20">
      {/* Chart Main Title centered */}
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-normal text-slate-600 font-sans tracking-tight">
          {chartTitle}
        </h3>
      </div>

      {/* Clustered Grouped Bar Chart Area */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
            barGap={4}
            barCategoryGap="20%"
          >
            {/* Soft Horizontal Gridlines Only */}
            <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="0" />
            
            <XAxis 
              dataKey="category" 
              tick={{ fill: '#475569', fontSize: 13, fontWeight: 500 }}
              axisLine={{ stroke: '#CBD5E1' }}
              tickLine={false}
              dy={10}
            />
            
            <YAxis 
              domain={yDomain}
              tick={{ fill: '#475569', fontSize: 13 }}
              axisLine={{ stroke: '#CBD5E1' }}
              tickLine={false}
            />

            <Tooltip content={<CustomTooltip seriesLabels={seriesLabels} />} />

            {/* Custom Legend matching bottom layout */}
            <Legend 
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => (
                <span className="text-slate-700 font-medium text-xs md:text-sm mr-4">
                  {seriesLabels[value] || value}
                </span>
              )}
            />

            {/* 3 Clustered Series Bars */}
            <Bar dataKey="series1" fill={colors.series1} name="series1" radius={[0, 0, 0, 0]} maxBarSize={45} />
            <Bar dataKey="series2" fill={colors.series2} name="series2" radius={[0, 0, 0, 0]} maxBarSize={45} />
            <Bar dataKey="series3" fill={colors.series3} name="series3" radius={[0, 0, 0, 0]} maxBarSize={45} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Figure 3 Caption at bottom left matching Calibri 24pt style */}
      <div className="text-left mt-6 pt-2 border-t border-slate-200/80">
        <span className="text-sm md:text-base font-sans text-slate-800 tracking-tight">
          <span className="font-bold text-slate-900 mr-2">{figureNumber}</span>
          {caption}
        </span>
      </div>
    </div>
  );
};

export default GroupedBarChartGraph;
