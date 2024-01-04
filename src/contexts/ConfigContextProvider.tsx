'use client'
import React, {createContext, useContext, useLayoutEffect, useState} from 'react';
import {ConfigType} from "@/types/config";
import {getLocalization} from "@/services-client/localization";

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
        ...defaultConfig, currentLanguage: window.localStorage.getItem('language') || getLocalization()
    });
    useLayoutEffect(()=> {
        window.localStorage.setItem('language', config.currentLanguage);
    },[config])
    return (
        <ConfigContext.Provider value={{config,setConfig}}>{children}</ConfigContext.Provider>
    );
};

export default ConfigContextProvider;