export type UserRole = 'admin' | 'profesor' | 'tutor' | 'estudiante';

export interface RolTable {
  id_rol: number;
  nombre_rol: string;
  descripcion: string;
}

export interface UsuarioTable {
  id_usuario: number;
  id_rol: number;
  nombre: string;
  email: string;
  password_hash: string;
  activo: boolean;
  ultimo_acceso: string;
}

export interface AdministradorTable {
  id_admin: number;
  id_usuario: number;
  departamento: string;
  nivel_acceso: string;
}

export interface ProfesorTable {
  id_profesor: number;
  id_usuario: number;
  id_grado: number;
  especialidad: string;
  matricula_terapeutica: string;
}

export interface GradoTable {
  id_grado: number;
  nombre_grado: string;
  nivel_dificultad: string;
  icono: string;
  descripcion: string;
}

export interface EstudianteTable {
  id_estudiante: number;
  id_usuario: number;
  id_grado: number;
  nombre_completo: string;
  alias: string;
  edad: number;
  diagnostico: string;
  canal_sensorial: 'Preferencia Visual' | 'Canal Auditivo' | 'Cinestésico / Táctil';
  hiperenfoque: string;
  puntaje_acumulado: number;
  profesor_asignado: string;
}

export interface SaberTable {
  id_saber: number;
  id_grado: number;
  nombre_saber: string;
  area_estimulacion: string;
  descripcion: string;
}

export interface VideoTable {
  id_video: number;
  id_saber: number;
  titulo_capsula: string;
  duracion_segundos: number;
  paleta_calma: string;
  url_recurso: string;
}

export interface EvaluacionTable {
  id_evaluacion: number;
  id_saber: number;
  titulo_mision: string;
  criterio_maestria: string;
  tipo_ensayo: string;
}

export interface RespuestasTable {
  id_respuesta: number;
  id_eval: number;
  id_estudiante: number;
  latencia_segundos: number;
  es_correcta: boolean;
  fecha_registro: string;
}

export interface RespuestaCorrectaTable {
  id_resp_correcta: number;
  id_respuesta: number;
  animacion_refuerzo: string;
  gemas_otorgadas: number;
}

export interface RespuestaIncorrectaTable {
  id_resp_incorrecta: number;
  id_respuesta: number;
  estrategia_apoyo: string;
  sin_frustracion: boolean;
}

export interface PuntajeTable {
  id_puntaje: number;
  id_estudiante: number;
  estrellas_totales: number;
  gemas_magicas: number;
  nivel_recompensa: string;
  ultimo_canje: string;
}

export interface TableMeta {
  name: string;
  group: 'security' | 'students' | 'content' | 'evaluation';
  groupName: string;
  kicker: string;
  rowCount: number;
  size: string;
  pk: string;
  fk: string;
  fields: string;
  description: string;
}
