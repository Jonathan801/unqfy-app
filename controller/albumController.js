const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('../unqfy'); // importamos el modulo unqfy
const express = require('express');
const errorsAPI = require("../exceptions/apiExeptions");
const {ArtistIdDoesNotExist} = require("../exceptions/artistException");
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

router.post("/",(req,res)=>{
    const body = req.body;
    const idArtist = Number(body.artistId);
    const unqfy = getUNQfy();
    if(body.artistId && body.year && body.name){
        try {
            const album = unqfy.addAlbum(idArtist,{name:body.name,year:body.year});
            saveUNQfy(unqfy);
            res.status(201);
            res.json(album.toJSON());
        } catch (error) {
            if(error instanceof ArtistIdDoesNotExist){
                throw new errorsAPI.RelatedSourceNotFound();
            }else{
                throw new errorsAPI.AlreadyExists();
            }
        }
    }else{
        throw new errorsAPI.JSONException();
    }
});

router.get("/",(req, res) => {
    const name = req.query.name;
    const unqfy = getUNQfy();
    if(name){
        res.status(200).json(unqfy.matchingPartialByAlbum(name));    
    }else{
        res.status(200).json(unqfy.getAlbums());
    }
});

router.get("/:id",(req,res) =>{
    const idAlbum = Number(req.params.id);
    const UNQfy = getUNQfy();
    try {
        const album = UNQfy.getAlbumById(idAlbum);
        res.status(200);
        res.json(album);
    } catch (error) {
        throw new errorsAPI.NotFound();
        
    }
});

router.patch("/:id",(req, res) => {
    const idAlbum = Number(req.params.id);
    const body = req.body;
    const unqfy = getUNQfy();
    if((body.year)){
        try{
            const album =unqfy.getAlbumById(idAlbum);
            album.update(body.year);
            saveUNQfy(unqfy);
            res.status(200).json(album);    
        }catch(error){
            throw new errorsAPI.NotFound();
        }
    }else{
        throw new errorsAPI.JSONException();
    }
});

router.delete("/:id",(req,res) =>{
    const idAlbum = Number(req.params.id);
    const unqfy = getUNQfy();
    try{
        let album = unqfy.getAlbumById(idAlbum);
        unqfy.removeAlbum(album.artist,idAlbum);
        saveUNQfy(unqfy);
        res.status(204);
        res.json({message:"Album borrado correctamente"});
    }catch(error){
        throw new errorsAPI.NotFound();
    }
});

module.exports = router;