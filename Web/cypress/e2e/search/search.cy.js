import SearchPage from '../../support/page-objects/search'
import ExistingTweets from '../../support/page-objects/existing-tweets'
import { login } from '../../utils/login'
const data = require('../../fixtures/data')

describe('Search test suite', () => {

    beforeEach('login', () => {
        cy.clearCookies()
        cy.clearLocalStorage()
        login(data.user.email, data.user.password)   
        SearchPage.searchBar.should('be.visible').click()
        SearchPage.searchMessage.should('be.visible')
    })

    it('clear search keyword using canel button', () => {
        SearchPage.search.type(data.search.keyword)
        cy.wait(1000)
        SearchPage.targetUser.scrollIntoView().should('be.visible')
        SearchPage.cancelSearch.should('be.visible').click()
        SearchPage.search.should('be.empty')
        SearchPage.searchMessage.should('be.visible')
    })

    it('users result contains searched keyword', () => {
        SearchPage.search.should('be.empty').type(data.search.keyword)
        SearchPage.usersParent.then(($el) => {
            if($el.find('> li').length > 1){
                SearchPage.usersResult.each( ($el) => {
                    let isContained = false
                    cy.wrap($el).find('div').then(($div) => {
                        cy.wrap($div).find('h3').invoke('text').then((text) => {
                            isContained = isContained || text.toLowerCase().includes(data.search.keyword.toLowerCase())
                        })
                        cy.wrap($div).find('span').invoke('text').then((text) => {
                                isContained = isContained || text.toLowerCase().includes(data.search.keyword.toLowerCase())
                        })
                        cy.wrap($div).then(() => {
                            expect(isContained).to.be.true;
                        })
                    })
                })
            }
        })
    })

    it('search for first user', () => {
        SearchPage.search.type(data.search.keyword)
        SearchPage.usersParent.then(($el) => {
            if($el.find('> li').length > 1){
                let username
                SearchPage.usersResult.first().find('div > span').invoke('text').then((text) => {
                    username = text.substring(1, text.length).toLowerCase()
                }).then(() => {
                    SearchPage.usersResult.first().click()
                }).then(() => {
                    cy.url().should('include', username)
                })
                
            }
        })
    })

    it('trends result contains searched keyword', () => {
        SearchPage.search.should('be.empty').type(data.search.keyword)
        SearchPage.trendsParent.then(($el) => {
            if($el.find('> li').length > 0){
                SearchPage.trendsResult.each( ($el) => {
                    let isContained = false
                    cy.wrap($el).find('p').invoke('text').then((text) => {
                        isContained = text.toLowerCase().includes(data.search.keyword.toLowerCase())
                    }).then(() => {
                        expect(isContained).to.be.true
                    })
                })
            }
        })
    })
    
    it('search for first trend', () => {
        SearchPage.search.should('be.empty').type(data.search.keyword)
        SearchPage.trendsParent.then(($el) => {
            if($el.find('> li').length > 1){
                let trend
                SearchPage.trendsResult.first().find('p').invoke('text').then((text) => {
                    trend = text.substring(1, text.length).toLowerCase()
                }).then(() => {
                    SearchPage.trendsResult.first().click()
                }).then(() => {
                    cy.url().should('include', trend)
                })
                
            }
        })
    })

    it('open a target user', () => {
        SearchPage.search.should('be.empty').type(data.search.targetUser)
        cy.wait(1000)
        SearchPage.targetUser.should('have.length', 1)
        SearchPage.targetUser.scrollIntoView().invoke('text').then((text) => {
            expect(text.toLowerCase().includes(data.search.targetUser.toLowerCase())).to.be.true
        }).then(() => {
            cy.wait(1000)
            SearchPage.targetUser.scrollIntoView().should('be.visible').click({force:true}).then(() => {
                SearchPage.profileUsername.invoke('text').should('eq', `@${data.search.targetUser}`)
            })
            
        })
    })

    it('search for not existing user', () => {
        SearchPage.search.should('be.empty').type(data.search.notExistingUser)
        cy.wait(1000)
        SearchPage.targetUser.click({force: true})
        cy.wait(1000)
        cy.contains('This account doesn’t exist').should('be.visible')
    })

    it('search for tweets', () => {
        const tweetSearch = 'test'
        SearchPage.search.should('be.empty').type(tweetSearch).type('{enter}')
        cy.wait(2000)
        ExistingTweets.tweets.each(($div) => {
            cy.wrap($div).find('article').find('p').invoke('text').then((text) => {
                expect(text.toLowerCase()).contain(tweetSearch.substring(1).toLowerCase())
            })
        })
    })
})