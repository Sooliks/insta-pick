import {LanguageType} from "@/types/language";

export const getLocalization = (): LanguageType => {
    const locale = navigator.language;
    return locale === 'ru-RU' ? 'ru' : 'en'
}