class ExistingTweetsPage{
    async likeButton(){
        const elements = await $$('//android.widget.Button[@index="4"]')
        return elements[0]
    }
    async retweetButtonInPosts(){
        const elements = await $$('//android.widget.Button[@index="3"]')
        return elements[0]
    }
    async retweetButtonInReplies(){
        const elements = await $$('//android.widget.Button[@index="5"]')
        return elements[0]
    }
    async repostButton(){
        return await $('~Repost')
    }
    async undoRepostButton(){
        return await $('~Undo Repost')
    }
    async commentButton(){
        const elements = await $$('//android.widget.Button[@index="2"]')
        return elements[1]
    }
    async replyTextAriaClick(){
        return await $('//android.widget.EditText[@index="2"]')
    }
    async replyTextAriaAdd(){
        return await $('//android.widget.EditText[@index="4"]')
    }
    async replyButton(){
        return await $('~Reply')
    }
    async backFromComment(){
        return await $('~Back')
    }

}

module.exports = new ExistingTweetsPage();