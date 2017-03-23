package cs2212.team5

import grails.plugin.springsecurity.annotation.Secured

import java.sql.Connection
import java.sql.DriverManager
import java.sql.ResultSet
import java.sql.SQLException
import java.sql.Statement

@Secured(['ROLE_USER'])
class PlayerController {

    static allowedMethods = [getAllPlayers: 'POST', getPlayersByKeyword: 'POST', getPlayer: 'POST']
    static responseFormats = ['json']

    def getPlayersByKeyword() {
        Connection connection = null;
        try {
            String keyword = params.keyword
            String url = "jdbc:mysql://team5-compsci2212.cgndepqzlosf.us-east-1.rds.amazonaws.com/Initialized_Players"
            connection = DriverManager.getConnection(url, "Zain", "password")
            Statement statement = connection.createStatement()
            ResultSet result
            result = statement.executeQuery("SELECT * FROM INITIALSTOCKPRICES WHERE `#LastName` LIKE '%" + keyword + "%' OR `#FirstName` LIKE '%" + keyword + "%'");
            int rows = 0
            if (result.last()) {
                rows = result.getRow()
                // Move to beginning
                result.beforeFirst()
            }
            System.out.println("The numbers of rows is " + rows + " with keyword " + keyword)
            PlayerSummary[] rtrn = new PlayerSummary[rows]
            int i = 0
            while (result.next()) {
                rtrn[i] = new PlayerSummary(firstName: result.getString(4), lastName: result.getString(3), team: result.getString(15), previousDayPrice: result.getDouble(22), currentPrice: result.getDouble(23))
                i = i + 1
            }
            respond rtrn
        }
        catch (SQLException e) {
            System.out.println(e.getMessage())
            response.status = 501 //connection or query issue
        }
        finally {
            if (connection != null) {
                try {
                    connection.close()
                }
                catch (SQLException e) {
                    System.out.println(e.getMessage())
                    response.status = 501 //connection or query issue
                }
            }
        }
    }

    def getAllPlayers() {
        Connection connection = null;
        try {
            String url = "jdbc:mysql://team5-compsci2212.cgndepqzlosf.us-east-1.rds.amazonaws.com/Initialized_Players"
            connection = DriverManager.getConnection(url, "Zain", "password")
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
                rtrn[i] = new PlayerSummary(firstName: result.getString(4), lastName: result.getString(3), team: result.getString(15), previousDayPrice: result.getDouble(22), currentPrice: result.getDouble(23))
                i = i + 1
            }
            respond rtrn
        }
        catch (SQLException e) {
            System.out.println(e.getMessage())
            response.status = 501 //connection or query issue
        }
        finally {
            if (connection != null) {
                try {
                    connection.close()
                }
                catch (SQLException e) {
                    System.out.println(e.getMessage())
                    response.status = 501 //connection or query issue
                }
            }
        }
    }

    def getPlayer() {
        Connection connection = null;
        try {
            String firstName = params.firstName
            String lastName = params.lastName
            String url = "jdbc:mysql://team5-compsci2212.cgndepqzlosf.us-east-1.rds.amazonaws.com/Initialized_Players"
            connection = DriverManager.getConnection(url, "Zain", "password")
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
                PlayerProfile rtrn
                while (result.next()) {
                    rtrn = new PlayerProfile(firstName: result.getString(4), lastName: result.getString(3), jerseyNumber: result.getString(5), position: result.getString(6), height: result.getString(7), weight: result.getString(8), age: result.getInt(10), teamCity: result.getString(16), teamName: result.getString(17), gp: result.getInt(18), reb: result.getDouble(19), ast: result.getDouble(20), pts: result.getDouble(21), previousDayPrice: result.getDouble(22), currentPrice: result.getDouble(23))
                }
                respond rtrn
            }
            else {
                response.status = 502 //player does not exist
            }
        }
        catch (SQLException e) {
            System.out.println(e.getMessage())
            response.status = 501 //connection or query issue
        }
        finally {
            if (connection != null) {
                try {
                    connection.close()
                }
                catch (SQLException e) {
                    System.out.println(e.getMessage())
                    response.status = 501 //connection or query issue
                }
            }
        }
    }

    def index() { }
}
