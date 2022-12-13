# TimeToDo-Server

This is the server side ( Backend ) of my personal project TimeToDo. An user can create an account and use this application to track their progress on the daily tasks.

## Live-Site

Visit live site on : [timetodoapp.netlify.app/](https://timetodoapp.netlify.app/)

## About This App

This app was built with Express.JS and it uses MongoDB as its database.

An user can create an account and create tasks that they can track from anywhere if they have internet access.\
The tasks user create are categorized by its time and priority level.\
The tasks are archived automatically if it's past one week of its specified time and deleted after two. ( This approach was taken to reduce the burden on the server and the database )

## Available Scripts

### `npm install`

Installs all the dependencies that it needs to run.

### `npm start`

Runs the application on cluster mode with all the available cpu threads each thread running a single cluster. All these complexities are handled by a package called pm2.

### `npm watch`

Runs the application on a development server in watch mode.

### `npm test`

Runs all the tests provided on the routes.

### `npm test-watch`

Runs all the tests on watch mode.
