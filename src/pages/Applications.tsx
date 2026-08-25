import { Scale } from 'lucide-react';

interface ApplicationsProps {
  onEnterApp: (app: string) => void;
}

export function Applications({ onEnterApp }: ApplicationsProps) {
  return (
    <div className="animate-in fade-in max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <span className="inline-block py-1 px-3 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold tracking-wider mb-4">
          LIVE DEMONSTRATION
        </span>
        <h2 className="text-3xl font-bold text-white mb-4">Logic-Based Application</h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          See how Boolean normal forms power a real-world decision system. Click below to explore the working model.
        </p>
      </div>

      {/* Single featured card */}
      <button
        onClick={() => onEnterApp('loan')}
        className="group w-full bg-slate-800/60 backdrop-blur-sm border border-slate-700 hover:border-teal-500/50 p-8 rounded-2xl hover:bg-slate-800 transition-all duration-300 shadow-xl hover:shadow-teal-900/20 text-left"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0 group-hover:bg-teal-500/20 transition-colors">
            <Scale className="text-teal-400" size={32} />
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-white">Rule-Based System</h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">LIVE MODEL</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Explore a fully functional <strong className="text-slate-200">Loan Eligibility Analyzer</strong> powered by Boolean logic.
              Toggle applicant conditions, watch the decision update in real time, and verify the equivalence of the original rule with its PDNF and PCNF representations.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {['Loan = (A∧B∧C) ∨ (A∧B∧D)', '4 Variables', '16-Row Truth Table', 'PDNF & PCNF', 'Verification'].map(tag => (
                <span key={tag} className="px-2 py-1 bg-slate-700/60 text-slate-300 rounded font-mono">{tag}</span>
              ))}
            </div>
          </div>
          <div className="shrink-0 text-teal-400 group-hover:translate-x-1 transition-transform text-2xl">→</div>
        </div>
      </button>
    </div>
  );
}
