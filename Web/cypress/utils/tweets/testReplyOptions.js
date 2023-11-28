import { TweetPo } from "../../support/page-objects"

export function testReplyOptions() {
    TweetPo.replyOptions.should('be.visible')
    TweetPo.replyOptions.should('contain.text', 'Everyone can reply')
    TweetPo.replyOptions.click({ force: true })
    TweetPo.replyOptionsPopup.should('be.visible')
    TweetPo.replyOptionsPopup.find("> div > span").should('contain.text', 'who can reply')
    TweetPo.replyOptionsPopup.find("> ul").should('be.visible')
    TweetPo.replyOptionsPopup.find("> ul > li").should('have.length', 4)
    const options = ["Everyone", "Accounts you follow", "Verified accounts", "Only accounts you mention"]
    for (let i = 0; i < options.length; i++) {
        const item = TweetPo.replyOptionsPopup.find("> ul > li").eq(i)
        item.should('contain.text', options[i])
        item.click()
        TweetPo.replyOptions.should('contain.text', options[i])
        if(i < options.length - 1) {
            TweetPo.replyOptions.click()
        }
    }
}