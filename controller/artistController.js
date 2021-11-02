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
  
function saveUNQfy(unqfy, filename = 'data.json') {
    unqfy.save(filename);
}

//Get an artist by id
router.get("/:id",(req, res) => {
    const idArtist = Number(req.params.id);
    const unqfy = getUNQfy();
    try{
        res.status(200).json(unqfy.getArtistById(idArtist));    
    }catch(error){
        throw new errorsAPI.NotFound();
    }
});

//Update an artist by id
router.patch("/:id",(req, res) => {
    const idArtist = Number(req.params.id);
    const body = req.body;
    const unqfy = getUNQfy();
    if((body.name && body.country)){
        try{
            const artist =unqfy.getArtistById(idArtist);
            artist.update(body);
            saveUNQfy(unqfy);
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
    const unqfy = getUNQfy();
    if((body.name && body.country)){
        try{
            const artist =unqfy.getArtistById(idArtist);
            artist.update(body);
            saveUNQfy(unqfy);
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
    const unqfy = getUNQfy();
    try{
        unqfy.removeArtist(idArtist);
        saveUNQfy(unqfy);
        res.status(204);
        res.json({message:"Artista borrado correctamente"});
    }catch(error){
        throw new errorsAPI.NotFound();
    }
});

//Get an artist by a query o all artist
router.get("/",(req, res) => {
    const name = req.query.name;
    const unqfy = getUNQfy();
    if(name){
        res.status(200).json(unqfy.matchingPartialByArtist(name));    
    }else{
        res.status(200).json(unqfy.getArtists());
    }
});

//Create a artist
router.post("/",(req, res) => {
    const unqfy = getUNQfy();
        const body = req.body;
        if((body.name && body.country)){
            try{
                const artist = unqfy.addArtist({name:body.name,country:body.country});
                saveUNQfy(unqfy);
                res.status(201).json(artist);
            }catch(error){
                throw new errorsAPI.AlreadyExists();
            }
        }else{
            throw new errorsAPI.JSONException();
        }
});

module.exports = router;