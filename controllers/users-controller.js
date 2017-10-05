const User = require('../models/user');
const router = require('express').Router();
const passport = require('passport');

const auth = require('../services/auth');

// Sign up page.
router.get('/signup',
  User.getCatFace,
  (req, res) => {
  res.render('users/signup');
});

//login
router.get('/login', User.getCatFace, (req, res) => {
  res.render('users/login');
});

// Post to create new user (params are username/password).
router.post('/', User.getCatFace,
  passport.authenticate(
    'local-signup', {
        failureRedirect: '/users/signup',
        successRedirect: '/cats'
    }
  )
);

// Post to login (params are username/password).
router.post('/login', User.getCatFace,
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
