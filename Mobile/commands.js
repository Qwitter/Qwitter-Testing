const { browser } = require('@wdio/globals')
const projectPath = require('path')
const app = require('./app.json')
const androidAppPath = projectPath.join(process.cwd(), `app/android/${app.appName}`)
module.exports ={
    restartApp: async (reinstall = false)=>{
        const appId = 'com.example.qwitter_flutter_app'
        await browser.terminateApp(appId)
        if(reinstall){
            await browser.removeApp(appId)
            await browser.installApp(androidAppPath)
        }
        await browser.activateApp(appId)
    }
}