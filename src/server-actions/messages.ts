'use server'
import {getServerSession} from "next-auth";
import {ResponseType} from "@/types/response";
import prisma from "@/configs/prisma";

export const sendMessage = async (recipientId: string, message: string): Promise<ResponseType> => {
    try {
        const session = await getServerSession();
        if (!session) return {status: 'error', message: 'Произошла ошибка, обновите страницу!'}
        await prisma.message.create({
            data: {
                senderId: session.user.id,
                receiverId: recipientId,
                text: message
            }
        })
        return {status: 'success', message: ''}
    } catch (e) {
        return {status: 'error', message: 'Произошла ошибка, обновите страницу!'}
    }
}
//ТУТ ВСЕ ПРАВИЛЬНО
export const getMessages = async (recipientId: string) => {
    try {
        const session = await getServerSession();
        if (!session) return null
        const messages = prisma.message.findMany({
            where: {
                senderId: session.user.id,
                receiverId: recipientId
            }
        })
        return messages;
    } catch (e) {
        return null
    }
}
export const getDialogs = async () => {
    try {
        const session = await getServerSession();
        if (!session) return null;
        const dialogues = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: session.user.id },
                    { receiverId: session.user.id }
                ]
            },
            select: {
                sender: true,
                receiver: true,
                text: true
            },
            distinct: ["senderId", "receiverId"]
        });
        return dialogues;
    } catch (e) {
        return null;
    }
}