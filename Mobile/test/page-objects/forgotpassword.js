class ForgotPasswordPage{
    async signInButton(){
        return await $('~Sign in')
    }
    async forgotPasswordButton(){
        return await $('~Forgot password ?')
    }
    async findXAccountHeader(){
        return  await $('~Find your X account')
    }
    async emailField(){
        return await $('//android.widget.EditText[@index="3"]')
    }
    async verificationCodeHeader(){
        return await $('~We sent you a code')
    }
    async verificationCodeField(){
        return await $('//android.widget.EditText[@index="2"]')
    } 
    async verificationCodeErrorMessage(){
        return await $('~Invalid confirmation code.')
    }
    async chooseNewPasswordHeader(){
        return await $('~Choose a new password')
    }
    async newPasswordField(){
        return await $('//android.widget.EditText[@index="3"]')
    }
    async confirmPasswordField(){
        return await $('//android.widget.EditText[@index="4"]')
    }
    async showPassword(){
        return $$('//android.widget.Button[@index="0"]')
    }
    async passwordsDontMatch(){
        return $('~Passwords do not match.')
    }
}

module.exports = new ForgotPasswordPage();