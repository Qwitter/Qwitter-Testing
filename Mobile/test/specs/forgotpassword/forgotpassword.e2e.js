const { browser } = require('@wdio/globals')
const commands = require('../../../commands.js')
const SignUpPage = require('../../page-objects/signup.js')
const ForgotPasswordPage = require('../../page-objects/forgotpassword.js')
const data  = require('../../fixtures/forgotpassword-data.json')
const forgotUtils = require('../../utils/forgotpassword.js')
const signUpUtils = require('../../utils/signup.js')
const emailEnv = require('../../fixtures/email-env.json') 

describe('Forgot password test suite', ()=>{
    let emailToken
    before( async () => {
        const creatAccountBtn = await SignUpPage.createAccount()
        await creatAccountBtn.click()
        emailToken = await signUpUtils.goToPageOfSignUp(6)
        data.validEmail = `${emailToken}${emailEnv.emailNameSpace}`
        await commands.restartApp()
    })

    afterEach(async () => {
        await commands.restartApp()
    })

    beforeEach( async ()=>{
        const pageTitle = await SignUpPage.loginPagetitle()
        await pageTitle.waitForExist({timeout : 5000})
        expect(await pageTitle.isDisplayed()).toBe(true)
        const signInBtn = await ForgotPasswordPage.signInButton()
        await signInBtn.click()
        
        const forgotPasswordBtn = await ForgotPasswordPage.forgotPasswordButton()
        await forgotPasswordBtn.click()
        const findAccountHeader = await ForgotPasswordPage.findXAccountHeader()
        expect(await findAccountHeader.isDisplayed()).toBe(true)
    })

    it('return to sign in page', async()=>{
        const back = await SignUpPage.backButton()
        await back.click()
        const forgotBtn = await ForgotPasswordPage.forgotPasswordButton()
        expect(await forgotBtn.isDisplayed()).toBe(true)
        await forgotBtn.click()
    })
    //Skip for now
    it.skip('enter not existing email', async() => {
        // there is no error message element 
        // to do this test
    })

    it('enter valid email and proceed', async() => {
        await forgotUtils.enterEmail(data.validEmail)
        const emailField = await ForgotPasswordPage.emailField();
        expect(await emailField.getText()).toBe(data.validEmail)

        const next = await SignUpPage.nextButton()
        await next.click()

        const verificationCodeHeader = await SignUpPage.verificationCodeTitle()
        expect(await verificationCodeHeader.isDisplayed()).toBe(true)
    })

    it('enter invalid verification code', async () => {
        await forgotUtils.enterEmail(data.validEmail)
        
        const next = await SignUpPage.nextButton()
        await next.click()

        const verificationField = await ForgotPasswordPage.verificationCodeField()
        await verificationField.click()
        await verificationField.setValue(data.invalidVerificationCode)
        await browser.hideKeyboard()
        expect(await next.isEnabled()).toBe(false)
        const errorMessage = await ForgotPasswordPage.verificationCodeErrorMessage()
        expect(await errorMessage.isDisplayed()).toBe(true)
    })

    it('enter valid verification code then proceed', async () => {
        await forgotUtils.enterEmail(data.validEmail)
        const next = await SignUpPage.nextButton()
        await next.click()

        await forgotUtils.enterVerificationCode(emailToken)
        expect(await next.isEnabled()).toBe(true)
        await next.click()

        const changePasswordHeader = await ForgotPasswordPage.chooseNewPasswordHeader()
        expect(await changePasswordHeader.isDisplayed()).toBe(true)
        const back = await SignUpPage.backButton()
        expect(await back.isDisplayed()).toBe(false)
    })

    it('enter less than 8 chars password and check visibility of password' , async() => {
        await forgotUtils.passwordStep(data.validEmail, emailToken)

        const newPassword = await ForgotPasswordPage.newPasswordField()
        await newPassword.click()
        await newPassword.setValue(data.smallPassword)
        expect(await newPassword.getAttribute('password')).toBe('true')
        await browser.hideKeyboard()
        const next = await SignUpPage.nextButton()
        expect(await next.isEnabled()).toBe(false)
    })

    it('enter 8 numbers password', async() => {
        await forgotUtils.passwordStep(data.validEmail, emailToken)
        
        const newPassword = await ForgotPasswordPage.newPasswordField()
        await newPassword.click()
        await newPassword.setValue(data.invalidPassword)
        
        const errorMessage = await SignUpPage.passwordErrorMessageLongNums()
        expect(await errorMessage.isDisplayed()).toBe(true)
        const next = await SignUpPage.nextButton()
        expect(await next.isEnabled()).toBe(false)
    })

    it('enter valid password and different confirm password', async() => {
        await forgotUtils.passwordStep(data.validEmail, emailToken)

        const newPassword = await ForgotPasswordPage.newPasswordField()
        await newPassword.click()
        await newPassword.setValue(data.validPassword)
        await browser.hideKeyboard()

        const confirmPassword = await ForgotPasswordPage.confirmPasswordField()
        await confirmPassword.click()
        await confirmPassword.setValue("marwanemad9")
        await browser.hideKeyboard()

        const errorMessage = await ForgotPasswordPage.passwordsDontMatch()
        expect(await errorMessage.isDisplayed()).toBe(true)
        const next = await SignUpPage.nextButton()
        expect(await next.isEnabled()).toBe(false)
    })

    it('enter valid password and change it', async() => {
        await forgotUtils.passwordStep(data.validEmail, emailToken)

        const newPassword = await ForgotPasswordPage.newPasswordField()
        await newPassword.click()
        await newPassword.setValue(data.validPassword)
        await browser.hideKeyboard()

        const confirmPassword = await ForgotPasswordPage.confirmPasswordField()
        await confirmPassword.click()
        await confirmPassword.setValue(data.validPassword)
        await browser.hideKeyboard()

        const next = await SignUpPage.nextButton()
        expect(await next.isEnabled()).toBe(true)
        await next.click()
        // Skip for now - it should go to feed not login
        //const loginPageHeader = await SignUpPage.loginPagetitle()
        //expect(await loginPageHeader.isDisplayed()).toBe(true)
    })

    // TODO: add a test to login with the new password...
})