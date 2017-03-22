<!doctype html>
<html>
<head>
    <title>Ball Street</title>
    <link rel = "stylesheet"
          type = "text/css"
          href="${resource(dir: 'css', file: 'generalStyle.css')}" />
    <link rel = "stylesheet"
          type = "text/css"
          href="${resource(dir: 'css', file: 'leagueStyle.css')}" />
    <script>
        function checkAuth() {
            if (localStorage.getItem("authObject") === null) {
                window.location.href='/login'
            }
        }
        window.onload = checkAuth;
    </script>
</head>
<body>
<div id="main">
    <div id="topMenu" >
        <div >
            <ul>
                <li style="float: left;width: 60px; padding: 18px 20px" onclick="window.location.href='/home'">
                    <img src="http://downloadicons.net/sites/default/files/basketball-icon-23146.png" width="45px">
                </li>
                <li style="float: left;width: 15%" onclick="window.location.href='/home'" id="username">
                    <img src="http://downloadicons.net/sites/default/files/basketball-icon-23146.png" width="15px">
                    <script>
                        /*document.getElementById("username").innerHTML = document.getElementById("username").innerHTML + "       "+ sessionStorage.getItem("username");*/
                        document.getElementById("username").innerHTML = sessionStorage.getItem("username");
                    </script>
                </li>
                <li onclick="window.location.href='/settings'">
                    Settings
                </li>
                <li id="netWorth" style=" width:12%; text-align:center">
                    <script>
                        document.getElementById("netWorth").innerHTML = "Net Worth: $" + sessionStorage.getItem("netWorth");
                    </script>

                </li>
                <li id="balance" style=" width:10%; text-align:center">
                    <script>
                        document.getElementById("balance").innerHTML = "Balance: $" + sessionStorage.getItem("balance");
                    </script>
                </li>
                <li onclick="window.location.href='/transactions'">
                    Transactions
                </li>
            </ul>
        </div>
    </div>

    <div id="sideMenu" class="areas" >
        <button type="button" class="sideButtons" onclick="window.location.href='/stocks'">Stocks</button>
        <button type="button" class="selectedSide" onclick="window.location.href='/leagues'">Leagues</button>
        <button type="button" class="sideButtons" onclick="window.location.href='/players'">Players</button>
        <button type="button" class="sideButtons" onclick="window.location.href='/market'">Stock Market</button>
    </div>

    <div>
        <marquee>Click the refresh button to see league changes!</marquee>
    </div>
    <br>
    <div id="contentArea" class="areas">
        <div id="leaguePage" align="left"></div>
        <asset:javascript src="leagues.bundle.js"/>
    </div>
</div>
</body>
</html>