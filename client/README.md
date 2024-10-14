# Client

To start the project for local development you need to complete the following steps:

1. Install third party packages into the project;

```bash
# Go to "client" folder
$ cd client

# Install
$ npm ci
```

2. Create a file with environment variables `.env` in the root of the `client` folder, or edit and fill out the file `.env.example`.

#### Environment variables

| №   | Name         | Description      | Default value |
| :-- | :----------- | ---------------- | :------------ |
| 1   | VITE_API_URL | Sets the api url |               |

3. Run the project with the command:

```bash
$ npm run dev
```
