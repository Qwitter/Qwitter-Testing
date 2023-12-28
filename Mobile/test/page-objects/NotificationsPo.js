class NotificationsPo {
    async notificationsButton() { return await $('~Tab 3 of 4') }
    async mentionsTab() { return await $('~Mentions\nTab 3 of 3') }
    async likeButton() { return await $('(//android.widget.Button[@content-desc="0"])[3]') }
    async unlikeButton() { return await $('(//android.widget.Button[@content-desc="1"])[1]') }
    async backProfile() { return await $('(//android.widget.Button[@class="android.widget.Button"])[1]') }
    async backSearch() { return await $('~Back') }
    async retweetButton() { return await $('(//android.widget.Button[@content-desc="0"])[2]') }
    async repost() { return await $('~Repost') }
    async unretweetButton() { return await $('(//android.widget.Button[@content-desc="1"])[1]') }
    async undoRepost() { return await $('~Undo Repost') }
}

module.exports = new NotificationsPo()