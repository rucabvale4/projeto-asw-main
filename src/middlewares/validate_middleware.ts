import { type Request, type Response, type NextFunction } from 'express';
import { type ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => 
  async (req: Request, res: Response, next: NextFunction) => {
    
    const result = await schema.safeParseAsync(req.body);
    
    if (!result.success) {
      return res.status(400).json({
        erro: "Falha na validação dos dados",
        detalhes: result.error.issues.map((e) => ({
          campo: e.path.join('.'),
          mensagem: e.message
        }))
      });
    }

    req.body = result.data;

    next(); 
};