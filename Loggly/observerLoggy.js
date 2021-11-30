const rp = require('request-promise');
const errorsApi = require("../exceptions/apiExeptions");
const endpoints = require("../endpoints.json");
const urlLoggy = endpoints.loggy;


class LogglyApp {

    typeOfEvent(event){
        if (event == "addNewArtist"){
            return "artista";
        }else if (event == "addAlbum"){
            return "album";
        }else {
            return "track";
        } 
    }

    typeOfMessage(typeMessage,ojectEvent){
        let baseMessage = `Se a agregado el ${typeMessage} `;
        if (typeMessage == "artista"){
            baseMessage += `${ojectEvent.artist.name}`;
        }else if (typeMessage == "album"){
            baseMessage += `${ojectEvent.album.name} al artista ${ojectEvent.artist.name}`;
        }else {
            baseMessage += `${ojectEvent.track.name} al album ${ojectEvent.album.name}`;
        } 
        return baseMessage;
    }
    

    update(event,ojectEvent){
        const level = "info";
        const typeMessage = this.typeOfEvent(event);
        const message = this.typeOfMessage(typeMessage,ojectEvent);
        console.log(urlLoggy);
        const options = {
            url : urlLoggy + "/event",
            body : {
                name : level,
                message : message
            },
            json : true,
        };
        rp.post(options)
        .then(() =>{
            console.log("Evento registrado correctamente");
        })
        .catch(() => {
            throw new errorsApi.InternalServerError();
        }); 
    }
}

module.exports = LogglyApp;

