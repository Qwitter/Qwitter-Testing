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
}

export default new AccountSettingsPage();