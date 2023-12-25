import FollowPage from '../support/page-objects/follow';
import BlockPage from '../support/page-objects/block';

module.exports.openBlockedUserProfile = () => {
        BlockPage.settingsPage.click()
        BlockPage.privacyAndSafety.should('be.visible').click()
        BlockPage.blockedAccounts.should('be.visible').click()
        FollowPage.usersToFollow.first().should('be.visible').click()
}
