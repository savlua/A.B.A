import { useState, useEffect } from 'react';
import { Navbar, AppScreen } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { DatabaseScreen } from './components/screens/DatabaseScreen';
import { AdventureWorldScreen } from './components/screens/AdventureWorldScreen';
import { InteractiveMissionScreen } from './components/screens/InteractiveMissionScreen';
import { RewardChestScreen } from './components/screens/RewardChestScreen';
import { ParentZoneScreen } from './components/screens/ParentZoneScreen';
import {
  INITIAL_ESTUDIANTES,
  INITIAL_USUARIOS,
  INITIAL_ROLES,
  INITIAL_ADMINS,
  INITIAL_PROFESORES,
  INITIAL_GRADOS,
  INITIAL_SABERES,
  INITIAL_VIDEOS,
  INITIAL_EVALUACIONES,
  INITIAL_RESPUESTAS,
  INITIAL_RESPUESTAS_CORRECTAS,
  INITIAL_RESPUESTAS_INCORRECTAS,
  INITIAL_PUNTAJES
} from './data/mockDatabase';
import { EstudianteTable } from './types/database';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('inicio');
  const [sensoryMode, setSensoryMode] = useState<boolean>(false);
  const [activeUser, setActiveUser] = useState({
    name: 'Prof. Mariana R.',
    roleLabel: 'Especialista ABA'
  });

  // Global database state for all 13 tables
  const [students, setStudents] = useState<EstudianteTable[]>(INITIAL_ESTUDIANTES);
  const [starsCount, setStarsCount] = useState<number>(145);
  const [gemsCount, setGemsCount] = useState<number>(42);

  const [allTableData, setAllTableData] = useState<Record<string, any[]>>({
    usuario: INITIAL_USUARIOS,
    rol: INITIAL_ROLES,
    administrador: INITIAL_ADMINS,
    profesor: INITIAL_PROFESORES,
    grado: INITIAL_GRADOS,
    estudiante: INITIAL_ESTUDIANTES,
    saber: INITIAL_SABERES,
    video: INITIAL_VIDEOS,
    evaluacion: INITIAL_EVALUACIONES,
    respuestas: INITIAL_RESPUESTAS,
    respuesta_correcta: INITIAL_RESPUESTAS_CORRECTAS,
    respuesta_incorrecta: INITIAL_RESPUESTAS_INCORRECTAS,
    puntaje: INITIAL_PUNTAJES
  });

  // Toast notification management
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (text: string, icon = 'info') => {
    const newToast: ToastMessage = {
      id: `${Date.now()}-${Math.random()}`,
      text,
      icon
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 3200);
  };

  // Toggle sensory calm mode
  const handleToggleSensory = () => {
    const next = !sensoryMode;
    setSensoryMode(next);
    if (next) {
      document.body.classList.add('sensory-calm');
      showToast('Modo Sensorial Activado: Colores atenuados y animaciones pausadas', 'spa');
    } else {
      document.body.classList.remove('sensory-calm');
      showToast('Modo Estándar Restaurado', 'visibility');
    }
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove('sensory-calm');
    };
  }, []);

  // Student CRUD handlers
  const handleAddStudent = (newStudent: EstudianteTable) => {
    setStudents((prev) => [newStudent, ...prev]);
    setAllTableData((prev) => ({
      ...prev,
      estudiante: [newStudent, ...prev.estudiante]
    }));
  };

  const handleDeleteStudent = (id: number) => {
    setStudents((prev) => prev.filter((s) => s.id_estudiante !== id));
    setAllTableData((prev) => ({
      ...prev,
      estudiante: prev.estudiante.filter((s: EstudianteTable) => s.id_estudiante !== id)
    }));
  };

  const handleUpdateStudent = (updatedStudent: EstudianteTable) => {
    setStudents((prev) =>
      prev.map((s) => (s.id_estudiante === updatedStudent.id_estudiante ? updatedStudent : s))
    );
    setAllTableData((prev) => ({
      ...prev,
      estudiante: prev.estudiante.map((s: EstudianteTable) =>
        s.id_estudiante === updatedStudent.id_estudiante ? updatedStudent : s
      )
    }));
  };

  const handleAddGenericRow = (table: string, row: any) => {
    setAllTableData((prev) => ({
      ...prev,
      [table]: [row, ...(prev[table] || [])]
    }));
  };

  // Live recording of ABA trials into database
  const handleRecordTrial = (isCorrect: boolean, latency: number) => {
    const newAnswer = {
      id_respuesta: (allTableData.respuestas?.length || 0) + 1,
      id_eval: 1,
      id_estudiante: 1,
      latencia_segundos: latency,
      es_correcta: isCorrect,
      fecha_registro: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    setAllTableData((prev) => ({
      ...prev,
      respuestas: [newAnswer, ...(prev.respuestas || [])]
    }));

    if (isCorrect) {
      setStarsCount((prev) => prev + 1);
      setGemsCount((prev) => prev + 5);

      const newCorrect = {
        id_resp_correcta: (allTableData.respuesta_correcta?.length || 0) + 1,
        id_respuesta: newAnswer.id_respuesta,
        animacion_refuerzo: 'Lluvia de Estrellas',
        gemas_otorgadas: 5
      };

      setAllTableData((prev) => ({
        ...prev,
        respuesta_correcta: [newCorrect, ...(prev.respuesta_correcta || [])]
      }));

      showToast(`Ensayo registrado en 'respuestas' · Latencia: ${latency}s (+5 gemas)`, 'celebration');
    } else {
      const newIncorrect = {
        id_resp_incorrecta: (allTableData.respuesta_incorrecta?.length || 0) + 1,
        id_respuesta: newAnswer.id_respuesta,
        estrategia_apoyo: 'Atenuación suave sin frustración',
        sin_frustracion: true
      };

      setAllTableData((prev) => ({
        ...prev,
        respuesta_incorrecta: [newIncorrect, ...(prev.respuesta_incorrecta || [])]
      }));

      showToast(`Ensayo registrado en 'respuesta_incorrecta' (Ajuste suave)`, 'psychology');
    }
  };

  const handleRedeemReward = (cost: number, name: string) => {
    setGemsCount((prev) => Math.max(0, prev - cost));
    showToast(`Canjeado: ${name}`, 'redeem');
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#171b2a] flex flex-col font-sans selection:bg-[#e7deff] selection:text-[#340e90]">
      {/* Fixed Header Navigation */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        sensoryMode={sensoryMode}
        onToggleSensory={handleToggleSensory}
        activeUser={activeUser}
        onSwitchUser={setActiveUser}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 w-full pt-20">
        {currentScreen === 'inicio' && (
          <WelcomeScreen
            onNavigate={setCurrentScreen}
            onSetUser={setActiveUser}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'gestion-bd' && (
          <DatabaseScreen
            onShowToast={showToast}
            students={students}
            onAddStudent={handleAddStudent}
            onDeleteStudent={handleDeleteStudent}
            onUpdateStudent={handleUpdateStudent}
            allTableData={allTableData}
            onAddGenericRow={handleAddGenericRow}
          />
        )}

        {currentScreen === 'mundo-aventura' && (
          <AdventureWorldScreen
            onNavigate={setCurrentScreen}
            starsCount={starsCount}
            gemsCount={gemsCount}
          />
        )}

        {currentScreen === 'mision-interactiva' && (
          <InteractiveMissionScreen
            onNavigate={setCurrentScreen}
            onRecordTrial={handleRecordTrial}
            starsCount={starsCount}
            gemsCount={gemsCount}
          />
        )}

        {currentScreen === 'cofre-recompensas' && (
          <RewardChestScreen
            onNavigate={setCurrentScreen}
            starsCount={starsCount}
            gemsCount={gemsCount}
            onRedeemReward={handleRedeemReward}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'zona-padres' && (
          <ParentZoneScreen
            students={students}
            onNavigate={setCurrentScreen}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() =>
          showToast(
            'Privacidad Sensorial: Cumplimiento estricto COPPA sin rastreo comercial ni telemetría invasiva.',
            'security'
          )
        }
        onOpenGuide={() =>
          showToast(
            'Guía para Familias: Los ensayos ABA se basan en refuerzo positivo y economía de fichas.',
            'menu_book'
          )
        }
        onOpenSupport={() =>
          showToast('Soporte Clínico ABA: Contacta a supervisión clínica en clinica@abaclinic.org', 'support_agent')
        }
      />

      {/* Toast Notification Stack */}
      <ToastContainer toasts={toasts} />
    </div>
  );
}
