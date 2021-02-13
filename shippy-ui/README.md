# Shippy-UI

This React application implements the front-end logic that lets an authenticated user create consignments to be shipped with vessels.

----

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Goals

In the project directory, you can run:

### `make certs`

Creates TLS cert for development use together with the generated `.env` file.

```
HTTPS=true
SSL_CRT_FILE=tls/localhost/cert.pem
SSL_KEY_FILE=tls/localhost/key.pem
``` 

### `make` or `make start`

Runs the app in the development mode.\
Open [https://localhost:3000](https://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `make test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `make build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
