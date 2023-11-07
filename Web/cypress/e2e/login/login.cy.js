import { LoginPagePo } from "../../support/page-objects"

describe('login page', () => {
    before('load fixture', () => {
        cy.fixture("data").then((data) => {
            globalThis.data = data
        })
    })

    beforeEach('navigate to login page and input field should be empty', () => {
        cy.visit('')
        LoginPagePo.emailInputField.should('be.empty')
        LoginPagePo.nextButtonEmailScreen.should('be.disabled')
    })

    it('requires email', () => {
        LoginPagePo.emailInputField.type(data.loginPage.dummyEmail)
        LoginPagePo.nextButtonEmailScreen.should('be.enabled')
    })
})