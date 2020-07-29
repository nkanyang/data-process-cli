const { map , reduce } = require('./days-to-ship')

test('set NumberOfOrders to 1 when the order appears for first time ', () => {
  let result = {};
  let order = {
    "Region": "Asia",
    "Country": "China",
    "Order Date": "7/27/2012"
  }
  map(result)(order);
  expect(result['2012']['07']['Regions']['Asia']['Countries']['China']['NumberOfOrders']).toBe(1);
});

test('increase NumberOfOrders when the Region, Country and Month of order are the same', () => {
  let result = {};
  let order1 = {
    "Region": "Asia",
    "Country": "China",
    "Order Date": "7/28/2012"
  }
  let order2 = {
    "Region": "Asia",
    "Country": "China",
    "Order Date": "7/20/2012"
  }
  map(result)(order1);
  map(result)(order2);
  expect(result['2012']['07']['Regions']['Asia']['Countries']['China']['NumberOfOrders']).toBe(2);
});

test('set TotalDaysToShip as the days to ship in order when the order appears for first time ', () => {
  let result = {};
  let order = {
    "Region": "Asia",
    "Country": "China",
    "Order Date": "7/27/2012",
    "Ship Date": "7/29/2012"
  }
  map(result)(order);
  expect(result['2012']['07']['Regions']['Asia']['Countries']['China']['TotalDaysToShip']).toBe(2);
});

test('add TotalDaysToShip by the days to ship in order when twhen the Region, Country and Month of order are the same ', () => {
  let result = {};
  let order1 = {
    "Region": "Asia",
    "Country": "China",
    "Order Date": "7/27/2012",
    "Ship Date": "7/29/2012"
  }
  let order2 = {
    "Region": "Asia",
    "Country": "China",
    "Order Date": "7/17/2012",
    "Ship Date": "7/29/2012"
  }
  map(result)(order1);
  map(result)(order2);
  expect(result['2012']['07']['Regions']['Asia']['Countries']['China']['TotalDaysToShip']).toBe(14);
  expect(result['2012']['07']['Regions']['Asia']['Countries']['China']['NumberOfOrders']).toBe(2);
});

test('calculate AvgDaysToShip of per country ', () => {
  let result = {
    "2014":{
      "03":{
        "Regions":{
          "Asia":{
            "Countries":{
              "China":{
                "TotalDaysToShip": 40,
                "NumberOfOrders":2
              }
            }
          }
        }
      }
    }
  };
  reduce(result);
  expect(result['2014']['03']['Regions']['Asia']['Countries']['China']['AvgDaysToShip']).toBe(20);
});

test('calculate AvgDaysToShip per year ', () => {
  let result = {
    "2014":{
      "03":{
        "Regions":{
          "Asia":{
            "Countries":{
              "China":{
                "TotalDaysToShip": 40,
                "NumberOfOrders":2
              },
              "Japan":{
                "TotalDaysToShip": 20,
                "NumberOfOrders":2
              }
            }
          }
        }
      }
    }
  };
  reduce(result);
  expect(result['2014']['03']['AvgDaysToShip']).toBe(15);
  expect(result['2014']['03']['NumberOfOrders']).toBe(4);
});

test('calculate NumberOfOrders per year ', () => {
  let result = {
    "2014":{
      "03":{
        "Regions":{
          "Asia":{
            "Countries":{
              "China":{
                "TotalDaysToShip": 40,
                "NumberOfOrders":2
              },
              "Japan":{
                "TotalDaysToShip": 20,
                "NumberOfOrders":2
              }
            }
          },
          "Europe":{
            "Countries":{
              "England":{
                "TotalDaysToShip": 40,
                "NumberOfOrders":2
              },
              "France":{
                "TotalDaysToShip": 20,
                "NumberOfOrders":1
              }
            }
          }
        }
      }
    }
  };
  reduce(result);
  expect(result['2014']['03']['NumberOfOrders']).toBe(7);
  expect(result['2014']['03']['AvgDaysToShip']).toBe(17.1);
});
