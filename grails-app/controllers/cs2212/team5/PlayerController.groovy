package cs2212.team5

import grails.plugin.springsecurity.annotation.Secured

import java.sql.Connection
import java.sql.DriverManager
import java.sql.ResultSet
import java.sql.SQLException
import java.sql.Statement
import java.text.ParseException;
import java.text.SimpleDateFormat;

@Secured(['ROLE_USER'])
class PlayerController {

    static allowedMethods = [getAllPlayers: 'POST', getPlayersByKeyword: 'POST', getPlayer: 'POST', getSuggestedPlayers: 'POST', getPlayerPriceHistory: 'POST']
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
            int days = numDays()
            PlayerSummary[] rtrn = new PlayerSummary[rows]
            int i = 0
            while (result.next()) {
                rtrn[i] = new PlayerSummary(firstName: result.getString(4), lastName: result.getString(3), team: result.getString(15), previousDayPrice: result.getDouble(days+23), currentPrice: result.getDouble(23))
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
            int days = numDays()
            PlayerSummary [] rtrn = new PlayerSummary[rows]
            int i = 0
            while (result.next()) {
                rtrn[i] = new PlayerSummary(firstName: result.getString(4), lastName: result.getString(3), team: result.getString(15), previousDayPrice: result.getDouble(days+23), currentPrice: result.getDouble(23))
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
            int days = numDays()
            if (rows == 1) {
                PlayerProfile rtrn
                while (result.next()) {
                    rtrn = new PlayerProfile(firstName: result.getString(4), lastName: result.getString(3), jerseyNumber: result.getString(5), position: result.getString(6), height: result.getString(7), weight: result.getString(8), age: result.getInt(10), teamCity: result.getString(16), teamName: result.getString(17), gp: result.getInt(18), reb: result.getDouble(19), ast: result.getDouble(20), pts: result.getDouble(21), previousDayPrice: result.getDouble(days+23), currentPrice: result.getDouble(23))
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

    def getSuggestedPlayers() {
        Connection connection = null;
        try {
            String url = "jdbc:mysql://team5-compsci2212.cgndepqzlosf.us-east-1.rds.amazonaws.com/Initialized_Players"
            connection = DriverManager.getConnection(url, "Zain", "password")
            Statement statement = connection.createStatement()
            ResultSet result
            result = statement.executeQuery("SELECT * FROM topfiveplayers")
            PlayerSummary [] rtrn = new PlayerSummary[5]
            int i = 0
            while (result.next() && i < 5) {
                rtrn[i] = new PlayerSummary(firstName: result.getString(6), lastName: result.getString(5), team: result.getString(9), currentPrice: result.getInt(15)) //user current price to store daily fantasy points
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

    def getPlayerPriceHistory() {
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
            int days = numDays()
            System.out.println("The numbers of rows is " + rows + " so...")
            if (rows == 1) {
                double [] rtrn = new double[10];
                int i
                while (result.next()) {
                    for (i=0; i<9 && (23-i+days > 23); i++) {
                        double price = result.getDouble(23+days-i)
                        if (price == null) {
                            rtrn[i+1] = 0
                        }
                        else {
                            rtrn[i+1] = price
                        }
                    }
                    for (int j = i; j < 9; j++) {
                        rtrn[j+1] = 0
                    }
                    rtrn[0] = result.getDouble(23)
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

    def numDays() {
        try {
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            Date f = df.parse("2017-03-19");
            Date t = new Date();
            return ((t.getTime() - f.getTime()) / (1000 * 60 * 60 * 24))
        }
        catch (ParseException e) {
            System.out.println(e.getMessage())
            return -1
        }
    }

    def index() { }
}
