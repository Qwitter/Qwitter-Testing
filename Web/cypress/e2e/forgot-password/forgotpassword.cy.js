import SignUpPage from '../../support/page-objects/signup'
import ForgotPasswordPage from '../../support/page-objects/forgotpassword'

describe('Forgot password test suite', ()=>{
    beforeEach('Open login page', ()=>{
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit('/i/flow/login')
        
        ForgotPasswordPage.signInPageHeader.should('be.visible')
        ForgotPasswordPage.forgotPasswordButton.should('be.visible')
        ForgotPasswordPage.forgotPasswordButton.click()
        cy.url().should('include', 'password_reset')
        
        cy.fixture("forgotpassword-data").then((data) => { 
            globalThis.data = data;
        })
        SignUpPage.nextButton.should('be.disabled')
    })

    it('test email step', ()=>{
        SignUpPage.emailField.type(data.invalidEmail)
        cy.contains('Must be an email').should('be.visible')
        SignUpPage.nextButton.should('be.disabled')

        SignUpPage.emailField.clear().type(data.notExistingEmail)
        SignUpPage.nextButton.click()
        cy.contains('Email is not Found').should('be.visible')
        SignUpPage.nextButton.should('be.enabled')

        SignUpPage.emailField.clear().type(data.validEmail)
        SignUpPage.nextButton.click()
    })
    
    it('test verification code step', ()=>{
        SignUpPage.emailField.type(data.validEmail)
        SignUpPage.nextButton.click()
        cy.contains(data.validEmail).should('be.visible')

        SignUpPage.verficationCodeField.type('123')
        SignUpPage.nextButton.should('be.disabled')
        SignUpPage.verficationCodeField.clear().type('1234567')
        SignUpPage.nextButton.should('be.disabled')

        SignUpPage.verficationCodeField.clear().type(data.invalidVerificationCode)
        SignUpPage.nextButton.click()
        cy.contains('Invalid token').should('be.visible')

        SignUpPage.verficationCodeField.clear().type(data.verificationCode)
        SignUpPage.nextButton.click()
        // TODO: check resend email link
    })

    it('test choose new password step', ()=>{
        SignUpPage.emailField.type(data.validEmail)
        SignUpPage.nextButton.click()
        SignUpPage.verficationCodeField.type(data.verificationCode)
        SignUpPage.nextButton.click()

        ForgotPasswordPage.newPasswordField.type(data.invalidPassword)
        cy.contains('Your password needs to be at least 8 characters. Please enter a longer one.')
        .should('be.visible')

        ForgotPasswordPage.newPasswordField.clear().type(data.weakPassword)
        cy.contains('Password must contain at least one letter and one number').should('be.visible')
        ForgotPasswordPage.newPasswordField.clear().type(data.strongPassword)
        ForgotPasswordPage.changePasswordButton.should('be.disabled')

        ForgotPasswordPage.confirmNewPasswordField.type("123")
        cy.contains("Passwords doesn't match").should('be.visible')
        ForgotPasswordPage.confirmNewPasswordField.clear().type(data.strongPassword)
        ForgotPasswordPage.changePasswordButton.should('be.enabled')
        ForgotPasswordPage.changePasswordButton.click()
        // TODO: this part must be checked to be visible - waiting FE
        cy.contains(`password is changed successfully for ${data.validEmail}`)
    })
})