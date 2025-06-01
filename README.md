# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/chervyakov-vladislav/nodejs2025Q2-service.git
cd nodejs2025Q2-service
git checkout home_library_service_part_2
```

## Environment variables

Before running the application, create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

## Installing without NPM modules

Before running the application install docker
You can follow this video with helpful instrutions(https://youtu.be/vzVor5povps)

### Production Mode

If you **do not have npm installed**, you can run the containers directly with Docker Compose:

```sh
docker-compose -f compose.yaml up --build
```

To stop and remove containers and volumes:

```sh
docker-compose -f compose.yaml down -v
```

### Development Mode (with hot-reload)

To run the app in development mode (with automatic reload on changes in the `src` folder):

```sh
docker-compose -f compose.development.yaml up --build --watch
```

To stop and remove containers and volumes:

```sh
docker-compose -f compose.development.yaml down -v
```

---

### Useful Docker Commands

- **Get container ID:**
  ```sh
  docker ps
  ```

- **Run a script inside a container (for example, `npm run test`):**
  ```sh
  docker exec -it <container_id> sh
  # Then inside the container:
  npm run test
  ```

- **Check security vulnerabilities:**
  ```sh
  docker scout cves
  ```

---

> **Tip:**  
> If you have npm installed, you can use the convenient npm scripts:
> - Production: `npm run docker:prod`
> - Development: `npm run docker:dev`
> - Stop containers: `npm run docker:down`

## Installing NPM modules

```
npm install
```

## Building the application

Before running or testing the application, you need to build it:

```bash
npm run build
```

## Running application

check and change env variables to correct for database connection

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

## Running Migrations with Localhost Database

To run migrations against your local database (when the database is running on your host machine, not inside Docker), you need to set the correct environment variables.
Important: Use cross-env to ensure environment variables are set correctly across different platforms.

For example, run:
```
cross-env POSTGRES_HOST=localhost npm run migration:run
```

Replace migration:run with any other migration command as needed (e.g., migration:generate, migration:revert).

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

## Environment Variables Description

Below is a description of each environment variable found in `.env.example`:

- **PORT**  
  The port number on which the application server will run (default: 4000).

- **POSTGRES_DB**  
  The name of the PostgreSQL database to use.

- **POSTGRES_USER**  
  The username for connecting to the PostgreSQL database.

- **POSTGRES_PASSWORD**  
  The password for the PostgreSQL user.

- **POSTGRES_HOST**  
  The hostname or IP address of the PostgreSQL server.  
  - Use `db` when running inside Docker (matches the service name in Docker Compose).
  - Use `localhost` when running locally on your machine.

- **POSTGRES_PORT**  
  The port number for the PostgreSQL server (default: 5432).

---

## Docker Compose Files: Usage and Differences

This project provides two Docker Compose files for different scenarios:

- **compose.yaml**  
  Used for production or standard deployment.  
  - Uses pre-built images (`chervyakovvladislav/db:latest` and `chervyakovvladislav/app:latest`).
  - Runs migrations and starts the app in production mode.
  - Recommended for deployment or when you do not need to change the source code.

- **compose.development.yaml**  
  Used for local development.  
  - Builds images from the local Dockerfiles.
  - Mounts the source code for live-reloading and easier development.
  - Starts the app in development mode with hot-reload.
  - Recommended when you are actively developing or debugging the application.

**When to use which:**
- Use `compose.yaml` for production or testing the final build.
- Use `compose.development.yaml` for local development and testing code changes.

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
