const express = require('express');
const errorsAPI = require("../exceptions/apiExeptions");
const router = express.Router();

const BASE_URL = `/artists`;

//Get an artist by id
router.get(`${BASE_URL}/:id`,(req, res) => {
    const idArtist = Number(req.params.id);
    let requestUnqfy = req.requestUnqfy;
    try{
        res.status(200).json(requestUnqfy.getArtistById(idArtist));
    }catch(error){
        throw new errorsAPI.NotFound(`The artist with id ${idArtist} does not exist`);
    }
});

//Update an artist by id
router.patch(`${BASE_URL}/:id`,(req, res) => {
    const idArtist = Number(req.params.id);
    const body = req.body;
    let requestUnqfy = req.requestUnqfy;
    if((body.name && body.country)){
        try{
            const artist =requestUnqfy.getArtistById(idArtist);
            artist.update(body);
            requestUnqfy.save('data.json');
            res.status(200).json(artist);    
        }catch(error){
            throw new errorsAPI.NotFound();
        }
    }else{
        throw new errorsAPI.JSONException();
    }
});

router.put(`${BASE_URL}/:id`,(req, res) => {
    const idArtist = Number(req.params.id);
    const body = req.body;
    let requestUnqfy = req.requestUnqfy;
    if((body.name && body.country)){
        try{
            const artist =requestUnqfy.getArtistById(idArtist);
            artist.update(body);
            requestUnqfy.save('data.json');
            res.status(200).json(artist);    
        }catch(error){
            throw new errorsAPI.NotFound();
        }
    }else{
        throw new errorsAPI.JSONException();
    }
});

//Delete an artist by id
router.delete(`${BASE_URL}/:id`,(req,res) =>{
    const idArtist = Number(req.params.id);
    let requestUnqfy = req.requestUnqfy;
    try{
        requestUnqfy.removeArtist(idArtist);
        requestUnqfy.save('data.json');
        res.status(204).json({message: `The artist was removed.`});
    }catch(error){
        throw new errorsAPI.NotFound(`The artist with id ${idArtist} does not exist`);
    }
});

//Get an artist by a query o all artist
router.get(`${BASE_URL}/`,(req, res) => {
    const name = req.query.name;
    let requestUnqfy = req.requestUnqfy;
    try {
        if(name){
            res.status(200).json(requestUnqfy.matchingPartialByArtist(name));    
        }else{
            res.status(200).json(requestUnqfy.getArtists());
        }    
    } catch (error) {
        throw new errorsAPI.NotFound(`Can't find an artist with that ${name}`);
    }
});

//Create a artist
router.post(`${BASE_URL}/`,(req, res) => {
        const body = req.body;
        let requestUnqfy = req.requestUnqfy;
        if((body.name && body.country)){
            try{
                const artist = requestUnqfy.addArtist({name:body.name,country:body.country});
                requestUnqfy.save('data.json');
                res.status(201).json(artist);
            }catch(error){
                throw new errorsAPI.AlreadyExists();
            }
        }else{
            throw new errorsAPI.JSONException();
        }
});

router.get(`${BASE_URL}/:name/populate_albums`, (req, res) => {
    const name = req.params.name;
    let requestUnqfy = req.requestUnqfy;
    try {
        if(name){
            requestUnqfy.populateAlbumsForArtist(name).then(albums => {
                requestUnqfy.save('data.json');
                res.status(200).json({albums: albums});
            });
        }
    } catch (error) {
        throw new errorsAPI.NotFound(`Can't find an artist with that ${name}`);
    }
});

module.exports = router;