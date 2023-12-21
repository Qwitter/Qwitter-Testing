import 'cypress-file-upload'

import { login } from "../../utils"
import { MessagesPo } from "../../support/page-objects"
import { 
    createNewConvo, 
    checkConvos, 
    replyToFirstMessage, 
    deleteFirstConvo,
    deleteMessage
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
        // cy.wait(6000)
        cy.reload()
        cy.wait(6000)
        deleteFirstConvo()
        cy.reload()
        cy.wait(6000)
    })

    it('searches for a user', () => {
        createNewConvo(data.messages.searchUser, data.messages.message)
    })

    it('shows conversations', () => {
        createNewConvo(data.messages.searchUser, data.messages.message)
        cy.reload()
        checkConvos()
    })

    it('sends a message with media', () => {
        createNewConvo(data.messages.mediaUser, data.messages.message)
        cy.reload()
        const uploadMedia = MessagesPo.uploadMedia
        uploadMedia.should('be.hidden')
        uploadMedia.attachFile(data.messages.media)
        cy.wait(1000)
        const sendButton = MessagesPo.sendButton
        sendButton.should('be.visible')
        sendButton.click()
        cy.reload()
        const messageMedia = MessagesPo.messageMedia
        messageMedia.find(">img").should('be.visible')
    })

    it('replies to a message', () => {
        createNewConvo(data.messages.replyUser, data.messages.message)
        cy.reload()
        replyToFirstMessage(data.messages.reply, data.messages.message)
    })

    it('deletes a message', () => {
        createNewConvo(data.messages.searchUser, data.messages.messageToBeDeleted)
        deleteMessage(data.messages.messageToBeDeleted)
    })
})