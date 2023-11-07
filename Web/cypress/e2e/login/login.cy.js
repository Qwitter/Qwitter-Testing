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

    it('requires email', () => {
        LoginPagePo.emailInputFieldEmailScreen.type(data.loginPage.dummyEmail)
        LoginPagePo.nextButtonEmailScreen.should('be.enabled')
    })

    it('proceeds to password screen with valid email', () => {
        LoginPagePo.emailInputFieldEmailScreen.type(data.loginPage.dummyEmail)
        LoginPagePo.nextButtonEmailScreen.click()
        LoginPagePo.titlePasswordScreen.should('contain.text', 'Enter your password')
        LoginPagePo.emailInputFieldPasswordScreen.should('have.value', data.loginPage.dummyEmail)
        LoginPagePo.passwordInputFieldPasswordScreen.should('be.empty')
        LoginPagePo.logInButtonPasswordScreen.should('be.disabled')
    })
})