#!/usr/bin/env node

const program = require('commander')

const { analyseRevenue , analyseDaysToShip, analyseOrderPriority } = require('./index')

program
  .version('1.0.0')
  .description('Order Analysis Program');


program
  .command('revenue [fileName]')
  .alias('r')
  .option('-s, --source <sourceFile>', 'file name of source data')
  .description('Output the total Revenue, Cost and Profit for each Region and Item Type into file given by filename. '
              + 'If no source file supplied, read data from data.csv in current directory. '
              + 'If no output filename supplied, write into default file output-revenue.json in current directory')
  .action( (fileName, option) => {
    analyseRevenue(fileName, option.source);
  });

  program
  .command('priority [fileName]')
  .alias('p')
  .option('-s, --source <sourceFile>', 'file name of source data')
  .description('Output the number of each Priority Orders for each Month.'
              + 'If no source file supplied, read data from data.csv in current directory. '
              + 'If no output filename supplied, write into default file output-order-priority.json in current directory')

  .action( (fileName, option) => {
    analyseOrderPriority(fileName, option.source);
  });

  program
  .command('time [fileName]')
  .alias('t')
  .option('-s, --source <sourceFile>', 'file name of source data')
  .description('Output the average time to ship for order (in days) for each Year, Month, Region and Country'
              + 'If no source file supplied, read data from data.csv in current directory. '
              + 'If no output filename supplied, write into default file output-days-to-ship.json in current directory')
  .action( (fileName, option) => {
    analyseDaysToShip(fileName, option.source);
  });

  program.parse(process.argv);
