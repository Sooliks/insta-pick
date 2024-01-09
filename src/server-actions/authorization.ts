'use server'
import prisma from "@/configs/prisma";
import * as argon2 from "argon2";
import {ResponseType} from "@/types/response";
export const register = async (_login: string, _email: string, _password: string): Promise<ResponseType> => {
    let searchedUser = await prisma.user.findFirst({
        where: {
            email: {
                contains: _email,
                mode: 'insensitive'
            }
        }
    });
    if(searchedUser) return {status: 'error', message: 'Аккаунт с таким email уже существует!'}
    searchedUser = await prisma.user.findFirst({
        where: {
            login: {
                contains: _login,
                mode: 'insensitive'
            }
        }
    });
    if(searchedUser) return {status: 'error', message: 'Аккаунт с таким логином уже существует!'}
    await prisma.user.create({
        data: {
            login: _login,
            email: _email.toLowerCase(),
            password: await argon2.hash(_password)
        }
    })
    return {status: 'success', message: 'Вы успешно зарегистрировались'}
}