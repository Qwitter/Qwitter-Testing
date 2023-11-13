const { browser } = require('@wdio/globals')
const commands = require('../../../commands.js')
const SignUpPage = require('../../page-objects/signup.js')
const data  = require('../../fixtures/signup-data.json')
const signUpUtils = require('../../utils/signup.js')

describe('Sign up test suite', ()=>{
    afterEach( async ()=>{
        await commands.retsatrtApp()
    })
    beforeEach( async ()=>{
        const pageTitle = await SignUpPage.loginPagetitle()
        expect(pageTitle).toBeExisting();
        const signUpButton = await SignUpPage.createAccount()
        await signUpButton.click()
    })
    // Selecting language of personalization tests
    it.skip('search for arabic language and choose it then procced', async()=>{
        const nextButton = await SignUpPage.nextButton()
        expect(nextButton).toBeDisabled()
        const search = await SignUpPage.searchForLanguage()
        await search.click()
        await search.setValue('Arab')
        const arabicCheckBox = await SignUpPage.arabicCheckBox()
        expect(arabicCheckBox).not.toBeChecked()

        await arabicCheckBox.click()
        expect(arabicCheckBox).toBeChecked()
        await search.clearValue()
        expect(arabicCheckBox).toBeChecked()  
        await browser.hideKeyboard()
        expect(nextButton).toBeExisting()
        await nextButton.click()
    })

    it.skip('choose a random language', async ()=>{
        const nextButton = await SignUpPage.nextButton()
        expect(nextButton).toBeDisabled()
        const englishCheckBox = await SignUpPage.englishCheckBox()
        expect(englishCheckBox).not.toBeChecked()

        await englishCheckBox.click()
        expect(englishCheckBox).toBeChecked()
        expect(nextButton).toBeEnabled() 
    })

    it.skip('go back to login page from select language page', async()=>{
        const backBtn = await SignUpPage.backButton()
        await backBtn.click()
        const pageTitle = await SignUpPage.loginPagetitle()
        expect(pageTitle).toBeExisting()
    })
    // User data tests
    it.skip('enter invalid name and valid name and email', async ()=>{
        await signUpUtils.goToPageOfSignUp(2)
        const next = await SignUpPage.nextButton()
        expect(next).toBeDisabled()
        signUpUtils.enterUserData(data.invalidName, data.validEmail, data.validInputDate)

        // check for date text for once
        const dateField = await SignUpPage.dateOfBirthField()
        expect(dateField).toHaveText(data.validTextDate)

        const nameError = await SignUpPage.nameErrorMessageCharsLimit()
        expect(nameError).toBeDisplayed()
        expect(next).toBeDisabled()
    })

    it.skip('enter invalid email and valid name and date', async ()=>{
        await signUpUtils.goToPageOfSignUp(2)
        const next = SignUpPage.nextButton()
        expect(next).toBeDisabled()

        signUpUtils.enterUserData(data.validName, data.invalidEmail, data.validInputDate)
        
        const emailErrorMessage = SignUpPage.emailErrorMessage()
        expect(emailErrorMessage).toBeDisplayed()
        expect(next).toBeDisabled()
    })

    it.skip('enter empty date and valid name and email', async () =>{
        await signUpUtils.goToPageOfSignUp(2)
        const next = SignUpPage.nextButton()
        expect(next).toBeDisabled()

        signUpUtils.enterUserData(data.validName, data.validEmail, data.validInputDate, false)
        expect(next).toBeDisabled()
    })

    it.skip('enter valid data and proceed to next step then return to check entered data', async ()=>{
        await signUpUtils.goToPageOfSignUp(2)
        const next = await SignUpPage.nextButton()
        expect(next).toBeDisabled()

        await signUpUtils.enterUserData(data.validName, data.validEmail, data.validInputDate)

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
    // Verification code tests
    it.skip('enter invalid verification code', async ()=>{
        await signUpUtils.goToPageOfSignUp(3)
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

    it.skip('enter valid verification code and procced to next page then return back', async()=>{
        await signUpUtils.goToPageOfSignUp(3)
        const next = await SignUpPage.nextButton()
        await expect(next).toBeDisabled()
        
        const verificationField = await SignUpPage.verificationCodeField()
        await verificationField.click()
        await verificationField.setValue(data.validVerificationCode)
        await browser.hideKeyboard()

        expect(await next.isEnabled()).toBe(true)
        await next.click()

        const passwordTitle = await SignUpPage.passwordTitle()
        await expect(passwordTitle).toBeDisplayed()

        const back = await SignUpPage.backButton()
        await back.click()
        await expect(verificationField).toHaveText(data.validVerificationCode)
    })
    // Password screen tests
    it.skip('enter invalid password and check show password', async() => {
        await signUpUtils.goToPageOfSignUp(4)
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
        const showPasswordButton = await SignUpPage.showPasswordButton()
        expect(await showPasswordButton.isEnabled()).toBe(false)

        let passwordDots = data.invalidPasswordNums
        for(var i = 0; i < passwordDots.length; i++) 
            passwordDots[i] = "."
        
        expect(await passwordField.getText()).toBe(passwordDots)        
        await showPasswordButton.click()
        expect(await passwordField.getText()).toBe(data.invalidPasswordNums)
    })

    it.skip('enter long only numbers password',async ()=>{
        await signUpUtils.goToPageOfSignUp(4)
        const next = await SignUpPage.nextButton()
        expect(await next.isEnabled()).toBe(false)

        const passwordField = await SignUpPage.passwordField()
        await passwordField.click()
        await passwordField.setValue(data.invalidLongPassword)

        const errorMessage = await SignUpPage.passwordErrorMessageLongNums()
        expect(await errorMessage.isDisplayed()).toBe(true)
        expect(await next.isEnabled()).toBe(false)
    })

    it.skip('enter valid password and procced to next step', async()=>{
        await signUpUtils.goToPageOfSignUp(4)
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
        const skip = await SignUpPage.skipForNowButton()
        expect(await skip.isDisplayed()).toBe(true)
    })
})