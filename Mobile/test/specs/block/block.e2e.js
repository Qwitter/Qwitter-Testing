const { browser } = require('@wdio/globals')
const commands = require('../../../commands.js')
const loginData = require('../../fixtures/login-data.json')
const blockData = require('../../fixtures/block-data.json')
const loginUtils = require('../../utils/login.js')
const TimelinePagePo = require('../../page-objects/TimelinePagePo.js')
const BlockPo = require('../../page-objects/BlockPo.js')
const searchPo = require('../../page-objects/search.js')
const searchUtils = require('../../utils/search.js')

describe('block test suite', () => {
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

    it('blocks and unblocks user', async () => {
        const searchTab = await searchPo.searchTab()
        await searchTab.click()
        const searchBar = await searchPo.searchBar()
        await searchBar.click()
        await searchUtils.searchFor(blockData.search)
        const firstUser = await $('~eng ahmed\n@engahmed')
        await firstUser.click()
        const moreButton = await BlockPo.moreButton()
        await moreButton.click()
        const blockButton = await BlockPo.blockButton()
        await blockButton.click()
        await browser.pause(5000)
        const moreButton2 = await BlockPo.moreButton()
        await moreButton2.click()
        const unblockButton = await BlockPo.unblockButton()
        await unblockButton.click()
        await browser.pause(5000)
        const followButton = await BlockPo.followButton()
        expect(await followButton.isDisplayed()).toBe(true)
        await followButton.click()
        await browser.pause(3000)
    })

    it('does not show blocked user in search', async () => {
        const searchTab = await searchPo.searchTab()
        await searchTab.click()
        const searchBar = await searchPo.searchBar()
        await searchBar.click()
        await searchUtils.searchFor(blockData.search)
        const firstUser = await $('~eng ahmed\n@engahmed')
        await firstUser.click()
        const moreButton = await BlockPo.moreButton()
        await moreButton.click()
        const blockButton = await BlockPo.blockButton()
        expect(await blockButton.isDisplayed()).toBe(true)
    })
})