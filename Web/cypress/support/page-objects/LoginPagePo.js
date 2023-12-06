class LoginPagePo {
    get emailInputFieldEmailScreen() { return cy.get("input[data-testid='email']") }
    get nextButtonEmailScreen() { return cy.get("button[data-testid='nextButton']") }
    get titlePasswordScreen() { return cy.get("p[data-testid='enterPassword']") }
    get emailInputFieldPasswordScreen() { return cy.get("input[data-testid='emailPassword']") }
    get passwordInputFieldPasswordScreen() { return cy.get("input[data-testid='pass']") }
    get loginButtonPasswordScreen() { return cy.get("button[data-testid='login']") }
    get signupButtonEmailScreen() { return cy.get("span[class='mx-1 hover:underline hover:cursor-pointer text-secondary']") }
    get signupButtonPasswordScreen() { return cy.get("span[class='mx-1 hover:underline hover:cursor-pointer text-secondary']")}
    get googleSigninButton() { return cy.get("body > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > button:nth-child(2)") }
    get forgotPasswordButtonEmailScreen() { return cy.get("button[data-testid='forgotPassword']") }
    get forgotPasswordButtonPasswordScreen() { return cy.get("span[data-testid='forgotPasswordPassword']") }
    get xButton() { return cy.get("div[data-testid='popupHeaderButton']") }
    get logoButton() { return cy.get("img[data-testid='logo']") }
    get settingsButton() { return cy.get("div[data-testid='Settings']") }
}

export default new LoginPagePo()