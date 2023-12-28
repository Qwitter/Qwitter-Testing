const NotificationsPo = require('../page-objects/NotificationsPo.js')
const searchPo = require('../page-objects/search.js')

module.exports = {
    likeUnlikeFirstTweet: async function () {
        const likeButton = await NotificationsPo.likeButton()
        await likeButton.click()
        await browser.pause(2000)
        const unlikeButton = await NotificationsPo.unlikeButton()
        await unlikeButton.click()
        await browser.pause(2000)
        const back1 = await NotificationsPo.backProfile()
        await back1.click()
        const back2 = await NotificationsPo.backSearch()
        await back2.click()
    },
    retweetUnretweetFirstTweet: async function () {
        const retweetButton = await NotificationsPo.retweetButton()
        await retweetButton.click()
        const repost = await NotificationsPo.repost()
        await repost.click()
        await browser.pause(1000)
        const unretweetButton = await NotificationsPo.unretweetButton()
        await unretweetButton.click()
        const undoRepost = await NotificationsPo.undoRepost()
        await undoRepost.click()
        await browser.pause(1000)
        const back1 = await NotificationsPo.backProfile()
        await back1.click()
        const firstUser = await searchPo.firstUser()
        await firstUser.click()
        await browser.pause(3000)
        const backProfile = await NotificationsPo.backProfile()
        await backProfile.click()
        const back2 = await NotificationsPo.backSearch()
        await back2.click()
    }
}