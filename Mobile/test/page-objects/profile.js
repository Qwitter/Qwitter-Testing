class ProfilePage{
    async profilePage(){
        return await $('~Profile')
    }
    async postsTab(){
        return await $('//android.view.View[@index="9"]')
    }
    async repliesTab(){
        return await $('//android.view.View[@index="10"]')
    }
    async mediaTab(){
        return await $('//android.view.View[@index="11"]')
    }
    async likesTab(){
        return await $('//android.view.View[@index="12"]')
    }
    async moreFromPosts(){
        return await $('//android.widget.Button[@index="5"]')
    }
    async moreFromReplies(){
        return await $('//android.widget.Button[@index="3"]')
    }
    async moreFromMedia(){
        return await $('//android.widget.Button[@index="3"]')
    }
    async deleteTweet(){
        return await $('~Delete Tweet')
    }
    async backHome(){
        const elements = await $$('//android.widget.Button[@index="0"]')
        return elements[0]
    }
    async editProfile(){
        return await $('~Edit profile')
    }
    async forYouTab(){
        const elements = await $$('//android.view.View[@index="0"]')
        return elements[5]
    }
    async profileName(){
        return await $('//android.view.View[@index="2"]')
    }
    async saveEdit(){
        return await $('~Save')
    }
    async closeEdit(){
        return await $('//android.widget.Button[@index="0"]')
    }
    async discardEdit(){
        return await $('~Discard')
    }
    async cancelDiscardEdit(){
        return await $('~Cancel')
    }
    async profileNameField(){
        return await $('//android.widget.EditText[@index="2"]')
    }
    async profileBio(){
        return await $('//android.view.View[@index="4"]')
    }
    async bioField(){
        return await $('//android.widget.EditText[@index="3"]')
    }
    
}

module.exports = new ProfilePage();