class SearchPage{
    get searchBar(){
        return cy.get('[data-testid="searchBar"]')
    }
    get search(){
        return cy.get('input[type="homeSearch"]')
    }
    get searchMessage(){
        return cy.get('[data-testid="searchMessage"]')
    }
    get cancelSearch(){
        return cy.get('[data-testid="rightIcon"]')
    }
    get trendsParent(){
        return cy.get('[data-testid="trends"]')
    }
    get trendsResult(){
        return cy.get('[data-testid="trends"] > [data-testid="trend-item"]')
    }
    get usersParent(){
        return cy.get('[data-testid="users"]')
    }
    get usersResult(){
        return cy.get('[data-testid="users"] > [data-testid="user-item"]')
    }
    get targetUser(){
        return cy.get('[data-testid="targetUser"]')
    }
    get profileUsername(){
        return cy.get('[data-testid="username"]')
    }
}

export default new SearchPage();