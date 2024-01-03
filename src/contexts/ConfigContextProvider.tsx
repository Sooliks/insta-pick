'use client'
import React, {createContext, useContext, useEffect, useState} from 'react';
import {ConfigType} from "@/types/config";
import {LanguageType} from "@/types/language";
import {useRouter} from "next/navigation";


type ConfigContextProviderProps = {
    children: React.ReactNode
    lang: LanguageType
}
type ConfigContextType = {
    config: ConfigType;
    setConfig: React.Dispatch<React.SetStateAction<ConfigType>>
}
const ConfigContext = createContext({} as ConfigContextType)
export const useConfigContext = () =>  useContext(ConfigContext);
const defaultConfig: ConfigType = {
    currentLanguage: 'en'
}
const ConfigContextProvider: React.FC<ConfigContextProviderProps> = ({children, lang}) => {
    const router = useRouter();
    const [config,setConfig] = useState<ConfigType>({
        ...defaultConfig, currentLanguage: lang
    });
    useEffect(()=>{
        router.replace(config.currentLanguage)
    },[config])
    return (
        <ConfigContext.Provider value={{config,setConfig}}>{children}</ConfigContext.Provider>
    );
};

export default ConfigContextProvider;