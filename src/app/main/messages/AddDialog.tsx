'use client'
import React from 'react';
import {Input} from "@nextui-org/react";
import {useConfigContext} from "@/contexts/ConfigContextProvider";
import {getDictionary} from "@/dictionaries/dictionary";
import {SubmitHandler, useForm} from "react-hook-form";
import {createChat} from "@/server-actions/messages";
import {toast} from "react-toastify";
import {usePathname, useRouter} from "next/navigation";

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

        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input color={"warning"} placeholder={dictionary.components.inputs.searchUser} {...register('login')}/>
        </form>
    );
};

export default AddDialog;