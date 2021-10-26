const InputReader = require('./InputReader');
const Comparator = require('./Comparator');

let filePaths = ['./testFiles/Input1.csv', './testFiles/Input2.csv'];
let reader = new InputReader();

if(reader.validate(filePaths)){
    const promises = [];
    for(let i = 0; i < reader.fileSet.length; i++){
        promises.push(reader.addToMatrix(reader.fileSet[i]));
    }

    Promise.all(promises).then(() => {
        let comparator = new Comparator(reader.matrix, reader.concern);
        comparator.findDifferences();
        console.log(comparator.differences);
    })
}else{
    console.log('EXITING APPLICATION - AT LEAST TWO UNIQUE VALID FILES ARE NEEDED');
}