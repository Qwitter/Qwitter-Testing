const { browser } = require('@wdio/globals')
const commands = require('../../../commands.js')
const SignUpPage = require('../../page-objects/signup.js')
const data  = require('../../fixtures/signup-data.json')
const signUpUtils = require('../../utils/signup.js')
const { faker, sk, fa } = require('@faker-js/faker')


describe('Sign up test suite - selecting language', ()=>{
    afterEach( async ()=>{
        await commands.restartApp()
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
})