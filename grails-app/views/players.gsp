<!doctype html>
<html>
<head>
    <title>Ball Street</title>
    <link rel = "stylesheet"
          type = "text/css"
          href="${resource(dir: 'css', file: 'generalStyle.css')}" />
</head>
<body>
<div id="main">
    <div id="topMenu" class="areas">
        <div id="userData">
            <div id="circle"></div>
            <button id="username" type="button" class="topButtons" onclick="window.location.href='/home'">Username</button>
            <script>
                document.getElementById("username").innerHTML = sessionStorage.getItem("username");
            </script>
        </div>
        <div id="topButtons">
            <button id="trades" type="button" class="topButtons" onclick="window.location.href='/trades'">
                Stock Trade Requests
            </button>
            <button id="money" type="button" class="topButtons">
                Cash: $0
            </button>
            <button id="money2" type="button" class="topButtons">
                Net Worth: $0
            </button>
            <button id="settings" type="button" class="topButtons" onclick="window.location.href='/settings'">
                Settings
            </button>
            <script>
                document.getElementById("money").innerHTML = "Cash: $" + sessionStorage.getItem("cash");
                document.getElementById("money2").innerHTML = "Net Worth: $" + sessionStorage.getItem("netWorth");
            </script>
        </div>
    </div>
    <div id="sideMenu" class="areas">
        <button type="button" class="sideButtons" onclick="window.location.href='/stocks'">Stocks</button>
        <div class="line"></div>
        <button type="button" class="sideButtons" onclick="window.location.href='/leagues'">Leagues</button>
        <div class="line"></div>
        <button type="button" class="selectedSide" onclick="window.location.href='/players'">Players</button>
        <div class="line"></div>
        <button type="button" class="sideButtons" onclick="window.location.href='/market'">Stock Market</button>
    </div>
    <div id="contentArea" class="areas">
        Player profile...
        <asset:javascript src="index.bundle.js"/>
    </div>
</div>
</body>
</html>