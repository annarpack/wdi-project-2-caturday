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
//--------------------------- Sep ---------------------
//--------------------------------------------------------------
//
Cats.findAll = (req, res, next) => {
    db.manyOrNone(
        'SELECT * FROM favorites ORDER BY series'
    ).then(data => {
        res.locals.allCatsData = data;
        next();
    });
};

Cats.findById = (req, res, next) => {
    const catId = req.params.id;
    console.log(`id: ${catId}`);
    db.one(
        'SELECT * FROM favorites WHERE id=$1', [catId] // use the id here
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
  }
  else {
    seriesNum++;
  }
  // if(seriesNums.length === 0 ) { seriesNums.push(1) };
  // if(seriesNums.lenght > 0) {
  //   const n = seriesNums.length + 1;
  //   seriesNum = n;
  //   seriesNums.push(n);
  // }
console.log(`Series: ${seriesNum}`);
  db.one(
    'INSERT INTO favorites (url, series) VALUES ($1, $2) returning id',
    [url, seriesNum]
  ).then(data => {
    console.log('Data: ' + data.id);
    res.locals.newData = data;
    next();
  });
}

Cats.update = (req, res, next) => {
  const id = Number(req.body.id),
        url = req.body.url,
        series = req.body.series;
  db.one(
    'UPDATE favorites SET url = $1, series = $2 WHERE id = $3 returning id',
    [url, series, id]
  ).then(data => {
    res.locals.editedData = data;
    next();
  })
}

Cats.destroy = (req, res, next) => {
    const id = Number(req.params.id);
    db.none(
        'DELETE FROM favorites WHERE id = $1', [id]
    ).then(() => {
        next();
    });
};

//
// //--------------------------------------------------------------
// //--------------------------- Change Position ---------------------
// //--------------------------------------------------------------
//
// Cats.getCatFace = (req, res, next) => {
//   res.locals.catFace = cats();
//   console.log(res.locals.catFace );
//   next();
// }
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
