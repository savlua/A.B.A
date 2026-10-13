import React, { useState, useMemo, useRef } from 'react';
import { TABLE_METAS } from '../../data/mockDatabase';
import { TableMeta, EstudianteTable } from '../../types/database';
import { SqlModal } from '../modals/SqlModal';
import { TableStructureModal } from '../modals/TableStructureModal';
import { InsertRowModal } from '../modals/InsertRowModal';

interface DatabaseScreenProps {
  onShowToast: (message: string, icon?: string) => void;
  students: EstudianteTable[];
  onAddStudent: (student: EstudianteTable) => void;
  onDeleteStudent: (id: number) => void;
  onUpdateStudent: (student: EstudianteTable) => void;
  allTableData: Record<string, any[]>;
  onAddGenericRow: (table: string, row: any) => void;
}

export const DatabaseScreen: React.FC<DatabaseScreenProps> = ({
  onShowToast,
  students,
  onAddStudent,
  onDeleteStudent,
  onUpdateStudent,
  allTableData,
  onAddGenericRow
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTable, setActiveTable] = useState<string>('estudiante');
  const [viewMode, setViewMode] = useState<'cards' | 'phpmyadmin'>('cards');
  
  // Modals state
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false);
  const [sqlModalTable, setSqlModalTable] = useState<string | undefined>(undefined);
  const [isStructureModalOpen, setIsStructureModalOpen] = useState(false);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);

  // Table pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  const explorerRef = useRef<HTMLDivElement>(null);

  // Filtered tables list
  const filteredTables = useMemo(() => {
    return TABLE_METAS.filter((t) => {
      const matchesGroup = selectedGroup === 'all' || t.group === selectedGroup;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.kicker.toLowerCase().includes(q);
      return matchesGroup && matchesSearch;
    });
  }, [selectedGroup, searchQuery]);

  // Grouped tables for card section
  const groupA = useMemo(() => filteredTables.filter((t) => t.group === 'security'), [filteredTables]);
  const groupB = useMemo(() => filteredTables.filter((t) => t.group === 'students'), [filteredTables]);
  const groupC = useMemo(() => filteredTables.filter((t) => t.group === 'content'), [filteredTables]);
  const groupD = useMemo(() => filteredTables.filter((t) => t.group === 'evaluation'), [filteredTables]);

  // Handle click on examine table
  const handleExamineTable = (tableName: string) => {
    setActiveTable(tableName);
    setCurrentPage(1);
    onShowToast(`Cargando registros para la tabla '${tableName}'...`, 'table_view');
    explorerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleOpenStructure = (tableName?: string) => {
    setSqlModalTable(tableName || activeTable);
    setIsStructureModalOpen(true);
  };

  const handleOpenSqlDump = () => {
    setSqlModalTable(undefined);
    setIsSqlModalOpen(true);
  };

  const handleNewEntry = () => {
    setIsInsertModalOpen(true);
  };

  const handleInsertRow = (tableName: string, data: any) => {
    if (tableName === 'estudiante') {
      const newEst: EstudianteTable = {
        id_estudiante: students.length + 1,
        id_usuario: 5,
        id_grado: data.id_grado || 1,
        nombre_completo: data.nombre_completo || 'Nuevo Estudiante',
        alias: data.nombre_completo?.split(' ')[0] || 'Nuevo',
        edad: Number(data.edad) || 6,
        diagnostico: data.diagnostico || 'Evaluación inicial ABA',
        canal_sensorial: data.canal_sensorial || 'Preferencia Visual',
        hiperenfoque: 'Juegos de bloques y encaje',
        puntaje_acumulado: 100,
        profesor_asignado: data.profesor_asignado || 'Prof. Mariana R.'
      };
      onAddStudent(newEst);
      onShowToast(`Estudiante '${newEst.nombre_completo}' registrado exitosamente`, 'person_add');
    } else {
      onAddGenericRow(tableName, data);
      onShowToast(`Fila insertada en tabla '${tableName}'`, 'done');
    }
  };

  // Paginated students
  const totalStudents = students.length;
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return students.slice(startIndex, startIndex + itemsPerPage);
  }, [students, currentPage]);

  const totalPages = Math.ceil(totalStudents / itemsPerPage) || 1;

  // Active table metadata
  const currentTableMeta = TABLE_METAS.find((t) => t.name === activeTable) || TABLE_METAS[4];

  return (
    <div className="w-full relative pb-16">
      {/* Subtle Ambient Header Glow (contained) */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="absolute -top-10 left-1/4 w-96 h-96 bg-[#516cdc]/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-20 right-10 w-80 h-80 bg-[#9e86ff]/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* Page Header & Metadata (Matching Image 3) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
          <div className="flex flex-col gap-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#e7deff] text-[#4b2fa6] text-xs font-bold tracking-wide">
                Schema Engine v2.4 · Motor InnoDB
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e4e7fd] text-[#3652c2] text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#3652c2] animate-pulse"></span>
                utf8mb4_general_ci
              </span>
              <button
                onClick={() => setViewMode(viewMode === 'cards' ? 'phpmyadmin' : 'cards')}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f3f2ff] hover:bg-[#dee1f7] text-[#171b2a] text-xs font-semibold border border-[#dee1f7] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px] text-[#634abf]">
                  {viewMode === 'cards' ? 'table_chart' : 'dashboard'}
                </span>
                <span>
                  {viewMode === 'cards' ? 'Ver Consola phpMyAdmin' : 'Ver Tarjetas Modulares'}
                </span>
              </button>
            </div>

            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[#171b2a] tracking-tight mt-1">
              Gestión y Módulos de Base de Datos A.B.A
            </h1>
            <p className="text-sm sm:text-base text-[#444653] leading-relaxed">
              Estructura relacional de 13 tablas InnoDB: roles, usuarios, estudiantes, contenidos de saberes y evaluaciones neuroeducativas con refuerzo positivo.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleOpenSqlDump}
              className="h-11 px-4 rounded-full bg-[#ebedff] hover:bg-[#dee1f7] text-[#171b2a] text-xs font-bold transition-all flex items-center gap-2 shadow-xs active:translate-y-0.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#3652c2]">download</span>
              <span>Exportar Respaldo SQL</span>
            </button>
            <button
              onClick={handleNewEntry}
              className="h-11 px-4 rounded-full bg-[#e4e7fd] hover:bg-[#e7deff] text-[#634abf] text-xs font-bold transition-all flex items-center gap-2 shadow-xs active:translate-y-0.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Nueva Entrada</span>
            </button>
            <button
              onClick={() => explorerRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="h-11 px-5 rounded-full bg-gradient-to-r from-[#516cdc] to-[#634abf] text-white text-xs font-bold shadow-[0_4px_16px_rgba(54,82,194,0.25)] hover:shadow-lg transition-all flex items-center gap-2 active:translate-y-0.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">account_tree</span>
              <span>Explorar Estructura</span>
            </button>
          </div>
        </div>

        {/* Top 4 Metric Chips Grid (Matching Image 3) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          {/* Metric 1 */}
          <div className="p-4 rounded-3xl bg-white shadow-[0_8px_24px_-4px_rgba(91,117,230,0.08)] border border-[#dee1f7]/60 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#dde1ff] flex items-center justify-center text-[#3652c2] shrink-0">
              <span className="material-symbols-outlined text-[28px]">table_chart</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading font-bold text-2xl text-[#171b2a] leading-tight">
                13 Tablas
              </span>
              <span className="text-xs text-[#444653] truncate">Tablas Activas & Mapeadas</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="p-4 rounded-3xl bg-white shadow-[0_8px_24px_-4px_rgba(91,117,230,0.08)] border border-[#dee1f7]/60 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#e7deff] flex items-center justify-center text-[#634abf] shrink-0">
              <span className="material-symbols-outlined text-[28px]">dataset</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading font-bold text-2xl text-[#171b2a] leading-tight">
                123 Registros
              </span>
              <span className="text-xs text-[#444653] truncate">Instancias neurocognitivas</span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="p-4 rounded-3xl bg-white shadow-[0_8px_24px_-4px_rgba(91,117,230,0.08)] border border-[#dee1f7]/60 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#f4d9ff] flex items-center justify-center text-[#8237b1] shrink-0">
              <span className="material-symbols-outlined text-[28px]">memory</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading font-bold text-2xl text-[#171b2a] leading-tight">
                InnoDB
              </span>
              <span className="text-xs text-[#444653] truncate">Foreign Keys & ACID compliant</span>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="p-4 rounded-3xl bg-white shadow-[0_8px_24px_-4px_rgba(91,117,230,0.08)] border border-[#dee1f7]/60 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#e4e7fd] flex items-center justify-center text-[#3652c2] shrink-0">
              <span className="material-symbols-outlined filled text-[28px]">verified_user</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading font-bold text-lg text-[#3652c2] leading-tight">
                Conectado & Seguro
              </span>
              <span className="text-xs text-[#444653] truncate">Protegido por Roles ABA</span>
            </div>
          </div>
        </div>

        {/* Search & Quick Filter Toolbar */}
        <div className="mt-6 p-4 rounded-2xl bg-[#f3f2ff] border border-[#dee1f7]/80 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#757685] text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtrar tablas (ej. estudiante, saber, puntaje)..."
              className="w-full h-11 pl-11 pr-4 rounded-full bg-white text-xs sm:text-sm text-[#171b2a] placeholder:text-[#757685] border border-[#dee1f7] focus:outline-none focus:ring-2 focus:ring-[#3652c2]/30 transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            <button
              onClick={() => setSelectedGroup('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedGroup === 'all'
                  ? 'bg-[#3652c2] text-white shadow-sm'
                  : 'bg-white text-[#444653] hover:text-[#171b2a]'
              }`}
            >
              Todas (13)
            </button>
            <button
              onClick={() => setSelectedGroup('security')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedGroup === 'security'
                  ? 'bg-[#3652c2] text-white shadow-sm'
                  : 'bg-white text-[#444653] hover:text-[#171b2a]'
              }`}
            >
              Usuarios & Seguridad (4)
            </button>
            <button
              onClick={() => setSelectedGroup('students')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedGroup === 'students'
                  ? 'bg-[#3652c2] text-white shadow-sm'
                  : 'bg-white text-[#444653] hover:text-[#171b2a]'
              }`}
            >
              Estudiantes & Grados (2)
            </button>
            <button
              onClick={() => setSelectedGroup('content')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedGroup === 'content'
                  ? 'bg-[#3652c2] text-white shadow-sm'
                  : 'bg-white text-[#444653] hover:text-[#171b2a]'
              }`}
            >
              Saberes & Media (2)
            </button>
            <button
              onClick={() => setSelectedGroup('evaluation')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedGroup === 'evaluation'
                  ? 'bg-[#3652c2] text-white shadow-sm'
                  : 'bg-white text-[#444653] hover:text-[#171b2a]'
              }`}
            >
              Evaluaciones & Puntajes (5)
            </button>
          </div>
        </div>

        {/* SECTION: Relational Visual Architecture Map (Matching Image 3) */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-white shadow-[0_8px_24px_-4px_rgba(91,117,230,0.08)] border border-[#dee1f7]/80 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#e7deff] flex items-center justify-center text-[#634abf]">
                <span className="material-symbols-outlined text-[22px]">hub</span>
              </div>
              <div>
                <h2 className="font-heading font-bold text-lg sm:text-xl text-[#171b2a] leading-tight">
                  Mapa Relacional y Flujo Pedagógico ABA
                </h2>
                <p className="text-xs text-[#444653]">
                  Trazabilidad completa desde la credencial del usuario hasta el refuerzo neurocognitivo acumulativo.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#634abf] bg-[#e7deff]/70 px-3 py-1 rounded-full self-start sm:self-auto">
              Integridad Referencial 1:N & N:1
            </span>
          </div>

          {/* Interactive Pipeline Map with 7 steps */}
          <div className="overflow-x-auto py-2">
            <div className="min-w-[840px] flex items-center justify-between gap-2 px-2">
              {/* Step 1: Auth */}
              <button
                onClick={() => handleExamineTable('usuario')}
                className="flex flex-col items-center gap-2 flex-1 group text-left cursor-pointer"
              >
                <div className="w-full p-3 rounded-2xl bg-[#ebedff] text-center shadow-xs border border-[#dee1f7]/60 group-hover:bg-[#dde1ff] transition-all">
                  <span className="text-xs text-[#3652c2] font-bold">1. Autenticación</span>
                  <p className="text-xs text-[#171b2a] font-bold mt-0.5">usuario</p>
                  <span className="text-[11px] text-[#444653]">id_usuario · hash</span>
                </div>
                <span className="material-symbols-outlined text-[#634abf] text-[18px]">
                  keyboard_double_arrow_right
                </span>
              </button>

              {/* Step 2: Role */}
              <button
                onClick={() => handleExamineTable('rol')}
                className="flex flex-col items-center gap-2 flex-1 group text-left cursor-pointer"
              >
                <div className="w-full p-3 rounded-2xl bg-[#e7deff]/60 text-center shadow-xs border border-[#dee1f7]/60 group-hover:bg-[#cbbeff]/70 transition-all">
                  <span className="text-xs text-[#634abf] font-bold">2. Permisos</span>
                  <p className="text-xs text-[#171b2a] font-bold mt-0.5">rol</p>
                  <span className="text-[11px] text-[#444653]">Admin | Profe | Alumno</span>
                </div>
                <span className="material-symbols-outlined text-[#634abf] text-[18px]">
                  keyboard_double_arrow_right
                </span>
              </button>

              {/* Step 3: Student */}
              <button
                onClick={() => handleExamineTable('estudiante')}
                className="flex flex-col items-center gap-2 flex-1 group text-left cursor-pointer"
              >
                <div className="w-full p-3 rounded-2xl bg-[#dde1ff]/70 text-center shadow-xs border border-[#dee1f7]/60 group-hover:bg-[#b8c3ff]/80 transition-all ring-2 ring-[#3652c2]/20">
                  <span className="text-xs text-[#3652c2] font-bold">3. Sujeto / Perfil</span>
                  <p className="text-xs text-[#171b2a] font-bold mt-0.5">estudiante</p>
                  <span className="text-[11px] text-[#444653]">Perfil sensorial</span>
                </div>
                <span className="material-symbols-outlined text-[#634abf] text-[18px]">
                  keyboard_double_arrow_right
                </span>
              </button>

              {/* Step 4: Level */}
              <button
                onClick={() => handleExamineTable('grado')}
                className="flex flex-col items-center gap-2 flex-1 group text-left cursor-pointer"
              >
                <div className="w-full p-3 rounded-2xl bg-[#ebedff] text-center shadow-xs border border-[#dee1f7]/60 group-hover:bg-[#dde1ff] transition-all">
                  <span className="text-xs text-[#3652c2] font-bold">4. Nivel</span>
                  <p className="text-xs text-[#171b2a] font-bold mt-0.5">grado & saber</p>
                  <span className="text-[11px] text-[#444653]">Módulos adaptados</span>
                </div>
                <span className="material-symbols-outlined text-[#634abf] text-[18px]">
                  keyboard_double_arrow_right
                </span>
              </button>

              {/* Step 5: Mission */}
              <button
                onClick={() => handleExamineTable('evaluacion')}
                className="flex flex-col items-center gap-2 flex-1 group text-left cursor-pointer"
              >
                <div className="w-full p-3 rounded-2xl bg-[#f4d9ff]/60 text-center shadow-xs border border-[#dee1f7]/60 group-hover:bg-[#e5b4ff]/70 transition-all">
                  <span className="text-xs text-[#8237b1] font-bold">5. Ensayo ABA</span>
                  <p className="text-xs text-[#171b2a] font-bold mt-0.5">evaluacion</p>
                  <span className="text-[11px] text-[#444653]">video + ensayo</span>
                </div>
                <span className="material-symbols-outlined text-[#634abf] text-[18px]">
                  keyboard_double_arrow_right
                </span>
              </button>

              {/* Step 6: Feedback */}
              <button
                onClick={() => handleExamineTable('respuestas')}
                className="flex flex-col items-center gap-2 flex-1 group text-left cursor-pointer"
              >
                <div className="w-full p-3 rounded-2xl bg-[#e4e7fd] text-center shadow-xs border border-[#dee1f7]/60 group-hover:bg-[#dee1f7] transition-all">
                  <span className="text-xs text-[#3652c2] font-bold">6. Feedback</span>
                  <p className="text-xs text-[#171b2a] font-bold mt-0.5">respuestas</p>
                  <span className="text-[11px] text-[#444653]">correcta / incorrecta</span>
                </div>
                <span className="material-symbols-outlined text-[#634abf] text-[18px]">
                  keyboard_double_arrow_right
                </span>
              </button>

              {/* Step 7: Reinforcement */}
              <button
                onClick={() => handleExamineTable('puntaje')}
                className="flex flex-col items-center gap-2 flex-1 group text-left cursor-pointer"
              >
                <div className="w-full p-3 rounded-2xl bg-gradient-to-br from-[#e7deff] to-[#dde1ff] text-center shadow-xs border border-[#dee1f7]/60 group-hover:from-[#cbbeff] group-hover:to-[#b8c3ff] transition-all">
                  <span className="text-xs text-[#1e0061] font-bold">7. Refuerzo</span>
                  <p className="text-xs text-[#171b2a] font-bold mt-0.5">puntaje</p>
                  <span className="text-[11px] text-[#444653]">Estrellas & Gemas</span>
                </div>
                <span className="material-symbols-outlined filled text-[#3652c2] text-[18px]">
                  star
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* VIEW MODE 1: Modular Cards (Matching Image 3) */}
        {viewMode === 'cards' && (
          <div className="mt-10 flex flex-col gap-10">
            <div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#171b2a]">
                Estructura Modular de las 13 Tablas
              </h2>
              <p className="text-sm text-[#444653]">
                Consulta por categorías funcionales, conteo de filas, claves foráneas y acciones de mantenimiento.
              </p>
            </div>

            {/* Grupo A: Usuarios, Roles y Seguridad */}
            {groupA.length > 0 && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#dee1f7]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#dde1ff] flex items-center justify-center text-[#3652c2]">
                      <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-[#171b2a]">
                      Grupo A: Usuarios, Roles y Seguridad
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#3652c2]/10 text-[#3652c2] text-xs font-bold">
                      {groupA.length} tablas
                    </span>
                  </div>
                  <span className="text-xs text-[#444653] hidden sm:inline">
                    Control RBAC & Privilegios Terapéuticos
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {groupA.map((table) => (
                    <TableCard
                      key={table.name}
                      table={table}
                      isActive={activeTable === table.name}
                      onExamine={() => handleExamineTable(table.name)}
                      onViewStructure={() => handleOpenStructure(table.name)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Grupo B: Estudiantes y Grados de Desarrollo */}
            {groupB.length > 0 && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#dee1f7]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#e7deff] flex items-center justify-center text-[#634abf]">
                      <span className="material-symbols-outlined text-[16px]">child_care</span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-[#171b2a]">
                      Grupo B: Estudiantes y Grados de Desarrollo
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#634abf]/10 text-[#634abf] text-xs font-bold">
                      {groupB.length} tablas
                    </span>
                  </div>
                  <span className="text-xs text-[#444653] hidden sm:inline">
                    Adaptación Individualizada Neurocognitiva
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupB.map((table) => (
                    <TableCard
                      key={table.name}
                      table={table}
                      isActive={activeTable === table.name}
                      isHighlight={table.name === 'estudiante'}
                      onExamine={() => handleExamineTable(table.name)}
                      onViewStructure={() => handleOpenStructure(table.name)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Grupo C: Contenido Educativo & Multimedia */}
            {groupC.length > 0 && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#dee1f7]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#f4d9ff] flex items-center justify-center text-[#8237b1]">
                      <span className="material-symbols-outlined text-[16px]">menu_book</span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-[#171b2a]">
                      Grupo C: Contenido Educativo & Multimedia
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#8237b1]/10 text-[#8237b1] text-xs font-bold">
                      {groupC.length} tablas
                    </span>
                  </div>
                  <span className="text-xs text-[#444653] hidden sm:inline">
                    Estímulos Sensoriales & Áreas del Saber
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupC.map((table) => (
                    <TableCard
                      key={table.name}
                      table={table}
                      isActive={activeTable === table.name}
                      onExamine={() => handleExamineTable(table.name)}
                      onViewStructure={() => handleOpenStructure(table.name)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Grupo D: Evaluaciones, Respuestas y Métricas */}
            {groupD.length > 0 && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#dee1f7]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#e7deff] flex items-center justify-center text-[#634abf]">
                      <span className="material-symbols-outlined text-[16px]">stars</span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-[#171b2a]">
                      Grupo D: Evaluaciones, Respuestas y Métricas
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#634abf]/10 text-[#634abf] text-xs font-bold">
                      {groupD.length} tablas
                    </span>
                  </div>
                  <span className="text-xs text-[#444653] hidden sm:inline">
                    Ensayos Discretos & Refuerzo Positivo
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {groupD.map((table) => (
                    <TableCard
                      key={table.name}
                      table={table}
                      isActive={activeTable === table.name}
                      compact={true}
                      onExamine={() => handleExamineTable(table.name)}
                      onViewStructure={() => handleOpenStructure(table.name)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW MODE 2: phpMyAdmin Console View (Matching Image 5) */}
        {viewMode === 'phpmyadmin' && (
          <div className="mt-8 p-6 rounded-3xl bg-white shadow-lg border border-[#dee1f7] overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#dee1f7]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3652c2]">database</span>
                <span className="font-bold text-base text-[#171b2a]">
                  Consola de Tablas phpMyAdmin / MySQL (13 Tablas Activas)
                </span>
              </div>
              <span className="text-xs text-[#757685] font-mono">
                Cotejamiento general: utf8mb4_general_ci
              </span>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead>
                  <tr className="bg-[#f3f2ff] text-[#444653] font-bold border-b border-[#dee1f7]">
                    <th className="py-2.5 px-3 w-8">
                      <input type="checkbox" className="rounded" />
                    </th>
                    <th className="py-2.5 px-3">Table</th>
                    <th className="py-2.5 px-3">Action</th>
                    <th className="py-2.5 px-3 text-right">Rows</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Collation</th>
                    <th className="py-2.5 px-3 text-right">Size</th>
                    <th className="py-2.5 px-3 text-center">Overhead</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ebedff]">
                  {TABLE_METAS.map((t) => (
                    <tr
                      key={t.name}
                      className={`hover:bg-[#f3f2ff]/60 transition-colors ${
                        activeTable === t.name ? 'bg-[#dde1ff]/40' : ''
                      }`}
                    >
                      <td className="py-2 px-3">
                        <input type="checkbox" className="rounded" />
                      </td>
                      <td className="py-2 px-3">
                        <button
                          onClick={() => handleExamineTable(t.name)}
                          className="font-bold text-[#3652c2] hover:underline font-mono cursor-pointer"
                        >
                          {t.name}
                        </button>
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2 text-[11px] text-[#634abf]">
                          <button
                            onClick={() => handleExamineTable(t.name)}
                            className="hover:underline flex items-center gap-0.5 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[13px]">view_timeline</span>
                            Browse
                          </button>
                          <button
                            onClick={() => handleOpenStructure(t.name)}
                            className="hover:underline flex items-center gap-0.5 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[13px]">structure</span>
                            Structure
                          </button>
                          <button
                            onClick={() => {
                              setActiveTable(t.name);
                              setIsInsertModalOpen(true);
                            }}
                            className="hover:underline flex items-center gap-0.5 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[13px]">add</span>
                            Insert
                          </button>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-semibold">
                        {t.name === 'estudiante' ? students.length : t.rowCount}
                      </td>
                      <td className="py-2 px-3 font-mono text-[#444653]">InnoDB</td>
                      <td className="py-2 px-3 font-mono text-[#757685]">utf8mb4_general_ci</td>
                      <td className="py-2 px-3 text-right font-mono text-[#3652c2] font-semibold">
                        {t.size}
                      </td>
                      <td className="py-2 px-3 text-center text-[#757685] font-mono">-</td>
                    </tr>
                  ))}
                  {/* Summary row matching Image 5 */}
                  <tr className="bg-[#f3f2ff] font-bold text-xs border-t-2 border-[#dee1f7]">
                    <td className="py-2.5 px-3"></td>
                    <td className="py-2.5 px-3 font-mono">13 tables</td>
                    <td className="py-2.5 px-3 text-[#171b2a]">Sum</td>
                    <td className="py-2.5 px-3 text-right font-mono">123</td>
                    <td className="py-2.5 px-3 font-mono">InnoDB</td>
                    <td className="py-2.5 px-3 font-mono">utf8mb4_general_ci</td>
                    <td className="py-2.5 px-3 text-right font-mono text-[#3652c2]">480.0 KiB</td>
                    <td className="py-2.5 px-3 text-center font-mono">0 B</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION: DETAILED LIVE TABLE EXPLORER (Exact Match Image 3) */}
        <div
          ref={explorerRef}
          id="live-explorer-section"
          className="mt-12 p-6 sm:p-8 rounded-3xl bg-white shadow-[0_12px_32px_-4px_rgba(137,113,232,0.12)] border border-[#dee1f7] flex flex-col gap-6 scroll-mt-24"
        >
          {/* Explorer Header Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#e7deff] flex items-center justify-center text-[#634abf]">
                <span className="material-symbols-outlined text-[26px]">view_timeline</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#3652c2] uppercase font-bold tracking-wider">
                    Explorador de Datos
                  </span>
                  <div className="relative inline-block">
                    <select
                      value={activeTable}
                      onChange={(e) => {
                        setActiveTable(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="px-2.5 py-0.5 rounded-full bg-[#dde1ff] text-[#001355] text-xs font-bold border-none outline-none cursor-pointer"
                    >
                      {TABLE_METAS.map((t) => (
                        <option key={t.name} value={t.name}>
                          Tabla: {t.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#171b2a] leading-tight mt-0.5">
                  {activeTable === 'estudiante'
                    ? 'Registros Clínicos & Adaptaciones ABA'
                    : `Registros de la Tabla \`${activeTable}\``}
                </h3>
              </div>
            </div>

            {/* CRUD Actions & Operations */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() =>
                  onShowToast('Filtro por canal sensorial y criterios ABA aplicado', 'filter_alt')
                }
                className="px-4 py-2 rounded-full bg-[#ebedff] hover:bg-[#dee1f7] text-[#171b2a] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-[#3652c2]">filter_list</span>
                <span>Filtro Avanzado</span>
              </button>
              <button
                onClick={handleNewEntry}
                className="px-4 py-2 rounded-full bg-[#e7deff] text-[#340e90] hover:bg-[#cbbeff] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>Insertar Fila</span>
              </button>
              <button
                onClick={() => handleOpenStructure(activeTable)}
                className="px-4 py-2 rounded-full bg-[#e4e7fd] hover:bg-[#dee1f7] text-[#171b2a] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-[#634abf]">code</span>
                <span>Estructura SQL</span>
              </button>
            </div>
          </div>

          {/* Live Data Table Container */}
          {activeTable === 'estudiante' ? (
            <div className="overflow-x-auto rounded-2xl bg-[#f3f2ff]/80 p-2 border border-[#dee1f7]/60">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[#444653] text-xs font-bold border-b border-[#dee1f7]">
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Estudiante / Nombre</th>
                    <th className="py-3 px-4">Grado Asignado</th>
                    <th className="py-3 px-4">Perfil Sensorial ABA</th>
                    <th className="py-3 px-4">Puntaje / Estrellas</th>
                    <th className="py-3 px-4">Tutor / Profesor</th>
                    <th className="py-3 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dee1f7]/60 text-xs sm:text-sm text-[#171b2a]">
                  {paginatedStudents.map((student) => {
                    const initials = student.nombre_completo
                      .split(' ')
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join('');

                    const sensoryIcon =
                      student.canal_sensorial === 'Preferencia Visual'
                        ? 'visibility'
                        : student.canal_sensorial === 'Canal Auditivo'
                        ? 'volume_up'
                        : 'touch_app';

                    const sensoryBadgeBg =
                      student.canal_sensorial === 'Preferencia Visual'
                        ? 'bg-[#e7deff] text-[#340e90]'
                        : student.canal_sensorial === 'Canal Auditivo'
                        ? 'bg-[#f4d9ff] text-[#6b1b9a]'
                        : 'bg-[#dde1ff] text-[#1a3aab]';

                    const avatarBg =
                      student.id_estudiante % 3 === 1
                        ? 'bg-[#dde1ff] text-[#3652c2]'
                        : student.id_estudiante % 3 === 2
                        ? 'bg-[#f4d9ff] text-[#8237b1]'
                        : 'bg-[#e7deff] text-[#634abf]';

                    const percentage = Math.min(Math.round((student.puntaje_acumulado / 250) * 100), 100);

                    return (
                      <tr key={student.id_estudiante} className="hover:bg-white/80 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-[#3652c2] font-mono">
                          #EST-0{student.id_estudiante}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-full ${avatarBg} flex items-center justify-center font-bold text-xs`}>
                              {initials}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-[#171b2a]">
                                {student.nombre_completo}
                              </span>
                              <span className="text-[11px] text-[#444653]">
                                {student.edad} años · {student.diagnostico}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full bg-[#ebedff] text-xs font-semibold text-[#171b2a]">
                            Grado {student.id_grado}: {student.id_grado === 1 ? 'Inicial' : student.id_grado === 2 ? 'Fonemas' : 'Conteo'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${sensoryBadgeBg}`}>
                            <span className="material-symbols-outlined text-[14px]">
                              {sensoryIcon}
                            </span>
                            {student.canal_sensorial}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center text-[#634abf] font-bold text-xs gap-0.5">
                              <span className="material-symbols-outlined filled text-[16px]">
                                star
                              </span>
                              {student.puntaje_acumulado} pts
                            </div>
                            <div className="w-16 h-2 rounded-full bg-[#dee1f7] overflow-hidden">
                              <div
                                className="h-full bg-[#634abf] rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-[#444653] font-medium">
                          {student.profesor_asignado}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1">
                            <button
                              onClick={() => {
                                const newName = prompt('Editar nombre del alumno:', student.nombre_completo);
                                if (newName) {
                                  onUpdateStudent({ ...student, nombre_completo: newName });
                                  onShowToast(`Registro #EST-0${student.id_estudiante} actualizado`, 'edit');
                                }
                              }}
                              className="w-8 h-8 rounded-full hover:bg-[#e4e7fd] flex items-center justify-center text-[#3652c2] transition-colors cursor-pointer"
                              title="Editar"
                            >
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </button>
                            <button
                              onClick={() =>
                                onShowToast(
                                  `Historial ABA: ${student.nombre_completo} cuenta con 142 ensayos y 88% de maestría`,
                                  'history_edu'
                                )
                              }
                              className="w-8 h-8 rounded-full hover:bg-[#e7deff] flex items-center justify-center text-[#634abf] transition-colors cursor-pointer"
                              title="Ver Historial ABA"
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                history_edu
                              </span>
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`¿Eliminar al estudiante ${student.nombre_completo}?`)) {
                                  onDeleteStudent(student.id_estudiante);
                                  onShowToast('Fila eliminada de la tabla estudiante', 'delete');
                                }
                              }}
                              className="w-8 h-8 rounded-full hover:bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a] transition-colors cursor-pointer"
                              title="Borrar Fila"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            /* Generic Data Viewer for other 12 tables */
            <div className="overflow-x-auto rounded-2xl bg-[#f3f2ff]/80 p-2 border border-[#dee1f7]/60">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="text-[#444653] font-bold border-b border-[#dee1f7]">
                    {Object.keys((allTableData[activeTable] && allTableData[activeTable][0]) || { id: 1, nombre: 'Registro', descripcion: 'Info' }).map((col) => (
                      <th key={col} className="py-2.5 px-3 font-mono">
                        {col}
                      </th>
                    ))}
                    <th className="py-2.5 px-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dee1f7]/60">
                  {((allTableData[activeTable] && allTableData[activeTable]) || []).map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/80 transition-colors">
                      {Object.values(row).map((val: any, cIdx) => (
                        <td key={cIdx} className="py-2.5 px-3 font-mono text-[#171b2a]">
                          {typeof val === 'boolean' ? (
                            val ? (
                              <span className="px-2 py-0.5 rounded bg-[#dde1ff] text-[#3652c2] font-bold">
                                true
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-[#ffdad6] text-[#ba1a1a] font-bold">
                                false
                              </span>
                            )
                          ) : (
                            String(val)
                          )}
                        </td>
                      ))}
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => onShowToast(`Registro inspeccionado en ${activeTable}`, 'info')}
                          className="px-2 py-1 rounded bg-white text-[#3652c2] hover:bg-[#dde1ff] font-semibold cursor-pointer"
                        >
                          Ver
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination & Table Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <span className="text-xs text-[#444653]">
              Mostrando <strong>{activeTable === 'estudiante' ? paginatedStudents.length : ((allTableData[activeTable]?.length) || 0)}</strong> de{' '}
              <strong>{activeTable === 'estudiante' ? totalStudents : currentTableMeta.rowCount}</strong> registros · Cobertura 100% evaluada
            </span>

            {activeTable === 'estudiante' && (
              <div className="flex items-center gap-1 self-end sm:self-auto">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="w-9 h-9 rounded-full bg-[#ebedff] flex items-center justify-center text-[#444653] hover:bg-[#dee1f7] disabled:opacity-40 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-9 h-9 rounded-full text-xs font-bold flex items-center justify-center cursor-pointer transition-colors ${
                      currentPage === i + 1
                        ? 'bg-[#3652c2] text-white shadow-xs'
                        : 'bg-[#ebedff] text-[#444653] hover:bg-[#dee1f7]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="w-9 h-9 rounded-full bg-[#ebedff] flex items-center justify-center text-[#444653] hover:bg-[#dee1f7] disabled:opacity-40 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SQL Modals */}
      <SqlModal
        isOpen={isSqlModalOpen}
        onClose={() => setIsSqlModalOpen(false)}
        tableName={sqlModalTable}
        onShowToast={onShowToast}
      />

      <TableStructureModal
        isOpen={isStructureModalOpen}
        onClose={() => setIsStructureModalOpen(false)}
        tableName={sqlModalTable || activeTable}
      />

      <InsertRowModal
        isOpen={isInsertModalOpen}
        onClose={() => setIsInsertModalOpen(false)}
        tableName={activeTable}
        onInsert={handleInsertRow}
      />
    </div>
  );
};

// Subcomponent: Table Card matching Image 3 visual design
interface TableCardProps {
  table: TableMeta;
  isActive: boolean;
  isHighlight?: boolean;
  compact?: boolean;
  onExamine: () => void;
  onViewStructure: () => void;
}

const TableCard: React.FC<TableCardProps> = ({
  table,
  isActive,
  isHighlight,
  compact,
  onExamine,
  onViewStructure
}) => {
  const accentColor =
    table.group === 'security'
      ? 'text-[#3652c2]'
      : table.group === 'students'
      ? 'text-[#634abf]'
      : table.group === 'content'
      ? 'text-[#8237b1]'
      : 'text-[#3652c2]';

  return (
    <div
      className={`p-5 rounded-3xl bg-white shadow-[0_8px_24px_-4px_rgba(91,117,230,0.06)] hover:shadow-md transition-all flex flex-col justify-between border ${
        isActive ? 'border-[#3652c2] ring-2 ring-[#3652c2]/20' : 'border-[#dee1f7]/60'
      }`}
    >
      <div>
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${accentColor}`}>
              {table.kicker}
            </span>
            <h4 className="font-heading font-bold text-lg text-[#171b2a] mt-0.5">
              {table.name}
            </h4>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#ebedff] text-xs font-semibold text-[#444653]">
            {table.rowCount} {table.name === 'estudiante' ? 'alumnos' : table.name === 'grado' ? 'niveles' : 'filas'}
          </span>
        </div>

        <p className="text-xs text-[#444653] mt-2 leading-relaxed">
          {table.description}
        </p>

        {!compact ? (
          <div className="mt-4 p-2.5 rounded-2xl bg-[#f3f2ff] text-[11px] text-[#444653] flex flex-col gap-1">
            <div>
              <strong className="text-[#171b2a]">PK:</strong> {table.pk}
            </div>
            <div>
              <strong className="text-[#171b2a]">FK:</strong> {table.fk}
            </div>
          </div>
        ) : (
          <div className="mt-3 p-1.5 rounded-xl bg-[#f3f2ff] text-[10px] text-[#444653] flex flex-col gap-0.5">
            <div><strong>PK:</strong> {table.pk}</div>
            <div><strong>FK:</strong> {table.fk}</div>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 flex items-center justify-between border-t border-[#ebedff]">
        <span className="text-xs text-[#634abf] font-medium font-mono">
          InnoDB · {table.size}
        </span>
        <button
          onClick={onExamine}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            isHighlight
              ? 'bg-[#634abf] text-white hover:bg-[#523da1]'
              : 'bg-[#dde1ff] text-[#3652c2] hover:bg-[#3652c2] hover:text-white'
          }`}
        >
          {isHighlight ? 'Ver Datos en Vivo' : 'Examinar'}
        </button>
      </div>
    </div>
  );
};
