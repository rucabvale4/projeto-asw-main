import { type Request, type Response } from 'express';
import * as userService from '../services/user_service.js';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.findAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Erro ao procurar utilizadores." });
    }
};

export const createUserController = async (req: Request, res: Response) => {
    try {
        const { nome, email, password, role } = req.body;
        const newUser = await userService.createUser(nome, email, password, role);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: "Dados inválidos ou email já existe." });
    }
};

export const updateUserController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await userService.updateUser(Number(id), req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: "Utilizador não encontrado." });
    }
};

export const putUserController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await userService.updateUser(Number(id), req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: "Erro na substituição total." });
    }
};

export const deleteUserController = async (req: Request, res: Response) => {
    try {
        await userService.deleteUser(Number(req.params.id));
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: "Erro ao apagar utilizador." });
    }
};

export const getMeController = async (req: any, res: Response) => {
    try {
        const userId = req.userId || req.user?.id; 

        if (!userId) {
            return res.status(401).json({ error: "Não autorizado. Token inválido." });
        }

        const user = await userService.findUserById(Number(userId));
        
        if (!user) {
            return res.status(404).json({ error: "Utilizador não encontrado." });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Erro no getMeController:", error);
        res.status(500).json({ error: "Erro ao carregar o perfil." });
    }
};