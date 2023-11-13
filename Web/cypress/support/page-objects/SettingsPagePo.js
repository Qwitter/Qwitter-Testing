class SettingsPagePo {
    get changePasswordLink() { return cy.get("a[href='/settings/password']") }
}

export default new SettingsPagePo()