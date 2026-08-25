import React from 'react';
import { Cpu, Scale, Brain, Search, GitMerge, FileCode } from 'lucide-react';

export function Applications() {
  const apps = [
    {
      title: "Digital Circuit Design",
      icon: <Cpu className="text-teal-400 mb-4" size={32} />,
      desc: "Normal forms directly map to two-level logic gates (AND-OR for PDNF, OR-AND for PCNF), allowing engineers to design efficient integrated circuits."
    },
    {
      title: "Rule-Based Systems",
      icon: <Scale className="text-blue-400 mb-4" size={32} />,
      desc: "In expert systems, normal forms standardize complex business or legal rules, ensuring no conflicting cases exist."
    },
    {
      title: "Automated Reasoning",
      icon: <Brain className="text-purple-400 mb-4" size={32} />,
      desc: "AI relies on normal forms to simplify knowledge bases, allowing for faster logical deduction and inference."
    },
    {
      title: "SAT / Constraint Solving",
      icon: <Search className="text-pink-400 mb-4" size={32} />,
      desc: "Conjunctive Normal Form (CNF) is the standard input format for SAT solvers, determining if a solution exists for a set of constraints."
    },
    {
      title: "Decision Systems",
      icon: <GitMerge className="text-orange-400 mb-4" size={32} />,
      desc: "Decision trees can be converted to PDNF to identify the exact paths that lead to a positive classification."
    },
    {
      title: "Software Verification",
      icon: <FileCode className="text-emerald-400 mb-4" size={32} />,
      desc: "Program states can be modeled logically. PCNF helps prove that error states (F=0) are correctly handled."
    }
  ];

  return (
    <div className="animate-in fade-in max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Applications in Logic-Based Systems</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          PCNF and PDNF are not merely theoretical representations — they provide structured ways to analyze, simplify, and process logical decision rules in real-world systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl hover:bg-slate-800 transition-colors">
            {app.icon}
            <h3 className="text-xl font-bold text-white mb-2">{app.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{app.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
