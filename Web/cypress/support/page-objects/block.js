class BlockPage{
    get settingsPage(){
        return cy.get('[data-testid="Settings"]')
    }
    get moreOptions(){
        return cy.get('[data-testid="MoreOptions"]').first()
    }
    get block(){
        return cy.get('[data-testid="block"]')
    }
    get assertBlock(){
        return cy.get('[data-testid="Unfollow"]')
    }
    get cancelBlock(){
        return cy.contains('button', 'cancel')
    }
    get blockButton(){
        return cy.get('[data-testid="blockButton"]')
    }
    get unblockButton(){
        return cy.get('[data-testid="unblockButton"]')
    }
    get blockMessage(){
        return cy.contains('h1', 'is blocked')
    }
    get privacyAndSafety(){
        return cy.get('[data-testid="Privacy and safety"]')
    }
    get blockedAccounts(){
        return cy.get('[data-testid="/Blocked"]')
    }
    get viewPostsButton(){
        return cy.get('[data-testid="viewPosts"]')
    }
}   

export default new BlockPage();