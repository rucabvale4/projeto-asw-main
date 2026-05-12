import { type Request, type Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userService from '../services/user_service.js';

//aut_controller serve para verificar se a palavra passe bate certo, para emitirmos o Token

const JWT_SECRET = process.env.JWT_SECRET || "chave_de_reserva_insegura";

export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await userService.findUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
             res.status(401).json({ error: "Credenciais inválidas. Acesso negado." });
             return;
        }

        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            JWT_SECRET, 
            { expiresIn: "1h" }
        );

        res.status(200).json({ token, role: user.role,mensagem: `Bem-vindo, ${user.nome}!`});
    } catch (error) {
        res.status(500).json({ error: "Erro interno ao tentar fazer login." });
    }
};