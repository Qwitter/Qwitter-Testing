class AccountSettingsPage{
    get settingsButton(){
        return cy.get('[data-testid="Settings"]')
    }
    get accountInformation(){
        return cy.get('[data-testid="Account information"]')
    }
    get changeYourPassword(){
        return cy.get('[data-testid="Change your password"]')
    }
    get userNameSettings(){
        return cy.get('[data-testid="UserNameButton"]')
    }
    get emailSettings(){
        return cy.get('[data-testid="EmailButton"]')
    }
    get back(){
        return cy.get('[data-testid="Back"]')
    }
    get save(){
        return cy.get('[role="save"]')
    }
    get usernameField(){
        return cy.get('[data-testid="username"]')
    }
    get usernameSuggestions(){
        return cy.get('[data-testid="UsernameSuggestions"] > li')
    }
    get errorMessage(){
        return cy.get('[data-testid="ErrorMessage"]')
    }
    get updateEmailButton(){
        return cy.contains('Update email address')
    }
    get passwordField(){
        return cy.get('#Password')
    }
    get emailField(){
        return cy.get('#email')
    }
    get verificationCodeField(){
        return cy.get('#token')
    }
    get changeEmailHeader(){
        return cy.contains('Change email')
    }
    get verificationCodeHeader(){
        return cy.contains('We sent you a code')
    }
    get wrongPasswordMessage(){
        return cy.contains('Wrong password!')
    }
    get next(){
        return cy.contains('button' ,'Next')
    }
    get cancel(){
        return cy.contains('button', 'Cancel')
    }
    get currentEmailScreen(){
        return cy.get('#email')
    }
    get emailErrorMessage(){
        return cy.get('[data-testid="ErrorMessage"]')
    }
}

export default new AccountSettingsPage();