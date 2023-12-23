class SearchPage{
    async firstTrend(){
        const elements = await $$('//android.view.View[@index="0"]')
        return elements[6]
    }
    async firstPost(){
        const elements = await $$('//android.view.View[@index="0"]')
        return elements[9]
    }
    async topTab(){
        return await $('//android.view.View[@index="4"]')
    }
    async peopleTab(){
        return await $('//android.view.View[@index="5"]')
    }
}

module.exports = new SearchPage();