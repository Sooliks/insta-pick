import {LocalizationType} from "@/types/localization";

export interface ILanguage {
    [key: string]: LocalizationType;
}

export type LanguageType = 'en' | 'ru' | string;