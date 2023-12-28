import ExsitingTweets from "../../support/page-objects/existing-tweets"

module.exports.deleteFirstTweet = (stepNumber) => {
    cy.wait(1000)
    ExsitingTweets.firstTweet.should('be.visible').within(() => {
        ExsitingTweets.more.should('be.visible').click()
    })
    ExsitingTweets.deleteTweet.should('be.visible').click()
    ExsitingTweets.cancelDeleteTweet.should('be.visible')
    ExsitingTweets.assertDeleteTweet.should('be.visible').click()
    cy.contains('Tweet deleted successfully').should('be.visible')
}