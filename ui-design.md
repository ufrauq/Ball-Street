---
bg: "UIDesignImg.jpg"
layout: page
title: "UI Design"
crawlertitle: "UI Design for BallStreet"
permalink: /ui-design/
summary: "How will users interact with BallStreet?"
active: ui-design
---

# UI Design




BallStreet's user interface is going to be simplistic and minimalistic to provide an easy to navigate platform and focus on the applications functionality. The colour scheme will be a combination of red and grey with a few additional accent colours such as blue and yellow. The user dashboard has words in addition to small icons to help ease the navigation through the application. <br><br>
The dashboard includes the following pages: 
<ul> 
<li> Profile Information</li>
<li> User Player Stocks Owned</li>
<li> Graphs of Player Stocks Performance</li>
<li> BasketStreet Stock Market </li> 
<li> Request for Trades from other Players</li>
</ul>
<br>


<h2>Here are some examples of BallStreets UI: </h2><br>


<h3 id="loginScreen"> Login Screen </h3>
<img src= "/CS2212-Team5/assets/images/BallStreetLogin2.jpg" width = "600px" ><br><br>
The image above will be used as the login screen for BallStreet. From this screen, the user can select "Sign Up" to create a new user profile. Once this button is clicked, they will be sent to a new screen to create a profile. If the user already has an account set up, the user can login in easily by typing in their username and password and selecting "Login In". The login in process will be powered by the Twitter login authorization API. Once logged in properly, the user will be able to access their account <a href="#userDashboard">dashboard </a>and start making trades. <br><br> 

<h3 id="createNewProfile"> Create New Profile </h3>
<!--<img src= "/CS2212-Team5/assets/images/BallStreetDashBoard1.jpg" width = "600px" ><br><br>-->
On this screen, the user will be able to create a new user profile. The user will be asked to input their first and last names, their date of birth, and be asked to create a username and password. The Twitter API will enusre that each user has their own unique username. Once all the info is entered, the user can click the "Create Profile" button, which will redirect them to their <a href="#userDashboard">dashboard </a>or will produce an error and ask the user to review the information they entered. Once the user has successfully created, they will be emailed a "Thank You" email which includes their username and password.  <br><br>


<h3 id="userDashboard"> User Dashboard </h3>
<img src= "/CS2212-Team5/assets/images/BallStreetDashBoard1.jpg" width = "600px" ><br><br>
The user dashboard will be the main screen for the BallStreet application. From this screen, the user will be able to access the <a herf="playerStockMarket">player stock market </a>, their stocks, their current balance and past transactions, profile settings and their current stock trade requests from other users.  <br><br>

<h3 id="playerStockMarket"> Player Stock Market </h3>
<!--<img src= "/CS2212-Team5/assets/images/BallStreetDashBoard1.jpg" width = "600px" ><br><br> -->
The player stock market will consist of the current stocks trading the highest with a search bar function to search for a specific player. Each player on the market will have a small profile image, there most recent game stats, a purchase button and an arrow indictating their trade status. Once the player profile is selected, the user will be seen to the specific player page which will display various pieces of infomation about the player to allow the user to make an informed disicion about the stock. The player profile page will include a button to purchase stock. 
