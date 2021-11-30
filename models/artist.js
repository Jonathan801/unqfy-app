const Album = require("./album");
//const idGenerator = require("./idGenerator");
const albumExceptions = require("../exceptions/albumException.js");

class Artist{
    constructor(name,country,id){
        this.name = name;
        this.country = country;
        this.albums = [];
        this.id = id;
    }

    toJSON(){
        return { id: this.id, name: this.name, country: this.country, albums: this.albums };
    }

    update(body){
        this.name = body.name;
        this.country = body.country;
    }

    addAlbum(albumData,idAlbum) {
        if(this.haveAlbumName(albumData.name)){
            throw new albumExceptions.AlbumWithSameName(`The Album ${albumData.name} already existed.`);
        }else{
            const newAlbum = new Album(this.id,albumData.name, albumData.year,idAlbum);    
            this.albums.push(newAlbum);
            return newAlbum;
        }
    }

    removeAlbum(albumId) {
        this.albums = this.albums.filter(album => album.id !== albumId);
        return this.albums;
    }

    getAlbums(){
        //return this.albums.forEach(album=> console.log(JSON.stringify(album)));
        return this.albums.forEach(album=> console.log(album));
    }

    getTracks(){
        const tracks = this.albums.map(elem => elem.tracks).reduce((accumulator,actual)=> accumulator.concat(actual),[]);
        return tracks.forEach(elem=> console.log(elem));
    }

    getTracks2(){
        return this.albums.reduce((accumulator, album) => accumulator.concat(album.tracks), []);
    }

    haveAlbumName(name){
        return this.albums.some(elem => elem.name === name);
    }
    
    haveAlbum(id){
        return this.albums.some(elem => elem.id === id);
    }

    removeTrack(idTrack) {
        const track = this.getTrackById(idTrack);
        const album = this.getAlbumById(track.albumId);
        album.removeTrack(track);
    }

    getAlbumById(id) {
        const album = this.albums.find(album => album.id === id);
        return album !== undefined ? album : albumExceptions.AlbumIdDoesNotExist(`The Album with id ${id} does not exist`);
    }

    getTrackById(idTrack) {
        const albumWithTrack = this.albums.find(album => album.getTrackById(idTrack));
        const track = albumWithTrack.getTrackById(idTrack);
        return track;
    }

    matchingByName(scrappyWord) {
        const reg = new RegExp(scrappyWord, 'gi');
        
        const match =  reg.exec(this.name);
        return match !== null;
    }

    matchingAlbumByName(scrappyWord) {
        const albums = this.albums.filter(album => album.matchingByName(scrappyWord));
        return albums;
    }

    matchingTrackByName(scrappyWord) {
        const tracksByAlbum = this.albums.reduce((total, current) => {
            const tracks = current.matchingTrackByName(scrappyWord);
            total = total.concat(tracks);
            return total;
        }, []);
        return tracksByAlbum;
    }
}

module.exports = Artist;