package cs2212.team5

class League {

    String name
    int numMembers
    int test
    UserAccount owner

    static hasMany = [members : UserAccount]

    static constraints = {
        members nullable: true
    }
}
