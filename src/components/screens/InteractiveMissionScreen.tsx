import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { AppScreen } from '../Navbar';

interface InteractiveMissionScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onRecordTrial: (isCorrect: boolean, latency: number) => void;
  starsCount: number;
  gemsCount: number;
}

export const InteractiveMissionScreen: React.FC<InteractiveMissionScreenProps> = ({
  onNavigate,
  onRecordTrial,
  starsCount,
  gemsCount
}) => {
  const [tokens, setTokens] = useState<number>(1);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [feedback, setFeedback] = useState<'idle' | 'success' | 'retry'>('idle');
  const [trialIndex, setTrialIndex] = useState<number>(0);

  const trials = [
    {
      prompt: 'Toca la figura con forma de Círculo Azul',
      targetId: 'blue-circle',
      instructionAudio: 'Busca el círculo azul amable',
      options: [
        { id: 'yellow-square', label: 'Cuadrado Amarillo', icon: 'square', color: 'bg-[#fff3c4] text-[#b45309]', shape: 'rounded-2xl' },
        { id: 'blue-circle', label: 'Círculo Azul', icon: 'circle', color: 'bg-[#dde1ff] text-[#3652c2]', shape: 'rounded-full' },
        { id: 'purple-triangle', label: 'Triángulo Lavanda', icon: 'change_history', color: 'bg-[#f4d9ff] text-[#8237b1]', shape: 'rounded-2xl' }
      ]
    },
    {
      prompt: 'Identifica la carita que expresa Calma y Alegría',
      targetId: 'happy-face',
      instructionAudio: 'Toca la carita sonriente',
      options: [
        { id: 'happy-face', label: 'Alegría & Sonrisa', icon: 'mood', color: 'bg-[#dde1ff] text-[#3652c2]', shape: 'rounded-full' },
        { id: 'neutral-face', label: 'Pensativo', icon: 'face', color: 'bg-[#ebedff] text-[#444653]', shape: 'rounded-full' },
        { id: 'sleepy-face', label: 'Descansando', icon: 'bedtime', color: 'bg-[#e7deff] text-[#634abf]', shape: 'rounded-full' }
      ]
    },
    {
      prompt: 'Empareja 3 Estrellitas Brillantes',
      targetId: 'three-stars',
      instructionAudio: 'Cuenta tres estrellas',
      options: [
        { id: 'one-star', label: '1 Estrellita', icon: 'star', color: 'bg-[#f4d9ff] text-[#8237b1]', shape: 'rounded-2xl' },
        { id: 'three-stars', label: '3 Estrellitas', icon: 'stars', color: 'bg-[#dde1ff] text-[#3652c2]', shape: 'rounded-2xl' },
        { id: 'five-stars', label: '5 Estrellitas', icon: 'hotel_class', color: 'bg-[#ebedff] text-[#634abf]', shape: 'rounded-2xl' }
      ]
    }
  ];

  const currentTrial = trials[trialIndex % trials.length];

  useEffect(() => {
    setStartTime(Date.now());
  }, [trialIndex]);

  // Gentle harmonic web audio synthesizer for positive reinforcement (no external audio files needed)
  const playGentleTone = (type: 'success' | 'retry') => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'success') {
        // Soothing pentatonic chord / arpeggio
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
      } else {
        // Soft low warmth prompt (no jarring buzz)
        osc.frequency.setValueAtTime(329.63, audioCtx.currentTime); // E4
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      }
    } catch {
      // AudioContext not allowed or unsupported
    }
  };

  const handleSelectOption = (optionId: string) => {
    if (feedback !== 'idle') return;

    const latency = Number(((Date.now() - startTime) / 1000).toFixed(2));
    const isCorrect = optionId === currentTrial.targetId;

    onRecordTrial(isCorrect, latency);

    if (isCorrect) {
      setFeedback('success');
      playGentleTone('success');

      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#3652c2', '#634abf', '#8237b1', '#b8c3ff', '#f4d9ff']
        });
      } catch {}

      const newTokens = tokens + 1;
      setTokens(newTokens);

      setTimeout(() => {
        setFeedback('idle');
        if (newTokens >= 3) {
          setTokens(0);
          setTrialIndex((prev) => (prev + 1) % trials.length);
        } else {
          setTrialIndex((prev) => (prev + 1) % trials.length);
        }
      }, 1500);
    } else {
      setFeedback('retry');
      playGentleTone('retry');

      setTimeout(() => {
        setFeedback('idle');
      }, 1400);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col items-center gap-8">
      {/* Top Session Progress Bar */}
      <div className="w-full bg-white p-5 rounded-3xl shadow-sm border border-[#dee1f7] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('mundo-aventura')}
            className="w-10 h-10 rounded-full bg-[#f3f2ff] hover:bg-[#dee1f7] flex items-center justify-center text-[#444653] transition-colors cursor-pointer"
            title="Volver a Mundo Aventura"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <div className="text-xs font-bold text-[#634abf]">
              Ensayo Discreto ABA · Sesión Activa
            </div>
            <h2 className="font-heading font-bold text-lg text-[#171b2a]">
              Misión: Reconocimiento Sensorial Adaptativo
            </h2>
          </div>
        </div>

        {/* Token Economy Board (Fichas de Refuerzo) */}
        <div className="flex items-center gap-2 bg-[#f3f2ff] px-4 py-2 rounded-full border border-[#dee1f7]">
          <span className="text-xs font-bold text-[#171b2a] mr-1">Tablero de Fichas:</span>
          {[0, 1, 2].map((slot) => (
            <div
              key={slot}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                slot < tokens
                  ? 'bg-gradient-to-tr from-[#3652c2] to-[#634abf] text-white shadow-sm scale-110'
                  : 'bg-white border-2 border-dashed border-[#dee1f7] text-[#dee1f7]'
              }`}
            >
              <span className="material-symbols-outlined filled text-[18px]">
                {slot < tokens ? 'star' : 'star_border'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Trial Card (The Stimulus Card) */}
      <div className="w-full bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-[#dee1f7] flex flex-col items-center text-center space-y-8 relative overflow-hidden">
        {/* Antecedent Instruction Pill */}
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#dde1ff] text-[#001355] text-xs font-bold">
            <span className="material-symbols-outlined text-[16px]">record_voice_over</span>
            <span>Instrucción Guiada (Estímulo Discriminativo)</span>
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#171b2a] leading-tight">
            "{currentTrial.prompt}"
          </h1>
          <p className="text-xs sm:text-sm text-[#444653]">
            Toca suavemente la opción correcta en la pantalla. Puedes tomarte todo el tiempo que necesites.
          </p>
        </div>

        {/* Interactive Option Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl">
          {currentTrial.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelectOption(opt.id)}
              disabled={feedback !== 'idle'}
              className={`p-6 rounded-3xl bg-white border-2 border-[#dee1f7] hover:border-[#3652c2] hover:shadow-md transition-all flex flex-col items-center gap-4 group cursor-pointer active:scale-95 ${
                feedback === 'success' && opt.id === currentTrial.targetId
                  ? 'border-[#3652c2] ring-4 ring-[#dde1ff] bg-[#faf8ff]'
                  : ''
              }`}
            >
              <div
                className={`w-24 h-24 ${opt.shape} ${opt.color} flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform`}
              >
                <span className="material-symbols-outlined filled text-[48px]">
                  {opt.icon}
                </span>
              </div>
              <span className="font-heading font-bold text-sm text-[#171b2a] group-hover:text-[#3652c2] transition-colors">
                {opt.label}
              </span>
            </button>
          ))}
        </div>

        {/* Feedback Message Bar */}
        {feedback === 'success' && (
          <div className="w-full p-4 rounded-2xl bg-[#dde1ff] text-[#001355] flex items-center justify-center gap-2 text-sm font-bold animate-in fade-in zoom-in duration-200">
            <span className="material-symbols-outlined filled text-[22px] text-[#3652c2]">
              celebration
            </span>
            <span>¡Excelente trabajo! Has ganado una estrella y +5 gemas.</span>
          </div>
        )}

        {feedback === 'retry' && (
          <div className="w-full p-4 rounded-2xl bg-[#e7deff] text-[#340e90] flex items-center justify-center gap-2 text-sm font-semibold animate-in fade-in duration-200">
            <span className="material-symbols-outlined text-[22px] text-[#634abf]">
              lightbulb
            </span>
            <span>¡Casi! Respira hondo y probemos otra vez juntos.</span>
          </div>
        )}

        {/* Clinical Trail Note */}
        <div className="pt-4 border-t border-[#ebedff] w-full flex items-center justify-between text-xs text-[#757685]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#3652c2]">database</span>
            <span>Registro en tiempo real sincronizado con tabla: `respuestas`</span>
          </div>
          <button
            onClick={() => onNavigate('gestion-bd')}
            className="text-[#634abf] hover:underline font-semibold cursor-pointer"
          >
            Ver datos en base de datos →
          </button>
        </div>
      </div>
    </div>
  );
};
