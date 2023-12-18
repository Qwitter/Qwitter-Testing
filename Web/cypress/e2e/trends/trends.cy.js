import data from '../../fixtures/data.json'
import { login } from '../../utils/login'
import TrendsPage from '../../support/page-objects/trends'

describe('Dealing with existing tweets', () => {
    const exploreRoute = '/Explore'

    beforeEach('login and open home page', () => {
        cy.clearCookies()
        cy.clearLocalStorage()
        login(data.user.email, data.user.password)
        cy.wait(1000)
    })

    it('navigate to explore', () => {
        TrendsPage.explore.should('be.visible').click()
        TrendsPage.trendList.each(($trend) => {
            cy.wrap($trend).scrollIntoView().should('be.visible')
        })
        TrendsPage.trendList.first().scrollIntoView().click()
        // TODO: loop over the tweets, they should have the trend keyword
    })

    it('show more trends navigates to explore', () => {
        TrendsPage.showMoreTrends.should('be.visible').click()
        cy.url().should('include', exploreRoute)
    })

    it('trends sidebar', () => {
        TrendsPage.trendList.first().should('be.visible').click()
        // TODO: loop over the tweets, they should have the trend keyword
    })
    
})
