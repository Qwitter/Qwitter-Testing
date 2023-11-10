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
        console.log('before screen 2')
        if(screenNum == 2) return;
        await this.enterUserData(data.validName, data.validEmail, data.validInputDate, true)
        await nextButton.click()
        if(screenNum == 3) return;
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
