class SuscribersOfArtist{
    constructor(id){
        this.idArtist = id;
        this.emails = [];
    }

    addEmail(emailOfSub){
        if(!this.emails.includes(emailOfSub)){ 
            this.emails.push(emailOfSub);
        }
    }

    popEmail(emails){
        this.emails = this.emails.filter(mail => mail !== emails);
    }

    resetEmails(){
        this.emails = [];
    }
}

module.exports = {
    SuscribersOfArtist
};
