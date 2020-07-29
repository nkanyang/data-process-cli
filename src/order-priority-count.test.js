const { map } = require('./order-priority-count');

test('set 1 when the order priority appears for first time ', () => {
  let result = {};
  let order = {
    "Order Priority": "M",
    "Order Date": "7/27/2012"
  }
  map(result)(order);
  expect(result['2012']['07']['M']).toBe(1);
});

test('increase the order priority counter', () => {
  let result = {};
  let order1 = {
    "Order Priority": "M",
    "Order Date": "7/27/2012"
  }
  let order2 = {
    "Order Priority": "M",
    "Order Date": "7/17/2012"
  }
  map(result)(order1);
  map(result)(order2);
  expect(result['2012']['07']['M']).toBe(2);
});

test('do not increase the order priority counter when not the same priority', () => {
  let result = {};
  let order1 = {
    "Order Priority": "L",
    "Order Date": "7/27/2012"
  }
  let order2 = {
    "Order Priority": "M",
    "Order Date": "7/17/2012"
  }
  map(result)(order1);
  map(result)(order2);
  expect(result['2012']['07']['M']).toBe(1);
});

test('do not increase the order priority counter when not in the same month', () => {
  let result = {};
  let order1 = {
    "Order Priority": "M",
    "Order Date": "7/27/2012"
  }
  let order2 = {
    "Order Priority": "M",
    "Order Date": "8/17/2012"
  }
  map(result)(order1);
  map(result)(order2);
  expect(result['2012']['07']['M']).toBe(1);
});
