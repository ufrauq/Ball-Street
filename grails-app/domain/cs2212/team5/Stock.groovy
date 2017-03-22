package cs2212.team5

class Stock {

    String stockFirstName
    String stockLastName
    int quantityOwned

    static belongsTo = [owner: UserAccount]

    static constraints = {
    }
}
