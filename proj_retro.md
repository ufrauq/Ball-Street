---
bg: "luckyCharms.jpeg"
layout: page
title: "Project Retrospective"
crawlertitle: "BallStreet | Project Retrospective"
permalink: /project-retrospective/
summary: "Look back at it"
active: Project-Retrospective
---
# Project Retrospective

<h3> WorkFlow 
<hr>
</h3>
<p> <b><i>What was the process or branching model each person used to pull, develop and push? </i></b>
<br>
Each person worked on their own development branch, called 'zain_dev' or 'madi_dev', then pushed their changes to GitHub to maintain version control. We fetched and merged each other's branches to build on our features. With mostly complete features, that we wanted everyone to have, we merged to the 'rendezvous' branch. For each stage, we created a pull request from 'rendezvous' in to 'master', which Daniel had to approve in order to keep the master branch clean. Stable code and features live in the master branch.
<br><br>
<b><i>What development tools/frameworks did your project use?</i></b>
<br>
Our back-end was written in Groovy and Java using Grails and used an SQL database hosted on Amazon Web Services. Our front-end was written in HTML, CSS (partially with bulma), and JavaScript using ReactJS and other JavaScript libraries (recharts, react-select...).<br><br>
We used git for version control, GitHub for hosting, Gradle for build automation, webpack for module bundling, Node Package Manager (npm) for package installation and our development took place in IntelliJ.
<br><br>

<b><i>How effectively did your team manage task distribution among team members?</i></b>
<br>
Our team effectively managed task distribution among members as tasks were assigned weekly to members so they knew what they were to accomplish by the next meeting. If the task a team member was given a task they could not complete, another team member could help out at the next meeting, provide assistance over Slack or the task would be re-assigned to another member with the original member being given a new task. 

</p>

<br>

<h3> MVC / Design Patterns </h3>
<hr>
<p>  <i>Describe how you made use of design patterns to help with the design and implementation of your project.</i></p>

<b><i>What is the relationship between user interfaces, application logic, and data in your project?</i></b>
    The user interfaces interact with our data through controller classes through REST requests. The application logic resides mostly within the controller classes, and a service class which directly call upon and manipulate the data. Along with this, our SQL database contains a stored procedure which deals with the application logic required for updating stock prices, and it is what manipulates the SQL database.

<br>

<b><i>Did you implement your server-side program as a REST API?</i></b>
<br>
The server-side of our program is implemented using a REST API. The user interface only communicates with the back-end through ambiguous REST requests - where the client-side need not know how the back-end functions, only the syntax of the REST requests, the parameters, and the response format


<b><i>Which collection of classes serve as the M, V, and C in MVC?</i></b>
<br>
M(odel): League, PlayerProfile, PlayerSummary, Stock, Transaction, UserAccount <br><br>
V(iew): Home, Index, Leagues, Login, Market, Players, Settings, Stocks, Trades, Transactions<br><br>
C(ontroller): LeagueController, PlayerController, PortfolioController, ScoreController, TransactionController, UpdateController, UserAccountController
<br><br>


<b><i>How do these classes communicate with each other? Give an example based on a user action.</i></b>
<br>
For our project, BallStreet, we had a limited number of domain (or model) classes as the large portion of our back-end was powered by our SQL database. As an example of interaction between our domain classes, when the user creates a League, the League is added to the UserAccount which has many Leagues, and the UserAccount is added to the League which has many UserAccounts (members).

<br><br>

<b><i>If you were to start the project again today, what aspects of code organization could be improved in your project?</i></b>
<br>
One major change that would improve the project would be migrating all data storage to the SQL Server and bringing all application logic inside Grails to be called upon by the main method. This would simplify and streamline the organization of the project and allow transactions and other data to be directly linked to the player they are in relation to, instead of by name. This would also require redesigning our SQL implementation using proper SQL practices.

<br>

<h3> Refactor Retrospective </h3>
<hr>
<p>  Areas of your design that you felt were strong: </p>

<br>


<h3> Project Retrospective </h3>
<hr>
<p>  Project Retrospective information here. </p>

<br>

