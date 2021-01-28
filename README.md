# Coding Technical Task

A technical task that involved creating a web service and datastore that needed to process the following:

1. Create an order returning an order uuid.
2. Update an order with a vehicle manufacturer, model and total price.
3. View an order with all its details.

whilst considering these requirements:

* Performance
* Security
* Durability
* Scalability
* Tooling

## Features

* Cluster
* JWT 
* CRUD (MongoDB)

## Run Applictaion

To run the service locally:

```bash
  npm install
  npm run start
```
To test each endpoint i recommend using Postman.

## AWS
As the application is within AWS architecture and has a .yml file, the service can be hosted as a serverless functions on AWS.

## License
The code in this project is licensed under MIT license.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
