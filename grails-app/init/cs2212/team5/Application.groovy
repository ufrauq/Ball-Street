package cs2212.team5

import grails.boot.GrailsApp
import grails.boot.config.GrailsAutoConfiguration

import java.sql.Connection
import java.sql.Statement
import java.sql.ResultSet
import java.sql.DriverManager
import cs2212.team5.TransactionService

class Application extends GrailsAutoConfiguration {

    static void main(String[] args) {
        GrailsApp.run(Application, args)
        String url = "jdbc:mysql://team5-compsci2212.cgndepqzlosf.us-east-1.rds.amazonaws.com/Initialized_Players";
        Connection connection = DriverManager.getConnection(url, "Zain", "password");
        Statement statement = connection.createStatement();
        ResultSet result;
        String lastName = "James";
        String firstName = "LeBron";
        result = statement.executeQuery("SELECT `#FirstName`,`#LastName`,`#CurrentPrice` FROM INITIALSTOCKPRICES WHERE `#LastName`='" + lastName + "' AND `#FirstName`='" + firstName + "'");
        while ( result.next() ) {
            for (int i = 1; i <= 3; i++) {
                System.out.print(result.getString(i) + " ");
            }
            System.out.println();
        }
        connection.close();
        while (true) {
            sleep(60000);
            def currentTime = new Date();
            def hours = currentTime.getHours()
            def minutes = currentTime.getMinutes()
            System.out.println("The current time  is " + hours + ":" + minutes)
            if (minutes%2==0) {
                System.out.println("Flushing Queue...")
                String url2 = "http://localhost:8080/update/updateTransactions";

                URL obj = new URL(url2);
                HttpURLConnection con = (HttpURLConnection) obj.openConnection();

                // optional default is GET
                con.setRequestMethod("POST");

                int responseCode = con.getResponseCode();
                System.out.println("\nSending 'POST' request to URL : " + url2);
                System.out.println("Response Code : " + responseCode);
            } //end if
        } //end infinite loop
    }
}
