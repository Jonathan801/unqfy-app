const rp = require('request-promise');
const GMailAPIClient = require("./GMailAPIClient");
const gmailClient = new GMailAPIClient();
const errorsApi = require("../exceptions/apiExeptions");
const artistExceptions = require("../exceptions/artistException");
const endpoints = require("../endpoints.json");
const urlUnqfy = endpoints.unqfy;

// eslint-disable-next-line no-undef
let subscriptions = new Map();

class SubscriptionsManager {
    
    suscribeToArtist(artistId, email){
        return this.checkExistingIdArtist(artistId)
        .then(() => {
            if (subscriptions.has(artistId)){
                const subscribers = subscriptions.get(artistId);
                if (!subscribers.includes(email)){
                  subscribers.push(email);
                } 
              }else{
                subscriptions.set(artistId, [email]); 
              }
        });
    }

    unsubscribeFromArtist(artistId, emailSub){
        return this.checkExistingIdArtist(artistId)
        .then(() =>{
            if (subscriptions.has(artistId)){
                const list = subscriptions.get(artistId);
                subscriptions.set(artistId, this.removeElement(emailSub, list));
              }
        });
    }

    removeElement(id,list){
        return list.filter(elem => elem != id);
    }    

    getSubscribersOfArtist(artistId){
        return this.checkExistingIdArtist(artistId)
        .then(() =>{
            return subscriptions.get(artistId);
        });
    }
    
    deleteEmails(artistId){
        return this.checkExistingIdArtist(artistId)
        .then(() =>{
            if (subscriptions.has(artistId)){
                subscriptions.delete(artistId);
            }
        });
    }

        //Body contiene artistId , "subject" , "message"
    notifyUsers(body){
            return this.checkExistingIdArtist(body.artistId).then((artista)=> {
                const artist_emails = this.getSubscribers(artista.id);
                if(artist_emails.length > 0){
                    this.sendEmails(body, artist_emails);
                }else{
                    return console.log("El artista no tenia subscriptores");
                }
            }).catch(() => {
                throw new errorsApi.InternalServerError();
            });
    }
    
    sendEmails(data,mails){
        mails.map(email => {
            gmailClient.send_mail(
                data.subject,[data.message],  
                {
                    "name": "Subscriber",
                    "email": email,
                },
                {
                    "name": "Jonathan Gutierrez",
                    "email": "jonykpo886@gmail.com",
                });
        });
    }

    getSubscribers(artistId){
        let subs = subscriptions.get(artistId);
        return subs ? subs : [];
    }
    
    checkExistingIdArtist(artistId){
        const options = {
            url: `${urlUnqfy}/artists/${artistId}`,
            json: true,
        };
        return rp.get(options)
        .then(artist => {
            return artist;
        })
        .catch(error => {
            throw new artistExceptions.ArtistIdDoesNotExist();
        });
    }    
}

module.exports = SubscriptionsManager;