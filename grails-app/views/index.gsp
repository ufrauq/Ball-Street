<!doctype html>
<html>
    <head>
        <title>Ball Street</title>
        <link rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.0.23/css/bulma.min.css">
        <link rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel = "stylesheet"
              type = "text/css"
              href="${resource(dir: 'css', file: 'indexStyle.css')}" />
    </head>
    <body>
        <img src="http://downloadicons.net/sites/default/files/basketball-icon-23146.png">
        <div id = "mainTitle">Ball Street</div>
        <p align = "center"> Ball Street is a virtual stock trading platform where users can buy and sell stocks on basketball players. <br>
            Stock prices are valued through a unique algorithm based on player performance and (supply/demand?). <br>
            The market opens at [x] and closes at [x], with prices fluctuating throughout the day to simulate a stock market. <br>
            <br>
            Join a league with your friends or see how you stack up on our global leaderboard.
        </p>

        <div id = "subheading">Try it out!</div>

        <p class="control">
            <input class="input" type="text" placeholder="Username">
        </p>
        <p class="control">
            <input class="input" type="text" placeholder="Password">
        </p>

        <a class = "button" onclick = "window.location.href='/home'">Login</a>
        <a class = "button" onclick = "window.location.href='/home'">Sign Up</a>

		<asset:javascript src="index.bundle.js"/>
    </body>
</html>