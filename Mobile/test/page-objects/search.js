class SearchPage{
    async searchTab(){
        return await $('~Tab 2 of 5')
    }
    async searchBar(){
        return await $('~Search Qwitter')
    }
    async search(){
        return await $('//android.widget.EditText[@index="1"]')
    }
    async clearSearch(){
        const elements = await $$('//android.widget.Button')
        return elements[1]
    }
    async firstUser(){
        const elements = await $$('//android.view.View[@index="0"]')
        return elements[6] 
    }
    async postsTab(){
        return await $('//android.view.View[@index="9"]')
    }
    
    async notExistingUserMessage(){
        return await $('~Searching for the result')
    }
    
    
}

module.exports = new SearchPage();