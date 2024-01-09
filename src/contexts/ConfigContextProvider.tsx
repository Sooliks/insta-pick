"use client"

import React, {createContext, useContext, useState} from 'react';
import {ConfigType} from "@/types/config";
import {getLocalization} from "@/services-client/localization";
import {getCookie} from "typescript-cookie";
import {LanguageType} from "@/types/language";
import {usePathname, useRouter} from "next/navigation";
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
    currentLanguage: 'en'
}
const ConfigContextProvider: React.FC<ConfigContextProviderProps> = ({children}) => {
    const [config,setConfig] = useState<ConfigType>({
        ...defaultConfig, currentLanguage: getCookie('language') as LanguageType || getLocalization()
    });
    return (
        <ConfigContext.Provider value={{config,setConfig}}>{children}</ConfigContext.Provider>
    );
};

export default ConfigContextProvider;