import SignUpPage from '../../support/page-objects/signup';
const data = require('../../fixtures/signup-data.json')

module.exports.selecDateOfBirth= (date) =>{
    SignUpPage.birthDayField.should('be.visible')
    SignUpPage.birthDayField.within(()=>{
        cy.get('select').select(date.day, {force:true})
    })
    SignUpPage.birthMonthField.should('be.visible')
    SignUpPage.birthMonthField.within(()=>{
        cy.get('select').select(date.month, {force:true})
    })
    SignUpPage.birthYearField.should('be.visible')
    SignUpPage.birthYearField.within(()=>{
        cy.get('select').select(date.year, {force:true})
    })
}

module.exports.checkStepNumber= (stepNumber) =>{
    SignUpPage.signupStep.should('be.visible')
    SignUpPage.signupStep.should('have.text', `Step ${stepNumber} of 5`)
}

module.exports.goToStep = (step) =>{
    // Step 2
    SignUpPage.nameField.clear().type('')
    SignUpPage.passwordField.clear().type('')
    selecDateOfBirth(data.validBirthDate)
    SignUpPage.nextButton.click();
    if(step == 2) return ;
    // Step 3
    SignUpPage.nextButton.click()
    if(step == 3) return;
    // Step 4
    SignUpPage.signUpButton.click()
    if(step == 4) return;
}
