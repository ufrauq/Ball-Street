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

    def createLeague() {
        def leagueName = params.leagueName
        def ownerName = params.ownerName
        def league = League.find{name == leagueName}
        def leagueOwner = UserAccount.find{name == ownerName}
        if (league == null && leagueOwner != null) {
            new League(owner: leagueOwner, numMembers: 1, name: leagueName).save()
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
