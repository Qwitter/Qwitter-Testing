const { browser } = require('@wdio/globals')
const commands = require('../../../commands.js')
const data  = require('../../fixtures/login-data.json')
const TrendsPage = require('../../page-objects/trends.js')
const SearchPage = require('../../page-objects/search.js')
const loginUtils = require('../../utils/login.js')

describe('Trends test suite', ()=>{
    before( async () => {
        await loginUtils.login(data.user.email, data.user.password)
    })

    afterEach(async () => {
        await commands.restartApp()
        await browser.pause(3500);
    })

    beforeEach( async ()=>{
        const searchTab = await SearchPage.searchTab()
        await searchTab.click()
    })

    it('trends should be displayed', async () => {
        const firstTrend = await TrendsPage.firstTrend()
        expect(await firstTrend.isDisplayed()).toBe(true)
        const location = await firstTrend.getLocation()
    })

    it('top tab should be selected', async () => {
        const firstTrend = await TrendsPage.firstTrend()
        const location = await firstTrend.getLocation()
        await browser.touchAction([
            { action: 'press', x: location.x + 120, y: location.y + 100 },
            { action: 'release' }
        ])
        await browser.pause(2000)
        const topTab = await TrendsPage.topTab()
        expect(await topTab.isSelected()).toBe(true)
    })

    it('people tab shouldnt be selected', async () => {
        const firstTrend = await TrendsPage.firstTrend()
        const location = await firstTrend.getLocation()
        await browser.touchAction([
            { action: 'press', x: location.x + 120, y: location.y + 100 },
            { action: 'release' }
        ])
        await browser.pause(2000)
        const topTab = await TrendsPage.peopleTab()
        expect(await topTab.isSelected()).toBe(false)
    })

    it('trend posts should be visible', async () => {
        const firstTrend = await TrendsPage.firstTrend()
        const location = await firstTrend.getLocation()
        await browser.touchAction([
            { action: 'press', x: location.x + 120, y: location.y + 100 },
            { action: 'release' }
        ])
        await browser.pause(3000)
        const firstPost = await TrendsPage.firstPost()
        expect(await firstPost.isDisplayed()).toBe(true)
    })

    it('posts should contain trend keyword', async () => {
        const firstTrend = await TrendsPage.firstTrend()
        let trend = await firstTrend.getAttribute('contentDescription')
        if(trend){
            trend = trend.substring(12).match(/[^\d]+/)[0].trim()
            const location = await firstTrend.getLocation()
            await browser.touchAction([
                { action: 'press', x: location.x + 120, y: location.y + 100 },
                { action: 'release' }
            ])
            await browser.pause(3000)
            const firstPost = await TrendsPage.firstPost()
            const content = await firstPost.getAttribute('contentDescription')
            expect(content.includes(trend)).toBe(true)
        }
    })
})