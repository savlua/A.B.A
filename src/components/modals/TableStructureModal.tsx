import React from 'react';

interface ColumnDef {
  field: string;
  type: string;
  collation?: string;
  nullVal: string;
  key: string;
  defaultVal: string;
  extra: string;
}

interface TableStructureModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableName: string;
}

const TABLE_SCHEMAS: Record<string, ColumnDef[]> = {
  estudiante: [
    { field: 'id_estudiante', type: 'int(11)', nullVal: 'NO', key: 'PRI', defaultVal: 'NULL', extra: 'auto_increment' },
    { field: 'id_usuario', type: 'int(11)', nullVal: 'NO', key: 'MUL', defaultVal: 'NULL', extra: 'FK -> usuario' },
    { field: 'id_grado', type: 'int(11)', nullVal: 'NO', key: 'MUL', defaultVal: 'NULL', extra: 'FK -> grado' },
    { field: 'nombre_completo', type: 'varchar(150)', collation: 'utf8mb4_general_ci', nullVal: 'NO', key: '', defaultVal: 'NULL', extra: '' },
    { field: 'alias', type: 'varchar(60)', collation: 'utf8mb4_general_ci', nullVal: 'NO', key: '', defaultVal: 'NULL', extra: '' },
    { field: 'edad', type: 'tinyint(4)', nullVal: 'NO', key: '', defaultVal: 'NULL', extra: '' },
    { field: 'diagnostico', type: 'varchar(150)', collation: 'utf8mb4_general_ci', nullVal: 'NO', key: '', defaultVal: 'NULL', extra: '' },
    { field: 'canal_sensorial', type: "enum('Preferencia Visual', 'Canal Auditivo', 'Cinestésico / Táctil')", collation: 'utf8mb4_general_ci', nullVal: 'NO', key: '', defaultVal: 'NULL', extra: '' },
    { field: 'hiperenfoque', type: 'varchar(200)', collation: 'utf8mb4_general_ci', nullVal: 'YES', key: '', defaultVal: 'NULL', extra: '' },
    { field: 'puntaje_acumulado', type: 'int(11)', nullVal: 'YES', key: '', defaultVal: '0', extra: '' },
    { field: 'profesor_asignado', type: 'varchar(120)', collation: 'utf8mb4_general_ci', nullVal: 'NO', key: '', defaultVal: 'NULL', extra: '' }
  ],
  usuario: [
    { field: 'id_usuario', type: 'int(11)', nullVal: 'NO', key: 'PRI', defaultVal: 'NULL', extra: 'auto_increment' },
    { field: 'id_rol', type: 'tinyint(4)', nullVal: 'NO', key: 'MUL', defaultVal: 'NULL', extra: 'FK -> rol' },
    { field: 'nombre', type: 'varchar(120)', collation: 'utf8mb4_general_ci', nullVal: 'NO', key: '', defaultVal: 'NULL', extra: '' },
    { field: 'email', type: 'varchar(150)', collation: 'utf8mb4_general_ci', nullVal: 'NO', key: 'UNI', defaultVal: 'NULL', extra: '' },
    { field: 'password_hash', type: 'varchar(255)', collation: 'utf8mb4_general_ci', nullVal: 'NO', key: '', defaultVal: 'NULL', extra: '' },
    { field: 'activo', type: 'tinyint(1)', nullVal: 'YES', key: '', defaultVal: '1', extra: '' },
    { field: 'ultimo_acceso', type: 'datetime', nullVal: 'YES', key: '', defaultVal: 'NULL', extra: '' }
  ],
  grado: [
    { field: 'id_grado', type: 'int(11)', nullVal: 'NO', key: 'PRI', defaultVal: 'NULL', extra: 'auto_increment' },
    { field: 'nombre_grado', type: 'varchar(100)', collation: 'utf8mb4_general_ci', nullVal: 'NO', key: '', defaultVal: 'NULL', extra: '' },
    { field: 'nivel_dificultad', type: 'varchar(50)', collation: 'utf8mb4_general_ci', nullVal: 'NO', key: '', defaultVal: 'NULL', extra: '' },
    { field: 'icono', type: 'varchar(50)', collation: 'utf8mb4_general_ci', nullVal: 'NO', key: '', defaultVal: 'NULL', extra: '' },
    { field: 'descripcion', type: 'text', collation: 'utf8mb4_general_ci', nullVal: 'YES', key: '', defaultVal: 'NULL', extra: '' }
  ],
  saber: [
    { field: 'id_saber', type: 'int(11)', nullVal: 'NO', key: 'PRI', defaultVal: 'NULL', extra: 'auto_increment' },
    { field: 'id_grado', type: 'int(11)', nullVal: 'NO', key: 'MUL', defaultVal: 'NULL', extra: 'FK -> grado' },
    { field: 'nombre_saber', type: 'varchar(150)', collation: 'utf8mb4_general_ci', nullVal: 'NO', key: '', defaultVal: 'NULL', extra: '' },
    { field: 'area_estimulacion', type: 'varchar(100)', collation: 'utf8mb4_general_ci', nullVal: 'NO', key: '', defaultVal: 'NULL', extra: '' },
    { field: 'descripcion', type: 'text', collation: 'utf8mb4_general_ci', nullVal: 'YES', key: '', defaultVal: 'NULL', extra: '' }
  ],
  evaluacion: [
    { field: 'id_evaluacion', type: 'int(11)', nullVal: 'NO', key: 'PRI', defaultVal: 'NULL', extra: 'auto_increment' },
    { field: 'id_saber', type: 'int(11)', nullVal: 'NO', key: 'MUL', defaultVal: 'NULL', extra: 'FK -> saber' },
    { field: 'titulo_mision', type: 'varchar(150)', collation: 'utf8mb4_general_ci', nullVal: 'NO', key: '', defaultVal: 'NULL', extra: '' },
    { field: 'criterio_maestria', type: 'varchar(120)', collation: 'utf8mb4_general_ci', nullVal: 'NO', key: '', defaultVal: 'NULL', extra: '' },
    { field: 'tipo_ensayo', type: 'varchar(80)', collation: 'utf8mb4_general_ci', nullVal: 'NO', key: '', defaultVal: 'NULL', extra: '' }
  ],
  puntaje: [
    { field: 'id_puntaje', type: 'int(11)', nullVal: 'NO', key: 'PRI', defaultVal: 'NULL', extra: 'auto_increment' },
    { field: 'id_estudiante', type: 'int(11)', nullVal: 'NO', key: 'MUL', defaultVal: 'NULL', extra: 'FK -> estudiante' },
    { field: 'estrellas_totales', type: 'int(11)', nullVal: 'YES', key: '', defaultVal: '0', extra: '' },
    { field: 'gemas_magicas', type: 'int(11)', nullVal: 'YES', key: '', defaultVal: '0', extra: '' },
    { field: 'nivel_recompensa', type: 'varchar(100)', collation: 'utf8mb4_general_ci', nullVal: 'NO', key: '', defaultVal: 'NULL', extra: '' },
    { field: 'ultimo_canje', type: 'date', nullVal: 'YES', key: '', defaultVal: 'NULL', extra: '' }
  ]
};

export const TableStructureModal: React.FC<TableStructureModalProps> = ({
  isOpen,
  onClose,
  tableName
}) => {
  if (!isOpen) return null;

  const columns = TABLE_SCHEMAS[tableName] || [
    { field: `id_${tableName}`, type: 'int(11)', nullVal: 'NO', key: 'PRI', defaultVal: 'NULL', extra: 'auto_increment' },
    { field: 'descripcion', type: 'varchar(255)', collation: 'utf8mb4_general_ci', nullVal: 'YES', key: '', defaultVal: 'NULL', extra: '' },
    { field: 'fecha_creacion', type: 'datetime', nullVal: 'NO', key: '', defaultVal: 'CURRENT_TIMESTAMP', extra: '' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#dee1f7] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-[#f3f2ff] border-b border-[#dee1f7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#cbbeff] text-[#340e90] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">table_rows</span>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#171b2a]">
                Estructura de Columnas: <span className="text-[#3652c2]">`{tableName}`</span>
              </h3>
              <p className="text-xs text-[#444653]">
                Definición DDL en motor InnoDB con soporte ACID y cotejamiento UTF-8
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

        {/* Table Schema Grid */}
        <div className="p-6 overflow-y-auto flex-1">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#dee1f7] text-[#444653] font-bold">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">Columna</th>
                <th className="py-2.5 px-3">Tipo de Dato</th>
                <th className="py-2.5 px-3">Nulo</th>
                <th className="py-2.5 px-3">Clave</th>
                <th className="py-2.5 px-3">Predeterminado</th>
                <th className="py-2.5 px-3">Extra / FK</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ebedff]">
              {columns.map((col, idx) => (
                <tr key={col.field} className="hover:bg-[#faf8ff] transition-colors">
                  <td className="py-2.5 px-3 text-[#757685] font-mono">{idx + 1}</td>
                  <td className="py-2.5 px-3 font-semibold text-[#171b2a] font-mono">
                    {col.field}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[#634abf]">{col.type}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${col.nullVal === 'NO' ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#e7deff] text-[#4b2fa6]'}`}>
                      {col.nullVal}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    {col.key === 'PRI' ? (
                      <span className="px-2 py-0.5 rounded bg-[#dde1ff] text-[#001355] text-[10px] font-bold">
                        PRIMARY
                      </span>
                    ) : col.key === 'MUL' ? (
                      <span className="px-2 py-0.5 rounded bg-[#e7deff] text-[#340e90] text-[10px] font-bold">
                        INDEX / FK
                      </span>
                    ) : (
                      <span className="text-[#757685]">-</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-[#444653] font-mono">{col.defaultVal}</td>
                  <td className="py-2.5 px-3 text-[#3652c2] font-semibold">{col.extra || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#faf8ff] border-t border-[#dee1f7] flex justify-end">
          <button
            onClick={onClose}
            className="h-10 px-6 rounded-full bg-[#3652c2] text-white text-xs font-semibold hover:bg-[#2c43a3] transition-colors cursor-pointer"
          >
            Cerrar Estructura
          </button>
        </div>
      </div>
    </div>
  );
};
