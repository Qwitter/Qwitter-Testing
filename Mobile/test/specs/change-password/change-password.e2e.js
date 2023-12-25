const { browser } = require('@wdio/globals')
const commands = require('../../../commands.js')
const data  = require('../../fixtures/login-data.json')
const AccountSettingPage = require('../../page-objects/account-settings.js')
const accountSettingsUtils = require('../../utils/account-settings.js')
const loginUtils = require('../../utils/login.js')

describe('Change password test suite', ()=>{
    before( async () => {
        await loginUtils.login(data.changePasswordPage.email, data.changePasswordPage.currentPassword)
    })

    afterEach(async () => {
        await commands.restartApp()
    })

    beforeEach( async ()=>{
        // open password settings
        await accountSettingsUtils.openChangePassword()
        await browser.pause(1000);
    })

    it('requires current password', async () => {
        const curPassField = await AccountSettingPage.currentPasswordField()
        const newPassField = await AccountSettingPage.newPasswordField()
        const confirmPassField = await AccountSettingPage.confirmPasswordField()
        await curPassField.click()
        await curPassField.setValue(data.changePasswordPage.newPassword)
        await newPassField.click()
        await newPassField.setValue(data.changePasswordPage.newPassword)
        await confirmPassField.click()
        await confirmPassField.setValue(data.changePasswordPage.newPassword)
        const updatePassword = await AccountSettingPage.updatePassword()
        await updatePassword.click()
        browser.pause(500)
        expect(await updatePassword.isDisplayed()).toBe(true)
    })

    it('requires new password', async () => {
        const newPassField = await AccountSettingPage.newPasswordField()
        const confirmPassField = await AccountSettingPage.confirmPasswordField()
        await newPassField.click()
        await newPassField.setValue(data.changePasswordPage.newPassword)
        await confirmPassField.click()
        await confirmPassField.setValue(data.changePasswordPage.newPassword)
        const updatePassword = await AccountSettingPage.updatePassword()
        expect(await updatePassword.isEnabled()).toBe(false)
    })

    it('requires confirm password', async () => {
        const curPassField = await AccountSettingPage.currentPasswordField()
        const newPassField = await AccountSettingPage.newPasswordField()
        await curPassField.click()
        await curPassField.setValue(data.changePasswordPage.currentPassword)
        await newPassField.click()
        await newPassField.setValue(data.changePasswordPage.newPassword)
        const updatePassword = await AccountSettingPage.updatePassword()
        expect(await updatePassword.isEnabled()).toBe(false)
    })

    it('requires confirm password to match new password', async () => {
        const curPassField = await AccountSettingPage.currentPasswordField()
        const newPassField = await AccountSettingPage.newPasswordField()
        const confirmPassField = await AccountSettingPage.confirmPasswordField()
        await curPassField.click()
        await curPassField.setValue(data.changePasswordPage.currentPassword)
        await newPassField.click()
        await newPassField.setValue(data.changePasswordPage.newPassword)
        await confirmPassField.click()
        await confirmPassField.setValue(data.changePasswordPage.invalidPassword)
        const error = await AccountSettingPage.confirmPasswordErrorMessage()
        expect(await error.isDisplayed()).toBe(true)
    })

    it('changes password', async () => {
        const curPassField = await AccountSettingPage.currentPasswordField()
        const newPassField = await AccountSettingPage.newPasswordField()
        const confirmPassField = await AccountSettingPage.confirmPasswordField()
        await curPassField.click()
        await curPassField.setValue(data.changePasswordPage.currentPassword)
        await newPassField.click()
        await newPassField.setValue(data.changePasswordPage.newPassword)
        await confirmPassField.click()
        await confirmPassField.setValue(data.changePasswordPage.newPassword)
        const updatePassword = await AccountSettingPage.updatePassword()
        await updatePassword.click()
        browser.pause(500)

        // login then return password again
        await commands.restartApp()
        await accountSettingsUtils.openAccountSetting()
        const logout = await AccountSettingPage.logout()
        expect(logout).toBeDisplayed()
        await logout.click()
        await loginUtils.login(data.changePasswordPage.email, data.changePasswordPage.newPassword)

        await accountSettingsUtils.openChangePassword()
        await curPassField.click()
        await curPassField.setValue(data.changePasswordPage.newPassword)
        await newPassField.click()
        await newPassField.setValue(data.changePasswordPage.currentPassword)
        await confirmPassField.click()
        await confirmPassField.setValue(data.changePasswordPage.currentPassword)
        await updatePassword.click()
    })
})