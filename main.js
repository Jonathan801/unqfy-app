

const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy'); // importamos el modulo unqfy

const LogglyApp = require("./Loggly/observerLoggy");
const loggly = new LogglyApp();
const Newsletter = require("./Newsletter/observerNewsletter");
const newsletter = new Newsletter();

// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename = 'data.json') {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}

function saveUNQfy(unqfy, filename = 'data.json') {
  unqfy.save(filename);
}

function addArtist(unqfy,name,country){
  unqfy.addArtist({name:name,country:country});
}

function removeArtist(unqfy,artistId){
  const intArtistId = parseInt(artistId);
  unqfy.removeArtist(intArtistId);
}

function addAlbum(unqfy, artistId, name, year) {
  // parseo string to int
  const intArtistId = parseInt(artistId);
  const intYear = parseInt(year);
  unqfy.addAlbum(intArtistId, {name: name, year: intYear});
}

function removeAlbum(unqfy, artistId, albumId) {
  const intArtistId = parseInt(artistId);
  const intAlbumId = parseInt(albumId);
  unqfy.removeAlbum(intArtistId, intAlbumId);
}

function addTrack(unqfy,name,album,duration,genres){
  const intDuration = parseInt(duration);
  const intAlbum = parseInt(album);
  const genresToList = genres.substr(1,genres.length-2).split(",");
  unqfy.addTrack(intAlbum,{name:name,duration:intDuration,genres:genresToList});
}

function removeTrack(unqfy, artistId, trackId) {
  const intArtistId = parseInt(artistId);
  const intTrackId = parseInt(trackId);
  unqfy.removeTrack(intArtistId, intTrackId);
}

function createPlaylist(unqfy, name, genresToInclude, maxDuration) {
  const genresToList = genresToInclude.substr(1,genresToInclude.length-2).split(",");
  const intDuration = parseInt(maxDuration);
  unqfy.createPlaylist(name, genresToList, intDuration);
}

function getAlbumsArtist(unqfy,artistId){
  const intArtistId = parseInt(artistId);
  unqfy.getAlbumsArtist(intArtistId);
}

function getTracksAlbum(unqfy,albumdId){
  const intAlbum = parseInt(albumdId);
  unqfy.getTracksAlbum(intAlbum);
}

function getTracksArtist(unqfy,artistId){
  const intArtistId = parseInt(artistId);
  unqfy.getTracksArtist(intArtistId);
}

function getTracksGenre(unqfy,genre){
  const genresToList = genre.substr(1,genre.length-2).split(",");
  unqfy.getTracksMatchingGenres(genresToList);
}

function getArtists(unqfy){
  unqfy.printAllArtists();
}

function getAlbums(unqfy){
  unqfy.printAllAlbums();
}

function getTracks(unqfy){
  unqfy.printAllTracks();
}

function addUser(unqfy,name){
  unqfy.addUser(name);
}

/*
 En esta funcion deberán interpretar los argumentos pasado por linea de comandos
 e implementar los diferentes comandos.

  Se deberán implementar los comandos:
    - Alta y baja de Artista
    - Alta y Baja de Albums OK
    - Alta y Baja de tracks

    - Listar todos los Artistas
    - Listar todos los albumes de un artista
    - Listar todos los tracks de un album

    - Busqueda de canciones intepretadas por un determinado artista
    - Busqueda de canciones por genero

    - Dado un string, imprimmir todas las entidades (artistas, albums, tracks, playlists) que coincidan parcialmente
    con el string pasado.

    - Dada un nombre de playlist, una lista de generos y una duración máxima, crear una playlist que contenga
    tracks que tengan canciones con esos generos y que tenga como duración máxima la pasada por parámetro.

  La implementacion de los comandos deberá ser de la forma:
   1. Obtener argumentos de linea de comando
   2. Obtener instancia de UNQfy (getUNQFy)
   3. Ejecutar el comando correspondiente en Unqfy
   4. Guardar el estado de UNQfy (saveUNQfy)

*/

function main() {
  const unqfy = getUNQfy();
  const params = process.argv.splice(2);
  const functionConsole = params[0];
  const argumentsConsole = params.splice(1,params.length);
  evalMethods(functionConsole,argumentsConsole,unqfy);
  saveUNQfy(unqfy);
}

function evalMethods(method1,args,unqfy){

  const metodos = {
    // eslint-disable-next-line quote-props
    "addArtist" : function(){
      addArtist(unqfy,args[0],args[1]);
    },
    // eslint-disable-next-line quote-props
    "addAlbum" : function(){
      addAlbum(unqfy, args[0], args[1], args[2]);
    },
    // eslint-disable-next-line quote-props
    "addTrack" : function(){
      addTrack(unqfy,args[0],args[1],args[2],args[3]);
    },
    // eslint-disable-next-line quote-props
    "addUser" : function(){
      addUser(unqfy,args[0]);
    },
    // eslint-disable-next-line quote-props
    "removeAlbum":function(){
      removeAlbum(unqfy,args[0],args[1]);
    },
    // eslint-disable-next-line quote-props
    "removeArtist":function(){
      removeArtist(unqfy,args[0]);
    },    
    // eslint-disable-next-line quote-props
    "removeTrack":function(){
      removeTrack(unqfy, args[0], args[1]);
    },
    // eslint-disable-next-line quote-props
    "getAlbumsArtist":function(){
      getAlbumsArtist(unqfy,args[0]);
    },
    // eslint-disable-next-line quote-props
    "getTracksAlbum":function(){
      getTracksAlbum(unqfy,args[0]);
    },
    // eslint-disable-next-line quote-props
    "getTracksArtist":function(){
      getTracksArtist(unqfy,args[0]);
    },
    // eslint-disable-next-line quote-props
    "getTracksGenre":function(){
      getTracksGenre(unqfy,args[0]);(unqfy,args[0]);
    },
    // eslint-disable-next-line quote-props
    "artists":function(){
      getArtists(unqfy);
    },
    // eslint-disable-next-line quote-props
    "albums":function(){
      getAlbums(unqfy);
    },
    // eslint-disable-next-line quote-props
    "tracks":function(){
      getTracks(unqfy);
    },
    // eslint-disable-next-line quote-props
    "setUp":function(){
      setUp(unqfy);
    },
    createPlaylist: function() {
      createPlaylist(unqfy, args[0], args[1], args[2]);
    }
  };
  metodos[method1]();
}

function setUp(unqfy){ 
  const artist = unqfy.addArtist({name:'Guns n\' Roses',country:'USA'});
  const album = unqfy.addAlbum(artist.id, {name:'Appetite for Destruction',year:1987});
  unqfy.addTrack(album.id, {name:'Welcome to the jungle',duration:200,genres:['rock', 'hard rock', 'movie']});
  unqfy.addTrack(album.id, {name:'Sweet Child o\' Mine',duration:1500,genres:['rock', 'hard rock', 'pop', 'movie']});

  const artist2 = unqfy.addArtist({name:'Michael Jackson',country:'USA'});
  const album2 = unqfy.addAlbum(artist2.id, {name:'Thriller',year:1987});
  unqfy.addTrack(album2.id, {name:'Thriller',duration:200,genres:['pop', 'movie']});
  unqfy.addTrack(album2.id, {name:'Another song',duration:500,genres:['pop']});
  unqfy.addTrack(album2.id, {name:'Another song II',duration:500,genres:['pop']});

  unqfy.addUser("UserTest1");
  // unqfy.addListenedSong(u1.id,t1.id);
  // unqfy.addListenedSong(u1.id,t2.id);
  // unqfy.addListenedSong(u1.id,t4.id);
  // unqfy.addListenedSong(u1.id,t1.id);
  // unqfy.addListenedSong(u1.id,t4.id);
}

main();


