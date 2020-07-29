const { getObjByPath, sumup, sumupInt, inc, avg, padMonth, timeSpan } = require('./statistics')

test('return null if rootObj not exist', () => {
  let root;
  expect(getObjByPath(root,"key1")).toBeNull();
});

test('allocate object in the path if not exist, return most deep object', () => {
  let root = {};
  getObjByPath(root, "level1","leve2", "level3");
  expect(root["level1"]["leve2"]["level3"]).toBeDefined();
});

test('sum up float to be precise', () => {
  let sum = {
    "total":0.1
  };
  sumup(sum, 'total', 0.2);
  expect(sum['total']).toBe(0.3);
});

test('sum up Int ', () => {
  let sum = {
    "total":1
  };
  sumupInt(sum, 'total', 2);
  expect(sum['total']).toBe(3);
});

test('Inc the value of key by 1 ', () => {
  let sum = {
    "number":1
  };
  inc(sum, 'number');
  expect(sum['number']).toBe(2);
});

test('return of avg float to be one figure after dot)', () => {
  expect(avg(5, 3)).toBe(1.7);
});

test(' month before 10', () => {
  expect(padMonth(5)).toBe("05")
});

test(' month after 10', () => {
  expect(padMonth(11)).toBe("11")
});

test('time span less than a second', () => {
  let startDate = new Date();
  let endDate = new Date(startDate.getTime() + 999);
  expect(timeSpan(startDate,endDate)).toBe("0 seconds : 999 milliseconds")
});

test('time span more than a second', () => {
  let startDate = new Date();
  let endDate = new Date(startDate.getTime() + 10999);
  expect(timeSpan(startDate,endDate)).toBe("10 seconds : 999 milliseconds")
});