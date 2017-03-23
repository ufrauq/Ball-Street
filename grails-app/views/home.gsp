<!doctype html>
<html>
<head>
    <title>Ball Street</title>
    <link rel = "stylesheet"
          type = "text/css"
          href="${resource(dir: 'css', file: 'generalStyle.css')}" />
    <link rel = "stylesheet"
          type = "text/css"
          href="${resource(dir: 'css', file: 'home.css')}" />
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
        <button type="button" class="sideButtons" onclick="window.location.href='/leagues'">Leagues</button>
        <button type="button" class="sideButtons" onclick="window.location.href='/players'">Players</button>
        <button type="button" class="sideButtons" onclick="window.location.href='/market'">Stock Market</button>
    </div>

    <div>
        <marquee>Welcome to BallStreet!  Past game scores will be displayed here!</marquee>
    </div>
    <br>
    <div id="contentArea" class="areas">

        <h1 id="profileName">Profile:</h1>
        <script>
            /*document.getElementById("username").innerHTML = document.getElementById("username").innerHTML + "       "+ sessionStorage.getItem("username");*/
            document.getElementById("profileName").innerHTML =  sessionStorage.getItem("username");
        </script>

        <div id="left" >
            <div id="left-top">
                <img class="profile" src="https://openclipart.org/download/247319/abstract-user-flat-3.svg" width = "200px" align="left">

                <h2 id="money_id" align = "right">Net Worth:</h2>
                <script>
                    document.getElementById("money_id").innerHTML = "Net Worth: $" + sessionStorage.getItem("netWorth");
                </script>


                <h2 id="cash_id" align="right">Cash:</h2>
                <script>
                    document.getElementById("cash_id").innerHTML = "Money: $" + sessionStorage.getItem("cash");
                </script>
            </div>
        </div>

        <div id="chartContainer"></div>
        <asset:javascript src="home.bundle.js"/>

    </div>
</div>
</body>
</html>