const server = require('./api/conf/setup');
const app = server.server;
const connectDB = server.connectDB();

const path = require('path');
const ejs = require('ejs');
const favicon = require('express-favicon');

const routeGet = require('./api/routes/userGet');
const routePost = require('./api/routes/userPost');
const routePatch = require('./api/routes/userUpdate');
const routeDelete = require('./api/routes/userDelete');
const routeLogin = require('./api/routes/userLogin');

const express = require("express");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

// Rota principal
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/api', routeGet);
app.use('/api', routePost);
app.use('/api', routePatch);
app.use('/api', routeDelete);
app.use('/api', routeLogin);


app.listen(3001, () => {
    app.locals.db = connectDB;
    console.log('Server running on port 3001');
});

