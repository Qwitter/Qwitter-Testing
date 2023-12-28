import data from '../../fixtures/data.json'
import { login } from '../../utils/login'
import { deleteFirstTweet } from '../../utils/tweets/existingTweets'
import ExsitingTweets from '../../support/page-objects/existing-tweets'


describe('Dealing with existing tweets', () => {
    beforeEach('login and open home page', () => {
        cy.clearCookies()
        cy.clearLocalStorage()
        login(data.user.email, data.user.password)
        cy.visit('')
        cy.wait(3000)
    })

    it('delete a post', () => {
        ExsitingTweets.profile.click()
        deleteFirstTweet()
    })

    it('delete a media', () => {
        ExsitingTweets.profile.click()
        ExsitingTweets.mediaTab.click()
        deleteFirstTweet()
    })

    it('add a reply and check comments counter', () => {
        ExsitingTweets.profile.click()
        let oldVal
        ExsitingTweets.firstTweet.within(() => {
            ExsitingTweets.addReplyButton.scrollIntoView().then(($div) => {
                oldVal = $div.find('span').text().trim()
                oldVal = parseInt(oldVal)
            }).click()
        }).then(() => {
            ExsitingTweets.replyAria.scrollIntoView().type(data.reply).then(() => {
                ExsitingTweets.replyButton.should('be.visible').click()
            })
            cy.wait(2000)
            ExsitingTweets.addReplyButton.first().then(($div) => {
                const text = $div.find('span').text().trim()
                expect((oldVal + 1).toString() === text).to.be.true
            })
        })
    })

    it('add empty reply', () => {
        ExsitingTweets.profile.click()
        ExsitingTweets.firstTweet.within(() => {
            ExsitingTweets.addReplyButton.scrollIntoView().click()
            ExsitingTweets.replyAria.scrollIntoView().type('   ').then(() => {
                ExsitingTweets.replyButton.should('not.be.enabled')
            })
        })
    })
    
    it('like a tweet then unlike it', () => {
        ExsitingTweets.profile.click()
        let oldVal
        ExsitingTweets.firstTweet.within(() => {
            ExsitingTweets.addLikeButton.scrollIntoView().then(($div) => {
                const val = $div.find('span').text().trim()
                oldVal = parseInt(val)
            }).should('be.visible').click()
        })
        ExsitingTweets.firstTweet.within(() => {
            ExsitingTweets.addLikeButton.scrollIntoView().then(($div) => {
                const val = $div.find('span').text().trim()
                expect((oldVal + 1 === parseInt(val)) || (oldVal - 1 === parseInt(val))).to.be.true
            }).should('be.visible').click()
        })
        ExsitingTweets.firstTweet.within(() => {
            ExsitingTweets.addLikeButton.scrollIntoView().then(($div) => {
                const val = $div.find('span').text().trim()
                expect(oldVal === parseInt(val)).to.be.true
            })
        })
    })

    it('retweet a tweet', () => {
        ExsitingTweets.profile.click()
        ExsitingTweets.repliesTab.click()
        cy.wait(1000)
        ExsitingTweets.firstTweet.within(() => {
            ExsitingTweets.addRetweetButton.scrollIntoView().click()
        }).then(() => {
            cy.contains('Retweeted Successfully').should('be.visible')
        })
    })

    it('undo a retweet', () => {
        ExsitingTweets.profile.click()
        ExsitingTweets.repliesTab.click()
        cy.wait(1000)
        ExsitingTweets.firstTweet.within(() => {
            ExsitingTweets.addRetweetButton.scrollIntoView().click()
        }).then(() => {
            cy.contains('Removed Retweet Successfully').should('be.visible')
        })
    })
    
})