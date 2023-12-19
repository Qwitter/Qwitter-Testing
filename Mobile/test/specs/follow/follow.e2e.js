const { browser } = require('@wdio/globals')
const commands = require('../../../commands.js')
const data  = require('../../fixtures/login-data.json')
const AccountSettingPage = require('../../page-objects/account-settings.js')
const FollowPage = require('../../page-objects/follow.js')
const loginUtils = require('../../utils/login.js')

describe('Follow and unfollow test suite', ()=>{
    const follow = 'follow'
    const following = 'following'
    before( async () => {
        await loginUtils.login(data.user.email, data.user.password)
    })

    afterEach(async () => {
        await commands.restartApp()
        await browser.pause(3500);
    })

    beforeEach( async ()=>{
        // open email settings
        const navbar = await AccountSettingPage.navigationSideBar()
        await navbar.waitForDisplayed()
        await navbar.click()
        await browser.pause(2000);
    })

    it('open following list', async() => {
        const follwingBtn = await FollowPage.followingList()
        await follwingBtn.click()
        await browser.pause(1500)
        const followingHeader = await FollowPage.followingListHeader()
        expect(await followingHeader.isDisplayed()).toBe(true)
        const followingUser = await FollowPage.followingButton()
        if(followingUser)
            expect(await followingUser.isDisplayed()).toBe(true)
    })

    it('open followers list', async() => {
        const follwoersBtn = await FollowPage.followersList()
        await follwoersBtn.click()
        await browser.pause(1500)
        const followersgHeader = await FollowPage.followersListHeader()
        expect(await followersgHeader.isDisplayed()).toBe(true)
        const followerUser = await FollowPage.followingButton()
        if(followerUser)
            expect(await followerUser.isDisplayed()).toBe(true)
    })

    it('follow user from follows page then unfollow', async () => {
        const follwingBtn = await FollowPage.followingList()
        await follwingBtn.click()
        await browser.pause(1000)
        const usersToFollow = await FollowPage.usersToFollowButton()
        await usersToFollow.click()
        const followBtn = await FollowPage.followButton()
        if(followBtn){
            await followBtn.click()
            await browser.pause(700)
            await followBtn.click()
        }
    })

    it('follow user from profile page then unfollow', async () => {
        const follwingBtn = await FollowPage.followingList()
        await follwingBtn.click()
        await browser.pause(1000)
        const usersToFollow = await FollowPage.usersToFollowButton()
        await usersToFollow.click()
        await browser.pause(2000)
        const firstUser = await FollowPage.firstUserInFollowScreen()
        if(firstUser){
            await firstUser.click()
            await browser.pause(1000)
            const follow = await FollowPage.followFromProfile()
            expect(await follow.isDisplayed()).toBe(true)
            await follow.click()
            const unfollow = await FollowPage.unfollowFromProfile()
            expect(await unfollow.isDisplayed()).toBe(true)
            await unfollow.click()
        }
    })


})