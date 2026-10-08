import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 md:bottom-8 right-6 z-50 flex items-center gap-3 bg-[#181818]/95 backdrop-blur-md border border-white/20 border-l-4 border-l-[#E50914] text-white px-5 py-3 rounded-md shadow-2xl shadow-black animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      <span className="text-[#E50914] font-black text-sm">▶</span>
      <p className="text-sm font-semibold tracking-wide">{message}</p>
    </div>
  );
};
