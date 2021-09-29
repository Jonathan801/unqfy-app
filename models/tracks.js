const idGenerator = require("./idGenerator");
//let idGen = new idGenerator();


class Track{
    constructor(name, albumId, duration,genres = []){
        this.name = name;
        this.albumId = albumId;
        this.duration = duration;
        this.idTrack = idGenerator.getNextIdTrack();
        this.genres = genres;
    }

    getTrackById(id) {
        return this.id === id;
    }

    matchingByName(scrappyWord) {
        const reg = new RegExp(scrappyWord, 'gi');
        
        const match =  reg.exec(this.name);
        return match !== null;
    }

    anyGenre(genres){
        return genres.some(genre => this.genres.includes(genre));   
    }

    isMaxDuration(maxDuration) {
        return this.duration <= maxDuration;
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