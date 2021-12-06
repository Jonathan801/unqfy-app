const errorsAPI = require("../exceptions/apiExeptions");
const Manager = require("./suscriptionsManager");
const {ArtistIdDoesNotExist} = require("../exceptions/artistException");
const manager = new Manager();

function suscribe(req, res){
    const body = req.body;
    if (!(body.artistId && body.email)) {
        throw new errorsAPI.JSONException();
    }
    manager.suscribeToArtist(body.artistId, body.email)
    .then(() => {
        res.json({message: 'suscripción éxitosa'});
    })
    .catch((error) => {
        // if (error) {
        //     res.status(error.status);
        //     res.json({status: error.status, errorCode: error.errorCode});
        if(error instanceof ArtistIdDoesNotExist){
            throw new errorsAPI.RelatedSourceNotFound();
        }
    });
}

function unsubscribe(req, res){
    const body = req.body;
    if(!(body.artistId && body.email)){
        throw new errorsAPI.JSONException();
    }
    manager.unsubscribeFromArtist(body.artistId, body.email)
    .then(()=>{
        res.json({message: 'desuscripción éxitosa'});
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
    if(!(body.artistId && body.subject && body.message && body.from)){
        throw new errorsAPI.JSONException();
    }
    manager.notifyUsers(body)
    .then(()=>{
        res.json('OK!');
    })
    .catch((error) => {
        if (error) {
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
    manager.getSubscribersOfArtist(artId)
    .then((emails)=>{
        res.json({
            artistId: artId,
            emails: emails
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
    manager.deleteEmails(body.artistId).then(()=>{
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