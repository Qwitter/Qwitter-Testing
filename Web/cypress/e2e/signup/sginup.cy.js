import SignUpPage from '../../support/page-objects/signup'
import { goToStep, createEmail } from '../../utils/signup/signup'
import { login } from '../../utils/login'
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
        
        let testEmail = createEmail()
        goToStep(6, testEmail, true)
        cy.url().should('include', 'profile')
        
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit('')
        login(testEmail, data.strongPassword)

        cy.url().should('include', '/account')
    })
})