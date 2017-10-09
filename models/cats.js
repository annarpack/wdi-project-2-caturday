// add all required files
const axios = require('axios');
const db = require('../db/config');
const cats = require('cat-ascii-faces');
const Helpers = require('./helpers');

// create the model object
const Cats = {}

//API requirements
const API_URL = 'http://thecatapi.com/api/images/';
const API_KEY = process.env.API_KEY;


Cats.fetchNew = (req, res, next) => {
  const apiUrl = `${API_URL}get?format=html&type=jpg`
  axios.get(apiUrl)
    .then((response) => {
      //console.log(response.data.split('"')[5]);
      res.locals.fetchCatUrl = response.data.split('"')[5];
      savedUrl = res.locals.fetchCatUrl;
      next();
    })
    .catch((error) => {
      console.log(error);
    });

}
//--------------------------------------------------------------
//--------------------------- Sep ---------------------
//--------------------------------------------------------------
//
Cats.findAll = (req, res, next) => {
  const user_id = req.user.id;
  console.log(`user_id in Cats.findAll: ${user_id}`);

  db.manyOrNone('SELECT * FROM favorites WHERE user_id = $1 ORDER BY series_id', [user_id]).then(data => {
    res.locals.allCatsData = data;   
    next();   
  });
};//end find all

Cats.findById = (req, res, next) => { 
  const series_id = req.body.series_id;
  const user_id = req.user.id;
  const catId = req.params.id;
  console.log(`id in findById: ${catId}`);
  db.one('SELECT * FROM favorites WHERE id=$1 AND user_id = $2', [catId, user_id] // use the id here
       ).then(data => {       
    res.locals.catData = data;       
    next();   
  });
}; // end find by id
//
// //--------------------------------------------------------------
// //--------------------------- API ROUTES ---------------------
// //--------------------------------------------------------------
//
Cats.create = (req, res, next) => { 
  const user_id = req.user.id;
  console.log(`user_id in Cats.create: ${user_id}`);
  const url = req.body.url;
  console.log(`url in Cats.create: ${url}`);
  let series_id = Number(req.body.series_id);
  console.log(`series_id in Cats.create: ${series_id}`);
   
  db.one('INSERT INTO favorites (url, series_id, user_id) VALUES ($1, $2, $3) returning id',
  [url, series_id, user_id] ).then(data => {   
    console.log('Data inside Cats.create: ' + data.id);   
    res.locals.newData = data;   
    next(); 
  });
} //end cats create


Cats.update = (req, res, next) => { 
  const id = Number(req.body.id),
           url = req.body.url,
          oldValue = req.body.oldValue,
           series_id = Number(req.body.series); 
  //movePosition(req.body.series_id);
  db.one('UPDATE favorites SET url = $1, series_id = $2 WHERE id = $3 returning id',     [url, series_id, id] ).then(data => {   
    res.locals.editedData = data;   
    next(); 
  })
} // end cats update

Cats.destroy = (req, res, next) => {   
  const id = Number(req.params.id);   
  db.none('DELETE FROM favorites WHERE id = $1', [id] ).then(() => {       
    next();   
  });
}; // end cats delete


//--------------------------------------------------------------
//--------------------------- get cat face ---------------------
//--------------------------------------------------------------

Cats.getCatFace = (req, res, next) => {   
  const face = cats();
  res.locals.face = face;
  next();
}


//export the model
module.exports = Cats;
