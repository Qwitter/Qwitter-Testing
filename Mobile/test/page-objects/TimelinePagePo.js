class TimelinePagePo {
    async profilePic() { return await $('(//android.widget.Button[@class="android.widget.Button"])[1]') }
    async sidebarList() { return await $('(//android.view.View[@class="android.view.View"])[10]') }
    async userDetails(name, username) { return await $(`~${name}\n@${username}`) }
    async tweetsContainer() { return await $('(//android.view.View[@class="android.view.View"])[12]') }
    async topTweet() { return (await this.tweetsContainer()).$$('android.view.View')[1] }
    async tweetsProfileContainer() { return await $('(//android.view.View[@class="android.view.View"])[24]') }
    async followingButton() { return await $('~Following') }
    async profileButton() { return await $('~Profile') }
    async forYouTab() { return await $('//android.view.View[@content-desc="Following\nTab 2 of 2"]') }
    async home() { return await $('//android.view.View[@content-desc="Tab 1 of 4"]') }
}

module.exports = new TimelinePagePo()