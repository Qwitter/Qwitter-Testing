const { browser } = require('@wdio/globals')
const commands = require('../../../commands.js')
const data  = require('../../fixtures/login-data.json')
const SearchPage = require('../../page-objects/search.js')
const loginUtils = require('../../utils/login.js')
const searchUtils = require('../../utils/search.js')


describe('Search test suite', ()=>{
    const searchKeyword = 'ma'
    const notExistingUser = 'notExistingUserIsComming'
    before( async () => {
        await loginUtils.login(data.user.email, data.user.password)
    })

    afterEach(async () => {
        await commands.restartApp()
        await browser.pause(3500);
    })

    beforeEach( async ()=>{
        // open email settings
        const searchTab = await SearchPage.searchTab()
        await searchTab.click()
        const searchBar = await SearchPage.searchBar()
        await searchBar.click()
    })

    it('search bar should be visible', async () => {
        const search = await SearchPage.search()
        expect(await search.isDisplayed()).toBe(true)
    })

    it('clear search keyword', async () => {
        await searchUtils.searchFor("Clear Search")
        const clear = await SearchPage.clearSearch()
        await clear.click()
        const search = await SearchPage.search()
        expect(search).toHaveText('')
    })

    it('results empty when input empty', async () => {
        const noUsersMessage = await SearchPage.notExistingUserMessage()
        await expect(await noUsersMessage.isDisplayed()).toBe(true)
    })
    
    it('search for non-existing user', async () => {
        await searchUtils.searchFor(notExistingUser)
        const noUsersMessage = await SearchPage.notExistingUserMessage()
        await expect(await noUsersMessage.isDisplayed()).toBe(true)
    })

    it('search for existing user', async () => {
        await searchUtils.searchFor(searchKeyword)
        const firstUser = await SearchPage.firstUser()
        if(firstUser){
            await firstUser.click()
            await browser.pause(3000)
            const postsTab = await SearchPage.postsTab()
            expect(await postsTab.isDisplayed()).toBe(true)
        }
    })

    it('add text then delete it', async () => {
        await searchUtils.searchFor(searchKeyword)
        const clear = await SearchPage.clearSearch()
        await clear.click()
        const noUsersMessage = await SearchPage.notExistingUserMessage()
        await expect(await noUsersMessage.isDisplayed()).toBe(true)
    })

})