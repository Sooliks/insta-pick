'use client'
import React, {useState} from 'react';
import InputForm from "@/components/ui/InputForm";
import {Button} from "@nextui-org/react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useConfigContext} from "@/contexts/ConfigContextProvider";
import {getDictionary} from "@/dictionaries/dictionary";
import {signUp} from "@/server-actions/authorization";
import {toast} from "react-toastify";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';

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
        formState: { errors },
        watch
    } = useForm<RegisterValues>({mode: 'onChange'});
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const configContext = useConfigContext();
    const dictionary = getDictionary(configContext.config.currentLanguage);
    const {replace} = useRouter();
    const onSubmit: SubmitHandler<RegisterValues> = async (data) => {
        setIsLoading(true)
        const res = await signUp(data.login, data.email, data.password,configContext.config.currentLanguage);
        if(res.status === "success"){
            const r = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            })
            if(r && !r.error){
                replace('/main')
            }
        }else {
            toast.error(res.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setIsLoading(false)
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
                        required: dictionary.errors.requiredPassword,
                        validate: () => {
                            if (watch('password').length <= 8) {
                                return dictionary.errors.passwordLength;
                            }
                        }
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
                                return dictionary.errors.passwordsDoNoMatch;
                            }
                        }
                    })
                }}
            />
            <Button className={"mt-2"} color={"primary"} type={'submit'} isLoading={isLoading}>{dictionary.components.buttons.signUp}</Button>
        </form>
    );
};

export default RegistrationPage;