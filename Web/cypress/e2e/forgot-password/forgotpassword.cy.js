import SignUpPage from '../../support/page-objects/signup'
import ForgotPasswordPage from '../../support/page-objects/forgotpassword'

describe('Forgot password test suite', ()=>{
    before(()=>{
        cy.fixture("forgotpassword-data").then((data) => { 
            globalThis.data = data;
        })
    })

    beforeEach('Open forget password page', ()=>{
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit('/i/flow/login')
        
        ForgotPasswordPage.signInPageHeader.should('be.visible')
        ForgotPasswordPage.forgotPasswordButton.should('be.visible')
        ForgotPasswordPage.forgotPasswordButton.click()
        cy.url().should('include', 'password_reset')
        
        SignUpPage.nextButton.should('be.disabled')
    })

    it('test email step - invalid , not existing and valid email', ()=>{
        
        
    })

    it('enter invalid email', ()=>{
        SignUpPage.emailField.type(data.invalidEmail)
        cy.contains('Must be an email').should('be.visible')
        SignUpPage.nextButton.should('be.disabled')
    })

    it('enter not existing email', ()=>{
        SignUpPage.emailField.type(data.notExistingEmail)
        SignUpPage.nextButton.click()
        cy.contains('Email is not found').should('be.visible')
        SignUpPage.nextButton.should('be.enabled')
    })
    
    it('enter valid email and proceed', ()=>{
        SignUpPage.emailField.type(data.validEmail)
        SignUpPage.nextButton.click()
        cy.contains('We sent you a code')
        .should('be.visible')
    })

    it('enter invalid verification code', ()=>{
        SignUpPage.emailField.type(data.validEmail)
        SignUpPage.nextButton.click()

        SignUpPage.verficationCodeField.type('123')
        SignUpPage.nextButton.should('be.disabled')
        SignUpPage.verficationCodeField.clear().type('123456789XXX') // a longer verification code
        SignUpPage.nextButton.should('be.disabled')

        SignUpPage.verficationCodeField.clear().type(data.invalidVerificationCode)
        SignUpPage.nextButton.click()
        cy.contains('Invalid token').should('be.visible')
    })
    
    it('enter valid verification code and proceed to next step', ()=>{
        SignUpPage.emailField.type(data.validEmail)
        SignUpPage.nextButton.click()

        SignUpPage.verficationCodeField.clear().type(data.verificationCode)
        SignUpPage.nextButton.click()
        cy.contains('Choose a new Password')
        .should('be.visible')

        // TODO: check resend email link
    })

    it('enter invalid password', ()=>{
        SignUpPage.emailField.type(data.validEmail)
        SignUpPage.nextButton.click()
        SignUpPage.verficationCodeField.type(data.verificationCode)
        SignUpPage.nextButton.click()

        ForgotPasswordPage.newPasswordField.type(data.invalidPassword)
        cy.contains('Your password needs to be at least 8 characters. Please enter a longer one.')
        .should('be.visible')
        ForgotPasswordPage.changePasswordButton.should('be.disabled')

        ForgotPasswordPage.newPasswordField.clear().type(data.weakPassword)
        cy.contains('Password must contain at least one letter')
        .should('have.text', 'Password must contain at least one letter')
        .should('be.visible')
        ForgotPasswordPage.changePasswordButton.should('be.disabled')
    })

    it('enter valid password and check show password then proceed', ()=>{
        SignUpPage.emailField.type(data.validEmail)
        SignUpPage.nextButton.click()
        SignUpPage.verficationCodeField.type(data.verificationCode)
        SignUpPage.nextButton.click()

        ForgotPasswordPage.newPasswordField.clear().type(data.strongPassword)
        ForgotPasswordPage.changePasswordButton.should('be.disabled')

        ForgotPasswordPage.confirmNewPasswordField.type("123")
        cy.contains("Passwords do not match").should('be.visible')
        ForgotPasswordPage.confirmNewPasswordField.clear().type(data.strongPassword)
        ForgotPasswordPage.changePasswordButton.should('be.enabled')

        ForgotPasswordPage.newPasswordField.should('have.attr', 'type', 'password')
        ForgotPasswordPage.passwordEyeButton.eq(0).should('be.visible')
        ForgotPasswordPage.passwordEyeButton.eq(0).click()
        ForgotPasswordPage.newPasswordField.should('have.attr', 'type', 'text')
        ForgotPasswordPage.newPasswordField.should('have.value', data.strongPassword)

        ForgotPasswordPage.confirmNewPasswordField.should('have.attr', 'type', 'password')
        ForgotPasswordPage.passwordEyeButton.eq(1).should('be.visible')
        ForgotPasswordPage.passwordEyeButton.eq(1).click()
        ForgotPasswordPage.confirmNewPasswordField.should('have.attr', 'type', 'text')
        ForgotPasswordPage.confirmNewPasswordField
        .should('have.value', data.strongPassword)
        
        ForgotPasswordPage.changePasswordButton.click()
    })
    // TODO: add test to login with the new password

    it('exit email step', ()=>{
        ForgotPasswordPage.exitButton.should('be.visible')
        ForgotPasswordPage.exitButton.click()

        cy.url().should('include', 'login')
        cy.contains('Sign in to Qwitter').should('be.visible')
    })

    it('back from verification code step', ()=>{
        SignUpPage.emailField.type(data.validEmail)
        SignUpPage.nextButton.click()
        
        SignUpPage.backButton.should('be.visible')
        SignUpPage.backButton.click()

        cy.url().should('include', 'login')
        cy.contains('Sign in to Qwitter').should('be.visible')
    })
})