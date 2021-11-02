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
  };

class AlbumIdDoesNotExist extends Error {
  constructor(message) {
    super(message);
    this.name = 'AlbumIdDoesNotExist'
  }
}

class AlbumWithSameName extends Error {
  constructor(message) {
      super(message);
      this.name = 'AlbumWithSameName';
  }
}

  module.exports = {
    AlbumException,
    ThereIsNoAlbum,
    AlbumIdDoesNotExist,
    AlbumWithSameName
  };