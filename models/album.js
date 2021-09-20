const Track = require("./tracks");
const TrackException = require("../exceptions/trackException");


class Album {
    constructor(id, artistId, name, year) {
        this.id = id;
        this.artist = artistId;
        this.name = name;
        this.year = year;
        this.tracks = [];
        this.id2Tracks = 0;
    }

    addNewTrack(trackData) {
        if(this.containsTrack(trackData.name)){
          throw new TrackException("El track a agregar ya existia en el album");
        }else{
            const newTrack = new Track(trackData.name, this.id, trackData.duration, this.id2Tracks, trackData.genres);
            this.id2Tracks++;
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