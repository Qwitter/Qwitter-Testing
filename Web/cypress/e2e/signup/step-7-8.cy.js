import SignUpPage from '../../support/page-objects/signup'
import AccountSettingsPage from '../../support/page-objects/account-settings'
import { goToStep, createEmail, chooseRandomeUserName } from '../../utils/signup/signup'
import "cypress-file-upload"
const data = require('../../fixtures/data.json')

describe('Choose username and notifications pages', () => {
    let testEmail
    beforeEach('open username step', () => {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit('i/flow/signup')
        testEmail = createEmail()
        goToStep(7, testEmail, true)
        //SignUpPage.backButton.should('not.exist')
        SignUpPage.usernameHeader.should('be.visible')
    })

    it('skip for now should be available', () => {
        AccountSettingsPage.errorMessage.should('not.exist')
        cy.contains('button', 'Skip for now').should('be.visible').click()
        SignUpPage.notificationHeader.should('be.visible')
    })

    it('enter valid user name', () => {
        let username = `X${new Date().getTime()}`
        SignUpPage.usernameField.clear().type(username)
        AccountSettingsPage.errorMessage.should('not.exist')
        SignUpPage.nextButtonOfUsername.should('be.visible').should('be.enabled').click()
        SignUpPage.notificationHeader.should('be.visible')
    })

    it('enter invalid username', () => {
        SignUpPage.usernameField.clear().type(data.accountSettingsPage.invalidUsername)
        AccountSettingsPage.errorMessage.should('be.visible')
        SignUpPage.nextButtonOfUsername.should('be.visible').should('not.be.enabled')
    })

    it.only('choose a random suggested username', () => {
        SignUpPage.showMoreUsername.should('be.visible').click()
        cy.wait(2000)
        chooseRandomeUserName()
        AccountSettingsPage.errorMessage.should('not.exist')
        SignUpPage.nextButtonOfUsername.should('be.visible').should('be.enabled').click()
        SignUpPage.notificationHeader.should('be.visible')
    })

    it('no back button for allow notification step', () => {
        cy.contains('button', 'Skip for now').should('be.visible').click()
        SignUpPage.notificationHeader.should('be.visible')
        SignUpPage.backButton.should('not.exist')
    })

    it('skip notifications for now', () => {
        cy.contains('button', 'Skip for now').should('be.visible').click()
        SignUpPage.notificationHeader.should('be.visible')
        cy.contains('button', 'Skip for now').should('be.visible').click()
    })
    
    it('allow notifications', () => {
        cy.contains('button', 'Skip for now').should('be.visible').click()
        SignUpPage.notificationHeader.should('be.visible')
        SignUpPage.allowNotifiacton.should('be.visible').click()
    })
})