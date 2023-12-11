class ExistingTweetsPage{
    async firstTweet(){
        const elements = await $$('//android.view.View[@index="0"]')
        return elements[9]
    }
    async #commonButton(firstBtn, secondBtn){
        const tweet = await this.firstTweet()
        const buttons = await tweet.$$('//android.widget.Button')
        if(buttons.length === 6){
            return buttons[firstBtn]
        }else{
            return buttons[secondBtn]
        }
    }
    async moreButton(){
        return await this.#commonButton(3, 2)
    }
    async likeButton(){
        return await this.#commonButton(4, 5)
    }
    async retweetButton(){
        return await this.#commonButton(2, 4)
    }
    async commentButton(){
        return await this.#commonButton(1, 3)
    }
    async replyTextAria(){
        return $('//android.widget.EditText[@index="2"]')
    }
    async replyButton(){
        return $('~Reply')
    }
    async backFromComment(){
        return $('~Back')
    }

    // those elements should be removed after adding login utility
    async signInButton(){
        return $('~Sign in')
    }
    async emailField(){
        return $('//android.widget.EditText[@index="3"]')
    }
    async nextButton(){
        return $('~Next')
    }
    async passwordField(){
        return $('//android.widget.EditText[@index="2"]')
    }
    async loginButton(){
        return $('~Login')
    }
}

module.exports = new ExistingTweetsPage();