import React from 'react';
import { presentationNotes } from '../data/notes';

interface PresenterPanelProps {
  currentPage: string;
  nextPage: string | null;
}

export default function PresenterPanel({ currentPage, nextPage }: PresenterPanelProps) {
  const notes = presentationNotes[currentPage] || ["当前页无备注。"];

  return (
    <div className="w-full bg-[#1e293b]/95 backdrop-blur-xl text-slate-300 rounded-[1.5rem] p-4 lg:py-5 lg:px-8 flex items-center shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] border border-slate-700/50 overflow-x-auto hide-scrollbar">
      <div className="flex items-center whitespace-nowrap min-w-max gap-8 px-2">
        {notes.map((note, idx) => (
          <span key={idx} className="text-lg xl:text-xl text-slate-100 font-medium">
            {note}
          </span>
        ))}
      </div>
    </div>
  );
}
