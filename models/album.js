const Track = require("./tracks");
const TrackException = require("../exceptions/trackException");
const idGenerator = require("./idGenerator");
let idGen = new idGenerator();



class Album {
    constructor(artistId, name, year) {
        this.id = idGen.getNextId();
        this.artist = artistId;
        this.name = name;
        this.year = year;
        this.tracks = [];
    }

    addNewTrack(trackData) {
        if(this.containsTrack(trackData.name)){
          throw new TrackException("El track a agregar ya existia en el album");
        }else{
            const newTrack = new Track(trackData.name, this.id, trackData.duration,trackData.genres);
            this.tracks.push(newTrack);
            return newTrack;
        }
    }

    removeTrack(trackData) {
        this.tracks = this.tracks.filter(track => track.id !== trackData.id);
        return this.tracks;
    }

    containsTrack(track) {
        return this.tracks.some(elem => elem.name === track);
    }

    getTrackById(idTrack) {
        // should be function getTrackById (other name)
        const track = this.tracks.find(track => track.idTrack === idTrack);
        return track;
    }
}

module.exports = Album;