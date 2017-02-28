package cs2212.team5

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/index")
        "/home"(view:"/home")
        "/trades"(view:"/trades")
        "/settings"(view:"/settings")
        "/stocks"(view:"/stocks")
        "/leagues"(view:"/leagues")
        "/players"(view:"/players")
        "/market"(view:"/market")
        "500"(view:'/error')
        "404"(view:'/notFound')
    }
}
