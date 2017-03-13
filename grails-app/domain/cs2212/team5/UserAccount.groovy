package cs2212.team5

class UserAccount {

    String username
    int money
    int netWorth
    UserData mydata

    static constraints = {
        mydata nullable: true
    }
}
