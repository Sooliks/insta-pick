"use client"
import React, {ChangeEvent} from 'react';
import {Select, SelectItem} from "@nextui-org/react";
import {languages} from "@/data/languages";
import {useConfigContext} from "@/contexts/ConfigContextProvider";
import {getDictionary} from "@/dictionaries/dictionary";
import {LanguageType} from "@/types/language";
import {setCookie} from "typescript-cookie";
import {useRouter} from "next/navigation";
const SelectLanguage: React.FC = () => {
    const configContext = useConfigContext();
    const dictionary = getDictionary(configContext.config.currentLanguage);
    const {refresh} = useRouter()
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        configContext.setConfig({...configContext.config, currentLanguage: e.target.value as LanguageType})
        setCookie('language', e.target.value, {expires: 360})
        refresh()
    }
    return (
        <Select
            label={dictionary.components.selectLanguageLabel}
            className="max-w-xs m-4 absolute"
            onChange={handleSelect}
            selectedKeys={[configContext.config.currentLanguage]}
        >
            {languages.map((language) => (
                <SelectItem key={language.localization} value={language.localization}>
                    {language.label}
                </SelectItem>
            ))}
        </Select>
    );
};

export default SelectLanguage;