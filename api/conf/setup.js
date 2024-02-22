const mongoose = require('mongoose');
const express = require('express');
const server = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const path = require('path');
const favicon = require('serve-favicon');
const ejs = require('ejs');

server.use(express.urlencoded({extended: true}));
server.use(cors());
server.use(express.json());

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, '../../public'));
server.use(express.static('public'));
server.use(favicon(path.join(__dirname, '../../public', 'favicon.ico')));

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