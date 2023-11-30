import SignUpPage from '../../support/page-objects/signup'
import {checkStepNumber,  goToStep, verifyEmail, createEmail} from '../../utils/signup/signup'
const data = require('../../fixtures/signup-data.json')

describe('Signup test suite for step four', ()=>{
    let cnt = 0;
    let testEmail;
    beforeEach('sign up page - step four', ()=>{
        //checkStepNumber(4) // skip for now because of recaptcha
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit('i/flow/signup')
        SignUpPage.signUpPageHeader.should('have.text', 'Create your account')
        cy.url().should('include', 'signup')

        testEmail = createEmail()
        goToStep(4, testEmail, true)
        cy.wait(3000)
        SignUpPage.verficationCodeField.should('be.visible')
        SignUpPage.nextButton.should('be.visible').should('not.be.enabled')
    })
    
    it('enter invalid verification code', ()=>{
        SignUpPage.verficationCodeField.type(data.invalidVerificationCode)
        SignUpPage.verficationCodeField.should('have.value', data.invalidVerificationCode)

        SignUpPage.nextButton.click()
        cy.wait(1000)
        cy.contains('Wrong Token. Please check again')
        .should('be.visible')
    })

    it('ensure small verification code', () =>{
        
        SignUpPage.verficationCodeField.type(data.smallVerificationCode)
        SignUpPage.nextButton.should('be.disabled')
    })
    
    it('ensure long verification code', ()=>{
        SignUpPage.verficationCodeField.clear()
        SignUpPage.verficationCodeField.type(data.longVerificationCode)
        SignUpPage.nextButton.should('be.disabled')
    })

    it('can not back to step three', ()=>{ 
        SignUpPage.backButton.should('not.exist')
    })

    it('enter valid verification code and proceed', ()=>{
        verifyEmail(testEmail).then((code) => {
            SignUpPage.verficationCodeField.type(code)
            SignUpPage.verficationCodeField.should('have.value', code)
        });

        SignUpPage.nextButton.should('be.enabled')
        SignUpPage.nextButton.click()
        
        // checkStepNumber(5) skip for now because of recaptch deletion
        cy.contains("You'll need a password")
        .should('be.visible')
    }) 

})