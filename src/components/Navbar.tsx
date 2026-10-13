import React from 'react';

export type AppScreen =
  | 'inicio'
  | 'mundo-aventura'
  | 'mision-interactiva'
  | 'cofre-recompensas'
  | 'zona-padres'
  | 'gestion-bd';

interface NavbarProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  sensoryMode: boolean;
  onToggleSensory: () => void;
  activeUser: {
    name: string;
    roleLabel: string;
    alias?: string;
  };
  onSwitchUser: (user: { name: string; roleLabel: string; alias?: string }) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  sensoryMode,
  onToggleSensory,
  activeUser,
  onSwitchUser
}) => {
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#3652c2]/10 shadow-[0_1px_8px_rgba(54,82,194,0.06)]">
      <div className="h-20 max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <button
          onClick={() => onNavigate('inicio')}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#3652c2] to-[#516cdc] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(54,82,194,0.22)] group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">toys</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xl text-[#3652c2] tracking-tight leading-none group-hover:text-[#283e96] transition-colors">
              A.B.A.
            </span>
            <span className="text-[12px] font-semibold text-[#634abf] tracking-wide mt-0.5">
              Aprende y Crece
            </span>
          </div>
        </button>

        {/* Primary Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-[#f3f2ff] px-2 py-1.5 rounded-full shadow-inner border border-[#dee1f7]/50">
          <button
            onClick={() => onNavigate('inicio')}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              currentScreen === 'inicio'
                ? 'bg-[#516cdc] text-white shadow-sm'
                : 'text-[#444653] hover:text-[#171b2a] hover:bg-[#e4e7fd]'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => onNavigate('mundo-aventura')}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              currentScreen === 'mundo-aventura'
                ? 'bg-[#516cdc] text-white shadow-sm'
                : 'text-[#444653] hover:text-[#171b2a] hover:bg-[#e4e7fd]'
            }`}
          >
            Mundo Aventura
          </button>
          <button
            onClick={() => onNavigate('mision-interactiva')}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              currentScreen === 'mision-interactiva'
                ? 'bg-[#516cdc] text-white shadow-sm'
                : 'text-[#444653] hover:text-[#171b2a] hover:bg-[#e4e7fd]'
            }`}
          >
            Misión Interactiva
          </button>
          <button
            onClick={() => onNavigate('cofre-recompensas')}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              currentScreen === 'cofre-recompensas'
                ? 'bg-[#516cdc] text-white shadow-sm'
                : 'text-[#444653] hover:text-[#171b2a] hover:bg-[#e4e7fd]'
            }`}
          >
            Cofre de Recompensas
          </button>
          <button
            onClick={() => onNavigate('zona-padres')}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              currentScreen === 'zona-padres'
                ? 'bg-[#516cdc] text-white shadow-sm'
                : 'text-[#444653] hover:text-[#171b2a] hover:bg-[#e4e7fd]'
            }`}
          >
            Zona de Padres/Tutores
          </button>
          <button
            onClick={() => onNavigate('gestion-bd')}
            className={`relative pl-3.5 pr-2.5 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentScreen === 'gestion-bd'
                ? 'bg-[#3652c2] text-white shadow-md'
                : 'text-[#444653] hover:text-[#171b2a] hover:bg-[#e4e7fd]'
            }`}
          >
            <span>Gestión & Base de Datos</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold leading-tight ${
                currentScreen === 'gestion-bd'
                  ? 'bg-[#e7deff] text-[#340e90]'
                  : 'bg-[#e7deff] text-[#4b2fa6]'
              }`}
            >
              Admin / Profe
            </span>
          </button>
        </nav>

        {/* Right Tools & User Profile */}
        <div className="flex items-center gap-2.5">
          {/* Sensory Accessibility Mode Toggle */}
          <button
            onClick={onToggleSensory}
            title="Activar o desactivar modo de estímulos reducidos para comodidad neurodivergente"
            className={`h-9 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              sensoryMode
                ? 'bg-[#634abf] text-white shadow-sm'
                : 'bg-[#ebedff] text-[#444653] hover:bg-[#dee1f7] hover:text-[#171b2a]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">accessibility_new</span>
            <span className="hidden sm:inline">
              {sensoryMode ? 'Sensorial (Calmo)' : 'Sensorial'}
            </span>
          </button>

          {/* Language indicator */}
          <div className="h-9 px-2.5 rounded-full bg-[#f3f2ff] border border-[#dee1f7]/60 text-[#444653] flex items-center gap-1 text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px] text-[#634abf]">language</span>
            <span className="text-[#171b2a]">ES</span>
          </div>

          {/* User profile dropdown trigger */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-[#ebedff] transition-all cursor-pointer focus:outline-none"
            >
              <div className="hidden md:flex flex-col text-right">
                <span className="text-xs font-bold text-[#171b2a] leading-tight">
                  {activeUser.name}
                </span>
                <span className="text-[11px] font-medium text-[#634abf]">
                  {activeUser.roleLabel}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3652c2] to-[#634abf] text-white flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[18px]">person</span>
              </div>
            </button>

            {/* Profile Menu Popover */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#dee1f7] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="p-2.5 border-b border-[#ebedff]">
                  <div className="text-xs text-[#757685]">Conectado actualmente como:</div>
                  <div className="font-bold text-[#171b2a] text-sm mt-0.5">{activeUser.name}</div>
                  <div className="text-xs text-[#634abf] font-semibold">{activeUser.roleLabel}</div>
                </div>

                <div className="pt-2">
                  <div className="text-[11px] font-bold text-[#757685] px-2 py-1 uppercase tracking-wider">
                    Cambiar Perfil de Prueba
                  </div>

                  <button
                    onClick={() => {
                      onSwitchUser({ name: 'Prof. Mariana R.', roleLabel: 'Especialista ABA · BCBA' });
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-2 rounded-xl text-xs hover:bg-[#f3f2ff] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#3652c2]">psychology</span>
                    <div>
                      <div className="font-semibold text-[#171b2a]">Prof. Mariana R.</div>
                      <div className="text-[11px] text-[#757685]">Docente & Terapeuta ABA</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSwitchUser({ name: 'Lucas Mateo P.', roleLabel: 'Alumno · 6 años', alias: 'Lucas' });
                      setUserMenuOpen(false);
                      onNavigate('mundo-aventura');
                    }}
                    className="w-full text-left px-2.5 py-2 rounded-xl text-xs hover:bg-[#f3f2ff] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#8237b1]">child_care</span>
                    <div>
                      <div className="font-semibold text-[#171b2a]">Lucas Mateo P.</div>
                      <div className="text-[11px] text-[#757685]">Alumno (Modo Aventura)</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSwitchUser({ name: 'Elena Peña', roleLabel: 'Tutor Familiar' });
                      setUserMenuOpen(false);
                      onNavigate('zona-padres');
                    }}
                    className="w-full text-left px-2.5 py-2 rounded-xl text-xs hover:bg-[#f3f2ff] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#634abf]">family_restroom</span>
                    <div>
                      <div className="font-semibold text-[#171b2a]">Elena Peña</div>
                      <div className="text-[11px] text-[#757685]">Tutor / Familia</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 bg-[#f3f2ff] border-t border-[#dee1f7] gap-2 no-scrollbar text-xs">
        <button
          onClick={() => onNavigate('inicio')}
          className={`px-3 py-1 rounded-full whitespace-nowrap font-semibold ${
            currentScreen === 'inicio' ? 'bg-[#516cdc] text-white' : 'text-[#444653]'
          }`}
        >
          Inicio
        </button>
        <button
          onClick={() => onNavigate('mundo-aventura')}
          className={`px-3 py-1 rounded-full whitespace-nowrap font-semibold ${
            currentScreen === 'mundo-aventura' ? 'bg-[#516cdc] text-white' : 'text-[#444653]'
          }`}
        >
          Aventura
        </button>
        <button
          onClick={() => onNavigate('mision-interactiva')}
          className={`px-3 py-1 rounded-full whitespace-nowrap font-semibold ${
            currentScreen === 'mision-interactiva' ? 'bg-[#516cdc] text-white' : 'text-[#444653]'
          }`}
        >
          Misión
        </button>
        <button
          onClick={() => onNavigate('cofre-recompensas')}
          className={`px-3 py-1 rounded-full whitespace-nowrap font-semibold ${
            currentScreen === 'cofre-recompensas' ? 'bg-[#516cdc] text-white' : 'text-[#444653]'
          }`}
        >
          Cofre
        </button>
        <button
          onClick={() => onNavigate('zona-padres')}
          className={`px-3 py-1 rounded-full whitespace-nowrap font-semibold ${
            currentScreen === 'zona-padres' ? 'bg-[#516cdc] text-white' : 'text-[#444653]'
          }`}
        >
          Familias
        </button>
        <button
          onClick={() => onNavigate('gestion-bd')}
          className={`px-3 py-1 rounded-full whitespace-nowrap font-semibold ${
            currentScreen === 'gestion-bd' ? 'bg-[#3652c2] text-white' : 'text-[#444653]'
          }`}
        >
          Base de Datos (13 Tablas)
        </button>
      </div>
    </header>
  );
};
