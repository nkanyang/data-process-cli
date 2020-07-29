const np = require('number-precision');

const MILLISECONDS_IN_A_SECOND = 1000;
const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

function getObjByPath(rootObj){
  if(!rootObj){
    console.log("root level is null");
    return null;
  }
  curLevel = rootObj;
  for(let i = 1; i < arguments.length; i++){
    if(!arguments[i]){
      return curLevel;
    }
    curLevel[arguments[i]] = curLevel[arguments[i]] || {}
    curLevel = curLevel[arguments[i]];
  }
  return curLevel;
}


function sumup(sumObj, keyInSumObj, value){
  sumObj = sumObj || {};
  handleProperty(sumObj, keyInSumObj, value,(sum, value) => np.plus(sum,value));
}

function sumupInt(sumObj, keyInSumObj, value){
  sumObj = sumObj || {};
  handleProperty(sumObj, keyInSumObj, value,(sum, value) => sum + value);
}

function inc(counterObj, keyInCounterObj){
  counterObj = counterObj || {};
  handleProperty(counterObj, keyInCounterObj, 1,(sum, value) => sum + value);
}

//handle the value by handler and update the result to the key in result 0bject 
function handleProperty(object, key, value, handler){
  if(object === undefined){
    object = {};
  }
  object[key] === undefined ? object[key] = value : object[key] = handler(object[key],value)
  return object;
}

function avg(total,num){
  return total / num;
}

function days(startDate, endDate) {
  let stime = new Date(startDate);
  let etime = new Date(endDate);
  return Math.round( (etime.getTime() - stime.getTime()) / MILLISECONDS_IN_A_DAY);
}

function padMonth(month) {
  return month < 10? '0' + month : ''+ month;
}

function timeSpan(startDate, endDate){
  let diff = endDate.getTime() - startDate.getTime();
  let seconds = Math.floor(diff / MILLISECONDS_IN_A_SECOND);
  let milliseconds = diff % MILLISECONDS_IN_A_SECOND;
  return `${seconds} seconds : ${milliseconds} milliseconds`
}

module.exports = {
  getObjByPath,
  sumup,
  sumupInt,
  inc,
  avg,
  padMonth,
  days,
  timeSpan
}