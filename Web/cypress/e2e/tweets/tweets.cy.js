import { login } from '../../utils'
import { TweetPo } from '../../support/page-objects'
import { 
    testCharLimitPopup, 
    testCharLimitTimeline, 
    tweetPlainTextPopup, 
    tweetPlainTextTimeline 
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

    it('can post emojis', () => {

    })

    it('can post media', () => {

    })

    it('can change who can reply to the post', () => {

    })

    it('can click profile picture and go to profile', () => {

    })

    it('updates timeline with new tweet', () => {

    })
})