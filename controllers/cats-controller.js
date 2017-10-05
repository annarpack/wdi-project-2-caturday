const router = require('express').Router();
const Cats = require('../models/cats');

// get controller homepage
router.get('/',
 Cats.fetchNew,
 // Cats.getCatFace,
 (req, res) => {
    res.render('cats/index',{
      url: res.locals.fetchCatUrl
      // catFace: res.locals.catFace
    });
});
// get obj by id
router.get('/favs',
 Cats.findAll,
(req, res) => {
    res.render('cats/favs', {
            favs: res.locals.allCatsData
      });
});
// get obj by id
router.get('/favs/edit/:id',
 Cats.findById,
(req, res) => {
    res.render('cats/edit', {
      cat: res.locals.catData });
});

//--------------------------------------------------------------
//--------------------------- API ROUTES ---------------------
//--------------------------------------------------------------

// post new
router.post('/new',
  Cats.create,
  (req, res) => {
    res.render('cats/favs', res.locals.newData)
  });

// update
router.put('/favs/edit/:id',
    Cats.update,
    (req, res) => {
      res.render('cats/favs', res.locals.editedData)
    });

// delete
router.delete('/favs/:id',
  Cats.destroy,
  (req, res) => {
    res.render('cats/favs')
  });
//--------------------------------------------------------------
//--------------------------- OTHER ---------------------
//--------------------------------------------------------------



module.exports = router;
