const Album = require("./album");

class Artist{
    constructor(name,country){
        this.name = name;
        this.country = country;
        this.albums = [];
        this.id = 'artistId'
    }

    addAlbum(albumData) {
        const newAlbum = new Album(this.id, albumData.name, albumData.year)
        this.albums.push(newAlbum)
        return newAlbum
    }
}

module.exports = Artist;