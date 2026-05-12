import { z } from 'zod';

export const createActionSchema = z.object({
  titulo: z.string().min(3, "Nome tem de ter no mínimo 3 letras"),
  categoria: z.string().min(2, "Categoria tem de ter no mínimo 2 letras"),
  squadId: z.number({message: "O ID do Squad é obrigatório"}).int().positive(),
  descricao: z.string().optional(),
  estado: z.string().optional(),
  data_hora: z.string().datetime().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  num_participantes: z.number().optional()
});

export const updateActionSchema = createActionSchema.partial();