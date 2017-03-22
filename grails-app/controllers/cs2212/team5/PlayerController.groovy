package cs2212.team5

import grails.plugin.springsecurity.annotation.Secured

import java.sql.Connection
import java.sql.DriverManager
import java.sql.ResultSet
import java.sql.Statement

@Secured(['ROLE_USER'])
class PlayerController {

    static allowedMethods = [getAllPlayers: 'POST', getPlayersByKeyword: 'POST', getPlayer: 'POST']
    static responseFormats = ['json']

    def getPlayersByKeyword() {
        String keyword = params.keyword
        String url = "jdbc:mysql://team5-compsci2212.cgndepqzlosf.us-east-1.rds.amazonaws.com/Initialized_Players"
        Connection connection = DriverManager.getConnection(url, "Zain", "password")
        Statement statement = connection.createStatement()
        ResultSet result
        result = statement.executeQuery("SELECT * FROM INITIALSTOCKPRICES WHERE `#LastName` LIKE '%" + keyword + "%' OR `#FirstName` LIKE '%" + keyword + "%'");
        int rows = 0
        if (result.last()) {
            rows = result.getRow()
            // Move to beginning
            result.beforeFirst()
        }
        System.out.println("The numbers of rows is " + rows + "with keyword " + keyword)
        PlayerSummary [] rtrn = new PlayerSummary[rows]
        int i = 0
        while (result.next()) {
            rtrn[i] = new PlayerSummary(firstName: result.getString(3), lastName: result.getString(4), team: result.getString(17), previousDayPrice: result.getDouble(22), currentPrice: result.getDouble(23))
            i = i + 1
        }
        respond rtrn
        connection.close()
    }

    def getAllPlayers() {
        String url = "jdbc:mysql://team5-compsci2212.cgndepqzlosf.us-east-1.rds.amazonaws.com/Initialized_Players"
        Connection connection = DriverManager.getConnection(url, "Zain", "password")
        Statement statement = connection.createStatement()
        ResultSet result
        result = statement.executeQuery("SELECT * FROM INITIALSTOCKPRICES")
        int rows = 0
        if (result.last()) {
            rows = result.getRow()
            // Move to beginning
            result.beforeFirst()
        }
        System.out.println("The numbers of rows is " + rows)
        PlayerSummary [] rtrn = new PlayerSummary[rows]
        int i = 0
        while (result.next()) {
            rtrn[i] = new PlayerSummary(firstName: result.getString(3), lastName: result.getString(4), team: result.getString(17), previousDayPrice: result.getDouble(22), currentPrice: result.getDouble(23))
            i = i + 1
        }
        respond rtrn
        connection.close()
    }

    def getPlayer() {
        String firstName = params.firstName
        String lastName = params.lastName
        String url = "jdbc:mysql://team5-compsci2212.cgndepqzlosf.us-east-1.rds.amazonaws.com/Initialized_Players"
        Connection connection = DriverManager.getConnection(url, "Zain", "password")
        Statement statement = connection.createStatement()
        ResultSet result
        result = statement.executeQuery("SELECT * FROM INITIALSTOCKPRICES WHERE `#LastName`='" + lastName + "' AND `#FirstName`='" + firstName + "'");
        int rows = 0
        if (result.last()) {
            rows = result.getRow()
            // Move to beginning
            result.beforeFirst()
        }
        System.out.println("The numbers of rows is " + rows + " so...")
        if (rows == 1) {
            PlayerSummary rtrn
            while (result.next()) {
                rtrn = new PlayerSummary(firstName: result.getString(3), lastName: result.getString(4), team: result.getString(17), previousDayPrice: result.getDouble(22), currentPrice: result.getDouble(23))
            }
            respond rtrn
        }
        else {
            response.status = 501 //player does not exist
        }
        connection.close()
    }

    def index() { }
}
