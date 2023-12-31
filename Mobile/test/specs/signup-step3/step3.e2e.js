const { browser } = require('@wdio/globals')
const commands = require('../../../commands.js')
const SignUpPage = require('../../page-objects/signup.js')
const data  = require('../../fixtures/signup-data.json')
const signUpUtils = require('../../utils/signup.js')
const { faker, sk, fa } = require('@faker-js/faker')

describe('Sign up test suite - verification code step', ()=>{
    let emailToken = "X"
    afterEach( async ()=>{
        await commands.restartApp()
    })
    beforeEach( async ()=>{
        const signUpButton = await SignUpPage.createAccount()
        await signUpButton.click()
        emailToken = await signUpUtils.goToPageOfSignUp(3)
    })

    it('back button should be visible', async() => {
        const next = await SignUpPage.nextButton()
        expect(next).toBeDisabled()

        const back = await SignUpPage.backButton()
        expect(await back.isDisplayed()).toBe(true)
    })

    it('enter invalid verification code', async ()=>{
        const next = await SignUpPage.nextButton()
        expect(next).toBeDisabled()

        const verificationField = await SignUpPage.verificationCodeField()
        await verificationField.click()
        await verificationField.setValue(data.invalidVerificationCode)
        expect(verificationField).toHaveText(data.invalidVerificationCode)

        expect(next).toBeDisabled()
        const errorMessage = await SignUpPage.verificationCodeErrorMessage()
        expect(await errorMessage.isDisplayed()).toBe(true)
    })

    it('enter valid verification code and procced to next page', async()=>{
        const next = await SignUpPage.nextButton()
        await expect(next).toBeDisabled()
        
        const verificationField = await SignUpPage.verificationCodeField()
        await verificationField.click()
        const code = await signUpUtils.getVerificationCode(emailToken)
        await verificationField.setValue(code)
        await browser.hideKeyboard()

        expect(await next.isEnabled()).toBe(true)
        await next.click()

        const passwordTitle = await SignUpPage.passwordTitle()
        await expect(passwordTitle).toBeDisplayed()
    })
})