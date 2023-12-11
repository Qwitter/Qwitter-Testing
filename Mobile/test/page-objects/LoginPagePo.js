class LoginPagePo {
    async loginPageTitle() { return await $('~Happening now') }
    async signupButton() { return await $('~Sign in') }
    async emailNotFound() { return await $('//android.widget.Toast[@text="Email not found" and @class="android.widget.Toast"]') }
    async nextButton() { return await $('~Next') }
    async emailField() { return await $('//android.widget.EditText[@class="android.widget.EditText"]') }
    async passwordField() { return await $('//android.widget.EditText[@class="android.widget.EditText"]') }
    async forgotPasswordLink() { return await $('~Forgot password?') }
    async showPasswordButton() { return await $('(//android.widget.Button[@class="android.widget.Button"])[2]') }
    async signUpLink() { return await $('~Sign up') }
    async loginButton() { return await $('~Login') }
    async wrongPassword() { return await $('//android.widget.Toast[@text="Wrong password" and @class="android.widget.Toast"]') }
    async feed() { return await $('//android.widget.Toast[@text="Into the feed" and @class="android.widget.Toast"]') }
    async fogotPassword() { return await $('~Fogot password?') }
    async backButton() { return await $('~Back') }
}

module.exports = new LoginPagePo()