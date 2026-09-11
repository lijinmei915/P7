import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, MonitorPlay } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import CoverPage from './pages/CoverPage';
import ResumePage from './pages/ResumePage';
import AmbientBackground from './components/AmbientBackground';
import DirectoryPage from './pages/DirectoryPage';
import ChapterPage from './pages/ChapterPage';
import InsightPage1 from './pages/InsightPage1';
import InsightPage2 from './pages/InsightPage2';
import SurveyPage from './pages/SurveyPage';
import SignalDecayPage from './pages/SignalDecayPage';
import PersonaPage from './pages/PersonaPage';
import ChapterPage2 from './pages/ChapterPage2';
import ChapterPage3 from './pages/ChapterPage3';
import EndingPage from './pages/EndingPage';
import TaskDecisionPage from './pages/TaskDecisionPage';
import SalesRepDayPage from './pages/SalesRepDayPage';
import OperatorStudyPage from './pages/OperatorStudyPage';
import UserJourneyPage from './pages/UserJourneyPage';
import PresenterPanel from './components/PresenterPanel';
import PresenterTimer from './components/PresenterTimer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'cover' | 'resume' | 'directory' | 'chapter' | 'insight1' | 'insight2' | 'persona' | 'survey' | 'signal' | 'taskDecision' | 'directory2' | 'chapter2' | 'directory3' | 'chapter3' | 'ending'>('directory');
  const [isPresenterMode, setIsPresenterMode] = useState(false);

  
  

  
  const pages: Array<'cover' | 'resume' | 'directory' | 'chapter' | 'insight1' | 'insight2' | 'persona' | 'survey' | 'signal' | 'taskDecision' | 'operatorStudy' | 'userJourney' | 'directory2' | 'chapter2' | 'directory3' | 'chapter3' | 'ending'> = ['cover', 'resume', 'directory', 'chapter', 'insight1', 'insight2', 'persona', 'survey', 'signal', 'taskDecision', 'operatorStudy', 'userJourney', 'directory2', 'chapter2', 'directory3', 'chapter3', 'ending'];
  const currentIndex = pages.indexOf(currentPage);

  const goNext = useCallback(() => {
    setCurrentPage(prev => {
      const idx = pages.indexOf(prev);
      return idx < pages.length - 1 ? pages[idx + 1] : prev;
    });
  }, [pages]);

  const goPrev = useCallback(() => {
    setCurrentPage(prev => {
      const idx = pages.indexOf(prev);
      return idx > 2 ? pages[idx - 1] : prev; // Temporarily hide 01-02
    });
  }, [pages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'p' || e.key === 'P') setIsPresenterMode(prev => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  return (
    <div className="min-h-screen bg-[#E5E9F0] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 font-sans selection:bg-[#1853FF] selection:text-white relative overflow-y-auto overflow-x-hidden">
      
      {/* Floating Timer */}
      <AnimatePresence>
        {isPresenterMode && <PresenterTimer />}
      </AnimatePresence>
      
      {/* Main Layout Container */}
      <div className={`flex flex-col w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isPresenterMode ? 'gap-3 lg:gap-4' : 'gap-6 lg:gap-8'} max-w-[1280px] xl:max-w-[1440px] items-center`}>
        
        {/* Main Canvas (PPT 16:9 Aspect Ratio) */}
        <div className={`relative flex flex-col w-full shrink-0 shadow-[20px_30px_80px_-20px_rgba(0,0,0,0.12)] rounded-[2rem] lg:rounded-[3rem] border-[1.5px] border-white overflow-hidden bg-[#F4F6FB] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`} style={{ aspectRatio: '16/9' }}>
          <AmbientBackground />
          <AnimatePresence mode="wait">
            {currentPage === 'cover' && (
              <CoverPage />
            )}
            {currentPage === 'resume' && (
              <ResumePage />
            )}
            {currentPage === 'directory' && (
              <DirectoryPage onNavigate={(id) => setCurrentPage(id === '02' ? 'chapter2' : 'chapter')} />
            )}
            {currentPage === 'chapter' && (
              <ChapterPage />
            )}
            {currentPage === 'insight1' && (
              <InsightPage1 onBack={() => setCurrentPage("chapter")} />
            )}
            {currentPage === 'insight2' && (
              <InsightPage2 onBack={() => setCurrentPage('insight1')} />
            )}
            {currentPage === 'survey' && (
              <SurveyPage onBack={() => setCurrentPage('insight2')} />
            )}
            {currentPage === 'persona' && (
              <PersonaPage onBack={() => setCurrentPage('survey')} />
            )}
            {currentPage === 'signal' && (
              <SignalDecayPage onBack={() => setCurrentPage('persona')} />
            )}
            {currentPage === 'taskDecision' && (
              <TaskDecisionPage onBack={() => setCurrentPage('signal')} />
            )}
            {currentPage === 'operatorStudy' && (
              <OperatorStudyPage onBack={() => setCurrentPage('taskDecision')} />
            )}
            {currentPage === 'userJourney' && (
              <UserJourneyPage onBack={() => setCurrentPage('operatorStudy')} />
            )}
            {currentPage === 'directory2' && (
              <DirectoryPage activeId="02" onNavigate={(id) => setCurrentPage(id === '01' ? 'chapter' : id === '02' ? 'chapter2' : 'chapter3')} />
            )}
            {currentPage === 'chapter2' && (
              <ChapterPage2 />
            )}
            {currentPage === 'directory3' && (
              <DirectoryPage activeId="03" onNavigate={(id) => setCurrentPage(id === '01' ? 'chapter' : id === '02' ? 'chapter2' : 'chapter3')} />
            )}
            {currentPage === 'chapter3' && (
              <ChapterPage3 />
            )}
            {currentPage === 'ending' && (
              <EndingPage />
            )}
          </AnimatePresence>
        </div>

        {/* Presenter Panel Container (Below Canvas) */}
        <div className={`relative flex flex-col w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden rounded-[2rem] lg:rounded-[3rem] ${isPresenterMode ? 'max-h-[800px] opacity-100 translate-y-0 mt-0' : 'max-h-0 opacity-0 -translate-y-10 mt-0'}`}>
          <div className="w-full">
            <PresenterPanel 
              currentPage={currentPage} 
              nextPage={currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null} 
            />
          </div>
        </div>

      </div>

      {/* Floating Page Switcher */}
      <div className="mt-6 lg:mt-8 bg-white/60 backdrop-blur-xl px-2 py-1.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white flex items-center gap-3 z-50 shrink-0 transition-all duration-500 hover:bg-white/80 hover:shadow-lg">
        <button
          onClick={goPrev}
          disabled={currentIndex === 2}
          className="p-1.5 rounded-full text-gray-500 hover:text-gray-900 hover:bg-white/50 transition-all disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={3} />
        </button>
        
        <div className="flex items-center gap-1.5 font-mono text-[13px] tracking-widest">
          <span className="font-bold text-slate-800">
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <span className="text-gray-400 font-medium">/</span>
          <span className="text-gray-400 font-medium">15</span>
        </div>
        
        <button
          onClick={goNext}
          disabled={currentIndex === pages.length - 1}
          className="p-1.5 rounded-full text-gray-500 hover:text-gray-900 hover:bg-white/50 transition-all disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronRight className="w-4 h-4" strokeWidth={3} />
        </button>
        
        <div className="w-[1px] h-4 bg-slate-300 mx-1"></div>
        
        <button 
          onClick={() => setIsPresenterMode(!isPresenterMode)}
          className={`p-1.5 rounded-full transition-all ${isPresenterMode ? 'bg-[#1853FF] text-white shadow-md' : 'text-slate-400 hover:text-[#1853FF] hover:bg-[#1853FF]/10'}`}
          title="排练模式 (快捷键 P)"
        >
          <MonitorPlay className="w-4 h-4" strokeWidth={isPresenterMode ? 2.5 : 2} />
        </button>
      </div>
    </div>
  );
}
