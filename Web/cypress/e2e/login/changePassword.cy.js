import { SettingsPagePo, ChangePasswordPo, LoginPagePo } from "../../support/page-objects";
import { login } from "../../utils";

describe('change password', () => {
    before('load fixture', () => {
        cy.fixture("data").then((data) => {
            globalThis.data = data
        })
    })

    beforeEach('login', () => {
        login(data.loginPage.validEmail, data.changePasswordPage.currentPassword)
        LoginPagePo.settingsButton.click()
        SettingsPagePo.changePasswordLink.click()
    })

    it('requires current password', () => {
        ChangePasswordPo.currentPasswordInputField.type(data.changePasswordPage.newPassword)
        ChangePasswordPo.newPasswordInputField.type(data.changePasswordPage.newPassword)
        ChangePasswordPo.confirmPasswordInputField.type(data.changePasswordPage.newPassword)
        ChangePasswordPo.saveButton.click()
        cy.wait(1000)
        cy.get("li[role='status']").should('not.exist')
    })

    it('requires new password', () => {
        ChangePasswordPo.currentPasswordInputField.type(data.changePasswordPage.currentPassword)
        ChangePasswordPo.confirmPasswordInputField.type(data.changePasswordPage.newPassword)
        ChangePasswordPo.saveButton.should('be.disabled')
    })

    it('requires confirm password', () => {
        ChangePasswordPo.currentPasswordInputField.type(data.changePasswordPage.currentPassword)
        ChangePasswordPo.newPasswordInputField.type(data.changePasswordPage.newPassword)
        ChangePasswordPo.saveButton.should('be.disabled')
    })

    it('requires confirm password to match new password', () => {
        ChangePasswordPo.currentPasswordInputField.type(data.changePasswordPage.currentPassword)
        ChangePasswordPo.newPasswordInputField.type(data.changePasswordPage.newPassword)
        ChangePasswordPo.confirmPasswordInputField.type(data.changePasswordPage.invalidPassword)
        ChangePasswordPo.saveButton.click()
        cy.wait(1000)
        cy.get("li[role='status']").should('not.exist')
    })

    it('validates all passwords', () => {
        ChangePasswordPo.currentPasswordInputField.type(data.changePasswordPage.invalidPassword)
        ChangePasswordPo.newPasswordInputField.type(data.changePasswordPage.invalidPassword)
        ChangePasswordPo.confirmPasswordInputField.type(data.changePasswordPage.invalidPassword)
        ChangePasswordPo.saveButton.click()
        cy.wait(1000)
        cy.get("li[role='status']").should('not.exist')
    })

    it('works with valid passwords', () => {
        ChangePasswordPo.currentPasswordInputField.type(data.changePasswordPage.currentPassword)
        ChangePasswordPo.newPasswordInputField.type(data.changePasswordPage.newPassword)
        ChangePasswordPo.confirmPasswordInputField.type(data.changePasswordPage.newPassword)
        ChangePasswordPo.saveButton.click()
        cy.wait(1000)
        cy.get("li[role='status']").should('be.visible')
        login(data.loginPage.validEmail, data.changePasswordPage.newPassword)
        LoginPagePo.settingsButton.click()
        SettingsPagePo.changePasswordLink.click()
        ChangePasswordPo.currentPasswordInputField.type(data.changePasswordPage.newPassword)
        ChangePasswordPo.newPasswordInputField.type(data.changePasswordPage.currentPassword)
        ChangePasswordPo.confirmPasswordInputField.type(data.changePasswordPage.currentPassword)
        ChangePasswordPo.saveButton.click()
        cy.wait(1000)
        cy.get("li[role='status']").should('be.visible')
    })

    it('changes password', () => {
        ChangePasswordPo.currentPasswordInputField.type(data.changePasswordPage.currentPassword)
        ChangePasswordPo.newPasswordInputField.type(data.changePasswordPage.newPassword)
        ChangePasswordPo.confirmPasswordInputField.type(data.changePasswordPage.newPassword)
        ChangePasswordPo.saveButton.click()
        cy.wait(1000)
        cy.get("li[role='status']").should('be.visible')
        login(data.loginPage.validEmail, data.changePasswordPage.newPassword)
        LoginPagePo.settingsButton.click()
        SettingsPagePo.changePasswordLink.click()
        ChangePasswordPo.currentPasswordInputField.clear()
        ChangePasswordPo.newPasswordInputField.clear()
        ChangePasswordPo.confirmPasswordInputField.clear()
        ChangePasswordPo.currentPasswordInputField.type(data.changePasswordPage.newPassword)
        ChangePasswordPo.newPasswordInputField.type(data.changePasswordPage.currentPassword)
        ChangePasswordPo.confirmPasswordInputField.type(data.changePasswordPage.currentPassword)
        ChangePasswordPo.saveButton.click()
        cy.wait(1000)
        cy.get("li[role='status']").should('be.visible')
        login(data.loginPage.validEmail, data.changePasswordPage.currentPassword)
    })
})