import SignUpPage from '../../support/page-objects/signup'
import AccountSettingsPage from '../../support/page-objects/account-settings'
const data = require('../../fixtures/signup-data.json')

module.exports.selecDateOfBirth = (date) => {
    SignUpPage.birthDayField.should('be.visible')
    SignUpPage.birthDayField.within(() => {
        cy.scrollTo('bottom')
        cy.get('select').select(date.day, { force: true })
    })

    SignUpPage.birthMonthField.should('be.visible')
    SignUpPage.birthMonthField.within(() => {
        cy.get('select').select(date.month, { force: true })
    })

    SignUpPage.birthYearField.should('be.visible')
    SignUpPage.birthYearField.within(() => {
        cy.get('select').select(date.year, { force: true })
    })
}

module.exports.checkStepNumber = (stepNumber) => {
    SignUpPage.signupStep.should('be.visible')
    SignUpPage.signupStep.should('have.text', `Step ${stepNumber} of 5`)
}

module.exports.doStepOne = (name, email, date) => {
    SignUpPage.nameField.clear().type(data.name)
    SignUpPage.emailField.clear().type(email)
    module.exports.selecDateOfBirth(data.validBirthDate)
    cy.wait(1000)
    SignUpPage.nextButton.click()
}

module.exports.goToStep = (step, email = "", enteredEmail = false) => {
    if (!enteredEmail) email = data.validEmail
    module.exports.doStepOne(data.name, email, data.validBirthDate)
    cy.wait(500)
    if (step == 2) return;

    SignUpPage.nextButton.click()
    if (step == 3) return;

    SignUpPage.signUpButton.click()
    if (step == 4) return;
    cy.wait(3000)
    module.exports.verifyEmail(email).then((code) => {
        SignUpPage.verficationCodeField.type(code)
    })
    SignUpPage.nextButton.click()
    if (step == 5) return;

    SignUpPage.passwordField.type(data.strongPassword)
    SignUpPage.nextButton.click()
    if (step == 6) return;

    cy.contains('button', 'Skip for now').click()
    if (step == 7) return;
}

module.exports.verifyEmail = (email, signUp = true) => {

    return cy.mailiskSearchInbox(Cypress.env("MAILISK_NAMESPACE"),
        { to_addr_prefix: email }).then((response) => {
            const emails = response.data;
            const email = emails[0];
            // we know that the code is the only number in the email, so we easily filter it out
            let code;
            if (signUp)
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

    module.exports.checkBirhDateData(data.validBirthDate.day, data.validBirthDate.month, data.validBirthDate.year)
}

module.exports.checkBirhDateData = (day, month, year) => {
    SignUpPage.birthDayField.within(() => {
        cy.get('select option:selected').should('have.value', day)
    })
    SignUpPage.birthMonthField.within(() => {
        cy.get('select option:selected').should('have.value', month)
    })
    SignUpPage.birthYearField.within(() => {
        cy.get('select option:selected').should('have.value', year)
    })
}

module.exports.createEmail = () => {
    return `test.${new Date().getTime()}@${Cypress.env("MAILISK_NAMESPACE")}.mailisk.net`
}

module.exports.chooseRandomeUserName = () => {
    const randomIndex = Math.floor(Math.random() * 5)
    let username
    AccountSettingsPage.usernameSuggestions.should('have.length', 5)
        .each(($el, index, $list) => {
            if (index == randomIndex) {
                cy.wrap($el).should('be.visible').click()
                cy.wrap($el).invoke('text').then((text) => {
                    username = text.substring(1, text.length - 1)
                }).then(() => {
                    AccountSettingsPage.usernameField.should('have.value', username)
                })
            }
        })
}