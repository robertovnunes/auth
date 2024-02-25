const mongoose = require('mongoose');
const express = require('express');
const server = express();
const cors = require('cors');
const dotenv = require('dotenv').config();

server.use(express.urlencoded({extended: true}));
server.use(cors());
server.use(express.json());

const userdb = process.env.DB_USER;
const passdb = process.env.DB_PASS;
const uri = `mongodb+srv://${userdb}:${passdb}@clusterauth.o9swa4i.mongodb.net/Users?retryWrites=true&w=majority`;

function connectDB(){
    mongoose.connect(uri).then(() => {
        console.log('Connected to MongoDB');
        return true;
    }).catch((e) => {
        console.error(e);
        process.exit(1);
    });
    return false;
}



module.exports = {server, connectDB};