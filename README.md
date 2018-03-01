# Web application - BNF

## Prerequisites
- NodeJS (LTS version)

## Install global packages
```
  $> npm install -g yarn
```

## Installation 
```
  $> git clone git@github.com:SpoutEntertainment/BNF-WebApp.git
  $> cd ./BNF-WebApp
  $> yarn
```

## Commands

```
  $> yarn start // To start dev server
  $> yarn test // Run the test
  $> yarn build // Build for production
```

## Directory to tun on static host
```
  $> <project_root>/build/
```

## NOTES:

### REDUX DEVTOOLS SUPPORT
For the browser that doesn't have Redux Devtools, please comment out as below
```javascript
  // File: /src/store/configureStore.dev.js
  // Comment the line below
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
```

## -- More to be updated# react-redux-app-example
