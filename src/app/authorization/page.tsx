'use client'
import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {Button, Input} from "@nextui-org/react";

type LoginValues = {
    email: string
    password: string
}
const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isLoading }
    } = useForm<LoginValues>({mode: 'onChange'});
    const onSubmit: SubmitHandler<LoginValues> = (data) => {

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input type={"email"} className={"mt-2"} placeholder={'Введите email'} {...register('email', {required: 'Пожалуйста введите свой email'})}/>
            <Input type={"password"} className={"mt-2"} placeholder={'Введите пароль'} {...register('password', {required: 'Пожалуйста введите свой пароль'})}/>
            <Button className={"mt-2"} color={"primary"} type={'submit'} isLoading={isLoading}>Войти</Button>
        </form>
    );
};

export default LoginPage;