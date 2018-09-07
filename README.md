# reactDB
React Frontend - Express and MySQL backend

> npm init

> npm install (this will install all dependencies in package.json needed to run)

> npm run dev (this will run server.js and all of the client code for the frontend)

If you recieve the Error: ER_NOT_SUPPORTED_AUTH_MODE with auth_socket, run the following query on DB:

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

Note: root with password of 'password' is for testing purposes only on a local DB.
