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
        //testing if user with given username exists
        def user = UserAccount.find{username == name}
        if (user != null) { //if user exists
            respond user.mydata.leagues
        }
        else {
            response.status = 501 //user does not exist (failure)
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
        //testing if user and league exist
        def league = League.find{name == leagueName}
        def user = UserAccount.find{username == userName}

        //if both user and league exist and the league is not full (or maxMembers is -1 implies infinite size league)
        if (user != null && league != null && (league.numMembers < league.maxMembers || league.maxMembers == -1)) {
            if (league in user.mydata.leagues) {
                response.status = 501 //user is already in the league (failure)
            }
            else {
                if (league.password == "" || league.password == null) { //if league had no password, add user (success)
                    league.numMembers = league.numMembers + 1;
                    league.addToMembers(user).save(flush: true)
                    user.mydata.addToLeagues(league).save(flush: true)
                    response.status = 200
                }
                else { //else league has password
                    if (league.password == pass) { //is password is correct, add user (success)
                        league.numMembers = league.numMembers + 1;
                        league.addToMembers(user).save(flush: true)
                        user.mydata.addToLeagues(league).save(flush: true)
                        response.status = 200
                    }
                    else {
                        response.status = 502 //league password is incorrect (failure)
                    }
                }
            }
        }
        else {
            response.status = 503 //league/user do not exist or full league (failure)
        }
    }

    /**
     * Controller method which, given a league name and username, attempts to remove the user from the league
     * @return success or failure status
     */
    def leaveLeague() {
        def leagueName = params.leagueName
        def userName = params.userName
        //testing if user and league exist
        def league = League.find{name == leagueName}
        def user = UserAccount.find{username == userName}

        if (user != null && league != null) { //if user and league exist
            if (league in user.mydata.leagues) { //if user is in leagues, remove user (success)
                user.mydata.removeFromLeagues(league).save(flush: true)
                if (league.numMembers == 1) { //if the user is the last user in the league, then set members to null
                    league.numMembers = league.numMembers - 1
                    league.members = null
                    league.save(flush: true)
                }
                else { //user is not last user in league
                    league.numMembers = league.numMembers - 1
                    league.removeFromMembers(user).save(flush: true)
                }
                response.status = 200
            }
            else {
                response.status = 502 //user is not in the league (failure)
            }
        }
        else {
            response.status = 501 //league/user do not exist (failure)
        }
    }

    /**
     * Controller method which returns the members of a given league
     * @return members of league
     */
    def getMembers() {
        def leagueName = params.leagueName
        //testing if league exists
        def league = League.find{name == leagueName}
        if (league != null) //if league exists
            respond league.members
        else
            response.status = 501 //league does not exist (failure)
    }

    /**
     * Controller method which, given a league name, owner username, and password, attempts to create a league with the given data
     * @return success or failure status
     */
    def createLeague() {
        def leagueName = params.leagueName
        def ownerName = params.ownerName
        def pass = params.password
        //testing if league does not exist and owner does exist
        def league = League.find{name == leagueName}
        def leagueOwner = UserAccount.find{username == ownerName}

        if (league == null && leagueOwner != null) { //if league does not exist and owner exists, create new league (success)
            def newLeague = new League(owner: leagueOwner, numMembers: 1, maxMembers: 25, name: leagueName, password : pass).addToMembers(leagueOwner).save(flush: true)
            leagueOwner.mydata.addToLeagues(newLeague).save(flush: true)
            response.status = 200
        }
        else if (leagueOwner == null) {
            response.status = 501 //owner does not exist (failure)
        }
        else {
            response.status = 502 //league already exists (failure)
        }
    }

    def index() { }
}
