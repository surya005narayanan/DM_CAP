import React from 'react';
import type { Term } from '../logic';
import { Copy, Check } from 'lucide-react';

interface NormalFormCardProps {
  title: string;
  type: 'PDNF' | 'PCNF';
  expression: string;
  terms: Term[];
  description: string;
}

export function NormalFormCard({ title, type, expression, terms, description }: NormalFormCardProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(expression);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isPDNF = type === 'PDNF';
  const termName = isPDNF ? 'Minterms' : 'Maxterms';
  const termSymbol = isPDNF ? 'm' : 'M';
  const baseCondition = isPDNF ? 'TRUE (1)' : 'FALSE (0)';
  
  const themeColors = isPDNF 
    ? 'border-teal-500/30 bg-teal-950/10 shadow-teal-900/10' 
    : 'border-blue-500/30 bg-blue-950/10 shadow-blue-900/10';
    
  const accentColor = isPDNF ? 'text-teal-400' : 'text-blue-400';

  return (
    <div className={`rounded-2xl border ${themeColors} overflow-hidden shadow-xl flex flex-col h-full backdrop-blur-sm`}>
      <div className={`p-4 border-b ${isPDNF ? 'border-teal-500/20 bg-teal-900/20' : 'border-blue-500/20 bg-blue-900/20'} flex justify-between items-center`}>
        <h3 className="font-semibold text-white tracking-wide">{title}</h3>
        <span className={`text-xs font-bold px-2 py-1 rounded bg-black/20 ${accentColor}`}>
          {type}
        </span>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="relative group mb-6">
          <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-5 font-mono text-lg text-white break-all shadow-inner relative">
            {expression}
          </div>
          <button 
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            title="Copy Expression"
          >
            {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
            <span className="text-xs text-slate-400 block mb-1">Built from</span>
            <span className={`text-sm font-medium ${accentColor}`}>{baseCondition} rows</span>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
            <span className="text-xs text-slate-400 block mb-1">{termName}</span>
            <span className="text-sm font-medium text-slate-200">
              {terms.length > 0 
                ? terms.map(() => `${termSymbol}₁`).join(', ').replace(/₁/g, (_, offset, str) => {
                  // Hacky but simple sub-scripting for display
                  const idx = terms[str.substring(0, offset).split(',').length - 1].index;
                  return String(idx).split('').map(d => '₀₁₂₃₄₅₆₇₈₉'[parseInt(d)]).join('');
                }) 
                : 'None'}
            </span>
          </div>
        </div>

        {terms.length > 0 && (
          <div className="mb-6 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
            <table className="w-full text-left text-sm">
              <tbody>
                {terms.map(t => (
                  <tr key={t.index} className="border-b border-slate-700/30 last:border-0">
                    <td className="py-1.5 text-slate-400 w-12 font-mono">
                      {termSymbol}<sub>{t.index}</sub>
                    </td>
                    <td className="py-1.5 text-slate-300 font-mono">
                      {t.expression.replace(/[()]/g, '')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-slate-700/50">
          <p className="text-xs text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
