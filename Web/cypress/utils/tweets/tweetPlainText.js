import { TweetPo } from "../../support/page-objects"

export function tweetPlainTextPopup(text){
    TweetPo.composeTweet.should('be.visible')
    TweetPo.composeTweet.click()
    TweetPo.createTweetPopup.should('be.visible')
    TweetPo.tweetInput.eq(1).should('be.visible')
    TweetPo.tweetInput.eq(1).type(text)
    TweetPo.postTweet.eq(1).should('be.enabled')
    TweetPo.postTweet.eq(1).click()
    TweetPo.createTweetPopup.click()
}

export function tweetPlainTextTimeline(text){
    TweetPo.tweetInput.eq(0).should('be.visible')
    TweetPo.tweetInput.eq(0).type(text)
    TweetPo.postTweet.eq(0).should('be.enabled')
    TweetPo.postTweet.eq(0).click()
}