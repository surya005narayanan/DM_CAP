import { useState, useEffect } from 'react';
import { Play, X, Zap } from 'lucide-react';

interface ExpressionInputProps {
  initialValue: string;
  onAnalyze: (expression: string) => void;
  error: string | null;
}

export function ExpressionInput({ initialValue, onAnalyze, error }: ExpressionInputProps) {
  const [value, setValue] = useState(initialValue);

  // Sync initialValue change
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const examples = [
    'A XOR B',
    'A AND B',
    '(A OR B) AND NOT C',
    '(A AND B) OR (NOT A AND C)'
  ];

  const handleAnalyze = () => {
    if (value.trim()) {
      onAnalyze(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnalyze();
    }
  };

  return (
    <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-700/60 p-6 shadow-xl shadow-slate-900/20">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Zap className="mr-2 text-teal-400" size={20} />
        Enter Boolean Expression
      </h2>
      
      <div className="relative mb-4">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. (A AND B) OR C"
          className={`w-full bg-slate-900/80 border ${error ? 'border-red-500/50 focus:border-red-500' : 'border-slate-700 focus:border-teal-500'} rounded-xl py-4 px-5 text-white font-mono text-lg outline-none transition-colors duration-200 shadow-inner`}
        />
        {value && (
          <button 
            onClick={() => setValue('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 text-red-400 text-sm font-medium bg-red-950/30 border border-red-900/50 p-3 rounded-lg flex items-start">
          <span className="mr-2">⚠️</span>
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <button
          onClick={handleAnalyze}
          disabled={!value.trim()}
          className="flex items-center justify-center bg-teal-600 hover:bg-teal-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-200 w-full sm:w-auto shadow-lg shadow-teal-900/20 active:scale-95"
        >
          <Play size={18} className="mr-2" />
          Analyze Expression
        </button>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-slate-500 flex items-center mr-1">Examples:</span>
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => { setValue(ex); onAnalyze(ex); }}
              className="text-xs bg-slate-700/50 hover:bg-slate-600 text-slate-300 py-1.5 px-3 rounded-md transition-colors border border-slate-600/50"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
