
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const Artist = require("./models/artist"); // El modelo Artista
const artistExceptions = require("./exceptions/artistException.js");
const albumExceptions = require("./exceptions/albumException.js");
const trackExceptions = require("./exceptions/trackException.js");
const userExceptions = require("./exceptions/userException.js");
const Album = require('./models/album.js');
const Track = require('./models/tracks');
const User = require("./models/user");
const Playlist = require('./models/playlist.js');

class UNQfy {

  constructor(){
    this.artists = [];
    this.artistsSize = 0;
    this.playlists = [];
    this.users = [];

    this.id2Playlist = 0;
  }

  printArray(array){
    array.forEach(elem=> console.log(elem));
  }

  addUser(userName){
    if(this.users.some(elem=> elem.name === userName)){
      throw new userExceptions.UserException(userName);
    }else{
      const user = new User(userName);
      this.users.push(user);
      return user;
    }
  }

  getUserById(id){
    return this.users.find(elem=> elem.id === id);
  }

  addListenedSong(userId,trackId){
    let user = this.getUserById(userId);
    let track = this.getTrackById(trackId);
    user.listenTrack(track);
  }

  tracksListenedByUser(userId){
    const user = this.getUserById(userId);
    const tracks = user.tracksListenedWithoutRepeat();
    return tracks;
  }

  timesListenedTrackByUser(userId,trackId){
    const track = this.getTrackById(trackId);
    const tracks = this.getUserById(userId).amountTrackListened(track);
    return tracks;
  }

  removeUser(idUser){
    const user = this.getUserById(idUser);
    this.users = this.removeItemWithIdFromArr(user,this.users);
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
      if(error instanceof artistExceptions.ArtistException){
        console.log(error.message);
      }
      throw error;
    }
    return artist;
  }

  addNewArtist(artist) {
    if(this.artists.some(art => art.name === artist.name)){
        throw new artistExceptions.ArtistException("The artist to add already existed");
    } else {
      const artist1 = new Artist(artist.name,artist.country);
      this.artists.push(artist1);
      return artist1;
    }
  }

  removeArtist(artistId){
    let art = this.getArtistById(artistId);
    art.albums.forEach(elem => this.removeAlbum(artistId,elem.id));
    this.artists = this.removeItemWithIdFromArr(art,this.artists);
  }

  getArtistById(id) {
    // 1 verify exist id
    // 2 vefify duplicated id
    let artist = this.artists.find(artist => artist.id === id); 
    //return artist !== undefined ? artist : 'dont exist artist';
    if (artist !== undefined){
      return artist;
    }else{
      throw new artistExceptions.ThereIsNoArtist("There is no artist with that id");
    }
  }

  getTracksArtist(id){
    let art = this.getArtistById(id);
    return art.getTracks();

  }

  getAlbumsArtist(id){
    let art = this.getArtistById(id);
    return art.getAlbums();
  }

  removeItemWithIdFromArr(item,arr){
    return arr.filter(elem => elem.id !==item.id );
  }

  printAllArtists(){
    this.printArray(this.artists);
  }

  printAllAlbums(){
    this.printArray(this.getAlbums());
  }

  printAllTracks(){
    this.printArray(this.getTracks());
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
    let album;
    try {
      const artist = this.getArtistById(artistId);
      album = artist.addAlbum(albumData);
    }catch(error){
      if(error instanceof albumExceptions.AlbumException || error instanceof artistExceptions.ThereIsNoArtist){
        console.log(error.message);
      }
      throw error;
    }
    return album;
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
    let album;
    let artistOfAlbum = this.artists.find(artist => artist.haveAlbum(id));
    if(artistOfAlbum !== undefined){
      album = artistOfAlbum.getAlbumById(id);
      //return album;
      //return album !== undefined ? album : 'Dont exist album';
      if (album !== undefined){
        return album;
      }else{
        throw new albumExceptions.ThereIsNoAlbum("There is no album with that id");
      }
    }else{
        throw new artistExceptions.ThereIsNoArtistWithAlbum("There is no artist with that album");
    }
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
    let track;
    try{
      const albumObt = this.getAlbumById(albumId);
      track = albumObt.addNewTrack(trackData);
    }catch(error){
      if(error instanceof trackExceptions.TrackException || error instanceof albumExceptions.ThereIsNoAlbum){
        console.log(error.message);
      }
      throw error;
    }
    return track;
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

  searchByName(scrappyWord) {
    let artists = this.matchingPartialByArtist(scrappyWord);
    let albums = this.matchingPartialByAlbum(scrappyWord);
    let tracks = this.matchingPartialByTrack(scrappyWord);
    let playlists = this.matchingPartialByPlaylist(scrappyWord);
    
    return {
      artists: artists,
      albums: albums,
      tracks: tracks,
      playlists: playlists
    }
  }

  matchingPartialByArtist(scrappyWord) {
    let artists = this.artists.filter(artist => artist.matchingByName(scrappyWord));
    return artists;
  }

  matchingPartialByAlbum(scrappyWord) {
    let albums = this.artists.reduce((total, current) => {
      let albumsMatch = current.matchingAlbumByName(scrappyWord);
      total = total.concat(albumsMatch);
      return total;
    }, []);
    return albums;
  }

  matchingPartialByTrack(scrappyWord) {
    let tracks = this.artists.reduce((total, current) => {
      let tracksMatch = current.matchingTrackByName(scrappyWord);
      total = total.concat(tracksMatch);
      return total;
    }, []);
    return tracks;
  }

  matchingPartialByPlaylist(scrappyWord) {
    let playlists = this.playlists.filter(playlist => playlist.matchingTrackByName(scrappyWord))
    return playlists;
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
    
    let tracks = this.getTracksMatchingGenres(playlist.genresToInclude);
    let tracksWithMaxDuration = tracks.filter(track => track.isMaxDuration(maxDuration));
    playlist.addFullTracks(tracksWithMaxDuration);
    
    this.addNewPlaylist(playlist);

    return playlist;
  }

  addNewPlaylist(playlist) {
    this.playlists.push(playlist);
  }

  getPlaylistById(id) {
    let playlist = this.playlists.find(artist => artist.id === id); 
    return playlist !== undefined ? playlist : 'dont exist playlist';
  }

  save(filename) {
    const serializedData = picklify.picklify(this);
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy, Artist, Album, Playlist, Track,User];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy: UNQfy,
};

