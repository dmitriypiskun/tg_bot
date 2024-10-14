# API

To start the project for local development you need to complete the following steps:

1. Install third party packages into the project;

```bash
# Go to "api" folder
$ cd api

# Install
$ npm ci
```

2. Make sure that the PostgreSQL server is configured and running on the local device. It can also be started using Docker by running in the root folder the command:

```bash
$ docker compose up
```

3. Create a file with environment variables `.env` in the root of the `api` folder, or edit and fill out the file `.env.example`.

#### Environment variables

| №   | Name               | Description                 | Default value |
| :-- | :----------------- | --------------------------- | :------------ |
| 1   | DB_HOST            | Sets the database host      | localhost     |
| 2   | DB_PORT            | Sets the database port      | 5432          |
| 3   | DB_USER            | Sets the database user      | postgres      |
| 4   | DB_PASSWORD        | Sets the database password  | postgres      |
| 5   | DB_NAME            | Sets the database name      | db            |
| 6   | TELEGRAM_BOT_TOKEN | Sets the telegran bot token |               |
| 7   | WEB_URL            | Sets the url to client      |               |

4. Run the project with the command:

```bash
$ npm run start:dev
```
