import SignUpPage from '../../support/page-objects/signup'
import {checkStepNumber,  goToStep} from '../../utils/signup/signup'
const data = require('../../fixtures/signup-data.json')

describe('Signup test suite for step five', ()=>{
    beforeEach('sign up page - step five', ()=>{
        cy.clearCookies()
        cy.clearLocalStorage()

        cy.visit('i/flow/signup')
        SignUpPage.signUpPageHeader.should('have.text', 'Create your account')
        cy.url().should('include', 'signup')

        goToStep(5)
        // check the current step 2 of 5
        checkStepNumber(5)
        SignUpPage.nextButton.should('be.visible').should('not.be.enabled')
    })
    
    it('check back button to be unvisible', ()=>{
        SignUpPage.backButton.should('not.be.visible')
    })

    it('enter smaller password', ()=>{
        //GO to Passord Step (at this time there's no verification code step)
        SignUpPage.passwordField.type(data.invalidPassword)
        cy.contains('Your password needs to be at least 8 characters. Please enter a longer one.')
        .should('be.visible')
        SignUpPage.nextButton.should('be.visible')
        .should('be.disabled')
    })

    it('enter weak password only numbers and try to proceed', ()=>{
        SignUpPage.passwordField.type(data.weakPasswordNums)
        cy.contains('Password must contain at least one letter')
        .should('be.visible')
        SignUpPage.nextButton.should('be.visible')
        .should('be.disabled')
    })

    
    it('password must be hidden at first then proceed with strong password', ()=>{
        SignUpPage.passwordField.type(data.strongPassword)
        SignUpPage.passwordField.should('have.attr', 'type', 'password')
        SignUpPage.showPasswordButton.click()
        
        SignUpPage.passwordField.should('have.attr', 'type', 'text')
        SignUpPage.passwordField.should('have.value', data.strongPassword)
        SignUpPage.nextButton.should('be.visible').click()
        
        cy.url().should('include', 'profile')
        cy.contains('Pick a profile picture')
        .should('be.visible')
    })
    
})