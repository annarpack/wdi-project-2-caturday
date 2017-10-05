const User = require('../models/user');
const router = require('express').Router();
const passport = require('passport');

const auth = require('../services/auth');

// Sign up page.
router.get('/signup', (req, res) => {
  res.render('users/signup');
});

//login
router.get('/login', (req, res) => {
  res.render('users/login');
});

// Post to create new user (params are username/password).
router.post('/',
  passport.authenticate(
    'local-signup', {
        failureRedirect: '/users/signup',
        successRedirect: '/cats'
    }
  )
);

// Post to login (params are username/password).
router.post('/login',
  passport.authenticate(
    'local-login', {
        failureRedirect: '/users/signup',
        successRedirect: '/cats'
    }
));

// Logout.

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


module.exports = router;
