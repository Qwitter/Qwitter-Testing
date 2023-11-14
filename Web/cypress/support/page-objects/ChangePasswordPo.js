class ChangePasswordPo {
    get currentPasswordInputField() { return cy.get("input[data-testid='currentPassword']") }
    get newPasswordInputField() { return cy.get("input[data-testid='newPassword']") }
    get confirmPasswordInputField() { return cy.get("input[data-testid='confirmPassword']") }
    get saveButton() { return cy.get("button[data-testid='save']") }
}

export default new ChangePasswordPo()