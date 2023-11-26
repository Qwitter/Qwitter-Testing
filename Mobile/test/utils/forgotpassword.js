const { browser } = require('@wdio/globals')
const ForgotPasswordPage = require('../page-objects/forgotpassword')
const SignUpPage = require('../page-objects/signup')
const signUpUtils = require('../utils/signup')

module.exports = {
    enterEmail: async function (email){
        const emailField = await ForgotPasswordPage.emailField()
        await emailField.click()
        await emailField.setValue(email)
        await browser.hideKeyboard()
    },
    enterVerificationCode: async function (emailToken){
        const verificationField = await ForgotPasswordPage.verificationCodeField()
        await verificationField.click()
        const code = await signUpUtils.getVerificationCode(emailToken, false)
        await verificationField.setValue(code)
        await browser.hideKeyboard()
    },
    passwordStep: async function (email, emailToken){
        await module.exports.enterEmail(email);
        const next = await SignUpPage.nextButton()
        await next.click()
        await module.exports.enterVerificationCode(emailToken)
        await next.click()
    }
}
