const { browser } = require('@wdio/globals')
const commands = require('../../../commands.js')
const data  = require('../../fixtures/login-data.json')
const ProfilePage = require('../../page-objects/profile.js')
const loginUtils = require('../../utils/login.js')
const profileUtils = require('../../utils/profile.js')

describe('Profile test suite', ()=>{
    const newName = "Marwan"
    const newBio = "PR"
    before( async () => {
        await loginUtils.login(data.user.email, data.user.password)
    })

    afterEach(async () => {
        await commands.restartApp()
        await browser.pause(3500);
    })

    beforeEach( async ()=>{
        await profileUtils.openProfile()
    })

    it('back to timeline', async() => {
        const back = await ProfilePage.backHome()
        await back.click()
        const forYouTab = await ProfilePage.forYouTab()
        expect(await forYouTab.isDisplayed()).toBe(true)
    })

    it('posts tab should be visible', async () => {
        const posts = await ProfilePage.postsTab()
        expect(await posts.isSelected()).toBe(true)
    })

    it('replies tab should be visible', async () => {
        const replies = await ProfilePage.repliesTab()
        await replies.click()
        await browser.pause(1000)
        expect(await replies.isSelected()).toBe(true)
    })

    it('mdiea tab should be visible', async () => {
        const media = await ProfilePage.mediaTab()
        await media.click()
        await browser.pause(1000)
        expect(await media.isSelected()).toBe(true)
    })

    it('likes tab should be visible', async () => {
        const likes = await ProfilePage.likesTab()
        await likes.click()
        await browser.pause(1000)
        expect(await likes.isSelected()).toBe(true)
    })

    it('edit profile displayed', async () => {
        const edit = await ProfilePage.editProfile()
        expect(await edit.isDisplayed()).toBe(true)
    })

    it('change name then return it back', async () => {
        const oldName = await profileUtils.enterName(newName)
        console.log('Old name ======>')
        console.log(oldName)
        console.log('Old name ======>')
        const save = await ProfilePage.saveEdit()
        await save.click()
        await browser.pause(3000)
        const name = await ProfilePage.profileName()
        const editedName = await name.getAttribute('contentDescription')
        console.log('edited name ======>')
        console.log(editedName)
        console.log('edited name ======>')
        expect(editedName === newName).toBe(true)
        // return it back
        await profileUtils.enterName(oldName)
        await save.click()
        await browser.pause(2000)
    })

    it('change bio then return it back', async () => {
        const bio = await ProfilePage.profileBio()
        const oldBio = await bio.getAttribute('contentDescription')
        const edit = await ProfilePage.editProfile()
        await edit.click()
        const bioField = await ProfilePage.bioField()
        await bioField.click()
        await bioField.setValue(newBio)
        const save = await ProfilePage.saveEdit()
        await save.click()
        await browser.pause(3000)
        const editedBio = await bio.getAttribute('contentDescription')
        expect(editedBio === newBio).toBe(true)
        // return it back
        await edit.click()
        await bioField.click()
        await bioField.setValue(oldBio)
        await save.click()
        await browser.pause(2000)
    })  
    // skip untill Cross solve this issue
    it.skip('discard changes', async () => {
        const oldName = await profileUtils.enterName(newName)
        const closeEdit = await ProfilePage.closeEdit()
        await closeEdit.click()

        const discard = await ProfilePage.discardEdit()
        await discard.click()
        await browser.pause(2000)
        const name = await ProfilePage.profileName()
        const nonEditedName = await name.getAttribute('contentDescription')
        expect(oldName === nonEditedName).toBe(true)
    })

    it('cancel discard changes', async () => {
        await profileUtils.enterName(newName)
        const closeEdit = await ProfilePage.closeEdit()
        await closeEdit.click()

        const cancel = await ProfilePage.cancelDiscardEdit()
        await cancel.click()
        await browser.pause(500)
        const nameField = await ProfilePage.profileNameField()
        const currentName = await nameField.getText()
        expect(newName === currentName).toBe(true)
    })
})