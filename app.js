const server = require('./api/conf/setup');
const app = server.server;
const connectDB = server.connectDB();
const express = require('express');

const port = process.env.PORT || 3000;

const routeGet = require('./api/routes/userGet');
const routePost = require('./api/routes/userPost');
const routePatch = require('./api/routes/userUpdate');
const routeDelete = require('./api/routes/userDelete');
const routeLogin = require('./api/routes/userLogin');
const routePrivate = require('./api/routes/userPrivate');


//configuração do swagger | documentação da API
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerConf = {
  swaggerDefinition: {
    info: {
      title: 'AuthAPI',
      description: 'User Authentication API',
      contact: {
        name: 'Roberto Nunes'
      },
      servers: [`http://localhost:${port}`]
    }
  },
  apis: ['./api/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerConf);
// Serve the custom CSS file

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
    customCss: ".swagger-ui .topbar { display: none }", // Path to your custom CSS
    customSiteTitle: "Auth API",  // Título personalizado
    customfavIcon: "/docs/favicon.ico"  // Caminho para o ícone
}));
// Fim da configuração do swagger

// Rotas publicas de API
app.use('/api', routeGet);
app.use('/api', routePost);
app.use('/api', routePatch);
app.use('/api', routeDelete);
app.use('/api', routeLogin);

// Rotas privadas da API
app.use('/api', routePrivate);



app.listen(port, () => {
    app.locals.db = connectDB;
    console.log(`Server running on port ${port}`);
});

