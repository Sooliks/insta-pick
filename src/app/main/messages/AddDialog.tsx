'use client'
import React from 'react';
import {Button, Input} from "@nextui-org/react";
import {useConfigContext} from "@/contexts/ConfigContextProvider";
import {getDictionary} from "@/dictionaries/dictionary";
import {SubmitHandler, useForm} from "react-hook-form";
import {createChat} from "@/server-actions/messages";
import 'react-toastify/dist/ReactToastify.css';
import {usePathname, useRouter} from "next/navigation";
import {toast} from "react-toastify";

type SearchValues = {
    login: string
}
const AddDialog: React.FC = () => {
    const pathname = usePathname()
    const {
        register,
        handleSubmit,
        reset
    } = useForm<SearchValues>({mode: 'onChange'});
    const configContext = useConfigContext();
    const dictionary = getDictionary(configContext.config.currentLanguage);
    const router = useRouter()
    if(pathname!=="/main/messages")return null;
    const onSubmit: SubmitHandler<SearchValues> = async (data) => {
        reset();
        const res = await createChat(data.login);
        if(res.status === "success"){
            router.refresh()
        }else {
            toast.error(res.message)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-row items-center"}>
            <Input color={"warning"} placeholder={dictionary.components.inputs.searchUser} {...register('login', {required: true})}/>
            <Button isIconOnly type={"submit"} className={"h-[56px] ml-1"}>+</Button>
        </form>
    );
};

export default AddDialog;