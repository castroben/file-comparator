const InputReader = require('./InputReader');
const Comparator = require('./Comparator');

function main(filePaths, concern){
    let reader = new InputReader();
    if(reader.validate(filePaths, concern)){
        const promises = [];
        for(let i = 0; i < reader.fileSet.length; i++){
            promises.push(reader.addToMatrix(reader.fileSet[i]));
        }

        Promise.all(promises).then(() => { //if any file path is invalid, there will be no response from the program.
            let comparator = new Comparator(reader.matrix, reader.concern);
            comparator.findDifferences();
            console.log(comparator.differences);
        })
    }else{
        console.log('EXITING APPLICATION - AT LEAST TWO UNIQUE VALID FILES ARE NEEDED');
    }
}

let filePaths = ['./testFiles/Input1.csv', './testFiles/Input2.csv'];
let concern = 'channel_ownership';
main(filePaths);
