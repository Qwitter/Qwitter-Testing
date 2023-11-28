import { TweetPo } from "../../support/page-objects"

export function testCharLimitPopup() {
    TweetPo.composeTweet.should('be.visible')
    TweetPo.composeTweet.click()
    TweetPo.createTweetPopup.should('be.visible')
    TweetPo.tweetInput.eq(1).should('be.visible')
    TweetPo.tweetInput.eq(1).type('a'.repeat(280))
    TweetPo.charsleft.should('have.text', 0)
    TweetPo.postTweet.eq(1).should('be.enabled')
    TweetPo.tweetInput.eq(1).type('a')
    TweetPo.charsleft.should('have.text', -1)
    TweetPo.postTweet.eq(1).should('be.disabled')
}

export function testCharLimitTimeline() {
    TweetPo.tweetInput.eq(0).should('be.visible')
    TweetPo.tweetInput.eq(0).type('a'.repeat(280))
    TweetPo.charsleft.should('have.text', 0)
    TweetPo.postTweet.eq(0).should('be.enabled')
    TweetPo.tweetInput.eq(0).type('a')
    TweetPo.charsleft.should('have.text', -1)
    TweetPo.postTweet.eq(0).should('be.disabled')
}