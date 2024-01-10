'use client'
import React from 'react';
import {Input} from "@nextui-org/react";
import {useConfigContext} from "@/contexts/ConfigContextProvider";
import {getDictionary} from "@/dictionaries/dictionary";
import {SubmitHandler, useForm} from "react-hook-form";

type SearchValues = {
    login: string
}
const AddDialog: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm<SearchValues>({mode: 'onChange'});
    const configContext = useConfigContext();
    const dictionary = getDictionary(configContext.config.currentLanguage);
    const onSubmit: SubmitHandler<SearchValues> = async (data) => {
        reset()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input color={"warning"} placeholder={dictionary.components.inputs.searchUser} {...register('login')}/>
        </form>
    );
};

export default AddDialog;