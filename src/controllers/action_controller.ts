import { type Request, type Response } from 'express';
import * as actionService from '../services/action_service.js';

export const getActions = async (req: Request, res: Response) => {
    try {
        const actions = await actionService.findAllActions(); 
        res.json(actions);
    } catch (error) {
        res.status(500).json({ error: "Erro ao procurar actions." });
    }
};

export const createActionController = async (req: Request, res: Response) => {
    try {
        const novaAction = await actionService.createAction(req.body);
        res.status(201).json(novaAction);
    } catch (error) {
        console.error("Erro no Action Controller:", error);
        res.status(400).json({ error: "Erro ao criar ação. Verifica os dados." });
    }
};

export const updateActionController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const actionAtualizada = await actionService.updateAction(Number(id), req.body);
        res.status(200).json(actionAtualizada);
    } catch (error) {
        res.status(404).json({ error: "Action não encontrada ou falha ao atualizar." });
    }
};

export const putActionController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const action = await actionService.updateAction(Number(id), req.body);
        res.status(200).json(action);
    } catch (error) {
        res.status(404).json({ error: "Action não encontrada." });
    }
};

export const deleteActionController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await actionService.deleteAction(Number(id));
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: "Erro ao apagar action." });
    }
};