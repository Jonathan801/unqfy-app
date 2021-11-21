const errorsAPI = require("../exceptions/apiExeptions");
const LogglyService = require ("./LogglyApp");
const logglyService = new LogglyService();


function addEvent(req,res){
    if(logglyService.state) {
        const body = req.body;
        if (body.name && body.message) {
            res.status(201);
            res.json({result : "El evento fue registrado exitosamente"}); 
        }else{
            throw new errorsAPI.JSONException();
        }
    }else{
        res.status(400);
        res.json({message: "El servidor se encuentra desactivado"});
    }
}

function activateLoggy(req,res) {
    logglyService.activate();
    res.status(201);
    res.json({result: "El servidor se ha activado"});
}

function desactivateLoggy(req,res){
    logglyService.desactivate();
    res.status(201);
    res.json({result: "El servidor se ha desactivado"});

}

function stateLoggly(req,res){
    res.status(200);
    res.json({stateLoggly: logglyService.stateOfLogglyApp()});
}

module.exports = {
    addEvent,
    activateLoggy,
    desactivateLoggy,
    stateLoggly,
};