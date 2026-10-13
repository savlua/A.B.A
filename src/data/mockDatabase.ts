import {
  RolTable,
  UsuarioTable,
  AdministradorTable,
  ProfesorTable,
  GradoTable,
  EstudianteTable,
  SaberTable,
  VideoTable,
  EvaluacionTable,
  RespuestasTable,
  RespuestaCorrectaTable,
  RespuestaIncorrectaTable,
  PuntajeTable,
  TableMeta
} from '../types/database';

export const TABLE_METAS: TableMeta[] = [
  // Grupo A: Usuarios, Roles y Seguridad (4)
  {
    name: 'usuario',
    group: 'security',
    groupName: 'Grupo A: Usuarios, Roles y Seguridad',
    kicker: 'TABLA BASE',
    rowCount: 48,
    size: '16 KB',
    pk: 'id_usuario (INT AUTO_INCREMENT)',
    fk: 'id_rol → rol.id_rol',
    fields: 'id_usuario, id_rol, nombre, email, password_hash, activo, ultimo_acceso',
    description: 'Cuentas, credenciales cifradas (bcrypt), tokens de sesión y estados de activación.'
  },
  {
    name: 'rol',
    group: 'security',
    groupName: 'Grupo A: Usuarios, Roles y Seguridad',
    kicker: 'DICCIONARIO',
    rowCount: 4,
    size: '16 KB',
    pk: 'id_rol (TINYINT)',
    fk: 'Ninguna (Tabla Maestra)',
    fields: 'id_rol, nombre_rol, descripcion',
    description: 'Catálogo de permisos de la suite: Administrador, Profesor, Tutor familiar y Alumno.'
  },
  {
    name: 'administrador',
    group: 'security',
    groupName: 'Grupo A: Usuarios, Roles y Seguridad',
    kicker: 'PERFIL CLÍNICO',
    rowCount: 3,
    size: '16 KB',
    pk: 'id_admin (INT AUTO_INCREMENT)',
    fk: 'id_usuario → usuario.id_usuario',
    fields: 'id_admin, id_usuario, departamento, nivel_acceso',
    description: 'Gestores clínicos y técnicos centrales del sistema y auditoría de la plataforma.'
  },
  {
    name: 'profesor',
    group: 'security',
    groupName: 'Grupo A: Usuarios, Roles y Seguridad',
    kicker: 'TERAPIA & AULA',
    rowCount: 12,
    size: '16 KB',
    pk: 'id_profesor (INT)',
    fk: 'id_usuario → usuario.id_usuario, id_grado → grado.id_grado',
    fields: 'id_profesor, id_usuario, id_grado, especialidad, matricula_terapeutica',
    description: 'Docentes, terapeutas certificados ABA, asignaciones de casos y tutorías.'
  },

  // Grupo B: Estudiantes y Grados (2)
  {
    name: 'estudiante',
    group: 'students',
    groupName: 'Grupo B: Estudiantes y Grados de Desarrollo',
    kicker: 'NÚCLEO DE APRENDIZAJE',
    rowCount: 28,
    size: '32 KB',
    pk: 'id_estudiante (INT)',
    fk: 'id_usuario → usuario.id_usuario · id_grado → grado.id_grado',
    fields: 'id_estudiante, id_usuario, id_grado, nombre_completo, alias, edad, diagnostico, canal_sensorial, hiperenfoque, puntaje_acumulado, profesor_asignado',
    description: 'Fichas clínicas: edad motriz, canal sensorial preferente (visual/auditivo), hiperfocos y plan de refuerzo adaptado.'
  },
  {
    name: 'grado',
    group: 'students',
    groupName: 'Grupo B: Estudiantes y Grados de Desarrollo',
    kicker: 'ESTRUCTURA CURRICULAR',
    rowCount: 6,
    size: '16 KB',
    pk: 'id_grado (INT)',
    fk: 'Vinculado a: estudiante, saber, profesor',
    fields: 'id_grado, nombre_grado, nivel_dificultad, icono, descripcion',
    description: 'Etapas evolutivas de desarrollo ABA: Inicial Sensorial, Fonemas Básicos, Integración Social y Autonomía.'
  },

  // Grupo C: Contenido Educativo & Multimedia (2)
  {
    name: 'saber',
    group: 'content',
    groupName: 'Grupo C: Contenido Educativo & Multimedia',
    kicker: 'MÓDULO DE SABER',
    rowCount: 8,
    size: '16 KB',
    pk: 'id_saber (INT AUTO_INCREMENT)',
    fk: 'id_grado → grado.id_grado',
    fields: 'id_saber, id_grado, nombre_saber, area_estimulacion, descripcion',
    description: 'Áreas de estimulación: Lenguaje Receptivo, Fonemas, Conteo Visual, Emociones y Rutinas Diarias.'
  },
  {
    name: 'video',
    group: 'content',
    groupName: 'Grupo C: Contenido Educativo & Multimedia',
    kicker: 'RECURSO AUDIOVISUAL',
    rowCount: 16,
    size: '16 KB',
    pk: 'id_video (INT)',
    fk: 'id_saber → saber.id_saber',
    fields: 'id_video, id_saber, titulo_capsula, duracion_segundos, paleta_calma, url_recurso',
    description: 'Micro-cápsulas audiovisuales, canciones de modelado y guías con paletas de color no irritantes.'
  },

  // Grupo D: Evaluaciones, Respuestas y Métricas (5)
  {
    name: 'evaluacion',
    group: 'evaluation',
    groupName: 'Grupo D: Evaluaciones, Respuestas y Métricas',
    kicker: 'MISIÓN',
    rowCount: 10,
    size: '16 KB',
    pk: 'id_evaluacion (INT)',
    fk: 'id_saber → saber.id_saber',
    fields: 'id_evaluacion, id_saber, titulo_mision, criterio_maestria, tipo_ensayo',
    description: 'Misiones y desafíos adaptativos vinculados a cada saber.'
  },
  {
    name: 'respuestas',
    group: 'evaluation',
    groupName: 'Grupo D: Evaluaciones, Respuestas y Métricas',
    kicker: 'LOG INTERACTIVO',
    rowCount: 54,
    size: '16 KB',
    pk: 'id_respuesta (INT)',
    fk: 'id_eval → evaluacion.id_evaluacion, id_estudiante → estudiante.id_estudiante',
    fields: 'id_respuesta, id_eval, id_estudiante, latencia_segundos, es_correcta, fecha_registro',
    description: 'Registro completo de interacciones, latencia y toques en pantalla.'
  },
  {
    name: 'respuesta_correcta',
    group: 'evaluation',
    groupName: 'Grupo D: Evaluaciones, Respuestas y Métricas',
    kicker: 'ÉXITO & REFUERZO',
    rowCount: 20,
    size: '16 KB',
    pk: 'id_resp_correcta (INT)',
    fk: 'id_respuesta → respuestas.id_respuesta',
    fields: 'id_resp_correcta, id_respuesta, animacion_refuerzo, gemas_otorgadas',
    description: 'Banco de aciertos validados con animación de recompensa inmediata.'
  },
  {
    name: 'respuesta_incorrecta',
    group: 'evaluation',
    groupName: 'Grupo D: Evaluaciones, Respuestas y Métricas',
    kicker: 'ERROR SIN FRUSTRACIÓN',
    rowCount: 10,
    size: '16 KB',
    pk: 'id_resp_incorrecta (INT)',
    fk: 'id_respuesta → respuestas.id_respuesta',
    fields: 'id_resp_incorrecta, id_respuesta, estrategia_apoyo, sin_frustracion',
    description: 'Intentos fallidos registrados para ajuste de dificultad suave.'
  },
  {
    name: 'puntaje',
    group: 'evaluation',
    groupName: 'Grupo D: Evaluaciones, Respuestas y Métricas',
    kicker: 'ECONOMÍA DE FICHAS',
    rowCount: 28,
    size: '16 KB',
    pk: 'id_puntaje (INT)',
    fk: 'id_estudiante → estudiante.id_estudiante',
    fields: 'id_puntaje, id_estudiante, estrellas_totales, gemas_magicas, nivel_recompensa, ultimo_canje',
    description: 'Gemas, estrellas y canjes del cofre según principios ABA.'
  }
];

export const INITIAL_ROLES: RolTable[] = [
  { id_rol: 1, nombre_rol: 'Administrador', descripcion: 'Gestión global clínica y técnica' },
  { id_rol: 2, nombre_rol: 'Profesor / Terapeuta', descripcion: 'Diseño de programas y seguimiento ABA' },
  { id_rol: 3, nombre_rol: 'Tutor Familiar', descripcion: 'Visualización de progreso y rutinas en casa' },
  { id_rol: 4, nombre_rol: 'Estudiante', descripcion: 'Acceso a misiones lúdicas y cofre' }
];

export const INITIAL_USUARIOS: UsuarioTable[] = [
  { id_usuario: 1, id_rol: 1, nombre: 'Dra. Claudia Valdés', email: 'c.valdes@abaclinic.org', password_hash: '$2b$12$k8j...F9a', activo: true, ultimo_acceso: '2026-10-13 06:45' },
  { id_usuario: 2, id_rol: 2, nombre: 'Prof. Mariana R.', email: 'm.ramirez@abaclinic.org', password_hash: '$2b$12$p4x...W1b', activo: true, ultimo_acceso: '2026-10-13 06:55' },
  { id_usuario: 3, id_rol: 2, nombre: 'Lic. Carlos Villalobos', email: 'c.villa@abaclinic.org', password_hash: '$2b$12$q7y...Z9c', activo: true, ultimo_acceso: '2026-10-12 18:20' },
  { id_usuario: 4, id_rol: 3, nombre: 'Elena Peña (Madre Lucas)', email: 'elena.pena@gmail.com', password_hash: '$2b$12$d3s...M2x', activo: true, ultimo_acceso: '2026-10-13 06:10' },
  { id_usuario: 5, id_rol: 4, nombre: 'Lucas Mateo P.', email: 'lucas.mateo@alumno.aba', password_hash: '$2b$12$pin...001', activo: true, ultimo_acceso: '2026-10-13 06:30' },
  { id_usuario: 6, id_rol: 4, nombre: 'Sofía Gómez T.', email: 'sofia.gomez@alumno.aba', password_hash: '$2b$12$pin...002', activo: true, ultimo_acceso: '2026-10-13 05:40' },
  { id_usuario: 7, id_rol: 4, nombre: 'Diego Colmenares', email: 'diego.c@alumno.aba', password_hash: '$2b$12$pin...003', activo: true, ultimo_acceso: '2026-10-12 16:15' },
  { id_usuario: 8, id_rol: 4, nombre: 'Valentina Restrepo', email: 'vale.r@alumno.aba', password_hash: '$2b$12$pin...004', activo: true, ultimo_acceso: '2026-10-12 14:00' }
];

export const INITIAL_ADMINS: AdministradorTable[] = [
  { id_admin: 1, id_usuario: 1, departamento: 'Dirección Clínica Neurodesarrollo', nivel_acceso: 'SuperAdmin' },
  { id_admin: 2, id_usuario: 2, departamento: 'Supervisión Terapéutica BCBA', nivel_acceso: 'Editor' },
  { id_admin: 3, id_usuario: 3, departamento: 'Tecnología & Integración COPPA', nivel_acceso: 'Soporte' }
];

export const INITIAL_PROFESORES: ProfesorTable[] = [
  { id_profesor: 1, id_usuario: 2, id_grado: 1, especialidad: 'Analista de Conducta Certificado (BCBA)', matricula_terapeutica: 'ABA-CO-8921' },
  { id_profesor: 2, id_usuario: 3, id_grado: 2, especialidad: 'Fonoaudiología & Comunicación Aumentativa', matricula_terapeutica: 'ABA-CO-7740' },
  { id_profesor: 3, id_usuario: 1, id_grado: 3, especialidad: 'Terapia Ocupacional Sensorial', matricula_terapeutica: 'ABA-CO-9104' }
];

export const INITIAL_GRADOS: GradoTable[] = [
  { id_grado: 1, nombre_grado: 'Grado 1: Inicial Sensorial', nivel_dificultad: 'Básico Suave', icono: 'spa', descripcion: 'Discriminación de estímulos primarios, colores pastel y contacto visual cómodo.' },
  { id_grado: 2, nombre_grado: 'Grado 1: Fonemas & Imitación', nivel_dificultad: 'Intermedio 1', icono: 'record_voice_over', descripcion: 'Ecoicas y praxias bucofonatorias con modelado visual y refuerzo sonoro.' },
  { id_grado: 3, nombre_grado: 'Grado 2: Conteo & Emparejamiento', nivel_dificultad: 'Intermedio 2', icono: 'pin', descripcion: 'Correspondencia uno a uno, conteo hasta 10 y clasificación funcional.' },
  { id_grado: 4, nombre_grado: 'Grado 2: Emociones & Rutinas', nivel_dificultad: 'Avanzado Social', icono: 'mood', descripcion: 'Identificación de estados afectivos y anticipación de transiciones diarias.' },
  { id_grado: 5, nombre_grado: 'Grado 3: Autonomía & Lenguaje', nivel_dificultad: 'Consolidación', icono: 'wb_sunny', descripcion: 'Frases de dos o más palabras y autorregulación guiada.' },
  { id_grado: 6, nombre_grado: 'Grado 3: Integración Escolar', nivel_dificultad: 'Maestría', icono: 'school', descripcion: 'Instrucciones compuestas y habilidades de grupo.' }
];

export const INITIAL_ESTUDIANTES: EstudianteTable[] = [
  {
    id_estudiante: 1,
    id_usuario: 5,
    id_grado: 1,
    nombre_completo: 'Lucas Mateo P.',
    alias: 'Lucas Mateo',
    edad: 6,
    diagnostico: 'TEA Nivel 1 · Apoyo Específico',
    canal_sensorial: 'Preferencia Visual',
    hiperenfoque: 'Vehículos, locomotoras y engranajes',
    puntaje_acumulado: 145,
    profesor_asignado: 'Prof. Mariana R.'
  },
  {
    id_estudiante: 2,
    id_usuario: 6,
    id_grado: 1,
    nombre_completo: 'Sofía Gómez T.',
    alias: 'Sofi',
    edad: 5,
    diagnostico: 'Lenguaje Receptivo · Sensibilidad Sonora',
    canal_sensorial: 'Canal Auditivo',
    hiperenfoque: 'Melodías suaves, aves y agua cristalina',
    puntaje_acumulado: 210,
    profesor_asignado: 'Prof. Mariana R.'
  },
  {
    id_estudiante: 3,
    id_usuario: 7,
    id_grado: 2,
    nombre_completo: 'Diego Colmenares',
    alias: 'Diego C.',
    edad: 7,
    diagnostico: 'TDAH con hiperactividad · Refuerzo de Atención',
    canal_sensorial: 'Cinestésico / Táctil',
    hiperenfoque: 'Bloques de construcción, texturas y dinosaurios',
    puntaje_acumulado: 95,
    profesor_asignado: 'Lic. Carlos V.'
  },
  {
    id_estudiante: 4,
    id_usuario: 8,
    id_grado: 2,
    nombre_completo: 'Valentina Restrepo',
    alias: 'Valen',
    edad: 6,
    diagnostico: 'Condición del Espectro Autista · Nivel 1',
    canal_sensorial: 'Preferencia Visual',
    hiperenfoque: 'Constelaciones, planetas y puzzles',
    puntaje_acumulado: 180,
    profesor_asignado: 'Prof. Mariana R.'
  },
  {
    id_estudiante: 5,
    id_usuario: 5,
    id_grado: 3,
    nombre_completo: 'Mateo Andrés Morales',
    alias: 'Teo',
    edad: 8,
    diagnostico: 'Dificultad de Pragmática y Rutinas',
    canal_sensorial: 'Preferencia Visual',
    hiperenfoque: 'Animales marinos y acuarios',
    puntaje_acumulado: 320,
    profesor_asignado: 'Lic. Carlos V.'
  }
];

export const INITIAL_SABERES: SaberTable[] = [
  { id_saber: 1, id_grado: 1, nombre_saber: 'Colores Básicos & Formas Amables', area_estimulacion: 'Percepción Visual', descripcion: 'Reconocer azul cielo, lavanda y menta en tarjetas táctiles.' },
  { id_saber: 2, id_grado: 2, nombre_saber: 'Fonema /M/ y /P/ en Modelado', area_estimulacion: 'Lenguaje Expresivo', descripcion: 'Repetición de sílabas con refuerzo de aplauso sensorial.' },
  { id_saber: 3, id_grado: 3, nombre_saber: 'Conteo Visual del 1 al 5', area_estimulacion: 'Cognición Cuantitativa', descripcion: 'Asociación de cantidad con figuras de estrellas sonrientes.' },
  { id_saber: 4, id_grado: 4, nombre_saber: 'Reconocimiento de Alegría y Calma', area_estimulacion: 'Socioemocional', descripcion: 'Identificación de expresiones en pictogramas de alta legibilidad.' },
  { id_saber: 5, id_grado: 5, nombre_saber: 'Rutina del Cepillado y Lavado', area_estimulacion: 'Autonomía / Vida Diaria', descripcion: 'Secuencia estructurada con pictogramas paso a paso.' }
];

export const INITIAL_VIDEOS: VideoTable[] = [
  { id_video: 1, id_saber: 1, titulo_capsula: 'El Baile de las Formas Suaves', duracion_segundos: 95, paleta_calma: 'Azul Pastel & Lavanda', url_recurso: 'assets/video_formas.mp4' },
  { id_video: 2, id_saber: 2, titulo_capsula: 'Sonido M: Como la Miel Dulce', duracion_segundos: 110, paleta_calma: 'Tonos Cálidos No Estridentes', url_recurso: 'assets/video_fonema_m.mp4' },
  { id_video: 3, id_saber: 3, titulo_capsula: 'Cinco Estrellas en el Cielo', duracion_segundos: 130, paleta_calma: 'Índigo Relajante', url_recurso: 'assets/video_estrellas.mp4' },
  { id_video: 4, id_saber: 4, titulo_capsula: 'Cuando mi Corazón Respira en Calma', duracion_segundos: 120, paleta_calma: 'Lavanda Profundo', url_recurso: 'assets/video_calma.mp4' }
];

export const INITIAL_EVALUACIONES: EvaluacionTable[] = [
  { id_evaluacion: 1, id_saber: 1, titulo_mision: 'Encuentra el Círculo Azul', criterio_maestria: '80% de aciertos en 5 ensayos', tipo_ensayo: 'Ensayo Discreto (DTT)' },
  { id_evaluacion: 2, id_saber: 2, titulo_mision: 'Pronuncia y Toca el Fonema /M/', criterio_maestria: '3 ensayos consecutivos sin error', tipo_ensayo: 'Imitación Verbal' },
  { id_evaluacion: 3, id_saber: 3, titulo_mision: 'Cuenta 3 Manzanas Doradas', criterio_maestria: '4 de 5 ensayos exitosos', tipo_ensayo: 'Selección Receptiva' },
  { id_evaluacion: 4, id_saber: 4, titulo_mision: 'Elige la Carita Feliz', criterio_maestria: 'Generalización en 2 sesiones', tipo_ensayo: 'Discriminación Social' }
];

export const INITIAL_RESPUESTAS: RespuestasTable[] = [
  { id_respuesta: 1, id_eval: 1, id_estudiante: 1, latencia_segundos: 1.8, es_correcta: true, fecha_registro: '2026-10-13 06:12:40' },
  { id_respuesta: 2, id_eval: 1, id_estudiante: 1, latencia_segundos: 2.1, es_correcta: true, fecha_registro: '2026-10-13 06:13:15' },
  { id_respuesta: 3, id_eval: 1, id_estudiante: 1, latencia_segundos: 3.4, es_correcta: false, fecha_registro: '2026-10-13 06:13:50' },
  { id_respuesta: 4, id_eval: 1, id_estudiante: 1, latencia_segundos: 1.5, es_correcta: true, fecha_registro: '2026-10-13 06:14:22' },
  { id_respuesta: 5, id_eval: 2, id_estudiante: 2, latencia_segundos: 1.2, es_correcta: true, fecha_registro: '2026-10-13 06:20:05' },
  { id_respuesta: 6, id_eval: 2, id_estudiante: 2, latencia_segundos: 1.4, es_correcta: true, fecha_registro: '2026-10-13 06:20:45' },
  { id_respuesta: 7, id_eval: 3, id_estudiante: 3, latencia_segundos: 2.8, es_correcta: true, fecha_registro: '2026-10-13 06:25:10' },
  { id_respuesta: 8, id_eval: 3, id_estudiante: 3, latencia_segundos: 4.1, es_correcta: false, fecha_registro: '2026-10-13 06:25:55' }
];

export const INITIAL_RESPUESTAS_CORRECTAS: RespuestaCorrectaTable[] = [
  { id_resp_correcta: 1, id_respuesta: 1, animacion_refuerzo: 'Lluvia de Estrellas Suaves', gemas_otorgadas: 5 },
  { id_resp_correcta: 2, id_respuesta: 2, animacion_refuerzo: 'Aplauso Melódico', gemas_otorgadas: 5 },
  { id_resp_correcta: 3, id_respuesta: 4, animacion_refuerzo: 'Campanilla de Éxito', gemas_otorgadas: 10 },
  { id_resp_correcta: 4, id_respuesta: 5, animacion_refuerzo: 'Gema Violeta Brillante', gemas_otorgadas: 5 },
  { id_resp_correcta: 5, id_respuesta: 6, animacion_refuerzo: 'Cofre Mágico Desbloqueado', gemas_otorgadas: 15 },
  { id_resp_correcta: 6, id_respuesta: 7, animacion_refuerzo: 'Sonrisa de Compañero', gemas_otorgadas: 5 }
];

export const INITIAL_RESPUESTAS_INCORRECTAS: RespuestaIncorrectaTable[] = [
  { id_resp_incorrecta: 1, id_respuesta: 3, estrategia_apoyo: 'Atenuación de estímulo (Prompting visual)', sin_frustracion: true },
  { id_resp_incorrecta: 2, id_respuesta: 8, estrategia_apoyo: 'Modelado sin error inmediato', sin_frustracion: true }
];

export const INITIAL_PUNTAJES: PuntajeTable[] = [
  { id_puntaje: 1, id_estudiante: 1, estrellas_totales: 145, gemas_magicas: 42, nivel_recompensa: 'Explorador Brillante', ultimo_canje: '2026-10-12' },
  { id_puntaje: 2, id_estudiante: 2, estrellas_totales: 210, gemas_magicas: 68, nivel_recompensa: 'Guardián de la Armonía', ultimo_canje: '2026-10-13' },
  { id_puntaje: 3, id_estudiante: 3, estrellas_totales: 95, gemas_magicas: 24, nivel_recompensa: 'Aventurero Curioso', ultimo_canje: '2026-10-11' },
  { id_puntaje: 4, id_estudiante: 4, estrellas_totales: 180, gemas_magicas: 51, nivel_recompensa: 'Navegante Estelar', ultimo_canje: '2026-10-12' },
  { id_puntaje: 5, id_estudiante: 5, estrellas_totales: 320, gemas_magicas: 95, nivel_recompensa: 'Maestro del Saber', ultimo_canje: '2026-10-13' }
];

export const FULL_SQL_SCHEMA_DUMP = `-- ==============================================================
-- BASE DE DATOS ABA: GESTIÓN NEUROEDUCATIVA Y REFUERZO POSITIVO
-- Motor: InnoDB · Juego de Caracteres: utf8mb4_general_ci
-- Versión Schema: v2.4 (13 Tablas Activas)
-- Generado para: Suite ABA Aprende Jugando
-- ==============================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP DATABASE IF EXISTS aba_neurolearning;
CREATE DATABASE aba_neurolearning CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE aba_neurolearning;

-- 1. TABLA: rol (Catálogo de roles del sistema)
CREATE TABLE \`rol\` (
  \`id_rol\` TINYINT NOT NULL AUTO_INCREMENT,
  \`nombre_rol\` VARCHAR(50) NOT NULL,
  \`descripcion\` VARCHAR(255) NULL,
  PRIMARY KEY (\`id_rol\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 2. TABLA: usuario (Cuentas y credenciales)
CREATE TABLE \`usuario\` (
  \`id_usuario\` INT NOT NULL AUTO_INCREMENT,
  \`id_rol\` TINYINT NOT NULL,
  \`nombre\` VARCHAR(120) NOT NULL,
  \`email\` VARCHAR(150) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`activo\` TINYINT(1) DEFAULT 1,
  \`ultimo_acceso\` DATETIME NULL,
  PRIMARY KEY (\`id_usuario\`),
  CONSTRAINT \`fk_usuario_rol\` FOREIGN KEY (\`id_rol\`) REFERENCES \`rol\` (\`id_rol\`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 3. TABLA: administrador (Gestión técnica y clínica)
CREATE TABLE \`administrador\` (
  \`id_admin\` INT NOT NULL AUTO_INCREMENT,
  \`id_usuario\` INT NOT NULL,
  \`departamento\` VARCHAR(100) NOT NULL,
  \`nivel_acceso\` VARCHAR(50) NOT NULL,
  PRIMARY KEY (\`id_admin\`),
  CONSTRAINT \`fk_admin_usuario\` FOREIGN KEY (\`id_usuario\`) REFERENCES \`usuario\` (\`id_usuario\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 4. TABLA: grado (Etapas del desarrollo curricular)
CREATE TABLE \`grado\` (
  \`id_grado\` INT NOT NULL AUTO_INCREMENT,
  \`nombre_grado\` VARCHAR(100) NOT NULL,
  \`nivel_dificultad\` VARCHAR(50) NOT NULL,
  \`icono\` VARCHAR(50) NOT NULL,
  \`descripcion\` TEXT NULL,
  PRIMARY KEY (\`id_grado\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 5. TABLA: profesor (Docentes y terapeutas ABA)
CREATE TABLE \`profesor\` (
  \`id_profesor\` INT NOT NULL AUTO_INCREMENT,
  \`id_usuario\` INT NOT NULL,
  \`id_grado\` INT NOT NULL,
  \`especialidad\` VARCHAR(150) NOT NULL,
  \`matricula_terapeutica\` VARCHAR(50) NOT NULL,
  PRIMARY KEY (\`id_profesor\`),
  CONSTRAINT \`fk_profesor_usuario\` FOREIGN KEY (\`id_usuario\`) REFERENCES \`usuario\` (\`id_usuario\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_profesor_grado\` FOREIGN KEY (\`id_grado\`) REFERENCES \`grado\` (\`id_grado\`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 6. TABLA: estudiante (Núcleo de aprendizaje individual)
CREATE TABLE \`estudiante\` (
  \`id_estudiante\` INT NOT NULL AUTO_INCREMENT,
  \`id_usuario\` INT NOT NULL,
  \`id_grado\` INT NOT NULL,
  \`nombre_completo\` VARCHAR(150) NOT NULL,
  \`alias\` VARCHAR(60) NOT NULL,
  \`edad\` TINYINT NOT NULL,
  \`diagnostico\` VARCHAR(150) NOT NULL,
  \`canal_sensorial\` ENUM('Preferencia Visual', 'Canal Auditivo', 'Cinestésico / Táctil') NOT NULL,
  \`hiperenfoque\` VARCHAR(200) NULL,
  \`puntaje_acumulado\` INT DEFAULT 0,
  \`profesor_asignado\` VARCHAR(120) NOT NULL,
  PRIMARY KEY (\`id_estudiante\`),
  CONSTRAINT \`fk_estudiante_usuario\` FOREIGN KEY (\`id_usuario\`) REFERENCES \`usuario\` (\`id_usuario\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_estudiante_grado\` FOREIGN KEY (\`id_grado\`) REFERENCES \`grado\` (\`id_grado\`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 7. TABLA: saber (Contenidos y áreas de estimulación)
CREATE TABLE \`saber\` (
  \`id_saber\` INT NOT NULL AUTO_INCREMENT,
  \`id_grado\` INT NOT NULL,
  \`nombre_saber\` VARCHAR(150) NOT NULL,
  \`area_estimulacion\` VARCHAR(100) NOT NULL,
  \`descripcion\` TEXT NULL,
  PRIMARY KEY (\`id_saber\`),
  CONSTRAINT \`fk_saber_grado\` FOREIGN KEY (\`id_grado\`) REFERENCES \`grado\` (\`id_grado\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 8. TABLA: video (Recursos audiovisuales calmantes)
CREATE TABLE \`video\` (
  \`id_video\` INT NOT NULL AUTO_INCREMENT,
  \`id_saber\` INT NOT NULL,
  \`titulo_capsula\` VARCHAR(150) NOT NULL,
  \`duracion_segundos\` INT NOT NULL,
  \`paleta_calma\` VARCHAR(80) NOT NULL,
  \`url_recurso\` VARCHAR(255) NOT NULL,
  PRIMARY KEY (\`id_video\`),
  CONSTRAINT \`fk_video_saber\` FOREIGN KEY (\`id_saber\`) REFERENCES \`saber\` (\`id_saber\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 9. TABLA: evaluacion (Misiones y ensayos adaptativos)
CREATE TABLE \`evaluacion\` (
  \`id_evaluacion\` INT NOT NULL AUTO_INCREMENT,
  \`id_saber\` INT NOT NULL,
  \`titulo_mision\` VARCHAR(150) NOT NULL,
  \`criterio_maestria\` VARCHAR(120) NOT NULL,
  \`tipo_ensayo\` VARCHAR(80) NOT NULL,
  PRIMARY KEY (\`id_evaluacion\`),
  CONSTRAINT \`fk_eval_saber\` FOREIGN KEY (\`id_saber\`) REFERENCES \`saber\` (\`id_saber\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 10. TABLA: respuestas (Registro de ensayos discretos y latencia)
CREATE TABLE \`respuestas\` (
  \`id_respuesta\` INT NOT NULL AUTO_INCREMENT,
  \`id_eval\` INT NOT NULL,
  \`id_estudiante\` INT NOT NULL,
  \`latencia_segundos\` DECIMAL(4,2) NOT NULL,
  \`es_correcta\` TINYINT(1) NOT NULL,
  \`fecha_registro\` DATETIME NOT NULL,
  PRIMARY KEY (\`id_respuesta\`),
  CONSTRAINT \`fk_resp_eval\` FOREIGN KEY (\`id_eval\`) REFERENCES \`evaluacion\` (\`id_evaluacion\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_resp_estudiante\` FOREIGN KEY (\`id_estudiante\`) REFERENCES \`estudiante\` (\`id_estudiante\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 11. TABLA: respuesta_correcta (Aciertos y animaciones de refuerzo)
CREATE TABLE \`respuesta_correcta\` (
  \`id_resp_correcta\` INT NOT NULL AUTO_INCREMENT,
  \`id_respuesta\` INT NOT NULL,
  \`animacion_refuerzo\` VARCHAR(120) NOT NULL,
  \`gemas_otorgadas\` INT DEFAULT 5,
  PRIMARY KEY (\`id_resp_correcta\`),
  CONSTRAINT \`fk_rc_respuesta\` FOREIGN KEY (\`id_respuesta\`) REFERENCES \`respuestas\` (\`id_respuesta\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 12. TABLA: respuesta_incorrecta (Errores sin frustración)
CREATE TABLE \`respuesta_incorrecta\` (
  \`id_resp_incorrecta\` INT NOT NULL AUTO_INCREMENT,
  \`id_respuesta\` INT NOT NULL,
  \`estrategia_apoyo\` VARCHAR(150) NOT NULL,
  \`sin_frustracion\` TINYINT(1) DEFAULT 1,
  PRIMARY KEY (\`id_resp_incorrecta\`),
  CONSTRAINT \`fk_ri_respuesta\` FOREIGN KEY (\`id_respuesta\`) REFERENCES \`respuestas\` (\`id_respuesta\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 13. TABLA: puntaje (Economía de fichas, estrellas y cofre)
CREATE TABLE \`puntaje\` (
  \`id_puntaje\` INT NOT NULL AUTO_INCREMENT,
  \`id_estudiante\` INT NOT NULL,
  \`estrellas_totales\` INT DEFAULT 0,
  \`gemas_magicas\` INT DEFAULT 0,
  \`nivel_recompensa\` VARCHAR(100) NOT NULL,
  \`ultimo_canje\` DATE NULL,
  PRIMARY KEY (\`id_puntaje\`),
  CONSTRAINT \`fk_puntaje_estudiante\` FOREIGN KEY (\`id_estudiante\`) REFERENCES \`estudiante\` (\`id_estudiante\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

SET FOREIGN_KEY_CHECKS = 1;
`;
