function ArtistException(message){
    this.message  = message;
    this.name = "Artist Exception";
}

ArtistException.prototype.toString = function() {
    return `${this.name}: "${this.message}"`;
  }

  module.exports = ArtistException;