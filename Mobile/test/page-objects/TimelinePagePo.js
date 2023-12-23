class TimelinePagePo {
    async profilePic() { return await $('(//android.widget.Button[@class="android.widget.Button"])[1]') }
    async sidebarList() { return await $('(//android.view.View[@class="android.view.View"])[10]') }
    async userDetails(name, username) { return await $(`~${name}\n@${username}`) }
    async tweetsContainer() { return await $('(//android.view.View[@class="android.view.View"])[12]') }
    async tweetsProfileContainer() { return await $('(//android.view.View[@class="android.view.View"])[24]') }
    async followingButton() { return await $('~Following') }
    async profileButton() { return await $('~Profile') }
}

module.exports = new TimelinePagePo()