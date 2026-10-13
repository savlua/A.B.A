import React from 'react';

export interface ToastMessage {
  id: string;
  text: string;
  icon?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto px-4 py-3 rounded-2xl bg-[#2c3040] text-white shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-medium border border-[#b8c3ff]/20 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <span className="material-symbols-outlined text-[18px] text-[#b8c3ff]">
            {toast.icon || 'info'}
          </span>
          <span>{toast.text}</span>
        </div>
      ))}
    </div>
  );
};
