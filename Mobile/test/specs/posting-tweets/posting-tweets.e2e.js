const { browser } = require('@wdio/globals')
const commands = require('../../../commands.js')
const loginData = require('../../fixtures/login-data.json')
const loginUtils = require('../../utils/login.js')
const TimelinePagePo = require('../../page-objects/TimelinePagePo.js')
const postingTweetsPo = require('../../page-objects/postingTweetsPo.js')
const postingTweetUtils = require('../../utils/posting-tweets.js')

describe('Posting Tweets Suite', () => {
    afterEach('restart and return to home', async () => {
        await commands.restartApp()
        const home = await TimelinePagePo.home()
        await home.click()
        await browser.pause(5000)
    })

    before('login', async () => {
        await loginUtils.login(loginData.validEmail, loginData.validPassword)
        await browser.pause(5000)
    })

    it('obeys the 280 character limit', async () => {
        let tweet = 'a'.repeat(281)
        await postingTweetUtils.writeTweet(tweet)
        const newEditText = await postingTweetsPo.editText()
        expect(await newEditText.getText()).toBe('a'.repeat(280))
    })

    it('does not post empty tweet', async () => {
        let tweet = ' '
        await postingTweetUtils.writeTweet(tweet)
        const post = await postingTweetsPo.post()
        expect(await post.isEnabled()).toBe(false)
    })

    it('posts a tweet', async () => {
        let tweet = 'tweet'
        await postingTweetUtils.writeTweet(tweet)
        const post = await postingTweetsPo.post()
        expect(await post.isEnabled()).toBe(true)
        await post.click()
        await browser.touchAction(
            {
                action: 'press',
                x: 100,
                y: 100
            },
            {
                action: 'moveTo',
                x: 100,
                y: 1000
            },
            {
                action: 'release'
            }
        )
        await browser.pause(5000)
        const topTweet = await TimelinePagePo.topTweet()
        const topTweetText = await topTweet.getAttribute('content-desc')
        expect(topTweetText).toHaveText(tweet)
    })

    it('posts a tweet with image using camera', async () => {
        postingTweetUtils.writeTweet('APPIUM WAS HERE')
        postingTweetUtils.postTweetWithCamera()
        const topTweet = await TimelinePagePo.topTweet()
        const topTweetText = await topTweet.getAttribute('content-desc')
        expect(topTweetText).toHaveText('APPIUM WAS HERE')
    })
})