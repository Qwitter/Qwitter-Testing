import SignUpPage from '../../support/page-objects/signup'
import { goToStep, createEmail } from '../../utils/signup/signup'
import "cypress-file-upload"

describe('Upload photo step', () => {
    let testEmail
    const photoName = 'El3nab.jpg'
    beforeEach('open upload photo step', () => {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit('i/flow/signup')
        testEmail = createEmail()
        goToStep(6, testEmail, true)
        SignUpPage.backButton.should('not.exist')
        SignUpPage.profilePicHeader.should('be.visible')
    })

    it('skip photo for now', () => {
        cy.contains('button', 'Skip for now').should('be.visible').click()
        cy.wait(1000)
        SignUpPage.usernameHeader.should('be.visible')
    })

    it('attach a photo', () => {
        SignUpPage.profilePicField.attachFile(photoName)
        cy.contains('button', 'Next').should('be.visible').click()
        cy.wait(1000)
        SignUpPage.usernameHeader.should('be.visible')
    })
})