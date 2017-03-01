package cs2212.team5

class League {

    String name
    String password
    int numMembers
    UserAccount owner

    static hasMany = [members : UserAccount]

    static constraints = {
        members nullable: true
        password nullable: true
    }
}
