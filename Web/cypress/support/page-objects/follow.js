class FollowPage{
    get followUnfollowButton(){
        return cy.get('[data-testid="followUnfollow"]')
    }
    get usersToFollow(){
        return cy.get('[data-testid="userToFollow"]')
    }
    get userrsWhoFollowing(){
        return cy.get('[data-testid="userToFollow"]')
    }
    get assertUnfollow(){
        return cy.get('[data-testid="Unfollow"]')
    }
    get showMoreFollowers(){
        return cy.get('[data-testid="showMoreFollowers"]')
    }
    get followingUsers(){
        return cy.get('[data-testid="following"]')
    }
    get followersUsers(){
        return cy.get('[data-testid="followers"]')
    }
    get followingTab(){
        return cy.get('[data-testid="followingTab"]')
    }
    get followingList(){
        return cy.get('[data-testid="followingList"]')
    }
    get followersList(){
        return cy.get('[data-testid="followersList"]')
    }
    get followersTab(){
        return cy.get('[data-testid="followersTab"]')
    }
    get followingCount(){
        return cy.get('[data-testid="followingCount"]')
    }
    get followersCount(){
        return cy.get('[data-testid="followersCount"]')
    }
    get profilePage(){
        return cy.get('[data-testid="Profile"]')
    }
}

export default new FollowPage();