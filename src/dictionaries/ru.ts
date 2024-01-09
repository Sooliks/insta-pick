import {LocalizationType} from "@/types/localization";

export const ru: LocalizationType = {
    metadata: {
        title: 'Инстапик',
        mainDescription: 'Минимальная социальная сеть, заходи и выбирай диалог'
    },
    components: {
        selectLanguageLabel: 'Выберите язык',
        mainMenu: {
            exit: 'Выйти из аккаунта',
            messenger: 'Сообщения'
        },
        buttons: {
            start: 'Начать',
            signIn: 'Войти',
            regMenu: 'Регистрация',
            signInMenu: 'Войти',
            signUp: 'Зарегистрироваться'
        },
        inputs: {
            inputEmail: 'Введите email',
            inputLogin: 'Введите логин',
            inputPassword: 'Введите пароль'
        }
    },
    errors: {
        requiredEmail: 'Пожалуйста введите свой email',
        requiredPassword: 'Пожалуйста введите свой пароль',
        requiredLogin: 'Пожалуйста введите свой логин',
        invalidEmail: 'Введите корректный email',
        invalidLogin: 'Введите корректный логин',
        passwordsDoNoMatch: 'Пароли не совпадают',
        invalidEmailOrPass: 'Неверный email или пароль',
        passwordLength: 'Пароль должен быть больше 8-ми символов'
    }
}