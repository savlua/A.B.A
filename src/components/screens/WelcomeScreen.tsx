import React, { useState } from 'react';
import { AppScreen } from '../Navbar';

interface WelcomeScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onSetUser: (user: { name: string; roleLabel: string; alias?: string }) => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onNavigate,
  onSetUser,
  onShowToast
}) => {
  const [role, setRole] = useState<'kid' | 'adult'>('kid');
  const [identifier, setIdentifier] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authMode, setAuthMode] = useState<'options' | 'login' | 'register'>('options');
  const [password, setPassword] = useState('');

  const handleStartAdventure = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (role === 'kid') {
        const studentName = identifier.trim() || 'Lucas Mateo';
        onSetUser({
          name: studentName,
          roleLabel: 'Estudiante ABA',
          alias: studentName
        });
        onShowToast(`¡Bienvenido a tu Mundo de Aventuras, ${studentName}!`, 'celebration');
        onNavigate('mundo-aventura');
      } else {
        const adultName = identifier.includes('@') ? identifier.split('@')[0] : 'Prof. Mariana R.';
        onSetUser({
          name: 'Prof. Mariana R.',
          roleLabel: 'Especialista ABA · BCBA'
        });
        onShowToast('Acceso confirmado al Sistema de Gestión ABA', 'verified');
        onNavigate('gestion-bd');
      }
    }, 700);
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between overflow-hidden py-8 md:py-14">
      {/* Elementos decorativos y sensoriales de fondo */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        <div className="absolute -top-12 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-[#dde1ff]/60 via-[#e7deff]/30 to-transparent blur-3xl opacity-70"></div>
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-gradient-to-bl from-[#f4d9ff]/50 via-[#b8c3ff]/30 to-transparent blur-3xl opacity-60"></div>
        <div className="absolute -bottom-16 left-1/4 w-[32rem] h-[32rem] rounded-full bg-gradient-to-tr from-[#cbbeff]/40 to-[#e4e7fd]/50 blur-3xl opacity-75"></div>
      </div>

      {/* Contenedor maestro centrado */}
      <div className="w-full max-w-xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center flex-1">
        {/* Tarjeta Central Prominente: Mesa de Bienvenida A.B.A. (Exact Image 1) */}
        <section className="w-full bg-white rounded-3xl shadow-[0_12px_40px_rgba(54,82,194,0.10)] border border-[#dee1f7]/80 overflow-hidden transition-all duration-300">
          <div className="p-8 sm:p-12 flex flex-col items-center text-center space-y-6">
            {/* Top Pinwheel Toy Badge */}
            <div className="w-20 h-20 rounded-full bg-[#e4e7fd] flex items-center justify-center text-[#3652c2] shadow-sm">
              <span className="material-symbols-outlined filled text-[44px]">toys</span>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-1.5 max-w-lg">
              <h1 className="font-heading font-bold text-4xl sm:text-5xl text-[#3652c2] tracking-tight">
                A.B.A.
              </h1>
              <p className="font-heading font-semibold text-xl sm:text-2xl text-[#634abf]">
                Aprende, Juega y Crece
              </p>
              <p className="text-sm sm:text-base text-[#444653] pt-1 leading-relaxed">
                Espacio neuroeducativo estructurado y amable para el desarrollo infantil.
              </p>
            </div>

            {/* Quick Profile Role Selector */}
            <div className="w-full max-w-md bg-[#f3f2ff] p-1.5 rounded-full flex items-center border border-[#dee1f7]/60">
              <button
                type="button"
                onClick={() => {
                  setRole('kid');
                  setIdentifier('Lucas Mateo');
                }}
                className={`flex-1 py-2 px-3 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  role === 'kid'
                    ? 'bg-white text-[#3652c2] shadow-xs'
                    : 'text-[#444653] hover:text-[#171b2a]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">child_care</span>
                <span>Modo Alumno</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole('adult');
                  setIdentifier('m.ramirez@abaclinic.org');
                }}
                className={`flex-1 py-2 px-3 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  role === 'adult'
                    ? 'bg-white text-[#634abf] shadow-xs'
                    : 'text-[#444653] hover:text-[#171b2a]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">school</span>
                <span>Tutor / Terapeuta</span>
              </button>
            </div>

            {/* Interactive Login / Access Form */}
            {authMode === 'options' ? (
              <div className="w-full max-w-md pt-2 space-y-3">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="w-full h-14 rounded-full bg-[#3652c2] hover:bg-[#516cdc] text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all active:translate-y-0.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[24px]">login</span>
                  <span>Iniciar Sesión</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className="w-full h-14 rounded-full bg-[#e4e7fd] hover:bg-[#dee1f7] text-[#634abf] font-bold text-base flex items-center justify-center gap-2.5 transition-all active:translate-y-0.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[24px]">person_add</span>
                  <span>Crear Cuenta (Registrarse)</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleStartAdventure} className="w-full max-w-md pt-2 space-y-3 text-left">
                <div>
                  <label className="block text-xs font-bold text-[#171b2a] mb-1">
                    {role === 'kid' ? 'Nombre o Alias del Alumno' : 'Correo de Tutor / Terapeuta'}
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#757685] text-[20px]">
                      {role === 'kid' ? 'face' : 'mail'}
                    </span>
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={role === 'kid' ? 'Ejemplo: Mateo o Sofi2025' : 'tutor@abaclinic.org'}
                      className="w-full h-12 pl-12 pr-4 rounded-full bg-[#faf8ff] border border-[#dee1f7] text-sm text-[#171b2a] focus:outline-none focus:ring-2 focus:ring-[#3652c2]/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#171b2a] mb-1">
                    {role === 'kid' ? 'PIN o Clave Visual' : 'Contraseña Segura'}
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#757685] text-[20px]">
                      lock
                    </span>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={role === 'kid' ? 'PIN de 4 dígitos (ej. 1234)' : '••••••••'}
                      className="w-full h-12 pl-12 pr-4 rounded-full bg-[#faf8ff] border border-[#dee1f7] text-sm text-[#171b2a] focus:outline-none focus:ring-2 focus:ring-[#3652c2]/40"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-full bg-[#3652c2] hover:bg-[#516cdc] text-white font-bold text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:translate-y-0.5 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                        <span>Preparando espacio seguro...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[20px]">
                          {role === 'kid' ? 'rocket_launch' : 'verified'}
                        </span>
                        <span>
                          {role === 'kid'
                            ? '¡Ingresar a mi Mundo!'
                            : 'Ingresar al Portal de Gestión'}
                        </span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode('options')}
                    className="text-xs text-[#634abf] hover:underline text-center py-1 cursor-pointer font-semibold"
                  >
                    Volver a opciones
                  </button>
                </div>
              </form>
            )}

            {/* Quick Direct Navigation shortcuts */}
            <div className="w-full pt-1 border-t border-[#ebedff] flex items-center justify-center gap-4 text-xs font-semibold text-[#444653]">
              <button
                onClick={() => onNavigate('gestion-bd')}
                className="hover:text-[#3652c2] flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] text-[#3652c2]">database</span>
                <span>Base de Datos (13 Tablas)</span>
              </button>
              <span>·</span>
              <button
                onClick={() => onNavigate('mision-interactiva')}
                className="hover:text-[#634abf] flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] text-[#634abf]">smart_toy</span>
                <span>Misión Interactiva ABA</span>
              </button>
            </div>

            {/* Trust badge */}
            <div className="pt-1 flex items-center justify-center gap-2 text-[#444653] text-xs font-semibold">
              <span className="material-symbols-outlined text-[18px] text-[#3652c2]">verified_user</span>
              <span>Entorno protegido y sin publicidad</span>
            </div>
          </div>
        </section>
      </div>

      {/* Footer message matching Image 1 */}
      <div className="w-full max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#444653] gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#e7deff] flex items-center justify-center text-[#634abf]">
            <span className="material-symbols-outlined text-[15px]">shield</span>
          </div>
          <span>Espacio seguro, sin publicidad y diseñado para el bienestar neurodivergente.</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="hover:text-[#3652c2] cursor-pointer flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">contact_support</span>
            Asistencia Familiar
          </span>
          <span className="hover:text-[#3652c2] cursor-pointer">Privacidad COPPA</span>
          <span className="opacity-70">© 2025 A.B.A. Infantil</span>
        </div>
      </div>
    </div>
  );
};
