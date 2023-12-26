const postingTweetsPo = require('../page-objects/PostingTweetsPo')

module.exports = {
    writeTweet: async function (tweet){
        const plusButton = await postingTweetsPo.plusButton()
        await plusButton.click()
        const postButton = await postingTweetsPo.postButton()
        await postButton.click()
        const editText = await postingTweetsPo.editText()
        await editText.click()
        await editText.sendKeys([tweet])
    },
    postTweetWithCamera: async function () {
        const camera = await postingTweetsPo.camera()
        await camera.click()
        const shutter = await postingTweetsPo.shutter()
        await shutter.click()
        const done = await postingTweetsPo.done()
        await done.click()
        const post = await postingTweetsPo.post()
        await post.click()
        await browser.pause(5000)
    }
}