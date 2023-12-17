const { browser } = require('@wdio/globals')
const LoginPagePo = require('../page-objects/LoginPagePo')

module.exports = {
    login: async function (email, password){
        const signIn = await LoginPagePo.signupButton()
        await signIn.click()
        const emailField = await LoginPagePo.emailField()
        await emailField.click()
        await emailField.setValue(email)
        const next = await LoginPagePo.nextButton()
        await next.click()
        await browser.pause(5000)
        const passwordField = await LoginPagePo.passwordField()
        await passwordField.click()
        await passwordField.setValue(password)
        await browser.hideKeyboard()
        const login = await LoginPagePo.loginButton()
        await login.click()
        await browser.pause(5000)
    }
}
