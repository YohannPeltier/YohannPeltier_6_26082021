# Piiquante

## Installation

Here are the dependencies you need to install for the frontend:

-   NodeJS 12.14 or 14.0.
-   Angular CLI 7.0.2.
-   node-sass : make sure to use the corresponding version to NodeJS. For Noe 14.0 for instance, you need node-sass in version 4.14+.

Here are the dependencies you need to install for the backend:

-   bcrypt 5.0.1.
-   dotenv 10.0.0.
-   express 4.17.1.
-   jsonwebtoken 8.5.1.
-   mongoose 6.0.1.
-   multer 1.4.3.

On Windows, these installations require to use PowerShell in administrator mode.

Clone this repo.
From the "frontend" folder, run `npm install`.
From the "backend" folder, run `npm install`.

Create an .env file locally. You can duplicate .env.example and name the new copy .env. Adapt the variables to your needs.

## Usage

From the "backend" folder run `node server`.

Use `Ctrl+C` in the terminal to stop backend server.

From the "frontend" folder run `npm start`. This should both run the local server and launch your browser.

If your browser fails to launch, or shows a 404 error, navigate your browser to http://localhost:8081.

The app should reload automatically when you make a change to a file.

Use `Ctrl+C` in the terminal to stop the frontend server.
