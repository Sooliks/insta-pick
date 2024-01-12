'use server'
import {getServerSession} from "next-auth";
import {ResponseType} from "@/types/response";
import prisma from "@/configs/prisma";
import {authConfig} from "@/configs/auth";
import {revalidatePath} from "next/cache";

export const sendMessage = async (message: string, chatId: string): Promise<ResponseType> => {
    try {
        const session = await getServerSession(authConfig);
        if (!session) return {status: 'error', message: 'Произошла ошибка, обновите страницу!'}
        await prisma.message.create({
            data: {
                chat: {connect: {id: chatId}},
                text: message,
                sender: {connect: {id: session.user.id}}
            },
            include: {chat: true}
        })
        revalidatePath(`/main/messages/${chatId}`)
        return {status: 'success', message: ''}
    }
    catch (e) {
        return {status: 'error', message: 'Произошла ошибка, обновите страницу!'}
    }
}
export const getChatById = async (chatId: string) => {
    try {
        const session = await getServerSession(authConfig);
        if (!session) return null
        const chat = await prisma.chat.findUnique({
            where: {
                id: chatId,
                usersIDs: {hasSome: [session.user.id]}
            },
            select: {
                messages: {
                    select: {
                        sender: {
                            select: {
                                login: true
                            }
                        },
                        text: true,
                        id: true
                    }
                }
            }
        })
        if(chat) return chat.messages;
    }
    catch (e) {
        return null
    }
}
export const createChat = async (recipientLogin: string): Promise<ResponseType> => {
    const session = await getServerSession(authConfig);
    if (!session) return {status: 'error', message: 'error'};
    const recipientUser = await prisma.user.findUnique({where: {login: recipientLogin}})
    if(recipientUser) {
        const chat = await prisma.chat.findFirst({
            where: {usersIDs: {hasEvery: [recipientUser.id, session.user.id]}}
        })
        if (chat) return {status: 'error', message: 'Чат с этим пользователем уже существует'}
    }else {
        return {status: 'error', message: 'Пользователя с таким логином не существует'};
    }
    await prisma.chat.create({
        data: {
            users: {connect: [{id: session.user.id}, {id: recipientUser.id}]}
        }
    })
    return {status: 'success', message: 'Чат успешно создан'}
}
export const getChats = async () => {
    try {
        const session = await getServerSession(authConfig);
        if (!session) return null;
        const chats = await prisma.chat.findMany({
            where: {usersIDs: {hasSome: [session.user.id]}},
            select: {
                messages: true,
                users: {
                    select: {login: true, id: true}
                },
                id: true
            }
        })
        return chats;
    }
    catch (e) {
        return null;
    }
}