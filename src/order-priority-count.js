const { getObjByPath, padMonth, inc } = require('./statistics');

var sumOrderPriorityPerMonth = (result) => (order) =>  {
  let orderDate = new Date(order['Order Date']);
  let targetObj = getObjByPath(
    result, 
    orderDate.getFullYear(), 
    padMonth(orderDate.getMonth()+1));
  inc(targetObj,order['Order Priority']);
}

module.exports.map = sumOrderPriorityPerMonth;
