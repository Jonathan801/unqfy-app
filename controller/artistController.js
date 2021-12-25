const express = require('express');
const errorsAPI = require("../exceptions/apiExeptions");
const router = express.Router();

//Get an artist by id
router.get("/:id",(req, res) => {
    const idArtist = Number(req.params.id);
    let requestUnqfy = req.requestUnqfy;
    try{
        res.status(200).json(requestUnqfy.getArtistById(idArtist));
    }catch(error){
        throw new errorsAPI.NotFound(`The artist with id ${idArtist} does not exist`);
    }
});

//Update an artist by id
router.patch("/:id",(req, res) => {
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

router.put("/:id",(req, res) => {
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
router.delete("/:id",(req,res) =>{
    const idArtist = Number(req.params.id);
    let requestUnqfy = req.requestUnqfy;
    try{
        requestUnqfy.removeArtist(idArtist);
        requestUnqfy.save('data.json');
        res.status(204);
    }catch(error){
        throw new errorsAPI.NotFound(`The artist with id ${idArtist} does not exist`);
    }
});

//Get an artist by a query o all artist
router.get("/",(req, res) => {
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
router.post("/",(req, res) => {
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

module.exports = router;