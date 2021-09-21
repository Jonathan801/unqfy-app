const idGenerator = require("./idGenerator");
let idGen = new idGenerator();


class Track{
    constructor(name, albumId, duration,genres = []){
        this.name = name;
        this.albumId = albumId;
        this.duration = duration;
        this.idTrack = idGen.getNextId();
        this.genres = genres;
    }

    getTrackById(id) {
        return this.id === id;
    }

    toJSON(){
        return {
            name:this.name,
            duration:this.duration,
            album : this.albumId,
            genres:this.genres
        };
    }
}

module.exports = Track;