class postingTweetsPo {
    async plusButton() { return await $('//android.widget.Button[@index="9"]') }
    async postButton() { return await $('//android.widget.Button[@index="10"]') }
    async editText() { return await $('//android.widget.EditText[@class="android.widget.EditText"]') }
    async post() { return await $('~Post') }
    async camera() { return await $('~Home\nTab 1 of 5') }
    async shutter() { return await $('~Shutter') }
    async done() { return await $('~Done') }
}

module.exports = new postingTweetsPo();