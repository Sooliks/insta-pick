'use server'
import {getServerSession} from "next-auth";
import {ResponseType} from "@/types/response";
import prisma from "@/configs/prisma";

export const sendMessage = async (message: string, recipientId: string, chatId?: string): Promise<ResponseType> => {
    try {
        const session = await getServerSession();
        if (!session) return {status: 'error', message: 'Произошла ошибка, обновите страницу!'}
        await prisma.message.create({
            data: {
                chat: {
                    connectOrCreate: {
                        where: {id: chatId},
                        create: {
                            users: {connect: [{id: session.user.id}, {id: recipientId}]},
                        }
                    }
                },
                text: message,
                sender: {connect: {id: session.user.id}}
            },
            include: {chat: true}
        })
        return {status: 'success', message: ''}
    } catch (e) {
        return {status: 'error', message: 'Произошла ошибка, обновите страницу!'}
    }
}
export const getChatById = async (chatId: string) => {
    try {
        const session = await getServerSession();
        if (!session) return null
        const chat = await prisma.chat.findUnique({
            where: {
                id: chatId
            },
            select: {
                messages: true,
                users: {
                    select: {
                        password: false
                    }
                }
            }
        })
        return chat;
    } catch (e) {
        return null
    }
}
export const getChats = async () => {
    try {
        const session = await getServerSession();
        if (!session) return null;
        const chats = await prisma.user.findUnique({
            where: {id: session.user.id},
            select: {
                chats: {
                    select: {
                        messages: true,
                        users: {
                            select: {password: false}
                        }
                    }
                }
            }
        })
        return chats;
    } catch (e) {
        return null;
    }
}