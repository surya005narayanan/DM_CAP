import type { TruthTableRow } from '../logic';

interface TruthTableProps {
  variables: string[];
  rows: TruthTableRow[];
}

export function TruthTable({ variables, rows }: TruthTableProps) {
  if (variables.length === 0 || rows.length === 0) return null;

  return (
    <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-700/60 overflow-hidden shadow-xl shadow-slate-900/20">
      <div className="p-4 border-b border-slate-700/60 bg-slate-800/80">
        <h3 className="font-semibold text-white">Truth Table</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/50 text-slate-300 text-sm">
              {variables.map((v) => (
                <th key={v} className="py-3 px-4 font-semibold border-b border-slate-700 text-center w-16">
                  {v}
                </th>
              ))}
              <th className="py-3 px-4 font-semibold border-b border-slate-700 border-l border-slate-700/50 text-center text-teal-400">
                F
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr 
                key={row.index} 
                className={`text-sm transition-colors ${row.result ? 'bg-teal-950/20 hover:bg-teal-900/30' : 'bg-red-950/10 hover:bg-red-900/20'} border-b border-slate-700/30 last:border-0`}
              >
                {variables.map((v) => (
                  <td key={v} className="py-2.5 px-4 text-center text-slate-300 font-mono">
                    {row.assignment[v] ? '1' : '0'}
                  </td>
                ))}
                <td className="py-2.5 px-4 text-center font-bold font-mono border-l border-slate-700/50">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded ${row.result ? 'bg-teal-500/20 text-teal-400' : 'bg-red-500/20 text-red-400'}`}>
                    {row.result ? '1' : '0'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
