
export const getLocalization = (): 'ru' | 'en' => {
    const locale = navigator.language;
    return locale === 'ru-RU' ? 'ru' : 'en'
}