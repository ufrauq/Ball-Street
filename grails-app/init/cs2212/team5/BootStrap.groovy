package cs2212.team5

class BootStrap {

    def init = { servletContext ->
        /*def global = new League(numMembers: 0, name: "Global Leaderboard").save()
        def zain = new UserAccount(username: "Zain", money: 100, netWorth: 100, password: "password").save()

        def l = new League(owner: zain, numMembers: 1, name: "test").save()
        def m = new League(owner: zain, numMembers: 1, name: "The Best League", password: "a").save()

        def zaindata = new UserData()
        zaindata.addToLeagues(global)
        zaindata.addToLeagues(l)
        zain.mydata = zaindata

        def mattdata = new UserData()
        mattdata.addToLeagues(global)
        mattdata.addToLeagues(l)
        mattdata.addToLeagues(m)
        def matt = new UserAccount(username: "Matt", money: 100, netWorth: 100, password: "password", mydata: mattdata).save()

        l.addToMembers(zain)
        l.addToMembers(matt)
        l.numMembers = l.numMembers + 1;

        global.addToMembers(zain)
        global.addToMembers(matt)
        global.numMembers = global.numMembers + 2;

        m.addToMembers(matt)*/
    }
    def destroy = {
    }
}
