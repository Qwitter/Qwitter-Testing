class NotificationsPo {
    get notificationsButton() { return cy.get('[data-testid="Notification"]') }
    get mentions() { return cy.get('[data-testid="mentions"]') }
    get likeNotif() { return cy.get('[data-testid="likeNotif"]') }
}

export default new NotificationsPo()