import { login, getMuteList, goToSearchUser } from "../../utils"
import {
    MutePo,
    ExistingTweetsPo,
    AccountSettingsPagePo
} from "../../support/page-objects"

describe('mute test suite', () => {
    before('load fixture', () => {
        cy.fixture("data").then((data) => {
            globalThis.data = data
        })
    })

    beforeEach('login', () => {
        login(data.loginPage.validEmail, data.loginPage.validPassword)
        goToSearchUser(data.mute.searchUser)
    })

    it('mutes from profile page', () => {
        getMuteList(1)
        goToSearchUser(data.mute.searchUser)
        const more = ExistingTweetsPo.more
        more.should('be.visible')
        more.click()
        const muteUnmute = MutePo.muteUnmute
        muteUnmute.should('be.visible')
        muteUnmute.click()
        getMuteList(2)
    })

    it('unmutes from profile page', () => {
        getMuteList(2)
        goToSearchUser(data.mute.searchUser)
        const more = ExistingTweetsPo.more
        more.should('be.visible')
        more.click()
        const muteUnmute = MutePo.muteUnmute
        muteUnmute.should('be.visible')
        muteUnmute.click()
        getMuteList(1)
    })

    it('unmutes from mute list', () => {
        const settingsButton = AccountSettingsPagePo.settingsButton
        settingsButton.should('be.visible')
        settingsButton.click()
        const privacyAndSafety = MutePo.privacyAndSafety
        privacyAndSafety.should('be.visible')
        privacyAndSafety.click()
        const mutedAccounts = MutePo.mutedAccounts
        mutedAccounts.should('be.visible')
        mutedAccounts.click()
        const unmuteButton = MutePo.unmuteButton.eq(0)
        unmuteButton.should('be.visible')
        unmuteButton.click()
        const muteButton = MutePo.muteButton.eq(0)
        muteButton.should('be.visible')
    })
})