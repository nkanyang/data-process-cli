# data-process-cli

This is a data process cli api powered by node.js.

- [data-process-cli](#data-process-cli)
  - [Introduction](#Introduction)
  - [How to install](#How-to-install)
  - [How to use](#How-to-use)
  - [Examples](#Examples)
    - [Revenue Cost and Profit](#Revenue-Cost-and-Profit)
    - [Order Priority](#Order-Priority)
    - [Days to Ship](#Days-to-Ship)
  - [Performance Optimization](#Performance-Optimization)
  - [FAQ](#FAQ)
## Introduction

The ali app takes a csv file as data source, and generates 1 json file per task spicified by a command.

The tasks are:

1.Get Total Revenue, Cost and Profit for each region and item type.

2.Get Number of each Priority Orders for each Month.

3.Get Average Time to ship(in days), and Number of Orders For Each Month(grouped by year), and by each Country(grouped by region),with totals for each levl.

The sample of source file and output file can be found in data-sample.We assume the data file contains clean data that make sense.

## How To Install
### Prerequisites

- node

### 1.Clone repository from github

- step 1: Clone the git repository to your local directory and enter the directory

`git clone https://github.com/nkanyang/data-process-cli.git data-process-cli`

`cd data-process-cli`
- step 2: Enter the directory data-process-cli and install modules

`npm install`

- step 3: There are scripts in the project can generate analysis report from data.scv in data-sample without install the app

```
npm run generate-shiptime-report 

> data-process-cli@1.0.0 generate-shiptime-report /Users/jessie/myproject/webfullstack2020/js/git-data-process-cli
> node src/commands.js t shiptime-report.json -s data-sample/data.csv

Result written to file shiptime-report.json successfully!
Time Cosumed: 0 seconds : 62 milliseconds
```

```
npm run generate-revenue-report

> data-process-cli@1.0.0 generate-revenue-report /Users/jessie/myproject/webfullstack2020/js/git-data-process-cli
> node src/commands.js r revenue-report.json -s data-sample/data.csv

Result written to file revenue-report.json successfully!
Time Cosumed: 0 seconds : 77 milliseconds
```

```
npm run generate-shiptime-report

> data-process-cli@1.0.0 generate-shiptime-report /Users/jessie/myproject/webfullstack2020/js/git-data-process-cli
> node src/commands.js t shiptime-report.json -s data-sample/data.csv

Result written to file shiptime-report.json successfully!
Time Cosumed: 0 seconds : 64 milliseconds
```

### 2.Install and Uninstall


- Install the app globaly and now you can use it everywhere

`npm link`

If this dosen't work out, try:

`sudo npm link`

- Uninstall the app with:

`npm unlink` or `sudo npm unlink`
  
## How to use

After install the app, you can type the name in the app to dispaly help:
```
 ✗ data-process-cli
Usage: data-process-cli [options] [command]

Order Analysis Program

Options:
  -V, --version                    output the version number
  -h, --help                       display help for command

Commands:
  revenue|r [options] [fileName]   Output the total Revenue, Cost and Profit for each Region and Item Type into file given by filename. If no source file
                                   supplied, read data from data.csv in current directory. If no output filename supplied, write into default file
                                   output-revenue.json in current directory
  priority|p [options] [fileName]  Output the number of each Priority Orders for each Month.If no source file supplied, read data from data.csv in current
                                   directory. If no output filename supplied, write into default file output-order-priority.json in current directory
  time|t [options] [fileName]      Output the average time to ship for order (in days) for each Year, Month, Region and CountryIf no source file supplied,
                                   read data from data.csv in current directory. If no output filename supplied, write into default file
                                   output-days-to-ship.json in current directory
  help [command]                   display help for command
```

Type the command in the app to dispaly help:
```
 ✗ data-process-cli r -h
Usage: data-process-cli revenue|r [options] [fileName]

Output the total Revenue, Cost and Profit for each Region and Item Type into file given by filename. If no source file supplied, read data from data.csv in current directory. If no output filename supplied, write into default file output-revenue.json in current directory

Options:
  -s, --source <sourceFile>  file name of source data
  -h, --help                 display help for command
```

### Examples

The data file used in the exmples contains about 1.5 million records.

#### Example 1: Revenue Cost and Profit
Get Total Revenue, Cost and Profit for each region and item type.

Use default input and ouput file
```
 ✗ ls
data.csv
✗ data-process-cli r
Result written to file output-revenue.json successfully!
Time Cosumed: 26 seconds : 895 milliseconds
 ✗ ls
data.csv             output-revenue.json
```
Specify output file name
```
✗ data-process-cli r my-revenue-report.json
Result written to file my-revenue-report.json successfully!
Time Cosumed: 26 seconds : 932 milliseconds
✗ ls
data.csv               my-revenue-report.json

```
Specify output file name and source data file name
```
✗ data-process-cli r my-revenue-report.json -s data.csv
Result written to file my-revenue-report.json successfully!
Time Cosumed: 27 seconds : 182 milliseconds
✗ ls
data.csv               my-revenue-report.json
```
#### Example 2:Order Priority

Get Number of each Priority Orders for each Month.

Use default input and ouput file
```
✗ data-process-cli p                                   
Result written to file output-order-priority.json successfully!
Time Cosumed: 8 seconds : 359 milliseconds
ls
data.csv                   output-order-priority.json 
```
Usage of file name specification is the same as example 1.

#### Example 3: Days to Ship

Get Average Time to ship(in days), and Number of Orders For Each Month(grouped by year), and by each Country(grouped by region),with totals for each levl.

Use default input and ouput file
```
✗ data-process-cli t
Result written to file output-days-to-ship.json successfully!
Time Cosumed: 11 seconds : 241 milliseconds
ls
data.csv                   output-days-to-ship.json  
```
Usage of file name specification is the same as example 1.

## Performance Optimization

The most significant performance optimization is using two steps to process data: map and reduce.
The map function is used when going through all the records and only do the necessary statistics and store data to result. After finish reading data, the reduce function will handle the map result and calculate the outcome of specific properties.

The alternative way is adding up all the totals when reading every record, which we don't need to reduce in the end but  is extremely time-consuming.

Take task 1 for example,here is a simple test:

Before: Adding up all the totals when reading every record
```
Data written to file ../data/revenue-cost-profit.json successfully!
node index.js  79.85s user 0.60s system 101% cpu 1:19.06 total
```
After: map + reduce
```
Data written to file ../data/revenue-cost-profit.json successfully!
node index.js  27.28s user 0.33s system 100% cpu 27.381 total
```

The "map + reduce" way runs more than 2 times faster. The reason of this improvement is that it reduces the number of calculation when processing each record, which will significantly reduce the time-cosuming when it come to large amount of recourds(millions).

A thought:
Another way of improving for processing large amount of data is to divided the data into segments , process them concurrently with multiple instances and then reduce the result. As this must be supported by framework, it's just a thought for now.

## FAQ

- Q1: How to place the source data file if I don't want to input it in CLI?

Change your data file name to "data.csv" and run the app in the same directory with data.csv.

- Q2: I get the error message "Source file: ./data.csv Not Found." when running the app. What should I do?

The app can't find the default source data file. You can specify the file name with "-s" or you can do what is told in Q1.

- Q3: Where can I find my output file?

Unless intentionally given by user, the default output file will be found in the current directory with filename begin with "output"  and end with ".json".

- Q4: Why the app take a long time to complete?

The excute time of the app depends on the size of the data file. When the data file is huge, it might take longer.
