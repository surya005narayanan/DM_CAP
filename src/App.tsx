import { useState } from 'react';
import { Header } from './components/Header';
import { Analyzer } from './pages/Analyzer';
import { Concepts } from './pages/Concepts';
import { Applications } from './pages/Applications';
import { About } from './pages/About';
import { LoanEligibilitySystem } from './pages/LoanEligibilitySystem';

function App() {
  const [currentTab, setCurrentTab] = useState('analyzer');
  const [activeApp, setActiveApp] = useState<string | null>(null);

  function setTab(tab: string) {
    setCurrentTab(tab);
    setActiveApp(null);
  }

  function handleEnterApp(app: string) {
    setActiveApp(app);
  }

  function handleBackFromApp() {
    setActiveApp(null);
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-teal-500/30">
      <Header currentTab={currentTab} setTab={setTab} />

      <main className="pb-24">
        {activeApp === 'loan' ? (
          <LoanEligibilitySystem onBack={handleBackFromApp} />
        ) : (
          <>
            {currentTab === 'analyzer' && <Analyzer />}
            {currentTab === 'concepts' && <Concepts />}
            {currentTab === 'applications' && <Applications onEnterApp={handleEnterApp} />}
            {currentTab === 'about' && <About />}
          </>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 opacity-80" />
    </div>
  );
}

export default App;
