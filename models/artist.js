const Album = require("./album");

class Artist{
    constructor(name,country,id){
        this.name = name;
        this.country = country;
        this.albums = [];
        this.id = id;
        this.id2Album = 0;
    }

    addAlbum(albumData) {
        let currentId = this.id2Album++;
        const newAlbum = new Album(currentId, this.id, albumData.name, albumData.year);
        this.albums.push(newAlbum);
        return newAlbum;
    }

    removeAlbum(albumId) {
        // 1 verify exist id
        // 2 vefify duplicated id
        // 3 verify valid id
        // 4 console if remove OK
        this.albums = this.albums.filter(album => album.id !== albumId);
        return this.albums;
    }
}

module.exports = Artist;