const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('../unqfy'); // importamos el modulo unqfy
const express = require('express');

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

router.get("/:id/lyrics",(req,res) =>{
    const idTrack = Number(req.params.id);
    const unqfy = getUNQfy();
    try {
        const track = unqfy.getTrackById2(idTrack);
        track.getLyrics().then(lyrics =>{
            saveUNQfy(unqfy);
            res.status(200);
            res.json({name:track.name,lyrics:lyrics});
        });
    } catch (error) {
        throw new errorsAPI.NotFound();    
    }
});

module.exports = router;