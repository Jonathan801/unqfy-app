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

router.get("/:id/lyrics",(req,res) =>{
    const idTrack = Number(req.params.id);
    try {
        const track = unqfy.getTrackById2(idTrack);
        track.getLyrics().then(lyrics =>{
            unqfy.save('data.json');
            res.status(200);
            res.json({name:track.name,lyrics:lyrics});
        });
    } catch (error) {
        throw new errorsAPI.NotFound();    
    }
});

module.exports = router;