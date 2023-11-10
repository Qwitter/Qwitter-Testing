const { browser } = require('@wdio/globals')
const commands = require('../../../commands.js')
const SignUpPage = require('../../page-objects/signup.js')
const data  = require('../../fixtures/signup-data.json')
const signUpUtils = require('../../utils/signup.js')

describe('Sign up test suite - select language screen', ()=>{
    afterEach( async ()=>{
        await commands.retsatrtApp()
    })
    beforeEach( async ()=>{
        const pageTitle = await SignUpPage.loginPagetitle()
        expect(pageTitle).toBeExisting();
        const signUpButton = await SignUpPage.createAccount()
        await signUpButton.click()
    })

    it('search for arabic language and choose it then procced', async()=>{
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

    it('choose a random language', async ()=>{
        const nextButton = await SignUpPage.nextButton()
        expect(nextButton).toBeDisabled()
        const englishCheckBox = await SignUpPage.englishCheckBox()
        expect(englishCheckBox).not.toBeChecked()

        await englishCheckBox.click()
        expect(englishCheckBox).toBeChecked()
        expect(nextButton).toBeEnabled() 
    })

    it('go back to login page from select language page', async()=>{
        const backBtn = await SignUpPage.backButton()
        await backBtn.click()
        const pageTitle = await SignUpPage.loginPagetitle()
        expect(pageTitle).toBeExisting()
    })
    
    it('enter invalid name and valid name and email', async ()=>{
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

    it('enter invalid email and valid name and date', async ()=>{
        await signUpUtils.goToPageOfSignUp(2)
        const next = SignUpPage.nextButton()
        expect(next).toBeDisabled()

        signUpUtils.enterUserData(data.validName, data.invalidEmail, data.validInputDate)
        
        const emailErrorMessage = SignUpPage.emailErrorMessage()
        expect(emailErrorMessage).toBeDisplayed()
        expect(next).toBeDisabled()
    })

    it('enter empty date and valid name and email', async () =>{
        await signUpUtils.goToPageOfSignUp(2)
        const next = SignUpPage.nextButton()
        expect(next).toBeDisabled()

        signUpUtils.enterUserData(data.validName, data.validEmail, data.validInputDate, false)
        expect(next).toBeDisabled()
    })

    it('enter valid data and proceed to next step then return to check entered data', async ()=>{
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

    it('enter invalid verification code', async ()=>{
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

    it('enter valid verification code and procced to next page then return back', async()=>{
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

})