import { useState, useEffect } from 'react';
import { ExpressionInput } from '../components/ExpressionInput';
import { TruthTable } from '../components/TruthTable';
import { NormalFormCard } from '../components/NormalFormCards';
import { VerificationCard } from '../components/VerificationCard';
import { Parser, generateTruthTable, generateNormalForms, verifyNormalForms } from '../logic';
import type { TruthTableRow, NormalFormResult, VerificationResult } from '../logic';

export function Analyzer() {
  const [expression, setExpression] = useState('A XOR B');
  const [error, setError] = useState<string | null>(null);
  
  const [variables, setVariables] = useState<string[]>([]);
  const [rows, setRows] = useState<TruthTableRow[]>([]);
  const [normalForms, setNormalForms] = useState<NormalFormResult | null>(null);
  const [verification, setVerification] = useState<VerificationResult | null>(null);

  const analyze = (expr: string) => {
    setError(null);
    setExpression(expr);
    try {
      // 1. Parse
      const parser = new Parser(expr);
      const ast = parser.parse();
      
      // 2. Truth Table
      const { variables: extractedVars, rows: extractedRows } = generateTruthTable(ast);
      setVariables(extractedVars);
      setRows(extractedRows);

      // 3. Normal Forms
      const forms = generateNormalForms(extractedVars, extractedRows);
      setNormalForms(forms);

      // 4. Verify
      const vResult = verifyNormalForms(forms.pdnf, forms.pcnf, extractedRows, extractedVars);
      setVerification(vResult);
    } catch (e) {
      setError((e as Error).message);
      setVariables([]);
      setRows([]);
      setNormalForms(null);
      setVerification(null);
    }
  };

  // Run once on load
  useEffect(() => {
    analyze(expression);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      <section className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block py-1 px-3 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold tracking-wider mb-4">
          INTERACTIVE MATHEMATICAL ANALYZER
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Transform Logic Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Canonical Form</span>
        </h2>
        <p className="text-slate-400 text-lg">
          Enter a Boolean expression and explore its truth table, minterms, maxterms, PDNF, PCNF, and logical equivalence.
        </p>
      </section>

      <section className="max-w-4xl mx-auto">
        <ExpressionInput 
          initialValue={expression} 
          onAnalyze={analyze} 
          error={error} 
        />
      </section>

      {rows.length > 0 && normalForms && (
        <section className="space-y-12">
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Truth Table */}
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <TruthTable variables={variables} rows={rows} />
              </div>
            </div>
            
            {/* Right Column: Normal Forms */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                <NormalFormCard
                  title="Principal Disjunctive Normal Form"
                  type="PDNF"
                  expression={normalForms.pdnf}
                  terms={normalForms.minterms}
                  description="PDNF is the OR of all minterms corresponding to truth-table rows where the function evaluates to 1."
                />
                
                <NormalFormCard
                  title="Principal Conjunctive Normal Form"
                  type="PCNF"
                  expression={normalForms.pcnf}
                  terms={normalForms.maxterms}
                  description="PCNF is the AND of all maxterms corresponding to truth-table rows where the function evaluates to 0."
                />
              </div>

              <VerificationCard result={verification} />

            </div>
          </div>
          
        </section>
      )}

    </div>
  );
}
