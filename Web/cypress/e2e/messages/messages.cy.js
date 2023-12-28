import 'cypress-file-upload'

import { 
    login,
    createNewConvo, 
    checkConvos, 
    replyToFirstMessage, 
    deleteFirstConvo,
    deleteMessage,
    sendMedia
} from "../../utils"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('messages test suite', () => {
    before('load fixture', () => {
        cy.fixture("data").then((data) => {
            globalThis.data = data
        })
    })

    beforeEach('login', () => {
        login(data.loginPage.validEmail, data.loginPage.validPassword)
        cy.get("a[href='/Messages']").should('be.visible').click()
    })

    afterEach('delete first convo', () => {
        cy.wait(6000)
        deleteFirstConvo()
        cy.wait(6000)
    })

    it('searches for a user', () => {
        createNewConvo(data.messages.searchUser, data.messages.message)
    })

    it('shows conversations', () => {
        createNewConvo(data.messages.searchUser, data.messages.message)
        cy.wait(6000)
        checkConvos()
    })

    it('sends a message with media', () => {
        createNewConvo(data.messages.mediaUser, data.messages.message)
        sendMedia(data.messages.media)
    })

    it('replies to a message', () => {
        createNewConvo(data.messages.replyUser, data.messages.message)
        replyToFirstMessage(data.messages.reply, data.messages.message)
    })

    it('deletes a message', () => {
        createNewConvo(data.messages.searchUser, data.messages.messageToBeDeleted)
        deleteMessage(data.messages.messageToBeDeleted)
    })
})