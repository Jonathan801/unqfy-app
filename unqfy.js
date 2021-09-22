
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const Artist = require("./models/artist"); // El modelo Artista
const ArtistException = require("./exceptions/artistException.js");
const Album = require('./models/album.js');
const Track = require('./models/tracks');
const Playlist = require('./models/playlist.js');

class UNQfy {

  constructor(){
    this.artists = [];
    this.artistsSize = 0;
    this.playlists = [];
    this.users = [];

    this.id2Playlist = 0;
  }

  // artistData: objeto JS con los datos necesarios para crear un artista
  //   artistData.name (string)
  //   artistData.country (string)
  // retorna: el nuevo artista creado
  /* Crea un artista y lo agrega a unqfy.
  El objeto artista creado debe soportar (al menos):
    - una propiedad name (string)
    - una propiedad country (string)
  */
  addArtist(artistData) {
    let artist;
    try {
      artist = this.addNewArtist(artistData);
    }catch(error){
      error.message;
    }
    return artist;
  }

  addNewArtist(artist) {
    if(this.artists.some(art => art.name === artist.name)){
        throw new ArtistException("El artista a agregar ya existia");
    } else {
      const artist1 = new Artist(artist.name,artist.country);
      this.artists.push(artist1);
      return artist1;
    }
  }

  removeArtist(artistId){
    let art = this.getArtistById(artistId);
    art.albums.forEach(elem => this.removeAlbum(artistId,elem.id));
    this.removeItemFromArr(art);
  }

  getArtistById(id) {
    // 1 verify exist id
    // 2 vefify duplicated id
    let artist = this.artists.find(artist => artist.id === id); 
    return artist !== undefined ? artist : 'dont exist artist';
  }

  getTracksArtist(id){
    let art = this.getArtistById(id);
    return art.getTracks();

  }

  getAlbumsArtist(id){
    let art = this.getArtistById(id);
    return art.getAlbums();
  }

  removeItemFromArr(item){
    this.artists = this.artists.filter(elem => elem.id !==item.id );
  }

  getAllArtists(){
    return this.artists;
  }

  // albumData: objeto JS con los datos necesarios para crear un album
  //   albumData.name (string)
  //   albumData.year (number)
  // retorna: el nuevo album creado
  /* Crea un album y lo agrega al artista con id artistId.
    El objeto album creado debe tener (al menos):
     - una propiedad name (string)
     - una propiedad year (number)
  */
  addAlbum(artistId, albumData) {
    const artist = this.getArtistById(artistId);
    // addAlbum(artistId, albumData)
    // const newArtist = new Artist('ale', 'roma')
    // newArtist.addAlbum()
    return artist.addAlbum(albumData);
  }

  getTracksAlbum(idAlbum){
    let abm = this.getAlbumById(idAlbum);
    return abm.getTracks();
  }

  removeAlbum(artistId, albumId) {
    const artist = this.getArtistById(artistId);
    this.removeAlbum2Playlists(albumId);
    artist.removeAlbum(albumId);
  }

  getAlbumById(id) {
    // [album] !== album
    let artistOfAlbum = this.artists.find(artist => artist.haveAlbum(id));
    let album = artistOfAlbum.getAlbumById(id);
    //return album;
    return album !== undefined ? album : 'Dont exist album';
  }

  removeAlbum2Playlists(albumId) {
    const album = this.getAlbumById(albumId);
    this.removeTracksByAlbum(album);
  }

  removeTracksByAlbum(album) {
    album.tracks.forEach(track => {
      this.playlists.forEach(playlist => {
        playlist.removeTrack(track);
      });
    });
  }

  // trackData: objeto JS con los datos necesarios para crear un track
  //   trackData.name (string)
  //   trackData.duration (number)
  //   trackData.genres (lista de strings)
  // retorna: el nuevo track creado
  /* Crea un track y lo agrega al album con id albumId.
  El objeto track creado debe tener (al menos):
      - una propiedad name (string),
      - una propiedad duration (number),
      - una propiedad genres (lista de strings)
  */
  addTrack(albumId, trackData) {
    const albumObt = this.getAlbumById(albumId);
    try{
      return albumObt.addNewTrack(trackData);
    }catch(err){
      err.message;
    }
  }

  removeTrack(artistId, trackId) {
    let artist = this.getArtistById(artistId);
    this.removeTrack2Playlist(trackId);
    
    artist.removeTrack(trackId);
  }

  getTracks(){
    return this.getAlbums().reduce((acumulattor,actual) =>{
        return acumulattor.concat(actual.tracks);
      }, []);
  }

  getAlbums(){
    return this.artists.reduce((acumulattor,actual) =>{
        return acumulattor.concat(actual.albums);
    },[]);
  }

  getTrackById(id) {
    const artistWithTrack = this.artists.find(artist => artist.getTrackById(id));
    return artistWithTrack.getTrackById(id);
  }

  removeTrack2Playlist(trackId) {
    const track = this.getTrackById(trackId);
    this.playlists.forEach(playlist => {
      playlist.removeTrack(track);
    });
  }



  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres) {
    return this.getTracks().filter(elem=> elem.anyGenre(genres));
  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) { //TODO manejar caso donde no existe el artista
    let artist = this.artists.find(art => art.name === artistName);
    let albumsOfArtist = artist.albums;
    let tracks = albumsOfArtist.map(elem => elem.tracks).reduce((actual,elem) => actual.concat(elem));
    return tracks;
  }

  // name: nombre de la playlist
  // genresToInclude: array de generos
  // maxDuration: duración en segundos
  // retorna: la nueva playlist creada
  /*** Crea una playlist y la agrega a unqfy. ***
    El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
  */
  createPlaylist(name, genresToInclude, maxDuration) {
    let currentId = this.id2Playlist++;
    const playlist = new Playlist(currentId, name, genresToInclude, maxDuration);
    this.addNewPlaylist(playlist);

    return playlist
  }

  addNewPlaylist(playlist) {
    this.playlists.push(playlist);
  }

  getPlaylistById(id) {

  }

  save(filename) {
    const serializedData = picklify.picklify(this);
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy, Artist, Album, Playlist, Track];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy: UNQfy,
};

