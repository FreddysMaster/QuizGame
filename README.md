# Quiz Game

This is a simple Quiz Game that challenges the user to answer as many questions as they can without getting any questions wrong.

## Setup

To setup, you have to have a MySQL server running and have npm installed your system.

### MySQL 

To install MySQL, the easiest way to run it is through [xampp](https://www.apachefriends.org/download.html).  Install Xampp, run it and start the Apache and MySQL server.  You should have MySQL running now!

### npm

To install npm, you need to install NodeJS [here](https://nodejs.org/en).  This will give you access to npm in the terminal.

### Setting up the Server

To get started with running the server, you need to get this project on your local machine or server.  You can do this by cloning this github repo using git or just download the zip under the code dropdown and unzip it.


#### Installing the Packages

Navigate to the folder that the project it stored on your local machine in your terminal and run the following command:
```npm install```

After you run the install command all the packages should be installed on your system.

#### Populate the Database

Before you are ready to play the Quiz Game, you need to populate the SQL Database with the Questions.  You can easily do this by running *mysqlinsert.js*.  You can run this file by running the following command in the projects root directory:
```node mysqlinsert.js```

#### Running the Server

After you followed all of the previous steps above you should be able to run a local server by running the command:
```npm run dev:both```

This will setup the server at the web address: http://localhost:5173

