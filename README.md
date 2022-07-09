<!-- This is a Template Repository, use as needed! -->

<!-- Project Summary -->

<br />
<div align="center">
  <a href="https://github.com/NivaldoFarias/typescript-project-template">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="Logo" width="80">
  </a>

<h3 align="center">TypeScript Project Template</h3>
  <h6>WIP</h6>
  <p>
    Back End Development Project Template
    <br />
    <a href="https://github.com/NivaldoFarias/typescript-project-template/tree/main/src"><strong>Browse TypeScript code»</strong></a>
</div>

<div align="center">
  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>

  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<!-- Table of Contents -->

<!-- Installation and Usage -->

## Installation and Usage

###### Pre-requisites: Node.js `^16.14.0`, PostgreSQL `^12.11`

First, download the zip file and extract it in the root of a new project folder.

```bash
wget https://github.com/NivaldoFarias/typescript-project-template/archive/main.zip
```

Then run the following command to install the project's dependencies:

```bash
npm install
```

That's it! You can now start developing your TypeScript Project by running the command below. Happy coding!

```bash
npm run dev
```

###### _ps.: Make sure to update the package.json file with your own credentials!_

<!-- Error Handling and Logging -->

## Error Handling and Logging

While dealing with errors in a _Layered Structure_ Project enviroment, you may notice that the project's debugging complexity scales beyond common `console.log()` usage. The `AppLog` Object and `AppError` Object structures were set to counter that exact issue, by trying to keep the Development process as clean and concise as possible. Both are frequently referenced in the code, but do have a specific usage.

#### ▸ &nbsp; AppError

An `AppError` Object is used to handle errors in the application. It that takes four parameters:

- `log`: A string containing a simplified error message, for _Server side_ use. **This is the message that will be used by the `AppLog` Object**
- `statusCode`: An integer containing the HTTP status code.
- `message`: A string containing a simplified error message, for _Client side_ use. **This is the message that will be displayed to the user.**
- `detail`: A string containing a detailed error message, for _Client side_ use. Can be used to provide more information about the error, such as the stack trace, or suggestions on how to counter the error.

##### Example Usage

```typescript
  // ..../middlewares/user.middleware.ts

  import AppError from './events/AppError';
  ...
  ..

  async function findById(req: Request,...){
    ...
    ..

    if (!user){
      throw new AppError(
        'User not found',
        404,
        'User not found',
        'Ensure to provide a valid user ID.'
      );
    }
    ..
    ...
  }
```

#### ▸ &nbsp; AppLog

An `AppLog` Object is used to handle logs in the application. It takes two parameters:

- `type`: A string containing the main _Layer Structure_ that contains the log. There are seven allowed values: `Error`, `Server`, `Controller`, `Middleware`, `Repository`, `Service`, and `Util`.
- `text`: A descriptive string containing the log message. Generally, a short message that describes the output event of the function that generated the log.

##### Example Usage

```typescript
  // ..../middlewares/user.middleware.ts

  import AppLog from './events/AppLog';
  ...
  ..

  async function findById(req: Request,...){
    ...
    ..

    // output: [Middleware] User Found
    AppLog('Middleware', 'User found');
    res.locals.user = user;
    return next();
  }
  ..
  ...
```

###### _ps.2: Have fun with these structures! They are in no way restricted to the project's scope_

<!-- Middlewares -->

## Middlewares

While aiming to provide a reusable, modular and extensible architecture, the middlewares are generally the first structures to be refactored into self-contained modules. The `validateSchema()` and `processHeader()` middlewares were set in order to achieve that goal. The following sections describes their structure and usage.

##### Example Middlewares Usage

```typescript
// ..../routes/user.route.ts
import validateSchema from '../middlewares/schema.middleware';
import processHeader from '../middlewares/header.middleware';

import userSchema from '../models/user.schema';
...
..
const endpoint = '/users';

userRouter.put(endpoint,
  validateSchema(userSchema, endpoint),
  processHeader('token', endpoint),
  ...
  ..
  controller.createUser
);

..
...
```

#### ▸ &nbsp; Schema Validation

When working with data, it is essential to validate what was provided by the client before saving it to the database. Since this is a common process while in Development, having a simplified, modular, schema validation middleware is key. The `validateSchema()` middlewares takes two parameters:

- `schema`: A Schema Object that will be used to validate the data provided by the client. If the data provided by the client is not valid, an **`AppError`** Object will be thrown.
- `endpoint`: A string that will be used to identify the endpoint at which the schema is being validated, which will be Logged to console by the **`AppLog`** Object.

##### Thrown AppError

```typescript
throw new AppError(
  'Invalid input',
  422,
  'Invalid input',
  error.details.map((detail) => detail.message).join(', '),
);
```

#### ▸ &nbsp; Header Processing

As well as dealing with data that will directly be used by the server to create entities on the database, middlewares must ensure that the necessary headers were provided by the client in order to authenticate the action. The `processHeader()` middlewares takes two parameters:

- `header`: A string containing the name of the header that will be used to authenticate the action. If the client-provided header is missing, an **`AppError`** Object will be thrown.
- `endpoint`: A string that will be used to identify the endpoint at which the schema is being validated, which will be Logged to console by the **`AppLog`** Object.

##### Thrown AppError

```typescript
throw new AppError(
  'Missing headers',
  400,
  'Missing headers',
  'Ensure to provide the necessary headers',
);
```

#

###### Template created by [Nivaldo Farias](https://github.com/NivaldoFarias/typescript-project-template).
