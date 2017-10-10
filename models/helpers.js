const db = require('../db/config');
const Helpers = {};

Helpers.setPosition = (req, res, next) => {
  let series_Arr = [];
  db.manyOrNone('SELECT id, series_id FROM favorites').then(data => { 
    //console.log(`data1 inside get position: ${data}`);
    data.forEach(function(elm) {
      //console.log(`Inside getPosition elm.id: ${elm.id} elm.series_id: ${elm.series_id}`);
      if (elm.id > elm.series_id) {
        elm.series_id = elm.id;
        //console.log(`elm.series_id inside getPosition: ${elm.series_id}`); 
        db.one('UPDATE favorites SET series_id = $1 WHERE id = $2 returning *', [elm.series_id, elm.id])
      }
      series_Arr.push(elm.series_id);
      res.locals.series_Arr = series_Arr;
      console.log(`series_Arr inside getPosition: ${res.locals.series_Arr}`); 
      //return series_Arr;
    }) // end for each
  }) // end db many or none
  next();
} // end get Position


Helpers.getMaxPosition = (req, res, next) => {
  db.one('SELECT max(id) FROM favorites').then(data => {
    if (data.max === null || '') {
      res.locals.position = 0;
    } else {
      res.locals.position = data.max;
    }
    console.log(`data.max inside getMaxPosition: ${res.locals.position}`);
    //return data.max;
    next();
  })
}

Helpers.move = (finalArr, id_Arr) => {
  let i = 1;
  finalArr.forEach(function(elm) {
    console.log(`elm inside for each in movePosition: ${elm}`);
    console.log(`i inside for each in movePosition: ${i}`);
    db.one(
      'UPDATE favorites SET series_id = $1 WHERE id = $2 returning *', [elm, i] );
      i++;
  })
}
Helpers.reorder = (array, oldValue, newValue) => {
  const arrWithout = array.slice(0,
    array.indexOf(oldValue)
  ).concat(
    array.slice(array.indexOf(oldValue) + 1,
      array.length));
  console.log('arrWithout', arrWithout);
  const arrBefore = arrWithout.slice(0, array.indexOf(newValue));
  console.log('arrBefore', arrBefore);
  const arrAfter = arrWithout.slice(array.indexOf(newValue));
  console.log('arrAfter', arrAfter);
  const newArr = arrBefore.concat([oldValue], arrAfter);
  console.log('newArr', newArr);
  return newArr;
  //Helpers.move(newArr);
}

Helpers.movePosition = (req, res, next) => {
  //(oldPosition, newPosition) => {
  let series_Arr = [];
  let id_Arr = [];
  //console.log(`series_Arr inside getPosition: ${res.locals.series_Arr}`); 
  const oldPosition = Number(req.body.oldValue);
  console.log(`oldPosition inside movePosition: ${oldPosition}`);
  const newPosition = Number(req.body.series);
  console.log(`newPosition inside movePosition: ${newPosition}`);

  db.manyOrNone('SELECT series_id, id FROM favorites ORDER BY series_id').then(data => { 
    //console.log(`data inside move position: ${data}`);
    data.forEach(function(elm) {
      series_Arr.push(elm.series_id);
      id_Arr.push(elm.id);
    })
    console.log(`series_Arr inside movePosition: ${series_Arr}`); 
    const finalArr = Helpers.reorder(series_Arr, oldPosition, newPosition);
    console.log(`finalArr inside movePosition: ${finalArr}`);
    Helpers.move(finalArr, id_Arr);
  });
  next();
} //end move position

// ----------------------------------------------

//export the model
module.exports = Helpers;
