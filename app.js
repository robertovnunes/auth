const server = require('./api/conf/setup');
const app = server.server;
const connectDB = server.connectDB();



const routeGet = require('./api/routes/userGet');
const routePost = require('./api/routes/userPost');
const routePatch = require('./api/routes/userUpdate');
const routeDelete = require('./api/routes/userDelete');
const routeLogin = require('./api/routes/userLogin');
const routePrivate = require('./api/routes/userPrivate');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'AuthAPI',
      description: 'User Authentication API',
      contact: {
        name: 'Roberto Nunes'
      },
      servers: ['http://localhost:3001']
    }
  },
  apis: ['./api/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Rota principal
/*app.get('/', (req, res) => {
    console.log('[200] OK');
    res.render('index');
});
*/
// Rotas de API
app.use('/api', routeGet);
app.use('/api', routePost);
app.use('/api', routePatch);
app.use('/api', routeDelete);
app.use('/api', routeLogin);

// Rota privada
app.use('/api', routePrivate);


app.listen(3001, () => {
    app.locals.db = connectDB;
    console.log('Server running on port 3001');
});

