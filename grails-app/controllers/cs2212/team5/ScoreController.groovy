package cs2212.team5

import java.sql.Connection
import java.sql.DriverManager
import java.sql.ResultSet
import java.sql.SQLException
import java.sql.Statement

class ScoreController {

    static allowedMethods = [getScore: 'POST']
    static responseFormats = ['json']

    def getScore(){
        Connection connection = null;
        try {
            String url = "jdbc:mysql://team5-compsci2212.cgndepqzlosf.us-east-1.rds.amazonaws.com/Initialized_Players"
            connection = DriverManager.getConnection(url, "Zain", "password")
            Statement statement = connection.createStatement()
            ResultSet result
            result = statement.executeQuery("SELECT * FROM scoreboard ")
            int rows = 0
            if (result.last()) {
                rows = result.getRow()
                // Move to beginning
                result.beforeFirst()
            }
            String [] r = new String[rows]
            int i = 0
            while (result.next()) {
                r[i] = result.getString(9) + " vs. " + result.getString(13) + " " + result.getString(17) + "-"+ result.getString(18) + "   "
                i++
            }
            respond r
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
