# FILE COMPARATOR
The objective of this program is to identify and prints differences between two or more .csv files containing the email, YouTube channel and subscriber count of several subjects.

## Project Structure
This project is composed of 3 functional classes plus on main class to run the entire code base. The three classes that do all the 'heavy-lifting' are Account.js, Comparator.js and InputReader.js. The code in each of these files is documented, however, here is a brief description of each class:
### Account.js - abstracts information from a .csv file into object for easy access.
### InputReader.js - reads and stores the information from .csv files, performs error handling and input validation.
### Comparator.js - reads information stored in InputReader and performs necessary comparisons.

## Runtime Environment
This program was developed using NodeJS as a runtime environment. Therefore, NodeJS must be installed on the locdal machine for the program to run successfully. Download link for NodeJS can be found [here](https://nodejs.org/en/download/). Additionally, 'fast-csv' must be installed on the runtime environment in order for the program to run successfully. 'fast-cv' was selected because it claims to be a scalable solution for reading .csv files using TypeScript. Documentation for 'fast-csv' can be found [here](https://c2fo.github.io/fast-csv/).

Install dependencies and run the program as follows:

$ npm install fast-csv'
$ node Main.js

## Example Input-Output
Inside the 'testFiles' directory, you will find 'Input1.csv' and 'Input2.csv'. These files were given as an input example, and they differ in the following ways:

test1@gmail.com differs in subscriber count
test4@gmail.com differs in channel_onwership
test14@gmail.com differs in subscriber count
test15@gmail.com differs in subscriber count
test17@gmai.com differs in channel_ownership
test26@gmail.com differs in subscriber count and channel ownnership
test30@gmail.com differs in channel_ownership
test31@gmail.com differs in channel_ownership
test34@gmail.com differs in subscriber count
test35@gmail.com differs in subscriber count
test45@gmail.com differs in subscriber count
test46@gmail.com differs in subscriber count
test59@gmai.com differs in channel_ownership

Based on these discrepancies, running the program with the concern 'subscriber_count' should output:
[
  'test_1@gmail.com',
  'test_14@gmail.com',
  'test_15@gmail.com',
  'test_26@gmail.com',
  'test_34@gmail.com',
  'test_35@gmail.com',
  'test_45@gmail.com',
  'test_46@gmail.com'
]

running the program with the concern 'channel_ownership' should output:
[
  'test_4@gmail.com',
  'test_17@gmail.com',
  'test_26@gmail.com',
  'test_30@gmail.com',
  'test_31@gmail.com',
  'test_59@gmail.com'
]

running the program with no concern should output the union of the two sets above, namely:
[
  'test_1@gmail.com',
  'test_14@gmail.com',
  'test_15@gmail.com',
  'test_26@gmail.com',
  'test_34@gmail.com',
  'test_35@gmail.com',
  'test_45@gmail.com',
  'test_46@gmail.com',
  'test_4@gmail.com',
  'test_17@gmail.com',
  'test_30@gmail.com',
  'test_31@gmail.com',
  'test_59@gmail.com'
]


