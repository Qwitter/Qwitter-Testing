import SignUpPage from '../../support/page-objects/signup';
import { verifyEmail } from '../../utils/signup/signup'

module.exports.openPasswordPage = (email) => {
    SignUpPage.emailField.type(email)
    SignUpPage.nextButton.click()
    verifyEmail(email, false).then((code) => {
        SignUpPage.verficationCodeField.type(code)
    })
    SignUpPage.nextButton.click()
}
