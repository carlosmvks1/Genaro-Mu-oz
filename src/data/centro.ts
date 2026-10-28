/**
 * Fuente única de datos institucionales del CIS Genaro Muñoz Hernández.
 *
 * Cada dato operativo tiene trazabilidad. "reportado" significa conocido por
 * el equipo pero NO aprobado todavía para publicación institucional.
 * El control editorial de despliegue bloquea estos datos hasta su revisión.
 *
 * No interpretar datos generales de SESAL o FONAC como inventario de servicios
 * vigentes del CIS. No introducir teléfonos, personal ni contactos supuestos.
 */
export type DatoInstitucional<T> = {
  valor: T;
  verificadoEl: string; // Fecha de recepción o validación YYYY-MM-DD
  fuente: string;
} & (
  | { estado: 'reportado'; validadoPor?: never }
  | { estado: 'aprobado'; validadoPor: string }
);

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
  consultaGeneralSinCobro: DatoInstitucional<boolean> | null;
  requisitosAtencion: DatoInstitucional<string[]> | null;
  ultimaRevisionInstitucional: DatoInstitucional<string> | null;
}

export const centro: DatosCentro = {
  nombre: 'Genaro Muñoz Hernández',
  sigla: 'CIS',
  tipo: 'Centro Integral de Salud',
  municipio: 'Gracias',
  departamento: 'Lempira',
  pais: 'Honduras',
  // Mapcarta sitúa un "Centro de Salud Gracias" en Av. Teresa Madrid,
  // pero NO se ha comprobado que el acceso corresponda al edificio fotografiado.
  direccionExacta: null,
  telefono: null,
  correo: null,
  horario: {
    valor: '7:00 a. m. a 3:00 p. m.',
    verificadoEl: '2026-10-28',
    fuente: 'Información proporcionada directamente por colaborador del proyecto',
    estado: 'reportado',
  },
  servicios: {
    valor: [
      'Preclínica y orientación inicial',
      'Consulta de medicina general',
      'Vacunación, inyectables y curaciones',
      'Terapia de rehidratación',
      'Nebulizaciones y terapia respiratoria',
      'Odontología general',
      'Laboratorio clínico',
      'Farmacia',
      'Admisión y archivo',
      'Visitas y atención comunitaria',
    ],
    verificadoEl: '2026-10-28',
    fuente: 'Confirmación de colaborador del proyecto a partir de lista de prestaciones CIS',
    estado: 'reportado',
  },
  consultaGeneralSinCobro: {
    valor: true,
    verificadoEl: '2026-10-28',
    fuente: 'Confirmación de colaborador del proyecto; también consta sin cobro general en FONAC 2022',
    estado: 'reportado',
  },
  // Identidad podría requerirse para el trámite, pero NO está confirmado.
  requisitosAtencion: null,
  ultimaRevisionInstitucional: null,
};

export const nombreCompleto = `${centro.sigla} ${centro.nombre}`;
export const localidad = `${centro.municipio}, ${centro.departamento}`;
