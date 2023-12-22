import SearchPage from '../../support/page-objects/search'
import { login } from '../../utils/login'
import { createEmail, verifyEmail, goToStep } from '../../utils/signup/signup'
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

    it('search for first first user', () => {
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
    //need revisting
    it('open a target user', () => {
        SearchPage.search.should('be.empty').type(data.search.targetUser)
        SearchPage.targetUser.should('have.length', 1)
        SearchPage.targetUser.scrollIntoView().find('a').invoke('text').then((text) => {
            expect(text.toLowerCase().includes(data.search.targetUser.toLowerCase())).to.be.true
        })
        // should click the user and find it exists or not 
    })

})