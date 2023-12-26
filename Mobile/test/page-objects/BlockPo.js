class BlockPo {
    async moreButton() { return await $('(//android.widget.Button[@class="android.widget.Button"])[2]') }
    async blockButton() { return await $('~Block') }
    async unblockButton() { return await $('~unblock') }
    async followButton() { return await $('~Follow') }
}

module.exports = new BlockPo();