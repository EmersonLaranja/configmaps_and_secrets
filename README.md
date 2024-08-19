# Account Management API

## Overview

This project is an account management API built with TypeScript, Express, SQLite, and TypeORM.

## Index

- [Features](#features)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [Configuration and Installation](#configuration-and-installation)
- [Execution](#execution)
- [Usage](#usage)
- [Tests](#tests)
- [Considerations](#considerations)
- [License](#license)

## Features

- **Create Account**: Create a new account with a unique account number.
- **Get Account Balance**: Retrieve the current balance of an account.
- **Deposit Funds**: Deposit funds into an existing account.
- **Transfer Funds**: Make a transfer between two existing accounts.

## Technologies

### TypeScript

TypeScript is a strongly typed programming language that builds on JavaScript, providing better tools at any scale. I used TypeScript for its type safety, which helps detect errors early in development, and its ability to scale with larger codebases.

### Express

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for developing web and mobile applications. I used Express for its simplicity and performance.

### SQLite

SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured SQL database engine. I used SQLite for its simplicity in creating a database that is saved within the project, making it an excellent choice for prototyping, testing, and small-scale applications.

### TypeORM

TypeORM is an ORM (Object-Relational Mapper) for TypeScript and JavaScript (ES7, ES6, ES5). It supports many SQL-based databases. I used TypeORM to interact with our SQLite database using an object-oriented approach, simplifying data manipulation logic. Additionally, we chose TypeORM for its ease of handling queries and, most importantly, for the security it offers, abstracting aspects like SQL injection and providing an additional layer of protection against common database vulnerabilities.

## Architecture

### Clean Architecture

Clean Architecture is a software design philosophy that separates the elements of a design into rings of levels. The goal is to create a structure that is easy to understand, maintain, and expand. This architecture divides the system into layers such as:

- **Entities**: Business logic and central entities.
- **Use Cases / Services**: Application-specific business rules.
- **Controllers**: Interface adapters and controllers.
- **Frameworks and Drivers**: DB, UI, external APIs, etc.

#### The Created Architecture

![](.github/architecture.png)

### Design Patterns

In the above architecture, several design patterns were used with scalability and maintenance simplicity in mind. These patterns are:

- Adapter: If in the future it is necessary to change a third-party library, this can be done easily as the project's definitions are separated from the library.
- Decorator: With this, it is possible to add new functionalities, such as creating an error log, without altering a single line of what was already working.
- Factory: With this pattern, I isolate direct object construction calls in a single place. Thus, when a controller, for example, needs another functionality, I know where to go and add a line to change it.
- Composite: Instead of filling the controller with ifs or having to inject each validation individually, I create a validation aggregator with this pattern.

## Folder Structure

This is the folder structure tree. Below, there are more details on what each folder is:

```
project-root/
├── .github/
├── src/
│ ├── adapters/
│ │ ├──
│ ├── controllers/
│ │ ├── account/
│ │ ├── deposit/
│ │ ├── transfer/
│ │ ├──
│ ├── database/
│ │ ├──
│ ├── decorators/
│ │ ├──
│ ├── docs/
│ │ ├──
│ ├── factories/
│ │ ├── account/
│ │ ├── deposit/
│ │ ├── transfer/
│ │ ├──
│ │ ├──
│ ├── interfaces/
│ │ ├── repositories/
│ │ ├──
│ ├── models/
│ │ ├──
│ ├── repositories/
│ │ ├──
│ ├── routes/
│ │ ├──
│ ├── _tests/
│ │ ├── controllers/
│ │ ├── mocks/
│ │ ├──

│ ├── utils/
│ │ ├── errors
│ │ ├── httpResponses
│ │ ├──
│ ├── validations/
│ │ ├──
│ ├── app.ts
│ └── server.ts
├── .gitignore
├── jest.config.js
├── package-lock.json
├── package.json
├── README.md
├── README[EN].md
└── tsconfig.json
```

### project-root/

The project's root folder contains all the necessary files and folders for the application's operation and environment configuration.

#### .github/

Used to store the image used in this documentation.

#### src/

Contains the application's source code.

##### adapters/

Contains adapters that bridge different application layers.

##### controllers/

Contains the controllers that handle HTTP requests and call appropriate services for data manipulation. For organization, it is separated into **account**, **deposit**, **transfer**.

##### database/

Contains the database configuration and initialization.

##### decorators/

Contains decorators used to add additional functionalities to methods and classes, such as logging.

##### docs/

Contains the project's documentation, including API documentation (`details.pdf`) and a file that can be used in REST API clients like Insomnia and Postman (`requests.json`).

##### factories/

Contains factories for instantiating objects and injecting dependencies, facilitating the creation of instances for tests and execution. For organization, it is separated into **account**, **deposit**, **transfer**.

##### interfaces/

Contains TypeScript interfaces that define the contracts used in different parts of the application.

##### models/

Contains data models representing the system's entities and mapping to database tables.

##### repositories/

Contains repositories responsible for interacting with the database, performing CRUD operations.

##### routes/

Contains the application's route definitions, mapping endpoints to specific controllers.

##### \_tests/

Contains unit and integration tests to verify the application's correct behavior.

###### \_tests/mocks

Simulations of external dependencies, allowing isolated and controlled testing of the application's functionalities.

##### utils/

Contains utilities and helpers used in different parts of the application, such as formatting and data manipulation functions.

###### utils/errors

Contains custom error structures to make it clearer when using them.

###### utils/httpResponses

Contains custom response structures to make it clearer when using them.

##### validations/

Contains validations to ensure request data is in the expected format and follows business rules.

##### app.ts

Main application configuration file, initializing middlewares, routes, and other essential settings.

##### server.ts

File responsible for starting the server and listening to requests on configured ports.

#### .gitignore

File specifying which files and folders should be ignored by Git.

#### jest.config.js

Configuration file for Jest, the testing framework used in the project.

#### package-lock.json

File that records the exact dependency tree installed in the project, ensuring future installations are consistent.

#### package.json

File containing the project's metadata and listing the dependencies and scripts needed to run the application.

#### README.md

Documentation file in English explaining the project's purpose, how to configure and use it.

#### README[EN].md

Documentation file in Portuguese explaining the project's purpose, how to configure and use it.

#### tsconfig.json

TypeScript configuration file specifying the project's compilation options.

## Configuration and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (>=20.x)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/EmersonLaranja/account_management_api.git
   cd account_management_api
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Execution

- To make the API available, run:

```bash
   npm start
```

- To run the tests, execute:

```bash
   npm test
```

## Usage

Details on how to call each functionality, the required parameters, and more information can be found in the file [docs/details](src/docs/details.pdf).

## Tests

Unit tests were performed to validate whether the responses are in accordance with the documentation. The tests carried out were:

### AddAccount Controller

- Should call AddAccount with the correct values
- Should return 500 if AddAccount throws an exception
- Should call Validation with the correct value
- Should return 400 if Validation returns an error
- Should return 409 if the account already exists
- Should return 201 if valid data is provided

### GetAccountBalance Controller

- Should return 400 if validation fails
- Should call getAccount with the correct account number
- Should return 404 if the account does not exist
- Should return 200 with the account balance if the account exists
- Should return 500 if accountRepository throws an exception

### DepositIntoAccount Controller

- Should return 400 if validation fails
- Should call getAccount with the correct account number
- Should return 404 if the account does not exist
- Should call depositIntoAccount with the correct values
- Should return 200 upon deposit
- Should return 500 if accountRepository throws an exception

### MakeAccountTransfer Controller

- Should return 400 if validation fails
- Should call makeTransfer with the correct values
- Should return 200 with the correct data in case of a successful transfer
- Should return 500 if transferRepository throws an exception
- Should return 409 if

InsufficientError is thrown

## Considerations

- For simplicity and since I am working solo, I chose not to use any linting configuration.
- For the same reason, I will not force commits to pass tests.
- I decided to consider Balance as a field instead of an entity.
- Therefore, every account created has an initial balance of 0.
- It was requested that the project be made with simplicity in mind. Hence, I focused on making it as easy as possible to maintain, scale, and test.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for more details.
