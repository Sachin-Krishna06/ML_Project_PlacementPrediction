import React from 'react';

const DataTableGraph = ({ 
  tableNumber = "Table 1.",
  title = "Model Evaluation & Benchmark Matrix.", 
  headers = ["Item", "Heading 1", "Heading 2", "Heading 3"], 
  rows = [], 
  totalRow = null 
}) => {
  return (
    <div className="w-full my-6 bg-white/95 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-white/20">
      {/* Title Label matching 24pt Calibri / clean corporate style */}
      <div className="text-left mb-4">
        <span className="text-lg md:text-xl font-bold text-slate-800 font-sans tracking-tight">
          <span className="font-extrabold text-[#2A5298] mr-2">{tableNumber}</span>
          {title}
        </span>
      </div>

      {/* Styled Data Matrix Table Visual */}
      <div className="overflow-x-auto rounded-lg shadow-sm border border-white/40">
        <table className="w-full border-collapse text-sm font-sans text-slate-800">
          {/* Header Row: Deep Royal Blue with crisp white dividers */}
          <thead>
            <tr className="bg-gradient-to-r from-[#2A5298] via-[#1E40AF] to-[#2A5298] text-white">
              {headers.map((header, idx) => (
                <th 
                  key={idx}
                  className={`py-3.5 px-4 font-bold text-center border-r border-b border-white/30 last:border-r-0 tracking-wide ${
                    idx === 0 ? 'text-left pl-6' : ''
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Data Rows: Alternating soft blue zebra striping */}
          <tbody>
            {rows.map((row, rIdx) => {
              const rowValues = Array.isArray(row) ? row : Object.values(row);
              const isEven = rIdx % 2 === 0;
              const bgClass = isEven ? 'bg-[#E8F1FD]' : 'bg-[#DDE7F6]';

              return (
                <tr 
                  key={rIdx} 
                  className={`${bgClass} hover:bg-[#CBE0F9] transition-colors border-b border-white/60`}
                >
                  {rowValues.map((val, cIdx) => (
                    <td 
                      key={cIdx} 
                      className={`py-3 px-4 border-r border-white/60 last:border-r-0 ${
                        cIdx === 0 
                          ? 'font-semibold text-slate-900 text-left pl-6' 
                          : 'text-center text-slate-800 font-medium'
                      }`}
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              );
            })}

            {/* Total / Summary Row at Bottom */}
            {totalRow && (
              <tr className="bg-[#C9DDF7] border-t-2 border-white text-slate-900 font-bold">
                {(Array.isArray(totalRow) ? totalRow : Object.values(totalRow)).map((val, cIdx) => (
                  <td 
                    key={cIdx}
                    className={`py-3.5 px-4 border-r border-white/80 last:border-r-0 text-base ${
                      cIdx === 0 ? 'text-left pl-6 font-extrabold' : 'text-center font-bold'
                    }`}
                  >
                    {val}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTableGraph;
