const csvParser = require('csv-parser');
const stringify = require('json-stable-stringify');
const fs = require('fs');

const revenue = require('./revenue-cost-profit');
const daysToShip = require('./days-to-ship');
const orderPriority = require('./order-priority-count');
const { timeSpan } = require('./statistics');

const defaultDataFile = './data.csv';

var analyseRevenue = (outputFile, sourceFile) => {
  outputFile = outputFile || 'output-revenue.json';
  sourceFile = sourceFile || defaultDataFile;
  processData(sourceFile, revenue, outputFile);
}

var analyseDaysToShip = (outputFile, sourceFile) => {
  outputFile = outputFile || 'output-days-to-ship.json';
  sourceFile = sourceFile || defaultDataFile;
  processData(sourceFile, daysToShip, outputFile);
}

var analyseOrderPriority = (outputFile, sourceFile) => {
  outputFile = outputFile || 'output-order-priority.json';
  sourceFile = sourceFile || defaultDataFile;
  processData(sourceFile, orderPriority, outputFile);
}

var processData = (sourceFile, processor, outputFile) => {
  let result = {};
  let startTime = new Date();
  fs.createReadStream(sourceFile)
  .on('error', () => {
      console.log("Source file: " + sourceFile + " Not Found.")
  })
  .pipe(csvParser())
  .on('data',processor.map(result))
  .on('end', () => {
    if(processor.reduce){
      processor.reduce(result);
    }
    fs.writeFileSync(outputFile, stringify(result, { space: '    ' }));
    let endDate = new Date();
    console.log("Result written to file " + outputFile + " successfully!");
    console.log("Time Cosumed: " + timeSpan(startTime, endDate));
  })
}

module.exports = { analyseRevenue, analyseDaysToShip, analyseOrderPriority };