const InputReader = require('./InputReader');
const Comparator = require('./Comparator');
const assert = require('assert');

function testInvalidInput(){
    let invalidPaths1 = ['./testFiles/Book1a.csv', './testFiles/Book1a.csv', './testFiles/Book1a.csv'];
    let invalidPaths2 = ['./testFiles/Book1a.csv'];
    let invalidPaths3 = [];

    let reader = new InputReader();
    assert(!reader.validate(invalidPaths1, "subscriber_count"));
    assert(!reader.validate(invalidPaths2, "channel_ownership"));
    assert(!reader.validate(invalidPaths3, "subscriber_count"));
}

function testValidInput(){
    let validPaths1 = ['./testFiles/Book1a.csv', './testFiles/Book2a.csv', './testFiles/Book2a.csv'];
    let validPaths2 = ['./testFiles/Book1a.csv', './testFiles/Book2a.csv', './testFiles/Book2b.csv']
    let validPaths3 = ['./testFiles/Book1a.csv','./testFiles/Book1a.csv','./testFiles/Book1a.csv', './testFiles/Book2a.csv', './testFiles/Book2b.csv']

    let reader = new InputReader();
    assert(reader.validate(validPaths1, "channel_ownership"));
    assert(reader.concern === 'channel_ownership');

    assert(reader.validate(validPaths2, "subscriber_count"));
    assert(reader.concern === 'subscriber_count');

    assert(reader.validate(validPaths3));
    assert(reader.concern === 'all');
}

function testInputReading1() {
    let valid = ['./testFiles/Book1a.csv', './testFiles/Book1b.csv'];
    let reader = new InputReader();

    if(reader.validate(valid, 'subscriber_count')){
        const promises = [];
        for(let i = 0; i < reader.fileSet.length; i++){
            promises.push(reader.addToMatrix(reader.fileSet[i]));
        }

        Promise.all(promises).then(() => {
            assert(reader.matrix.length === 2);
            assert(reader.concern === 'subscriber_count');
        });
    }else{
        assert(reader.matrix.length === 0);
    }
}

function testInputReading2() {
    let valid = [ 'invalidPath', './testFiles/Book1a.csv', './testFiles/Book1b.csv'];
    let reader = new InputReader();

    if(reader.validate(valid, 'channel_ownership')){

        const promises = [];
        for(let i = 0; i < reader.fileSet.length; i++){
            promises.push(reader.addToMatrix(reader.fileSet[i]));
        }

        Promise.all(promises).then(() => {
            console.log(reader.matrix);
            assert(reader.matrix.length === 2);
            assert(reader.concern === 'channel_ownership');
        });
    }else{
        assert(reader.matrix.length === 0);
    }
}

function testInputReading3(){
    let valid = ['./testFiles/Book1a.csv', './testFiles/Book1b.csv', './testFiles/Book1b.csv', './testFiles/Book2b.csv'];
    let reader = new InputReader();

    if(reader.validate(valid)){
        const promises = [];
        for(let i = 0; i < reader.fileSet.length; i++){
            promises.push(reader.addToMatrix(reader.fileSet[i]));
        }

        Promise.all(promises).then(() => {
            assert(reader.matrix.length === 3);
            assert(reader.concern === 'all');
        });
    }else{
        assert(reader.matrix.length === 0);
    }
}

function testSimpleChannelOwnership(){
    let valid = ['./testFiles/Book1a.csv', './testFiles/Book1b.csv'];
    let reader = new InputReader();

    if(reader.validate(valid, 'channel_ownership')){
        const promises = [];
        for(let i = 0; i < reader.fileSet.length; i++){
            promises.push(reader.addToMatrix(reader.fileSet[i]));
        }

        Promise.all(promises).then(() => {
            let comparator = new Comparator(reader.matrix, reader.concern);
            comparator.findDifferences();
            assert(comparator.differences.length === 6);
        });
    }else{
        assert(reader.matrix.length === 0);
    }
}

function testSimpleSubscriberCount(){
    let valid = ['./testFiles/Book1a.csv', './testFiles/Book1b.csv'];
    let reader = new InputReader();

    if(reader.validate(valid, 'subscriber_count')){
        const promises = [];
        for(let i = 0; i < reader.fileSet.length; i++){
            promises.push(reader.addToMatrix(reader.fileSet[i]));
        }

        Promise.all(promises).then(() => {
            let comparator = new Comparator(reader.matrix, reader.concern);
            comparator.findDifferences();
            assert(comparator.differences.length === 8);
        });
    }else{
        assert(reader.matrix.length === 0);
    }
}

function testSimpleAll(){
    let valid = ['./testFiles/Book1a.csv', './testFiles/Book1b.csv'];
    let reader = new InputReader();

    if(reader.validate(valid)){
        const promises = [];
        for(let i = 0; i < reader.fileSet.length; i++){
            promises.push(reader.addToMatrix(reader.fileSet[i]));
        }

        Promise.all(promises).then(() => {
            let comparator = new Comparator(reader.matrix, reader.concern);
            comparator.findDifferences();
            assert(comparator.differences.length === 13);
        });
    }else{
        assert(reader.matrix.length === 0);
    }
}

function testSimpleEmpty(){
    let valid = ['./testFiles/Book1b(2).csv', './testFiles/Book1b.csv'];
    let reader = new InputReader();

    if(reader.validate(valid)){
        const promises = [];
        for(let i = 0; i < reader.fileSet.length; i++){
            promises.push(reader.addToMatrix(reader.fileSet[i]));
        }

        Promise.all(promises).then(() => {
            let comparator = new Comparator(reader.matrix, reader.concern);
            comparator.findDifferences();
            assert(comparator.differences.length === 0);
        });
    }else{
        assert(reader.matrix.length === 0);
    }
}

function testMultipleSubscriberCount(){
    let valid = ['./testFiles/Book1a.csv', './testFiles/Book1b.csv', './testFiles/Book1c.csv'];
    let reader = new InputReader();

    if(reader.validate(valid, 'subscriber_count')){
        const promises = [];
        for(let i = 0; i < reader.fileSet.length; i++){
            promises.push(reader.addToMatrix(reader.fileSet[i]));
        }

        Promise.all(promises).then(() => {
            let comparator = new Comparator(reader.matrix, reader.concern);
            comparator.findDifferences();
            assert(comparator.differences.length === 13);
        });
    }else{
        assert(reader.matrix.length === 0);
    }
}

function testMultipleChannelOwnership(){
    let valid = ['./testFiles/Book1a.csv', './testFiles/Book1b.csv', './testFiles/Book1c.csv'];
    let reader = new InputReader();

    if(reader.validate(valid, 'channel_ownership')){
        const promises = [];
        for(let i = 0; i < reader.fileSet.length; i++){
            promises.push(reader.addToMatrix(reader.fileSet[i]));
        }

        Promise.all(promises).then(() => {
            let comparator = new Comparator(reader.matrix, reader.concern);
            comparator.findDifferences();
            assert(comparator.differences.length === 10);
        });
    }else{
        assert(reader.matrix.length === 0);
    }
}

function testInvalid1(){
    let valid = [];
    let reader = new InputReader();

    if(reader.validate(valid, 'channel_ownership')){
        const promises = [];
        for(let i = 0; i < reader.fileSet.length; i++){
            promises.push(reader.addToMatrix(reader.fileSet[i]));
        }

        Promise.all(promises).then(() => {
            let comparator = new Comparator(reader.matrix, reader.concern);
            comparator.findDifferences();
            assert(comparator.differences.length === 10);
        });
    }else{
        assert(reader.matrix.length === 0);
    }
}

function testInvalid2(){
    let valid = ['invalid', 'invalid', './testFiles/Book1a', './testFiles/Book1a'];
    let reader = new InputReader();

    if(reader.validate(valid, 'channel_ownership')){
        const promises = [];
        for(let i = 0; i < reader.fileSet.length; i++){
            promises.push(reader.addToMatrix(reader.fileSet[i]));
        }

        Promise.all(promises).then(() => {
            let comparator = new Comparator(reader.matrix, reader.concern);
            comparator.findDifferences();
            assert(comparator.differences.length === 10);
        });
    }else{
        assert(reader.matrix.length === 0);
    }
}

testInvalidInput();
testValidInput();
testInputReading1();
testInputReading2();
testInputReading3();
testSimpleSubscriberCount();
testSimpleChannelOwnership();
testSimpleAll();
testSimpleEmpty();
testMultipleSubscriberCount();
testMultipleChannelOwnership();
testInvalid2();