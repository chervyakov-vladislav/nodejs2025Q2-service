# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/chervyakov-vladislav/nodejs2025Q2-service.git
cd nodejs2025Q2-service
git checkout development
```

## Installing NPM modules

```
npm install
```

## Environment variables

Before running the application, create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

## Building the application

Before running or testing the application, you need to build it:

```bash
npm run build
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Running in development mode

To run the application in development mode with hot-reload:

```bash
npm run start:dev
```

## Testing

**Before running tests, make sure you have built the application and started it in a separate terminal:**

```bash
npm run build
npm run start
```

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

> **Note:**  
> The `test:auth` & `test:refresh` scripts are for Home Library Service: Part 3 and are not required for the current stage.
To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
