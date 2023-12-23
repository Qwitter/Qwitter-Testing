import { TimelinePo } from "../../support/page-objects"

export function getFollowingList(username) {
    const followingList = []
    cy.visit(`/Profile/${username}/following`)
    const following = TimelinePo.followingList
    following.each(($el, index, $list) => {
        let name = cy.wrap($el).find("> div > div > div > div > div > span")
        name.should('be.visible')
        name.invoke('text').then((text) => {
            followingList.push(text)
        })
    })
    followingList.push(data.loginPage.name)
    cy.go('back')
    return followingList
}