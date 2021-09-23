function AlbumException(message){
    this.message  = message;
    this.name = "Album Exception";
}

function ThereIsNoAlbum(message){
    this.message  = message;
    this.name = "ThereIsNoAlbum";
}

AlbumException.prototype.toString = function() {
    return `${this.name}: "${this.message}"`;
  }

  module.exports = {
    AlbumException,
    ThereIsNoAlbum  
  };