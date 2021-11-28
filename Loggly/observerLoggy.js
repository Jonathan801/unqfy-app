const rp = require('request-promise');
const errorsApi = require("../exceptions/apiExeptions");


class LogglyApp {

    update(event,artist){
        const level = "info";
        const typeMessage = this.typeOfEvent(event);
        let message = `Se a agregado el ${typeMessage} ${artist.artist.name}`;
        const options = {
            url : "http://localhost:5002/api/loggly/event",
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

