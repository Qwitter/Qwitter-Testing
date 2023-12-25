class ProfilePage{
    get cover(){
        // this for photo and banner (access them using first() and last())
        return cy.get('[data-testid="imageBtn"]')
    }
    get bannerImage(){
        return cy.get('[alt="user banner image"]')
    }
    get profileImage(){
        return cy.get('[alt="user profile image"]')
    }
    get removeBanner(){
        return cy.get('[data-testid="removePic"]')
    }
    get profilePage(){
        return cy.get('[data-testid="Profile"]')
    }
    get editProfile(){
        return cy.contains('button', 'Edit profile')
    }
    get saveEdit(){
        return cy.contains('button', 'Save')
    }
    get closeEdit(){
        return cy.get('[data-testid="popupHeaderButton"]')
    }
    get discardChanges(){
        return cy.contains('button', 'Discard')
    }
    get cancelDiscardChanges(){
        return cy.contains('button', 'Cancel')
    }
    get name(){
        return cy.get('[data-testid="name"]')
    }
    get nameField(){
        return cy.get('#name')
    }
    get bio(){
        return cy.get('[data-testid="bio"]')
    }
    get bioField(){
        return cy.get('#description')
    }
    get birthDate(){
        return cy.get('[data-testid="birthDate"]')
    }
    get monthField(){
        return cy.get('[data-testid="months"]')
    }
    get dayField(){
        return cy.get('[data-testid="days"]')
    }
    get yearField(){
        return cy.get('[data-testid="years"]')
    }
    get backHome(){
        return cy.get('[data-testid="backHome"]')
    }
    get postsTab(){
        return cy.get('[data-testid="Posts"]')
    }
    get repliesTab(){
        return cy.get('[data-testid="Replies"]')
    }
    get mediaTab(){
        return cy.get('[data-testid="Media"]')
    }
    get likesTab(){
        return cy.get('[data-testid="Likes"]')
    }
}

export default new ProfilePage();