class ForgotPasswordPage{
    get signInPageHeader(){
        return cy.contains('p', 'Sign in to Quitter')
    }
    get forgotPasswordButton(){
        return cy.contains('Forgot Password?')
    }
    get newPasswordHeader(){
        return cy.contains('h2', 'Choose a new password')
    }
    get newPasswordField(){
        return cy.get('input[name="Password"]')
    }
    get confirmNewPasswordField(){
        return cy.get('input[name="ConfirmPassword"]')
    }
    get changePasswordButton(){
        return cy.get('button[role="submitButton"]')
    }
}

export default new ForgotPasswordPage();