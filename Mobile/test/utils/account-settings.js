const { browser } = require('@wdio/globals')
const AccountSettingPage = require('../page-objects/account-settings')

module.exports = {
    enterEmail: async function (email){
        const emailField = await AccountSettingPage.emailField()
        await emailField.click()
        await emailField.setValue(email)
        await browser.hideKeyboard()
        const next = await AccountSettingPage.nextButton()
        await next.click()
    },
    enterVerificationCode: async function(code){
        const verificationCodeField = await AccountSettingPage.verificationCodeField()
        await verificationCodeField.click()
        await verificationCodeField.setValue(code)
        await browser.hideKeyboard()
        const next = await AccountSettingPage.nextButton()
        await next.click()
    },
    openAccountSetting: async function(){
        const navbar = await AccountSettingPage.navigationSideBar()
        await navbar.waitForDisplayed()
        await navbar.click()
        await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1, 5)')
        await browser.pause(1000)
        const settings = await AccountSettingPage.settingsButton()
        expect(await settings.isDisplayed()).toBe(true)
        await settings.click()
        await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1, 5)')
        await browser.pause(1000)
        const settingsAndPrivacy = await AccountSettingPage.settingsAndPrivacy()
        await settingsAndPrivacy.click()
        const accountInformation = await AccountSettingPage.accountInformation()
        expect(await accountInformation.isExisting()).toBe(true)
        await accountInformation.click()
    }
}
