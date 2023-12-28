class TrendsPage{
    get explore(){
        return cy.get('[data-testid="Explore"]')
    }
    get trendList(){
        return cy.get('[data-testid="trend"]')
    }
    get trendName(){
        return cy.get('[data-testid="trendName"]')
    }
    get trendPostsCount(){
        return cy.get('[data-testid="postsCount"]')
    }
    get showMoreTrends(){
        return cy.get('[data-testid="showMoreTrends"]')
    }
}

export default new TrendsPage();