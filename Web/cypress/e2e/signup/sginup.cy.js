import SignUpPage from '../../support/page-objects/signup'
import { goToStep } from '../../utils/signup/signup'
const data = require('../../fixtures/signup-data.json')

describe('Sign up form another endpoints', () => {
    beforeEach('open login page', () => {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit('')
    })

    it('sign up from singup link in login page', () => {
        SignUpPage.sginIn.click()
        SignUpPage.signupLink.click()
        SignUpPage.createAccount.click()
        
        let testEmail = `test.${new Date().getTime()}@${Cypress.env("MAILISK_NAMESPACE")}.mailisk.net`;
        goToStep(6, testEmail, true)
        cy.url().should('include', 'profile')
        
        
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit('')
        // here i should use a module of login but the teammate didn't push it yet
        SignUpPage.sginIn.click()
        SignUpPage.emailField.type(testEmail)
        SignUpPage.nextButton.click()
        SignUpPage.passwordField.type(data.strongPassword)
        SignUpPage.logIn.click()

        cy.url().should('include', '/account')
    })

    
})