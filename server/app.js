const express = require('express')
const app = express()
const cors = require('cors');
const mongodb = require('./db/mongo');

mongodb.initClientDbConnection();
app.use(cors({
    exposeHeaders: ['Authorization'],
    origin: '*'
}));

app.use(express.json());

module.exports = app