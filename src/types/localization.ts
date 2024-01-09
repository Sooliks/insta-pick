export type LocalizationType = {
    metadata: {
        title: string
        mainDescription: string
    }
    components: {
        selectLanguageLabel: string
        mainMenu: {
            exit: string
        }
        buttons: {
            start: string
            signIn: string
            signInMenu: string
            regMenu: string
            signUp: string
        }
        inputs: {
            inputEmail: string
            inputPassword: string
            inputLogin: string
        }
    },
    errors: {
        requiredEmail: string
        requiredPassword: string
        requiredLogin: string
        invalidEmail: string
        invalidLogin: string
        passwordsDoNoMatch: string
        invalidEmailOrPass: string
    }
}