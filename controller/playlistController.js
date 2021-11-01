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

router.post("/", (req, res) => {
    const body = req.body
    const unqfy = getUNQfy()

    if ((body.name === undefined) || (body.genres.lenght > 0)) {
        throw new errorsAPI.JSONException()
    }
    
    try {
        const playlist = unqfy.createPlaylist(body.name, body.genres, body.maxDuration)
        saveUNQfy(unqfy)
        res.status(201).json(playlist.toJson())    
    } catch (error) {
        console.log(error)
    }
    
});

router.post('/', (req, res) => {
    const body = req.body
    const unqfy = getUNQfy()

    if ((body.name === undefined) || (body.tracks.lenght > 0)) {
        throw new errorsAPI.JSONException()
    }

    try {
        const playlist = unqfy.createPlaylistByIds(body.name, body.tracks)
        saveUNQfy(unqfy)
        res.status(201).json(playlist.toJson())
    } catch (error) {
        console.log(error)
    }
});

router.get('/:id', (req, res) => {
    const playlistId = Number(req.params.id);
    const unqfy = getUNQfy();

    try {
        // playlistId: is a valid ID and it exists
        const playlist = unqfy.getPlaylistById(playlistId);
        res.status(200).json(playlist.toJson());
    } catch (error) {
        console.log(error);
    }
});

router.delete('/:id', (req, res) => {
    const playlistId = Number(req.params.id);
    const unqfy = getUNQfy();

    unqfy.removePlaylistById(playlistId);
    res.status(204).json({message: `Playlist with id ${playlistId} deleted successfully`});
});

router.get('/', (req, res) => {
    const name = req.query.name;
    const durationLT = Number(req.query.durationLT); // menores a ...
    const durationGT = Number(req.query.durationGT); // mayores a ...
    const unqfy = getUNQfy();

    if ((name === undefined) && (durationLT === undefined) && (durationGT === undefined)) {
        throw new errorsAPI.JSONException()
    }

    try {
        let playlists = unqfy.searchBy(name, durationLT, durationGT)
        res.status(200).json({playlists: playlists})
    } catch (error) {
        console.log(error)
    }

});

module.exports = router;