import { z } from 'zod';

export const createUserSchema = z.object({
  nome: z.string().min(2, "Nome tem de ter no mínimo 2 letras"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Password tem de ter no mínimo 6 caracteres"),
  role: z.string().min(1, "Role obrigatória")
});

export const updateUserSchema = createUserSchema.partial();