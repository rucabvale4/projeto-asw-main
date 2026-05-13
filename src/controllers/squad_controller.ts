import { type Request, type Response } from 'express';
import * as squadService from '../services/squad_service.js';

export const getSquads = async (req: Request, res: Response) => {
    try {
        const squads = await squadService.findAllSquads();
        res.json(squads);
    } catch (error) {
        res.status(500).json({ error: "Erro ao procurar squads." });
    }
};

export const getMySquadsController = async (req: any, res: Response) => {
    try {
        const userId = req.userId || req.user?.id; // Usa o ID vindo do authGuard
        const squads = await squadService.findSquadsByUserId(Number(userId));
        res.json(squads);
    } catch (error) {
        res.status(500).json({ error: "Erro ao procurar os teus squads." });
    }
};

export const createSquadController = async (req: any, res: Response) => {
    try {
        const userId = req.userId || req.user?.id;
        if (!userId) return res.status(401).json({ error: "Utilizador não identificado." });

        const newSquad = await squadService.createSquad(Number(userId), req.body); 
        res.status(201).json(newSquad);
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar o grupo." });
    }
};

export const updateSquadController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const squadAtualizado = await squadService.updateSquad(Number(id), req.body);
        res.status(200).json(squadAtualizado);
    } catch (error) {
        res.status(404).json({ error: "Squad não encontrado ou falha ao atualizar." });
    }
};

export const putSquadController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const squad = await squadService.updateSquad(Number(id), req.body);
        res.status(200).json(squad);
    } catch (error) {
        res.status(404).json({ error: "Squad não encontrado." });
    }
};

export const deleteSquadController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await squadService.deleteSquad(Number(id));
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: "Erro ao apagar squad." });
    }
};

export const joinSquadController = async (req: any, res: Response) => {
    try {
        const userId = req.userId || req.user?.id;
        const { id } = req.params;
        
        if (!userId) return res.status(401).json({ error: "Utilizador não identificado." });

        await squadService.joinSquad(Number(userId), Number(id));
        res.status(200).json({ message: "Entraste no grupo com sucesso!" });
    } catch (error) {
        res.status(400).json({ error: "Erro ao tentar entrar no grupo." });
    }
};