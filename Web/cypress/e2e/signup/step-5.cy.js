import SignUpPage from '../../support/page-objects/signup'
import {checkStepNumber,  goToStep} from '../../utils/signup/signup'
const data = require('../../fixtures/signup-data.json')

describe('Signup test suite for step five', ()=>{
    let cnt = 0
    let testEmail
    beforeEach('sign up page - step five', ()=>{
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit('i/flow/signup')

        SignUpPage.signUpPageHeader.should('have.text', 'Create your account')
        cy.url().should('include', 'signup')
        testEmail = `test${cnt++}.${new Date().getTime()}@${Cypress.env("MAILISK_NAMESPACE")}.mailisk.net`;
        goToStep(5, testEmail, true)
        // check the current step 5 of 5
        //checkStepNumber(5) skip for now because of recaptch
        SignUpPage.passwordField.should('be.visible')
        SignUpPage.passwordField.clear()
        SignUpPage.nextButton.should('be.visible').should('not.be.enabled')
    })
    
    it('enter smaller password and check back button', ()=>{
        //GO to Passord Step (at this time there's no verification code step)
        SignUpPage.passwordField.type(data.invalidPassword)
        cy.contains('Your password needs to be at least 8 characters. Please enter a longer one.')
        .should('be.visible')
        SignUpPage.nextButton.should('be.visible')
        .should('be.disabled')
        SignUpPage.backButton.should('not.be.visible')
    })

    it('enter weak password only numbers and try to proceed', ()=>{
        SignUpPage.passwordField.type(data.weakPasswordNums)
        SignUpPage.passwordField.should('have.attr', 'type', 'password')
        SignUpPage.showPasswordButton.click()
        
        SignUpPage.passwordField.should('have.attr', 'type', 'text')
        SignUpPage.passwordField.should('have.value', data.weakPasswordNums)

        cy.contains('Password must contain at least one letter')
        .should('be.visible')
        SignUpPage.nextButton.should('be.visible')
        .should('be.disabled')
    })
    
    it.only('password must be hidden at first then proceed with strong password and signin', ()=>{
        SignUpPage.passwordField.type(data.strongPassword)
        SignUpPage.nextButton.click()
        cy.url().should('include', 'profile')
        cy.contains('Pick a profile picture')
        .should('be.visible')

        cy.visit('')
        // here i should use a module of login but the teammate did it in his code
        SignUpPage.sginIn.click()
        SignUpPage.emailField.type(testEmail)
        SignUpPage.nextButton.click()
        SignUpPage.passwordField.type(data.strongPassword)
        SignUpPage.logIn.click()

        cy.url().should('include', 'account')
    })
    
})