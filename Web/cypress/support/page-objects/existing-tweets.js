class ExistingTweets{
    get tweetsParent(){
        return cy.get('[data-testid="Tweet"]')
    }
    get tweets(){
        return cy.get('[data-testid="tweetDiv"]')
    }
    get firstTweet(){
        return cy.get('[data-testid="tweetDiv"]').first()
    }
    get more(){
        return cy.get('[data-testid="MoreOptions"]')
    }
    get deleteTweet(){
        return cy.get('[data-testid="DeleteTweet"]')
    }
    get assertDeleteTweet(){
        return cy.contains('button', 'Delete')
    }
    get cancelDeleteTweet(){
        return cy.contains('button', 'Cancel')
    }
    get addReplyButton(){
        return cy.get('[data-testid="Comment"]')
    }
    get replyAria(){
        return cy.get('textarea')
    }
    get replyButton(){
        return cy.get('[data-testid="postTweet"]')
    }
    get addRetweetButton(){
        return cy.get('[data-testid="Retweet"]')
    }
    get addLikeButton(){
        return cy.get('[data-testid="Like"]')
    }
    get viewPostEngagments(){
        return cy.get()
    }
    get tweetLikesTab(){
        return cy.get()
    }
    get tweetRetweetsTab(){
        return cy.get()
    }
    get profile(){
        return cy.get('[data-testid="Profile"]')
    }
}

export default new ExistingTweets();