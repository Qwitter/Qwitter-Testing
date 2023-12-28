const { browser } = require('@wdio/globals')
const SearchPage = require('../page-objects/search')

module.exports = {
    searchFor: async function (searchKeyword){
        const search = await SearchPage.search()
        await search.click()
        await search.setValue(searchKeyword)
        await browser.pause(5000)
    }
}