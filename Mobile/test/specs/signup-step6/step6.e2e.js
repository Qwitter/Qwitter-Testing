const { browser } = require('@wdio/globals')
const commands = require('../../../commands.js')
const SignUpPage = require('../../page-objects/signup.js')
const data  = require('../../fixtures/signup-data.json')
const signUpUtils = require('../../utils/signup.js')
const { faker, sk, fa } = require('@faker-js/faker')

describe('Sign up test suite - verification code step', ()=>{
    afterEach( async ()=>{
        await commands.restartApp(true)
    })
    beforeEach( async ()=>{
        const signUpButton = await SignUpPage.createAccount()
        await signUpButton.click()
        await signUpUtils.goToPageOfSignUp(6)
    })
    it('check back button in username screen', async() => {
        const back = await SignUpPage.backButton()
        expect(await back.isDisplayed()).toBe(false)
    })

    it('enter invalid username', async() => {
        const usernameHeader = await SignUpPage.userNameHeader()
        expect(await usernameHeader.isDisplayed()).toBe(true)

        const usernameField = await SignUpPage.usernameField()
        await usernameField.click()
        await usernameField.setValue(data.invalidUsername)
        const errorMessage = await SignUpPage.userNameErrorMessage()
        expect(await errorMessage.isDisplayed()).toBe(true)

        await browser.hideKeyboard()
        const next = await SignUpPage.nextButton()
        expect(await next.isEnabled()).toBe(false)
    })

    it('enter valid username', async() => {
        const usernameField = await SignUpPage.usernameField()
        await usernameField.click()
        const randomUsername = `X${new Date().getTime()}`
        await usernameField.setValue(randomUsername)
        
        await browser.hideKeyboard()
        const next = await SignUpPage.nextButton()
        expect(await next.isEnabled()).toBe(true)
        await next.click()

        const suggestedFollowsHeader = await SignUpPage.suggestedPageHeader()
        expect(await suggestedFollowsHeader.isDisplayed()).toBe(true)
    })

    it('enter a suggested user name', async() => {
        const suggestedUser = await SignUpPage.usernameSuggestionTwo()
        await suggestedUser.click()
        const username = await suggestedUser.getAttribute('content-desc')
        
        const usernameField = await SignUpPage.usernameField()
        expect(await usernameField.getText()).toBe(username)
        const errorMessage = await SignUpPage.userNameErrorMessage()
        expect(await errorMessage.isDisplayed()).toBe(false)

        const next = await SignUpPage.nextButton()
        await next.click()

        const suggestedFollowsHeader = await SignUpPage.suggestedPageHeader()
        expect(await suggestedFollowsHeader.isDisplayed()).toBe(true) 
    })
})