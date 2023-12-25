class TimelinePo {
    get homeButton() { return cy.get("a[href='/Home']").eq(1) }
    get navbar() { return cy.get("div[data-testid='navbar'] > ul") }
    get userdata() { return cy.get("div[data-testid='userdata']") }
    get authorName() { return cy.get("h3[data-testid='authorName']") }
    get followButton() { return cy.get("button[data-testid='followUnfollow']") }
    get followingList() { return cy.get("div[data-testid='userToFollow']") }
}

export default new TimelinePo()