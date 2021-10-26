class Account {
    constructor(email, youtubeID, subscriberCount) {
        this._email = email; //Corresponds to 'Account Email' entry of .csv file
        this._youtubeID = Account.uniqueId(youtubeID); //Corresponds to 'YouTube Channel' entry of .csv file
        this._subscriberCount = parseInt(subscriberCount.replace(/\D/g,'')); //Corresponds to 'Subscriber Count' entry of .csv file
    }
    get youtubeID() {
        return this._youtubeID;
    }
    get email() {
        return this._email;
    }
    get subscriberCount() {
        return this._subscriberCount;
    }

    //Function that return unique YouTube ID - strips URL and 'UC' prefix
    static uniqueId(youtubeID){
        let regex = new RegExp('([^\/]+$)');
        let final = youtubeID.match(regex)[1];
        regex = new RegExp('(UC)*(.*)');
        return final.match(regex)[2];
    }
}

module.exports = Account;