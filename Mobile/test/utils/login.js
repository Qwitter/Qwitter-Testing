const { browser } = require('@wdio/globals')
const LoginPagePo = require('../page-objects/LoginPagePo')
const TimelinePagePo = require('../page-objects/TimelinePagePo')
const AccountSettingsPo = require('../page-objects/account-settings')

module.exports = {
    login: async function (email, password){
        const signIn = await LoginPagePo.signupButton()
        await signIn.click()
        const emailField = await LoginPagePo.emailField()
        await emailField.click()
        await emailField.setValue(email)
        const next = await LoginPagePo.nextButton()
        await next.click()
        await browser.pause(3000)
        const passwordField = await LoginPagePo.passwordField()
        await passwordField.click()
        await passwordField.setValue(password)
        await browser.hideKeyboard()
        const login = await LoginPagePo.loginButton()
        await login.click()
        await browser.pause(3000)
    },
    logout: async function () {
        const home = await TimelinePagePo.home()
        await home.click()
        const profilePic = await TimelinePagePo.profilePic()
        await profilePic.click()
        await browser.pause(2000)
        await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1, 5)')
        const settingsButton = await AccountSettingsPo.settingsButton()
        await settingsButton.click()
        await browser.pause(2000)
        await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1, 5)')
        const settingsAndPrivacy = await AccountSettingsPo.settingsAndPrivacy()
        await settingsAndPrivacy.click()
        const accountInformation = await AccountSettingsPo.accountInformation()
        await accountInformation.click()
        const logout = await AccountSettingsPo.logout()
        await logout.click()
    }
}
