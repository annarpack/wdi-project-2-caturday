const db = require('../db/config');
const Helpers = {};

Helpers.setPosition = (req, res, next) => {
  let series_Arr = [];
db.manyOrNone('SELECT id, series_id FROM favorites').then(data => { 
  //console.log(`data1 inside get position: ${data}`);
  data.forEach(function(elm){
    //console.log(`Inside getPosition elm.id: ${elm.id} elm.series_id: ${elm.series_id}`);
    if(elm.id > elm.series_id) {
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
    if(data.max === null || '') { res.locals.position = 0; }
    else {res.locals.position = data.max; }
    console.log(`data.max inside getMaxPosition: ${res.locals.position}`);
    //return data.max;
    next();
  })
}

Helpers.move = (finalArr, id_Arr) => {
  let i = 1;
  finalArr.forEach(function(elm) {
    const x = finalArr.indexOf(elm) + 1;
    console.log(`elm index inside for each in movePosition: ${x}`);
    console.log(`elm inside for each in movePosition: ${elm}`);
    console.log(`id inside for each in movePosition: ${i}`);
    db.one(
      'UPDATE favorites SET series_id = $1 WHERE id = $2 returning *',
    [elm, i] );
    i++;
  })
}
Helpers.reorder = (array, oldValue, newValue, id_Arr) => {
//let newArr = [];
console.log(array);
console.log(`oldValue: ${oldValue}`);
console.log(`newValue: ${newValue}`);

const index = array.indexOf(oldValue);
console.log(`index of oldValue: ${index}`);
const newIndex = array.indexOf(newValue);
console.log(`index of newValue: ${newIndex}`);

let partOne = [];
let x = index - 1;
if(x !== 0){
    console.log(`index -1: ${x}`);
    partOne = array.slice(0, x);
    console.log(`partOne: ${partOne}`);
}
let partTwo = [];
  partTwo = array.slice(x, index);
  console.log(`partTwo: ${partTwo}`);

const partThree = [];
partThree.push(oldValue);
console.log(`partThree: ${partThree}`);

let partFour = [];
let y = newIndex;
if(y !== array.length || oldValue){
  console.log(`NewIndex: ${y}`);

  partFour = array.slice(y, array.length);
  console.log(`partFour1: ${partFour}`);
}
// if(partFour === ''){
//   partFour.push(y);
//   console.log(`partFour2: ${partFour}`);
// }


const finalArr = partOne.concat(partTwo, partThree, partFour);
console.log(`finalArr: ${finalArr}`);
//return finalArr;
Helpers.move(finalArr, id_Arr);
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
    data.forEach(function(elm){
      series_Arr.push(elm.series_id);
      id_Arr.push(elm.id);
    })
    console.log(`series_Arr inside movePosition: ${series_Arr}`); 
    const finalArr = Helpers.reorder(series_Arr, oldPosition, newPosition, id_Arr);
    console.log(`finalArr inside movePosition: ${finalArr}`);
  });
  next();
} //end move position

//export the model
module.exports = Helpers;
