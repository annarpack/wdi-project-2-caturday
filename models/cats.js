// add all required files
const axios = require('axios');
const db = require('../db/config');
const cats = require('cat-ascii-faces');

// create the model object
const Cats = {}

//API requirements
const API_URL = 'http://thecatapi.com/api/images/';
const API_KEY = process.env.API_KEY;

let seriesNum = '';
let seriesNums = [];

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
// const getPosition = () => {
//   let largestNum = 0;
//   db.manyOrNone('SELECT * FROM favorites ORDER BY series').then(data => { 
//     //console.log(`data inside get position: ${data}`);
//     data.forEach(function(elm){
//       if(elm.series > largestNum) {
//         largestNum = elm.series;
//         console.log(`largestNum inside getPosition: ${largestNum}`); 
//        } //next();
//     })
//   })
//   return largestNum;
// }
// const fakeFunc = () => {
//   let fake = 11;
//   return fake;
// }
// const movePosition = () => {
//   let seriesArr = [];
//   db.manyOrNone('SELECT * FROM favorites ORDER BY series').then(data => { 
//     console.log(`data inside move position: ${data}`);
//     data.forEach(function(elm){
//       seriesArr.push(elm.series);
//       console.log(`seriesArr inside movePosition: ${seriesArr}`); 
//     })      
//     console.log(`seriesArr inside movePosition: ${seriesArr}`); 
//   });
// } //end move position
//--------------------------------------------------------------
//--------------------------- Sep ---------------------
//--------------------------------------------------------------
//
Cats.findAll = (req, res, next) => {
  db.manyOrNone('SELECT * FROM favorites ORDER BY series').then(data => {       
    res.locals.allCatsData = data;   
    next();   
  });
  // const position = getPosition();
  // console.log(`position in find all: ${position}`);
  // const fake = fakeFunc();
  // console.log(`fake in find all: ${fake}`);
};

Cats.findById = (req, res, next) => {   
  const catId = req.params.id;
  console.log(`id: ${catId}`);   
  db.one('SELECT * FROM favorites WHERE id=$1', [catId] // use the id here
       ).then(data => {       
    res.locals.catData = data;       
    next();   
  });
};
//
// //--------------------------------------------------------------
// //--------------------------- API ROUTES ---------------------
// //--------------------------------------------------------------
//
Cats.create = (req, res, next) => { 
  const url = req.body.url;
  console.log(`url: ${url}`);
  if (seriesNum === undefined || seriesNum === '') {
    seriesNum = 1;
  } else {
    seriesNum++;
  }
  // if(seriesNums.length === 0 ) { seriesNums.push(1) };
  // if(seriesNums.lenght > 0) {
  //   const n = seriesNums.length + 1;
  //   seriesNum = n;
  //   seriesNums.push(n);
  // }
  // console.log(`Series: ${seriesNum}`);
   
  db.one('INSERT INTO favorites (url, series) VALUES ($1, $2) returning id',     [url, seriesNum] ).then(data => {   
    console.log('Data: ' + data.id);   
    res.locals.newData = data;   
    next(); 
  });
} //end cats create


Cats.update = (req, res, next) => { 
  const id = Number(req.body.id),
           url = req.body.url,
           series = req.body.series; 
  db.one('UPDATE favorites SET url = $1, series = $2 WHERE id = $3 returning id',     [url, series, id] ).then(data => {   
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

//
// //--------------------------------------------------------------
// //--------------------------- Change Position ---------------------
// //--------------------------------------------------------------
//
Cats.getCatFace = (req, res, next) => {   
  const face = cats();
  res.locals.face = face;
  next();
}
// Cats.changePosition = (req, res, next) => {
//     db.manyOrNone(
//           'SELECT * FROM favorites ORDER BY series'
//       ).then(data => {
//           res.locals.allCatsData = data;
//           next();
//       });
// }

//export the model
module.exports = Cats;
