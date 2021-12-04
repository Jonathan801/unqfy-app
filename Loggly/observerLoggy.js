const rp = require('request-promise');
const errorsApi = require("../exceptions/apiExeptions");
const endpoints = require("../endpoints.json");
const urlLoggy = endpoints.loggy;
const Observer = require("../models/observer");


class LogglyApp{

    constructor(){
    }

    typeOfEvent(event){
        if (event == "addArtist" || event == "removeArtist"){
            return "artista";
        }else if (event == "addAlbum" || event == "removeAlbum"){
            return "album";
        }else { // las otras opciones son addTrack or removeTrack
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

    typeOfMessageDelete(typeMessage,ojectEvent){
        let baseMessage = `Se a eliminado el ${typeMessage} `;
        if (typeMessage == "artista"){
            baseMessage += `${ojectEvent.artist.name}`;
        }else if (typeMessage == "album"){
            baseMessage += `${ojectEvent.album.name} del artista ${ojectEvent.artist.name}`;
        }else {
            baseMessage += `${ojectEvent.track.name} del artista ${ojectEvent.artist.name}`;
        } 
        return baseMessage;
    }

    altaOBaja(event,typeMessage,ojectEvent){ //el if esta asi porque no funcaba el event.includes()
        if(event == "removeArtist" || event == "removeAlbum" || event == "removeTrack"){
            return this.typeOfMessageDelete(typeMessage,ojectEvent);
        }else{
            return this.typeOfMessage(typeMessage,ojectEvent);
        }
    }

    update(event,ojectEvent){
        const level = "info";
        const typeMessage = this.typeOfEvent(event);
        const message = this.altaOBaja(event,typeMessage,ojectEvent);
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

