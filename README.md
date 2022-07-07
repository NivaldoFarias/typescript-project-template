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
    <a href="https://github.com/NivaldoFarias/typescript-project-template"><strong>Browse TypeScript code»</strong></a>
</div>

<div align="center">
  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>

  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<!-- Installation and Usage -->

### Installation and Usage

###### Pre-requisites: Node.js `^16.14.0`, PostgreSQL `^12.11`

First, download the zip file and extract it in the root of your project.

```bash
wget https://github.com/NivaldoFarias/typescript-project-template/archive/main.zip
```

Then run the following command to install the project's dependencies:

```bash
npm install
```

That's it! You can now start developing your TypeScript Project by running the command below. Happy coding!

```bash
npm start
```

###### _ps.: Make sure to update the package.json file with your own credentials!_

<!--  -->

### Error Handling and Logging

You may have noticed that two main structures are already set: a `AppLog` Object and a `AppError` Object. Both are frequently referenced in the code, but do have a specific usage.

#### ▸ &nbsp; AppError

A `AppError` Object is used to handle errors in the application. It is a simple object that takes four parameters:

- `log`: A string containing a simplified error message, for _Server side_ use. **This is the message that will be used by the `AppLog` Object**
- `statusCode`: An integer containing the HTTP status code.
- `message`: A string containing a simplified error message, for _Client side_ use. **This is the message that will be displayed to the user.**
- `detail`: A string containing a detailed error message, for _Client side_ use. Can be used to provide more information about the error, such as the stack trace, or suggestions on how to counter the error.

##### &nbsp; ▾ &nbsp; Example

```typescript
  // ..../middlewares/user.middleware.ts

  import AppError from './events/AppError';
  ...
  ...

  async function findById(req: Request,...){
    ...
    ...

    if (!user){
      throw new AppError(
        'User not found',
        404,
        'User not found',
        'Ensure to provide a valid user ID.'
      );
    }
    ...
    ...
  }
```

#### ▸ &nbsp; AppLog

A `AppLog` Object is used to handle logs in the application. It is a simple object that takes two parameters:

- `type`: A string containing the main _Layer Structure_ that contains the log. There are six allowed values: `Error`, `Server`, `Controller`, `Service`, `Middleware` and `Repository`.
- `text`: A descriptive string containing the log message. Generally, a short message that describes the output event of the function that generated the log.

##### &nbsp; ▾ &nbsp; Example

```typescript
  // ..../middlewares/user.middleware.ts

  import AppLog from './events/AppLog';
  ...
  ...

  async function findById(req: Request,...){
    ...
    ...

    AppLog('Middleware', 'User found');
    res.locals.user = user;
    return next();
  }
```

###### _ps.2: Have fun with these structures! They are in no way restricted to the project's scope_

<!-- Content -->

### Author

<a href="https://github.com/NivaldoFarias/">
  <img src="https://github.com/NivaldoFarias/typescript-project-template/blob/main/.github/author-image.png?raw=true" height="70px""/>
</a>
<!-- Change img src to your icon and the href url to your repository url! -->

###### Template created by [Nivaldo Farias](https://github.com/NivaldoFarias/typescript-project-template).

<!-- MARKDOWN LINKS & IMAGES -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=blue
[linkedin-url]: https://www.linkedin.com/in/nivaldofarias/
[slack-shield]: https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white
[slack-url]: https://driventurmas.slack.com/team/U02T6V2D8D8/
