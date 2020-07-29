# data-process-cli

This is a data process cli api powered by node.js.

- [data-process-cli](#data-process-cli)
  - [How to install](#How-to-install)
  - [How to use](#How-to-use)
  - [Examples](#Examples)
    - [Revenue Cost and Profit](#Revenue-Cost-and-Profit)
    - [Order Priority](#Order-Priority)
    - [Days to Ship](#Days-to-Ship)
  - [FAQ](#FAQ)
  
  
## How to install
step 1: Clone the git repository to your local directory 

`git clone https://github.com/nkanyang/data-process-cli.git data-process-cli`

step 2: Enter the directory data-process-cli and install modules

`npm install`

steps 3: Unstall the app globaly and now you can use it everywhere

`npm link`

if this dosen't work out, try:

`sudo npm link`

steps 4: Uninstall the app with:

`npm unlink` or `sudo npm unlink`
  
## How to use

Type the name in the app to dispaly help:
```
➜  ~ data-process-cli
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
➜  ~ data-process-cli r -h
Usage: data-process-cli revenue|r [options] [fileName]

Output the total Revenue, Cost and Profit for each Region and Item Type into file given by filename. If no source file supplied, read data from data.csv in current directory. If no output filename supplied, write into default file output-revenue.json in current directory

Options:
  -s, --source <sourceFile>  file name of source data
  -h, --help                 display help for command
```

## Examples

### Revenue Cost and Profit

### Order Priority

### Days to Ship

## FAQ
