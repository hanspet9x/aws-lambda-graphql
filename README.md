# Introduction
This application helps create and retrieve lead and interests data.
This application requires that:

1. A mongo server is running locally else, the url in the .env file must be swapped with a mongo db cluster.
2. The serverless lib is installed globally `npm install -g serverless`.
3. All dependencies are installed.
# Major Dependencies
1. mongoose
2. serverless and serverless-offline
3. apollo server lambda
4. graphql

# Starting the application
In order  to start the application you must:
1. navigate to the main directory `cd isd`
2. Start the application by running the start script or run the bash script `start.bash` directly.
# Folder Structure (src)

### conf
This holds the app configuration files and also extend the database url from the .env file.
### graphql
This holds the resolver object and the app type definitions or schema.

### interfaces
This holds common interfaces (mutation response and context)

### mongo
This holds the app database model, schema, entity, and event hooks

### repository
This holds abstraction files on the app db.

### services

This holds the app business logic, transformers, specific interfaces, and responses.

### utils
This holds the app common 
### app.ts
This is the entry file for the lambda function.