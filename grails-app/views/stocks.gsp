<!doctype html>
<html>
<head>
    <title>Ball Street</title>
    <link rel = "stylesheet"
          type = "text/css"
          href="${resource(dir: 'css', file: 'generalStyle.css')}" />
    <link rel = "stylesheet"
          type = "text/css"
          href="${resource(dir: 'css', file: 'stocks.css')}" />
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
                        document.getElementById("username").innerHTML = sessionStorage.getItem("username");
                    </script>
                </li>
                <li onclick="window.location.href='/settings'">
                    Settings
                </li>
                <li id="money2" style=" width:12%; text-align:center">
                    Networth: $
                    <script>
                        document.getElementById("money2").innerHTML = "Net Worth: $" + sessionStorage.getItem("netWorth");
                    </script>

                </li>
                <li id="money" style=" width:10%; text-align:center">
                    Cash: $
                    <script>
                        document.getElementById("money").innerHTML = "Cash: $" + sessionStorage.getItem("cash");
                    </script>
                </li>
                <li onclick="window.location.href='/trades'">
                    Stock Trades
                </li>
            </ul>
        </div>
    </div>

    <div id="sideMenu" class="areas" >
        <button type="button" class="selectedSide" onclick="window.location.href='/stocks'">Stocks</button>
        <button type="button" class="sideButtons" onclick="window.location.href='/leagues'">Leagues</button>
        <button type="button" class="sideButtons" onclick="window.location.href='/players'">Players</button>
        <button type="button" class="sideButtons" onclick="window.location.href='/market'">Stock Market</button>
    </div>

    <div>
        <marquee>Welcome to BallStreet!  Past game scores will be displayed here!</marquee>
    </div>
    <br>
    <div id="contentArea" class="areas">
        <h1>My Stocks</h1>

        <div id="player">
            <div class="image-cropper" id="pPic" >
                <img src="http://www.trbimg.com/img-55b10e35/turbine/la-et-mn-lebron-james-space-jam-2-warner-bros-20150722" width="150px" >
            </div>

            <div id="pName" >
                <h2>
                    LeBron James <!-- this is where the data base will be accessed to determine the name-->
                </h2>
            </div>


             <!--Will be implementing a javascript method to change the arrow colours and colour of price-->
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



        <div><br><br></div>

        <div id="player">
            <div class="image-cropper" id="pPic" >
                <img src="http://www.trbimg.com/img-55b10e35/turbine/la-et-mn-lebron-james-space-jam-2-warner-bros-20150722" width="150px" >
            </div>





            <div id="pName" >
                <h2>
                    LeBron James <!-- this is where the data base will be accessed to determine the name-->
                </h2>
            </div>


            <!--Will be implementing a javascript method to change the arrow colours and colour of price-->
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


        <div><br><br></div>

        <div id="player">
            <div class="image-cropper" id="pPic" >
                <img src="http://www.trbimg.com/img-55b10e35/turbine/la-et-mn-lebron-james-space-jam-2-warner-bros-20150722" width="150px" >
            </div>





            <div id="pName" >
                <h2>
                    LeBron James <!-- this is where the data base will be accessed to determine the name-->
                </h2>
            </div>


            <!--Will be implementing a javascript method to change the arrow colours and colour of price-->
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

        <div><br><br></div>

        <div id="player">
            <div class="image-cropper" id="pPic" >
                <img src="http://www.trbimg.com/img-55b10e35/turbine/la-et-mn-lebron-james-space-jam-2-warner-bros-20150722" width="150px" >
            </div>





            <div id="pName" >
                <h2>
                    LeBron James <!-- this is where the data base will be accessed to determine the name-->
                </h2>
            </div>


            <!--Will be implementing a javascript method to change the arrow colours and colour of price-->
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

        <div><br><br></div>

        <div id="player">
            <div class="image-cropper" id="pPic" >
                <img src="http://www.trbimg.com/img-55b10e35/turbine/la-et-mn-lebron-james-space-jam-2-warner-bros-20150722" width="150px" >
            </div>





            <div id="pName" >
                <h2>
                    LeBron James <!-- this is where the data base will be accessed to determine the name-->
                </h2>
            </div>


            <!--Will be implementing a javascript method to change the arrow colours and colour of price-->
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

        <div><br><br></div>
        <div width="80%">

            <div float="left" align="left" style="margin-left:20px; width:300px">
                <h2><< Last Page</h2>
            </div>

            <div float="left" align="right" style="margin-right:20px; width:20%">
                <h2>Next Page >></h2>
            </div>

        </div>



    </div>






</div>
</body>
</html>