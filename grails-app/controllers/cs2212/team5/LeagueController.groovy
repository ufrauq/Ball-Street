package cs2212.team5

import grails.rest.RestfulController

class LeagueController extends RestfulController {

    //static allowedMethods = [getLeagues: 'POST', createLeague: 'POST']
    static responseFormats = ['json','xml']

    LeagueController() {
        super(League)
    }

    /**
     * Controller method which returns leagues
     * @return all leagues
     */
    def getLeagues() {
        respond League.findAll()
    }

    /**
     * Controller method which returns the leagues belonging to a given username
     * @return leagues belonging to username
     */
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

    /**
     * Controller method which, given a league name, username, and password, attempts to add user to the league
     * @return success or failure status
     */
    def joinLeague() {
        def leagueName = params.leagueName
        def pass = params.password
        def userName = params.userName
        def league = League.find{name == leagueName}
        def user = UserAccount.find{username == userName}
        if (user != null && league != null && (league.numMembers < league.maxMembers || league.maxMembers == -1)) {
            if (league in user.mydata.leagues) {
                response.status = 501
            }
            else {
                if (league.password == "" || league.password == null) {
                    league.numMembers = league.numMembers + 1;
                    league.addToMembers(user).save(flush: true)
                    user.mydata.addToLeagues(league).save(flush: true)
                    response.status = 200
                }
                else {
                    if (league.password == pass) {
                        league.numMembers = league.numMembers + 1;
                        league.addToMembers(user).save(flush: true)
                        user.mydata.addToLeagues(league).save(flush: true)
                        response.status = 200
                    }
                    else {
                        response.status = 502
                    }
                }
            }
        }
        else {
            response.status = 503
        }
    }

    /**
     * Controller method which, given a league name and username, attempts to remove the user from the league
     * @return success or failure status
     */
    def leaveLeague() {
        def leagueName = params.leagueName
        def userName = params.userName
        def league = League.find{name == leagueName}
        def user = UserAccount.find{username == userName}
        if (user != null && league != null) {
            if (league in user.mydata.leagues) {
                user.mydata.removeFromLeagues(league).save(flush: true)
                if (league.numMembers == 1) {
                    league.numMembers = league.numMembers - 1
                    league.members = null
                    league.save(flush: true)
                }
                else {
                    league.numMembers = league.numMembers - 1
                    league.removeFromMembers(user).save(flush: true)
                }
                response.status = 200
            }
            else {
                response.status = 502
            }
        }
        else {
            response.status = 501
        }
    }

    /**
     * Controller method which returns the members of a given league
     * @return members of league
     */
    def getMembers() {
        def leagueName = params.leagueName
        def league = League.find{name == leagueName}
        if (league != null)
            respond league.members
        else
            response.status = 501
    }

    /**
     * Controller method which, given a league name, owner username, and password, attempts to create a league with the given data
     * @return success or failure status
     */
    def createLeague() {
        def leagueName = params.leagueName
        def ownerName = params.ownerName
        def pass = params.password
        def league = League.find{name == leagueName}
        def leagueOwner = UserAccount.find{username == ownerName}
        if (league == null && leagueOwner != null) {
            def newLeague = new League(owner: leagueOwner, numMembers: 1, maxMembers: 25, name: leagueName, password : pass).addToMembers(leagueOwner).save(flush: true)
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
