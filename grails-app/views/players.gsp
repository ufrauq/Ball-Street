<!doctype html>
<html>
<head>
    <title>Ball Street</title>
    <link rel = "stylesheet"
          type = "text/css"
          href="${resource(dir: 'css', file: 'generalStyle.css')}" />
    <link rel = "stylesheet"
          type = "text/css"
          href="${resource(dir: 'css', file: 'players.css')}" />

    <link rel = "stylesheet"
          type = "text/css"
          href="${resource(dir: 'css', file: 'stocks.css')}" />
    <link rel="stylesheet" href="https://unpkg.com/react-select/dist/react-select.css">

    <script>
        function updateData() {
            let token = JSON.parse(localStorage.authObject).access_token;
            fetch("http://localhost:8080/userAccount/getUser?userName=" + name, {method: 'POST', headers: {'Authorization': 'Bearer ' + token}}).then(response => {
                console.log(response.status);
                if (response.ok) {
                    response.json().then(json => {
                        //if successful then store name, balance and netWorth (to be accessed by other pages) and link to home page
                        sessionStorage.setItem("balance", json.balance.toFixed(2));
                        sessionStorage.setItem("netWorth", json.netWorth.toFixed(2));
                        document.getElementById("netWorth").innerHTML = "Net Worth: $" + sessionStorage.getItem("netWorth");
                        document.getElementById("balance").innerHTML = "Balance: $" + sessionStorage.getItem("balance");
                        console.log("Succesfully updated user balance and networth...")
                    });
                }
            });
        }
        if (localStorage.getItem("authObject") === null) {
            window.location.href='/login'
        }
        else {
            updateData();
        }
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
                        document.getElementById("username").innerHTML = sessionStorage.getItem("username");
                    </script>
                </li>
                <li onclick="window.location.href='/settings'">
                    Settings
                </li>
                <li id="netWorth" style=" width:12%; text-align:center" onclick={updateData()}>
                </li>
                <li id="balance" style=" width:10%; text-align:center" onclick={updateData()}>
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
        <button type="button" class="selectedSide" onclick="window.location.href='/players'">Players</button>
        <button type="button" class="sideButtons" onclick="window.location.href='/market'">Stock Market</button>
    </div>

    <div>
        <marquee id="scoresList"></marquee>
        <script>
            document.getElementById("scoresList").innerHTML = "Last Night's Scores: " + sessionStorage.getItem("marquee");
        </script>
    </div>
    <br>
    <div id="contentArea" class="areas">

        <div id="container">
        <h1> Players</h1>
        <div id="chartContainer"></div>
        <asset:javascript src="player.bundle.js"/><br><br><br><br>



        <!--
        <div float="left">
            <h1>Players</h1>
        </div>

        <div float="left">
            <form>
                <input type="text" name="search" placeholder="Search for a player...">
            </form>
        </div>
        <div style="padding: 20px">
            <h2 align="left"> Suggested Players...</h2>
        </div>

        <div id="player">
            <div class="image-cropper" id="pPic" >
                <img src="http://www.trbimg.com/img-55b10e35/turbine/la-et-mn-lebron-james-space-jam-2-warner-bros-20150722" width="150px" >
            </div>

            <div id="pName" >
                <h2>
                    LeBron James <!-- this is where the data base will be accessed to determine the name
                </h2>
            </div>


            <!--Will be implementing a javascript method to change the arrow colours and colour of price
            <div float="left" align="left">
                <h3 id="pChange"  >
                    +50
                </h3>
            </div>

            <div float="right">
                <h2 id="pStockPrice" >
                    $100
                </h2>
            </div>
            <!--<div id="arrow-up" float="right" >
            </div>

        </div>



        <div><br><br></div>

        <div id="player">
            <div class="image-cropper" id="pPic"  padding-top="20px">
                <img src="http://www.trbimg.com/img-55b10e35/turbine/la-et-mn-lebron-james-space-jam-2-warner-bros-20150722" width="150px" >
            </div>

            <div id="pName" >
                <h2>
                    LeBron James <!-- this is where the data base will be accessed to determine the name
                </h2>
            </div>


            <!--Will be implementing a javascript method to change the arrow colours and colour of price
            <div float="left" align="left">
                <h3 id="pChange"  >
                    +50
                </h3>
            </div>

            <div float="right">
                <h2 id="pStockPrice" >
                    $100
                </h2>
            </div>
            <!--<div id="arrow-up" float="right" >
            </div> -->
        </div>

        </div>



        <div><br><br><br></div>


<br>




    </div>
</div>
</body>
</html>