import SignUpPage from '../../support/page-objects/signup'
import {checkStepNumber,  goToStep} from '../../utils/signup/signup'
const data = require('../../fixtures/signup-data.json')

describe('Signup test suite for step two', ()=>{
    beforeEach('sign up page - step two', ()=>{
        cy.clearCookies()
        cy.clearLocalStorage()

        cy.visit('/i/flow/signup')
        SignUpPage.signUpPageHeader.should('have.text', 'Create your account')
        cy.url().should('include', 'signup')

        goToStep(2)
        // check the current step 2 of 5
        checkStepNumber(2)
        SignUpPage.nextButton.should('be.visible')
        .should('be.enabled')
    })
    
    it('go to step three with approving to X content be tracked and then return back', ()=>{
        SignUpPage.xContentCheckBox.should('be.checked')
        SignUpPage.nextButton.click()
        checkStepNumber(3)

        SignUpPage.backButton.should('be.visible')
        SignUpPage.backButton.click()

        SignUpPage.xContentCheckBox.should('be.checked')
        checkStepNumber(2)
    })

    it('go to step three without approving to X content be tracked and then get back', ()=>{
        SignUpPage.xContentCheckBox.click().should('not.be.checked')
        SignUpPage.nextButton.click()
        checkStepNumber(3)

        SignUpPage.backButton.should('be.visible')
        SignUpPage.backButton.click()
        checkStepNumber(2)
        SignUpPage.xContentCheckBox.should('not.be.checked')
    })
})