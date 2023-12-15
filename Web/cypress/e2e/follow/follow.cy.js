import data from '../../fixtures/data.json'
import { login } from '../../utils/login'
import FollowPage from '../../support/page-objects/follow'

describe('Follow test suite', () => {
    const follow = 'Follow'
    const unfollow = 'Unfollow'
    const following = 'Following'
    beforeEach('login and open home page', () => {
        cy.clearCookies()
        cy.clearLocalStorage()
        login(data.user.email, data.user.password)
        cy.wait(3000)
    })

    it('follow and unfollow a user', () => {
        FollowPage.followUnfollowButton.first().should('be.visible')
        FollowPage.followUnfollowButton.first().find('span')
        .should('have.text', follow).click()
        FollowPage.followUnfollowButton.first().find('span')
        .should('have.text', following)
        FollowPage.followUnfollowButton.first().trigger('mouseover').find('span')
        .should('have.text', unfollow).click()
        FollowPage.assertUnfollow.should('be.visible').click({force:true})
        FollowPage.followUnfollowButton.first().find('span')
        .should('have.text', follow)
    })

    it('check followers count of a user', () => {
        FollowPage.usersToFollow.first().should('be.visible').click()
        cy.wait(3000)
        let oldFollowCount

        FollowPage.followersCount.invoke('text').then((followCount) => {
            oldFollowCount = parseInt(followCount)
        })
        FollowPage.followUnfollowButton.first().should('be.visible').click().then(() => {
            FollowPage.followersCount.invoke('text').should('eq', (oldFollowCount + 1).toString())
        })
        FollowPage.followUnfollowButton.first().should('be.visible').click()

        FollowPage.assertUnfollow.should('be.visible').click().then(() => {
            FollowPage.followersCount.invoke('text').should('eq', oldFollowCount.toString())
        })
    })
    
    it('check following count of a user', () => {
        let oldFollowingCount
        FollowPage.profilePage.click()
        FollowPage.followingCount.invoke('text').then((followingCount) => {
            oldFollowingCount = parseInt(followingCount)
        })
        FollowPage.followUnfollowButton.first().click().then(() => {
            FollowPage.followingCount.invoke('text').should('eq', (oldFollowingCount + 1).toString())
        })
        FollowPage.followUnfollowButton.first().click()
        FollowPage.assertUnfollow.click().then(() => {
            FollowPage.followingCount.invoke('text').should('eq', oldFollowingCount.toString())
        })
    })

    it('get followers list', () => {
        FollowPage.profilePage.click()
        FollowPage.followersUsers.click()
        FollowPage.followersTab.invoke('attr', 'aria-selected').should('eq', 'true')
        FollowPage.followersList.then(($el) => {
            if($el.find('> [data-testid="userToFollow"]').length > 0){
                FollowPage.followUnfollowButton.each(($btn) => {
                    // here I may be following the user who is following me
                    cy.wrap($btn).should('be.visible')
                })
            }
        })
        
    })

    it('get following list', () => {
        FollowPage.profilePage.click()
        FollowPage.followingUsers.click()
        FollowPage.followingTab.invoke('attr', 'aria-selected').should('eq', 'true')
        FollowPage.followingList.then(($el) => {
            if($el.find('> [data-testid="userToFollow"]') > 0){
                FollowPage.followUnfollowButton.each(($btn) => {
                    cy.wrap($btn).find('span').should('have.text', following)
                })
            }
        })
    })
})