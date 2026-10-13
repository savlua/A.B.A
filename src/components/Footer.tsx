import React from 'react';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenGuide?: () => void;
  onOpenSupport?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenGuide,
  onOpenSupport
}) => {
  return (
    <footer className="w-full bg-[#f3f2ff] border-t border-[#dee1f7]/60 mt-16 shadow-[0_-1px_12px_rgba(99,74,191,0.04)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#dee1f7]/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#e7deff] flex items-center justify-center text-[#634abf] shadow-xs">
              <span className="material-symbols-outlined text-[20px]">psychology</span>
            </div>
            <div>
              <p className="font-heading font-bold text-base text-[#171b2a]">A.B.A · Aprende y Crece</p>
              <p className="text-xs text-[#444653]">
                Entorno lúdico y estructurado para el desarrollo neurocognitivo infantil.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1 rounded-full bg-[#ebedff] text-[#3652c2] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              Validación Clínica ABA
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-[#ebedff] text-[#634abf] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">shield</span>
              Protección COPPA
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#444653]">
          <p>© 2025 Plataforma Neuroeducativa A.B.A · Todos los derechos reservados.</p>
          <div className="flex items-center gap-6 font-semibold">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-[#3652c2] transition-colors cursor-pointer"
            >
              Privacidad Sensorial
            </button>
            <button
              onClick={onOpenGuide}
              className="hover:text-[#3652c2] transition-colors cursor-pointer"
            >
              Guía para Familias
            </button>
            <button
              onClick={onOpenSupport}
              className="hover:text-[#3652c2] transition-colors cursor-pointer"
            >
              Soporte Terapéutico
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
