package cs2212.team5

import grails.plugin.springsecurity.annotation.Secured

import java.sql.Connection
import java.sql.DriverManager
import java.sql.ResultSet
import java.sql.Statement

@Secured(['ROLE_USER'])
class PortfolioController {

    static allowedMethods = [getNetWorthHistory: 'POST', getBalanceHistory: 'POST', getPortfolio: 'POST']
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

    def getPortfolio() {
        def name = springSecurityService.currentUser.username
        //testing if user with given username exists
        def user = UserAccount.find{username == name}
        if (user != null) { //if user exists
            String url = "jdbc:mysql://team5-compsci2212.cgndepqzlosf.us-east-1.rds.amazonaws.com/Initialized_Players"
            Connection connection = DriverManager.getConnection(url, "Zain", "password")
            Statement statement = connection.createStatement()
            ResultSet result
            PlayerSummary [] rtrn = new PlayerSummary[user.portfolio.size()]
            int i = 0
            for (s in user.portfolio) {
                result = statement.executeQuery("SELECT * FROM INITIALSTOCKPRICES WHERE `#LastName`='" + s.stockLastName + "' AND `#FirstName`='" + s.stockFirstName + "'");
                while (result.next()) {
                    rtrn[i] = new PlayerSummary(firstName: result.getString(3), lastName: result.getString(4), team: result.getString(17), previousDayPrice: result.getDouble(22), currentPrice: result.getDouble(23), quantityOwned: s.quantityOwned)
                    i = i + 1
                }
            }
            respond rtrn
            connection.close()
        }
        else {
            response.status = 501 //user does not exist (failure)
        }
    }

    def index() { }
}
