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
        return await $('~Next')
    }
    async nameField(){
        return await $('//android.widget.EditText[@index="1"]')
    }
    async emailField(){
        return await $('//android.widget.EditText[@index="2"]')
    }
    async nameErrorMessageCharsType(){
        return await $('~Username must contain only letters and numbers.')
    }
    async emailErrorMessage(){
        return await $('~Invalid email format.')
    }
    async dateOfBirthField(){
        return await $('//android.view.View[@hint="Date of birth"]')
    }
    async editDateOfBirthButton(){
        return await $('//android.widget.Button[@index="0"]')
    }
    async dateOfBirthOkButton(){
        return await $('~OK')
    }
    async dateOfBirthCancelButton(){
        return await $('~CANCEL')
    }
    async dateOfBirthInputField(){
        return await $('//android.widget.EditText[@index="1"]')
    }
    async verificationCodeTitle(){
        return await $('~We sent you a code')
    }
    async verificationCodeField(){
        return await $('//android.widget.EditText[@index="2"]')
    }
    async verificationCodeErrorMessage(){
        return await $('~Invalid confirmation code.')
    }
    async verificationEmailText(){
        return await $('//android.view.View[@index="1"]')
    }
    async notRecivedEmail(){
        return await $('//android.widget.Button[@index="3"]')
    }
    async passwordTitle(){
        return await $('//android.view.View[@index="0"]')
    }
    async passwordField(){
        return await $('//android.widget.EditText[@index="2"]')
    }
    async showPasswordButton(){
        return await $('//android.widget.Button[@index="0"]')
    }
    async passwordErrorMessageLessChars(){
        //Password must be at least 8 characters long.
        return await $('~Password must be at least 8 characters long.')
    }
    async passwordErrorMessageLongNums(){
        //Password must be at least 8 characters long.
        return await $('~Password must contain at least one letter.')
    }
    async profilePicHeader(){
        return await $('~Pick a profile picture')
    }
    async skipForNowButton(){
        return await $('~Skip for now')
    }
    async uploadPhotoButton(){
        return await $('~Upload')
    }
    // this object should be on pixel 5 only i don't know 
    // if it will pass on another devices but i don't
    // find a way to do this on appium
    async photoOnDevice(){ 
        return await $('//android.widget.ImageView[@index="0"]')
    }
    async userNameHeader(){
        return await $('~What should we call you?')
    }
    async usernameField(){
        return await $('//android.widget.EditText[@index="2"]')
    }
    async usernameSuggestionOne(){
        return await $('//android.widget.Button[@index="0"]');
    }
    async usernameSuggestionTwo(){
        return await $('//android.widget.Button[@index="1"]');
    }
    async userNameErrorMessage(){
        return await $('~Invalid Twitter username. Please check the format.')
    }
    async suggestedPageHeader(){
        return await $('~Suggested Follows')
    }
}

module.exports = new SignUpPage();