import { TimelinePo } from "../../support/page-objects";

export function testTimelineTweets(followingList) {
    const authorNames = TimelinePo.authorName;
    authorNames.each(($el, index, $list) => {
        let name = cy.wrap($el).find("a > a")
        name.should('be.visible')
        name.invoke('text').then((text) => {
            console.log(text)
            if (!followingList.includes(text)) {
                assert.fail(`Tweet ${index} is not from a followed user`)
            }
        })
    })
}