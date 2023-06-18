<!-- This is a Template Repository, use as needed! -->

<!-- Project Summary -->

<br />

<div align="center">
  <a href="https://github.com/NivaldoFarias/typescript-project-template">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="Logo" width="90">
  </a>

  <h3 align="center">TypeScript Project Template</h3>
  <div align="center">
    Back End Development Project Template
    <br />
    <a href="https://github.com/NivaldoFarias/typescript-project-template/tree/main/src"><strong>Browse TypeScript code»</strong></a>
  </div>
</div>

<div align="center">
  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/JWT-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink" height="30px"/>

  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br />

<div align="center">
  <a href="https://github.com/NivaldoFarias/typescript-project-template/releases/tag/v2.0.0" alt="Current template version badge">
    <img src="https://img.shields.io/github/package-json/v/NivaldoFarias/typescript-project-template?style=flat-square" />
  </a>
  <a href="https://github.com/NivaldoFarias/typescript-project-template/releases/tag/v2.0.0" alt="Current template version badge">
    <img src="https://img.shields.io/badge/license-MIT-%23A8D1FF?style=flat-square" />
  </a>
</div>

<!-- Table of Contents -->
## Table of Contents

- [Installation and Usage](#installation-and-usage)
- [Error Handling and Logging](#error-handling-and-logging)
  - [AppError](#apperror)
  - [AppLog](#applog)
- [Middlewares](#middlewares)
- [API Reference](#api-reference)
  - [Models](#models)
  - [Routes](#routes)
  - [Authentication](#authentication)

<!-- Installation and Usage -->
## Installation and Usage

###### Pre-requisites: Node `^18.12.1`, npm `^8.19.2` OR yarn `^1.22.19` , PostgreSQL `^12.11`

There are two available options for you to use this template for your next Back End project: either use Github's built-in `Use this template` feature (green button left of the _'About'_ section), or download the zip file and extract it in the root of a new project folder by running these commands:

```bash
wget https://github.com/NivaldoFarias/typescript-project-template/archive/main.zip
```

Then run the following command to install the project's dependencies:

```bash
# Using npm
npm install

# Using yarn
yarn install
```

That's it! You can now start developing your TypeScript Project by running the command below. Happy coding!

```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```

###### _ps.: Make sure to update the package.json file with your own credentials!_

<!-- Error Handling and Logging -->
## Error Handling and Logging

While dealing with errors in a _Layered Structure_ Project enviroment, you may notice that the project's debugging complexity scales beyond common `console.log()` usage. The `AppLog` Object and `AppError` Object structures were set to counter that exact issue, by trying to keep the Development process as clean and concise as possible. Both are frequently referenced in the code, but do have a specific usage.

## AppError

An `AppError` Object is used to handle errors in the application. It that takes four parameters:

- `log`: A string containing a simplified error message, for _Server side_ use. **This is the message that will be used by the `AppLog` Object**
- `statusCode`: An integer containing the HTTP status code.
- `message`: A string containing a simplified error message, for _Client side_ use. **This is the message that will be displayed to the user.**
- `details`: A string containing a detailed error message, for _Client side_ use. Can be used to provide more information about the error, such as the stack trace, or suggestions on how to counter the error.

### Example Usage

```typescript
  // ..../middlewares/auth.middleware.ts

  import * as repository from './../repositories/auth.repository.ts';
  import AppError from './../events/AppError';
  ...
  ..

  async function usersExists(req: Request,...){
    ...
    ..
    const user = await repository.findbyId(req.body.id);

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

### AppLog

An `AppLog` Object is used to handle logs in the application. Each method corresponds to a respective color and prefix to log messages. It takes one parameter: `text`: a descriptive string containing the message to be logged.

|     Method     |  Color  |   Log prefix   |
| :------------: | :-----: | :------------: |
| **controller** |  Green  | `[Controller]` |
| **repository** |  Blue   | `[Repository]` |
| **middleware** | Magenta | `[Middleware]` |
|  **service**   |  Cyan   |  `[Service]`   |
|   **error**    |   Red   |   `[Error]`    |
|   **server**   | Yellow  |   `[Server]`   |
|   **utils**    |  Cyan   |   `[Utils]`    |

#### Example Usage

```ts
// .../middlewares/auth.middleware.ts

//...
async function validPassword(password: string) {
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    // throw an AppError instance
  }

  return AppLog.middleware("Password is valid");
}
```

#### Example Usage

```typescript
  // ..../middlewares/auth.middleware.ts

  import AppLog from './events/AppLog';
  ...
  ..

  async function usersExists(req: Request,...){
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

While aiming to provide a reusable, modular and extensible architecture, the middlewares are generally the first structures to be refactored into self-contained modules. The `validateSchema()`, `processHeader()` and `requireToken()` middlewares were set in order to achieve that goal. The following section describes **`useMiddleware()`**, which incorporates the forementioned functions as _key–value_ pairs in an Object, along with their structure and usage.

### UseMiddleware

The `useMiddleware()` function takes two parameters:

- `middlewares`: An Object containing the _key–value_ pairs of the middlewares to be used, takes one to three parameters:
  - `schema`: A [Joi](https://joi.dev/api/) Schema Object that will be used to validate the data provided by the client. If the data provided by the client is not valid, an **`AppError`** Object will be thrown.
  - `header`: A string containing the name of the header that will be used to authenticate the action. If the client-provided header is missing, an **`AppError`** Object will be thrown.
  - `token`: A boolean indicating whether the token provided by the client will be verified or not. If the token is not valid, an **`AppError`** Object will be thrown.
- `endpoint`: A string that will be used to identify the endpoint at which the _client–api_ interaction is undergoing, which will be logged to console by the **`AppLog`** Object.

###### Reference: [useMiddleware function declaration](https://github.com/NivaldoFarias/typescript-project-template/blob/main/src/utils/middleware.util.ts)

#### Example Usage

```typescript
// ..../routes/admin.route.ts
import useMiddleware from '../utils/middleware.util';
import * as schema from '../models/admin.model';
...
..
const endpoint = '/admin';

const registerEndpoint = '/create';
adminRouter.post(endpoint,
  createEndpoint,
  useMiddleware({
    schema: schema.create,
    header: 'admin-api-key',
    token: true
  },
  endpoint + createEndpoint),
  middleware.createValidations,
  controller.create,
);
..
...
```

## API Reference

In this section, you will find the example API's endpoints and their respective descriptions, along with the request and response examples, as well as the [Prisma](https://www.prisma.io/) models for each entity, that can be used as guide for data formatting. All data is sent and received as JSON.

### Models

#### User model _`users`_

- `id`: A unique identifier for each user. `serial4`
- `username`: The user's username. `text`
- `email`: The user's email. An email may only be registered once. `text`
- `password`: The user's password. `text`
- `created_at`: The date and time when the user was created. `timestamp`

### Routes

#### [Authentication](#authentication) _`/auth`_

- [Register](#---register)
- [Sign In](#---sign-in)

### Authentication

#### Register

###### &nbsp; &nbsp; POST _`/auth/register`_

##### Request

###### Body

```json
{
  "username": "johndoe",
  "email": "john_doe@gmail.com",
  "password": "123456789"
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```

##### Responses

| Status Code |       Description        |          Properties           |
| :---------: | :----------------------: | :---------------------------: |
|   **201**   |         Created          |          `data: {}`           |
|   **409**   | Email already registered | `error: { message, details }` |
|   **422**   |      Invalid Input       | `error: { message, details }` |
|   **500**   |  Internal Server Error   | `error: { message, details }` |

#### Sign in

###### POST _`/auth/sign-in`_

##### Request

###### Body

```json
{
  "email": "john_doe@gmail.com",
  "password": "123456789"
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```

##### Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **200**   |          OK           |       `data: { token }`       |
|   **403**   |   Invalid password    | `error: { message, details }` |
|   **404**   |    User not found     | `error: { message, details }` |
|   **422**   |     Invalid Input     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |
