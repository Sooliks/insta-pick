'use client'
import React from 'react';
import InputForm from "@/components/ui/InputForm";
import {Button} from "@nextui-org/react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useConfigContext} from "@/contexts/ConfigContextProvider";
import {getDictionary} from "@/dictionaries/dictionary";

type RegisterValues = {
    email: string
    password: string
    secondPassword: string
    login: string
}
const RegistrationPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isLoading },
        watch
    } = useForm<RegisterValues>({mode: 'onChange'});
    const configContext = useConfigContext();
    const dictionary = getDictionary(configContext.config.currentLanguage);
    const onSubmit: SubmitHandler<RegisterValues> = async (data) => {

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"w-3/5"}>
            <InputForm
                error={errors.email?.message}
                type={"email"}
                placeholder={dictionary.components.inputs.inputEmail}
                form={{
                    ...register('email', {
                        required: dictionary.errors.requiredEmail,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: dictionary.errors.invalidEmail
                        }
                    })
                }}
            />
            <InputForm
                error={errors.login?.message}
                type={"login"}
                placeholder={dictionary.components.inputs.inputLogin}
                form={{
                    ...register('login', {
                        required: dictionary.errors.requiredLogin,
                        pattern: {
                            value: /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,19}$/,
                            message: dictionary.errors.invalidLogin
                        }
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
            <InputForm
                error={errors.secondPassword?.message}
                type={"password"}
                placeholder={dictionary.components.inputs.inputPassword}
                form={{
                    ...register('secondPassword', {
                        required: dictionary.errors.requiredPassword,
                        validate: (value: string) => {
                            if (watch('password') !== value) {
                                return "Your passwords do no match";
                            }
                        },
                    })
                }}
            />
            <Button className={"mt-2"} color={"primary"} type={'submit'} isLoading={isLoading}>{dictionary.components.buttons.signUp}</Button>
        </form>
    );
};

export default RegistrationPage;