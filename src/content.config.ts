import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const enfermedades = defineCollection({
  loader: glob({ base: './src/content/enfermedades', pattern: '**/*.md' }),
  schema: z.object({
    titulo: z.string().min(5),
    resumen: z.string().min(35),
    categoria: z.enum(['Transmisibles', 'Crónicas', 'Maternoinfantil', 'Prevención']),
    estado: z.enum(['borrador', 'revision-clinica', 'aprobado']),
    fechaActualizacion: z.coerce.date(),
    fechaRevisionClinica: z.coerce.date().optional(),
    responsableRevision: z.string().optional(),
    fuentes: z.array(z.object({ titulo: z.string().min(4), url: z.url() })).min(1),
    orden: z.number().int().min(0).default(100),
  }).superRefine((data, ctx) => {
    if (data.estado === 'aprobado' && (!data.fechaRevisionClinica || !data.responsableRevision)) {
      ctx.addIssue({ code:'custom', message:'Una ficha aprobada requiere fecha y responsable de revisión clínica' });
    }
  })
});

export const collections = { enfermedades };
