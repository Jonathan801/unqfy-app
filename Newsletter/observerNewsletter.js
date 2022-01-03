const rp = require('request-promise');
const errorsApi = require("../exceptions/apiExeptions");
const endpoints = require("../endpoints.json");
const urlNewsletter = endpoints.newsletter;
const newsletterController = require('./newsletterController.js')
const GMailAPIClient = require('./GMailAPIClient');
const gmailClient = new GMailAPIClient();

const PROTOCOL = `http://`;
const BASE_URL_UNQFY = `localhost:5001`;
const PATH_NEWSLETTER = `/api`;

class Newsletter {
    
    constructor() {
        this.subscribers = [];
    }

    update(event, data){
        if (event == "addAlbum"){
            const options = {
                url:  `${PROTOCOL+BASE_URL_UNQFY+PATH_NEWSLETTER}/notify`,
                body: {
                    artistId: data.artist.id,
                    subject: `Nuevo Album para artsta ${data.artist.name}`,
                    message: `Added ${data.album.name} album to artist ${data.artist.name}`,
                    from: 'ggtpi0gabriel@gmail.com'
                },
                json: true,
            };
            rp.post(options).then(() => {
                console.log('send to artist!')
                console.log(data.artist)
            })
            .catch(() => {
                throw new errorsApi.InternalServerError();
            }); 
        }
    }

    suscribeEmail2Artist(artist, email) {
        let artistDict = this.subscribers.find(suscriber => suscriber.artistId === artist.id);

        if (artistDict !== undefined) {
            if(!artistDict.emails.includes(email)) {
                artistDict.emails.push(email)
            }
        } else {
            this.subscribers.push({
                artistId: artist.id,
                emails: [email]
            })
        }
        console.log(this.subscribers)
    }

    unsuscribeEmail2Artist(artist, email) {
        let artistDict = this.subscribers.find(suscriber => suscriber.artistId === artist.id);

        if(artistDict !== undefined) {
            artistDict.emails = artistDict.emails.filter(emailDict => emailDict !== email)
        }

        console.log(this.subscribers)
    }

    notify(artist, subject, message) {
        let artistDict = this.subscribers.find(suscriber => suscriber.artistId === artist.id);

        if(artistDict !== undefined) {
            artistDict.emails.forEach(email => {
                this.send_mail(email, subject, message)
            });
        }
    }

    send_mail(email, subject, message) {
        // split email @ receiver
        // regex /[A-Za-z]+@
        gmailClient.send_mail(
            subject,
            [
                message,
                'So... <b>Bye!</b> ❤️😎'
            ],
            { "name": email, "email": email },
            { "name": "UNQfy newsletter", "email": "ggtpi0gabriel@gmail.com" }
        ).then( (gmailResponse) => {
            console.log("Mail enviado!");
            console.log(gmailResponse);
        }).catch( (error) => {
            console.error("Algo salió mal");
            console.error(error);
        })
    }

    getSubscribersById(artistId) {
        let artistDict = this.subscribers.find(suscriber => suscriber.artistId === artistId);

        if(artistDict !== undefined) {
            return artistDict.emails
        }
    }

    deleteSubscribersById(artistId) {
        let artistDict = this.subscribers.find(suscriber => suscriber.artistId === artistId);

        if(artistDict !== undefined) {
            // or delete artistDict
            artistDict.emails = []
        }
    }
}

module.exports = {
    Newsletter: Newsletter
  };
