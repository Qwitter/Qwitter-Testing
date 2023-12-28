class MessagesPo {
    get composeMessages() { return cy.get("a[href='/Messages/compose']") }
    get searchPeople() { return cy.get("input[placeholder='Search people']") }
    get searchedUsers() { return cy.get("ul[data-testid='searchedUsers']") }
    get startANewMessage() { return cy.get("textarea[placeholder='Start a new message']") }
    get sendButton() { return cy.get("button[data-testid='sendButton']") }
    get conversations() { return cy.get("div[data-testid='convos']") }
    get uploadMedia() { return cy.get("input[data-testid='uploadMedia']") }
    get messageMedia() { return cy.get("div[data-testid='messageMedia']") }
    get moreButton() { return cy.get("div[data-testid='moreButton']") }
    get replyButton() { return cy.get("div[data-testid='reply']") }
    get deleteButton() { return cy.get("div[data-testid='delete']") }
    get textMessage() { return cy.get("div[data-testid='text']") }
    get replyToMessageText() { return cy.get("p[data-testid='replyToMessageText']") }
    get confirmDeleteButton() { return cy.get("div[data-testid='confirmDelete']>button") }
    get convoPopover() { return cy.get("div[data-testid='convoPopover']") }
    get deleteConversation() { return cy.get("div[data-testid='deleteConversation']") }
    get confirmLeave() { return cy.get("div[data-testid='leave']>button").eq(0) }
}

export default new MessagesPo();