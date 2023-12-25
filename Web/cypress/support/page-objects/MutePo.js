class MutePo {
    get homeSearch() { return cy.get('input[type="homeSearch"]') }
    get muteUnmute() { return cy.get('[data-testid="muteUnmute"]') }
    get privacyAndSafety() { return cy.get('a[href="/settings/privacy_and_safety"]') }
    get mutedAccounts() { return cy.get('[data-testid="Muted accounts"]') }
    get muteList() { return cy.get('[data-testid="muteList"]') }
    get muteButton() { return cy.get('[data-testid="muteButton"]') }
    get unmuteButton() { return cy.get('[data-testid="unmuteButton"]') }
}

export default new MutePo()