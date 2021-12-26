const express = require('express');
const errorsAPI = require("../exceptions/apiExeptions");
const {AlbumIdDoesNotExist} = require("../exceptions/albumException");

const router = express.Router();

router.get("/:id/lyrics",(req,res) =>{
    const idTrack = Number(req.params.id);
    let requestUnqfy = req.requestUnqfy;
    try {
        const track = requestUnqfy.getTrackById2(idTrack);
        track.getLyrics().then(() =>{
            requestUnqfy.save('data.json');
            res.status(200);
            res.json({ name: track.name, lyrics: track.lyrics });
        });
    } catch (error) {
        throw new errorsAPI.NotFound(`The track with id ${idTrack} does not exist`);    
    }
});

router.post("/",(req,res)=>{
    const body = req.body;
    const idAlbum = Number(body.idAlbum);
    let requestUnqfy = req.requestUnqfy;
    if(body.idAlbum && body.name && body.duration && body.genres){
        try {
            const album = requestUnqfy.addTrack(idAlbum,{name:body.name,duration:body.duration,genres:body.genres});
            requestUnqfy.save('data.json');
            res.status(201);
            res.json(album.toJSON());
        } catch (error) {
            if(error instanceof AlbumIdDoesNotExist){
                throw new errorsAPI.RelatedSourceNotFound();
            }else{
                throw new errorsAPI.AlreadyExists();
            }
        }
    }else{
        throw new errorsAPI.JSONException();
    }
});

module.exports = router;