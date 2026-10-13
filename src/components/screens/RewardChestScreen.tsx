import React from 'react';
import { AppScreen } from '../Navbar';

interface RewardChestScreenProps {
  onNavigate: (screen: AppScreen) => void;
  starsCount: number;
  gemsCount: number;
  onRedeemReward: (cost: number, name: string) => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const RewardChestScreen: React.FC<RewardChestScreenProps> = ({
  onNavigate,
  starsCount,
  gemsCount,
  onRedeemReward,
  onShowToast
}) => {
  const rewards = [
    {
      id: 'badge-explorer',
      title: 'Insignia: Explorador de la Calma',
      category: 'Insignia Honorífica',
      costGems: 15,
      icon: 'military_tech',
      desc: 'Destaca en tu perfil por completar ensayos con serenidad.',
      unlocked: true
    },
    {
      id: 'theme-lavender',
      title: 'Fondo Sensorial: Nube Lavanda',
      category: 'Adaptación Visual',
      costGems: 25,
      icon: 'palette',
      desc: 'Paleta ultra-suave para sesiones nocturnas o alta sensibilidad.',
      unlocked: false
    },
    {
      id: 'sound-chimes',
      title: 'Melodía: Campana de Viento Tibetana',
      category: 'Estímulo Auditivo',
      costGems: 20,
      icon: 'music_note',
      desc: 'Refuerzo sonoro armónico con baja frecuencia para evitar sobresaltos.',
      unlocked: false
    },
    {
      id: 'avatar-astronaut',
      title: 'Compañero: Astronauta Estelar',
      category: 'Avatar & Guía',
      costGems: 35,
      icon: 'rocket_launch',
      desc: 'Un tierno amigo que te acompaña en las misiones interactivas.',
      unlocked: false
    }
  ];

  const handleClaim = (reward: typeof rewards[0]) => {
    if (reward.unlocked) {
      onShowToast(`Ya tienes activo: ${reward.title}`, 'check_circle');
      return;
    }
    if (gemsCount < reward.costGems) {
      onShowToast(`Necesitas ${reward.costGems - gemsCount} gemas más para canjear este premio`, 'lock');
      return;
    }
    onRedeemReward(reward.costGems, reward.title);
    onShowToast(`¡Canje exitoso! Desbloqueaste: ${reward.title}`, 'celebration');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Header Chest Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#e7deff] via-white to-[#dde1ff] border border-[#dee1f7] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#634abf] to-[#8237b1] text-white flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined filled text-[44px]">lock_open</span>
          </div>
          <div>
            <span className="text-xs font-bold text-[#634abf] uppercase tracking-wider">
              Economía de Fichas ABA · Refuerzo Positivo
            </span>
            <h1 className="font-heading font-bold text-3xl text-[#171b2a]">
              Cofre de Recompensas & Canjes
            </h1>
            <p className="text-xs sm:text-sm text-[#444653] mt-1">
              Canjea tus gemas ganadas en ensayos por estímulos adaptados y logros positivos.
            </p>
          </div>
        </div>

        {/* Counter cards */}
        <div className="flex items-center gap-3">
          <div className="p-4 rounded-2xl bg-white shadow-xs border border-[#dee1f7] flex items-center gap-3">
            <span className="material-symbols-outlined filled text-[#634abf] text-[28px]">star</span>
            <div>
              <div className="font-heading font-bold text-xl text-[#171b2a]">{starsCount}</div>
              <div className="text-[11px] text-[#757685]">Estrellas Totales</div>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white shadow-xs border border-[#dee1f7] flex items-center gap-3">
            <span className="material-symbols-outlined filled text-[#8237b1] text-[28px]">diamond</span>
            <div>
              <div className="font-heading font-bold text-xl text-[#171b2a]">{gemsCount}</div>
              <div className="text-[11px] text-[#757685]">Gemas Mágicas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rewards.map((r) => (
          <div
            key={r.id}
            className="p-6 rounded-3xl bg-white border border-[#dee1f7] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#ebedff] text-[#3652c2] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[30px]">{r.icon}</span>
              </div>
              <span className="text-xs font-bold text-[#634abf]">{r.category}</span>
              <h3 className="font-heading font-bold text-base text-[#171b2a] mt-1">
                {r.title}
              </h3>
              <p className="text-xs text-[#444653] mt-2 leading-relaxed">
                {r.desc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#ebedff] flex items-center justify-between">
              <span className="text-xs font-bold text-[#8237b1] flex items-center gap-1">
                <span className="material-symbols-outlined filled text-[16px]">diamond</span>
                {r.costGems} gemas
              </span>
              <button
                onClick={() => handleClaim(r)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  r.unlocked
                    ? 'bg-[#ebedff] text-[#3652c2]'
                    : gemsCount >= r.costGems
                    ? 'bg-[#634abf] hover:bg-[#523da1] text-white shadow-sm'
                    : 'bg-[#f3f2ff] text-[#757685] cursor-not-allowed'
                }`}
              >
                {r.unlocked ? 'Activo' : 'Canjear'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
