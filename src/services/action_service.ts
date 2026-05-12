import { prisma } from '../lib/prisma.js';

export const createAction = async (data: any) => {
    return await prisma.action.create({
        data: data
    });
};

export const findAllActions = async () => {
    return await prisma.action.findMany();
};

export const deleteAction = async (id: number) => {
    return await prisma.action.delete({ where: { id } });
};

export const updateAction = async (id: number, data: any) => {
    return await prisma.action.update({ where: { id }, data });
};