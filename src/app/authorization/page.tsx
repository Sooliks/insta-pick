'use client'
import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "@nextui-org/react";
import {signIn} from "next-auth/react";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useConfigContext} from "@/contexts/ConfigContextProvider";
import {getDictionary} from "@/dictionaries/dictionary";
import InputForm from "@/components/ui/InputForm";
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
    const configContext = useConfigContext();
    const dictionary = getDictionary(configContext.config.currentLanguage);
    const onSubmit: SubmitHandler<LoginValues> = async (data) => {
        const res = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })
        if(res && !res.error){

        }else {
            toast.error('Неверный email или пароль!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"w-3/5"}>
            <InputForm
                error={errors.email?.message}
                type={"email"}
                placeholder={dictionary.components.inputs.inputEmail}
                form={{
                    ...register('email', {
                        required: dictionary.errors.requiredEmail
                    })
                }}
            />
            <InputForm
                error={errors.password?.message}
                type={"password"}
                placeholder={dictionary.components.inputs.inputPassword}
                form={{
                    ...register('password', {
                        required: dictionary.errors.requiredPassword
                    })
                }}
            />
            <Button className={"mt-2"} color={"primary"} type={'submit'} isLoading={isLoading}>{dictionary.components.buttons.signIn}</Button>
        </form>
    );
};

export default LoginPage;