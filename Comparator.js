class Comparator{
    constructor(matrix, concern) {
        this._matrix = matrix; //matrix populated by InputReader
        this._concern = concern; //concern populated by InputReader
        this._differences = []; //array of 'emails' corresponding to discrepancies
    }

    //Function to iterate through entire file set and compare every file with each other
    findDifferences(){

        for(let i = 0; i < this._matrix.length; i++){
            for(let j = i+1; j < this._matrix.length; j++){
                let shorter = (this._matrix[i].length > this._matrix[j]) ? this._matrix[j].length : this._matrix[i].length;
                if(this._concern === 'all'){
                    this.differences_subs(this._matrix[i], this._matrix[j], shorter);
                    this.differences_ownership(this._matrix[i], this._matrix[j], shorter);
                }else if(this._concern === 'subscriber_count'){
                    this.differences_subs(this._matrix[i], this._matrix[j], shorter);
                }else if(this._concern === 'channel_ownership'){
                    this.differences_ownership(this._matrix[i], this._matrix[j], shorter);
                }
            }
        }

    }

    //Function to compare 'Subscriber Count' entries between two files
    differences_subs(entries1, entries2, shorter){
        let i = 1;
        for(i; i < shorter; i++){
            if(entries1[i].subscriberCount !== entries2[i].subscriberCount){
                if(!this._differences.includes(entries1[i].email)){
                    this._differences.push(entries1[i].email);
                }
            }
        }

        //push elements of non-exhausted array
        if(i < entries1.length){
            this._differences.push(entries1.slice(i));
        }else if(i < entries2.length){
            this._differences.push(entries2.slice(i));
        }
    }

    //Function to compare 'YouTube Channel' entries between two files
    differences_ownership(entries1, entries2, shorter){
        let i = 1;
        for(i; i < shorter; i++){
            if(entries1[i].youtubeID !== entries2[i].youtubeID){
                if(!this._differences.includes(entries1[i].email)){
                    this._differences.push(entries1[i].email);
                }
            }
        }

        //push elements of non-exhausted array
        if(i < entries1.length){
            this._differences.push(entries1.slice(i));
        }else if(i < entries2.length){
            this._differences.push(entries2.slice(i));
        }
    }

    get differences(){
        return this._differences;
    }

}

module.exports = Comparator;