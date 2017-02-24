package cs2212.team5

class BootStrap {

    def init = { servletContext ->
        new UserAccount(name: "Zain", money: 100, netWorth: 100).save()
        def zain = UserAccount.find{name == "Zain"}
        new League(owner: zain, numMembers: 1, name: "League #1").save()
        new League(owner: zain, numMembers: 1, name: "League #2").save()
    }
    def destroy = {
    }
}
