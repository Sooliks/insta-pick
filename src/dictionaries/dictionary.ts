import {ILanguage, LanguageType} from "@/types/language";
import {en} from "@/dictionaries/en";
import {ru} from "@/dictionaries/ru";
export const dictionary: ILanguage = {
    en: en,
    ru: ru
}
export const getDictionary = (locale: LanguageType) => dictionary[locale] || en;