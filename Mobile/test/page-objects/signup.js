class SignUpPage{
    async loginPagetitle() {  
        return await $('~Happening now ')
    }
    async signUpPageHeader(){
        return await $('~Create your account')
    } 
    async signUpWithGoogle(){
        return await $('~Sign up with Google')
    }
    async signUpWithApple(){
        return await $('~Sign up with Apple')
    }
    async createAccount(){
        return await $('~Create account')
    }
    async englishCheckBox(){
        return await $('~English - English')
    }
    async arabicCheckBox(){
        return await $('~Arabic - العربية')
    }
    async backButton(){
        return await $('~Back')
    }
    async searchForLanguage(){
        return await $('//android.widget.EditText')
    }
    async deleteSearchKeyword(){
        return await $('//android.widget.Button')
    }
    async nextButton(){
        return await await $('~Next')
    }
    async nameField(){
        return await $('//android.widget.EditText[@index="1"]')
    }
    async emailField(){
        return await $('//android.widget.EditText[@index="2"]')
    }
    async nameErrorMessageCharsLimit(){
        return await $('~Username must be between 3 and 30 characters.')
    }
    async nameErrorMessageCharsType(){
        return await $('~Username must contain only letters and numbers.')
    }
    async emailErrorMessage(){
        return await $('~Invalid email format.')
    }
    async dateOfBirthField(){
        return 'new UiSelector().className("android.view.View").index(0)'
    }
    async editDateOfBirthButton(){
        return await $('//android.widget.Button=[@index="0"]')
    }
    async dateOfBirthOkButton(){
        return await $('~OK')
    }
    async dateOfBirthCancelButton(){
        return await $('~CANCEL')
    }
    async dateOfBirthInputField(){
        return await $('//android.widget.EditText=[@index="1"]')
    }
    async verficationCodeTitle(){
        return await $('~We sent you a code')
    }
    async verficationCodeField(){
        return await $('')
    }
    async verficationCodeErrorMessage(){
        return await $('')
    }
    async passwordField(){
        return await $('')
    }
    async showPasswordButton(){
        return await $('//android.widget.Button[@index="0"]')
    }
    async notRecivedEmail(){
        return await $('')
    }
    async profilePicField(){
        return await $('')
    }
    async skipForNowButton(){
        return await $('~Skip for now')
    }
    async uploadPhotoButton(){
        return await $('~Upload')
    }
    // TODO: elements of profile pic => delete pic, take pic
    async usernameField(){
        return await $('')
    }
    async usernameSuggestions(){
        return await $('');
    }
}

module.exports = new SignUpPage();