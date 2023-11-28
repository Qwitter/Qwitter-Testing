import AccountSettingsPage from '../../support/page-objects/account-settings'
import { login } from '../../utils/login'
const data = require('../../fixtures/data.json')

describe('Testing username', () => {
    beforeEach('login', () => {
        cy.clearCookies()
        cy.clearLocalStorage()
        login(data.loginPage.validEmail, data.loginPage.validPassword)
        AccountSettingsPage.settingsButton.should('be.visible').click()
        AccountSettingsPage.back.should('be.hidden')
        AccountSettingsPage.accountInformation.should('be.visible').click()
    })

    it('open change username page', () => {
        AccountSettingsPage.userNameSettings.should('be.visible').click()
        AccountSettingsPage.save.should('be.visible').and('be.disabled')
        AccountSettingsPage.errorMessage.should('not.be.visible')
        AccountSettingsPage.back.should('be.visible').click()
        cy.url().should('include', '/account')
    })

    it('enter valid username', () => {
        AccountSettingsPage.userNameSettings.should('be.visible').click()
        AccountSettingsPage.usernameField.should('be.visible').clear().type(data.accountSettingsPage.validUsername)
        AccountSettingsPage.usernameField.should('have.value', data.accountSettingsPage.validUsername)
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
        const randomIndex = Math.floor(Math.random() * 5)
        let username
        AccountSettingsPage.usernameSuggestions.should('have.length', 5)
        .each(($el, index, $list) => {
            if(index == randomIndex){
                cy.wrap($el).should('be.visible').click()
                cy.wrap($el).invoke('text').then((text) => {
                    cy.log(text)
                    username = text.substring(1, text.length-1)
                }).then(()=>{
                    cy.log(username)
                    AccountSettingsPage.usernameField.should('have.value', username)
                })
            }
        })
        AccountSettingsPage.errorMessage.should('not.exist')
        AccountSettingsPage.save.should('be.visible').click()
    })
})