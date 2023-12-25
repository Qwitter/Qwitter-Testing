class AccountSettingPage{
    async navigationSideBar(){
        return await $('//android.widget.Button[@index="0"]')
    }
    async settingsButton(){
        return await $('~Settings & Privacy')
    }
    async settingsAndPrivacy(){
        return await $('~Settings and privacy')
    }
    async accountInformation(){
        return await $('//android.view.View[@index="2"]')
    }
    async changeEmail(){
        const elements = await $$('//android.view.View[@index="1"]')
        return elements[2]
    }
    async changeUsername(){
        const elements = await $$('//android.view.View[@index="0"]')
        return elements[5]
    }
    async emailField(){
        return await $('//android.widget.EditText[@index="3"]')
    }
    async nextButton(){
        return await $('~Next')
    }
    async changePassword(){
        return await $('//android.view.View[@index="3"]')
    }
    async currentPasswordField(){
        return await $('//android.widget.EditText[@index="0"]')
    }
    async newPasswordField(){
        return await $('//android.widget.EditText[@index="1"]')
    }
    async confirmPasswordField(){
        return await $('//android.widget.EditText[@index="2"]')
    }
    async updatePassword(){
        return await $('~Update password')
    }
    async confirmPasswordErrorMessage(){
        return await $('~Passwords do not match.')
    }
    async chnagEmailTitle(){
        return await $('~Change email')
    }
    async verificationCodeTitle(){
        return await $('~We sent you a code')
    }
    async verificationCodeField(){
        return await $('//android.widget.EditText[@index="2"]')
    }
    async changeUsername(){
        const elements = await $$('//android.view.View[@index="0"]')
        return elements[5]
    }
    async changeUsernameTitle(){
        return await $('~What should we call you?')
    }
    async usernameField(){
        return await $('//android.widget.EditText[@index="2"]')
    }
    async usernameErrorMessage(){
        return await $('~Invalid Twitter username. Please check the format.')
    }
    async next(){
        return await $('~Next')
    }
    async logout(){
        return await $('~Log out')
    }
}

module.exports = new AccountSettingPage();