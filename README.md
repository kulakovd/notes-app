# Notes App

Exactly like Apple's notes app but web (so windows users can write notes too).

## Top features

1. Create new note
2. Remove note
3. Make some text *bold* or **italic**
4. Mobile-friendly UI
5. Dark mode
6. Amazing offline experience

## The technical details

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Used libs:

- **Redux** for the state managment
- **TailwindCSS** to avoid write css
- **Dexie** to save notes in IndexedDB
- **Workbox** to make web offline

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn start:prod`

Builds the app and runs it with http-server.
It's useful if you like to test Service Worker.

Server Worker don't work with `yand start`

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
