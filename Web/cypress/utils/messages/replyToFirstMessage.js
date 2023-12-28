import { MessagesPo } from "../../support/page-objects"

export function replyToFirstMessage (reply, message) {
    const moreButton = MessagesPo.moreButton.eq(0)
    moreButton.should('not.be.visible')
    const textMessage = MessagesPo.textMessage.eq(0)
    textMessage.should('be.visible')
    textMessage.trigger('mouseover')
    moreButton.find(">button").should('be.enabled').click()
    const replyButton = MessagesPo.replyButton.eq(0)
    replyButton.should('be.visible')
    replyButton.click()
    cy.wait(1000)
    const startANewMessage = MessagesPo.startANewMessage
    startANewMessage.should('be.visible')
    startANewMessage.type(reply)
    cy.wait(1000)
    const sendButton = MessagesPo.sendButton
    sendButton.should('be.visible')
    sendButton.click()
    cy.contains(reply).should('be.visible')
    const replyToMessageText = MessagesPo.replyToMessageText.eq(0)
    replyToMessageText.should('be.visible')
    replyToMessageText.should('have.text', message)
}