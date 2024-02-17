const server = require('./conf/setup');
const app = server.server;
const connectDB = server.connectDB();

const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const routeGet = require('./routes/userGet');
const routePost = require('./routes/userPost');
const routePatch = require('./routes/userUpdate');
const routeDelete = require('./routes/userDelete');

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const express = require("express");

app.set('view engine', 'ejs');

// Rota principal
app.get('/', (req, res) => {
    res.render('index');
});

app.use(routeGet);
app.use(routePost);
app.use(routePatch);
app.use(routeDelete);


app.listen(3001, () => {
    app.locals.db = connectDB;
    console.log('Server running on port 3001');
});

