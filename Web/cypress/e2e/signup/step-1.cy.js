import SignUpPage from '../../support/page-objects/signup'
import {checkStepNumber,  selecDateOfBirth, checkStepOneData} 
    from '../../utils/signup/signup'
const data = require('../../fixtures/signup-data.json')

describe('Signup test suite for step one', ()=>{
    beforeEach('sign up page - step one', ()=>{
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit('')

        SignUpPage.loginPageTitle.should('be.visible')
        SignUpPage.createAccount.should('be.visible')
        //SignUpPage.signupWithGoogle.should('be.visible')
        SignUpPage.createAccount.click()
        SignUpPage.signUpPageHeader.should('be.visible')
        cy.url().should('include', '/signup')
        // check the current step 1 of 5
        checkStepNumber(1)
        SignUpPage.nextButton.should('be.visible').should('be.disabled')
        SignUpPage.nameField.should('be.visible')
        SignUpPage.emailField.should('be.visible')
    })
    
    it('enter empty name, valid email and date', ()=>{
        SignUpPage.emailField.type(data.validEmail)
        .should('have.value', data.validEmail)
        
        selecDateOfBirth(data.validBirthDate)
        SignUpPage.nextButton.should('be.visible').should('be.disabled')
    })

    it('enter a name with more than 50 chars and valid email and date ', ()=>{
        SignUpPage.emailField.type(data.validEmail)
        .should('have.value', data.validEmail)
        
        selecDateOfBirth(data.validBirthDate)
        SignUpPage.nextButton.should('be.visible').should('be.disabled')

        const name = 'X'.repeat(55);
        SignUpPage.nameField.type(name)
        .should(($value)=>{
            expect($value.val().length).to.eq(50)
        })
    })

    it('enter valid name, invalid email and valid date', ()=>{
        SignUpPage.nameField.type(data.name).should('have.value', data.name)
        selecDateOfBirth(data.validBirthDate)

        SignUpPage.emailField.type(data.invalidEmail)
        .should('have.value', data.invalidEmail)
        
        cy.contains('Please enter a valid email')
        .should('be.visible')
        SignUpPage.nextButton.should('be.visible').should('be.disabled')
    })

    it.skip('enter valid name, existing email and valid date', ()=>{
        SignUpPage.nameField.type(data.name).should('have.value', data.name)
        selecDateOfBirth(data.validBirthDate)

        SignUpPage.emailField.type(data.existingEmail)
        .should('have.value', data.existingEmail)

        cy.contains('Email has already been taken')
        .should('be.visible')
        SignUpPage.nextButton.should('be.visible')
        .should('be.disabled')
    })

    it('enter valid name and email and invalid date', ()=>{
        SignUpPage.nameField.type(data.name)
        .should('have.value', data.name)
        selecDateOfBirth(data.invalidBirthDate)

        SignUpPage.emailField.type(data.validEmail)
        .should('have.value', data.validEmail)

        cy.contains('Must be older than 18 years')
        .should('be.visible')
    })

    it('enter user data, proceed then return to check data', ()=>{
        SignUpPage.nameField.type(data.name)
        .should('have.value', data.name)        
        SignUpPage.emailField.type(data.validEmail)
        .should('have.value', data.validEmail)

        SignUpPage.nextButton.should('be.visible').should('be.disabled')
        selecDateOfBirth(data.validBirthDate)
        SignUpPage.nextButton.should('be.visible').should('be.enabled')
        SignUpPage.nextButton.click()
        checkStepNumber(2);
        
        SignUpPage.backButton.should('be.visible')
        SignUpPage.backButton.click()

        checkStepOneData(data.name, data.validEmail, data.validBirthDate)
    })

    it('exit sigun up page', ()=>{
        SignUpPage.closeButton.should('be.visible')
        SignUpPage.closeButton.click()
        SignUpPage.loginPageTitle.should('be.visible')
    })
})