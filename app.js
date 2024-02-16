const server = require('./conf/setup');
const app = server.server;
const connectDB = server.connectDB();

const routeGet = require('./routes/userGet');
const routePost = require('./routes/userPost');
const routePatch = require('./routes/userUpdate');
const routeDelete = require('./routes/userDelete');

const React = require('react');
const ReactDOMServer = require('react-dom/server');

app.get('/', (req, res)  => {
    const App = require('./home/App').default;
  const html = ReactDOMServer.renderToString(App);
  res.send(html);
});

app.use(routeGet);
app.use(routePost);
app.use(routePatch);
app.use(routeDelete);


app.listen(3000, () => {
    app.locals.db = connectDB;
    console.log('Server running on port 3000');
});

