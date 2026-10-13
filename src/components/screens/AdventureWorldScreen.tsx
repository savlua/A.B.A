import React from 'react';
import { AppScreen } from '../Navbar';

interface AdventureWorldScreenProps {
  onNavigate: (screen: AppScreen) => void;
  starsCount: number;
  gemsCount: number;
}

export const AdventureWorldScreen: React.FC<AdventureWorldScreenProps> = ({
  onNavigate,
  starsCount,
  gemsCount
}) => {
  const islands = [
    {
      id: 1,
      title: 'Isla de los Colores y Formas',
      grade: 'Grado 1 · Inicial Sensorial',
      icon: 'palette',
      bgColor: 'from-[#dde1ff] to-[#e4e7fd]',
      textColor: 'text-[#3652c2]',
      completed: true,
      stars: 3,
      desc: 'Explora figuras amables, círculos azules y melodías relajantes.'
    },
    {
      id: 2,
      title: 'Valle de los Fonemas Mágicos',
      grade: 'Grado 1 · Imitación Verbal',
      icon: 'record_voice_over',
      bgColor: 'from-[#e7deff] to-[#f3f2ff]',
      textColor: 'text-[#634abf]',
      completed: true,
      stars: 3,
      desc: 'Aprende los sonidos /M/, /P/ y /S/ con modelado paso a paso.'
    },
    {
      id: 3,
      title: 'Bosque del Conteo Feliz',
      grade: 'Grado 2 · Conteo Visual',
      icon: 'pin',
      bgColor: 'from-[#f4d9ff] to-[#faedff]',
      textColor: 'text-[#8237b1]',
      completed: false,
      stars: 2,
      desc: 'Cuenta estrellitas y manzanas sin prisa ni sobrecarga visual.'
    },
    {
      id: 4,
      title: 'Jardín de las Emociones y Calma',
      grade: 'Grado 2 · Bienestar Socioemocional',
      icon: 'sentiment_satisfied',
      bgColor: 'from-[#dde1ff] to-[#e7deff]',
      textColor: 'text-[#3652c2]',
      completed: false,
      stars: 0,
      desc: 'Identifica caritas amables y practica respiraciones guiadas.'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white shadow-md border border-[#dee1f7] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#3652c2] to-[#634abf] text-white flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[36px]">explore</span>
          </div>
          <div>
            <span className="text-xs font-bold text-[#634abf] uppercase tracking-wider">
              Ruta Neuroeducativa Individualizada
            </span>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#171b2a]">
              Mundo Aventura de Aprendizaje
            </h1>
            <p className="text-xs sm:text-sm text-[#444653] mt-1">
              Etapas estructuradas con apoyos visuales y refuerzo positivo inmediato.
            </p>
          </div>
        </div>

        {/* Currency summary */}
        <div className="flex items-center gap-4 bg-[#f3f2ff] px-5 py-3 rounded-2xl border border-[#dee1f7]">
          <div className="flex items-center gap-1.5 text-[#634abf] font-bold text-base">
            <span className="material-symbols-outlined filled text-[22px]">star</span>
            <span>{starsCount} Estrellas</span>
          </div>
          <div className="w-px h-6 bg-[#dee1f7]"></div>
          <div className="flex items-center gap-1.5 text-[#8237b1] font-bold text-base">
            <span className="material-symbols-outlined filled text-[22px]">diamond</span>
            <span>{gemsCount} Gemas</span>
          </div>
        </div>
      </div>

      {/* Grid of Learning Islands */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {islands.map((island) => (
          <div
            key={island.id}
            className="p-6 rounded-3xl bg-white shadow-sm hover:shadow-md border border-[#dee1f7] transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${island.bgColor} flex items-center justify-center ${island.textColor}`}>
                  <span className="material-symbols-outlined text-[32px]">{island.icon}</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((starIdx) => (
                    <span
                      key={starIdx}
                      className={`material-symbols-outlined text-[20px] ${
                        starIdx <= island.stars
                          ? 'text-[#634abf] filled'
                          : 'text-[#dee1f7]'
                      }`}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>

              <span className="text-xs font-bold text-[#634abf] mt-4 block">
                {island.grade}
              </span>
              <h3 className="font-heading font-bold text-xl text-[#171b2a] mt-1 group-hover:text-[#3652c2] transition-colors">
                {island.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#444653] mt-2 leading-relaxed">
                {island.desc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#ebedff] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#757685]">
                {island.completed ? 'Misión completada' : 'En progreso'}
              </span>
              <button
                onClick={() => onNavigate('mision-interactiva')}
                className="h-10 px-5 rounded-full bg-[#3652c2] hover:bg-[#516cdc] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Jugar Misión</span>
                <span className="material-symbols-outlined text-[16px]">play_arrow</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
