class SignUpPage{
    get loginPageTitle(){  
        return cy.contains('p', 'Happening now')
    }
    get signUpPageHeader(){
        return cy.contains('h2', 'Create your account')
    }
    get signUpWithGoogle(){
        return cy.get('[data-testid="google-signup"]')
    }
    get createAccount(){
        return cy.contains('button', 'Create account')
    }
    get signupStep(){
        return cy.get('[data-testid="stepNum"]')
    }
    get nameField(){
        return cy.get('input[name="name"]')
    }
    get emailField(){
        return cy.get('input[name="email"]')
    }
    get nameAssertion(){
        return cy.get('[data-testid="nameAssert"]')
    }
    get emailAssertion(){
        return cy.get('[data-testid="emailAssert"]')
    }
    get dateOfBirthAssertion(){
        return cy.get('[data-testid="dateOfBirthAssert"]')
    }
    get emailErrorMessage(){
        return cy.get('h5[class="text-danger text-[15px] pb-3 px-2"]')
    }
    get birthMonthField(){
        return cy.get('[data-testid="months"]')
    }
    get birthDayField(){
        return cy.get('[data-testid="days"]')
    }
    get birthYearField(){
        return cy.get('[data-testid="years"]')
    }
    get nextButton(){
        return cy.contains('Next')
    }
    get signUpButton(){
        return cy.contains('button', 'Sign Up')
    }
    get xContentCheckBox(){
        return cy.get('#check')
    }
    get closeButton(){
        return cy.get('[data-testid="popupHeaderButton"]')
    }
    get backButton(){
        return cy.get('[data-testid="popupHeaderButton"]')
    }
    get verficationCodeField(){
        return cy.get('input[name="token"]')
    }
    get notRecivedEmail(){
        return cy.get('')
    }
    get passwordField(){
        return cy.get('input[name="password"]')
    }
    get showPasswordButton(){
        return cy.get('[data-testid="passwordEye"]')
    }
    get profilePicHeader(){
        return cy.contains('h2', 'Pick a profile picture')
    }
    get profilePicField(){
        return cy.get('[data-testid="imageBtn"]')
    }
    get usernameHeader(){
        return cy.contains('h2', 'What should we call you?')
    }
    get usernameField(){
        return cy.get('input[name="username"]')
    }
    get showMoreUsername(){
        return cy.get('[data-testid="ShowMore"]')
    }
    get nextButtonOfUsername(){
        return cy.contains('button', 'Next')
    }
    get notificationHeader(){
        return cy.contains('h2', 'Turn on notifications')
    }
    get allowNotifiacton(){
        return cy.contains('button', 'Allow notifications')
    }
    get signupLink(){
        return cy.get('[data-testid="signupLink"]')
    }
    get sginIn(){
        return cy.contains('button', 'Sign in')
    }
}

export default new SignUpPage();