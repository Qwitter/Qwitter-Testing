class FollowPage{
    async followingList(){
        return await $('//android.widget.Button[@index="3"]')
    }
    async followingListHeader(){
        return await $('~Following')
    }
    async followersListHeader(){
        return await $('~Followers')
    }
    async followersList(){
        return await $('//android.widget.Button[@index="4"]')
    }
    async backButton(){
        return await $('~Back')
    }
    async usersToFollowButton(){
        return await $('//android.widget.Button[@index="2"]')
    }
    async firstUserInFollowScreen(){
        const elements = $$('//android.view.View[@index="0"]')
        return elements[7]
    }
    async followingButton(){
        const elements = await $$('//android.widget.Button[@index="0"]')
        return elements[1]
    }
    async followButton(){
        const elements = await $$('//android.widget.Button[@index="0"]')
        return elements[1]
    }
    async followFromProfile(){
        return await $('~Follow')
    }
    async unfollowFromProfile(){
        return await $('~Following')
    }
    async suggestedFollwsHeader(){
        return await $('~Suggested Follows')
    }
}

module.exports = new FollowPage();