import { prisma } from '../lib/prisma.js';

export const findAllSquads = async () => {
    return await prisma.squad.findMany({
        include: { actions: true }
    });
};

export const createSquad = async (data: { nomeSquad: string, descricao?: string }) => {
    return await prisma.squad.create({
        data: data 
    });
};

export const deleteSquad = async (id: number) => {
    return await prisma.squad.delete({ where: { id } });
};

export const updateSquad = async (id: number, data: any) => {
    return await prisma.squad.update({ where: { id }, data });
};