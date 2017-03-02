package cs2212.team5

import grails.rest.RestfulController

class UserAccountController extends RestfulController {

    static responseFormats = ['json','xml']

    UserAccountController() {
        super(UserAccount)
    }

    def createUser(){
        def userName = params.userName
        def password = params.password
        def user = UserAccount.find{username == userName}
        if(user == null){
            def newData = new UserData();
            def global = League.find{name == "Global Leaderboard"}
            newData.addToLeagues(global)
            def newAccount = new UserAccount(username: userName, money: 100, netWorth: 100, mydata: newData, password: password).save()
            global.numMembers = global.numMembers + 1
            global.addToMembers(newAccount).save(flush: true)
            response.status = 200;
        }
        else
            response.status = 502
    }

    def login(){
        def userName = params.userName
        def pass = params.password
        def user = UserAccount.find{username == userName && password == pass}
        if(user != null){
            respond user
        }
        else
            response.status = 502

    }

    def index() { }
}
