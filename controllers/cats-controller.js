const router = require('express').Router();
const Cats = require('../models/cats');
const Helpers = require('../models/helpers');
const auth = require('../services/auth');

// get controller homepage
router.get('/',
  auth.restrict,
  Helpers.getMaxPosition,
  Cats.fetchNew,
  Cats.getCatFace,
 (req, res) => {
    res.render('cats/index',{
      position: res.locals.position,
      url: res.locals.fetchCatUrl
      // catFace: res.locals.catFace
    });
});
// get obj by id
router.get('/favs',
 auth.restrict,
Helpers.getMaxPosition,
 Cats.findAll,
 Cats.getCatFace,
(req, res) => {
    res.render('cats/favs', {
            favs: res.locals.allCatsData,
            face: res.locals.face,
            position: res.locals.position
      });
});
// get obj by id
router.get('/favs/edit/:id',
auth.restrict,
 Cats.findById,
  Cats.getCatFace,
(req, res) => {
    res.render('cats/edit', {
      cat: res.locals.catData });
});

//--------------------------------------------------------------
//--------------------------- API ROUTES ---------------------
//--------------------------------------------------------------

// post new
router.post('/new',
  auth.restrict,
  Helpers.getMaxPosition,
  Cats.create,
  (req, res) => {
    res.render('cats/favs', res.locals.newData)
  });

// update
router.put('/favs/edit/:id',
  auth.restrict,
  Helpers.getMaxPosition,
  Helpers.movePosition,
  Cats.update,
    (req, res) => {
      res.render('cats/favs', res.locals.editedData)
    });

// delete
router.delete('/favs/:id',
  auth.restrict,
  Cats.destroy,
  (req, res) => {
    res.render('cats/favs')
  });



module.exports = router;
