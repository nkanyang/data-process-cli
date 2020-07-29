const { sumup , getObjByPath } = require('./statistics');

var map = (result) => (order) => {
  let perTtemType = getObjByPath(
    result, 
    'Regions', 
    order['Region'], 
    'Countries', 
    order['Country'], 
    'ItemTypes',
    order['Item Type']);
    sumup(perTtemType, 'Revenue', parseFloat(order['Total Revenue']));
    sumup(perTtemType, 'Cost', parseFloat(order['Total Cost']));
    sumup(perTtemType, 'Profit', parseFloat(order['Total Profit']));
}

var reduce = (result) => {
  Object.keys(result['Regions']).forEach((region) => {
    let perRegion = getObjByPath(result, 'Regions', [region],'Total');
    let countryData = result['Regions'][region]['Countries'];
    Object.keys(countryData).forEach((country) => {
      let perCountry = getObjByPath(result, 'Regions', [region],'Countries',[country],'Total');
      let typeData = countryData[country]['ItemTypes'];
      Object.keys(typeData).forEach((itemType) => {
        let perTypeTotal = getObjByPath(result, 'ItemTypes', [itemType]);
        addup(perCountry, typeData[itemType]);
        addup(perTypeTotal, typeData[itemType]);
      });
      addup(perRegion, perCountry);
    });
  });
}

var addup = (sumObj, obj) => {
  sumup(sumObj, 'Revenue', parseFloat(obj['Revenue']));
  sumup(sumObj, 'Cost', parseFloat(obj['Cost']));
  sumup(sumObj, 'Profit', parseFloat(obj['Profit']));
}

module.exports = { map, reduce };