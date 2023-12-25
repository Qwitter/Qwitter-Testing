import { login, tweetPlainTextPopup } from "../../utils"
import { NotificationsPo, TweetPo } from "../../support/page-objects"

describe('notifications test suite', () => {
    before('load fixture', () => {
        cy.fixture("data").then((data) => {
            globalThis.data = data
        })
    })

    beforeEach('login', () => {
        login(data.loginPage.validEmail, data.loginPage.validPassword)
        const notificationsButton = NotificationsPo.notificationsButton
        notificationsButton.should('be.visible')
        notificationsButton.click()
    })

    it('receives mention', () => {
        login(data.notifications.engemail, data.notifications.engpassword)
        tweetPlainTextPopup(data.notifications.tweet)
        login(data.loginPage.validEmail, data.loginPage.validPassword)
        const notificationsButton = NotificationsPo.notificationsButton
        notificationsButton.should('be.visible')
        notificationsButton.click()
        const mentions = NotificationsPo.mentions
        mentions.should('be.visible')
        mentions.click()
        const tweet = TweetPo.tweetDiv.eq(0)
        const tweetText = tweet.find(">a>article>p>p").eq(0)
        tweetText.should('contain.text', "hi")
    })

    it('receives like', () => {
        login(data.notifications.engemail, data.notifications.engpassword)
        cy.visit(data.notifications.tweetUrl)
        const likeButton = TweetPo.likeButton.eq(0)
        likeButton.should('be.visible')
        likeButton.click()
        cy.wait(3000)
        login(data.loginPage.validEmail, data.loginPage.validPassword)
        const notificationsButton = NotificationsPo.notificationsButton
        notificationsButton.should('be.visible')
        notificationsButton.click()
        cy.wait(3000)
        const likeNotif = NotificationsPo.likeNotif.eq(1)
        likeNotif.should('be.visible')
        likeNotif.click()
        const url = cy.url()
        url.should('include', data.notifications.tweetUrl)
        login(data.notifications.engemail, data.notifications.engpassword)
        cy.visit(data.notifications.tweetUrl)
        let newLikeButton = TweetPo.likeButton.eq(0)
        newLikeButton.should('be.visible')
        newLikeButton.click()
        cy.wait(3000)
    })
})