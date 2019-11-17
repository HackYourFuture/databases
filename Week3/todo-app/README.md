# TODO APP

## Usage

### Pre-requisites

This is just a back-end app. So to use this app first you need;

1. Node.js
2. NPM

installed at your system. You can get nodejs & npm from this link: https://nodejs.org/

After that you should open a terminal/cmd window inside Week3/todo-app/ folder.
Then type and run 'npm install' to install all the required dependencies.

### Run

After it completes the installation of the dependencies; you can start using app by typing and running 'node app.js'.

App runs on localhost:3000 but you can change it from the config.js file.

### Test

Because this is a Back-end application and has API endpoints, to test it, you should make AJAX requests towards it.

To do this you can use Postman which makes it easy because of its GUI and also you can use curl with CLI.

# API Endpoints

This application implements CRUD operations based on public APIs. You can find detailed explanations of the endpoints inside the api-docs folder. Open the index.html file and have fun with APIs :)

If you find it hard to read and understand, you can simply look at the Simple-API.md for usage examples and success responses.

# Database

Database structure is explained in a detailed manner at the ER-Diagram.md file. And you can look to the PNG file for the Diagram itself.

And there is file named todo.sql which has the empty dumped version of the database that this app requires. It has only some predefined tags in the Tag table.

# Logger

When you test the app, you can find detailed logs at the console where you run the app.

# What can be done?

1. This app allows multiple user records but just lets a user to be logged in at the same time.
2. Reminders are just one-time-only alerts.
3. User registration and authorization is not secure at all.
