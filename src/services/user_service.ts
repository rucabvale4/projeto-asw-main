import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcryptjs';

export const findAllUsers = async () => {
    return await prisma.user.findMany();
};

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email }
    });
};

export const createUser = async (nome: string, email: string, password: string, role: 'USER' | 'ADMIN') => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
        data: { nome, email, password: hashedPassword, role }   //hashedPassword para guardar a password encriptada
    });
};

export const deleteUser = async (id: number) => {
    return await prisma.user.delete({ where: { id } });
};

export const updateUser = async (id: number, data: any) => {
    if (data.password) {                                        //caso altere a password, temos de encripta-la outra vez
        data.password = await bcrypt.hash(data.password, 10)
    }
    return await prisma.user.update({ where: { id }, data });
};

export const findUserById = async (id: number) => {
    return await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            nome: true,
            email: true,
            role: true,
            pontos_experiencia: true,
            streak: true,
            createdAt: true
        }
    });
};