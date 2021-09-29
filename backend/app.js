const config = require('../backend/utils/config')
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const cors = require('cors')
const serijeRouter = require('./controllers/serije')
const middleware = require('../backend/utils/middleware')
const logger = require('../backend/utils/logger')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users');
const bodyParser = require('body-parser');
require('express-async-errors');
app.use(bodyParser.json());
 
logger.info('Connecting to', config.url)
 
mongoose.connect(config.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(result => {
  logger.info("Connected to database.");
}).catch(error => {
  logger.greska("Error while connecting to database.", error.message);
})

app.use(cors())
app.use(cookieParser());
app.use(express.json())
app.use(express.static('build'))
 
app.use('/serije', serijeRouter)
app.use('/user',usersRouter);
 
app.use(middleware.nepoznataRuta)
app.use(middleware.errorHandler)
 
module.exports = app
