import { TimelinePo } from "../../support/page-objects";

export function testProfileTweets(username, myname) {
    cy.visit(`/Profile/${username}`)
    const authorNames = TimelinePo.authorName;
    authorNames.each(($el, index, $list) => {
        let name = cy.wrap($el).find("a > a")
        name.should('be.visible')
        name.invoke('text').then((text) => {
            if (text !== myname) {
                assert.fail(`Tweet ${index} is not from me`)
            }
        })
    })
}