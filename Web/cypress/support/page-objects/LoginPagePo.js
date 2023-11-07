class LoginPagePo {
    get emailInputFieldEmailScreen() { return cy.get("input[name='email']") }
    get nextButtonEmailScreen() { return cy.get("body > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > button:nth-child(7)") }
    get titlePasswordScreen() { return cy.get("p[class='my-5 text-3xl font-bold break-words text-start h-[40px] w-[440px]']") }
    get emailInputFieldPasswordScreen() { return cy.get("body > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) input") }
    get passwordInputFieldPasswordScreen() { return cy.get("input[name='password']") }
    get loginButtonPasswordScreen() { return cy.get("button[class='inline-flex items-center justify-center whitespace-nowrap text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-black hover:bg-white px-4 py-2 rounded-3xl my-5 h-[51px] w-[440px]']") }
    get signupButtonEmailScreen() { return cy.get("span[class='mx-1 hover:underline hover:cursor-pointer text-secondary']") }
    get signupButtonPasswordScreen() { return cy.get("span[class='mx-1 hover:underline hover:cursor-pointer text-secondary']")}
    get googleSigninButton() { return cy.get("body > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > button:nth-child(2)") }
    get forgotPasswordButtonEmailScreen() { return cy.get("button[class='inline-flex items-center justify-center whitespace-nowrap text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-[0.5px] ring-primary bg-transparent hover:bg-light-gray px-4 py-2 rounded-3xl text-white my-5 h-[40px] w-[300px]']") }
    get forgotPasswordButtonPasswordScreen() { return cy.get("span[class='w-[440px] hover:underline hover:cursor-pointer font-light text-secondary']") }
}

export default new LoginPagePo()