const rp = require('request-promise');
const winston  = require('winston');
const {Loggly} = require('winston-loggly-bulk');
const Logger = require("./Logger");
const tokenJson = require("./token.json");
const token = tokenJson.token;


class LogglyApp {

    constructor() {
        this.state = true;
        this.configureWingston();
    }

    activate(){
        this.state = true;
    }

    desactivate(){
        this.state = false;
    }

    stateOfLogglyApp(){
        if(this.state){
            return "Working";
        }else{
            return "Not Working";
        }
    }

    typeOfEvent(event){
        if (event == "addNewArtist"){
            return "artista";
        }else if (event == "addAlbum"){
            return "album";
        }else {
            return "track";
        } 
    }

    update(event,artist){
        const level = "info";
        const typeMessage = this.typeOfEvent(event);
        let message = `Se a agregado el ${typeMessage} ${artist.artist.name}`;
        // const options = {
        //     url : "http://localhost:5002/api/loggly/event",
        //     body : {
        //         name : level,
        //         message : message
        //     },
        //     json : true,
        // };
        // rp.post(options)
        // .then(() =>{
        //     winston.log(level,message);//Hace el log a Loggy
        //     Logger.log(level,message); //Hace el log al archivo local
        // });
        console.log("Loggy");
        console.log(message);
    }

    configureWingston(){
        winston.add(new Loggly({
            token: token,
            subdomain: "SUBDOMAIN",
            tags: ["Winston-NodeJS"],
            json: true
        }));
    }
}

module.exports = LogglyApp;

