const rp = require('request-promise');
const errorsApi = require("../exceptions/apiExeptions");
// const GMailAPIClient = require("./GMailAPIClient");
// const gmailClient = new GMailAPIClient();
// const artistExceptions = require("../exceptions/artistException");
// const suscribersOfArtist = require("./suscribersOfArtist");

class Newsletter{
    constructor(){
    }
    //update(artist,album)
    //event es la funcion que provoco un evento 
    //objectevent es la cosa en el medio
    update(event,ojectEvent){
        if (event == "addAlbum"){
            const options = {
                url:  'http://localhost:5001/api/notify',
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
        console.log(event);
        console.log(ojectEvent);
    }
}
module.exports = Newsletter;
