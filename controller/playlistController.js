const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('../unqfy'); // importamos el modulo unqfy
const express = require('express');
const errorsAPI = require("../exceptions/apiExeptions");

const router = express.Router();

router.post("/", (req, res) => {
    const body = req.body;
    let requestUnqfy = req.requestUnqfy;
    if ((body.name === undefined) || (body.genres.lenght > 0)) {
        throw new errorsAPI.JSONException()
    }
    try {
        const playlist = requestUnqfy.createPlaylist(body.name, body.genres, body.maxDuration)
        requestUnqfy.save('data.json');
        res.status(201).json(playlist.toJson())  ;  
    } catch (error) {
        console.log(error);
    }
    
});

router.post('/', (req, res) => {
    const body = req.body
    let requestUnqfy = req.requestUnqfy;
    if ((body.name === undefined) || (body.tracks.lenght > 0)) {
        throw new errorsAPI.JSONException()
    }

    try {
        const playlist = requestUnqfy.createPlaylistByIds(body.name, body.tracks)
        requestUnqfy.save('data.json');
        res.status(201).json(playlist.toJson())
    } catch (error) {
        console.log(error)
        throw new errorsAPI.RelatedSourceNotFound()
    }
});

router.get('/:id', (req, res) => {
    const playlistId = Number(req.params.id);
    let requestUnqfy = req.requestUnqfy;

    try {
        // playlistId: should be an int
        res.status(200).json(requestUnqfy.getPlaylistById(playlistId));
    } catch (error) {
        throw new errorsAPI.NotFound(`The Playlist with id ${playlistId} does not exist`);
    }
});

router.delete('/:id', (req, res) => {
    const playlistId = Number(req.params.id);
    let requestUnqfy = req.requestUnqfy;

    try {
        requestUnqfy.removePlaylistById(playlistId);
        res.status(204);
    } catch (error) {
        throw new errorsAPI.NotFound(`The Playlist with id ${playlistId} does not exist`);
    }
    
});

router.get('/', (req, res) => {
    const name = req.query.name;
    const durationLT = Number(req.query.durationLT); // menores a ...
    const durationGT = Number(req.query.durationGT); // mayores a ...
    let requestUnqfy = req.requestUnqfy;

    if ((name === undefined) && (durationLT === undefined) && (durationGT === undefined)) {
        throw new errorsAPI.JSONException()
    }

    try {
        let playlists = requestUnqfy.searchBy(name, durationLT, durationGT)
        res.status(200).json({playlists: playlists})
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;