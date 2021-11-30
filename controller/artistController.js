const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('../unqfy'); // importamos el modulo unqfy
const express = require('express');
const errorsAPI = require("../exceptions/apiExeptions");
const router = express.Router();

function getUNQfy(filename = 'data.json') {
    let unqfy = new unqmod.UNQfy();
    if (fs.existsSync(filename)) {
      unqfy = unqmod.UNQfy.load(filename);
    }
    return unqfy;
}

const unqfy = getUNQfy();

//unqfy.save('data.json');

//Get an artist by id
router.get("/:id",(req, res) => {
    const idArtist = Number(req.params.id);
    let requestUnqfy = req.requestUnqfy;
    try{
        res.status(200).json(requestUnqfy.getArtistById(idArtist));    
    }catch(error){
        throw new errorsAPI.NotFound();
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
        res.json({message:"Artista borrado correctamente"});
    }catch(error){
        throw new errorsAPI.NotFound();
    }
});

//Get an artist by a query o all artist
router.get("/",(req, res) => {
    const name = req.query.name;
    // console.log('unqfy');
    // console.log(req.requestUnqfy);
    let requestUnqfy = req.requestUnqfy;
    if(name){
        res.status(200).json(requestUnqfy.matchingPartialByArtist(name));    
    }else{
        res.status(200).json(requestUnqfy.getArtists());
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