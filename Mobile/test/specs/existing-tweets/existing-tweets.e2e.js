const commands = require('../../../commands.js')
const { browser } = require('@wdio/globals')
const ExistingTweetsPage = require('../../page-objects/existing-tweets.js')
const data  = require('../../fixtures/login-data.json')
const exp = require('constants')


describe('', () => {
    afterEach(async () => {
        await commands.restartApp()
    })

    beforeEach( async () => {

        // This should be replaced by login utility
        const signInBtn = await ExistingTweetsPage.signInButton()
        await signInBtn.click()
        const emailField = await ExistingTweetsPage.emailField()
        await emailField.click()
        await emailField.setValue(data.emailWithManyTweets)
        const next = await ExistingTweetsPage.nextButton()
        await next.click()
        const passwordField = await ExistingTweetsPage.passwordField()
        await passwordField.click()
        await passwordField.setValue(data.passwordToEmailWithManyTweets)
        await browser.hideKeyboard()
        const login = await ExistingTweetsPage.loginButton()
        await login.click()

        await browser.pause(2000)
    })

    it('delete a tweet', async () => {

    })

    it.only('add a reply', async () => {
        const commentBtn = await ExistingTweetsPage.commentButton()
        const isThereATweet = await commentBtn?.isExisting() ?? false
        if(isThereATweet){
            await commentBtn.click()
            const replyBtn = await ExistingTweetsPage.replyButton()
            expect(await replyBtn.isEnabled()).toBe(false)

            const replyAria = await ExistingTweetsPage.replyTextAria()
            await replyAria.click()
            await replyAria.setValue('This is a reply')
            expect(await replyBtn.isEnabled()).toBe(true)
            await replyBtn.click()
            const backButton = await ExistingTweetsPage.backFromComment()
            expect(await backButton.isEnabled()).toBe(true)
            await backButton.click()
        }
    })  
    
    it('like and unlike a post', async () => {
        const likeBtn = await ExistingTweetsPage.likeButton()
        const isThereATweet = await likeBtn?.isExisting() ?? false
        if(isThereATweet){
            const oldLikes = await likeBtn.getAttribute('contentDescription')
            await likeBtn.click()
            let newLikes = await likeBtn.getAttribute('contentDescription')
            expect(parseInt(oldLikes) == parseInt(newLikes) + 1 ||
            parseInt(oldLikes) == parseInt(newLikes) - 1).toBe(true)

            await likeBtn.click()
            newLikes = await likeBtn.getAttribute('contentDescription')
            expect(oldLikes === newLikes).toBe(true)
        }
    })
    
    it('retweet a post', async () => {
        
    })
    
    it('delete a post', async () => {

    })
})