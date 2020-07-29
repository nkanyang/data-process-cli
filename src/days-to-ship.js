const { days, getObjByPath, padMonth, sumupInt, inc, avg } = require('./statistics');

var map = (result) => (order) =>{
  let orderDate = new Date(order['Order Date']);
  let daysToShip = days(order['Order Date'], order['Ship Date']);

  let perCountry = getObjByPath(
    result, 
    orderDate.getFullYear(), 
    padMonth(orderDate.getMonth()+1),
    'Regions', 
    order['Region'], 
    'Countries', 
    order['Country']);
  sumupInt(perCountry, 'TotalDaysToShip',daysToShip);
  inc(perCountry, 'NumberOfOrders');
}

var reduce = (result) => {
  // let current = result;
  Object.keys(result).forEach((year) => {
    let perYear = getObjByPath(result, year);

    let yearData = result[year];
    Object.keys(yearData).forEach((month) => {
      let perMonth = getObjByPath(result, year,month);

      let monthData = yearData[month];
      Object.keys(monthData['Regions']).forEach((region) => {
        let perRegion = getObjByPath(result, year, month, 'Regions', region);
        
        regionData = monthData['Regions'][region];
        Object.keys(regionData['Countries']).forEach((country) => {
          let perCountry = getObjByPath(result, year, month, 'Regions', region, 'Countries', country);
          getAvgDaysToShip(perCountry);
          addup(perRegion, perCountry);
        });
        getAvgDaysToShip(perRegion);
        addup(perMonth,perRegion);
      });
      getAvgDaysToShip(perMonth);
      addup(perYear,perMonth);
    });
    getAvgDaysToShip(perYear);
  });
}

var getAvgDaysToShip = (sumobj) => {
  sumobj['AvgDaysToShip'] = avg(sumobj['TotalDaysToShip'], sumobj['NumberOfOrders']);
}

var addup = (sumObj, obj) => {
  sumupInt(sumObj, 'TotalDaysToShip', obj['TotalDaysToShip']);
  sumupInt(sumObj, 'NumberOfOrders', obj['NumberOfOrders']);
}

module.exports = { map, reduce };