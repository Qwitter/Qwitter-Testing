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
    get passwordEyeButton(){
        return cy.get('[data-testid="passwordEye"]')
    }
    get changePasswordButton(){
        return cy.get('button[role="submitButton"]')
    }
    get exitButton(){
        return cy.get('[data-testid="popupHeaderButton"]')
    }
    get backButton(){
        return cy.get('[data-testid="popupHeaderButton"]')
    }

}

export default new ForgotPasswordPage();