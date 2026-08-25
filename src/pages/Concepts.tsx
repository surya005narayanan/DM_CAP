
export function Concepts() {
  return (
    <div className="animate-in fade-in max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-8">Concepts & Theory</h2>
      <div className="space-y-8">
        <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h3 className="text-xl font-semibold text-teal-400 mb-3">What is a Truth Table?</h3>
          <p className="text-slate-300">A truth table is a mathematical table used in logic to determine whether a compound statement is true or false for all possible assignments of truth values to its variables.</p>
        </section>
        
        <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h3 className="text-xl font-semibold text-teal-400 mb-3">Minterms and Maxterms</h3>
          <p className="text-slate-300 mb-2"><strong className="text-white">Minterm:</strong> A product (AND) of all variables in the function, each appearing exactly once (either complemented or uncomplemented). Associated with rows where the function evaluates to 1.</p>
          <p className="text-slate-300"><strong className="text-white">Maxterm:</strong> A sum (OR) of all variables in the function, each appearing exactly once. Associated with rows where the function evaluates to 0.</p>
        </section>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-teal-950/20 p-6 rounded-xl border border-teal-500/30">
            <h3 className="text-xl font-semibold text-teal-400 mb-3">PDNF</h3>
            <p className="text-slate-300 mb-3">Principal Disjunctive Normal Form is the sum (OR) of minterms.</p>
            <div className="font-mono text-sm text-teal-300 bg-black/30 p-3 rounded">F = m₁ ∨ m₂ ∨ m₄</div>
          </section>
          
          <section className="bg-blue-950/20 p-6 rounded-xl border border-blue-500/30">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">PCNF</h3>
            <p className="text-slate-300 mb-3">Principal Conjunctive Normal Form is the product (AND) of maxterms.</p>
            <div className="font-mono text-sm text-blue-300 bg-black/30 p-3 rounded">F = M₀ ∧ M₃ ∧ M₅</div>
          </section>
        </div>
      </div>
    </div>
  );
}
