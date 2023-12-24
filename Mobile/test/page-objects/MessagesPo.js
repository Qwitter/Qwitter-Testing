class MessagesPo {
    async messagesTab() { return await $('~Tab 5 of 5') }
    async plusButton() { return await $('//android.widget.Button[@index="2"]') }
    async editText() { return await $('//android.widget.EditText[@class="android.widget.EditText"]') }
    async engahmed() { return await $('~eng ahmed\n@engahmed') }
    async qwittertester() { return await $('~qwitter tester\n@qwittertester') }
    async create() { return await $('~Create') }
    async createdGroup() { return await $('~ahmedabdelatty created this group') }
    async ibutton() { return await $('//android.widget.Button[@index="2"]') }
    async leaveConversation() { return await $('~Leave Conversation') }
    async topConvo() { return await $('~eng ahmed, qwitter tester\nahmedabdelatty created this group') }
    async sendButton() { return await $('//android.widget.Button[@index="4"]') }
    async getMessage(message) { return await $(`~${message}`) }
    async mediaButton() { return await $('//android.widget.Button[@index="3"]') }
    async firstPhoto() { return await $('(//android.widget.ImageView[@resource-id="com.google.android.providers.media.module:id/icon_thumbnail"])[1]') }
    async sentPhoto() { return await $('(//android.widget.ImageView[@class="android.widget.ImageView"])[2]') }
    async editButton() { return await $('~Edit') }
    async saveButton() { return await $('~Save') }
    async groupName() { return await $('//android.view.View[@index="2"]') }
    async backButton() { return await $('~Back') }
    async convoPic() { return await $('//android.widget.ImageView[@class="android.widget.ImageView"]') }
    async deleteMessage() { return await $('~Delete Message') }
}

module.exports = new MessagesPo();