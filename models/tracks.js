class Track{
    constructor(name,album,duration,idTrack,genres = []){
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.idTrack = idTrack;
        this.genres = genres;
    }
}

module.exports = Track;