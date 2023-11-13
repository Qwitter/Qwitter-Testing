import { LoginPagePo } from "../../support/page-objects"

describe('login page', () => {
    before('load fixture', () => {
        cy.fixture("data").then((data) => {
            globalThis.data = data
        })
    })
    
    beforeEach('navigate to login page and input field should be empty', () => {
        cy.visit('/i/flow/login')
        LoginPagePo.emailInputFieldEmailScreen.should('be.empty')
        LoginPagePo.nextButtonEmailScreen.should('be.disabled')
    })

    it('shows signup button', () => {
        LoginPagePo.signupButtonEmailScreen
        .should('contain.text', "Sign up")
        .should('be.visible')
        LoginPagePo.emailInputFieldEmailScreen.type(data.loginPage.validEmail)
        LoginPagePo.nextButtonEmailScreen.click()
        LoginPagePo.signupButtonPasswordScreen
        .should('contain.text', "Sign up")
        .should('be.visible')
    })

    it('shows forgot password button', () => {
        LoginPagePo.forgotPasswordButtonEmailScreen
        .should('be.visible')
        .invoke('text')
        .then((text) => {
            expect(text.toLowerCase()).to.include('forgot password')
        })
        LoginPagePo.emailInputFieldEmailScreen.type(data.loginPage.validEmail)
        LoginPagePo.nextButtonEmailScreen.click()
        LoginPagePo.forgotPasswordButtonPasswordScreen
        .should('be.visible')
        .invoke('text')
        .then((text) => {
            expect(text.toLowerCase()).to.include('forgot password')
        })
        LoginPagePo.forgotPasswordButtonPasswordScreen.click()
        cy.url().should('include', '/i/flow/password_reset')
    })

    it('requires email', () => {
        LoginPagePo.emailInputFieldEmailScreen.type(data.loginPage.validEmail)
        LoginPagePo.nextButtonEmailScreen.should('be.enabled')
    })
    
    it('requires valid email', () => {
        LoginPagePo.emailInputFieldEmailScreen.type(data.loginPage.invalidEmail)
        LoginPagePo.nextButtonEmailScreen.click()

        cy.get("li[role='status']").should('contain.text', "Sorry,we couldn't find your account")
    })

    it('proceeds to password screen with valid email', () => {
        LoginPagePo.emailInputFieldEmailScreen.type(data.loginPage.validEmail)
        LoginPagePo.nextButtonEmailScreen.click()
        LoginPagePo.titlePasswordScreen.should('contain.text', 'Enter your password')
        LoginPagePo.emailInputFieldPasswordScreen.should('have.value', data.loginPage.validEmail)
        LoginPagePo.passwordInputFieldPasswordScreen.should('be.empty')
        LoginPagePo.loginButtonPasswordScreen.should('be.disabled')
    })

    it('proceeds to home page with valid password', () => {
        LoginPagePo.emailInputFieldEmailScreen.type(data.loginPage.validEmail)
        LoginPagePo.nextButtonEmailScreen.click()
        LoginPagePo.passwordInputFieldPasswordScreen.type(data.loginPage.validPassword)
        LoginPagePo.loginButtonPasswordScreen.click()
        cy.url().should('include', '/settings/account')
    })

    it('requires password', () => {
        LoginPagePo.emailInputFieldEmailScreen.type(data.loginPage.validEmail)
        LoginPagePo.nextButtonEmailScreen.click()
        LoginPagePo.passwordInputFieldPasswordScreen.type(data.loginPage.validPassword)
        LoginPagePo.loginButtonPasswordScreen.should('be.enabled')
    })

    // fails for now ???
    it('requires correct password', () => {
        LoginPagePo.emailInputFieldEmailScreen.type(data.loginPage.validEmail)
        LoginPagePo.nextButtonEmailScreen.click()
        LoginPagePo.passwordInputFieldPasswordScreen.type(data.loginPage.wrongPassword)
        LoginPagePo.loginButtonPasswordScreen.click()
        cy.get("li[role='status']").should('contain.text', "wrong password")
    })

    it('validates password', () => {
        LoginPagePo.emailInputFieldEmailScreen.type(data.loginPage.validEmail)
        LoginPagePo.nextButtonEmailScreen.click()
        LoginPagePo.passwordInputFieldPasswordScreen.type(data.loginPage.invalidPasswordTooSmall)
        cy.get("h5").should('be.visible')
        LoginPagePo.passwordInputFieldPasswordScreen.clear().type(data.loginPage.invalidPasswordNoNums)
        cy.get("h5").should('be.visible')
    })

    it('shows google sign in button', () => {
        LoginPagePo.googleSigninButton.should('be.visible')
    })
})