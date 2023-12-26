import AccountSettingsPage from '../../support/page-objects/account-settings'
import { login } from '../../utils/login'
import { createEmail, verifyEmail, goToStep } from '../../utils/signup/signup'
const data = require('../../fixtures/signup-data.json')

describe('Changing email', () => {
    let email
    const wrongPassword = "WrongPassword"
    before('create a new email', () => {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit('')
        cy.contains('button', 'Create account').click()
        email = createEmail()
        goToStep(7, email, true)
    })

    beforeEach('login', () => {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit('')
        login(email, data.strongPassword)
        AccountSettingsPage.settingsButton.should('be.visible').click()
        AccountSettingsPage.accountInformation.should('be.visible').click()
        AccountSettingsPage.emailSettings.should('be.visible').click()
        AccountSettingsPage.currentEmailScreen.should('be.visible').and('be.disabled')
        AccountSettingsPage.updateEmailButton.should('be.visible').click()
        cy.url().should('include', '/add_email')
        cy.wait(500)
    })

    it('enter wrong password then valid one', () => {
        AccountSettingsPage.passwordField.should('have.attr', 'type', 'password')
        AccountSettingsPage.next.should('be.visible').and('be.disabled')
        AccountSettingsPage.passwordField.type(wrongPassword)
        AccountSettingsPage.next.should('be.enabled').click()
        AccountSettingsPage.wrongPasswordMessage.should('be.visible')

        AccountSettingsPage.passwordField.clear().type(data.strongPassword)
        AccountSettingsPage.next.click()
        AccountSettingsPage.changeEmailHeader.should('be.visible')
    })  

    it('canel changing email', () => {
        AccountSettingsPage.passwordField.type(data.strongPassword)
        AccountSettingsPage.next.click()
        AccountSettingsPage.cancel.should('be.visible').click()
        cy.url().should('include', '/email')
    })

    it('enter existing email', () => {
        AccountSettingsPage.passwordField.type(data.strongPassword)
        AccountSettingsPage.next.click()
        AccountSettingsPage.emailField.type(data.existingEmail)
        AccountSettingsPage.emailErrorMessage.should('be.visible')
    })

    it('enter valid email and then invalid verification code', () => {
        AccountSettingsPage.passwordField.type(data.strongPassword)
        AccountSettingsPage.next.click()
        const newEmail = createEmail()
        AccountSettingsPage.emailField.type(newEmail)
        cy.wait(1000)
        AccountSettingsPage.next.should('be.visible').click()

        AccountSettingsPage.verificationCodeHeader.should('be.visible')
        const invalidVerificationCode = '111111'
        AccountSettingsPage.next.should('be.visible').and('be.disabled')
        AccountSettingsPage.verificationCodeField.type(invalidVerificationCode)
        AccountSettingsPage.next.should('be.enabled').click()
        AccountSettingsPage.emailErrorMessage.should('be.visible')
    })  

    it('enter valid email and then valid verification code', () => {
        AccountSettingsPage.passwordField.type(data.strongPassword)
        AccountSettingsPage.next.click()
        const newEmail = createEmail()
        AccountSettingsPage.emailField.type(newEmail)
        AccountSettingsPage.next.click()

        verifyEmail(newEmail).then( (code) => {
            AccountSettingsPage.verificationCodeField.type(code)
        })
        AccountSettingsPage.next.should('be.enabled').click()
        AccountSettingsPage.currentEmailScreen.should('have.value', newEmail)
    })
})