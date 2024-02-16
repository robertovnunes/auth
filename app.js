const server = require('./conf/setup');
const app = server.server;
const connectDB = server.connectDB();

const routeGet = require('./routes/userGet');
const routePost = require('./routes/userPost');
const routePatch = require('./routes/userUpdate');
const routeDelete = require('./routes/userDelete');

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const {static} = require("express");

app.use(static('./public'));

app.get('/', (req, res) => {
    res.sendFile('./home/src/index.js', { root: 'public' });
});

app.use(routeGet);
app.use(routePost);
app.use(routePatch);
app.use(routeDelete);


app.listen(3001, () => {
    app.locals.db = connectDB;
    console.log('Server running on port 3001');
});

