import SignUpPage from '../../support/page-objects/signup';
import { verifyEmail } from '../../utils/signup/signup'
const data = require('../../fixtures/forgotpassword-data.json')

module.exports.openPasswordPage = () => {
    SignUpPage.emailField.type(data.email)
    SignUpPage.nextButton.click()
    verifyEmail(data.email, false).then((code) => {
        SignUpPage.verficationCodeField.type(code)
    })
    SignUpPage.nextButton.click()
}
