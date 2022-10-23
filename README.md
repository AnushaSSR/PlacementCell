# Placement Cell
* Placement Cell enables employee to keep track of the student placement details.
* This is implmented with a neat interface using Node.js, Express, MongoDB, Mongoose, EJS, CSS and Bootstrap.

# Features
1. Employee can register and login.
2. Employee can add, view students.
3. Employee can add, view interviews.
4. Employee can schedule interviews to students and update the interview status of the students.
5. Employee can download the student report in CSV format.
6. Employee can check out the external jobs. 

# Setup Project in local Server
**Ensure that npm ,node, mongodb are installed in your system**. Follow the steps below to setup this project in your local: 

1. Copy the git repository link.
2. Open Git bash and clone the project using **git clone** command.
3. Run **npm install** to install the dependencies.
4. Create a .env file in the root of the project.
5. Paste the following in your .env file

>PORT = PortToLaunch

>LOCAL_SECRET = TextOfYourChoice

>DATABASE_URL = mongodb://localhost:27017/placement_cell_development

6. Run **npm start** to start the server.

This will run on Port: 8000 (if nothing is specified in env port). 


# <a href="https://anu-placement-cell.herokuapp.com/" target="_blank">Click here</a> to see the Placementcell Cell application.
