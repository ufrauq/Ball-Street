package cs2212.team5

import grails3.example.Role

class BootStrap {

    def init = { servletContext ->
        def global = League.find{name == "Global Leaderboard"}
        if (global == null) {
            new League(numMembers: 0, maxMembers: -1, name: "Global Leaderboard").save()
        }
        def role = Role.find{authority: 'ROLE_USER'}
        if (role == null) {
            new Role(authority: 'ROLE_USER').save()
        }
        /*def user = UserAccount.find{username == "Zain"}
        def currentDate = new Date()
        user.transactionCount = user.transactionCount + 1
        def newTransaction = new Transaction(tType: "buy", tStatus: "open", transactionOpened: currentDate, stockFirstName: "Zain", stockLastName: "Sirohey", stockPrice: 23.45, stockQuantity: 20, transactionID: user.transactionCount, balanceBefore: user.balance, creator: user).save()
        user.addToTransactions(newTransaction).save(flush: true)
        user.transactionCount = user.transactionCount + 1
        def newTransaction2 = new Transaction(tType: "sell", tStatus: "open", transactionOpened: currentDate, stockFirstName: "Matt", stockLastName: "Wond", stockPrice: 15.34, stockQuantity: 100, transactionID: user.transactionCount, balanceBefore: user.balance, creator: user).save()
        user.addToTransactions(newTransaction2).save(flush: true)*/
    }
    def destroy = {
    }
}
