import React, { useState } from 'react';

interface InsertRowModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableName: string;
  onInsert: (tableName: string, rowData: any) => void;
}

export const InsertRowModal: React.FC<InsertRowModalProps> = ({
  isOpen,
  onClose,
  tableName,
  onInsert
}) => {
  // Form states depending on table
  const [formData, setFormData] = useState<Record<string, any>>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onInsert(tableName, formData);
    setFormData({});
    onClose();
  };

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#dee1f7] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-[#f3f2ff] border-b border-[#dee1f7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#e7deff] text-[#634abf] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">add_circle</span>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#171b2a]">
                Insertar Fila en `{tableName}`
              </h3>
              <p className="text-xs text-[#444653]">
                Registro normalizado con validación de tipos InnoDB
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-[#dee1f7] text-[#444653] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Dynamic Form based on tableName */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4">
          {tableName === 'estudiante' ? (
            <>
              <div>
                <label className="block text-xs font-bold text-[#171b2a] mb-1">
                  Nombre Completo del Estudiante
                </label>
                <input
                  required
                  type="text"
                  placeholder="Ej: Daniel Romero"
                  value={formData.nombre_completo || ''}
                  onChange={(e) => updateField('nombre_completo', e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-[#dee1f7] text-sm focus:outline-none focus:ring-2 focus:ring-[#3652c2]/30"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#171b2a] mb-1">Edad</label>
                  <input
                    required
                    type="number"
                    min="3"
                    max="16"
                    placeholder="6"
                    value={formData.edad || ''}
                    onChange={(e) => updateField('edad', Number(e.target.value))}
                    className="w-full h-11 px-4 rounded-xl border border-[#dee1f7] text-sm focus:outline-none focus:ring-2 focus:ring-[#3652c2]/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#171b2a] mb-1">Grado Asignado</label>
                  <select
                    value={formData.id_grado || 1}
                    onChange={(e) => updateField('id_grado', Number(e.target.value))}
                    className="w-full h-11 px-3 rounded-xl border border-[#dee1f7] text-sm focus:outline-none focus:ring-2 focus:ring-[#3652c2]/30 bg-white"
                  >
                    <option value={1}>Grado 1: Inicial Sensorial</option>
                    <option value={2}>Grado 1: Fonemas</option>
                    <option value={3}>Grado 2: Conteo</option>
                    <option value={4}>Grado 2: Emociones</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#171b2a] mb-1">
                  Canal Sensorial Preferente (ABA)
                </label>
                <select
                  value={formData.canal_sensorial || 'Preferencia Visual'}
                  onChange={(e) => updateField('canal_sensorial', e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-[#dee1f7] text-sm focus:outline-none focus:ring-2 focus:ring-[#3652c2]/30 bg-white"
                >
                  <option value="Preferencia Visual">Preferencia Visual</option>
                  <option value="Canal Auditivo">Canal Auditivo</option>
                  <option value="Cinestésico / Táctil">Cinestésico / Táctil</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#171b2a] mb-1">
                  Diagnóstico / Necesidad de Apoyo
                </label>
                <input
                  type="text"
                  placeholder="Ej: TEA Nivel 1 · Estimulación de habla"
                  value={formData.diagnostico || ''}
                  onChange={(e) => updateField('diagnostico', e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-[#dee1f7] text-sm focus:outline-none focus:ring-2 focus:ring-[#3652c2]/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#171b2a] mb-1">
                  Terapeuta / Profesor Asignado
                </label>
                <input
                  type="text"
                  placeholder="Prof. Mariana R."
                  value={formData.profesor_asignado || 'Prof. Mariana R.'}
                  onChange={(e) => updateField('profesor_asignado', e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-[#dee1f7] text-sm focus:outline-none focus:ring-2 focus:ring-[#3652c2]/30"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-bold text-[#171b2a] mb-1">
                  Título / Nombre
                </label>
                <input
                  required
                  type="text"
                  placeholder="Nombre de la nueva entrada"
                  value={formData.nombre || formData.titulo || ''}
                  onChange={(e) => updateField('nombre', e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-[#dee1f7] text-sm focus:outline-none focus:ring-2 focus:ring-[#3652c2]/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#171b2a] mb-1">
                  Descripción o Parámetro
                </label>
                <textarea
                  rows={3}
                  placeholder="Detalles del registro estructurado..."
                  value={formData.descripcion || ''}
                  onChange={(e) => updateField('descripcion', e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#dee1f7] text-sm focus:outline-none focus:ring-2 focus:ring-[#3652c2]/30"
                />
              </div>
            </>
          )}

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#dee1f7]">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-5 rounded-full bg-[#f3f2ff] hover:bg-[#dee1f7] text-[#444653] text-xs font-semibold cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="h-10 px-6 rounded-full bg-[#3652c2] hover:bg-[#283e96] text-white text-xs font-semibold shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              <span>Guardar Fila</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
