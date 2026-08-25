import { Beaker, BookOpen, Layers, Info } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

export function Header({ currentTab, setTab }: HeaderProps) {
  const tabs = [
    { id: 'analyzer', label: 'Analyzer', icon: <Beaker size={18} className="mr-2" /> },
    { id: 'concepts', label: 'Concepts', icon: <BookOpen size={18} className="mr-2" /> },
    { id: 'applications', label: 'Applications', icon: <Layers size={18} className="mr-2" /> },
    { id: 'about', label: 'About', icon: <Info size={18} className="mr-2" /> },
  ];

  return (
    <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setTab('analyzer')}>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 mr-3 border border-teal-500/30">
              <Beaker size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-none">LogicForm Lab</h1>
              <span className="text-xs text-teal-400 font-medium tracking-wide">PCNF & PDNF Analyzer</span>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  currentTab === tab.id
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
          
          <div className="hidden lg:flex flex-col items-end text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Discrete Mathematics</span>
            <span>Capstone 2026</span>
          </div>
        </div>
      </div>
    </header>
  );
}
