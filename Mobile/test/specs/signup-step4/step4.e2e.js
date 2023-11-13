const { browser } = require('@wdio/globals')
const commands = require('../../../commands.js')
const SignUpPage = require('../../page-objects/signup.js')
const data  = require('../../fixtures/signup-data.json')
const signUpUtils = require('../../utils/signup.js')
const { faker, sk, fa } = require('@faker-js/faker')

describe('Sign up test suite - password step', ()=>{
    afterEach( async ()=>{
        await commands.retsatrtApp()
    })
    beforeEach( async ()=>{
        const signUpButton = await SignUpPage.createAccount()
        await signUpButton.click()
        await signUpUtils.goToPageOfSignUp(4)
    })

    it('back button should be unvisible', async() => {
        const back = await SignUpPage.backButton()
        expect(await back.isDisplayed()).toBe(false)
    })

    it('enter invalid password and check show password', async() => {
        const next = await SignUpPage.nextButton()
        await expect(next).toBeDisabled()

        const screenTitle = await SignUpPage.passwordTitle()
        expect(await screenTitle.isDisplayed()).toBe(true)

        const passwordField = await SignUpPage.passwordField()
        await passwordField.click()
        await passwordField.setValue(data.invalidPasswordNums)

        const errorMessage = await SignUpPage.passwordErrorMessageLessChars()
        expect(await errorMessage.isDisplayed()).toBe(true)
        expect(await next.isEnabled()).toBe(false)

        expect(await passwordField.getAttribute('password')).toBe("true")

        await showPasswordButton.click()
        expect(await passwordField.getText()).toBe(data.invalidPasswordNums)
        expect(await passwordField.getAttribute('password')).toBe("false")
    })

    it('enter long only numbers password',async ()=>{
        const next = await SignUpPage.nextButton()
        expect(await next.isEnabled()).toBe(false)

        const passwordField = await SignUpPage.passwordField()
        await passwordField.click()
        await passwordField.setValue(data.invalidLongPassword)

        const errorMessage = await SignUpPage.passwordErrorMessageLongNums()
        expect(await errorMessage.isDisplayed()).toBe(true)
        expect(await next.isEnabled()).toBe(false)
    })

    it('enter valid password and procced to next step', async()=>{
        const next = await SignUpPage.nextButton()
        expect(await next.isEnabled()).toBe(false)

        const passwordField = await SignUpPage.passwordField()
        await passwordField.click()
        await passwordField.setValue(data.validPassword)

        const errorMessage = await SignUpPage.passwordErrorMessageLessChars()
        expect(await errorMessage.isDisplayed()).toBe(false)
        expect(await next.isEnabled()).toBe(true)

        const showPasswordButton = await SignUpPage.showPasswordButton()
        expect(await showPasswordButton.isEnabled()).toBe(false) 
        await showPasswordButton.click()
        expect(await passwordField.getText()).toBe(data.validPassword) 

        await browser.hideKeyboard()
        await next.click()
        const prorileHeader = await SignUpPage.profilePicHeader()
        expect(await prorileHeader.isDisplayed()).toBe(true)
    })
})