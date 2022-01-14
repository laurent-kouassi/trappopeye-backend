TRAPPOPEYE-BACKEND

# TRAPPOPEYE-BACKEND Express + MongoDB Server


## Features

- Express
- REST API
- MongoDB
- Socketio

## Requirements

- [node & npm](https://nodejs.org/en/)

## Installation

- `git clone https://github.com/laurent-kouassi/trappopeye-backend.git`
- `cd trappopeye-backend`
- `npm install`
- `npm start`
- optional: include _.env_ in your _.gitignore_

### GET Routes

- visit http://localhost:3000
  - /?`${routeId}`

### Beyond GET Routes

Get route interact with socket on connection then render the proper routeId with Mongoose to fetch the appropriate data

#### Postman

- Install [Postman](https://www.getpostman.com/apps) to interact with REST API
- Access a route with:
  - URL: http://localhost:3000/?`${routeId}`
  - Method: GET
