---
bg: "luckyCharms.jpeg"
layout: page
title: "Project Retrospective"
crawlertitle: "BallStreet | Project Retrospective"
permalink: /project-retrospective/
summary: "Look back at Our Project"
active: Project-Retrospective
---
# Project Retrospective

Our project video is on our homepage or can be accessed by  <a href="https://www.youtube.com/watch?v=H-_R2Tcgrr0">clicking here.</a> 

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
<p> <b> <i>Describe how you made use of design patterns to help with the design and implementation of your project.</i></b></p>

<b><i>What is the relationship between user interfaces, application logic, and data in your project?</i></b>
    The user interfaces interact with our data through controller classes through REST requests. The application logic resides mostly within the controller classes, and a service class which directly call upon and manipulate the data. Along with this, our SQL database contains a stored procedure which deals with the application logic required for updating stock prices, and it is what manipulates the SQL database.
<br>

<b><i>Did you implement your server-side program as a REST API?</i></b>
<br>
The server-side of our program is implemented using a REST API. The user interface only communicates with the back-end through ambiguous REST requests - where the client-side need not know how the back-end functions, only the syntax of the REST requests, the parameters, and the response format


<b><i>Which collection of classes serve as the M, V, and C in MVC?</i></b>
<br>
<b>M(odel):</b> League, PlayerProfile, PlayerSummary, Stock, Transaction, UserAccount <br><br>
<b>V(iew):</b> Home, Index, Leagues, Login, Market, Players, Settings, Stocks, Trades, Transactions<br><br>
<b>C(ontroller):</b> LeagueController, PlayerController, PortfolioController, ScoreController, TransactionController, UpdateController, UserAccountController
<br><br>


<b><i>How do these classes communicate with each other? Give an example based on a user action.</i></b>
<br>
For our project, BallStreet, we had a limited number of domain (or model) classes as the large portion of our back-end was powered by our SQL database. As an example of interaction between our domain classes, when the user creates a League, the League is added to the UserAccount which has many Leagues, and the UserAccount is added to the League which has many UserAccounts (members).

<br>

<b><i>If you were to start the project again today, what aspects of code organization could be improved in your project?</i></b>
<br>
One major change that would improve the project would be migrating all data storage to the SQL Server and bringing all application logic inside Grails to be called upon by the main method. This would simplify and streamline the organization of the project and allow transactions and other data to be directly linked to the player they are in relation to, instead of by name. This would also require redesigning our SQL implementation using proper SQL practices.



<h3> Refactor Retrospective </h3>
<hr>
<p><i>  <b>Areas of your design that you felt were strong: </b></i><br>

Although there were many drawbacks to our SQL implementation, the overall design of our project was decent. The SQL implementation of player data allowed us to have many benefits and the ability to implement a few features very easily. One of the features that benefited from the SQL database implementation was searchability of our stock market. SQL allows us to easily execute queries based upon a keyword and efficiently return the results to display on our front-end. This enabled us to implement a seemingly complex feature in a  matter of minutes.<br><br>
Another instance of good design stemmed from the UserAccount class, which contained all user data. This meant that all of the controller classes could access the user’s data given the username and using the find method. The use of spring security tokens allowed us to extract the username when simply given the token from the front-end. This worked well in terms of security, but also makes it very easy when writing controller classes to access any data given just a token. This heavily simplified retrieving a user’s data since all of the data is directly associated with the UserAccount (leagues, transactions, stocks). This also allowed for the addition of data to the user is be easily implemented, and this was helpful when implementing the user’s portfolio and transactions in the latter part of the project.


<br><br>

<p><b> <i>Areas of your design that you felt were weak:</i></b><br>
As the project came to an end, there were many “hacks” we had to use in order to get a working product done within our given time constraints. The biggest example of this would be our SQL implementation. To preface, some of the members in charge of working on the SQL had no experience or knowledge pertaining to SQL. This lead to the use of many poor  practices in the implementation, including the addition of columns, updating of rows, and dropping of tables. As an example, the table for the daily scores is dropped and replaced with the new data daily. Although we employed some poor practices, at the end of the day the implementation worked, which was the major goal for this project.<br><br>

Another instance of poor design would be the method in which user’s data is stored. Originally, we intended to have a UserAccount class which would contain all the data regarding a user. However, after the second stage we decided to implement a local authentication system. This authentication system included some already defined classes such as User, which stores the username and password. At this point, we had already implemented the UserAccount class, so instead of figuring out a way of merging the two together we left them separate and they are simply related by identical username fields.<br><br>

The implementation of transaction updating was very crude and hacked together as well. It was implemented using an infinite loop in the main method of our program that would call upon an update every few minutes. The problem here was that we needed to call upon a service class which would modify data to complete transactions. In the end, we implemented an updateController which contained a method which  called the service class, this update method was then called from the main using an HTTP request. This was done because we were unable to find a way to directly call upon the service class from the main. This means that anyone could call upon this update method whenever they want because it is not an internal call.<br><br>



<h3> Project Retrospective </h3>
<hr>
<p> <i> <b>What did your group do well?</b> </i><br>
The user-interface matched well with the assigned user stories.  Additionally, our meeting minutes were captured accurately and tasks were assigned with individual resources’ needs/wants in mind. We worked well to communicate with group members over Slack. 


<br><br>
<b><i> What could your group have done better?</i></b><br>
An area of improvement would be a redesign of the team’s SQL back end either using a top-down or bottom-up approach after deciding on the master data (e.g. schemas, elements, scheduled updates, etc.).
Also could have spent more time deciding how the backend should work earlier in the project process, as we had to rush a little bit near the end in deciding how to implement the backend. Furthermore, when members were unsure of tasks they were assigned as they missed a meeting for whatever reason, they should have checked our Google Drive for our Meeting Minutes and To-Do list that listed when taskes should be completed. 


<br><br>
<b>What did you like about the tools and frameworks you used?</b><br>

<ul>
    <li> 
        Grails as it enforced MVC so we did not have to worry about the organization of the models, views, and controllers as         much.
    </li>
    
    <li>
        We were able to use languages familiar to us because Grails is compatible with Java and Groovy is based on Java.
    </li>
    
    <li>
        Since we used the recommended tools and frameworks for the course,  we had useful notes from the course lectures and           website in addition to the tutorials. 
    </li>    
    
    <li> 
        Grails also contained many helpful features such as class relationships, implicit getters and setters, and implicit           sorting and searching of data, which proved beneficial throughout our project. 
    </li>
    
    <li>
        Grails controllers would also automatically convert to a JSON format upon return of objects and different data types.
    </li>
</ul>

<br>
<b>What didn’t you like about the tools and frameworks you used?</b><br>
Because we had never used Grails or Gradle in the past, we struggled to determine the "quirks" with the frameworks such as the Gradle refreshes, which became essential to our project. Additionally,the many configurations and setup took a long time and produced a number of errors, which resulted in a lot of debugging, especially webpack (specifically a missing “-loader” took many hours of debugging to figure out, in addition there were instances where webpack worked the night before, but not the next morning because of something so small as a single “^”).<br><br>
Another issue was the large amount of time running the program took, especially the first time which took upwards of 10 minutes in certain occasions. Furthermore, with the multitude of different files and file types, some confusion was created in our team and how to use each type of file and determining the relationships between files. We also encountered issues with the required frameworks operating differently on different operating system platforms (Windows VS OSX). As an example, symlinks were different for mac/pc, so webpack files were configured differently.

    
    
    
    







