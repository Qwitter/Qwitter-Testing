const { browser } = require('@wdio/globals')
const commands = require('../../../commands.js')
const SignUpPage = require('../../page-objects/signup.js')
const data  = require('../../fixtures/login-data.json')
const AccountSettingPage = require('../../page-objects/account-settings.js')
const emailEnv = require('../../fixtures/email-env.json')
const accountSettingsUtils = require('../../utils/account-settings.js')
const signUpUtils = require('../../utils/signup.js')
const loginUtils = require('../../utils/login.js')



describe('Change email test suite', ()=>{
    let emailToken, currentEmail, newToken ,newEmail
    before( async () => {
        const creatAccountBtn = await SignUpPage.createAccount()
        await creatAccountBtn.click()
        emailToken = await signUpUtils.goToPageOfSignUp(6)
        currentEmail = `${emailToken}${emailEnv.emailNameSpace}`
        await commands.restartApp()
        await browser.pause(1000) // wait to ensure the the new token diff
        newToken = await signUpUtils.createEmailToken()
        newEmail = `${newToken}${emailEnv.emailNameSpace}`
    })

    afterEach(async () => {
        await commands.restartApp()
    })

    beforeEach( async ()=>{
        // open email settings
        await accountSettingsUtils.openAccountSetting()
        const emailSettings = await AccountSettingPage.changeEmail()
        expect(emailSettings).toExist()
        await emailSettings.click()
        await browser.pause(1000);
    })

    it('Enter existing email', async () => {
        await accountSettingsUtils.enterEmail(data.user.email)
        const emailTitle = await AccountSettingPage.chnagEmailTitle()
        expect(await emailTitle.isExisting()).toBe(true)
    })

    it('Enter invalid email', async () => {
        await accountSettingsUtils.enterEmail('3omda@gmail.')
        const emailTitle = await AccountSettingPage.chnagEmailTitle()
        expect(await emailTitle.isExisting()).toBe(true)
    })

    it('Enter valid email then proceed', async () => {
        await accountSettingsUtils.enterEmail(newEmail)
        await browser.pause(1000);
        const verificationCodeTitle = await AccountSettingPage.verificationCodeTitle()
        expect(await verificationCodeTitle.isDisplayed()).toBe(true)
    })

    it('Enter invalid verification code', async () => {
        await accountSettingsUtils.enterEmail(newEmail)
        await accountSettingsUtils.enterVerificationCode('111111')
        const verificationCodeTitle = await AccountSettingPage.verificationCodeTitle()
        expect(await verificationCodeTitle.isDisplayed()).toBe(true)
    })

    it('Enter valid verification code and login with the new email', async () => {
        await accountSettingsUtils.enterEmail(newEmail)
        const code = await signUpUtils.getVerificationCode(newToken, true) 
        await accountSettingsUtils.enterVerificationCode(code)
        await browser.pause(1000)
        await accountSettingsUtils.openAccountSetting()
        const logout = await AccountSettingPage.logout()
        expect(logout).toBeDisplayed()
        await logout.click()
        await loginUtils.login(newEmail, data.user.password)
    })
})