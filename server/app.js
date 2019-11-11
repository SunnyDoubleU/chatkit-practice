require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require("cors");
const Chatkit = require("@pusher/chatkit-server");


mongoose
  .connect('mongodb://localhost/chat-with-me', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public/build")));

app.use(
  cors({
    credentials: true,
    origin: "localhost:3000"
  })
);

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

// Chatkit Setup
global.chatkit = new Chatkit.default({
  instanceLocator: process.env.CHATKIT_INSTANCE,
  key: process.env.SECURE_KEY,
})

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.listen(5000, () => {
  console.log("App is listening on port 5000");
});

// default value for title local
app.locals.title = 'Chat With Me';

app.use('/', require('./routes/index'));
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/user'));


module.exports = app;
