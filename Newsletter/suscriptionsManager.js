const rp = require('request-promise');
// const GMailAPIClient = require("./GMailAPIClient");
// const gmailClient = new GMailAPIClient();
const errorsApi = require("../exceptions/apiExeptions");
const artistExceptions = require("../exceptions/artistException");
const endpoints = require("../endpoints.json");
const urlUnqfy = endpoints.unqfy;
const buildGmailClient = require("./GMailAPIClient");
const gmailClient = buildGmailClient();

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
                console.log(artist_emails);
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
            this.send_mail(
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

    send_mail(subject, bodyLines, receiver, sender) {
        return gmailClient.users.messages.send(
            {
              userId: 'me',
              requestBody: {
                raw: this._createMessage(subject, bodyLines, receiver, sender),
              },
            }
          );
    }
      
    _createMessage(subject, bodyLines, receiver, sender) {
        // You can use UTF-8 encoding for the subject using the method below.
        // You can also just use a plain string if you don't need anything fancy.
        const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
        let messageParts = [
            `From: ${sender.name} <${sender.email}>`,
            `To: ${receiver.name} <${receiver.email}>`,
            'Content-Type: text/html; charset=utf-8',
            'MIME-Version: 1.0',
            `Subject: ${utf8Subject}`,
            '',
        ];
        messageParts = messageParts.concat(bodyLines);
        const message = messageParts.join('\n');
    
        // The body needs to be base64url encoded.
        const encodedMessage = Buffer.from(message)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
        //console.log("SendEmail en GmailApi");
        return encodedMessage;
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
        //console.log(options.url); //http://172.20.0.21:5000/api/artists/1
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