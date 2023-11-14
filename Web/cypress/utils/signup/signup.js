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
    SignUpPage.signupStep.should('have.text', `Step ${stepNumber} of 5 `)
}

module.exports.doStepOne = (name, email, date) => {
    SignUpPage.nameField.clear().type(data.name)
    SignUpPage.emailField.clear().type(email)
    module.exports.selecDateOfBirth(data.validBirthDate)
    SignUpPage.nextButton.click();
}

module.exports.goToStep = (step, email = "", enteredEmail = false) =>{
    if(!enteredEmail) email = data.validEmail
    module.exports.doStepOne(data.name, email, data.validBirthDate)
    if(step == 2) return ;

    SignUpPage.nextButton.click()
    if(step == 3) return;
    
    SignUpPage.signUpButton.click()
    if(step == 4) return;

    module.exports.verifyEmail(email).then((code) => {
        SignUpPage.verficationCodeField.type(code)
    })
    SignUpPage.nextButton.click()
    if(step == 5) return;
    
    SignUpPage.passwordField.type(data.strongPassword)
    SignUpPage.nextButton.click()
    if(step == 6) return
}

module.exports.verifyEmail = (email, signUp = true) => {

    return cy.mailiskSearchInbox(Cypress.env("MAILISK_NAMESPACE"), 
    { to_addr_prefix: email }).then((response) => {
        const emails = response.data;
        const email = emails[0];
        // we know that the code is the only number in the email, so we easily filter it out
        let code;
        if(signUp)
            code = email.text.match(/\d+/)[0]
        else 
            code = email.text.match(/Reset Password\s*([a-zA-Z0-9]{8})/)[1]
        expect(code).to.not.be.undefined;
        return code.toString()
    })
}

module.exports.checkStepOneData = (name, email, date) => {
    module.exports.checkStepNumber(1)
    SignUpPage.nameField.should('be.visible')
    .should('have.value', name)
    SignUpPage.emailField.should('be.visible')
    .should('have.value', email)

    SignUpPage.birthDayField.within(()=>{
        cy.get('select').should('have.text', data.validBirthDate.day)
    })
    SignUpPage.birthMonthField.within(()=>{
        cy.get('select').should('have.text', data.validBirthDate.month)
    })
    SignUpPage.birthYearField.within(()=>{
        cy.get('select').should('have.text', data.validBirthDate.year)
    })
}