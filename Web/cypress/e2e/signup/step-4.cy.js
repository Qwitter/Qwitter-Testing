import SignUpPage from '../../support/page-objects/signup'
import {checkStepNumber,  goToStep} from '../../utils/signup/signup'
const data = require('../../fixtures/signup-data.json')

describe('Signup test suite for step four', ()=>{
    beforeEach('sign up page - step four', ()=>{
        cy.clearCookies()
        cy.clearLocalStorage()

        cy.visit('i/flow/signup')
        SignUpPage.signUpPageHeader.should('have.text', 'Create your account')
        cy.url().should('include', 'signup')

        goToStep(4)
        // check the current step 2 of 5
        //checkStepNumber(4)
        SignUpPage.verficationCodeField.should('be.visible')
        SignUpPage.nextButton.should('be.visible').should('not.be.enabled')
    })
    
    it('enter invalid verification code', ()=>{
        SignUpPage.verficationCodeField.type(data.invalidVerificationCode)
        SignUpPage.verficationCodeField.should('have.value', data.invalidVerificationCode)

        SignUpPage.nextButton.should('be.disabled')
        cy.contains('Invalid token')
        .should('be.visible')
    })

    it('ensure small verification code', () =>{
        SignUpPage.verficationCodeField.type(data.smallVerificationCode)
        SignUpPage.nextButton.should('be.disabled')
    })
    
    it('ensure long verification code', ()=>{
        SignUpPage.verficationCodeField.type(data.longVerificationCode)
        SignUpPage.nextButton.should('be.disabled')
    })

    it.skip('try to go back to step three', ()=>{ // doesn't implemented
        SignUpPage.backButton.should('be.visible')
        SignUpPage.backButton.click()
        checkStepNumber(4) // you can't return to test 3
    })

    it('enter valid verification code and proceed', ()=>{
        SignUpPage.verficationCodeField.type(data.validVerificationCode)
        SignUpPage.verficationCodeField.should('have.value', data.validVerificationCode)

        SignUpPage.nextButton.should('be.enabled')
        SignUpPage.nextButton.click()
        
        checkStepNumber(5)
        cy.contains("You'll need a password")
        .should('be.visible')
    }) 

})