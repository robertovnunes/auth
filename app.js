const express = require('express');
const connectDatabase = require('./conf/setup');
const app = express();
const port = 3000;

// Define your routes here

async function connect() {
  const db = await connectDatabase();
  app.locals.db = db;
  console.log('Connected to the database');
}

app.listen(port, () => {
    const db = connect();
  console.log(`Server is running on port ${port}`);
});
