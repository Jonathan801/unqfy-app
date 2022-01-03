const errorsAPI = require("../exceptions/apiExeptions");
let rp = require('request-promise');

// const serviceUnqfy = require("../service.js");

const express = require('express');
const router = express.Router();

const PROTOCOL = `http://`;
// console.log(serviceUnqfy);
// const BASE_URL_UNQFY = `${serviceUnqfy.address().address}:${serviceUnqfy.address().port}`;
const BASE_URL_UNQFY = `localhost:5000`;
const PATH_ARTIST = `/api/artists`;

router.post(`/subscribe`, (req, res) => {
    const body = req.body;
    const newsletter = req.requestNewsletter;
    if (!(body.artistId && body.email)) {
        throw new errorsAPI.JSONException();
    }
    getArtistById(body.artistId).then(artist => {
        newsletter.suscribeEmail2Artist(artist, body.email);
        res.status(200);
    });
});

async function getArtistById(artistID) {
    const options = {
        url:  `${PROTOCOL+BASE_URL_UNQFY+PATH_ARTIST}/${artistID}`,
        json: true
    };
    try {
        const artist = await rp.get(options);
        return artist;
    } catch (error) {
        throw new errorsAPI.NotFound(`The artist with id ${idArtist} does not exist`);
    }
}

router.post(`/unsubscribe`, (req, res) => {
    const body = req.body;
    const newsletter = req.requestNewsletter;
    if (!(body.artistId && body.email)) {
        throw new errorsAPI.JSONException();
    }
    getArtistById(body.artistId).then(artist => {
        newsletter.unsuscribeEmail2Artist(artist, body.email);
        res.status(200);
    });
});

router.post(`/notify`, (req, res) => {
    const body = req.body;
    const newsletter = req.requestNewsletter;
    if(!(body.artistId && body.subject && body.message)){
        throw new errorsAPI.JSONException();
    }
    getArtistById(body.artistId).then(artist => {
        newsletter.notify(artist, body.subject, body.message);
        res.status(200);
    });
});


router.get(`/subscriptions/`, (req, res) => {
    const artistId = Number(req.query.artistId);
    const newsletter = req.requestNewsletter;

    if(artistId){
        throw new errorsAPI.JSONException();
    }
    getArtistById(artistId).then(artist => {
        const emails = newsletter.getSubscribersById(artist.id);
        res.status(200).json({
            artistId: artist.id,
            emails: emails
        });
    });
})

router.delete(`/subscriptions`, (req, res) => {
    const artistId = Number(req.query.artistId);
    const newsletter = req.requestNewsletter;

    if(artistId){
        throw new errorsAPI.JSONException();
    }
    getArtistById(artistId).then(artist => {
        // attach delete artist
        newsletter.deleteSubscribersById(artist.id);
        res.status(200).json({ message: `The subscribers of the artist ${artist.name} were deleted.` });
    });
})


module.exports = router;