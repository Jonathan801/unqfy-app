class Track{
    constructor(name, albumId, duration, idTrack, genres = []){
        this.name = name;
        this.albumId = albumId;
        this.duration = duration;
        this.idTrack = idTrack;
        this.genres = genres;
    }

    getTrackById(id) {
        return this.id === id;
    }
}

module.exports = Track;