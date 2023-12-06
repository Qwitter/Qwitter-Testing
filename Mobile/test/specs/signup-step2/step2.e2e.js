const { browser } = require('@wdio/globals')
const commands = require('../../../commands.js')
const SignUpPage = require('../../page-objects/signup.js')
const data  = require('../../fixtures/signup-data.json')
const signUpUtils = require('../../utils/signup.js')
const { faker, sk, fa } = require('@faker-js/faker')
const exp = require('constants')

describe('Sign up test suite - user data step', ()=>{
    afterEach( async ()=>{
        await commands.restartApp()
    })
    beforeEach( async ()=>{
        const signUpButton = await SignUpPage.createAccount()
        await signUpButton.click()
        await signUpUtils.goToPageOfSignUp(2)
    })

    it('enter empty name and valid date and email', async ()=>{
        const next = await SignUpPage.nextButton()
        expect(next).toBeDisabled()
        await signUpUtils.enterUserData("", data.validEmail, data.validInputDate)

        // check for date text for once
        const dateField = await SignUpPage.dateOfBirthField()
        expect(await dateField.getText()).toBe(data.validTextDate)
        expect(await next.isEnabled()).toBe(false)
    })

    it('enter invalid email and valid name and date', async ()=>{
        const next = SignUpPage.nextButton()
        expect(next).toBeDisabled()

        await signUpUtils.enterUserData(data.validName, data.invalidEmail, data.validInputDate)
        
        const emailErrorMessage = SignUpPage.emailErrorMessage()
        expect(emailErrorMessage).toBeDisplayed()
        expect(next).toBeDisabled()
    })

    it('enter empty date and valid name and email', async () =>{
        const next = SignUpPage.nextButton()
        expect(next).toBeDisabled()

        await signUpUtils.enterUserData(data.validName, data.validEmail, data.validInputDate, false)
        expect(next).toBeDisabled()
    })

    it('enter valid data and proceed to next step then return to check entered data', async ()=>{
        const next = await SignUpPage.nextButton()
        expect(next).toBeDisabled()
        
        const randomEmail = faker.internet.email()
        await signUpUtils.enterUserData(data.validName, randomEmail, data.validInputDate)

        await expect(next).toBeEnabled()
        await next.click()
        const verificatonTitle = await SignUpPage.verificationCodeTitle()
        await expect( verificatonTitle).toBeDisplayed()

        const back = await SignUpPage.backButton()
        await back.click()
        const nameField = await SignUpPage.nameField()
        const emailField = await SignUpPage.emailField()
        const dateField = await SignUpPage.dateOfBirthField()
        expect(nameField).toHaveText(data.validName)
        expect(emailField).toHaveText(data.validEmail)
        expect(dateField).toHaveText(data.validTextDate)
        expect(next).toBeEnabled()
    })
})