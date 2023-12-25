const commands = require('../../../commands.js')
const { browser } = require('@wdio/globals')
const ExistingTweetsPage = require('../../page-objects/existing-tweets.js')
const ProfilePage = require('../../page-objects/profile.js')
const loginUtils = require('../../utils/login.js')
const profileUtils = require('../../utils/profile.js')
const data = require('../../fixtures/login-data.json')

describe('Tweet interactions test suite', () => {
    before(async () => {
        await loginUtils.login(data.emailWithManyTweets, data.passwordToEmailWithManyTweets)
    })

    afterEach(async () => {
        await commands.restartApp()
    })

    beforeEach(async () => {
        await profileUtils.openProfile()
        await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1, 1)')
        await browser.pause(2000)
    })

    it('delete a post', async () => {
        const more = await ProfilePage.moreFromPosts()
        await more.click()
        const deletePost = await ProfilePage.deleteTweet()
        await deletePost.click()
    })

    it('add a reply', async () => {
        await profileUtils.writeReply("Eslam Elmarg")
        const replyBtn = await ExistingTweetsPage.replyButton()
        expect(await replyBtn.isEnabled()).toBe(true)
        await replyBtn.click()
    })

    it('add empty reply', async () => {
        await profileUtils.writeReply("    ")
        const replyBtn = await ExistingTweetsPage.replyButton()
        expect(await replyBtn.isEnabled()).toBe(false)
    })

    it('like and unlike a post', async () => {
        const likeBtn = await ExistingTweetsPage.likeButton()
        const oldLikes = await likeBtn.getAttribute('contentDescription')
        await likeBtn.click()
        let newLikes = await likeBtn.getAttribute('contentDescription')
        expect(parseInt(oldLikes) == parseInt(newLikes) + 1 ||
            parseInt(oldLikes) == parseInt(newLikes) - 1).toBe(true)

        await likeBtn.click()
        newLikes = await likeBtn.getAttribute('contentDescription')
        expect(oldLikes === newLikes).toBe(true)
    })

    it('retweet a post', async () => {
        const repliesTab = await ProfilePage.repliesTab()
        await repliesTab.click()
        await browser.pause(2000)
        const retweetBtn = await ExistingTweetsPage.retweetButtonInReplies()
        await retweetBtn.click()
        const repost = await ExistingTweetsPage.repostButton()
        expect(await repost.isDisplayed()).toBe(true)
        await repost.click()
    })

    it('check retweet counter', async () => {
        const repliesTab = await ProfilePage.repliesTab()
        await repliesTab.click()
        await browser.pause(2000)
        const retweetBtn = await ExistingTweetsPage.retweetButtonInReplies()
        const oldRetweetsCounter = await retweetBtn.getAttribute('contentDescription')
        await retweetBtn.click()
        const repost = await ExistingTweetsPage.repostButton()
        await repost.click()
        const newRetweetsCounter = await retweetBtn.getAttribute('contentDescription')
        expect(parseInt(oldRetweetsCounter) + 1 == newRetweetsCounter).toBe(true)
    })

    it('undo repost for a retweetet post', async () => {
        const retweetBtn = await ExistingTweetsPage.retweetButtonInPosts()
        await retweetBtn.click()
        const undoRepost = await ExistingTweetsPage.undoRepostButton()
        expect(await undoRepost.isDisplayed()).toBe(true)
        await undoRepost.click()
    })
})