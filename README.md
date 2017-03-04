# CS2212 - Team 5

Welcome to our project! Here's some quick info to get started:

- Stable code lives in the master branch
- Beta code lives in the rendezvous branch

Setup/Installation Instructions:

1. Install Grails. The easiest way to do this is through SDKMAN. Follow section 2.1 of this guide: http://guides.grails.org/creating-your-first-grails-app/guide/index.html

2. Install IntelliJ, following instructions on this site: https://www.jetbrains.com/idea/#chooseYourEdition (The community edition will work)

3. Clone this repository.

4. In IntelliJ, choose "Open" and the open the folder you cloned. Accept the default options for Gradle and/or Grails. Ensure that the box choosing to download dependencies is checked and "use gradle task configuration" is checked.

5. When the project opens, a background task will start downloading dependencies. Allow this to finish.

6. Run the project. When the run is complete, your browser will open the page (http://localhost:8080). Ensure you are using Google Chrome, as no other browsers are supported at this time.

NOTE: If you get an error about a problem with "webpack", the workaround is to delete the ".bin" folder inside the "node_modules" folder and then run the project again. We are working on a solution for this.