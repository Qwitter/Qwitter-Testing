import 'cypress-file-upload'

import { login } from "../../utils"
import { MessagesPo } from "../../support/page-objects"
import { 
    createNewConvo, 
    checkConvos, 
    replyToFirstMessage, 
    deleteFirstConvo 
} from "../../utils"

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

    it('searches for a user', () => {
        createNewConvo(data.messages.searchUser, data.messages.message)
    })

    it.only('shows conversations', () => {
        createNewConvo(data.messages.searchUser, data.messages.message)
        checkConvos()
        // deleteFirstConvo()
    })

    it('sends a message with media', () => {
        createNewConvo(data.messages.mediaUser, data.messages.message)
        const uploadMedia = MessagesPo.uploadMedia
        uploadMedia.should('be.hidden')
        uploadMedia.attachFile(data.messages.media)
        cy.wait(1000)
        const sendButton = MessagesPo.sendButton
        sendButton.should('be.visible')
        sendButton.click()
        cy.wait(1000)
        const messageMedia = MessagesPo.messageMedia
        messageMedia.find(">img").should('be.visible')
    })

    it('replies to a message', () => {
        createNewConvo(data.messages.replyUser, data.messages.message)
        replyToFirstMessage(data.messages.reply, data.messages.message)
    })

    it.skip('deletes a message', () => {
        createNewConvo(data.messages.searchUser, data.messages.messageToBeDeleted)
        const moreButton = MessagesPo.moreButton.eq(0)
        moreButton.should('not.be.visible')
        const textMessage = MessagesPo.textMessage.eq(0)
        textMessage.should('be.visible')
        textMessage.trigger('mouseover')
        moreButton.find(">button").should('be.enabled').click()
        const deleteButton = MessagesPo.deleteButton.eq(0)
        deleteButton.should('be.visible')
        deleteButton.click()
        const confirmDeleteButton = MessagesPo.confirmDeleteButton.eq(0)
        confirmDeleteButton.should('be.visible')
        confirmDeleteButton.click()
        cy.wait(1000)
        cy.contains(data.messages.messageToBeDeleted).should('not.exist')
    })
})