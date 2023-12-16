class AccountSettingPage{
    async navigationSideBar(){
        return await $('//android.widget.ImageView')
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
        return await $('~Email Address')
    }
    async changeUsername(){
        return await $('//android.view.View[@index="0"]')
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
    async changePassword(){
        return await $('~Update password')
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
    async logout(){
        return await $('~Log out')
    }
}

module.exports = new AccountSettingPage();