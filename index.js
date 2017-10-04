require('dotenv').config;
const express = require('express'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      mustacheExpress = require('mustache-express'),
      pgp = require('pg-promise'),
      app = express(),
      PORT = process.env.PORT || 8080,
      cookieParser = require('cookie-parser'),
      session = require('express-session');


// body-parser setup.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view setup.
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// asset setup.
app.use(express.static(__dirname + '/public'));

// auth setup.
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// logger setup.
app.use(logger('dev'));

const auth = require('./services/auth.js');
app.use(auth.passportInstance);
app.use(auth.passportSession);
app.use(cookieParser());

// root route.
app.get('/', (req, res) => {
  res.render('index');
})

app.get('/show', (req, res) => {
  res.render('show');
});

// Hook up controllers yourself.
app.use('/users', require('./controllers/users-controller'));

app.listen(PORT, () => console.log('Server listening on port', PORT));