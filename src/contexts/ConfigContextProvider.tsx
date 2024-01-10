"use client"
import React, {createContext, useContext, useLayoutEffect, useState} from 'react';
import {ConfigType} from "@/types/config";
import {getLocalization} from "@/services-client/localization";
import {getCookie, removeCookie} from "typescript-cookie";
import {LanguageType} from "@/types/language";
type ConfigContextProviderProps = {
    children: React.ReactNode
}
type ConfigContextType = {
    config: ConfigType;
    setConfig: React.Dispatch<React.SetStateAction<ConfigType>>
}
const ConfigContext = createContext({} as ConfigContextType)
export const useConfigContext = () =>  useContext(ConfigContext);
const defaultConfig: ConfigType = {
    currentLanguage: getCookie('language') as LanguageType || getLocalization()
}
const ConfigContextProvider: React.FC<ConfigContextProviderProps> = ({children}) => {
    const [config,setConfig] = useState<ConfigType>({
        ...defaultConfig, currentLanguage: getCookie('language') as LanguageType || getLocalization()
    });
    useLayoutEffect(()=>{
        const language: LanguageType = getCookie('language') as LanguageType;
        removeCookie('language')
        setConfig({...config, currentLanguage: language})
    },[])
    return (
        <ConfigContext.Provider value={{config,setConfig}}>{children}</ConfigContext.Provider>
    );
};

export default ConfigContextProvider;