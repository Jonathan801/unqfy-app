const Album = require("./album");
const idGenerator = require("./idGenerator");
const albumExceptions = require("../exceptions/albumException.js");

class Artist{
    constructor(name,country){
        this.name = name;
        this.country = country;
        this.albums = [];
        this.id = idGenerator.getNextIdArtist();
    }

    toJSON(){
        return { id: this.id, name: this.name, country: this.country, albums: this.albums };
    }

    addAlbum(albumData) {
        if(this.haveAlbumName(albumData.name)){
            throw new albumExceptions.AlbumException("The album to add already existed in the artist");
        }else{
            const newAlbum = new Album(this.id, albumData.name, albumData.year);    
            this.albums.push(newAlbum);
            return newAlbum;
        }
    }

    removeAlbum(albumId) {
        // 1 verify exist id
        // 2 vefify duplicated id
        // 3 verify valid id
        // 4 console if remove OK
        this.albums = this.albums.filter(album => album.id !== albumId);
        return this.albums;
    }

    getAlbums(){
        //return this.albums.forEach(album=> console.log(JSON.stringify(album)));
        return this.albums.forEach(album=> console.log(album));
    }

    getTracks(){
        let tracks = this.albums.map(elem => elem.tracks).reduce((accumulator,actual)=> accumulator.concat(actual),[]);
        return tracks.forEach(elem=> console.log(elem));
    }

    haveAlbumName(name){
        return this.albums.some(elem => elem.name === name);
    }
    
    haveAlbum(id){
        return this.albums.some(elem => elem.id === id);
    }

    removeTrack(idTrack) {
        const track = this.getTrackById(idTrack);
        let album = this.albums.find(album => album.id === track.albumId);
        album.removeTrack(track);
    }

    getAlbumById(id) {
        const album = this.albums.find(album => album.id === id);
        return album;
    }

    getTrackById(idTrack) {
        const albumWithTrack = this.albums.find(album => album.getTrackById(idTrack));
        let track = albumWithTrack.getTrackById(idTrack);
        return track;
    }

    matchingByName(scrappyWord) {
        const reg = new RegExp(scrappyWord, 'gi')
        
        let match =  reg.exec(this.name);
        return match !== null;
    }

    matchingAlbumByName(scrappyWord) {
        let albums = this.albums.filter(album => album.matchingByName(scrappyWord));
        return albums;
    }

    matchingTrackByName(scrappyWord) {
        let tracksByAlbum = this.albums.reduce((total, current) => {
            let tracks = current.matchingTrackByName(scrappyWord);
            total = total.concat(tracks);
            return total;
        }, []);
        return tracksByAlbum;
    }
}

module.exports = Artist;