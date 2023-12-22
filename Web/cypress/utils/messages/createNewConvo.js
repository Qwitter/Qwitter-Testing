import { MessagesPo } from "../../support/page-objects"

export function createNewConvo(searchUser, message) {
    const composeMessages = MessagesPo.composeMessages
    composeMessages.should('be.visible')
    composeMessages.click()
    const searchPeople = MessagesPo.searchPeople
    searchPeople.should('be.visible')
    searchPeople.type(searchUser)
    const searchedUsers = MessagesPo.searchedUsers
    const user = searchedUsers.find("li").first()
    cy.contains(searchUser).should('be.visible')
    user.click()
    const nextButton = cy.contains("Next")
    nextButton.should('be.enabled')
    nextButton.click()
    const startANewMessage = MessagesPo.startANewMessage
    startANewMessage.should('be.visible')
    startANewMessage.type(message)
    cy.wait(1000)
    const sendButton = MessagesPo.sendButton
    sendButton.should('be.visible')
    sendButton.click()
    cy.contains(message).should('be.visible')
}