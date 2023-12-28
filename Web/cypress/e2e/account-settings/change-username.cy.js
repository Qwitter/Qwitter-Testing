import AccountSettingsPage from '../../support/page-objects/account-settings'
import { login } from '../../utils/login'
import { chooseRandomeUserName } from '../../utils/signup/signup'
const data = require('../../fixtures/data.json')

describe('Testing username', () => {
    beforeEach('login', () => {
        cy.clearCookies()
        cy.clearLocalStorage()
        login(data.loginPage.validEmail, data.loginPage.validPassword)
        AccountSettingsPage.settingsButton.should('be.visible').click()
        AccountSettingsPage.accountInformation.should('be.visible').click()
    })

    it('open change username page', () => {
        AccountSettingsPage.userNameSettings.should('be.visible').click()
        cy.wait(2000)
        AccountSettingsPage.save.should('be.visible').and('be.disabled')
        AccountSettingsPage.errorMessage.should('not.exist')
        AccountSettingsPage.back.should('be.visible').click()
        cy.url().should('include', '/account')
    })

    it('enter valid username', () => {
        AccountSettingsPage.userNameSettings.should('be.visible').click()
        let username = `X${new Date().getTime()}`
        AccountSettingsPage.usernameField.should('be.visible').clear().type(username)
        AccountSettingsPage.usernameField.should('have.value', username)
        AccountSettingsPage.errorMessage.should('not.exist')
        AccountSettingsPage.save.should('be.visible').click()
    })

    it('enter invalid username', () => {
        AccountSettingsPage.userNameSettings.should('be.visible').click()
        AccountSettingsPage.usernameField.should('be.visible').clear().type(data.accountSettingsPage.invalidUsername)
        AccountSettingsPage.errorMessage.should('be.visible')
        AccountSettingsPage.save.should('be.disabled')
    })
    
    it('choose random suggested username', () => {
        AccountSettingsPage.userNameSettings.should('be.visible').click()
        chooseRandomeUserName()
        AccountSettingsPage.errorMessage.should('not.exist')
        AccountSettingsPage.save.should('be.visible').click()
    })
})