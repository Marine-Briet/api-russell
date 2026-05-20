const express = require('express')
const app = express()
const cors = require('cors');
const mongodb = require('./db/mongo');
const indexRouter = require('./routes/index');

mongodb.initClientDbConnection();
app.use(cors({
    exposeHeaders: ['Authorization'],
    origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);

module.exports = app