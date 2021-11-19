const errorsAPI = require("../exceptions/apiExeptions");
//const newsletter = require("../Newsletter/newsletter");
const Newsletter = require("../Newsletter/newsletter");
const newsletter = new Newsletter.Newsletter();

function suscribe(req, res){
    const body = req.body;
    if (!(body.artistId && body.email)) {
        throw new errorsAPI.JSONException();
    }
    newsletter.suscribeToArtist(body.artistId, body.email)
    .then(() => {
        res.json({message: 'suscripción éxitosa'});
    })
    .catch((error) => {
        if (error) {
            res.status(error.status);
            res.json({status: error.status, errorCode: error.errorCode});
        }
    });
}

function unsubscribe(req, res){
    const body = req.body;
    if(!(body.artistId && body.email)){
        throw new errorsAPI.JSONException();
    }
    newsletter.unsubscribeFromArtist(body.artistId, body.email)
    .then(()=>{
        res.json();
    })
    .catch((error) => {
        if (error) {
            res.status(error.status);
            res.json({status: error.status, errorCode: error.errorCode});
        }
    });
}

function notify(req, res){
    const body = req.body;
    //console.log(`LLego un notify respecto al artista ${body.artistId}`);
    if(!(body.artistId && body.subject && body.message && body.from)){
        throw new errorsAPI.JSONException();
    }
    newsletter.notifyUsers(body)
    .then(()=>{
        res.json('OK!');
    })
    .catch((error) => {
        if (error) {
            //console.log("Error del notify");
            res.status(error.status);
            res.json({status: error.status, errorCode: error.errorCode});
        }
    });
}

function getSubscribersOfArtist(req, res){
    if(!(req.query.artistId)){
        throw new errorsAPI.JSONException();
    }
    const artId = parseInt(req.query.artistId);
    newsletter.getsEmails(artId).then((parIdEm)=>{
        res.json({
            artistId: parIdEm.idArtist,
            emails: parIdEm.emails
        });
    })
    .catch((error) => {
        if (error) {
            res.status(error.status);
            res.json({status: error.status, errorCode: error.errorCode});
        }
    });
}

function deleteSubscriptions(req, res){
    const body = req.body;
    if(!body.artistId){
        throw new errorsAPI.JSONException();
    }
    newsletter.deleteEmails(body.artistId).then(()=>{
        res.json({message: 'OK!'});
    }).catch((error) => {
        res.status(error.status);
        res.json({status: error.status, errorCode: error.errorCode});
    });
}


module.exports={
    suscribe,
    notify,
    unsubscribe,
    getSubscribersOfArtist,
    deleteSubscriptions
};