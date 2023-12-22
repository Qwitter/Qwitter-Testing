import { MessagesPo } from "../../support/page-objects"

export function checkConvos() {
    const conversations = MessagesPo.conversations
    const list = conversations.find("li")
    list.should('have.length.at.least', 1)
    const firstConvo = list.first()
    const lastMessage = firstConvo.find(">div>div>span")
    firstConvo.click().then(() => {
        lastMessage.invoke('text').then((text) => {
            cy.contains(text).should('be.visible')
        })
    })
}