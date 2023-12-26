const { browser } = require('@wdio/globals')
const commands = require('../../../commands.js')
const loginData = require('../../fixtures/login-data.json')
const loginUtils = require('../../utils/login.js')
const TimelinePagePo = require('../../page-objects/TimelinePagePo.js')
const messagesUtils = require('../../utils/messages.js')
const MessagesPo = require('../../page-objects/MessagesPo.js')

describe('messages test suite', () => {
    before('login', async () => {
        await loginUtils.login(loginData.validEmail, loginData.validPassword)
        await browser.pause(5000)
    })

    afterEach('restart and return to home', async () => {
        await commands.restartApp()
        const home = await TimelinePagePo.home()
        await home.click()
        await browser.pause(5000)
    })

    beforeEach('goes to messages screen from timeline', async () => {
        const messagesTab = await MessagesPo.messagesTab()
        expect(await messagesTab.isDisplayed()).toBe(true)
        await messagesTab.click()
        await browser.pause(5000)
    })

    it('searches for users and creates and deletes group convo', async () => {
        await messagesUtils.createConvo()
        await messagesUtils.deleteNewlyCreatedConvo()
    })

    it('sends a message', async () => {
        await messagesUtils.createConvo()
        let message = 'appiumagain'
        await messagesUtils.sendTextMessage(message)
        await messagesUtils.deleteNewlyCreatedConvo()
    })

    it('sends a message with media', async () => {
        await messagesUtils.createConvo()
        await messagesUtils.sendMediaMessage()
        await messagesUtils.deleteNewlyCreatedConvo()
    })

    it('replies to a message', async () => {
        await messagesUtils.createConvo()
        let message = 'replyToMe'
        await messagesUtils.sendTextMessage(message)
        let reply = 'reply'
        await messagesUtils.replyToMessage(message)
        await messagesUtils.sendTextMessage(reply, true)
        await messagesUtils.deleteNewlyCreatedConvo()
    })

    it('renames convo', async () => {
        await messagesUtils.createConvo()
        let newName = 'newname'
        await messagesUtils.renameConvo(newName)
        await messagesUtils.deleteNewlyCreatedConvo()
    })

    it('changes convo photo', async () => {
        await messagesUtils.createConvo()
        await messagesUtils.changeConvoPhoto()
        await messagesUtils.deleteNewlyCreatedConvo()
    })

    it('deletes a message', async () => {
        await messagesUtils.createConvo()
        let message = 'delete'
        await messagesUtils.sendTextMessage(message)
        await messagesUtils.deleteMessage(message)
        await messagesUtils.deleteNewlyCreatedConvo()
    })
})