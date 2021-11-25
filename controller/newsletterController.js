const errorsAPI = require("../exceptions/apiExeptions");
//const newsletter = require("../Newsletter/newsletter");
const Newsletter = require("../Newsletter/observerNewsletter");
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

/////////////////////////////////////////////////////////////////////////////////////////

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

function suscribeToArtist(artistId,email){
    return this.checkExistingIdArtist(artistId)
    .then(() => {
        this.getSubscribedEmailsToArtist(artistId).addEmail(email);
    });
}

function unsubscribeFromArtist(artistId,email){
    return  this.checkExistingIdArtist(artistId)
    .then(()=> {
        const map = this.getSubscribedEmailsToArtist(artistId);
        map.popEmail(email);
    });
}

function getSubscribedEmailsToArtist(artistId){
    let artist = this.suscribers.find(elem => elem.idArtist === artistId);
    if (!artist){
        artist = new suscribersOfArtist.SuscribersOfArtist(artistId);
        this.suscribers.push(artist);
    }
    //console.log(artist);
    return artist;
}

//Body contiene artistId , "subject" , "message"
function notifyUsers(body){
    //console.log("Llegue a la function notifyUsers");
    return this.checkExistingIdArtist(body.artistId).then((artista)=> {
        const artist_emails = this.getSubscribedEmailsToArtist(artista.id);
        this.sendEmails(body, artist_emails.emails);
    }).catch(() => {
        //console.log("Error de NotifyUsers");
        throw new errorsApi.InternalServerError();
    });
}

function deleteEmails(artistID){
    return  this.checkExistingIdArtist(artistID).then(()=> {
        this.getSubscribedEmailsToArtist(artistID).resetEmails();
    });
}

function sendEmails(data,mails){
    //console.log(data);
    const request = mails.map(email => {
        //console.log("Estoy en sendEmails");
        //console.log(mails);
        gmailClient.send_mail(
            data.subject,[data.message],  
            {
                "name": "Subscriber",
                "email": email,
            },
            {
                "name": "Jonathan Gutierrez",
                "email": "jonykpo886@gmail.com",
            });
    });
}

function getsEmails(artistID){
    return  this.checkExistingIdArtist(artistID)
    .then(()=> {
        return this.getSubscribedEmailsToArtist(artistID);
    });
}

function checkExistingIdArtist(artistId){
    const options = {
        url: `http://localhost:5000/api/artists/${artistId}`,
        json: true,
    };
    return rp.get(options)
    .then(artist => {
        return artist;
    })
    .catch(error => {
        //console.log("Error de checkExistingIdArtist");
        throw new artistExceptions.ArtistIdDoesNotExist();
    });
}


module.exports={
    suscribe,
    notify,
    unsubscribe,
    getSubscribersOfArtist,
    deleteSubscriptions
};