package cs2212.team5

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController

@Secured(['ROLE_USER'])
class TransactionController extends RestfulController {

    static allowedMethods = [getPastTransactions: 'POST', getPendingTransactions: 'POST', createTransaction: 'POST', deleteTransaction: 'POST']
    static responseFormats = ['json']

    def springSecurityService

    TransactionController() {
        super(Transaction)
    }

    def getPastTransactions() {
        def userName = springSecurityService.currentUser.username
        def user = UserAccount.find{username == userName}
        if (user != null) {
            respond user.transactions.findAll{it.tStatus == "closed" || it.tStatus == "failed"}.sort{it.transactionID}
        }
        else {
            response.status = 501
        }
    }

    def getPendingTransactions() {
        def userName = springSecurityService.currentUser.username
        def user = UserAccount.find{username == userName}
        if (user != null) {
            respond user.transactions.findAll{it.tStatus == "open"}.sort{it.transactionID}
        }
        else {
            response.status = 501
        }
    }

    def deleteTransaction() {
        def id = Integer.parseInt(params.id)
        def userName = springSecurityService.currentUser.username
        def user = UserAccount.find{username == userName}
        def transaction = user.transactions.find{transactionID = id}
        if (user == null) {
            response.status = 501
        }
        else if (transaction != null) {
            def cost = transaction.stockPrice*transaction.stockQuantity
            if (transaction.tType == "buy") {
                user.balance = user.balance + cost
                user.removeFromTransactions(transaction)
                transaction.delete(flush: true)
                user.save(flush: true)
                removeFromPortfolio(user, transaction.stockFirstName, transaction.stockLastName, transaction.stockQuantity)
            }
            else if (transaction.tType == "sell") {
                if (user.balance < cost) {
                    response.status = 502 //insufficient funds
                }
                else {
                    user.balance = user.balance - cost
                    transaction.delete(flush: true)
                    user.save(flush: true)
                    addToPortfolio(user, transaction.stockFirstName, transaction.stockLastName, transaction.stockQuantity)
                }
            }
        }
        else {
            response.status = 503
        }
    }

    def createTransaction() {
        def fName = params.firstName
        def lName = params.lastName
        def quantity = Integer.parseInt(params.quantity)
        def price = Double.parseDouble(params.price)
        def tType = params.tType
        def userName = springSecurityService.currentUser.username
        def user = UserAccount.find{username == userName}
        if (user == null) {
            response.status = 501
        }
        else {
            if (tType == "buy") {
                if (user.balance < price*quantity) {
                    response.status = 502 //insufficient funds
                }
                else {
                    def currentDate = new Date()
                    user.transactionCount = user.transactionCount + 1
                    def newTransaction = new Transaction(tType: "buy", tStatus: "open", transactionOpened: currentDate, stockFirstName: fName, stockLastName: lName, stockPrice: price, stockQuantity: quantity, transactionID: user.transactionCount, balanceBefore: user.balance, creator: user).save()
                    System.out.println(user.balance)
                    user.balance = user.balance - quantity*price
                    System.out.println(user.balance)
                    user.addToTransactions(newTransaction).save(flush: true)
                    addToPortfolio(user, fName, lName, quantity)
                }
            }
            else if (tType == "sell") {
                System.out.println(user.portfolio)
                def stock = user.portfolio.find{it.stockFirstName == fName && it.stockLastName == lName}
                if (stock != null) {
                    if (quantity > stock.quantityOwned) {
                        response.status = 503 //insufficient quantity
                    }
                    else {
                        def currentDate = new Date()
                        user.transactionCount = user.transactionCount + 1
                        def newTransaction = new Transaction(tType: "sell", tStatus: "open", transactionOpened: currentDate, stockFirstName: fName, stockLastName: lName, stockPrice: price, stockQuantity: quantity, transactionID: user.transactionCount, balanceBefore: user.balance, creator: user).save()
                        user.balance = user.balance + quantity*price
                        user.addToTransactions(newTransaction).save(flush: true)
                        removeFromPortfolio(user, fName, lName, quantity)
                    }
                }
                else {
                    response.status = 504
                }
            }
            else {
                response.status = 505
            }
        }
    }

    def addToPortfolio(UserAccount user, String fName, String lName, int quantity) {
        def stock = user.portfolio.find{it.stockFirstName == fName && it.stockLastName == lName}
        System.out.println("add " + stock)
        if (stock != null) {
            stock.quantityOwned = stock.quantityOwned + quantity
            System.out.println(stock.quantityOwned)
            stock.save(flush: true)
        }
        else {
            def newStock = new Stock(stockFirstName: fName, stockLastName: lName, quantityOwned: quantity, owner: user).save()
            user.addToPortfolio(newStock).save(flush: true)
        }
    }

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

    def index() { }
}
