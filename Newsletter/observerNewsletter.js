const rp = require('request-promise');
const errorsApi = require("../exceptions/apiExeptions");
const endpoints = require("../endpoints.json");
const urlNewsletter = endpoints.newsletter;


class Newsletter{
    constructor(){
    }
    //update(artist,album)
    //event es la funcion que provoco un evento 
    //objectevent es la cosa en el medio
    update(event,ojectEvent){
        if (event == "addAlbum"){
            // console.log(urlNewsletter);
            // console.log(ojectEvent.artist.id);
            // console.log(ojectEvent.artist.name);
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
