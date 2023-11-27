const { faker, sk } = require('@faker-js/faker')
const data = require('../fixtures/signup-data.json')
const SignUpPage = require('../page-objects/signup')
const emailEnv = require('../fixtures/email-env.json')
const axios = require('axios');

module.exports = {
    selectBirthDate: async (date) => {
        const dateField = await SignUpPage.dateOfBirthField()
        await dateField.click()
        const dateEditBtn = await SignUpPage.editDateOfBirthButton()
        await dateEditBtn.click()
        const dateInput = await SignUpPage.dateOfBirthInputField()
        await dateInput.setValue(date)
        const ok = await SignUpPage.dateOfBirthOkButton()
        await ok.click()
    },
    doStepOne: async () => {
        const englishCheckBox = await SignUpPage.englishCheckBox()
        await englishCheckBox.click()
        const next = await SignUpPage.nextButton()
        await next.click()
    },
    doStepTwo: async () => {
        const uuid = await module.exports.createEmailToken()
        const email = `${uuid}@email.webhook.site`
        await module.exports.enterUserData(data.validName, email, data.validInputDate, true)
        const next = await SignUpPage.nextButton()
        await next.click()
        return uuid
    },
    doStepThree: async (emailToken) => {
        const verificationField = await SignUpPage.verificationCodeField()
        await verificationField.click()
        browser.pause(5000)
        const code = await module.exports.getVerificationCode(emailToken)
        await verificationField.setValue(code)
        await browser.hideKeyboard()
        const next = await SignUpPage.nextButton()
        await next.click()
    },
    doStepFour: async () => {
        const passwordField = await SignUpPage.passwordField()
        await passwordField.click()
        await passwordField.setValue(data.validPassword)
        await browser.hideKeyboard()
        const next = await SignUpPage.nextButton()
        await next.click()
    },
    doStepFive: async () => {
        const skip = await SignUpPage.skipForNowButton()
        await skip.click()
    },
    goToPageOfSignUp: async (screenNum)=>{
        await module.exports.doStepOne()
        const dummyReturn = "X"
        if(screenNum == 2) return dummyReturn;
        const emailToken = await module.exports.doStepTwo()
        if(screenNum == 3) return emailToken; // here retun emailToken for step3
        await module.exports.doStepThree(emailToken)
        
        if(screenNum == 4) return emailToken;
        await module.exports.doStepFour()

        if(screenNum == 5) return emailToken;
        await module.exports.doStepFive()
        if(screenNum == 6) return emailToken;
    },
    enterUserData: async(name, email, date, dateStep = true) =>{
        const emailInput = await SignUpPage.emailField()
        await emailInput.click()
        await emailInput.setValue(email)
        const nameInput = await SignUpPage.nameField()
        await nameInput.click()
        await nameInput.setValue(name)
        if(dateStep){
            await module.exports.selectBirthDate(date)
        }
    },
    createEmailToken: async () => {
        try {
            const response = await axios.post(emailEnv.emailEndPoint, {
                headers: {
                    "api-key": emailEnv.api_key
                }
            });
            return response.data.uuid
        } catch (error) {
            console.error('Error creating email:', error.message);
        }
    },
    getVerificationCode: async (emailToken, isSignUp = true) => {
        try{
            await new Promise(resolve => setTimeout(resolve, 30000))
            const response = await axios.get(`https://webhook.site/token/${emailToken}/requests`, {
                headers: {
                    'api-key': emailEnv.api_key,
                    'Accept': 'application/json',
                }
            })
            const emails = response.data
            const emailContent = emails.data[emails.data.length-1].text_content
            let code = 0;
            if(isSignUp){
                code = emailContent.match(/\d+/)[0]
            }else{
                code = emailContent.match(/Reset Password\s*([a-zA-Z0-9]{8})/)[1]
            }
            return code;
        }catch(error){
            console.log("Error in finding code", error)
        }
    }
}