Project: Slacker-Chat

Project Overview:
A slack clone. Ability to 
- Post messages in public channels
- Add public channels to all available public channels
- Subscribe to public channels
- Send direct messages to individual users
- View saved profiles from various members

Team Members:
- Canh Trinh
- Julia Randall
- Katie Barnes


What's in these files?

* Client - frontend written in React Redux. Structure of the files as follows:
     - Dist - bundled file created from the webpack file in the root directory
     - Src - aggregation of all components for the site. 
     - Actions / Reducers - core functionality for the frontend site
     - Styles - CSS files with the app's styling
* Server
     - config
          - middleware 
          - routers-DB - routes for post and retrieval of users, messages, channels, and direct message rooms
     - socket
          - module that has live chat functionality
     - db
          - cloud-based mySQL database.  
          - db.js establishes connection to database and schemas
    - models
         - User Models
         - Message Models
         - Direct Message Models
         - Channel Models
         - Direct Message Room Models
         - ChannelUsers Model (for users who subscribe to rooms)
     - server
          - server.js is where instance of server app is created
* Test
     - can run tests through node by running 'mocha' in the terminal in your root directory


Installing dependencies and Getting Started

run “npm install” - all node dependencies are listed in package.json
In a separate tab in the terminal, run “npm start” to start the server
In a separate tab in the terminal, run "webpack -w" to get the bundle file in the dist directory started