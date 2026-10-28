/**
 * Fuente única de datos institucionales. Los campos operativos se muestran
 * SOLO cuando han sido verificados por un responsable designado por el CIS.
 *
 * Los valores null no deben transformarse en horarios, teléfonos o servicios
 * inventados. Para una actualización, documentar fecha y quién la validó.
 */
export type DatoInstitucional<T> = {
  valor: T;
  verificadoEl: string; // ISO YYYY-MM-DD
  validadoPor: string;
};

export interface DatosCentro {
  nombre: string;
  sigla: string;
  tipo: string;
  municipio: string;
  departamento: string;
  pais: string;
  direccionExacta: DatoInstitucional<string> | null;
  telefono: DatoInstitucional<string> | null;
  correo: DatoInstitucional<string> | null;
  horario: DatoInstitucional<string> | null;
  servicios: DatoInstitucional<string[]> | null;
  ultimaRevisionInstitucional: DatoInstitucional<string> | null;
}

export const centro: DatosCentro = {
  nombre: 'Genaro Muñoz Hernández',
  sigla: 'CIS',
  tipo: 'Centro Integral de Salud',
  municipio: 'Gracias',
  departamento: 'Lempira',
  pais: 'Honduras',
  direccionExacta: null,
  telefono: null,
  correo: null,
  horario: null,
  servicios: null,
  ultimaRevisionInstitucional: null,
};

export const nombreCompleto = `${centro.sigla} ${centro.nombre}`;
export const localidad = `${centro.municipio}, ${centro.departamento}`;
