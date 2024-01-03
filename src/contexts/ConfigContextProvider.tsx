'use client'
import React, {createContext, useContext, useEffect, useState} from 'react';
import {ConfigType} from "@/types/config";
import {LanguageType} from "@/types/language";
import {usePathname, useRouter} from "next/navigation";

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
    const pathname = usePathname();
    const [config,setConfig] = useState<ConfigType>({
        ...defaultConfig, currentLanguage: lang
    });
    useEffect(()=>{
        let newPath = pathname;
        const searchValue = '/' + newPath.split('/')[1];
        const replaceValue = '/' + config.currentLanguage;
        newPath = newPath.replace(searchValue, replaceValue)
        router.replace(newPath)
    },[config])
    return (
        <ConfigContext.Provider value={{config,setConfig}}>{children}</ConfigContext.Provider>
    );
};

export default ConfigContextProvider;