import SignUpPage from '../../support/page-objects/signup'
import {checkStepNumber,  goToStep, checkStepOneData} 
    from '../../utils/signup/signup'
const data = require('../../fixtures/signup-data.json')

describe('Signup test suite for step three', ()=>{
    beforeEach('sign up page - step three', ()=>{
        cy.clearCookies()
        cy.clearLocalStorage()

        cy.visit('/i/flow/signup')
        cy.url().should('include', 'signup')

        goToStep(3)
        // check the current step 2 of 5
        checkStepNumber(3)
        SignUpPage.signUpButton.should('be.visible').should('be.enabled')
        SignUpPage.nameAssertion.should('be.visible')
        SignUpPage.emailAssertion.should('be.visible')
        SignUpPage.dateOfBirthAssertion.should('be.visible')
    })
    
    it('go back to step two', ()=>{
        SignUpPage.backButton.should('be.visible')
        SignUpPage.backButton.click()
        checkStepNumber(2)
        SignUpPage.nextButton.should('be.enabled')
    })
    
    it('click name field and then check step one entered data', ()=>{
        SignUpPage.nameAssertion.click()
        checkStepOneData(data.name, data.validEmail, data.validBirthDate)
    })

    it('click email field and then check step one entered data', ()=>{
        SignUpPage.emailAssertion.click()
        checkStepOneData(data.name, data.validEmail, data.validBirthDate)
    })

    it('click DOB field and then check step one entered data', ()=>{
        SignUpPage.dateOfBirthAssertion.click()
        checkStepOneData(data.name, data.validEmail, data.validBirthDate)
    })

    it('check entered data and sign up - go to step 4', ()=>{
        const month = data.validBirthDate.month.substring(0, 3)
        const day = data.validBirthDate.day
        const year = data.validBirthDate.year

        SignUpPage.nameAssertion.should('have.value', data.name)
        SignUpPage.emailAssertion.should('have.value', data.validEmail)
        SignUpPage.dateOfBirthAssertion.should('have.value',
            `${month} ${day}, ${year}`)
        
        SignUpPage.signUpButton.should('be.visible')
        SignUpPage.signUpButton.click()
        checkStepNumber(4)
    })
})