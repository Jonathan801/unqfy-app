

const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy'); // importamos el modulo unqfy

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
  let intArtistId = parseInt(artistId);
  unqfy.removeArtist(intArtistId);
}

function addAlbum(unqfy, artistId, name, year) {
  // parseo string to int
  let intArtistId = parseInt(artistId);
  let intYear = parseInt(year);
  unqfy.addAlbum(intArtistId, {name: name, year: intYear});
}

function removeAlbum(unqfy, artistId, albumId) {
  let intArtistId = parseInt(artistId);
  let intAlbumId = parseInt(albumId);
  unqfy.removeAlbum(intArtistId, intAlbumId);
}

function addTrack(unqfy,name,album,duration,genres){
  let intDuration = parseInt(duration);
  let intAlbum = parseInt(album);
  let genresToList = genres.substr(1,genres.length-2).split(",");
  unqfy.addTrack(intAlbum,{name:name,duration:intDuration,genres:genresToList});
}

function removeTrack(unqfy, artistId, trackId) {
  let intArtistId = parseInt(artistId);
  let intTrackId = parseInt(trackId);
  unqfy.removeTrack(intArtistId, intTrackId);
}

function createPlaylist(unqfy, name, genresToInclude, maxDuration) {
  let genresToList = genresToInclude.substr(1,genresToInclude.length-2).split(",");
  let intDuration = parseInt(maxDuration);
  unqfy.createPlaylist(name, genresToList, intDuration);
}

function allArtists(unqfy){
  unqfy.getAllArtists();
}

function getAlbumsArtist(unqfy,artistId){
  let intArtistId = parseInt(artistId);
  unqfy.getAlbumsArtist(intArtistId);
}

function getTracksAlbum(unqfy,albumdId){
  let intAlbum = parseInt(albumdId);
  unqfy.getTracksAlbum(intAlbum);
}

function getTracksArtist(unqfy,artistId){
  let intArtistId = parseInt(artistId);
  unqfy.getTracksArtist(intArtistId);
}

function getTracksGenre(unqfy,genre){
  let genresToList = genre.substr(1,genre.length-2).split(",");
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
  let params = process.argv.splice(2);
  let functionConsole = params[0];
  let argumentsConsole = params.splice(1,params.length);
  evalMethods(functionConsole,argumentsConsole,unqfy);
  saveUNQfy(unqfy);
}

function evalMethods(method,args,unqfy){
  switch(method){
    case "addArtist" ://args[0] = name artist ;args[1]= country artist
      addArtist(unqfy,args[0],args[1]);
      break;
    case "addAlbum": //args[0] = artistId ;args[1]= Album name ;args[2]=year Album
      addAlbum(unqfy, args[0], args[1], args[2]);
      break;
    case "addTrack": //args[0] = nombreTrack;args[1]= Album id ;args[2]=durationTrack ;args[3]= genresTrack
      addTrack(unqfy,args[0],args[1],args[2],args[3]);
      break;
    case "removeAlbum":
      removeAlbum(unqfy, args[0], args[1]);
      break;
    case "removeArtist":
      removeArtist(unqfy,args[0]);
      break;
    case "createPlaylist":
      createPlaylist(unqfy, args[0], args[1], args[2]);
      break;
    case "removeTrack":
      removeTrack(unqfy, args[0], args[1]);
      break;
    case "allArtists":
      allArtists(unqfy);
      break;
    case "getAlbumsArtist":
      getAlbumsArtist(unqfy,args[0]);
      break;
    case "getTracksAlbum":
      getTracksAlbum(unqfy,args[0]);
      break;
    case "getTracksArtist":
      getTracksArtist(unqfy,args[0]);
      break;
    case "getTracksGenre": //args[0] seria los generos , 
      getTracksGenre(unqfy,args[0]);
      break;
    case "artists":
      getArtists(unqfy);
      break;
    case "albums":
      getAlbums(unqfy);
      break;
    case "tracks":
      getTracks(unqfy);
      break;
    case "setUp":
      setUp(unqfy);
      saveUNQfy(unqfy);
      break;
    default : 
      console.log("No existe el metodo: " , method);
  }
}

function setUp(unqfy){ 
  const artist = unqfy.addArtist({name:'Guns n\' Roses',country:'USA'});
  const album = unqfy.addAlbum(artist.id, {name:'Appetite for Destruction',year:1987});
  const t1 = unqfy.addTrack(album.id, {name:'Welcome to the jungle',duration:200,genres:['rock', 'hard rock', 'movie']});
  const t5 = unqfy.addTrack(album.id, {name:'Sweet Child o\' Mine',duration:1500,genres:['rock', 'hard rock', 'pop', 'movie']});

  const artist2 = unqfy.addArtist({name:'Michael Jackson',country:'USA'});
  const album2 = unqfy.addAlbum(artist2.id, {name:'Thriller',year:1987});
  const t2 = unqfy.addTrack(album2.id, {name:'Thriller',duration:200,genres:['pop', 'movie']});
  const t3 = unqfy.addTrack(album2.id, {name:'Another song',duration:500,genres:['pop']});
  const t4 = unqfy.addTrack(album2.id, {name:'Another song II',duration:500,genres:['pop']});
}

// let setTest = getUNQfy();
// setUp(setTest);
main();


