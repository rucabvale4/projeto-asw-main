import { prisma } from '../lib/prisma.js';

export const findAllSquads = async () => {
    return await prisma.squad.findMany({ include: { actions: true, users: true } });
};


export const findSquadsByUserId = async (userId: number) => {
    return await prisma.squad.findMany({
        where: {
            users: { some: { id: userId } }
        },
        include: { actions: true, users: true }
    });
};

export const createSquad = async (userId: number, data: { nomeSquad: string, descricao?: string }) => {
    return await prisma.squad.create({
        data: {
            ...data,
            users: {
                connect: { id: userId } 
            }
        }
    });
};

export const deleteSquad = async (id: number) => {
    return await prisma.squad.delete({ where: { id } });
};

export const updateSquad = async (id: number, data: any) => {
    return await prisma.squad.update({ where: { id }, data });
};

export const joinSquad = async (userId: number, squadId: number) => {
    return await prisma.squad.update({
        where: { id: squadId },
        data: {
            users: {
                connect: { id: userId } 
            }
        }
    });
};