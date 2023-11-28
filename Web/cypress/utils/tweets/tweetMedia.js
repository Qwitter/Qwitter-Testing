import { TweetPo } from "../../support/page-objects";

export function tweetMediaPopup(img) {
    TweetPo.composeTweet.click()
    TweetPo.mediaButton.eq(1).attachFile(img)
    // TweetPo.postTweet.eq(1).should('be.disabled')
    // TweetPo.tweetInput.eq(1).type('Hello World!')
    TweetPo.postTweet.eq(1).should('be.enabled')
    TweetPo.postTweet.eq(1).click()
    TweetPo.tweetDiv.eq(0).should('be.visible')
    TweetPo.tweetDiv.eq(0).find('> article > div > div > div > img').should('be.visible')
}

export function tweetMediaTimeline(img) {
    TweetPo.mediaButton.eq(0).attachFile(img)
    // TweetPo.postTweet.eq(0).should('be.disabled')
    // TweetPo.tweetInput.eq(0).type('Hello World!')
    TweetPo.postTweet.eq(0).should('be.enabled')
    TweetPo.postTweet.eq(0).click()
    TweetPo.tweetDiv.eq(0).should('be.visible')
    TweetPo.tweetDiv.eq(0).find('> article > div > div > div > img').should('be.visible')
}