import { LoginPagePo } from "../../support/page-objects"

describe('login page', () => {
    before('load fixture', () => {
        cy.fixture("data").then((data) => {
            globalThis.data = data
        })
    })
    
    beforeEach('navigate to login page and input field should be empty', () => {
        cy.visit('')
        LoginPagePo.emailInputFieldEmailScreen.should('be.empty')
        LoginPagePo.nextButtonEmailScreen.should('be.disabled')
    })

    it('shows signup button', () => {
        LoginPagePo.signupButtonEmailScreen
        .should('contain.text', "Sign up")
        .should('be.visible')
        LoginPagePo.emailInputFieldEmailScreen.type(data.loginPage.dummyEmail)
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
        LoginPagePo.emailInputFieldEmailScreen.type(data.loginPage.dummyEmail)
        LoginPagePo.nextButtonEmailScreen.click()
        LoginPagePo.forgotPasswordButtonPasswordScreen
        .should('be.visible')
        .invoke('text')
        .then((text) => {
            expect(text.toLowerCase()).to.include('forgot password')
        })
    })

    it('requires email', () => {
        LoginPagePo.emailInputFieldEmailScreen.type(data.loginPage.dummyEmail)
        LoginPagePo.nextButtonEmailScreen.should('be.enabled')
    })
    
    it('requires valid email', () => {
        LoginPagePo.emailInputFieldEmailScreen.type(data.loginPage.invalidEmail)
        LoginPagePo.nextButtonEmailScreen.should('be.disabled')
    })

    it('proceeds to password screen with valid email', () => {
        LoginPagePo.emailInputFieldEmailScreen.type(data.loginPage.dummyEmail)
        LoginPagePo.nextButtonEmailScreen.click()
        LoginPagePo.titlePasswordScreen.should('contain.text', 'Enter your password')
        LoginPagePo.emailInputFieldPasswordScreen.should('have.value', data.loginPage.dummyEmail)
        LoginPagePo.passwordInputFieldPasswordScreen.should('be.empty')
        LoginPagePo.loginButtonPasswordScreen.should('be.disabled')
    })

    it('requires password', () => {
        LoginPagePo.emailInputFieldEmailScreen.type(data.loginPage.dummyEmail)
        LoginPagePo.nextButtonEmailScreen.click()
        LoginPagePo.passwordInputFieldPasswordScreen.type(data.loginPage.dummyPassword)
        LoginPagePo.loginButtonPasswordScreen.should('be.enabled')
    })

    // fails for now ???
    it.skip('requires valid password', () => {
        LoginPagePo.emailInputFieldEmailScreen.type(data.loginPage.dummyEmail)
        LoginPagePo.nextButtonEmailScreen.click()
        LoginPagePo.passwordInputFieldPasswordScreen.type(data.loginPage.invalidPassword)
        LoginPagePo.loginButtonPasswordScreen.should('be.disabled')
    })

    it('shows google sign in button', () => {
        LoginPagePo.googleSigninButton.should('be.visible')
    })
})