import { LoginPagePo } from "../support/page-objects";

export function login(email, password) {
    cy.visit('/i/flow/login')
    LoginPagePo.emailInputFieldEmailScreen.type(email)
    LoginPagePo.nextButtonEmailScreen.click()
    LoginPagePo.passwordInputFieldPasswordScreen.type(password)
    LoginPagePo.loginButtonPasswordScreen.click()
    cy.url().should('include', '/settings/account')
}