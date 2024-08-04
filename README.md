# Getting Started with Casino Jackpot

A slot machine application featuring a React frontend and a Node.js backend,
built with TypeScript and utilizing Sequelize ORM for MySQL database interactions.
Every reload will start a new session with initial credits, 
the user account will automaticly generate and set over cookie (you can remove your cookies and get new account).

# Prerequisites
Before running the application, ensure you have the following installed:
- Node.js
- MySQL 
- npm

# Getting Started with Casino Jackpot

- Create a new MySQL database for the application (tabels will created when run the app)
- Configure db credentials in `server/src/sequelizeConfig.ts`
- Install dependencies in client and server

 *** Ready to go! ***
  In the project directory, you can run:

  ### `npm start`
  
  Runs the app in the development mode.\
  Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

  # Development process
  - Start with a basic design for the app and database.
  - Choose the technology stack to use.
  - Install necessary tools and prepare the development environment.
  - Set up the Node.js server and the React client.
  - Create the slot machine interface and a spin endpoint on the server.
  - Set up the MySQL database and use Sequelize ORM, for session management.
  - Add features to manage user accounts and handle cashouts.
  - Add timestamp checks to prevent overlapping updates.
  - Create a scheduled event to remove old sessions from the database.

  # Thought process, challenges faced
  - How to manage sessions on the server?
    Store and manage all sessions and accounts in mysql db
  - How to manage user accounts? should create registration and login process?
     Generate and store account id over cookie to identify users to bybass registration and login process during the assignment.
  - How to prevent concurrent session and account updates?
    Add timestamp checks to prevent overlapping updates.
  - Leading principle - Create stateless api to provide scalable solution
    The api is stateless and could run over cluster to provide scalability

Written by May Galibter :)
