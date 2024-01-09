'use server'
import prisma from "@/configs/prisma";
import * as argon2 from "argon2";
import {ResponseType} from "@/types/response";
import {LanguageType} from "@/types/language";
export const signUp = async (_login: string, _email: string, _password: string, lang: LanguageType): Promise<ResponseType> => {
    let searchedUser = await prisma.user.findFirst({
        where: {
            email: {
                contains: _email,
                mode: 'insensitive'
            }
        }
    });
    if(searchedUser) return {
        status: 'error',
        message: lang === 'ru' ? 'Аккаунт с таким email уже существует!' : 'An account with this email already exists!'
    }
    searchedUser = await prisma.user.findFirst({
        where: {
            login: {
                contains: _login,
                mode: 'insensitive'
            }
        }
    });
    if(searchedUser) return {
        status: 'error',
        message: lang === 'ru' ? 'Аккаунт с таким логином уже существует!' : 'An account with this login already exists!'
    }
    await prisma.user.create({
        data: {
            login: _login,
            email: _email.toLowerCase(),
            password: await argon2.hash(_password)
        }
    })
    return {
        status: 'success',
        message: lang === 'ru' ? 'Вы успешно зарегистрировались!' : 'You have successfully registered!'
    }
}