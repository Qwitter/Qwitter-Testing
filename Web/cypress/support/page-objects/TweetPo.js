class TweetPo {
    get tweetDiv() { return cy.get("div[data-testid='tweetDiv']") }
    get tweetDivText() { return cy.get("div[data-testid='tweetDiv'] > article > p") }
    get homeButton() { return cy.get("a[href='/Home']") }
    get composeTweet() { return cy.get("a[data-testid='composeTweet']") }
    get createTweetPopup() { return cy.get("div[data-testid='popupHeaderButton']") }
    get tweetInput() { return cy.get("textarea[data-testid='tweetInput']") }
    get charsleft() { return cy.get("text.CircularProgressbar-text") }
    get postTweet() { return cy.get("button[data-testid='postTweet']") }
    get emojiButton() { return cy.get("div[data-testid='Emoji']") }
    get mediaButton() { return cy.get("input[data-testid='uploadImage']") }
    get replyOptions() { return cy.get("span[data-testid='whoCanReply']") }
    get replyOptionsPopup() { return cy.get("div[data-testid='whoCanReplyPopup']") }
    get tweetProfileImg() { return cy.get("img[data-testid='tweetProfileImg']") }
    get likeButton() { return cy.get('[data-testid="likeButton"]') }
}

export default new TweetPo()