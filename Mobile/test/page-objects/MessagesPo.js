class MessagesPo {
    async messagesTab() { return await $('~Tab 4 of 4') }
    async plusButton() { return await $('//android.widget.Button[@index="2"]') }
    async editText() { return await $('//android.widget.EditText[@class="android.widget.EditText"]') }
    async engahmed() { return await $('~eng ahmed\n@engahmed') }
    async qwittertester() { return await $('~qwitter tester\n@qwittertester') }
    async create() { return await $('~Create') }
    async createdGroup() { return await $('~ahmedabdelatty created this group') }
    async ibutton() { return await $('//android.widget.Button[@index="2"]') }
    async leaveConversation() { return await $('~Leave Conversation') }
    async topConvo() { return await $('(//android.widget.Button[@content-desc="eng ahmed, qwitter tester\nahmedabdelatty created this group"])[1]') }
    async sendButton() { return await $('//android.widget.Button[@index="5"]') }
    async sendButtonReply() { return await $('//android.widget.Button[@index="8"]') }
    async getMessage(message) { return await $(`~${message}`) }
    async mediaButton() { return await $('//android.widget.Button[@index="4"]') }
    async firstPhoto() { return await $('//android.widget.ImageView[@resource-id="com.google.android.providers.media.module:id/icon_thumbnail"]') }
    async sentPhoto() { return await $('(//android.widget.Button[@class="android.widget.Button"])[3]') }
    async editButton() { return await $('~Edit') }
    async saveButton() { return await $('~Save') }
    async groupName() { return await $('//android.view.View[@index="2"]') }
    async backButton() { return await $('~Back') }
    async convoPic() { return await $('//android.widget.ImageView[@class="android.widget.ImageView"]') }
    async deleteMessage() { return await $('~Delete Message') }
    async replyButton() { return await $('~Reply') }
}

module.exports = new MessagesPo();