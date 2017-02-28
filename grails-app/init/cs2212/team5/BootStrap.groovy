package cs2212.team5

class BootStrap {

    def init = { servletContext ->
        new UserAccount(name: "Zain", money: 100, netWorth: 100).save()
        def zain = UserAccount.find{name == "Zain"}
        def l = new League(owner: zain, numMembers: 1, name: "test").save()
        def m = new League(owner: zain, numMembers: 1, name: "The Best League").save()
        def matt = new UserAccount(name: "Matt", money: 100, netWorth: 100).save()
        l.addToMembers(zain)
        l.addToMembers(matt)
        m.addToMembers(matt)
    }
    def destroy = {
    }
}
