package cs2212.team5

import grails.transaction.Transactional

@Transactional
class TransactionService {

    def addToPortfolio(UserAccount user, String fName, String lName, int quantity) {
        def stock = user.portfolio.find{it.stockFirstName == fName && it.stockLastName == lName}
        System.out.println("add1 " + stock)
        if (stock != null) {
            stock.quantityOwned = stock.quantityOwned + quantity
            System.out.println(stock.quantityOwned)
            stock.save(flush: true)
        }
        else {
            def newStock = new Stock(stockFirstName: fName, stockLastName: lName, quantityOwned: quantity, quantityBefore: 0, owner: user).save()
            user.addToPortfolio(newStock).save(flush: true)
        }
    }

    def removeFromPortfolio(UserAccount user, String fName, String lName, int quantity) {
        def stock = user.portfolio.find{it.stockFirstName == fName && it.stockLastName == lName}
        System.out.println("remove1 " + stock)
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
            def price = 20//GET PRICE FROM SQL DATA
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
            def pendingTransactions = user.transactions.findAll{it.tStatus == "open"}.sort{it.transactionID}
            if (pendingTransactions.size() > 0) {
                int previousBalance = pendingTransactions.get(0).balanceBefore
                System.out.println(user.username)
                for (stock in  user.portfolio) {
                    stock.quantityOwned = stock.quantityBefore
                    stock.save(flush: true)
                }
                for (transaction in pendingTransactions) {
                    def price = 20//GET PRICE FROM SQL DATA
                    if (transaction.tType == "sell") {
                        transaction.stockPrice = price
                        transaction.transactionClosed = currentDate
                        user.balance = previousBalance + transaction.stockPrice*transaction.stockQuantity
                        def stock = user.portfolio.find{it.stockFirstName == transaction.stockFirstName && it.stockLastName == transaction.stockLastName}
                        if (stock == null) {
                            transaction.balanceBefore = previousBalance
                            transaction.tStatus = "failed"
                            transaction.save(flush: true)
                            user.balance = previousBalance
                            user.save(flush: true)
                        }
                        else if (stock.quantityOwned >= transaction.stockQuantity) {
                            user.save(flush: true)
                            transaction.balanceBefore = previousBalance
                            transaction.tStatus = "closed"
                            transaction.save(flush: true)
                            previousBalance = user.balance
                            removeFromPortfolio(user, transaction.stockFirstName, transaction.stockLastName, transaction.stockQuantity)
                        }
                        else {
                            transaction.balanceBefore = previousBalance
                            transaction.tStatus = "failed"
                            transaction.save(flush: true)
                            user.balance = previousBalance
                            user.save(flush: true)
                        }
                    }
                    else if (transaction.tType == "buy") {
                        transaction.stockPrice = price
                        transaction.transactionClosed = currentDate
                        user.balance = previousBalance - transaction.stockPrice*transaction.stockQuantity
                        if (user.balance >= 0) {
                            user.save(flush: true)
                            transaction.balanceBefore = previousBalance
                            transaction.tStatus = "closed"
                            transaction.save(flush: true)
                            previousBalance = user.balance
                            addToPortfolio(user, transaction.stockFirstName, transaction.stockLastName, transaction.stockQuantity)
                        }
                        else {
                            transaction.balanceBefore = previousBalance
                            transaction.tStatus = "failed"
                            transaction.save(flush: true)
                            user.balance = previousBalance
                            user.save(flush: true)
                        }
                    }
                    System.out.println("The balance after is " + transaction.balanceBefore)
                } //end transaction loop
                for (stock in  user.portfolio) {
                    stock.quantityBefore = stock.quantityOwned
                    stock.save(flush: true)
                }
                calculateNetWorth(user)
                user.save(flush: true)
            } //end if (checking if user has pending transactions)
        } //end user loop
    }
}

