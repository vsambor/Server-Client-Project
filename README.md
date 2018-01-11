
# Server-Client-Project `SCP`
server-client-project is a class project.

## Status
[![Known Vulnerabilities](https://snyk.io/test/github/vsambor/server-client-project/badge.svg?targetFile=package.json)](https://snyk.io/test/github/vsambor/server-client-project?targetFile=package.json)
[![Build Status](https://travis-ci.org/vsambor/Server-Client-Project.svg?branch=master)](https://travis-ci.org/vsambor/Server-Client-Project)
[![Maintainability](https://api.codeclimate.com/v1/badges/ee6efe9bb95fd737a177/maintainability)](https://codeclimate.com/github/vsambor/Server-Client-Project/maintainability)

## Versions
![Node 8](https://img.shields.io/badge/node-8.9.x-green.svg)
![npm](https://img.shields.io/badge/npm-5.6.x-yellow.svg)
![MongoDB](https://img.shields.io/badge/mongodb-3.6-yellowgreen.svg)
![VueJS 2](https://img.shields.io/badge/vuejs-2.5.x-brightgreen.svg)
![Webpack 3](https://img.shields.io/badge/webpack-3.6.x-blue.svg)
![Element-UI 2](https://img.shields.io/badge/element-2.0-ff69b4.svg)


## Features

- To be defined...

## Kanban
[SCP dashboard](https://github.com/vsambor/Server-Client-Project/projects/1)

## Backend
- [node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [nodemon](https://nodemon.io/)
- [express](https://expressjs.com/)
- [mongoose](http://mongoosejs.com/)
- [body-parser](https://github.com/expressjs/body-parser)
- [cors](https://github.com/expressjs/cors)
- [morgan]()
- [helmet]()
- [serve-favicon](https://github.com/expressjs/serve-favicon)

## Frontend

- [vue.js](https://vuejs.org/)
- [element ui](http://element.eleme.io/#/en-US)
- [webpack](https://webpack.js.org/)
- [babel](https://babeljs.io/)
- [sass](http://sass-lang.com/)
- [postCSS](https://github.com/postcss/postcss)
- [esllint](https://eslint.org/)
- [karma](https://karma-runner.github.io/2.0/index.html)
- [mocha](https://mochajs.org/)
- [nightwatch](http://nightwatchjs.org/)

## Database

- [mongodb](https://www.mongodb.com/)

## IDE

- [Visual Studio Code](https://code.visualstudio.com/)

> User settings:

```
{
  "editor.mouseWheelZoom": true,
  "editor.tabSize": 2,
  "editor.renderIndentGuides": true,
  "editor.rulers": [
    160
  ],
  "window.zoomLevel": 0,
  "editor.wordWrapColumn": 160,
  "editor.wordWrap": "wordWrapColumn",
  "editor.formatOnSave": true,
  "eslint.enable": true,
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    "vue"
  ],
  "vetur.format.defaultFormatter.html": "prettier",
  "prettier.semi": false,
  "prettier.singleQuote": true,
  "html.format.wrapLineLength": 160,
  "html.format.preserveNewLines": false,
  "workbench.iconTheme": "vscode-icons",
  "extensions.autoUpdate": true
}
```
 
> Extensions:

 ```
dbaeumer.vscode-eslint
octref.vetur
robertohuertasm.vscode-icons
```

# Usage

Make sure to have [node](https://nodejs.org/en/) installed.<br>
Open a console in project root folders and run:

```
$ npm install
```

### Start Server

To start serving server side files run the following command:

```
$ npm run server-dev
```

The application is available by default on port `8081`

### Start Client

To start the client side run the following command in `client` folder console:

```
$ npm run client-dev
```

The application is available by default on port `8080`

### Test Server

To launch the server unit test run the following command:

```
$ npm run server-unit-test
```

### Test Client

Client has two type of tests comming with vue cli generator; unit test and end to end test:

**Unit Test**

```
$ npm run client-unit-test
```

**E2E Test**

```
$ npm run client-e2e-test
```
