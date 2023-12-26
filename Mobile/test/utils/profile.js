const { browser } = require('@wdio/globals')
const AccountSettingPage = require('../page-objects/account-settings.js')
const ExistingTweetsPage = require('../page-objects/existing-tweets.js')
const ProfilePage = require('../page-objects/profile.js')

module.exports = {
    openProfile: async function (){
        const navbar = await AccountSettingPage.navigationSideBar()
        await navbar.waitForDisplayed()
        await navbar.click()
        const profileBtn = await ProfilePage.profilePage()
        await profileBtn.click()
        await browser.pause(3000)
    },
    writeReply: async function (text){
        const commentBtn = await ExistingTweetsPage.commentButton()
        const isThereATweet = await commentBtn?.isExisting() ?? false
        if (isThereATweet) {
            await commentBtn.click()
            const replyAria = await ExistingTweetsPage.replyTextAriaClick()
            await replyAria.click()

            const replyBtn = await ExistingTweetsPage.replyButton()
            expect(await replyBtn.isEnabled()).toBe(false)
            
            const replyText = await ExistingTweetsPage.replyTextAriaAdd()
            await replyText.setValue(text)
        }
    },
    enterName: async function (newName){
        const name = await ProfilePage.profileName()
        const oldName = await name.getAttribute('contentDescription')
        const edit = await ProfilePage.editProfile()
        await edit.click()
        const nameField = await ProfilePage.profileNameField()
        await nameField.click()
        await nameField.setValue(newName)
        return oldName
    }
}
