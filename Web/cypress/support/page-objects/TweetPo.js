class TweetPo {
    get tweetDiv() { return cy.get("div[data-testid='tweetDiv']") }
    get tweetDivText() { return cy.get("div[data-testid='tweetDiv'] > article > p") }
    get homeButton() { return cy.get("a[href='/Home']") }
    get composeTweet() { return cy.get("a[data-testid='composeTweet']") }
    get createTweetPopup() { return cy.get("div[data-testid='popupHeaderButton']") }
    get tweetInput() { return cy.get("textarea[data-testid='tweetInput']") }
    get charsleft() { return cy.get("text.CircularProgressbar-text") }
    get postTweet() { return cy.get("button[data-testid='postTweet']") }
}

export default new TweetPo()