require('dotenv').config;
const express = require('express'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      mustacheExpress = require('mustache-express'),
      ejs = require('ejs'),
      pgp = require('pg-promise'),
      app = express(),
      PORT = process.env.PORT || 8080,
      cookieParser = require('cookie-parser'),
      session = require('express-session'),
      catFacts = require('cat-facts');


// body-parser setup.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view setup.
app.engine('html', mustacheExpress());
app.set('view engine', 'ejs');
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

const getCatFact = (req, res, next) => {   
  let randomFact = catFacts.random();
  res.locals.fact = randomFact;
  next();
}
// root route.
app.get('/', getCatFact, (req, res) => {
  res.render('./pages/index');
})


// Hook up controllers yourself.
app.use('/users', require('./controllers/users-controller'));
app.use('/cats', require('./controllers/cats-controller'));

app.listen(PORT, () => console.log('Server listening on port', PORT));
