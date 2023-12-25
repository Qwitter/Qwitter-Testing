import data from '../../fixtures/data.json'
import { login } from '../../utils/login'
import ProfilePage from '../../support/page-objects/profile'
import { selecDateOfBirth, checkBirhDateData } from '../../utils/signup/signup'
import "cypress-file-upload"

describe('Profile page test suite', () => {
    const homeUrl = '/home'
    const repliesUrl = '/with_replies'
    const mediaUrl = '/media'
    const likesUrl = '/likes'
    const profilePic = 'El3nab.jpg'
    const bannerPic = 'quexit.png'

    beforeEach('open profile page', () => {
        cy.clearCookies()
        cy.clearLocalStorage()
        login(data.user.email, data.user.password)
        cy.wait(1000)
        ProfilePage.profilePage.click()
    })

    it('returns to profile page', () => {
        ProfilePage.backHome.should('be.visible').click()
        cy.url().should('include', homeUrl)
    })

    it('save button and cancel should be visible', () => {
        ProfilePage.editProfile.should('be.visible').click()
        ProfilePage.saveEdit.should('be.visible').and('be.enabled')
        ProfilePage.closeEdit.should('be.visible')
    })

    it('name should be exactly like in edit profile', () => {
        ProfilePage.name.invoke('text').then((myName) => {
            ProfilePage.editProfile.click()
            ProfilePage.nameField.should('have.value', myName)
        })
    })

    it('edit name should reflect on profile', () => {
        ProfilePage.editProfile.click()
        ProfilePage.nameField.clear().type(data.editProfile.newName)
        ProfilePage.saveEdit.click()
        ProfilePage.name.invoke('text').should('eq', data.editProfile.newName)
        cy.wait(500)
        // write back old name
        ProfilePage.editProfile.click()
        ProfilePage.nameField.clear().type(data.editProfile.oldName)
        ProfilePage.saveEdit.click()
    })

    it('discard changes in edit profile', () => {
        ProfilePage.editProfile.click()
        ProfilePage.nameField.clear().type(data.editProfile.newName)
        ProfilePage.closeEdit.click()
        ProfilePage.discardChanges.click()
        cy.wait(500)
        ProfilePage.name.invoke('text').should('not.eq', data.editProfile.newName)
    })

    it('cancel discardign changes in edit profile', () => {
        ProfilePage.editProfile.click()
        ProfilePage.nameField.clear().type(data.editProfile.newName)
        ProfilePage.closeEdit.click()
        ProfilePage.cancelDiscardChanges.click()
        ProfilePage.nameField.should('have.value', data.editProfile.newName)
    })

    it('edit bio should reflect on profile', () => {
        ProfilePage.editProfile.click()
        ProfilePage.bioField.clear().type(data.editProfile.newBio)
        ProfilePage.saveEdit.click()
        ProfilePage.bio.invoke('text').should('eq', data.editProfile.newBio)
        cy.wait(500)
        // write back old name
        ProfilePage.editProfile.click()
        ProfilePage.bioField.clear().type(data.editProfile.oldName)
        ProfilePage.saveEdit.click()
    })
    // skip for now since i can't select birthdate (same utility used in signup)
    it.skip('edit birthdate should reflect on profile', () => {
        ProfilePage.editProfile.click()
        let day = data.editProfile.newBirthData.day
        let month = data.editProfile.newBirthData.month
        let year = data.editProfile.newBirthData.year
        let date = `${month} ${day}, ${year}`
        ProfilePage.dayField.scrollIntoView()
        
        selecDateOfBirth(data.editProfile.newBirthData)
        ProfilePage.saveEdit.click()
        ProfilePage.birthDate.invoke('text').should('include', date)

        ProfilePage.editProfile.click()
        ProfilePage.dayField.scrollIntoView()
        day = data.editProfile.oldBirthData.day
        month = data.editProfile.oldBirthData.month
        year = data.editProfile.oldBirthData.year
        date = `${month} ${day}, ${year}`
        selecDateOfBirth(data.editProfile.oldBirthData)
    })

    it('edit profile pic', () => {
        ProfilePage.editProfile.click()
        ProfilePage.cover.last().attachFile(profilePic)
        cy.wait(500)
        ProfilePage.saveEdit.click()
    })

    it('edit banner pic', () => {
        ProfilePage.editProfile.click()
        ProfilePage.cover.first().attachFile(bannerPic)
        cy.wait(500)
        ProfilePage.saveEdit.click()
    })

    it('remove banner', () => {
        ProfilePage.editProfile.click()
        ProfilePage.removeBanner.should('be.visible').click()
        cy.wait(500)
        ProfilePage.saveEdit.click()
    })

    it('upload banner', () => {
        ProfilePage.editProfile.click()
        ProfilePage.cover.first().attachFile(bannerPic)
        cy.wait(500)
        ProfilePage.saveEdit.click()
    })

    it('open replies tab', () => {
        ProfilePage.repliesTab.should('be.visible').click()
        cy.url().should('include', repliesUrl)
    })

    it('open media tab', () => {
        ProfilePage.mediaTab.should('be.visible').click()
        cy.url().should('include', mediaUrl)
    })

    it('open likes tab', () => {
        ProfilePage.likesTab.should('be.visible').click()
        cy.url().should('include', likesUrl)
    })
    
})