const { browser } = require('@wdio/globals')
const commands = require('../../../commands')
const loginData = require('../../fixtures/login-data.json')
const TimelinePagePo = require('../../page-objects/TimelinePagePo')
const loginUtils = require('../../utils/login.js')

describe('Timeline Suite', () => {
    afterEach(async () => {
        await commands.restartApp()
        const home = await TimelinePagePo.home()
        await home.click()
        await browser.pause(5000)
    })

    before('login', async () => {
        await loginUtils.login(loginData.validEmail, loginData.validPassword)
        await browser.pause(5000)
    })

    it('checks sidebar', async () => {
        const profilePic = await TimelinePagePo.profilePic()
        await profilePic.click()
        const sidebarList = await TimelinePagePo.sidebarList()
        const listItems = await sidebarList.$$('//android.view.View')
        expect(listItems.length-1).toBe(8)
        const tabs = ["Profile", "Premium", "Bookmarks", "Lists", "Spaces", "Monetization"]
        tabs.forEach(async (tab) => {
            const tabItem = await sidebarList.$(`//android.view.View[@content-desc="${tab}"]`)
            expect(await tabItem.isDisplayed()).toBe(true)
        })
    })

    it('checks correct user data', async () => {
        const profilePic = await TimelinePagePo.profilePic()
        await profilePic.click()
        const userDetails = await TimelinePagePo.userDetails(loginData.name, loginData.username)
        expect(await userDetails.isDisplayed()).toBe(true)
        await commands.restartApp(true)
        await browser.pause(5000)
        await loginUtils.login(loginData.timelineUser.email, loginData.timelineUser.password)
        await browser.pause(5000)
        const otherProfilePic = await TimelinePagePo.profilePic()
        await otherProfilePic.click()
        const otherUserDetails = await TimelinePagePo.userDetails(loginData.otherName, loginData.otherUsername)
        expect(await otherUserDetails.isDisplayed()).toBe(true)
        await commands.restartApp(true)
        await browser.pause(5000)
        await loginUtils.login(loginData.validEmail, loginData.validPassword)
        await browser.pause(5000)
    })

    it('checks that tweets in for you timeline are from followed users', async () => {
        const followingList = [
            "Ahmed Abdelatty", 
            "Omar Mahmoud", 
            "Marwan Emad", 
            "abdo", 
            "eng ahmed",
            "aly",    
        ]
        const forYouTab = await TimelinePagePo.forYouTab()
        await forYouTab.click()
        await browser.pause(5000)
        let flag = false
        const button = await $('(//android.widget.Button[@class="android.widget.Button"])[8]')
        const name = await button.$('//android.view.View')
        flag = flag || followingList.includes(await name.getAttribute('content-desc'))
        expect(flag).toBe(true)
    })

    it('should navigate to profile page and receive list of my tweets', async () => {
        const profilePic = await TimelinePagePo.profilePic()
        await profilePic.click()
        const profileButton = await TimelinePagePo.profileButton()
        await profileButton.click()
        await browser.pause(5000)
        const button = await $('(//android.widget.Button[@class="android.widget.Button"])[19]')
        const name = await button.$('//android.view.View')
        const attr = await name.getAttribute('content-desc')
        let flag = false
        flag = flag || (loginData.name === attr)
        expect(flag).toBe(true)
    })
})