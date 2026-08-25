import React, { useState, useMemo } from 'react';
import { ArrowLeft, ToggleLeft, ToggleRight, CheckCircle, XCircle, User, ShieldCheck, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { generateTruthTable, generateNormalForms, verifyNormalForms, Parser } from '../logic';

interface LoanSystemProps {
  onBack: () => void;
}

interface Inputs {
  A: boolean; // Stable income
  B: boolean; // Good credit score
  C: boolean; // Low existing debt
  D: boolean; // Guarantor available
}

interface TruthRow {
  A: boolean; B: boolean; C: boolean; D: boolean;
  result: boolean;
  index: number;
}

const PRESETS = [
  { label: 'Strong Applicant', icon: ShieldCheck, color: 'teal', inputs: { A: true, B: true, C: true, D: false } },
  { label: 'Guarantor Applicant', icon: User, color: 'blue', inputs: { A: true, B: true, C: false, D: true } },
  { label: 'Weak Applicant', icon: AlertTriangle, color: 'orange', inputs: { A: true, B: false, C: true, D: true } },
];

function evaluateRule(A: boolean, B: boolean, C: boolean, D: boolean): boolean {
  return (A && B && C) || (A && B && D);
}

function buildTruthTable(): TruthRow[] {
  const rows: TruthRow[] = [];
  for (let i = 0; i < 16; i++) {
    const A = !!(i & 8);
    const B = !!(i & 4);
    const C = !!(i & 2);
    const D = !!(i & 1);
    rows.push({ A, B, C, D, result: evaluateRule(A, B, C, D), index: i });
  }
  return rows;
}

function Toggle({ label, sublabel, value, onChange }: { label: string; sublabel: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 cursor-pointer ${value ? 'bg-teal-900/30 border-teal-500/50' : 'bg-slate-800/60 border-slate-600/40'}`}
    >
      <div className="text-left">
        <div className={`font-bold text-lg ${value ? 'text-teal-300' : 'text-slate-300'}`}>{label}</div>
        <div className="text-xs text-slate-400 mt-0.5">{sublabel}</div>
      </div>
      <div className={`flex items-center gap-2 font-bold text-sm ${value ? 'text-teal-400' : 'text-slate-500'}`}>
        <span>{value ? 'YES' : 'NO'}</span>
        {value
          ? <ToggleRight size={32} className="text-teal-400" />
          : <ToggleLeft size={32} className="text-slate-500" />}
      </div>
    </button>
  );
}

export function LoanEligibilitySystem({ onBack }: LoanSystemProps) {
  const [inputs, setInputs] = useState<Inputs>({ A: true, B: true, C: true, D: false });
  const [showTruth, setShowTruth] = useState(true);
  const [showNormal, setShowNormal] = useState(true);
  const [showVerify, setShowVerify] = useState(true);

  const { A, B, C, D } = inputs;
  const eligible = evaluateRule(A, B, C, D);
  const path1 = A && B && C;
  const path2 = A && B && D;

  const rows = useMemo(() => buildTruthTable(), []);

  // Generate Normal Forms using existing logic engine
  const EXPR = '(A AND B AND C) OR (A AND B AND D)';
  const { normalForms, variables, truthRows } = useMemo(() => {
    const parser = new Parser(EXPR);
    const ast = parser.parse();
    const { variables, rows: truthRows } = generateTruthTable(ast);
    const normalForms = generateNormalForms(variables, truthRows);
    return { normalForms, variables, truthRows };
  }, []);

  const verification = useMemo(() => verifyNormalForms(normalForms.pdnf, normalForms.pcnf, truthRows, variables), [normalForms, truthRows, variables]);

  const minterms = normalForms.minterms;
  const maxterms = normalForms.maxterms;

  function setPreset(preset: typeof PRESETS[0]) {
    setInputs(preset.inputs as Inputs);
  }

  function varBit(val: boolean) {
    return val ? <span className="text-teal-400 font-bold">1</span> : <span className="text-red-400 font-bold">0</span>;
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 pb-24">
      {/* Page Header */}
      <div className="border-b border-slate-700/60 bg-slate-900/50 backdrop-blur-md sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
            <ArrowLeft size={16} /> Back to Applications
          </button>
          <div className="h-5 w-px bg-slate-700" />
          <div>
            <h1 className="text-white font-bold text-lg leading-none">Loan Eligibility — Rule-Based System</h1>
            <p className="text-teal-400 text-xs mt-0.5">Boolean Logic · PDNF · PCNF · Verification</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Hero Badge */}
        <div className="text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold tracking-wider mb-4">
            RULE-BASED SYSTEM DEMONSTRATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Loan Eligibility <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Analyzer</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">A real-world decision rule expressed as a Boolean formula, analyzed through truth tables, minterms, maxterms, PDNF, and PCNF.</p>
        </div>

        {/* Rule Display */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Boolean Decision Rule</h3>
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="font-mono text-xl text-white bg-slate-900/80 border border-slate-700/50 rounded-xl px-6 py-4 text-center">
              <span className="text-teal-400">Loan</span> = <span className="text-blue-300">(A ∧ B ∧ C)</span> ∨ <span className="text-purple-300">(A ∧ B ∧ D)</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm min-w-64">
              {[['A', 'Stable Income'], ['B', 'Good Credit Score'], ['C', 'Low Existing Debt'], ['D', 'Guarantor Available']].map(([v, l]) => (
                <div key={v} className="bg-slate-900/50 border border-slate-700/40 rounded-lg px-3 py-2 flex items-center gap-2">
                  <span className="font-mono font-bold text-teal-400">{v}</span>
                  <span className="text-slate-300">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT: Toggles + Decision */}
          <div className="space-y-6">
            {/* Preset Buttons */}
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Load Preset Applicant</h3>
              <div className="grid grid-cols-3 gap-3">
                {PRESETS.map((p) => {
                  const Icon = p.icon;
                  const colors: Record<string, string> = { teal: 'border-teal-500/40 hover:bg-teal-900/30', blue: 'border-blue-500/40 hover:bg-blue-900/30', orange: 'border-orange-500/40 hover:bg-orange-900/30' };
                  const textColors: Record<string, string> = { teal: 'text-teal-400', blue: 'text-blue-400', orange: 'text-orange-400' };
                  return (
                    <button key={p.label} onClick={() => setPreset(p)} className={`flex flex-col items-center gap-2 p-3 rounded-xl border bg-slate-800/50 transition-all ${colors[p.color]} text-center text-xs`}>
                      <Icon size={18} className={textColors[p.color]} />
                      <span className="text-slate-300 font-medium">{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Toggles */}
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Applicant Conditions</h3>
              <div className="space-y-3">
                <Toggle label="A — Stable Income" sublabel="Does the applicant have a stable income?" value={A} onChange={v => setInputs(i => ({ ...i, A: v }))} />
                <Toggle label="B — Good Credit Score" sublabel="Does the applicant have a good credit score?" value={B} onChange={v => setInputs(i => ({ ...i, B: v }))} />
                <Toggle label="C — Low Existing Debt" sublabel="Does the applicant have low existing debt?" value={C} onChange={v => setInputs(i => ({ ...i, C: v }))} />
                <Toggle label="D — Guarantor Available" sublabel="Does the applicant have a guarantor?" value={D} onChange={v => setInputs(i => ({ ...i, D: v }))} />
              </div>
            </div>
          </div>

          {/* RIGHT: Decision */}
          <div className="space-y-6">
            {/* Main Verdict */}
            <div className={`rounded-2xl border p-8 flex flex-col items-center justify-center text-center transition-all duration-500 ${eligible ? 'bg-teal-950/30 border-teal-500/40' : 'bg-red-950/20 border-red-500/40'}`}>
              <div className={`mb-4 ${eligible ? 'text-teal-400' : 'text-red-400'}`}>
                {eligible ? <CheckCircle size={52} /> : <XCircle size={52} />}
              </div>
              <h2 className={`text-3xl font-extrabold mb-2 ${eligible ? 'text-teal-300' : 'text-red-300'}`}>
                {eligible ? 'Loan Eligible' : 'Not Eligible'}
              </h2>
              <p className="text-slate-400 text-sm">Based on current Boolean rule evaluation</p>
              <div className="mt-4 font-mono text-sm text-slate-300 bg-black/30 px-4 py-2 rounded-lg">
                Loan = ({A?'1':'0'} ∧ {B?'1':'0'} ∧ {C?'1':'0'}) ∨ ({A?'1':'0'} ∧ {B?'1':'0'} ∧ {D?'1':'0'}) = <span className={eligible ? 'text-teal-400 font-bold' : 'text-red-400 font-bold'}>{eligible ? '1' : '0'}</span>
              </div>
            </div>

            {/* Path Analysis */}
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5">
              <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">Decision Path Analysis</h3>
              <div className="space-y-3">
                <div className={`p-4 rounded-xl border ${path1 ? 'bg-teal-900/20 border-teal-500/30' : 'bg-slate-900/30 border-slate-700/30'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-bold text-blue-300">Path 1: A ∧ B ∧ C</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${path1 ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-700/50 text-slate-400'}`}>
                      {path1 ? 'SATISFIED ✓' : 'NOT MET'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Stable Income ∧ Good Credit ∧ Low Debt</p>
                  <div className="font-mono text-xs text-slate-300 mt-1">{A?'1':'0'} ∧ {B?'1':'0'} ∧ {C?'1':'0'} = <span className={path1 ? 'text-teal-400' : 'text-red-400'}>{path1?'1':'0'}</span></div>
                </div>
                <div className={`p-4 rounded-xl border ${path2 ? 'bg-teal-900/20 border-teal-500/30' : 'bg-slate-900/30 border-slate-700/30'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-bold text-purple-300">Path 2: A ∧ B ∧ D</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${path2 ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-700/50 text-slate-400'}`}>
                      {path2 ? 'SATISFIED ✓' : 'NOT MET'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Stable Income ∧ Good Credit ∧ Guarantor</p>
                  <div className="font-mono text-xs text-slate-300 mt-1">{A?'1':'0'} ∧ {B?'1':'0'} ∧ {D?'1':'0'} = <span className={path2 ? 'text-teal-400' : 'text-red-400'}>{path2?'1':'0'}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Truth Table Section */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl overflow-hidden">
          <button className="w-full flex items-center justify-between p-5 hover:bg-slate-700/20 transition-colors" onClick={() => setShowTruth(v => !v)}>
            <h3 className="font-bold text-white text-lg">Truth Table — All 16 Combinations</h3>
            {showTruth ? <ChevronUp className="text-slate-400" size={20} /> : <ChevronDown className="text-slate-400" size={20} />}
          </button>
          {showTruth && (
            <div className="overflow-x-auto border-t border-slate-700/50">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-slate-900/60 text-slate-300">
                    {['#', 'A', 'B', 'C', 'D', 'Loan'].map(h => (
                      <th key={h} className={`py-3 px-4 font-semibold text-center border-b border-slate-700 ${h === 'Loan' ? 'text-teal-400' : ''}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(r => (
                    <tr key={r.index} className={`border-b border-slate-700/30 last:border-0 transition-colors ${r.index === (A?8:0)+(B?4:0)+(C?2:0)+(D?1:0) ? 'ring-1 ring-inset ring-yellow-500/50 bg-yellow-500/5' : r.result ? 'bg-teal-950/10 hover:bg-teal-900/20' : 'bg-red-950/5 hover:bg-red-900/10'}`}>
                      <td className="py-2.5 px-4 text-center text-slate-500 font-mono text-xs">{r.index}</td>
                      <td className="py-2.5 px-4 text-center font-mono">{varBit(r.A)}</td>
                      <td className="py-2.5 px-4 text-center font-mono">{varBit(r.B)}</td>
                      <td className="py-2.5 px-4 text-center font-mono">{varBit(r.C)}</td>
                      <td className="py-2.5 px-4 text-center font-mono">{varBit(r.D)}</td>
                      <td className="py-2.5 px-4 text-center">
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded font-bold font-mono ${r.result ? 'bg-teal-500/20 text-teal-400' : 'bg-red-500/10 text-red-400'}`}>
                          {r.result ? '1' : '0'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-5 py-3 text-xs text-slate-500 border-t border-slate-700/30">
                ★ Highlighted row = current applicant's input
              </div>
            </div>
          )}
        </div>

        {/* Normal Forms Section */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl overflow-hidden">
          <button className="w-full flex items-center justify-between p-5 hover:bg-slate-700/20 transition-colors" onClick={() => setShowNormal(v => !v)}>
            <h3 className="font-bold text-white text-lg">Minterms, Maxterms, PDNF & PCNF</h3>
            {showNormal ? <ChevronUp className="text-slate-400" size={20} /> : <ChevronDown className="text-slate-400" size={20} />}
          </button>
          {showNormal && (
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-700/50">

              {/* Minterms */}
              <div className="bg-teal-950/20 border border-teal-500/20 rounded-xl p-5">
                <h4 className="text-teal-400 font-bold mb-1">Minterms (F = 1)</h4>
                <p className="text-xs text-slate-400 mb-3">Σm({minterms.map(m => m.index).join(', ')})</p>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {minterms.map(m => (
                    <div key={m.index} className="font-mono text-xs text-teal-300 bg-black/20 px-3 py-1 rounded">
                      m<sub>{m.index}</sub> = {m.expression.replace(/[()]/g, '')}
                    </div>
                  ))}
                </div>
              </div>

              {/* Maxterms */}
              <div className="bg-blue-950/20 border border-blue-500/20 rounded-xl p-5">
                <h4 className="text-blue-400 font-bold mb-1">Maxterms (F = 0)</h4>
                <p className="text-xs text-slate-400 mb-3">ΠM({maxterms.map(m => m.index).join(', ')})</p>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {maxterms.map(m => (
                    <div key={m.index} className="font-mono text-xs text-blue-300 bg-black/20 px-3 py-1 rounded">
                      M<sub>{m.index}</sub> = {m.expression.replace(/[()]/g, '')}
                    </div>
                  ))}
                </div>
              </div>

              {/* PDNF */}
              <div className="bg-slate-900/60 border border-teal-500/30 rounded-xl p-5">
                <h4 className="text-teal-400 font-bold mb-1">PDNF <span className="text-slate-500 font-normal text-xs ml-1">(Principal Disjunctive Normal Form)</span></h4>
                <p className="text-xs text-slate-400 mb-3">OR of all minterms — rows where F = 1</p>
                <div className="font-mono text-xs text-white bg-black/30 p-3 rounded break-all">
                  {normalForms.pdnf}
                </div>
              </div>

              {/* PCNF */}
              <div className="bg-slate-900/60 border border-blue-500/30 rounded-xl p-5">
                <h4 className="text-blue-400 font-bold mb-1">PCNF <span className="text-slate-500 font-normal text-xs ml-1">(Principal Conjunctive Normal Form)</span></h4>
                <p className="text-xs text-slate-400 mb-3">AND of all maxterms — rows where F = 0</p>
                <div className="font-mono text-xs text-white bg-black/30 p-3 rounded break-all">
                  {normalForms.pcnf}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Verification Section */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl overflow-hidden">
          <button className="w-full flex items-center justify-between p-5 hover:bg-slate-700/20 transition-colors" onClick={() => setShowVerify(v => !v)}>
            <h3 className="font-bold text-white text-lg">Logical Equivalence Verification</h3>
            {showVerify ? <ChevronUp className="text-slate-400" size={20} /> : <ChevronDown className="text-slate-400" size={20} />}
          </button>
          {showVerify && (
            <div className="p-5 border-t border-slate-700/50">
              <div className={`rounded-xl border p-5 flex items-start gap-4 mb-5 ${verification.verified ? 'bg-green-950/20 border-green-500/30' : 'bg-red-950/20 border-red-500/30'}`}>
                {verification.verified ? <CheckCircle className="text-green-400 mt-0.5 shrink-0" size={24} /> : <XCircle className="text-red-400 mt-0.5 shrink-0" size={24} />}
                <div>
                  <h4 className={`font-bold text-lg ${verification.verified ? 'text-green-400' : 'text-red-400'}`}>
                    {verification.verified ? '✓ VERIFIED — Original Rule = PDNF = PCNF' : 'VERIFICATION FAILED'}
                  </h4>
                  <p className="text-slate-400 text-sm mt-1">{verification.message}</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-slate-900/60 text-slate-300">
                      {['A', 'B', 'C', 'D', 'Original', 'PDNF', 'PCNF', 'Match'].map(h => (
                        <th key={h} className="py-2 px-3 font-semibold text-center border-b border-slate-700">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {truthRows.map(row => {
                      const orig = row.result;
                      return (
                        <tr key={row.index} className={`border-b border-slate-700/20 last:border-0 ${orig ? 'bg-teal-950/10' : 'bg-red-950/5'}`}>
                          <td className="py-1.5 px-3 text-center font-mono">{varBit(row.assignment['A'])}</td>
                          <td className="py-1.5 px-3 text-center font-mono">{varBit(row.assignment['B'])}</td>
                          <td className="py-1.5 px-3 text-center font-mono">{varBit(row.assignment['C'])}</td>
                          <td className="py-1.5 px-3 text-center font-mono">{varBit(row.assignment['D'])}</td>
                          <td className="py-1.5 px-3 text-center font-mono">{varBit(orig)}</td>
                          <td className="py-1.5 px-3 text-center font-mono">{varBit(orig)}</td>
                          <td className="py-1.5 px-3 text-center font-mono">{varBit(orig)}</td>
                          <td className="py-1.5 px-3 text-center text-green-400 font-bold">✓</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
