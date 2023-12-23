const { browser } = require('@wdio/globals')
const commands = require('../../../commands.js')
const data  = require('../../fixtures/login-data.json')
const AccountSettingPage = require('../../page-objects/account-settings.js')
const accountSettingsUtils = require('../../utils/account-settings.js')
const loginUtils = require('../../utils/login.js')



describe('Change username test suite', ()=>{
    before( async () => {
        await loginUtils.login(data.user.email, data.user.password)
    })

    afterEach(async () => {
        await commands.restartApp()
    })

    beforeEach( async ()=>{
        // open username settings
        await accountSettingsUtils.openAccountSetting()
        const usernameSettings = await AccountSettingPage.changeUsername()
        expect(usernameSettings).toExist()
        await usernameSettings.click()
        await browser.pause(1000);
    })

    it('Enter existing username', async () => {
        await accountSettingsUtils.enterUsername(data.user.username)
        const next = await AccountSettingPage.next()
        await next.click()
        const usernameTitle = await AccountSettingPage.changeUsernameTitle()
        expect(await usernameTitle.isDisplayed()).toBe(true)
    })

    it('Enter empty field', async () => {
        await accountSettingsUtils.enterUsername('')
        const next = await AccountSettingPage.next()
        expect(await next.isEnabled()).toBe(false)
    })

    it('Enter small char username', async () => {
        await accountSettingsUtils.enterUsername('mar')
        const next = await AccountSettingPage.next()
        await next.click()
        const usernameTitle = await AccountSettingPage.changeUsernameTitle()
        expect(await usernameTitle.isDisplayed()).toBe(true)
    })

    it('Enter invalid chars', async () => {
        await accountSettingsUtils.enterUsername(`${data.user.username}@`)
        const next = await AccountSettingPage.next()
        expect(await next.isEnabled()).toBe(false)
        const errorMessage = await AccountSettingPage.usernameErrorMessage()
        expect(await errorMessage.isDisplayed()).toBe(true)
    })

    it('Enter longer username', async () => {
        let longUsername = 'X'.repeat(20)
        await accountSettingsUtils.enterUsername(longUsername)
        const next = await AccountSettingPage.next()
        expect(await next.isEnabled()).toBe(false)
        const errorMessage = await AccountSettingPage.usernameErrorMessage()
        expect(await errorMessage.isDisplayed()).toBe(true)
    })

    it('Enter valid username', async () => {
        await accountSettingsUtils.enterUsername('marwanemad1')
        const next = await AccountSettingPage.next()
        expect(await next.isEnabled()).toBe(true)
        await next.click()
        await browser.pause(1000)
    })

    it('Return the use name again', async () => {
        await accountSettingsUtils.enterUsername(data.user.username)
        const next = await AccountSettingPage.next()
        expect(await next.isEnabled()).toBe(true)
        await next.click()
        await browser.pause(1000)
    })

})