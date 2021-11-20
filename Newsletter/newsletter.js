const rp = require('request-promise');
const endpoints = require("../endpoints");
const artistExceptions = require("../exceptions/artistException");
const suscribersOfArtist = require("./suscribersOfArtist");
const errorsApi = require("../exceptions/apiExeptions");
const GMailAPIClient = require("./GMailAPIClient");
const gmailClient = new GMailAPIClient();
//const urlUnqfy = endpoints.unqfy;

class Newsletter{

    constructor(){
        this.suscribers = []; 
    }

    update(artist,album){
        //console.log("Llegue al update de Newsletter");
        const options = {
            url:  'http://localhost:5001/api/notify',
            body: {
                artistId: artist.id,
                subject: 'Nuevo Album para el artista ' + artist.name,
                message: 'Se ha agregado el album ' + album.name + ' al artista ' + artist.name,
                from: 'jonykpo886@gmail.com',
            },
            json: true,
        };
        rp.post(options)
        .catch(() => {
            throw new errorsApi.InternalServerError();
        }); 
    }

    suscribeToArtist(artistId,email){
        return this.checkExistingIdArtist(artistId)
        .then(() => {
            this.getSubscribedEmailsToArtist(artistId).addEmail(email);
        });
    }

    unsubscribeFromArtist(artistId,email){
        return  this.checkExistingIdArtist(artistId)
        .then(()=> {
            const map = this.getSubscribedEmailsToArtist(artistId);
            map.popEmail(email);
        });
    }

    getSubscribedEmailsToArtist(artistId){
        let artist = this.suscribers.find(elem => elem.idArtist === artistId);
        if (!artist){
            artist = new suscribersOfArtist.SuscribersOfArtist(artistId);
            this.suscribers.push(artist);
        }
        //console.log(artist);
        return artist;
    }

    //Body contiene artistId , "subject" , "message"
    notifyUsers(body){
        //console.log("Llegue a la function notifyUsers");
        return this.checkExistingIdArtist(body.artistId).then((artista)=> {
            const artist_emails = this.getSubscribedEmailsToArtist(artista.id);
            this.sendEmails(body, artist_emails.emails);
        }).catch(() => {
            //console.log("Error de NotifyUsers");
            throw new errorsApi.InternalServerError();
        });
    }

    deleteEmails(artistID){
        return  this.checkExistingIdArtist(artistID).then(()=> {
            this.getSubscribedEmailsToArtist(artistID).resetEmails();
        });
    }

    sendEmails(data,mails){
        //console.log(data);
        const request = mails.map(email => {
            //console.log("Estoy en sendEmails");
            //console.log(mails);
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
        // eslint-disable-next-line no-undef
        // return new Promise.all(request)
        // .then((data) =>{
        //     console.log("Promise.all");
        // })
        // .catch((error)=>{
        //     console.log("Error de sendEmails");
        //     throw new errorsApi.InternalServerError();
        // });
    }

    getsEmails(artistID){
        return  this.checkExistingIdArtist(artistID)
        .then(()=> {
            return this.getSubscribedEmailsToArtist(artistID);
        });
    }

    checkExistingIdArtist(artistId){
        const options = {
            url: `http://localhost:5000/api/artists/${artistId}`,
            json: true,
        };
        return rp.get(options)
        .then(artist => {
            return artist;
        })
        .catch(error => {
            //console.log("Error de checkExistingIdArtist");
            throw new artistExceptions.ArtistIdDoesNotExist();
        });
    }
}

module.exports = {
    Newsletter: Newsletter
};
