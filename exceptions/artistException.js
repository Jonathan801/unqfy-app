function ArtistException(message){
    this.message  = message;
    this.name = "Artist Exception";
}

function ThereIsNoArtist(message){
    this.message  = message;
    this.name = "ThereIsNoArtist";
}

function ThereIsNoArtistWithAlbum(message){
    this.message  = message;
    this.name = "ThereIsNoArtist";
}

ArtistException.prototype.toString = function() {
    return `${this.name}: "${this.message}"`;
  }

  module.exports = {
      ArtistException,
      ThereIsNoArtist,
      ThereIsNoArtistWithAlbum
};