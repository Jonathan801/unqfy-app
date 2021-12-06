const errorsAPI = require("../exceptions/apiExeptions");
const Log = require("./logManager");
const managerLog = new Log();


function addEvent(req,res){
    if(managerLog.getState()) {
        const body = req.body;
        if (body.name && body.message) {
            managerLog.logEvent(body.name,body.message);
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
    managerLog.activate();
    res.status(201);
    res.json({result: "El servidor se ha activado"});
}

function desactivateLoggy(req,res){
    managerLog.desactivate();
    res.status(201);
    res.json({result: "El servidor se ha desactivado"});

}

function stateLoggly(req,res){
    res.status(200);
    res.json({stateLoggly: managerLog.stateOfLogglyApp()});
}

module.exports = {
    addEvent,
    activateLoggy,
    desactivateLoggy,
    stateLoggly,
};