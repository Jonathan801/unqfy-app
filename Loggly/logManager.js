const winston  = require('winston');
const {Loggly} = require('winston-loggly-bulk');
const Logger = require("./Logger");
const tokenJson = require("./token.json");
const token = tokenJson.token;

class LogManager{

    constructor(){
        this.state = true;
        this.configureWingston();
    }

    getState(){
        return this.state;
    }

    activate(){
        this.state = true;
    }

    desactivate(){
        this.state = false;
    }

    logEvent(level,message){
        winston.log(level,message);//Hace el log a Loggy
        Logger.log(level,message); //Hace el log al archivo local
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

    configureWingston(){
        winston.add(new Loggly({
            token: token,
            subdomain: "SUBDOMAIN",
            tags: ["Winston-NodeJS"],
            json: true
        }));
    }


}

module.exports = LogManager;