package cs2212.team5

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_USER'])
class PortfolioController {

    static allowedMethods = [getStock: 'POST', getBalance: 'POST']
    static responseFormats = ['json']

    def springSecurityService

    def getNetWorthHistory() {
        def name = springSecurityService.currentUser.username
        //testing if user with given username exists
        def user = UserAccount.find{username == name}
        if (user != null) { //if user exists
            respond user.netWorthHistory
        }
        else {
            response.status = 501 //user does not exist (failure)
        }
    }

    def getBalanceHistory() {
        def name = springSecurityService.currentUser.username
        //testing if user with given username exists
        def user = UserAccount.find{username == name}
        if (user != null) { //if user exists
            respond user.balanceHistory
        }
        else {
            response.status = 501 //user does not exist (failure)
        }
    }

    def index() { }
}
