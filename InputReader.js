const fs = require('fs');
const csv = require('fast-csv');
const Account = require('./Account');
class InputReader {
    constructor() {
        this._fileSet = []; //unique filepaths
        this._concern = 'all'; //search specification
        this._matrix = []; //matrix containing all entries of all files - one row per file
    }

    validate(filePaths, concern = 'all'){
        for(let i = 0; i < filePaths.length; i++){
            if(!this._fileSet.includes(filePaths[i])){ //does not check for valid path - only uniqueness
                this._fileSet.push(filePaths[i]);
            }
        }

        if(this._fileSet.length < 2){
            return false;
        }

        if(concern === 'subscriber_count' || concern === 'channel_ownership'){
            this._concern = concern;
        }else{
            this._concern = concern;
        }

        return true;
    }

    //Async. function used to read the contents of a single file
    async readFile(filePath){
        let accounts = []; //array of Account object representing all entries of a single valid file

        return new Promise(((resolve) => { //return result of reading CSV file
            let readStream = fs.createReadStream(filePath)
                .on('error', err => {
                    console.log('ERROR:', err.message);
                });

            readStream
                .pipe(csv.parse({ headers: false }))
                .on('error', err => {
                    console.log(err);
                })
                .on('data', row => {
                    if(row.length === 3){ //ignore any invalid entries
                        accounts.push(new Account(row[0], row[1], row[2])); //creating Account object for each row in file
                    }
                })
                .on('end', () => {
                    resolve(accounts);
                });
        }));
    }

    //Async. function used to 'await' for accounts array to be populated
    async addToMatrix(filePath){
        const accounts = await this.readFile(filePath);
        this.matrix.push(accounts);
    }

    get matrix() {
        return this._matrix;
    }
    get concern() {
        return this._concern;
    }
    get fileSet() {
        return this._fileSet;
    }

}

module.exports = InputReader;



