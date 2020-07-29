const { map, reduce } = require('./revenue-cost-profit');

test('set value of Revenue, Cost adn Profit when the order appears for first time ', () => {
  let result = {};
  let order = {
    "Region": "Asia",
    "Country": "China",
    "Item Type": "Fruits",
    "Total Revenue": "14862.69",
    "Total Cost": "11023.56",
    "Total Profit": "3839.13"
  }
  map(result)(order);
  expect(result['Regions']['Asia']['Countries']['China']['ItemTypes']['Fruits']['Revenue']).toBe(14862.69);
  expect(result['Regions']['Asia']['Countries']['China']['ItemTypes']['Fruits']['Cost']).toBe(11023.56);
  expect(result['Regions']['Asia']['Countries']['China']['ItemTypes']['Fruits']['Profit']).toBe(3839.13);
})

test('sumup the value of Revenue and Cost when Region Country and Item Type are the same ', () => {
  let result = {};
  let order1 = {
    "Region": "Asia",
    "Country": "China",
    "Item Type": "Fruits",
    "Total Revenue": "14862.69",
    "Total Cost": "11023.56",
    "Total Profit": "3839.13"
  }
  let order2 = {
    "Region": "Asia",
    "Country": "China",
    "Item Type": "Fruits",
    "Total Revenue": "10000.00",
    "Total Cost": "6000.00",
    "Total Profit": "4000.00"
  }
  map(result)(order1);
  map(result)(order2);
  expect(result['Regions']['Asia']['Countries']['China']['ItemTypes']['Fruits']['Revenue']).toBe(24862.69);
  expect(result['Regions']['Asia']['Countries']['China']['ItemTypes']['Fruits']['Cost']).toBe(17023.56);
  expect(result['Regions']['Asia']['Countries']['China']['ItemTypes']['Fruits']['Profit']).toBe(7839.13);
})

test('not sumup the value of Revenue and Cost when Region Country and Item Type are not the same ', () => {
  let result = {};
  let order1 = {
    "Region": "Asia",
    "Country": "China",
    "Item Type": "Fruits",
    "Total Revenue": "14862.69",
    "Total Cost": "11023.56",
    "Total Profit": "3839.13"
  }
  let order2 = {
    "Region": "Asia",
    "Country": "China",
    "Item Type": "Beverages",
    "Total Revenue": "10000.00",
    "Total Cost": "6000.00",
    "Total Profit": "4000.00"
  }
  map(result)(order1);
  map(result)(order2);
  expect(result['Regions']['Asia']['Countries']['China']['ItemTypes']['Fruits']['Revenue']).toBe(14862.69);
  expect(result['Regions']['Asia']['Countries']['China']['ItemTypes']['Fruits']['Cost']).toBe(11023.56);
  expect(result['Regions']['Asia']['Countries']['China']['ItemTypes']['Fruits']['Profit']).toBe(3839.13);
})

test("reduce the result",() => {
  result = {
    "Regions":{
      "Europe":{
        "Countries":{
          "France":{
            "ItemTypes":{
              "Beverages":{
                "Revenue": 14862.69,
                "Cost": 11023.56,
                "Profit": 3839.13
              },
              "Clothes":{
                "Revenue": 14862.69,
                "Cost": 11023.56,
                "Profit": 3839.13
              }
            }
          }
        }
      },
      "Asia":{
        "Countries":{
          "Japan":{
            "ItemTypes":{
              "Beverages":{
                "Revenue": 14862.69,
                "Cost": 11023.56,
                "Profit": 3839.13
              },
              "Meat":{
                "Revenue": 14862.69,
                "Cost": 11023.56,
                "Profit": 3839.13
              }
            }
          }
        }
      }
    }
  }
  reduce(result);
  expect(result['ItemTypes']['Beverages']['Revenue']).toBe(29725.38);
  expect(result['ItemTypes']['Meat']['Revenue']).toBe(14862.69);
  expect(result['ItemTypes']['Clothes']['Revenue']).toBe(14862.69);
  expect(result['Regions']['Asia']['Countries']['Japan']['Total']['Revenue']).toBe(29725.38);
  expect(result['Regions']['Asia']['Countries']['Japan']['Total']['Cost']).toBe(22047.12);
  expect(result['Regions']['Asia']['Countries']['Japan']['Total']['Profit']).toBe(7678.26);
  expect(result['Regions']['Asia']['Total']['Revenue']).toBe(29725.38);
})
