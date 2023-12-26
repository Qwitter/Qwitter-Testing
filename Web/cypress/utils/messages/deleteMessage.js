import { MessagesPo } from "../../support/page-objects"

export function deleteMessage(messageToBeDeleted) {
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
    cy.contains(messageToBeDeleted).should('not.exist')
}