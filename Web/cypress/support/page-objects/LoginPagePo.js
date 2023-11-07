class LoginPagePo {
    get emailInputField() { return cy.get("input[name='email']") }
    get nextButtonEmailScreen() { return cy.get("body > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > button:nth-child(7)") }
}

export default new LoginPagePo()