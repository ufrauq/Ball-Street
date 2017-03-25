---
bg: "planningMainImage.jpeg"
layout: page
title: "Project Plan"
crawlertitle: "BallStreet | Project Plan"
permalink: /project-plan/
summary: "What's the planning behind BallStreet?"
active: Project-Plan
---
# Project Plan
The project was started originally in January and the project duration will be approximately 3 months.  Over the course the next few months, the following features will be developed:<br>
<ul>
<li><i>User Profile</i></li>
<ul><li>Users will be able to login and conduct their trades, and watch the market.</li>
<li>User can view their networth and balance histories in a graph form. </li>
<li>Additional feature:  using data visualization and reporting tools/APIs, each user will be able to create various dashboards tailored to their needs, based on available data (Difficulty in implementing:  medium)</li></ul><br><br>
<li><i>Execution of Trades:</i></li>
<ul><li>Users will be able to buy, sell, and trade player stock with the market or other users </li>
<li>Additional feature:  implementation of various financial instruments, such as options and futures using available data (difficulty in implementing:  medium)</li>
<li>Additional feature:  implementation of machine learning algorithms to assist in optimizing a parameter in the user’s profile, such as maintaining portfolio volatility or maximum portfolio value (difficulty in implementing:  hard)</li></ul><br><br>

<li><i>View Player Information</i></li>
<ul><li>Users will be able to view information about players in addition to their current stock price and networth. </li>
</ul><br><br>

<a href="https://pfindan.github.io/CS2212-Team5/assets/images/2212_Project_Plan.pdf">
<img src= "/CS2212-Team5/assets/images/ganttchart.png" align = "left"/>
<br>

For more details, please see the attached <a href="https://pfindan.github.io/CS2212-Team5/assets/images/2212_Project_Plan.pdf" target = "_blank"> Gantt Chart </a> – task durations have been estimated.
<br><br>
For the authorization of logging in, BallStreet will be using local verification. This is due to the fact that the Twitter API requires a public URL for callback and our project requires running locally. Additionally, BallStreet will use data collected from the MySportsFeeds.com via their API to determine stock prices of players based on game stats, injuries and team wins.<br><br>

<hr>
     
    <i>Stage 2 Update:</i>
   <hr>
    <ul>
    <li><b>Added Features</b> - Leagues: Can create a league with 25 members, join leagues, leave leagues and set passwords   for said leagues. Currently, the leagues page requires refreshing buttons.</li>

<li><b>Adjusted Features:</b> Twitter authentication for login changed to local login authorization due to lack of public URL callback as the project must run locally. </li><br><br>


<li><b>Features to be be implemented:</b></li>
<ul>
  <li>Local Authorization</li>
  <li>Data-Mining</li>
  <li>Execution of Trades</li>
  </ul><br><br>
  </ul>
  
  <hr>
  
  <i><b>Final Updates: </b></i>
  <hr> 
  <ul>
  <li>SQL Database Implementation </li>
  <li>SQL Query Calls </li>
  <li>Calling MySportsFeeds.com API</li>
  <li>Local Authentification Instated </li>
  <li>Auto Page Refreshing </li>
  <li>Marquee Displaying Past Game Scores </li>
  <li>Buying and Selling of Stocks and Verifications</li>
  <li>View Player Data (called info. from database)</li>
  <li>User Profile</li>
  <ul>
  <li>User can login and log out</li>
  <li>A new user can be created</li>
  <li>User can buy and sell stocks to from the market</li>
  </ul>
  <li>Suggested Players</li>
  <li>Transactions</li>
  <ul>
  <li>Pending Transactions (updated every 2 min.)</li>
  <li>Record of all past stock purchases and re-sales</li>
  <li>Linked to graphs on user profile (graphs update when transactions update)</li>
  </ul>
  </ul><br><br>
  Overall, we have implemented all features for the users stories and overcome and adjusted our project according to our
  challenges. For more information on our stage 3 updates, <a href="https://pfindan.github.io/CS2212-Team5/#stage3Updates" target="_blank">visit our homepage, under the stage 3 section.</a>






