

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

function addAlbum(unqfy, artistId, name, year) {
  // parseo string to int
  unqfy.addAlbum(artistId, {name: name, year: year});
}

function removeAlbum(unqfy, artistId, albumId) {
  unqfy.removeAlbum(artistId, albumId);
}

function addTrack(unqfy,name,album,duration,genres){ //TODO parsear los parametros de la consola
  unqfy.addTrack(album,{name:name,duration:duration,genres:genres});
}

function createPlaylist(unqfy,name, genresToInclude, maxDuration) {
  // parse string to list
  // parse string to int
  unqfy.createPlaylist(name, genresToInclude, maxDuration);
}

function main() {
  const unqfy = getUNQfy();
  let params = process.argv.splice(2);
  let functionConsole = params[0];
  let argumentsConsole = params.splice(1,params.length);
  evalMethods(functionConsole,argumentsConsole,unqfy);
  //saveUNQfy(unqfy);
}

function evalMethods(method,args,unqfy){
  switch(method){
    case "addArtist" ://args[0] = name artist ;args[1]= country artist
      unqfy.addArtist({name:args[0],country:args[1]});
      break;
    case "addAlbum": //args[0] = artistId ;args[1]= Album name ;args[2]=year Album
      addAlbum(unqfy, args[0], args[1], args[2]);
      break;
    case "addTrack": //args[0] = nombreTrack;args[1]= Album name ;args[2]=durationTrack ;args[3]= genresTrack
      addTrack(unqfy,args[0],args[1],args[2],args[3]);
      break;
    case "removeAlbum":
      removeAlbum(unqfy, args[0], args[1]);
      break;
    case "createPlaylist":
      createPlaylist(unqfy, args[0], args[1], args[2]);
      break;
    default : 
      console.log("Nop");
  }
}

main();
