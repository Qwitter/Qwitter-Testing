const { browser } = require('@wdio/globals')
const commands = require('../../../commands.js')
const SignUpPage = require('../../page-objects/signup.js')
const data  = require('../../fixtures/signup-data.json')
const signUpUtils = require('../../utils/signup.js')


describe('Sign up test suite - profile picture step', ()=>{
    afterEach( async ()=>{
        await commands.restartApp(true)      
    })
    beforeEach( async ()=>{
        const signUpButton = await SignUpPage.createAccount()
        await signUpButton.click()
        await signUpUtils.goToPageOfSignUp(5)
    })

    it('check back button in profile pic screen', async() => {
        const back = await SignUpPage.backButton()
        expect(await back.isExisting()).toBe(false)
    })
    
    it('open pick profile photo screen and skip photo', async() => {
        const photoPageHeader = await SignUpPage.profilePicHeader()
        expect(await photoPageHeader.isDisplayed()).toBe(true)
        const skip = await SignUpPage.skipForNowButton()
        expect(await skip.isEnabled()).toBe(true)

        await skip.click()
        const usernameHeader = await SignUpPage.userNameHeader()
        expect(await usernameHeader.isDisplayed()).toBe(true)
    })
    //Skip for now because of uploading a photo
    // TODO: uplode photo - still i don't know how to do here
    it.skip('upload a photo and proceed to next step', async() => {        
        const uploadBtn = await SignUpPage.uploadPhotoButton()
        await uploadBtn.click()
        const photo = await SignUpPage.photoOnDevice()
        await photo.click()

        const next = await SignUpPage.nextButton()
        await next.click()
        const usernameHeader = await SignUpPage.userNameHeader()
        expect(await usernameHeader.isDisplayed()).toBe(true)
    })
})