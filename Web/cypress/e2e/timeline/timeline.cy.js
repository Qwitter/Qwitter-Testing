import { login } from "../../utils"
import { TimelinePo, TweetPo } from "../../support/page-objects"
import { 
    getFollowingList, 
    testTimelineTweets, 
    testProfileTweets 
} from "../../utils"

describe('Timeline', () => {
    before('load fixture', () => {
        cy.fixture("data").then((data) => {
            globalThis.data = data
        })
    })

    beforeEach('login', () => {
        login(data.loginPage.validEmail, data.loginPage.validPassword)
        const homeButton = TimelinePo.homeButton
        homeButton.should('be.visible')
        homeButton.click()
    })

    it('checks sidebar', () => {
        const navbar = TimelinePo.navbar;
        const navbarLinks = navbar.find("a")
        navbarLinks.should('be.visible')
        navbarLinks.should('have.length', 9)
        navbarLinks.each(($el, index, $list) => {
            const href = $el.attr('href');
            if (href === '/Settings') {
                cy.wrap($el).click().then(() => {
                    cy.url().should('include', '/settings');
                });
            } else {
                cy.wrap($el).click().then(() => {
                    cy.url().should('include', href);
                });
            }
        });
    })

    it('checks correct user data', () => {
        const userdata = TimelinePo.userdata;
        userdata.contains(data.loginPage.name).should('be.visible')
    })

    it('checks that tweets in timeline are from followed users', () => {
        const followingList = getFollowingList(data.loginPage.username)
        cy.wait(3000)
        testTimelineTweets(followingList)
    })

    it('should navigate to profile page and receive list of my tweets', () => {
        testProfileTweets(data.loginPage.username, data.loginPage.name)
    })
})