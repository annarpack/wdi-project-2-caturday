const User = require('../models/user');
const router = require('express').Router();
const passport = require('passport');

const auth = require('../services/auth');

// Sign up page.
router.get('/signup', (req, res) => {
  res.render('users/signup');
});

// Post to create new user (params are username/password).
router.post('/',
  passport.authenticate(
    'local-signup', {
        failureRedirect: '/users/signup',
        successRedirect: '/show'
    }
  )
);

// Post to login (params are username/password).
router.post('/login',
  passport.authenticate(
    'local-login', {
        failureRedirect: '/users/signup',
        successRedirect: '/show'
    }
));

// Logout.

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


module.exports = router;
