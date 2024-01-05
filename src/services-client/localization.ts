import {LanguageType} from "@/types/language";
import {cookies} from "next/headers";

export const getLocalization = (): LanguageType => {
    const locale = navigator.language;
    return locale === 'ru-RU' ? 'ru' : 'en'
}