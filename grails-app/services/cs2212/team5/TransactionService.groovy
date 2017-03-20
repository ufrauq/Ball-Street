package cs2212.team5

import grails.transaction.Transactional

@Transactional
class TransactionService {

    def removeFromPortfolio(UserAccount user, String fName, String lName, int quantity) {
        def stock = user.portfolio.find{it.stockFirstName == fName && it.stockLastName == lName}
        System.out.println("remove " + stock)
        if (stock.quantityOwned == quantity) {
            user.removeFromPortfolio(stock)
            stock.delete(flush: true)
            user.save(flush: true)
        }
        else {
            stock.quantityOwned = stock.quantityOwned - quantity
            stock.save(flush: true)
        }
    }

    def calculateNetWorth(UserAccount user) {
        user.netWorth = user.balance
        for (s in user.portfolio) {
            def price = 25//GET PRICE FROM SQL DATA
            user.netWorth = user.netWorth + price*s.quantityOwned
        }
    }

    def serviceMethod() {
        def allUsers = UserAccount.findAll()
        def currentDate = new Date()
        for (user in allUsers) {
            /*if (hours == 9 && minutes == 0) {
                for (int i = 9; i > 0; i ++) {
                    user.netWorthHistory[i] = user.netWorthHistory[i-1]
                    user.balanceHistory[i] = user.balanceHistory[i-1]
                }
                user.netWorthHistory[0] = user.netWorth
                user.balanceHistory[0] = user.balance
            }*/
            if (user.transactions != null) {
                System.out.println(user.username)
                def pendingTransactions = user.transactions.findAll{it.tStatus == "open"}
                for (transaction in pendingTransactions) {
                    if (transaction.tType == "sell") {
                        def price = 10//GET PRICE FROM SQL DATA
                        if (price != transaction.stockPrice) {
                            user.balance = user.balance + (price-transaction.stockPrice)*transaction.stockQuantity
                            user.save(flush: true)
                            transaction.stockPrice = price
                        }
                        transaction.transactionClosed = currentDate
                        transaction.tStatus = "closed"
                        transaction.save(flush: true)
                    }
                    else if (transaction.tType == "buy") {
                        def price = 10//GET PRICE FROM SQL DATA
                        if (price != transaction.stockPrice) {
                            user.balance = user.balance - (price-transaction.stockPrice)*transaction.stockQuantity
                            user.save(flush: true)
                            transaction.stockPrice = price
                            if (user.balance > 0) {
                                transaction.transactionClosed = currentDate
                                transaction.tStatus = "closed"
                                transaction.save(flush: true)
                            }
                            else {
                                transaction.transactionClosed = currentDate
                                transaction.tStatus = "failed"
                                transaction.save(flush: true)
                                user.balance = user.balance + transaction.stockPrice*transaction.stockQuantity
                                user.save(flush: true)
                                removeFromPortfolio(user, transaction.stockFirstName, transaction.stockLastName, transaction.stockQuantity)
                            }
                        }
                        else {
                            if (user.balance > 0) {
                                transaction.transactionClosed = currentDate
                                transaction.tStatus = "closed"
                                transaction.save(flush: true)
                            }
                            else {
                                transaction.transactionClosed = currentDate
                                transaction.tStatus = "failed"
                                transaction.save(flush: true)
                                user.balance = user.balance + transaction.stockPrice*transaction.stockQuantity
                                user.save(flush: true)
                                removeFromPortfolio(user, transaction.stockFirstName, transaction.stockLastName, transaction.stockQuantity)
                            }
                        }
                    }
                }
                calculateNetWorth(user)
                user.save(flush: true)
            }
        }
    }
}
