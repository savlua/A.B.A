import React, { useState } from 'react';
import { EstudianteTable } from '../../types/database';
import { AppScreen } from '../Navbar';

interface ParentZoneScreenProps {
  students: EstudianteTable[];
  onNavigate: (screen: AppScreen) => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const ParentZoneScreen: React.FC<ParentZoneScreenProps> = ({
  students,
  onNavigate,
  onShowToast
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState<number>(students[0]?.id_estudiante || 1);
  const selectedStudent = students.find((s) => s.id_estudiante === selectedStudentId) || students[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="p-8 rounded-3xl bg-white border border-[#dee1f7] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#ebedff] text-[#3652c2] flex items-center justify-center">
            <span className="material-symbols-outlined text-[36px]">family_restroom</span>
          </div>
          <div>
            <span className="text-xs font-bold text-[#634abf] uppercase tracking-wider">
              Acompañamiento Clínico y Familiar
            </span>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#171b2a]">
              Portal para Padres y Terapeutas
            </h1>
            <p className="text-xs sm:text-sm text-[#444653] mt-1">
              Monitoreo objetivo de curvas de aprendizaje, latencia y planes individualizados ABA.
            </p>
          </div>
        </div>

        {/* Student Selector */}
        <div className="flex items-center gap-3 bg-[#f3f2ff] p-2 rounded-2xl border border-[#dee1f7]">
          <span className="text-xs font-bold text-[#171b2a] pl-2">Estudiante:</span>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(Number(e.target.value))}
            className="h-10 px-3 rounded-xl bg-white border border-[#dee1f7] text-xs font-bold text-[#171b2a] outline-none cursor-pointer"
          >
            {students.map((s) => (
              <option key={s.id_estudiante} value={s.id_estudiante}>
                {s.nombre_completo} ({s.edad} años)
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedStudent && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Clinical Profile Card */}
          <div className="p-6 rounded-3xl bg-white border border-[#dee1f7] shadow-sm flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#dde1ff] text-[#3652c2] flex items-center justify-center font-bold text-base">
                {selectedStudent.alias.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-[#171b2a]">
                  {selectedStudent.nombre_completo}
                </h3>
                <span className="text-xs text-[#757685]">
                  {selectedStudent.edad} años · Diagnóstico: {selectedStudent.diagnostico}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-[#ebedff] text-xs text-[#444653]">
              <div>
                <span className="font-bold text-[#171b2a] block">Canal Sensorial Primario:</span>
                <span className="inline-block mt-1 px-3 py-1 rounded-full bg-[#e7deff] text-[#340e90] font-semibold">
                  {selectedStudent.canal_sensorial}
                </span>
              </div>

              <div>
                <span className="font-bold text-[#171b2a] block">Intereses Especiales (Hiperenfoque):</span>
                <span className="text-[#171b2a] font-medium">{selectedStudent.hiperenfoque}</span>
              </div>

              <div>
                <span className="font-bold text-[#171b2a] block">Terapeuta Asignado:</span>
                <span className="text-[#3652c2] font-semibold">{selectedStudent.profesor_asignado}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#ebedff]">
              <button
                onClick={() => onNavigate('gestion-bd')}
                className="w-full h-10 rounded-full bg-[#f3f2ff] hover:bg-[#dee1f7] text-[#3652c2] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">database</span>
                <span>Ver Ficha en Base de Datos</span>
              </button>
            </div>
          </div>

          {/* Progress & Latency Metrics */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-[#dee1f7] shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between pb-2 border-b border-[#ebedff]">
              <div>
                <h3 className="font-heading font-bold text-lg text-[#171b2a]">
                  Métricas de Ensayos Discretos (DTT)
                </h3>
                <p className="text-xs text-[#757685]">
                  Últimos 142 ensayos registrados en la tabla `respuestas`
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#dde1ff] text-[#001355] text-xs font-bold">
                Criterio de Maestría Alcanzado
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#faf8ff] border border-[#dee1f7]">
                <span className="text-xs text-[#757685]">Tasa de Acierto</span>
                <div className="font-heading font-bold text-2xl text-[#3652c2] mt-1">
                  89.4%
                </div>
                <span className="text-[11px] text-[#3652c2] font-semibold">Meta clínica: &gt;80%</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf8ff] border border-[#dee1f7]">
                <span className="text-xs text-[#757685]">Latencia Media de Respuesta</span>
                <div className="font-heading font-bold text-2xl text-[#634abf] mt-1">
                  1.62 s
                </div>
                <span className="text-[11px] text-[#634abf] font-semibold">Excelente tiempo motor</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf8ff] border border-[#dee1f7]">
                <span className="text-xs text-[#757685]">Economía de Fichas</span>
                <div className="font-heading font-bold text-2xl text-[#8237b1] mt-1">
                  {selectedStudent.puntaje_acumulado} pts
                </div>
                <span className="text-[11px] text-[#8237b1] font-semibold">Estrellas acumuladas</span>
              </div>
            </div>

            {/* IEP Notes */}
            <div className="p-4 rounded-2xl bg-[#f3f2ff] border border-[#dee1f7] text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#171b2a]">
                <span className="material-symbols-outlined text-[16px] text-[#634abf]">note_alt</span>
                <span>Nota Clínica de Seguimiento · Prof. Mariana R.</span>
              </div>
              <p className="text-[#444653] leading-relaxed">
                "{selectedStudent.alias} responde favorablemente al modelado sin error. Mostró alta autorregulación visual cuando se emplearon contrastes suaves. Se recomienda continuar con el módulo de Fonemas antes de pasar a oraciones complejas."
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
