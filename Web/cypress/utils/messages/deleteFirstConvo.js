import { MessagesPo } from "../../support/page-objects"

export function deleteFirstConvo() {
    const conversations = MessagesPo.conversations
    const firstConvo = conversations.find("li").first()
    firstConvo.trigger('mouseover')
    const convoPopover = MessagesPo.convoPopover.eq(0)
    convoPopover.click({force: true})
    const deleteConversation = MessagesPo.deleteConversation.eq(0)
    deleteConversation.should('be.visible')
    deleteConversation.click()
    const confirmLeave = MessagesPo.confirmLeave
    confirmLeave.should('be.visible')
    confirmLeave.click()
}