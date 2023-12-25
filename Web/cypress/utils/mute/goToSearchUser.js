import { TimelinePo, MutePo, SearchPagePo } from "../../support/page-objects"

export function goToSearchUser(searchUser) {
    const homeButton = TimelinePo.homeButton
    homeButton.should('be.visible')
    homeButton.click()
    const homeSearch = MutePo.homeSearch
    homeSearch.click({ force: true })
    homeSearch.type(searchUser, { force: true })
    cy.wait(5000)
    const usersResult = SearchPagePo.usersResult
    const usersResultFirst = usersResult.eq(0)
    usersResultFirst.should('be.visible')
    usersResultFirst.click()
}