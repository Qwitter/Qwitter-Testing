
import data from '../../fixtures/data.json'
import { login } from '../../utils/login'
import { openBlockedUserProfile } from '../../utils/block'
import BlockPage from '../../support/page-objects/block'
import FollowPage from '../../support/page-objects/follow'

describe('Follow test suite', () => {
    
    beforeEach('login and open home page', () => {
        cy.clearCookies()
        cy.clearLocalStorage()
        login(data.user.email, data.user.password)
        cy.wait(3000)
    })

    it('block user from profile', () => {
        FollowPage.usersToFollow.first().click()
        cy.wait(1000)
        BlockPage.moreOptions.should('be.visible').click()
        BlockPage.block.should('be.visible').click()
        BlockPage.assertBlock.should('be.visible').click()
        cy.wait(1000)
        BlockPage.blockMessage.should('be.visible')
    })

    it('cancel blocking a user', () => {
        FollowPage.usersToFollow.first().click()
        cy.wait(1000)
        BlockPage.moreOptions.should('be.visible').click()
        BlockPage.block.should('be.visible').click()
        BlockPage.cancelBlock.should('be.visible').click()
        BlockPage.blockMessage.should('not.exist')
    })
    // I blocked someone and I found that my profile was block :v  
    it('block user then go to your profile', () => {
        FollowPage.usersToFollow.first().click()
        cy.wait(1000)
        BlockPage.moreOptions.should('be.visible').click()
        BlockPage.block.should('be.visible').click()
        BlockPage.assertBlock.should('be.visible').click()
        FollowPage.profilePage.click()
        BlockPage.blockMessage.should('not.exist')
    })

    it('blocked user profile has unblock button', () => {
        openBlockedUserProfile()
        BlockPage.unblockButton.first().should('be.visible')
    })
    

    it('blocked user profile has view posts', () => {
        openBlockedUserProfile()
        BlockPage.unblockButton.first().should('be.visible')
    })

    it('blocked user should be in blocked list', () => {
        BlockPage.settingsPage.click()
        BlockPage.privacyAndSafety.should('be.visible').click()
        BlockPage.blockedAccounts.should('be.visible').click()
        FollowPage.usersToFollow.each(($el) => {
            cy.wrap($el).within(() => {
                BlockPage.unblockButton.should('be.visible')
            })
        })
    })

    it('unblock users from block list', () => {
        BlockPage.settingsPage.click()
        BlockPage.privacyAndSafety.should('be.visible').click()
        BlockPage.blockedAccounts.should('be.visible').click()
        BlockPage.unblockButton.each(($el) => {
            cy.wrap($el).click()
        })
        FollowPage.usersToFollow.first().click()
        BlockPage.blockMessage.should('not.exist')
    })
})