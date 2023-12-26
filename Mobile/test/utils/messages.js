const MessagesPo = require('../page-objects/MessagesPo')

module.exports = {
    createConvo: async function () {
        const messagesTab = await MessagesPo.messagesTab()
        await messagesTab.click()
        await browser.pause(5000)
        const plusButton = await MessagesPo.plusButton()
        await plusButton.click()
        const editText = await MessagesPo.editText()
        await editText.click()
        await editText.setValue('eng')
        await browser.pause(5000)
        const engahmed = await MessagesPo.engahmed()
        await engahmed.click()
        await editText.click()
        await editText.setValue('tester')
        await browser.pause(5000)
        const qwittertester = await MessagesPo.qwittertester()
        await qwittertester.click()
        const create = await MessagesPo.create()
        await create.click()
        await browser.pause(5000)
    },
    deleteNewlyCreatedConvo: async function () {
        const ibutton = await MessagesPo.ibutton()
        await ibutton.click()
        const leaveConversation = await MessagesPo.leaveConversation()
        await leaveConversation.click()
        await browser.pause(3000)
        const topConvo = await MessagesPo.topConvo()
        expect(await topConvo.isDisplayed()).toBe(false)
    },
    sendTextMessage: async function (message, isReply = false) {
        const editText = await MessagesPo.editText()
        await editText.click()
        await editText.setValue(message)
        let sendButton
        if (isReply) sendButton = await MessagesPo.sendButtonReply()
        else sendButton = await MessagesPo.sendButton()
        await sendButton.click()
        await browser.pause(3000)
        const getMessage = await MessagesPo.getMessage(message)
        expect(await getMessage.isDisplayed()).toBe(true)
    },
    sendMediaMessage: async function () {
        const mediaButton = await MessagesPo.mediaButton()
        await mediaButton.click()
        await browser.pause(3000)
        const firstPhoto = await MessagesPo.firstPhoto()
        await firstPhoto.click()
        const sendButton = await MessagesPo.sendButton()
        await sendButton.click()
        await browser.pause(3000)
        const sentPhoto = await MessagesPo.sentPhoto()
        expect(await sentPhoto.isDisplayed()).toBe(true)
    },
    renameConvo: async function (newName) {
        const ibutton = await MessagesPo.ibutton()
        await ibutton.click()
        const editButton = await MessagesPo.editButton()
        await editButton.click()
        const editText = await MessagesPo.editText()
        await editText.click()
        await editText.setValue(newName)
        const saveButton = await MessagesPo.saveButton()
        await saveButton.click()
        await browser.pause(3000)
        const groupName = await MessagesPo.groupName()
        expect(await groupName.getAttribute('content-desc')).toBe(newName)
        const backButton = await MessagesPo.backButton()
        await backButton.click()
    },
    changeConvoPhoto: async function () {
        const ibutton = await MessagesPo.ibutton()
        await ibutton.click()
        const editButton = await MessagesPo.editButton()
        await editButton.click()
        const convoPic = await MessagesPo.convoPic()
        await convoPic.click()
        await browser.pause(3000)
        const firstPhoto = await MessagesPo.firstPhoto()
        await firstPhoto.click()
        const saveButton = await MessagesPo.saveButton()
        await saveButton.click()
        await browser.pause(3000)
        const backButton = await MessagesPo.backButton()
        await backButton.click()
    },
    deleteMessage: async function (message) {
        const getMessage = await MessagesPo.getMessage(message)
        await browser.touchAction({
            action: 'longPress',
            element: getMessage        
        })
        const deleteMessage = await MessagesPo.deleteMessage()
        await deleteMessage.click()
        await browser.pause(3000)
        expect(await getMessage.isDisplayed()).toBe(false)
    },
    replyToMessage: async function(message) {
        const getMessage = await MessagesPo.getMessage(message)
        await browser.touchAction({
            action: 'longPress',
            element: getMessage
        })
        const replyButton = await MessagesPo.replyButton()
        await replyButton.click()
        await browser.pause(3000)
    }
}