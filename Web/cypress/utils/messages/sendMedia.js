import 'cypress-file-upload'
import { MessagesPo } from '../../support/page-objects'

export function sendMedia(media) {    
    const uploadMedia = MessagesPo.uploadMedia
    uploadMedia.should('be.hidden')
    uploadMedia.attachFile(media)
    cy.wait(1000)
    const sendButton = MessagesPo.sendButton
    sendButton.should('be.visible')
    sendButton.click()
    cy.reload()
    const messageMedia = MessagesPo.messageMedia
    messageMedia.find(">img").should('be.visible')
}