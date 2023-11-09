const data = require('../fixtures/signup-data.json')
const SignUpPage = require('../page-objects/signup')

module.exports = {
    selectBirthDate: async ()=>{
        const dateField = await SignUpPage.dateOfBirthField()
        await dateField.click()
        const dateEditBtn = await SignUpPage.editDateOfBirthButton()
        await dateEditBtn.click()
        const dateInput = await SignUpPage.dateOfBirthInputField()
        await dateInput.setValue(data.validInputDate)
        const ok = await SignUpPage.dateOfBirthOkButton()
        await ok.click()
    },
    goToPageOfSignUp: async(pageNum)=>{
        const englishCheckBox = await SignUpPage.englishCheckBox()
        await englishCheckBox.click()
        const nextButton = await SignUpPage.nextButton()
        await nextButton.click()
        if(pageNum == 2) return
        
    },
    enterUserData: async(name, email, date, dateStep = true) =>{
        const emailInput = await SignUpPage.emailField()
        await emailInput.setValue(email)
        const nameInput = await SignUpPage.nameField()
        await nameInput.setValue(name)
        if(dateStep)
            this.selectBirthDate(date)
    }
}