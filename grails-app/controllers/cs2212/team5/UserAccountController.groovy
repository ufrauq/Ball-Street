package cs2212.team5

import grails.rest.RestfulController

class UserAccountController extends RestfulController {

    static responseFormats = ['json','xml']

    UserAccountController() {
        super(UserAccount)
    }

    /**
     * Controller method which, given a username and password, attempts to create a valid user
     * @return success or failure status
     */
    def createUser(){
        def userName = params.userName
        def password = params.password
        //testing if user with userName exists
        def user = UserAccount.find{username == userName}

        //if user with userName doesn't exist and the user supplied a password and userName
        if(user == null && password != "" && userName != ""){
            def newData = new UserData();
            def global = League.find{name == "Global Leaderboard"}
            newData.addToLeagues(global)
            def newAccount = new UserAccount(username: userName, money: 100, netWorth: 100, mydata: newData, password: password).save()
            global.numMembers = global.numMembers + 1 //increment members in global leaderboard
            global.addToMembers(newAccount).save(flush: true) //add user to global leaderboard
            response.status = 200; //success
        }
        else
            response.status = 502 //username is already taken (failure)
    }

    /**
     * Controller method which, given a username and password, attempts to login the user
     * @return user or failure status
     */
    def login(){
        def userName = params.userName
        def pass = params.password
        def user = UserAccount.find{username == userName && password == pass} //attempts to find user with userName and password
        if(user != null){ //if user found, respond with user data
            respond user
        }
        else
            response.status = 502 //invalid login credentials (failure)

    }

    def index() { }
}
