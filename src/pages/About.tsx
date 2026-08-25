import { GraduationCap, Users } from 'lucide-react';

export function About() {
  return (
    <div className="animate-in fade-in max-w-4xl mx-auto px-4 py-12">
      <div className="bg-slate-800/60 backdrop-blur-md rounded-3xl border border-slate-700/60 p-8 md:p-12 shadow-2xl">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-20 h-20 bg-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400 mb-6 border border-teal-500/30">
            <GraduationCap size={40} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">LogicForm Lab</h2>
          <p className="text-xl text-teal-400 font-medium mb-6">
            Role of Normal Forms (PCNF and PDNF) in Logic-Based Systems
          </p>
          <p className="text-slate-400 max-w-2xl">
            An interactive implementation developed as part of the Discrete Mathematics Capstone Project. This application serves as the practical demonstration component, proving how abstract propositional logic translates into computable algorithms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-700/50 pt-8 mt-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Users className="mr-2 text-blue-400" size={20} />
              Team Members
            </h3>
            <ul className="space-y-3">
              {['Student 1', 'Student 2', 'Student 3', 'Student 4', 'Student 5'].map((name, i) => (
                <li key={i} className="flex items-center text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-700/30">
                  <span className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 mr-3">
                    {i + 1}
                  </span>
                  {name}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Institution</h3>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/30 space-y-4">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Department</p>
                <p className="text-slate-300 font-medium">Department of Mathematics</p>
                <p className="text-slate-300 font-medium">Computer Science and Engineering</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">University</p>
                <p className="text-slate-300 font-medium">SIMATS Engineering</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Year</p>
                <p className="text-slate-300 font-medium">2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
