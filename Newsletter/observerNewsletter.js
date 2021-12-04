const rp = require('request-promise');
const errorsApi = require("../exceptions/apiExeptions");
const endpoints = require("../endpoints.json");
const urlNewsletter = endpoints.newsletter;
const Observer = require("../models/observer");


class Newsletter{
    
    constructor(){  
    }

    update(event,ojectEvent){
        if (event == "addAlbum"){
            const options = {
                url:  urlNewsletter + "/notify",
                body: {
                    artistId: ojectEvent.artist.id,
                    subject: 'Nuevo Album para el artista ' + ojectEvent.artist.name,
                    message: 'Se ha agregado el album ' + ojectEvent.album.name + ' al artista ' + ojectEvent.artist.name,
                    from: 'jonykpo886@gmail.com',
                },
                json: true,
            };
            rp.post(options)
            .catch(() => {
                throw new errorsApi.InternalServerError();
            }); 
        }
    }
}
module.exports = Newsletter;
