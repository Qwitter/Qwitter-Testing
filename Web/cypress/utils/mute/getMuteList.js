import { AccountSettingsPagePo, MutePo, FollowPagePo } from "../../support/page-objects";

export function getMuteList(number) {
    const settingsButton = AccountSettingsPagePo.settingsButton
    settingsButton.should('be.visible')
    settingsButton.click()
    const privacyAndSafety = MutePo.privacyAndSafety
    privacyAndSafety.should('be.visible')
    privacyAndSafety.click()
    const mutedAccounts = MutePo.mutedAccounts
    mutedAccounts.should('be.visible')
    mutedAccounts.click()
    cy.reload()
    const users = FollowPagePo.usersToFollow
    users.should('have.length', number)
}