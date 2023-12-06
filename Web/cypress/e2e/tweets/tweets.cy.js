import 'cypress-file-upload'

import { login } from '../../utils'
import { TweetPo } from '../../support/page-objects'
import { 
    testCharLimitPopup, 
    testCharLimitTimeline, 
    tweetPlainTextPopup, 
    tweetPlainTextTimeline,
    tweetMediaPopup,
    tweetMediaTimeline,
    testReplyOptions
} from '../../utils'

describe('Tweets', () => {
    before('load fixtures', () => {
        cy.fixture('data').then((data) => {
            globalThis.data = data
        })
    })

    beforeEach('login', () => {
        login(data.loginPage.validEmail, data.loginPage.validPassword)
        const homeButton = TweetPo.homeButton
        homeButton.should('be.visible')
        homeButton.click()
    })

    it('shows tweet div in home page', () => {
        TweetPo.tweetDiv.should('have.length.of.at.least', 1)
    })

    it('disables post button in main tweet composer', () => {
        TweetPo.tweetInput.eq(0).should('be.visible')
        TweetPo.postTweet.eq(0).should('be.disabled')
    })

    it('enables post button', () => {
        TweetPo.composeTweet.should('be.visible')
        TweetPo.composeTweet.click()
        TweetPo.createTweetPopup.should('be.visible')
    })

    it('obeys character limit', () => {
        testCharLimitPopup()
        TweetPo.createTweetPopup.click()
        testCharLimitTimeline()
    })

    it('can post plain text', () => {
        const text = 'Hello World!'
        tweetPlainTextPopup(text)
        TweetPo.tweetDivText.eq(0).should('contain.text', text)
        tweetPlainTextTimeline(text)
        TweetPo.tweetDivText.eq(0).should('contain.text', text)
    })

    // needs revisiting
    it('can post emojis', () => {
        cy.scrollTo('top')
        TweetPo.emojiButton.eq(0).should('exist')
        TweetPo.composeTweet.click()
        TweetPo.emojiButton.eq(1).should('exist')
    })

    it('can post media', () => {
        const img = 'quexit.png'
        tweetMediaPopup(img)
        cy.scrollTo('top')
        tweetMediaTimeline(img)
        cy.scrollTo('top')
    })

    it('can change who can reply to the post', () => {
        TweetPo.composeTweet.click()
        testReplyOptions()
        TweetPo.createTweetPopup.click()
        TweetPo.replyOptions.should('not.exist')
        TweetPo.tweetInput.eq(0).type('Hello World!')
        testReplyOptions()
    })

    it.skip('can click profile picture and go to profile', () => {
        TweetPo.tweetProfileImg.eq(0).should('be.visible')
        TweetPo.tweetProfileImg.eq(0).click()
        TweetPo.composeTweet.click()
        TweetPo.tweetProfileImg.should('have.length', 2)
        TweetPo.tweetProfileImg.eq(1).should('be.visible')
        TweetPo.tweetProfileImg.eq(1).click()
        TweetPo.createTweetPopup.click()
        TweetPo.tweetProfileImg.should('have.length', 1)
    })
})