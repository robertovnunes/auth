const server = require('./api/conf/setup');
const app = server.server;
const connectDB = server.connectDB();

const path = require('path');
const ejs = require('ejs');

const routeGet = require('./api/routes/userGet');
const routePost = require('./api/routes/userPost');
const routePatch = require('./api/routes/userUpdate');
const routeDelete = require('./api/routes/userDelete');

const express = require("express");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views'));
app.use(express.static('public'));

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

