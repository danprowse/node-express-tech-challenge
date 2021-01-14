# GForces Technical Task

A technical task that incolved creating a web service that needed to process the following:

1. Create an order returning an order uuid.
2. Update an order with a vehicle manufacturer, model and total price.
3. View an order with all its details.

whilst considering these requirements:

* Performance
* Security
* Durability
* Scalability
* Tooling
* I18N

## Run Applictaion

To run the service locally:

```bash
  npm install
  npm run start
```
To test each endpoint i recommend using Postman.

## AWS
As the application is wihtin AWS architecture and has a .yml file, the service can be hosted as serverless functions on AWS.

To delpoy the service to AWS:
* Comment out "const PORT = process.env.PORT || 5000;"
* repeat for "app.listen(PORT, () => console.log(`Server running on port: ${PORT} \nProcess running on: ${pid}`));".

* uncomment "module.exports = app".

Now from within your terminal at the project root directory run the command:
```bash
  sls deploy
```
This will upload your repo to AWS.

## License
The code in this project is licensed under MIT license.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
