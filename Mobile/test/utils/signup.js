const { faker, sk } = require('@faker-js/faker')
const data = require('../fixtures/signup-data.json')
const SignUpPage = require('../page-objects/signup')

module.exports = {
    selectBirthDate: async function (date){
        const dateField = await SignUpPage.dateOfBirthField()
        await dateField.click()
        const dateEditBtn = await SignUpPage.editDateOfBirthButton()
        await dateEditBtn.click()
        const dateInput = await SignUpPage.dateOfBirthInputField()
        await dateInput.setValue(date)
        const ok = await SignUpPage.dateOfBirthOkButton()
        await ok.click()
    },
    goToPageOfSignUp: async(screenNum)=>{
        const englishCheckBox = await SignUpPage.englishCheckBox()
        await englishCheckBox.click()
        const nextButton = await SignUpPage.nextButton()
        await nextButton.click()
        
        if(screenNum == 2) return;
        const randomEmail = faker.internet.email()
        await module.exports.enterUserData(data.validName, randomEmail, data.validInputDate, true)
        await nextButton.click()

        if(screenNum == 3) return;
        const verificationField = await SignUpPage.verificationCodeField()
        await verificationField.click()
        await verificationField.setValue(data.validVerificationCode)
        await browser.hideKeyboard()
        await nextButton.click()
        
        if(screenNum == 4) return;
        const passwordField = await SignUpPage.passwordField()
        await passwordField.click()
        await passwordField.setValue(data.validPassword)
        await browser.hideKeyboard()
        await nextButton.click()

        if(screenNum == 5) return;
        const skip = await SignUpPage.skipForNowButton()
        await skip.click()
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
    }
}
