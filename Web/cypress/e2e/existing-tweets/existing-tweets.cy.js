import data from '../../fixtures/data.json'
import { login } from '../../utils/login'
import ExsitingTweets from '../../support/page-objects/existing-tweets'

describe('Dealing with existing tweets', () => {
    beforeEach('login and open home page', () => {
        cy.clearCookies()
        cy.clearLocalStorage()
        login(data.user.email, data.user.password)
        cy.visit('')
        cy.wait(1000)
    })

    it('delete a post', () => {
        ExsitingTweets.profile.click()
        cy.wait(1000)
        ExsitingTweets.firstTweet.should('be.visible').within(() => {
            ExsitingTweets.more.should('be.visible').click()
        })
        ExsitingTweets.deleteTweet.should('be.visible').click()
        ExsitingTweets.cancelDeleteTweet.should('be.visible')
        ExsitingTweets.assertDeleteTweet.should('be.visible').click()
        cy.contains('Tweet deleted successfully').should('be.visible')
    })

    it.only('add a reply', () => {
        let oldVal
        ExsitingTweets.firstTweet.within(() => {
            ExsitingTweets.addReplyButton.then(($div) => {
                oldVal = $div.find('span').text().trim()
                oldVal = parseInt(oldVal)
            }).click()
        }).then(() => {
            ExsitingTweets.replyAria.scrollIntoView().type(data.reply).then(() => {
                ExsitingTweets.replyButton.should('be.visible').click()
            })
            cy.wait(2000)
            ExsitingTweets.addReplyButton.then(($div) => {
                const text = $div.find('span').text().trim()
                expect((oldVal + 1).toString() === text).to.be.true
            })
        })
        
    })
    
    it('like a tweet then unlike it', () => {
        let oldVal
        ExsitingTweets.firstTweet.within(() => {
            ExsitingTweets.addLikeButton.then(($div) => {
                const val = $div.find('span').text().trim()
                oldVal = parseInt(val)
            }).should('be.visible').click()
        })
        ExsitingTweets.firstTweet.within(() => {
            ExsitingTweets.addLikeButton.then(($div) => {
                const val = $div.find('span').text().trim()
                expect((oldVal + 1 === parseInt(val)) || (oldVal - 1 === parseInt(val))).to.be.true
            }).should('be.visible').click()
        })
        ExsitingTweets.firstTweet.within(() => {
            ExsitingTweets.addLikeButton.then(($div) => {
                const val = $div.find('span').text().trim()
                expect(oldVal === parseInt(val)).to.be.true
            })
        })
    })

    it('retweet a tweet', () => {
        
    })
    
})