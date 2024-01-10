import {LocalizationType} from "@/types/localization";


export const en: LocalizationType = {
    metadata: {
        title: 'Instapick',
        mainDescription: 'Minimal social network, choose a dialog right away'
    },
    components: {
        selectLanguageLabel: 'Select a language',
        mainMenu: {
            exit: 'Sign out',
            messenger: 'Messenger',
            news: 'News'
        },
        buttons: {
            start: 'Get started',
            signIn: 'Sign in',
            regMenu: 'Sign up',
            signInMenu: 'Sign in',
            signUp: 'Sign up'
        },
        inputs: {
            inputEmail: 'Enter your email',
            inputLogin: 'Enter your login',
            inputPassword: 'Enter your password',
            searchUser: 'Add dialog'
        }
    },
    errors: {
        requiredEmail: 'Please enter your email',
        requiredPassword: 'Please enter your password',
        requiredLogin: 'Please enter your login',
        invalidEmail: 'Invalid email address',
        invalidLogin: 'Invalid login',
        passwordsDoNoMatch: 'Your passwords do no match',
        invalidEmailOrPass: 'Invalid email or password',
        passwordLength: 'The password must be more than 8 characters long',
        notFoundDialogs: 'Not found dialogs'
    }
}