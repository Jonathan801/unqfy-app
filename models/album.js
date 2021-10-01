const Track = require("./tracks");
const trackExceptions = require("../exceptions/trackException");
const idGenerator = require("./idGenerator");
//let idGen = new idGenerator();



class Album {
    constructor(artistId, name, year) {
        this.id = idGenerator.getNextIdAlbum();
        this.artist = artistId;
        this.name = name;
        this.year = year;
        this.tracks = [];
    }

    toJSON(){
        return { id: this.id, name: this.name, tracks: this.tracks,year:this.year };
    }

    addNewTrack(trackData) {
        if(this.containsTrack(trackData.name)){
          throw new trackExceptions.TrackWithSameName(`The Track ${trackData.name} already existed.`);
        }else{
            const newTrack = new Track(trackData.name, this.id, trackData.duration,trackData.genres);
            this.tracks.push(newTrack);
            return newTrack;
        }
    }

    getTracks(){
        return this.tracks.forEach(track=> console.log(track));
    }

    removeTrack(trackData) {
        this.tracks = this.tracks.filter(track => track.id !== trackData.id);
        return this.tracks;
    }

    containsTrack(track) {
        return this.tracks.some(elem => elem.name === track);
    }

    getTrackById(idTrack) {
        const track = this.tracks.find(track => track.idTrack === idTrack);
        return track != undefined ? track : trackExceptions.TrackIdDoesNotExist(`The Track with id ${id} does not exist`);
    }

    matchingByName(scrappyWord) {
        const reg = new RegExp(scrappyWord, 'gi');
        
        const match =  reg.exec(this.name);
        return match !== null;
    }

    matchingTrackByName(scrappyWord) {
        const tracks = this.tracks.filter( track => track.matchingByName(scrappyWord));
        return tracks;
    }
}

module.exports = Album;