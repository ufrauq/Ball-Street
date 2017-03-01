package cs2212.team5

import grails.rest.RestfulController

class LeagueController extends RestfulController {

    //static allowedMethods = [getLeagues: 'POST', createLeague: 'POST']
    static responseFormats = ['json','xml']

    LeagueController() {
        super(League)
    }

    def getLeagues() {
        respond League.findAll()
    }

    def getMyLeagues() {
        def name = params.username
        def user = UserAccount.find{username == name}
        if (user != null) {
            respond user.mydata.leagues
        }
        else {
            response.status = 501
        }
    }

    def joinLeague() {
        def leagueName = params.leagueName
        def password = params.password
        def userName = params.userName
        def league = League.find{name == leagueName}
        def user = UserAccount.find{username == userName}
        if (user != null && league != null) {
            league.numMembers = league.numMembers + 1;
            league.addToMembers(user).save(flush: true)
            user.mydata.addToLeagues(league).save(flush: true)
            response.status = 200
        }
        else {
            response.status = 501
        }
    }

    def getMembers() {
        def leagueName = params.leagueName
        def league = League.find{name == leagueName}
        if (league != null)
            respond league.members
        else
            response.status = 501
    }

    def createLeague() {
        def leagueName = params.leagueName
        def ownerName = params.ownerName
        def password = params.password
        def league = League.find{name == leagueName}
        def leagueOwner = UserAccount.find{username == ownerName}
        if (league == null && leagueOwner != null) {
            def newLeague = new League(owner: leagueOwner, numMembers: 1, name: leagueName, password : password).addToMembers(leagueOwner).save(flush: true)
            leagueOwner.mydata.addToLeagues(newLeague).save(flush: true)
            response.status = 200
        }
        else if (leagueOwner == null) {
            response.status = 501
        }
        else {
            response.status = 502
        }
    }

    def index() { }
}
