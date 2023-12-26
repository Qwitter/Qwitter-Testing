import data from '../../fixtures/data.json'
import { login } from '../../utils/login'
import TrendsPage from '../../support/page-objects/trends'
import ExistingTweets from '../../support/page-objects/existing-tweets'

describe('Trends test suite', () => {
    const exploreRoute = '/Explore'

    beforeEach('login and open home page', () => {
        cy.clearCookies()
        cy.clearLocalStorage()
        login(data.user.email, data.user.password)
        cy.wait(1000)
    })

    it('Trend list should be visible', () => {
        TrendsPage.explore.should('be.visible').click()
        TrendsPage.trendList.each(($trend) => {
            cy.wrap($trend).scrollIntoView().should('be.visible')
        })
        
    })

    it('trends posts must include trend keyword', () => {
        TrendsPage.explore.should('be.visible').click()
        TrendsPage.trendName.first().scrollIntoView().invoke('text').then((trend) => {
            TrendsPage.trendList.first().click().then(() => {
                ExistingTweets.tweets.each(($div) => {
                    cy.wrap($div).find('article').find('p').invoke('text').then((text) => {
                        expect(text.toLowerCase()).contain(trend.substring(1).toLowerCase())
                    })
                })
            })
        })
    })

    it('show more trends navigates to explore', () => {
        TrendsPage.showMoreTrends.should('be.visible').click()
        cy.url().should('include', exploreRoute)
    })

    it('trends sidebar', () => {
        TrendsPage.trendList.first().should('be.visible').click()
        cy.url().should('include', exploreRoute)
    })
    
})
