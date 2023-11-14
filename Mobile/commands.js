const { browser } = require('@wdio/globals')
module.exports ={
    restartApp: async ()=>{
        const appId = 'com.example.qwitter_flutter_app'
        await browser.terminateApp(appId)
        await browser.activateApp(appId)
    }
}