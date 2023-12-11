import SignUpPage from '../../support/page-objects/signup'
import ForgotPasswordPage from '../../support/page-objects/forgotpassword'
import { goToStep, createEmail } from '../../utils/signup/signup'
import { login } from '../../utils/login'
import { openPasswordPage } from '../../utils/forgotpassword/forgotpassword'
const data = require('../../fixtures/forgotpassword-data.json')

describe('Forgot password test suite', () => {
    let email
    before('create a new email', () => {
        email = createEmail()
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit('')
        SignUpPage.createAccount.click()
        goToStep(7, email, true)
    })

    beforeEach('Open forget password page', () => {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit('/i/flow/login')
        
        ForgotPasswordPage.signInPageHeader.should('be.visible')
        ForgotPasswordPage.forgotPasswordButton.should('be.visible')
        ForgotPasswordPage.forgotPasswordButton.click()
        cy.url().should('include', 'password_reset')
        
        SignUpPage.nextButton.should('be.disabled')
    })

    it('exit email step', () => {
        ForgotPasswordPage.exitButton.should('be.visible')
        ForgotPasswordPage.exitButton.click()

        cy.url().should('include', 'login')
        cy.contains('Sign in to Qwitter').should('be.visible')
    })

    it('enter invalid email', () => {
        SignUpPage.emailField.type(data.invalidEmail)
        cy.contains('Must be an email').should('be.visible')
        SignUpPage.nextButton.should('be.disabled')
    })

    it('enter not existing email', () => {
        SignUpPage.emailField.type(data.notExistingEmail)
        SignUpPage.nextButton.click()
        cy.contains('Email is not found').should('be.visible')
        SignUpPage.nextButton.should('be.enabled')
    })
    
    it('enter valid email and proceed', () => {
        SignUpPage.emailField.type(data.validEmail)
        SignUpPage.nextButton.click()
        cy.contains('We sent you a code')
        .should('be.visible')
    })

    it('back from verification code step', () => {
        SignUpPage.emailField.type(data.validEmail)
        SignUpPage.nextButton.click()
        
        SignUpPage.backButton.should('be.visible')
        SignUpPage.backButton.click()

        cy.url().should('include', 'login')
        cy.contains('Sign in to Qwitter').should('be.visible')
    })

    it('enter invalid verification code', () => {
        SignUpPage.emailField.type(data.validEmail)
        SignUpPage.nextButton.click()

        SignUpPage.verficationCodeField.type('123')
        SignUpPage.nextButton.should('be.disabled')
        SignUpPage.verficationCodeField.clear().type('123456789XXX') // a longer verification code
        SignUpPage.nextButton.should('be.disabled')

        SignUpPage.verficationCodeField.clear().type(data.invalidVerificationCode)
        SignUpPage.nextButton.click()
        cy.contains('Wrong Token. Please check again').should('be.visible')
    })

    it('enter invalid password and check its password page', ()=>{
        openPasswordPage(email)
        cy.contains('Choose a new Password')
        .should('be.visible')
        
        ForgotPasswordPage.newPasswordField.type(data.invalidPassword)
        cy.contains('Your password needs to be at least 8 characters. Please enter a longer one.')
        .should('be.visible')
        ForgotPasswordPage.changePasswordButton.should('be.disabled')

        ForgotPasswordPage.newPasswordField.clear().type(data.weakPassword)

        cy.contains('Password must contain at least one letter')
        .should('be.visible')
        .should('be.visible')
        ForgotPasswordPage.changePasswordButton.should('be.disabled')
    })

    it('enter different confirm password and check show password', () => {
        openPasswordPage(email)

        ForgotPasswordPage.newPasswordField.type(data.strongPassword)
        ForgotPasswordPage.changePasswordButton.should('be.disabled')

        ForgotPasswordPage.confirmNewPasswordField.type(data.weakPassword)
        cy.contains("Passwords do not match").should('be.visible')

        ForgotPasswordPage.newPasswordField.should('have.attr', 'type', 'password')
        ForgotPasswordPage.passwordEyeButton.first().should('be.visible')
        ForgotPasswordPage.passwordEyeButton.first().click()
        ForgotPasswordPage.newPasswordField.should('have.attr', 'type', 'text')
        ForgotPasswordPage.newPasswordField
        .should('have.value', data.strongPassword)
        
        ForgotPasswordPage.confirmNewPasswordField.should('have.attr', 'type', 'password')
        ForgotPasswordPage.passwordEyeButton.last().should('be.visible')
        ForgotPasswordPage.passwordEyeButton.last().click()
        ForgotPasswordPage.confirmNewPasswordField.should('have.attr', 'type', 'text')
        ForgotPasswordPage.confirmNewPasswordField
        .should('have.value', data.weakPassword)
    })

    it('enter valid password and check show password then login', () => {
        openPasswordPage(email)
        ForgotPasswordPage.newPasswordField.type(data.strongPassword)
        ForgotPasswordPage.changePasswordButton.should('be.disabled')
        ForgotPasswordPage.confirmNewPasswordField.type(data.strongPassword)
        ForgotPasswordPage.changePasswordButton.click()
        cy.url().should('include', '/login')
        login(email, data.strongPassword)
    })
})